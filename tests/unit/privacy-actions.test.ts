import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  getClaims: vi.fn(),
  insert: vi.fn(),
  revalidatePath: vi.fn()
}));

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({
    auth: { getClaims: mocks.getClaims },
    from: mocks.from
  }))
}));

import { submitPrivacyRequestAction } from "@/app/[locale]/privacy-actions";

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

beforeEach(() => {
  mocks.from.mockReturnValue({ insert: mocks.insert });
  mocks.getClaims.mockResolvedValue({
    data: { claims: { sub: "00000000-0000-4000-8000-000000000123" } },
    error: null
  });
  mocks.insert.mockResolvedValue({ error: null });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("privacy request action", () => {
  it("stores an authenticated request through the user's RLS session", async () => {
    const result = await submitPrivacyRequestAction(
      { status: "idle" },
      formData({
        description: "Quiero una copia de los datos de mi cuenta.",
        locale: "es",
        request_type: "access"
      })
    );

    expect(result).toEqual({ status: "submitted" });
    expect(mocks.from).toHaveBeenCalledWith("data_subject_requests");
    expect(mocks.insert).toHaveBeenCalledWith({
      description: "Quiero una copia de los datos de mi cuenta.",
      identity_verification_method: "authenticated_session",
      locale: "es",
      request_type: "access",
      user_id: "00000000-0000-4000-8000-000000000123"
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/es/portal/privacy");
  });

  it("rejects invalid input before reading the session", async () => {
    const result = await submitPrivacyRequestAction(
      { status: "idle" },
      formData({
        description: "x".repeat(2001),
        locale: "es",
        request_type: "access"
      })
    );

    expect(result).toEqual({ status: "invalid" });
    expect(mocks.getClaims).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("fails closed without an authenticated user", async () => {
    mocks.getClaims.mockResolvedValue({ data: { claims: {} }, error: null });

    const result = await submitPrivacyRequestAction(
      { status: "idle" },
      formData({
        description: "",
        locale: "pt",
        request_type: "delete"
      })
    );

    expect(result).toEqual({ status: "unavailable" });
    expect(mocks.insert).not.toHaveBeenCalled();
  });
});
