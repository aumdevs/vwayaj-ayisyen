import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { JwtPayload } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig } from "@/lib/config/runtime";
import type { Database } from "@/types/database.generated";

export type RefreshedSession = {
  response: NextResponse;
  claims: JwtPayload | null;
};

export async function refreshAuthSession(
  request: NextRequest,
  requestHeaders: Headers
): Promise<RefreshedSession> {
  const config = getSupabasePublicConfig();
  let response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!config) return { response, claims: null };

  const supabase = createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
        headers: Record<string, string>
      ) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: requestHeaders } });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      }
    }
  });

  try {
    const { data, error } = await supabase.auth.getClaims();
    if (error) return { response, claims: null };
    return { response, claims: data?.claims ?? null };
  } catch {
    return { response, claims: null };
  }
}
