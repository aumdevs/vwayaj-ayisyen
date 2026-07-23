import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PrivacyCenterData } from "@/types/privacy";

export async function getPrivacyCenterData(userId: string): Promise<PrivacyCenterData> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { available: false, profile: null, requests: [] };

  const [profileResult, requestsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("terms_version, privacy_version, terms_accepted_at, privacy_accepted_at")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("data_subject_requests")
      .select("id, request_type, status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10)
  ]);

  if (profileResult.error || requestsResult.error) {
    return { available: false, profile: null, requests: [] };
  }

  return {
    available: true,
    profile: profileResult.data
      ? {
          privacyAcceptedAt: profileResult.data.privacy_accepted_at,
          privacyVersion: profileResult.data.privacy_version,
          termsAcceptedAt: profileResult.data.terms_accepted_at,
          termsVersion: profileResult.data.terms_version
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
