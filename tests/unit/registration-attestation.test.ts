import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  createRegistrationAttestation,
  getRegistrationTermsVersion,
  isPublicRegistrationReady
} from "@/server/auth/registration-attestation";

const signingKey = "test_registration_gate_signing_key_at_least_32_chars";

function configureRegistration() {
  vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
  vi.stubEnv("REGISTRATION_TERMS_VERSION", "terms-2026-07-v1");
  vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", signingKey);
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("server registration attestation", () => {
  it("requires every registration gate and a valid terms version", () => {
    configureRegistration();
    expect(isPublicRegistrationReady()).toBe(true);
    expect(getRegistrationTermsVersion()).toBe("terms-2026-07-v1");

    vi.stubEnv("REGISTRATION_TERMS_VERSION", "contains spaces");
    expect(getRegistrationTermsVersion()).toBeNull();
    expect(isPublicRegistrationReady()).toBe(false);

    vi.stubEnv("REGISTRATION_TERMS_VERSION", "terms-2026-07-v1");
    vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", "too-short");
    expect(isPublicRegistrationReady()).toBe(false);
  });

  it("creates a short-lived HMAC bound to normalized email and terms", () => {
    configureRegistration();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T14:00:00.123Z"));

    const attestation = createRegistrationAttestation("  New@Example.COM ");

    expect(attestation).not.toBeNull();
    expect(attestation).toMatchObject({
      email: "new@example.com",
      termsAcceptedAt: "2026-07-23T14:00:00.123Z",
      termsVersion: "terms-2026-07-v1"
    });
    const expectedSignature = createHmac("sha256", signingKey)
      .update(
        [
          attestation?.email,
          attestation?.termsVersion,
          attestation?.termsAcceptedAt,
          attestation?.registrationNonce
        ].join("\n"),
        "utf8"
      )
      .digest("hex");
    expect(attestation?.registrationSignature).toBe(expectedSignature);
  });
});
