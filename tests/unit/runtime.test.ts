import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getSiteUrl,
  isIndexingAllowed,
  getFirebasePublicConfig,
  isFirebaseAccountsReady,
  isSupportEmailReady
} from "@/lib/config/runtime";

afterEach(() => vi.unstubAllEnvs());

describe("public runtime configuration", () => {
  it("keeps account access unavailable when public configuration is incomplete", () => {
    vi.stubEnv("ACCOUNTS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "");
    expect(getFirebasePublicConfig()).toBeNull();
    expect(isFirebaseAccountsReady()).toBe(false);
  });

  it("requires a supported mail provider, its credential and a sender", () => {
    vi.stubEnv("EMAIL_PROVIDER", "unsupported");
    vi.stubEnv("EMAIL_PROVIDER_API_KEY", "test-mail-key");
    vi.stubEnv("EMAIL_FROM", "support@example.com");
    expect(isSupportEmailReady()).toBe(false);
    vi.stubEnv("EMAIL_PROVIDER", "resend");
    vi.stubEnv("EMAIL_PROVIDER_API_KEY", "");
    expect(isSupportEmailReady()).toBe(false);
    vi.stubEnv("EMAIL_PROVIDER_API_KEY", "test-mail-key");
    vi.stubEnv("EMAIL_FROM", "");
    expect(isSupportEmailReady()).toBe(false);
    vi.stubEnv("EMAIL_FROM", "support@example.com");
    expect(isSupportEmailReady()).toBe(true);
  });

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

  it("keeps previews opt-in while indexing the launched production domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "TRUE");
    expect(isIndexingAllowed()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    expect(isIndexingAllowed()).toBe(true);

    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://vwayajayisyen.com");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "false");
    expect(isIndexingAllowed()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "production");
    expect(isIndexingAllowed()).toBe(true);
  });
});
