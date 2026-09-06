import "server-only";

import { cookies } from "next/headers";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import type { MobileViewer } from "@/types/account";

export const FIREBASE_SESSION_COOKIE = "vwayaj_firebase_session";
export const FIREBASE_SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

type FirebaseProfile = {
  displayName?: unknown;
  email?: unknown;
  googlePhotoUrl?: unknown;
  phone?: unknown;
  residenceCountry?: unknown;
  birthDate?: unknown;
  notificationsEnabled?: unknown;
  hasCustomAvatar?: unknown;
  savedArticleSlugs?: unknown;
};

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function getFirebaseViewer(): Promise<MobileViewer | null> {
  const services = getFirebaseAdminServices();
  if (!services) return null;
  const sessionCookie = (await cookies()).get(FIREBASE_SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await services.auth.verifySessionCookie(sessionCookie, true);
    if (decoded.firebase?.sign_in_provider !== "google.com") return null;
    const snapshot = await services.db.collection("profiles").doc(decoded.uid).get();
    const profile = (snapshot.data() ?? {}) as FirebaseProfile;
    const savedArticleSlugs = Array.isArray(profile.savedArticleSlugs)
      ? profile.savedArticleSlugs.filter((value): value is string => typeof value === "string")
      : [];

    return {
      id: decoded.uid,
      email: optionalString(profile.email) ?? optionalString(decoded.email),
      displayName: optionalString(profile.displayName) ?? optionalString(decoded.name),
      residenceCountry: optionalString(profile.residenceCountry),
      phone: optionalString(profile.phone),
      birthDate: optionalString(profile.birthDate),
      photoUrl: optionalString(profile.googlePhotoUrl) ?? optionalString(decoded.picture),
      hasCustomAvatar: profile.hasCustomAvatar === true,
      notificationsEnabled: profile.notificationsEnabled === true,
      savedArticleSlugs
    };
  } catch {
    return null;
  }
}
