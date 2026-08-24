import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config/runtime";

afterEach(() => vi.unstubAllEnvs());

describe("public runtime configuration", () => {
  it("uses a safe localhost fallback for missing or malformed site URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not-a-url");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });

  it("uses the automatic Vercel hostname when no explicit site URL exists", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "preview.example.vercel.app");
    expect(getSiteUrl().toString()).toBe("https://preview.example.vercel.app/");
  });

  it("accepts an explicit valid site URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org/base");
    expect(getSiteUrl().toString()).toBe("https://example.org/base");
  });

  it("keeps previews opt-in while always indexing the launched public domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "TRUE");
    expect(isIndexingAllowed()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    expect(isIndexingAllowed()).toBe(true);

    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://vwayajayisyen.com");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "false");
    expect(isIndexingAllowed()).toBe(true);
  });
});
