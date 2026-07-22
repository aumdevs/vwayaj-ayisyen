#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import { chmod, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = process.argv[2];
if (!output) {
  console.error("Usage: node scripts/generate-secrets.mjs /absolute/path/.env.secrets.local");
  process.exit(1);
}

const vars = [
  "CRM_ENCRYPTION_KEY_V1",
  "CRM_BLIND_INDEX_KEY_V1",
  "APP_SIGNING_KEY",
  "MEETING_URL_ENCRYPTION_KEY_V1",
  "DOCUMENT_METADATA_ENCRYPTION_KEY_V1",
  "CRON_SECRET",
];

const lines = [
  "# Generated locally. Do not commit. Store in an approved secret manager.",
  ...vars.map((name) => `${name}=${randomBytes(48).toString("base64url")}`),
  "",
];

const path = resolve(output);
await writeFile(path, lines.join("\n"), { encoding: "utf8", mode: 0o600, flag: "wx" });
await chmod(path, 0o600);
console.log(`Created ${path} with mode 600. Secret values were not printed.`);
