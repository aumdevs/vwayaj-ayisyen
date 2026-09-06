import "server-only";

import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getFirebasePublicConfig, isFirebaseAccountsReady } from "@/lib/config/runtime";

export function getFirebaseAdminApp(): App | null {
  if (!isFirebaseAccountsReady()) return null;
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

export function getFirebaseAdminServices() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return {
    auth: getAuth(app),
    db: getFirestore(app),
    bucket: getStorage(app).bucket()
  };
}
