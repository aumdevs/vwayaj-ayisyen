import "server-only";

import type { App } from "firebase-admin/app";
import { getFirebasePublicConfig, isFirebaseAccountsReady } from "@/lib/config/runtime";

export async function getFirebaseAdminApp(): Promise<App | null> {
  if (!isFirebaseAccountsReady()) return null;
  const { cert, getApp, getApps, initializeApp } = await import("firebase-admin/app");
  if (getApps().length) return getApp();
  const publicConfig = getFirebasePublicConfig();
  if (!publicConfig) return null;

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID?.trim(),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim(),
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n").trim()
    }),
    projectId: publicConfig.projectId,
    storageBucket: publicConfig.storageBucket
  });
}

export async function getFirebaseAdminServices() {
  const app = await getFirebaseAdminApp();
  if (!app) return null;
  // Public browsing must not load account infrastructure while accounts are disabled.
  const [{ getAuth }, { getFirestore, FieldValue }, { getStorage }] = await Promise.all([
    import("firebase-admin/auth"),
    import("firebase-admin/firestore"),
    import("firebase-admin/storage")
  ]);
  return {
    fieldValue: FieldValue,
    auth: getAuth(app),
    db: getFirestore(app),
    bucket: getStorage(app).bucket()
  };
}
