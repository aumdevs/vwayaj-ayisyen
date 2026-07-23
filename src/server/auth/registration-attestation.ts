import "server-only";

import { createHmac, randomUUID } from "node:crypto";
import { getTurnstileSiteKey, isPublicRegistrationEnabled } from "@/lib/config/runtime";

const TERMS_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const MINIMUM_SIGNING_KEY_LENGTH = 32;

export type RegistrationAttestation = {
  email: string;
  registrationNonce: string;
  registrationSignature: string;
  termsAcceptedAt: string;
  termsVersion: string;
};

function getRegistrationSigningKey(): string | null {
  const key = process.env.REGISTRATION_GATE_SIGNING_KEY?.trim();
  return key && key.length >= MINIMUM_SIGNING_KEY_LENGTH ? key : null;
}

export function getRegistrationTermsVersion(): string | null {
  const version = process.env.REGISTRATION_TERMS_VERSION?.trim();
  return version && TERMS_VERSION_PATTERN.test(version) ? version : null;
}

export function isPublicRegistrationReady(): boolean {
  return (
    isPublicRegistrationEnabled() &&
    getTurnstileSiteKey() !== null &&
    getRegistrationTermsVersion() !== null &&
    getRegistrationSigningKey() !== null
  );
}

export function createRegistrationAttestation(email: string): RegistrationAttestation | null {
  if (!isPublicRegistrationEnabled() || !getTurnstileSiteKey()) return null;

  const termsVersion = getRegistrationTermsVersion();
  const signingKey = getRegistrationSigningKey();
  if (!termsVersion || !signingKey) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const termsAcceptedAt = new Date().toISOString();
  const registrationNonce = randomUUID();
  const payload = [normalizedEmail, termsVersion, termsAcceptedAt, registrationNonce].join("\n");
  const registrationSignature = createHmac("sha256", signingKey)
    .update(payload, "utf8")
    .digest("hex");

  return {
    email: normalizedEmail,
    registrationNonce,
    registrationSignature,
    termsAcceptedAt,
    termsVersion
  };
}
