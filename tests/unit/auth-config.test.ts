import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readTomlBoolean(config: string, sectionName: string, key: string): boolean | null {
  let activeSection = "";

  for (const sourceLine of config.split("\n")) {
    const line = sourceLine.trim();
    const section = line.match(/^\[([^\]]+)\]$/);
    if (section) {
      activeSection = section[1] ?? "";
      continue;
    }

    if (activeSection !== sectionName) continue;
    const property = line.match(new RegExp(`^${key}\\s*=\\s*(true|false)$`));
    if (property) return property[1] === "true";
  }

  return null;
}

describe("Supabase Auth launch gate", () => {
  it("keeps both general and email signup disabled at the authoritative provider", () => {
    const config = readFileSync("supabase/config.toml", "utf8");

    expect(readTomlBoolean(config, "auth", "enable_signup")).toBe(false);
    expect(readTomlBoolean(config, "auth.email", "enable_signup")).toBe(false);
  });
});
