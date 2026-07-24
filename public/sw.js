const CACHE_PREFIX = "vwayaj-public";
const CACHE_VERSION = "v5";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const LEGACY_CACHE_NAMES = ["public-shell-v1"];
const OFFLINE_URL = "/offline";
const NEXT_STATIC_ASSET_PATTERN = /\/_next\/static\/[^"'\\\s<]+/g;
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
const PRIVATE_ROUTE =
  /^\/(?:ht|fr|es|pt|en)\/(?:auth|portal|admin|advisor|professional|editor|moderation)(?:\/|$)/;

function isPrivateOrSensitive(request, url) {
  return (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    PRIVATE_ROUTE.test(url.pathname) ||
    request.headers.has("authorization") ||
    request.cache === "no-store"
  );
}

function canCache(response) {
  if (!response || !response.ok || response.type !== "basic") return false;
  const cacheControl = response.headers.get("cache-control") ?? "";
  return !/\b(?:private|no-store)\b/i.test(cacheControl);
}

async function precacheOfflineSurface() {
  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(PRECACHE_URLS);

  const offlineResponse = await cache.match(OFFLINE_URL);
  if (!offlineResponse) throw new Error("Offline surface was not cached.");

  const offlineHtml = await offlineResponse.text();
  const buildAssets = [...new Set(offlineHtml.match(NEXT_STATIC_ASSET_PATTERN) ?? [])];
  await Promise.all(
    buildAssets.map(async (assetPath) => {
      const assetUrl = new URL(assetPath, self.location.origin).href;
      const response = await fetch(assetUrl, { cache: "reload" });
      if (!canCache(response)) throw new Error(`Offline asset could not be cached: ${assetPath}`);
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
    const cachedPage = await pageCache.match(request);
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
  if (isPrivateOrSensitive(request, url)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/icon.svg"
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
