import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("offline cache policy", () => {
  const source = readFileSync(resolve(process.cwd(), "public/sw.js"), "utf8");

  it("precaches the public information experience", () => {
    for (const path of [
      '"/ht"',
      '"/ht/countries"',
      '"/ht/countries/chile"',
      '"/ht/countries/brazil"',
      '"/ht/travel/chile"',
      '"/ht/travel/brazil"',
      '"/ht/news"'
    ]) {
      expect(source).toContain(path);
    }
  });

  it("never caches API calls, no-store responses or cross-origin responses", () => {
    expect(source).toContain('url.pathname.startsWith("/api/")');
    expect(source).toContain("url.origin !== self.location.origin");
    expect(source).toContain('request.cache === "no-store"');
    expect(source).toContain('response.type !== "basic"');
    expect(source).toMatch(/private\|no-store/);
  });

  it("uses controlled updates and separate page and asset strategies", () => {
    expect(source).toContain('event.data?.type === "SKIP_WAITING"');
    expect(source).not.toContain("Notification.requestPermission");
    expect(source).toContain("networkFirst(request)");
    expect(source).toContain("staleWhileRevalidate(request)");
    expect(source).toContain("PAGE_CACHE");
    expect(source).toContain("STATIC_CACHE");
  });

  it("matches PWA launch queries to precached pages", () => {
    expect(source).toContain("pageCache.match(request, { ignoreSearch: true })");
  });

  it("precaches route-specific scripts, styles and images from every public page", () => {
    expect(source).toContain("PUBLIC_PAGE_URLS.map");
    expect(source).toContain("extractSameOriginAssetUrls(html)");
    expect(source).toContain('pathname.startsWith("/_next/static/")');
    expect(source).toContain('pathname.startsWith("/_next/image")');
    expect(source).toContain('pathname.startsWith("/images/")');
  });
});
