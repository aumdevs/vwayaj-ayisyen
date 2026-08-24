#!/usr/bin/env node

const errors = [];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const indexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING;

if (!siteUrl) {
  errors.push("NEXT_PUBLIC_SITE_URL is required");
} else {
  try {
    const parsed = new URL(siteUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      errors.push("NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL");
    }
  } catch {
    errors.push("NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL");
  }
}

if (indexing !== undefined && indexing !== "true" && indexing !== "false") {
  errors.push('NEXT_PUBLIC_ALLOW_INDEXING must be "true" or "false"');
}

const obsoletePublicVariables = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
  "NEXT_PUBLIC_ANALYTICS_ENDPOINT"
];

for (const key of obsoletePublicVariables) {
  if (process.env[key]?.trim()) errors.push(`${key} is no longer permitted in the public-only site`);
}

for (const key of Object.keys(process.env)) {
  if (
    key.startsWith("NEXT_PUBLIC_") &&
    /(SECRET|SERVICE|PASSWORD|TOKEN|PRIVATE|ENCRYPTION)/i.test(key)
  ) {
    errors.push(`Potential secret uses NEXT_PUBLIC_ prefix: ${key}`);
  }
}

if (errors.length) {
  console.error("Environment validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Environment variable checks passed.");
