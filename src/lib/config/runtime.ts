import { z } from "zod";

const urlSchema = z.string().url();

export function getSiteUrl(): URL {
  const parsed = urlSchema.safeParse(process.env.NEXT_PUBLIC_SITE_URL);
  if (parsed.success) return new URL(parsed.data);

  const vercelHostname =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  const vercelUrl = vercelHostname ? urlSchema.safeParse(`https://${vercelHostname}`) : null;

  return new URL(vercelUrl?.success ? vercelUrl.data : "http://localhost:3000");
}

export function isIndexingAllowed(): boolean {
  const siteUrl = getSiteUrl();
  if (process.env.VERCEL_ENV === "production" && siteUrl.hostname === "vwayajayisyen.com") {
    return true;
  }
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = urlSchema.safeParse(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url.success || !publishableKey) return null;
  return { url: url.data, publishableKey };
}

export type FirebasePublicConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  appId: string;
};

export function getFirebasePublicConfig(): FirebasePublicConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim();
  if (!apiKey || !authDomain || !projectId || !storageBucket || !appId) return null;
  return { apiKey, authDomain, projectId, storageBucket, appId };
}

export function isFirebaseAccountsReady(): boolean {
  if (process.env.ACCOUNTS_ENABLED !== "true") return false;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.trim();
  const publicConfig = getFirebasePublicConfig();
  const adminProjectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  return Boolean(
    publicConfig &&
    adminProjectId &&
    adminProjectId === publicConfig.projectId &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim() &&
    privateKey &&
    privateKey.includes("PRIVATE KEY")
  );
}

export function isSupportEmailReady(): boolean {
  return Boolean(
    process.env.EMAIL_PROVIDER === "resend" &&
    process.env.EMAIL_PROVIDER_API_KEY?.trim() &&
    process.env.EMAIL_FROM?.trim()
  );
}
