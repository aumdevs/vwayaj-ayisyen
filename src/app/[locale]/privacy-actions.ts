"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Locale } from "@/types/domain";

const requestTypes = ["access", "correct", "delete", "export", "restrict", "object"] as const;

const privacyRequestSchema = z.object({
  description: z
    .string()
    .trim()
    .max(2000)
    .transform((value) => (value.length > 0 ? value : null)),
  requestType: z.enum(requestTypes)
});

export type PrivacyRequestActionState = {
  status: "idle" | "invalid" | "unavailable" | "submitted";
};

export async function submitPrivacyRequestAction(
  renderedLocale: string,
  _previous: PrivacyRequestActionState,
  formData: FormData
): Promise<PrivacyRequestActionState> {
  if (!isLocale(renderedLocale)) return { status: "invalid" };

  const parsed = privacyRequestSchema.safeParse({
    description: formData.get("description") ?? "",
    requestType: formData.get("request_type")
  });
  if (!parsed.success) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = typeof claimsData?.claims?.sub === "string" ? claimsData.claims.sub : null;
  if (claimsError || !userId) return { status: "unavailable" };

  const { error } = await supabase.rpc("submit_data_subject_request", {
    p_description: parsed.data.description ?? undefined,
    p_locale: renderedLocale as Locale,
    p_request_type: parsed.data.requestType
  });
  if (error) return { status: "unavailable" };

  revalidatePath(localizedPath(renderedLocale as Locale, "portal/privacy"));
  return { status: "submitted" };
}
