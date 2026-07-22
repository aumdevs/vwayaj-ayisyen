import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isLocale } from "@/lib/i18n/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiError } from "@/server/http/responses";

const querySchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .transform((value) => value.normalize("NFKC"));

export async function GET(request: NextRequest) {
  const query = querySchema.safeParse(request.nextUrl.searchParams.get("q"));
  const locale = request.nextUrl.searchParams.get("locale");
  if (!query.success || !locale || !isLocale(locale)) {
    return apiError("INVALID_REQUEST", "Use a query between 2 and 100 characters.", 400);
  }
  const supabase = await createServerSupabaseClient();
  if (!supabase) return apiError("SERVICE_UNAVAILABLE", "Search is temporarily unavailable.", 503);

  const { data, error } = await supabase.rpc("search_published_content", {
    p_locale: locale,
    p_query: query.data,
    p_limit: 10
  });
  if (error) return apiError("SERVICE_UNAVAILABLE", "Search is temporarily unavailable.", 503);

  return NextResponse.json(
    { items: data ?? [] },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" } }
  );
}
