import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PrivacyAdminQueueData } from "@/types/privacy";

const openStatuses = ["received", "identity_check", "in_progress"] as const;

export async function getAdminPrivacyRequestQueue(): Promise<PrivacyAdminQueueData> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { available: false, requests: [] };

  const { data, error } = await supabase
    .from("data_subject_requests")
    .select("id, user_id, request_type, description, status, locale, created_at, updated_at")
    .in("status", openStatuses)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) return { available: false, requests: [] };

  return {
    available: true,
    requests: (data ?? []).map((request) => ({
      createdAt: request.created_at,
      description: request.description,
      id: request.id,
      locale: request.locale,
      requestType: request.request_type,
      status: request.status,
      updatedAt: request.updated_at,
      userId: request.user_id
    }))
  };
}
