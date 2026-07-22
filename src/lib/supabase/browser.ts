import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/config/runtime";
import type { Database } from "@/types/database.generated";

export function createBrowserSupabaseClient() {
  const config = getSupabasePublicConfig();
  if (!config) throw new Error("Supabase public configuration is unavailable.");
  return createBrowserClient<Database>(config.url, config.publishableKey);
}
