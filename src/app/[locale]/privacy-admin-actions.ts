"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Locale } from "@/types/domain";

const completionSchema = z.object({
  identityVerificationMethod: z.string().trim().min(3).max(160),
  requestId: z.uuid(),
  resolutionSummary: z.string().trim().min(10).max(2000),
  terminalStatus: z.enum(["fulfilled", "denied", "cancelled"])
});

export type PrivacyAdminActionState = {
  status: "idle" | "invalid" | "resolved" | "unavailable";
};

export async function completePrivacyRequestAction(
  renderedLocale: string,
  _previous: PrivacyAdminActionState,
  formData: FormData
): Promise<PrivacyAdminActionState> {
  if (!isLocale(renderedLocale)) return { status: "invalid" };

  const parsed = completionSchema.safeParse({
    identityVerificationMethod: formData.get("identity_verification_method"),
    requestId: formData.get("request_id"),
    resolutionSummary: formData.get("resolution_summary"),
    terminalStatus: formData.get("terminal_status")
  });
  if (!parsed.success) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };
  const { data, error: claimsError } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  if (claimsError || !userId || claims?.aal !== "aal2") return { status: "unavailable" };

  const { data: roles, error: rolesError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .in("role", ["admin", "super_admin"])
    .limit(1);
  if (rolesError || !roles?.[0]) return { status: "unavailable" };

  const { error } = await supabase.rpc("complete_data_subject_request", {
    p_identity_verification_method: parsed.data.identityVerificationMethod,
    p_request_id: parsed.data.requestId,
    p_resolution_summary: parsed.data.resolutionSummary,
    p_terminal_status: parsed.data.terminalStatus
  });
  if (error) return { status: "unavailable" };

  revalidatePath(localizedPath(renderedLocale as Locale, "admin/privacy-requests"));
  return { status: "resolved" };
}
