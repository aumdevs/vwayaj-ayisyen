#!/usr/bin/env node
import { appendFile, readFile } from "node:fs/promises";

const file = process.argv[2];
if (!file) throw new Error("Expected Supabase env output file.");
const githubEnvFile = process.argv[3];
if (!githubEnvFile) throw new Error("Expected the GitHub environment file path.");
const text = await readFile(file, "utf8");
const values = Object.fromEntries(
  text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1).replace(/^"|"$/g, "")];
    }),
);

const map = {
  NEXT_PUBLIC_SUPABASE_URL: values.API_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: values.ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: values.SERVICE_ROLE_KEY,
};

for (const [key, value] of Object.entries(map)) {
  if (!value) throw new Error(`Supabase CLI did not provide required value for ${key}.`);
  if (/[\r\n]/.test(value)) throw new Error(`Unsafe newline in Supabase value for ${key}.`);

  // Workflow commands must remain on stdout. Only KEY=VALUE lines belong in GITHUB_ENV.
  console.log(`::add-mask::${value}`);
  await appendFile(githubEnvFile, `${key}=${value}\n`, { encoding: "utf8", mode: 0o600 });
}
