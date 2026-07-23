import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getClaims: vi.fn(),
  rpc: vi.fn(),
  revalidatePath: vi.fn()
}));

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({
    auth: { getClaims: mocks.getClaims },
    rpc: mocks.rpc
  }))
}));

import { submitPrivacyRequestAction } from "@/app/[locale]/privacy-actions";

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

beforeEach(() => {
  mocks.getClaims.mockResolvedValue({
    data: { claims: { sub: "00000000-0000-4000-8000-000000000123" } },
    error: null
  });
  mocks.rpc.mockResolvedValue({ data: "00000000-0000-4000-8000-000000000124", error: null });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("privacy request action", () => {
  it("submits only user-controlled fields through the restricted RPC", async () => {
    const result = await submitPrivacyRequestAction(
      "es",
      { status: "idle" },
      formData({
        description: "Quiero una copia de los datos de mi cuenta.",
        request_type: "access"
      })
    );

    expect(result).toEqual({ status: "submitted" });
    expect(mocks.rpc).toHaveBeenCalledWith("submit_data_subject_request", {
      p_description: "Quiero una copia de los datos de mi cuenta.",
      p_locale: "es",
      p_request_type: "access"
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/es/portal/privacy");
  });

  it("rejects invalid input before reading the session", async () => {
    const result = await submitPrivacyRequestAction(
      "es",
      { status: "idle" },
      formData({
        description: "x".repeat(2001),
        request_type: "access"
      })
    );

    expect(result).toEqual({ status: "invalid" });
    expect(mocks.getClaims).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("fails closed without an authenticated session before calling the RPC", async () => {
    mocks.getClaims.mockResolvedValue({ data: { claims: {} }, error: null });

    const result = await submitPrivacyRequestAction(
      "pt",
      { status: "idle" },
      formData({
        description: "",
        request_type: "delete"
      })
    );

    expect(result).toEqual({ status: "unavailable" });
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("fails closed when the independently protected RPC rejects the request", async () => {
    mocks.rpc.mockResolvedValue({
      data: null,
      error: { code: "42501", message: "Authentication required." }
    });

    const result = await submitPrivacyRequestAction(
      "pt",
      { status: "idle" },
      formData({
        description: "",
        request_type: "delete"
      })
    );

    expect(result).toEqual({ status: "unavailable" });
    expect(mocks.rpc).toHaveBeenCalledWith("submit_data_subject_request", {
      p_description: undefined,
      p_locale: "pt",
      p_request_type: "delete"
    });
  });

  it("ignores a forged form locale and uses the server-bound route locale", async () => {
    const result = await submitPrivacyRequestAction(
      "pt",
      { status: "idle" },
      formData({
        description: "",
        locale: "es",
        request_type: "export"
      })
    );

    expect(result).toEqual({ status: "submitted" });
    expect(mocks.rpc).toHaveBeenCalledWith("submit_data_subject_request", {
      p_description: undefined,
      p_locale: "pt",
      p_request_type: "export"
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/pt/portal/privacy");
  });

  it("rejects an invalid server-bound locale before reading the session", async () => {
    const result = await submitPrivacyRequestAction(
      "invalid",
      { status: "idle" },
      formData({
        description: "",
        request_type: "access"
      })
    );

    expect(result).toEqual({ status: "invalid" });
    expect(mocks.getClaims).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
});
