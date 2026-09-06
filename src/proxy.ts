import { NextResponse, type NextRequest } from "next/server";
import { getFirebasePublicConfig } from "@/lib/config/runtime";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";

const NEXT_IMAGE_FILL_STYLE_SHA256 = "'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc='";

function buildContentSecurityPolicy(nonce: string): string {
  const isDevelopment = process.env.NODE_ENV === "development";
  const connectSources = ["'self'"];
  const scriptSources = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"];
  const frameSources: string[] = [];
  const imageSources = ["'self'", "blob:", "data:"];
  const firebase = getFirebasePublicConfig();
  if (firebase) {
    connectSources.push(
      "https://identitytoolkit.googleapis.com",
      "https://securetoken.googleapis.com",
      "https://www.googleapis.com"
    );
    frameSources.push("https://accounts.google.com", `https://${firebase.authDomain}`);
    imageSources.push("https://lh3.googleusercontent.com", "https://*.googleusercontent.com");
  }

  if (isDevelopment) {
    connectSources.push("ws:", "http:");
    scriptSources.push("'unsafe-eval'");
  }

  return [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    `style-src 'self' 'nonce-${nonce}'`,
    `style-src-attr 'unsafe-hashes' ${NEXT_IMAGE_FILL_STYLE_SHA256}`,
    `img-src ${imageSources.join(" ")}`,
    "font-src 'self' data:",
    `connect-src ${connectSources.join(" ")}`,
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    `frame-src ${frameSources.length ? frameSources.join(" ") : "'none'"}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  if (pathname === "/offline") return NextResponse.next();

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (!firstSegment || !isLocale(firstSegment)) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }
  if (firstSegment !== "ht") {
    const redirectedPath = pathname.replace(/^\/(?:fr|es|pt|en)(?=\/|$)/, "/ht");
    return NextResponse.redirect(new URL(redirectedPath, request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-locale", firstSegment);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  if (pathname.startsWith("/ht/auth/") || pathname.startsWith("/ht/profile")) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Pragma", "no-cache");
  }
  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api(?:/|$)|_next/|icons/|images/|screenshots/|favicon\\.ico$|icon(?:-maskable|-monochrome)?\\.svg$|opengraph-image$|robots\\.txt$|sitemap\\.xml$|manifest\\.webmanifest$|sw\\.js$).*)"
    }
  ]
};
