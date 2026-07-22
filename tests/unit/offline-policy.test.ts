import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("offline cache policy", () => {
  const source = readFileSync(resolve(process.cwd(), "public/sw.js"), "utf8");

  it("excludes every private and authentication surface", () => {
    for (const segment of [
      "/portal",
      "/admin",
      "/advisor",
      "/professional",
      "/editor",
      "/moderation",
      "/auth"
    ]) {
      expect(source).toContain(`"${segment}"`);
    }
  });

  it("never caches API calls", () => {
    expect(source).toContain('url.pathname.startsWith("/api/")');
  });
});
