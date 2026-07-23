import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getSiteUrl,
  getSupabasePublicConfig,
  getTurnstileSiteKey,
  isIndexingAllowed,
  isPublicRegistrationEnabled
} from "@/lib/config/runtime";

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

  it("returns no Supabase configuration unless both public values are valid", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "invalid");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "key");
    expect(getSupabasePublicConfig()).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
    expect(getSupabasePublicConfig()).toBeNull();
  });

  it("returns a complete public Supabase configuration", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    expect(getSupabasePublicConfig()).toEqual({
      url: "https://project.supabase.co",
      publishableKey: "sb_publishable_test"
    });
  });

  it("allows indexing only for the exact true value", () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "TRUE");
    expect(isIndexingAllowed()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    expect(isIndexingAllowed()).toBe(true);
  });

  it("keeps public registration closed unless the kill switch is explicitly disabled", () => {
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "");
    expect(isPublicRegistrationEnabled()).toBe(false);
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "FALSE");
    expect(isPublicRegistrationEnabled()).toBe(false);
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
    expect(isPublicRegistrationEnabled()).toBe(true);
  });

  it("returns no Turnstile site key for an empty value", () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "  ");
    expect(getTurnstileSiteKey()).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    expect(getTurnstileSiteKey()).toBe("public-site-key");
  });
});
