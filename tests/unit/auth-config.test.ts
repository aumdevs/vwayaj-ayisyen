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

function readTomlStringArray(config: string, sectionName: string, key: string): string[] {
  const header = `[${sectionName}]`;
  const sectionStart = config.indexOf(header);
  if (sectionStart < 0) return [];

  const body = config.slice(sectionStart + header.length);
  const nextSectionOffset = body.search(/\n\[[^\]]+\]/);
  const section = nextSectionOffset < 0 ? body : body.slice(0, nextSectionOffset);
  const property = section.match(new RegExp(`${key}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
  return [...(property?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1] ?? "");
}

describe("Supabase Auth launch gate", () => {
  it("keeps provider signup closed while retaining CAPTCHA enforcement", () => {
    const config = readFileSync("supabase/config.toml", "utf8");

    expect(readTomlBoolean(config, "auth", "enable_signup")).toBe(false);
    expect(readTomlBoolean(config, "auth.email", "enable_signup")).toBe(false);
    expect(readTomlBoolean(config, "auth.captcha", "enabled")).toBe(true);
    expect(config).toContain('provider = "turnstile"');
    expect(config).toContain('secret = "env(SUPABASE_AUTH_CAPTCHA_SECRET)"');
  });

  it("uses local callbacks and the local SMTP sink without production delivery", () => {
    const config = readFileSync("supabase/config.toml", "utf8");

    expect(readTomlStringArray(config, "auth", "additional_redirect_urls")).toEqual([
      "http://127.0.0.1:3000/**",
      "http://localhost:3000/**"
    ]);
    expect(readTomlBoolean(config, "local_smtp", "enabled")).toBe(true);
    expect(config).not.toContain("[auth.email.smtp]");
    expect(config).not.toContain("smtp.resend.com");
  });
});
