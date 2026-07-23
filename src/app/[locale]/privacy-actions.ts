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
  locale: z.string().refine(isLocale),
  requestType: z.enum(requestTypes)
});

export type PrivacyRequestActionState = {
  status: "idle" | "invalid" | "unavailable" | "submitted";
};

export async function submitPrivacyRequestAction(
  _previous: PrivacyRequestActionState,
  formData: FormData
): Promise<PrivacyRequestActionState> {
  const parsed = privacyRequestSchema.safeParse({
    description: formData.get("description") ?? "",
    locale: formData.get("locale"),
    requestType: formData.get("request_type")
  });
  if (!parsed.success) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };

  const { error } = await supabase.rpc("submit_data_subject_request", {
    p_description: parsed.data.description ?? undefined,
    p_locale: parsed.data.locale as Locale,
    p_request_type: parsed.data.requestType
  });
  if (error) return { status: "unavailable" };

  revalidatePath(localizedPath(parsed.data.locale as Locale, "portal/privacy"));
  return { status: "submitted" };
}
