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
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}
