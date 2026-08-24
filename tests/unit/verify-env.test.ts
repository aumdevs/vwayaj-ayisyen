import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

function verifyEnv(extra: Record<string, string>) {
  return spawnSync(process.execPath, ["scripts/verify-env.mjs"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { NODE_ENV: "test", ...extra }
  });
}

describe("public environment validation", () => {
  it("accepts the two public production values", () => {
    const result = verifyEnv({
      NEXT_PUBLIC_ALLOW_INDEXING: "true",
      NEXT_PUBLIC_SITE_URL: "https://vwayajayisyen.com"
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Environment variable checks passed.");
  });

  it("rejects an invalid URL or indexing value", () => {
    const result = verifyEnv({
      NEXT_PUBLIC_ALLOW_INDEXING: "yes",
      NEXT_PUBLIC_SITE_URL: "not-a-url"
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL");
    expect(result.stderr).toContain('NEXT_PUBLIC_ALLOW_INDEXING must be "true" or "false"');
  });

  it("rejects obsolete public variables that could expose credentials or hidden services", () => {
    const result = verifyEnv({
      NEXT_PUBLIC_ALLOW_INDEXING: "false",
      NEXT_PUBLIC_SITE_URL: "https://example.com",
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co"
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("is no longer permitted");
  });
});
