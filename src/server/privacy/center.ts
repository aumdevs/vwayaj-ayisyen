import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PrivacyCenterData } from "@/types/privacy";

export async function getPrivacyCenterData(userId: string): Promise<PrivacyCenterData> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { available: false, profile: null, requests: [] };

  const [profileResult, requestsResult, consentsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, terms_version, privacy_version, terms_accepted_at, privacy_accepted_at")
      .eq("id", userId)
      .maybeSingle(),
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
      .not("evidence_hash", "is", null)
      .in("consent_type", ["terms", "privacy"])
      .contains("scope", { provenance: "auth_hook_signed_v1" })
      .order("granted_at", { ascending: false })
  ]);

  if (profileResult.error || requestsResult.error || consentsResult.error) {
    return { available: false, profile: null, requests: [] };
  }

  const termsConsent = consentsResult.data?.find(({ consent_type }) => consent_type === "terms");
  const privacyConsent = consentsResult.data?.find(
    ({ consent_type }) => consent_type === "privacy"
  );
  const legacyTerms =
    !termsConsent &&
    Boolean(profileResult.data?.terms_version && profileResult.data.terms_accepted_at);
  const legacyPrivacy =
    !privacyConsent &&
    Boolean(profileResult.data?.privacy_version && profileResult.data.privacy_accepted_at);

  return {
    available: true,
    profile: profileResult.data
      ? {
          privacyAcceptedAt:
            privacyConsent?.granted_at ??
            (legacyPrivacy ? profileResult.data.privacy_accepted_at : null),
          privacyLegacy: legacyPrivacy,
          privacyLocale:
            privacyConsent?.locale === "es" || privacyConsent?.locale === "pt"
              ? privacyConsent.locale
              : null,
          privacyVersion:
            privacyConsent?.policy_version ??
            (legacyPrivacy ? profileResult.data.privacy_version : null),
          termsAcceptedAt:
            termsConsent?.granted_at ?? (legacyTerms ? profileResult.data.terms_accepted_at : null),
          termsLegacy: legacyTerms,
          termsLocale:
            termsConsent?.locale === "es" || termsConsent?.locale === "pt"
              ? termsConsent.locale
              : null,
          termsVersion:
            termsConsent?.policy_version ?? (legacyTerms ? profileResult.data.terms_version : null)
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
