import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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
});
