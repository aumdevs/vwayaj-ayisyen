import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  createRegistrationAttestation,
  getRegistrationPrivacyVersion,
  getRegistrationTermsVersion,
  isPublicRegistrationReady
} from "@/server/auth/registration-attestation";

const signingKey = "test_registration_gate_signing_key_at_least_32_chars";
const privacyVersion = "privacy-2026-07-23-v1";
const termsVersion = "terms-2026-07-23-v1";

function configureRegistration() {
  vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
  vi.stubEnv("REGISTRATION_PRIVACY_VERSION", privacyVersion);
  vi.stubEnv("REGISTRATION_TERMS_VERSION", termsVersion);
  vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", signingKey);
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("server registration attestation", () => {
  it("requires every registration gate and the exact published legal versions", () => {
    configureRegistration();
    expect(isPublicRegistrationReady()).toBe(true);
    expect(getRegistrationPrivacyVersion()).toBe(privacyVersion);
    expect(getRegistrationTermsVersion()).toBe(termsVersion);

    vi.stubEnv("REGISTRATION_TERMS_VERSION", "contains spaces");
    expect(getRegistrationTermsVersion()).toBeNull();
    expect(isPublicRegistrationReady()).toBe(false);

    vi.stubEnv("REGISTRATION_TERMS_VERSION", termsVersion);
    vi.stubEnv("REGISTRATION_PRIVACY_VERSION", "privacy-old-version");
    expect(getRegistrationPrivacyVersion()).toBeNull();
    expect(isPublicRegistrationReady()).toBe(false);

    vi.stubEnv("REGISTRATION_PRIVACY_VERSION", privacyVersion);
    vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", "too-short");
    expect(isPublicRegistrationReady()).toBe(false);
  });

  it("creates a short-lived HMAC bound to email, locale and both documents", () => {
    configureRegistration();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T14:00:00.123Z"));

    const attestation = createRegistrationAttestation("  New@Example.COM ", "es");

    expect(attestation).not.toBeNull();
    expect(attestation).toMatchObject({
      acceptanceMechanism: "signup_checkbox",
      acceptedAt: "2026-07-23T14:00:00.123Z",
      email: "new@example.com",
      legalLocale: "es",
      privacyVersion,
      termsVersion
    });
    const expectedSignature = createHmac("sha256", signingKey)
      .update(
        [
          attestation?.email,
          attestation?.termsVersion,
          attestation?.privacyVersion,
          attestation?.legalLocale,
          attestation?.acceptanceMechanism,
          attestation?.acceptedAt,
          attestation?.registrationNonce
        ].join("\n"),
        "utf8"
      )
      .digest("hex");
    expect(attestation?.registrationSignature).toBe(expectedSignature);
  });
});
