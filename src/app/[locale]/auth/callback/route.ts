import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  if (!isLocale(locale)) return NextResponse.redirect(new URL("/ht/auth/sign-in", request.url));
  const code = request.nextUrl.searchParams.get("code");
  const requestedNext = request.nextUrl.searchParams.get("next");
  const safeNext = requestedNext?.startsWith(`/${locale}/`)
    ? requestedNext
    : localizedPath(locale, "portal");
  const supabase = await createServerSupabaseClient();
  if (!code || !supabase) {
    return NextResponse.redirect(
      new URL(`${localizedPath(locale, "auth/sign-in")}?reason=callback`, request.url)
    );
  }
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`${localizedPath(locale, "auth/sign-in")}?reason=callback`, request.url)
    );
  }
  return NextResponse.redirect(new URL(safeNext, request.url));
}
