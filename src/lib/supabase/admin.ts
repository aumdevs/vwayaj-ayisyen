import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/config/runtime";
import type { Database } from "@/types/database.generated";

export function createAdminSupabaseClient() {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!publicConfig || !serviceRoleKey) return null;

  return createClient<Database>(publicConfig.url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { "X-Client-Info": "haitian-legal-travel-server/1.0" } }
  });
}
