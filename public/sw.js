const CACHE_PREFIX = "vwayaj-public";
const CACHE_VERSION = "v8";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const LEGACY_CACHE_NAMES = ["public-shell-v1"];
const OFFLINE_URL = "/offline";
const HTML_ASSET_ATTRIBUTE_PATTERN = /\b(?:href|src|srcset)=["']([^"']+)["']/gi;
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/icon.svg",
  "/icons/icon-48.png",
  "/icons/icon-72.png",
  "/icons/icon-96.png",
  "/icons/icon-128.png",
  "/icons/icon-144.png",
  "/icons/icon-152.png",
  "/icons/apple-touch-icon-180.png",
  "/icons/icon-192.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-192.png",
  "/icons/icon-maskable-512.png"
];
const PUBLIC_PAGE_URLS = [
  "/ht",
  "/ht/countries",
  "/ht/countries/usa",
  "/ht/countries/chile",
  "/ht/countries/brazil",
  "/ht/countries/mexico"
];

function isNonCacheable(request, url) {
  return (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    request.cache === "no-store"
  );
}

function canCache(response) {
  if (!response || !response.ok || response.type !== "basic") return false;
  const cacheControl = response.headers.get("cache-control") ?? "";
  return !/\b(?:private|no-store)\b/i.test(cacheControl);
}

function isStaticAssetPath(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    pathname === "/icon.svg"
  );
}

function extractSameOriginAssetUrls(html) {
  const assetUrls = new Set();

  for (const match of html.matchAll(HTML_ASSET_ATTRIBUTE_PATTERN)) {
    const attributeValue = match[1].replaceAll("&amp;", "&");
    for (const source of attributeValue.split(",")) {
      const candidate = source.trim().split(/\s+/, 1)[0];
      if (!candidate || candidate.startsWith("data:")) continue;

      try {
        const assetUrl = new URL(candidate, self.location.origin);
        if (assetUrl.origin === self.location.origin && isStaticAssetPath(assetUrl.pathname)) {
          assetUrls.add(assetUrl.href);
        }
      } catch {
        // Ignore malformed attributes instead of aborting the complete installation.
      }
    }
  }

  return assetUrls;
}

async function precacheOfflineSurface() {
  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(PRECACHE_URLS);
  const pageCache = await caches.open(PAGE_CACHE);

  const publicPageHtml = await Promise.all(
    PUBLIC_PAGE_URLS.map(async (pagePath) => {
      const response = await fetch(pagePath, { cache: "reload" });
      if (!canCache(response)) throw new Error(`Public page could not be cached: ${pagePath}`);
      await pageCache.put(pagePath, response.clone());
      return response.text();
    })
  );

  const offlineResponse = await cache.match(OFFLINE_URL);
  if (!offlineResponse) throw new Error("Offline surface was not cached.");

  const offlineHtml = await offlineResponse.text();
  const buildAssets = new Set();
  for (const html of [offlineHtml, ...publicPageHtml]) {
    for (const assetUrl of extractSameOriginAssetUrls(html)) buildAssets.add(assetUrl);
  }

  await Promise.all(
    [...buildAssets].map(async (assetUrl) => {
      const response = await fetch(assetUrl, { cache: "reload" });
      if (!canCache(response)) throw new Error(`Offline asset could not be cached: ${assetUrl}`);
      await cache.put(assetUrl, response.clone());
    })
  );
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (canCache(response)) {
      const cache = await caches.open(PAGE_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const pageCache = await caches.open(PAGE_CACHE);
    const cachedPage = await pageCache.match(request, { ignoreSearch: true });
    if (cachedPage) return cachedPage;

    const staticCache = await caches.open(STATIC_CACHE);
    return (await staticCache.match(OFFLINE_URL)) ?? Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(async (response) => {
      if (canCache(response)) await cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached ?? (await network) ?? Response.error();
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheOfflineSurface());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                LEGACY_CACHE_NAMES.includes(key) ||
                (key.startsWith(CACHE_PREFIX) && ![STATIC_CACHE, PAGE_CACHE].includes(key))
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (isNonCacheable(request, url)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAssetPath(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
