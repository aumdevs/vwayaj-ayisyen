"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirebasePublicConfig } from "@/lib/config/runtime";

export function getFirebaseBrowserAuth() {
  const config = getFirebasePublicConfig();
  if (!config) throw new Error("Firebase public configuration is unavailable.");
  const app = getApps().length ? getApp() : initializeApp(config);
  return getAuth(app);
}
