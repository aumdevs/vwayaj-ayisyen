import { afterEach, describe, expect, it, vi } from "vitest";

const sdkLoaded = vi.hoisted(() => vi.fn());
vi.mock("server-only", () => ({}));
vi.mock("firebase-admin/app", () => {
  sdkLoaded();
  throw new Error("Account provider is unavailable in this public-only deployment");
});

import { getFirebaseAdminApp, getFirebaseAdminServices } from "@/lib/firebase/admin";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("public runtime isolation", () => {
  it.each([undefined, "false"])("does not load the account SDK with flag %s", async (flag) => {
    vi.stubEnv("ACCOUNTS_ENABLED", flag);
    await expect(getFirebaseAdminApp()).resolves.toBeNull();
    await expect(getFirebaseAdminServices()).resolves.toBeNull();
    expect(sdkLoaded).not.toHaveBeenCalled();
  });

  it("does not load the account SDK with incomplete configuration", async () => {
    vi.stubEnv("ACCOUNTS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "");
    await expect(getFirebaseAdminServices()).resolves.toBeNull();
    expect(sdkLoaded).not.toHaveBeenCalled();
  });
});
