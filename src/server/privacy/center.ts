import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PrivacyCenterData } from "@/types/privacy";

export async function getPrivacyCenterData(userId: string): Promise<PrivacyCenterData> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { available: false, profile: null, requests: [] };

  const [profileResult, requestsResult, consentsResult] = await Promise.all([
    supabase.from("profiles").select("id").eq("id", userId).maybeSingle(),
    supabase
      .from("data_subject_requests")
      .select("id, request_type, status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("consent_records")
      .select("consent_type, policy_version, locale, granted_at")
      .eq("user_id", userId)
      .eq("granted", true)
      .is("withdrawn_at", null)
      .in("consent_type", ["terms", "privacy"])
      .order("granted_at", { ascending: false })
  ]);

  if (profileResult.error || requestsResult.error || consentsResult.error) {
    return { available: false, profile: null, requests: [] };
  }

  const termsConsent = consentsResult.data?.find(({ consent_type }) => consent_type === "terms");
  const privacyConsent = consentsResult.data?.find(
    ({ consent_type }) => consent_type === "privacy"
  );

  return {
    available: true,
    profile: profileResult.data
      ? {
          privacyAcceptedAt: privacyConsent?.granted_at ?? null,
          privacyLocale:
            privacyConsent?.locale === "es" || privacyConsent?.locale === "pt"
              ? privacyConsent.locale
              : null,
          privacyVersion: privacyConsent?.policy_version ?? null,
          termsAcceptedAt: termsConsent?.granted_at ?? null,
          termsLocale:
            termsConsent?.locale === "es" || termsConsent?.locale === "pt"
              ? termsConsent.locale
              : null,
          termsVersion: termsConsent?.policy_version ?? null
        }
      : null,
    requests: (requestsResult.data ?? []).map((request) => ({
      createdAt: request.created_at,
      id: request.id,
      requestType: request.request_type,
      status: request.status
    }))
  };
}
