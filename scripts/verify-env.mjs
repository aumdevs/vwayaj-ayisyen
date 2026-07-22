#!/usr/bin/env node
const env = process.env;
const errors = [];

function requireValue(name) {
  if (!env[name]?.trim()) errors.push(`${name} is required`);
}
function featureEnabled(name) {
  // DISABLE_* flags are fail-closed: a feature is enabled only when explicitly false.
  return env[name] === "false";
}

requireValue("NEXT_PUBLIC_SITE_URL");
requireValue("NEXT_PUBLIC_SUPABASE_URL");
requireValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

if (featureEnabled("DISABLE_PAYMENTS")) {
  requireValue("STRIPE_SECRET_KEY");
  requireValue("STRIPE_WEBHOOK_SECRET");
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
if (env.ALLOW_ADMIN_BOOTSTRAP === "true") {
  requireValue("SUPABASE_SERVICE_ROLE_KEY");
  requireValue("BOOTSTRAP_ADMIN_EMAIL");
  requireValue("BOOTSTRAP_ADMIN_PASSWORD");
  requireValue("EXPECTED_SUPABASE_PROJECT_REF");
  if (env.BOOTSTRAP_ADMIN_EMAIL !== "admin@aumprodz.com") {
    errors.push("BOOTSTRAP_ADMIN_EMAIL must be admin@aumprodz.com");
  }
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
console.log("Environment variable presence checks passed.");
