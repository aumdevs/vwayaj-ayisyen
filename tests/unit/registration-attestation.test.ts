import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  createRegistrationAttestation,
  getRegistrationPrivacyVersion,
  getRegistrationTermsVersion,
  isPublicRegistrationReady
} from "@/server/auth/registration-attestation";
import { getPublishedLegalDocumentHash } from "@/server/legal/document-hash";

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
    const termsContentHash = getPublishedLegalDocumentHash("terms", "es");
    const privacyContentHash = getPublishedLegalDocumentHash("privacy", "es");
    expect(attestation).toMatchObject({
      acceptedAt: "2026-07-23T14:00:00.123Z",
      ageCapacityMechanism: "signup_age_capacity_checkbox",
      email: "new@example.com",
      legalLocale: "es",
      privacyAcceptanceMechanism: "signup_privacy_acknowledgement_checkbox",
      privacyContentHash,
      privacyVersion,
      termsAcceptanceMechanism: "signup_terms_checkbox",
      termsContentHash,
      termsVersion
    });
    const expectedSignature = createHmac("sha256", signingKey)
      .update(
        [
          attestation?.email,
          attestation?.termsVersion,
          attestation?.termsContentHash,
          attestation?.privacyVersion,
          attestation?.privacyContentHash,
          attestation?.legalLocale,
          attestation?.termsAcceptanceMechanism,
          attestation?.privacyAcceptanceMechanism,
          attestation?.ageCapacityMechanism,
          attestation?.acceptedAt,
          attestation?.registrationNonce
        ].join("\n"),
        "utf8"
      )
      .digest("hex");
    expect(attestation?.registrationSignature).toBe(expectedSignature);
  });
});
