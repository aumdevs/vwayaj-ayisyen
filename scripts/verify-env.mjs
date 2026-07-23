#!/usr/bin/env node
const env = process.env;
const errors = [];
const publishedTermsVersion = "terms-2026-07-23-v1";
const publishedPrivacyVersion = "privacy-2026-07-23-v1";

function requireValue(name) {
  if (!env[name]?.trim()) errors.push(`${name} is required`);
}
function requireValidValue(name, predicate, requirement) {
  const value = env[name]?.trim();
  if (!value) {
    errors.push(`${name} is required`);
  } else if (!predicate(value)) {
    errors.push(`${name} ${requirement}`);
  }
}
function featureEnabled(name) {
  // DISABLE_* flags are fail-closed: a feature is enabled only when explicitly false.
  return env[name] === "false";
}

const publicRegistrationEnabled = featureEnabled("DISABLE_PUBLIC_REGISTRATION");
const adminBootstrapEnabled = env.ALLOW_ADMIN_BOOTSTRAP === "true";

requireValue("NEXT_PUBLIC_SITE_URL");
requireValue("NEXT_PUBLIC_SUPABASE_URL");
requireValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
// Supabase CAPTCHA also protects sign-in and recovery, not only registration.
requireValue("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
if (publicRegistrationEnabled) {
  requireValidValue(
    "REGISTRATION_TERMS_VERSION",
    (value) => value === publishedTermsVersion,
    `must equal the published version ${publishedTermsVersion}`
  );
  requireValidValue(
    "REGISTRATION_PRIVACY_VERSION",
    (value) => value === publishedPrivacyVersion,
    `must equal the published version ${publishedPrivacyVersion}`
  );
}
if (publicRegistrationEnabled || adminBootstrapEnabled) {
  requireValidValue(
    "REGISTRATION_GATE_SIGNING_KEY",
    (value) => value.length >= 32,
    "must contain at least 32 characters"
  );
}
if (featureEnabled("DISABLE_PAYMENTS")) {
  requireValue("STRIPE_SECRET_KEY");
  requireValue("STRIPE_WEBHOOK_SECRET");
  requireValue("STRIPE_API_VERSION");
}
if (featureEnabled("DISABLE_DOCUMENT_UPLOADS")) {
  requireValue("MALWARE_SCANNER_URL");
  requireValue("MALWARE_SCANNER_TOKEN");
  requireValue("DOCUMENT_METADATA_ENCRYPTION_KEY_V1");
}
if (featureEnabled("DISABLE_AI_ASSISTANT")) {
  requireValue("OPENAI_API_KEY");
  requireValue("AI_MODEL");
  requireValue("AI_EMBEDDING_MODEL");
}
if (featureEnabled("DISABLE_PUBLIC_INTAKE")) {
  requireValue("CRM_ENCRYPTION_KEY_V1");
  requireValue("CRM_BLIND_INDEX_KEY_V1");
}
if (featureEnabled("DISABLE_WHATSAPP")) {
  requireValue("NEXT_PUBLIC_WHATSAPP_NUMBER");
}
if (featureEnabled("DISABLE_APPOINTMENTS")) {
  requireValue("MEETING_PROVIDER");
}
if (adminBootstrapEnabled) {
  requireValue("SUPABASE_SERVICE_ROLE_KEY");
  requireValidValue(
    "BOOTSTRAP_ADMIN_EMAIL",
    (value) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "must be a valid private owner email"
  );
  requireValue("BOOTSTRAP_ADMIN_PASSWORD");
  requireValue("EXPECTED_SUPABASE_PROJECT_REF");
}

for (const [key, value] of Object.entries(env)) {
  if (key.startsWith("NEXT_PUBLIC_") && /(SECRET|SERVICE|PASSWORD|TOKEN|PRIVATE|ENCRYPTION)/i.test(key)) {
    errors.push(`Potential secret uses NEXT_PUBLIC_ prefix: ${key}`);
  }
  if (key.startsWith("NEXT_PUBLIC_") && value && value.includes("service_role")) {
    errors.push(`Potential service role key exposed by ${key}`);
  }
}

if (errors.length) {
  console.error("Environment validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log("Environment variable checks passed.");
