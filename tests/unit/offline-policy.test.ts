import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

describe("offline cache policy", () => {
  const source = readFileSync(resolve(process.cwd(), "public/sw.js"), "utf8");

  it("excludes every private and authentication surface before cache handling", () => {
    expect(source).toContain("PRIVATE_ROUTE");
    for (const segment of [
      "portal",
      "admin",
      "advisor",
      "professional",
      "editor",
      "moderation",
      "auth"
    ]) {
      expect(source).toContain(segment);
    }
    expect(source).toContain('request.headers.has("authorization")');
    expect(source).toContain('request.cache === "no-store"');
  });

  it("never caches API calls or cross-origin responses", () => {
    expect(source).toContain('url.pathname.startsWith("/api/")');
    expect(source).toContain("url.origin !== self.location.origin");
    expect(source).toContain('response.type !== "basic"');
  });

  it("uses controlled updates and never requests notifications", () => {
    const installHandler = source.match(/self\.addEventListener\("install"[\s\S]*?\n\}\);/)?.[0];
    expect(installHandler).toBeTruthy();
    expect(installHandler).not.toContain("skipWaiting");
    expect(source).toContain('event.data?.type === "SKIP_WAITING"');
    expect(source).not.toContain("Notification.requestPermission");
  });

  it("keeps public navigation network-first and public assets stale-while-revalidate", () => {
    expect(source).toContain("networkFirst(request)");
    expect(source).toContain("staleWhileRevalidate(request)");
    expect(source).toContain("/_next/static/");
    expect(source).toContain("/images/");
  });

  it("precaches the build assets needed to hydrate the offline surface", async () => {
    const listeners = new Map<
      string,
      (event: { waitUntil(promise: Promise<unknown>): void }) => void
    >();
    const cachedAssets: string[] = [];
    const fetchedAssets: string[] = [];
    let installPromise: Promise<unknown> | null = null;
    const cache = {
      addAll: async () => undefined,
      match: async () => ({
        text: async () =>
          [
            '<script src="/_next/static/chunks/runtime.js"></script>',
            '<script>self.__next_f.push(["/_next/static/chunks/offline.js"])</script>'
          ].join("")
      }),
      put: async (assetUrl: string) => {
        cachedAssets.push(assetUrl);
      }
    };
    const response = {
      clone: () => response,
      headers: { get: () => "public, max-age=31536000, immutable" },
      ok: true,
      type: "basic"
    };

    runInNewContext(source, {
      URL,
      caches: {
        open: async () => cache
      },
      fetch: async (assetUrl: string) => {
        fetchedAssets.push(assetUrl);
        return response;
      },
      self: {
        addEventListener: (
          event: string,
          listener: (event: { waitUntil(promise: Promise<unknown>): void }) => void
        ) => listeners.set(event, listener),
        clients: { claim: async () => undefined },
        location: { origin: "https://vwayajayisyen.com" },
        skipWaiting: () => undefined
      }
    });

    listeners.get("install")?.({
      waitUntil(promise) {
        installPromise = promise;
      }
    });
    await installPromise;

    expect(fetchedAssets).toEqual([
      "https://vwayajayisyen.com/_next/static/chunks/runtime.js",
      "https://vwayajayisyen.com/_next/static/chunks/offline.js"
    ]);
    expect(cachedAssets).toEqual(fetchedAssets);
  });

  it("removes the legacy worker cache and reads fallbacks only from current caches", () => {
    expect(source).toContain('const LEGACY_CACHE_NAMES = ["public-shell-v1"]');
    expect(source).toContain("LEGACY_CACHE_NAMES.includes(key)");
    expect(source).toContain("await pageCache.match(request)");
    expect(source).toContain("await staticCache.match(OFFLINE_URL)");
    expect(source).not.toContain("await caches.match(OFFLINE_URL)");
  });
});
