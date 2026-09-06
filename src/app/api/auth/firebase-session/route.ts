import { NextResponse, type NextRequest } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { getSiteUrl, isFirebaseAccountsReady } from "@/lib/config/runtime";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import { FIREBASE_SESSION_COOKIE, FIREBASE_SESSION_MAX_AGE_SECONDS } from "@/lib/firebase/session";

const tokenSchema = z.object({ idToken: z.string().min(100).max(8192) });

function hasTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === request.nextUrl.origin || origin === getSiteUrl().origin;
}

export async function POST(request: NextRequest) {
  if (!isFirebaseAccountsReady())
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (
    !hasTrustedOrigin(request) ||
    !request.headers.get("content-type")?.includes("application/json")
  )
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const parsed = tokenSchema.safeParse(await request.json().catch(() => null));
  const services = getFirebaseAdminServices();
  if (!parsed.success || !services)
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  try {
    const decoded = await services.auth.verifyIdToken(parsed.data.idToken, true);
    const authAgeSeconds = Math.floor(Date.now() / 1000) - decoded.auth_time;
    if (
      decoded.firebase?.sign_in_provider !== "google.com" ||
      decoded.email_verified !== true ||
      !decoded.email ||
      authAgeSeconds > 5 * 60
    )
      return NextResponse.json({ error: "invalid_provider" }, { status: 401 });

    const sessionCookie = await services.auth.createSessionCookie(parsed.data.idToken, {
      expiresIn: FIREBASE_SESSION_MAX_AGE_SECONDS * 1000
    });
    const profileRef = services.db.collection("profiles").doc(decoded.uid);
    await services.db.runTransaction(async (transaction) => {
      const existing = await transaction.get(profileRef);
      const trustedIdentity = {
        email: decoded.email,
        googlePhotoUrl: decoded.picture ?? null,
        lastLoginAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      };
      if (existing.exists) {
        transaction.update(profileRef, trustedIdentity);
        return;
      }
      transaction.set(profileRef, {
        ...trustedIdentity,
        displayName: decoded.name ?? "",
        phone: "",
        residenceCountry: "",
        birthDate: "",
        notificationsEnabled: false,
        hasCustomAvatar: false,
        savedArticleSlugs: [],
        createdAt: FieldValue.serverTimestamp()
      });
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(FIREBASE_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: FIREBASE_SESSION_MAX_AGE_SECONDS
    });
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!hasTrustedOrigin(request))
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(FIREBASE_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}
