import { beforeEach, describe, expect, it, vi } from "vitest";

const limit = vi.fn();
const order = vi.fn(() => ({ limit }));
const inFilter = vi.fn(() => ({ order }));
const select = vi.fn(() => ({ in: inFilter }));
const from = vi.fn(() => ({ select }));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({ from }))
}));

import { getAdminPrivacyRequestQueue } from "@/server/privacy/admin-queue";

describe("privacy administrator queue loader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    limit.mockResolvedValue({
      data: [
        {
          created_at: "2026-07-23T23:59:59.000Z",
          description: "Correct the spelling of my family name.",
          id: "00000000-0000-4000-8000-000000000124",
          locale: "en",
          request_type: "correct",
          status: "received",
          updated_at: "2026-07-23T23:59:59.000Z",
          user_id: "00000000-0000-4000-8000-000000000123"
        }
      ],
      error: null
    });
  });

  it("selects and returns submitted details for the privileged queue", async () => {
    const result = await getAdminPrivacyRequestQueue();

    expect(from).toHaveBeenCalledWith("data_subject_requests");
    expect(select).toHaveBeenCalledWith(
      "id, user_id, request_type, description, status, locale, created_at, updated_at"
    );
    expect(result.requests[0]).toMatchObject({
      description: "Correct the spelling of my family name.",
      requestType: "correct",
      status: "received"
    });
  });
});
