#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const configPath = process.argv[2];
if (!configPath) throw new Error("Expected the Supabase config path.");

const requiredSections = new Set(["auth", "auth.email"]);
const changedSections = new Set();
let activeSection = "";
const source = await readFile(configPath, "utf8");

const output = source
  .split("\n")
  .map((line) => {
    const section = line.trim().match(/^\[([^\]]+)\]$/);
    if (section) {
      activeSection = section[1] ?? "";
      return line;
    }

    if (!requiredSections.has(activeSection)) return line;
    const property = line.match(/^(\s*enable_signup\s*=\s*)false(\s*(?:#.*)?)$/);
    if (!property) return line;
    if (changedSections.has(activeSection)) {
      throw new Error(`Duplicate enable_signup property in [${activeSection}].`);
    }

    changedSections.add(activeSection);
    return `${property[1]}true${property[2]}`;
  })
  .join("\n");

const missing = [...requiredSections].filter((section) => !changedSections.has(section));
if (missing.length > 0) {
  throw new Error(
    `Refusing to continue; fail-closed signup was not found in: ${missing.join(", ")}.`
  );
}

await writeFile(configPath, output, { encoding: "utf8", mode: 0o600 });
console.log("Enabled email signup in the ephemeral Supabase E2E configuration.");
