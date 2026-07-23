import "server-only";

import { createHmac, randomUUID } from "node:crypto";
import { LEGAL_VERSIONS, type OfficialLegalLocale } from "@/content/legal";
import { getTurnstileSiteKey, isPublicRegistrationEnabled } from "@/lib/config/runtime";

const TERMS_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const MINIMUM_SIGNING_KEY_LENGTH = 32;
const TERMS_ACCEPTANCE_MECHANISM = "signup_terms_checkbox";
const PRIVACY_ACCEPTANCE_MECHANISM = "signup_privacy_acknowledgement_checkbox";

export type RegistrationAttestation = {
  acceptedAt: string;
  email: string;
  legalLocale: OfficialLegalLocale;
  privacyAcceptanceMechanism: typeof PRIVACY_ACCEPTANCE_MECHANISM;
  privacyVersion: string;
  registrationNonce: string;
  registrationSignature: string;
  termsAcceptanceMechanism: typeof TERMS_ACCEPTANCE_MECHANISM;
  termsVersion: string;
};

function getRegistrationSigningKey(): string | null {
  const key = process.env.REGISTRATION_GATE_SIGNING_KEY?.trim();
  return key && key.length >= MINIMUM_SIGNING_KEY_LENGTH ? key : null;
}

export function getRegistrationTermsVersion(): string | null {
  const version = process.env.REGISTRATION_TERMS_VERSION?.trim();
  return version && TERMS_VERSION_PATTERN.test(version) && version === LEGAL_VERSIONS.terms
    ? version
    : null;
}

export function getRegistrationPrivacyVersion(): string | null {
  const version = process.env.REGISTRATION_PRIVACY_VERSION?.trim();
  return version && TERMS_VERSION_PATTERN.test(version) && version === LEGAL_VERSIONS.privacy
    ? version
    : null;
}

export function isPublicRegistrationReady(): boolean {
  return (
    isPublicRegistrationEnabled() &&
    getTurnstileSiteKey() !== null &&
    getRegistrationTermsVersion() !== null &&
    getRegistrationPrivacyVersion() !== null &&
    getRegistrationSigningKey() !== null
  );
}

export function createRegistrationAttestation(
  email: string,
  legalLocale: OfficialLegalLocale
): RegistrationAttestation | null {
  if (!isPublicRegistrationEnabled() || !getTurnstileSiteKey()) return null;

  const termsVersion = getRegistrationTermsVersion();
  const privacyVersion = getRegistrationPrivacyVersion();
  const signingKey = getRegistrationSigningKey();
  if (!termsVersion || !privacyVersion || !signingKey) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const acceptedAt = new Date().toISOString();
  const registrationNonce = randomUUID();
  const payload = [
    normalizedEmail,
    termsVersion,
    privacyVersion,
    legalLocale,
    TERMS_ACCEPTANCE_MECHANISM,
    PRIVACY_ACCEPTANCE_MECHANISM,
    acceptedAt,
    registrationNonce
  ].join("\n");
  const registrationSignature = createHmac("sha256", signingKey)
    .update(payload, "utf8")
    .digest("hex");

  return {
    acceptedAt,
    email: normalizedEmail,
    legalLocale,
    privacyAcceptanceMechanism: PRIVACY_ACCEPTANCE_MECHANISM,
    privacyVersion,
    registrationNonce,
    registrationSignature,
    termsAcceptanceMechanism: TERMS_ACCEPTANCE_MECHANISM,
    termsVersion
  };
}
