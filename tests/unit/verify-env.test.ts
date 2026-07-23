import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const baseEnv: NodeJS.ProcessEnv = {
  NODE_ENV: "test",
  NEXT_PUBLIC_SITE_URL: "https://example.com",
  NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-test-key"
};

function verifyEnv(extra: Record<string, string>) {
  return spawnSync(process.execPath, ["scripts/verify-env.mjs"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...baseEnv, ...extra }
  });
}

describe("environment validation", () => {
  it("rejects a registration terms version or signing key that runtime would ignore", () => {
    const result = verifyEnv({
      DISABLE_PUBLIC_REGISTRATION: "false",
      REGISTRATION_TERMS_VERSION: "invalid version",
      REGISTRATION_GATE_SIGNING_KEY: "too-short"
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("REGISTRATION_TERMS_VERSION must match");
    expect(result.stderr).toContain("REGISTRATION_GATE_SIGNING_KEY must contain at least 32");
  });

  it("accepts the exact registration values consumed by runtime", () => {
    const result = verifyEnv({
      DISABLE_PUBLIC_REGISTRATION: "false",
      REGISTRATION_TERMS_VERSION: "terms-2026.07",
      REGISTRATION_GATE_SIGNING_KEY: "a-secure-test-signing-key-with-32-chars"
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Environment variable checks passed.");
  });

  it("also rejects a short signing key for administrator bootstrap", () => {
    const result = verifyEnv({
      ALLOW_ADMIN_BOOTSTRAP: "true",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-test",
      BOOTSTRAP_ADMIN_EMAIL: "admin@aumprodz.com",
      BOOTSTRAP_ADMIN_PASSWORD: "a".repeat(24),
      EXPECTED_SUPABASE_PROJECT_REF: "project-ref",
      REGISTRATION_GATE_SIGNING_KEY: "too-short"
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("REGISTRATION_GATE_SIGNING_KEY must contain at least 32");
  });
});
