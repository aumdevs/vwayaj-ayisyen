import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig } from "@/lib/config/runtime";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { refreshAuthSession } from "@/lib/supabase/proxy";

const NEXT_IMAGE_FILL_STYLE_SHA256 = "'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc='";

function buildContentSecurityPolicy(nonce: string): string {
  const isDevelopment = process.env.NODE_ENV === "development";
  const connectSources = ["'self'"];
  const supabase = getSupabasePublicConfig();

  if (supabase) {
    const origin = new URL(supabase.url).origin;
    connectSources.push(origin, origin.replace(/^http/, "ws"));
  }
  if (isDevelopment) connectSources.push("ws:", "http:");

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    `style-src-attr 'unsafe-hashes' ${NEXT_IMAGE_FILL_STYLE_SHA256}`,
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    `connect-src ${connectSources.join(" ")}`,
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
  ].join("; ");
}

function applyResponseHeaders(response: NextResponse, csp: string, privateSurface: boolean) {
  response.headers.set("Content-Security-Policy", csp);
  if (privateSurface) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Pragma", "no-cache");
  }
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  if (pathname === "/offline") return NextResponse.next();

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (!firstSegment || !isLocale(firstSegment)) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-locale", firstSegment);
  requestHeaders.set("Content-Security-Policy", csp);

  const privateSurface =
    /^\/(ht|fr|es|pt|en)\/(portal|advisor|professional|editor|moderation|admin)(\/|$)/.test(
      pathname
    );
  const authSurface = /^\/(ht|fr|es|pt|en)\/auth(\/|$)/.test(pathname);
  const { response, claims } = await refreshAuthSession(request, requestHeaders);

  if (privateSurface && !claims) {
    const url = new URL(`/${firstSegment}/auth/sign-in`, request.url);
    url.searchParams.set("reason", "required");
    return applyResponseHeaders(NextResponse.redirect(url), csp, true);
  }

  return applyResponseHeaders(response, csp, privateSurface || authSurface);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|manifest.webmanifest|sw.js|.*\\.(?:png|jpg|jpeg|gif|webp|avif|woff2|css|js)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
};
