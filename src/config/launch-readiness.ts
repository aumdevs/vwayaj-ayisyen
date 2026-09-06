import type { CountryCode } from "@/types/domain";
import type { Locale } from "@/types/domain";

/**
 * Public information scope. Only reviewed, useful routes belong in navigation and SEO.
 */
export const LAUNCH_READINESS = {
  promotableCountries: ["chile", "brazil"] as readonly CountryCode[]
} as const;

export function isPromotableCountry(country: CountryCode): boolean {
  return LAUNCH_READINESS.promotableCountries.includes(country);
}

export const PROMOTABLE_CORE_PATHS = [
  "",
  "countries",
  "countries/chile",
  "countries/brazil",
  "news",
  "about",
  "faq",
  "contact"
] as const;

export const PROMOTABLE_LEGAL_PATHS = [
  "legal/terms",
  "legal/privacy",
  "legal/security",
  "legal/payments",
  "legal/cookies"
] as const;

const promotablePublicPaths: ReadonlySet<string> = new Set([
  ...PROMOTABLE_CORE_PATHS,
  ...PROMOTABLE_LEGAL_PATHS
]);

export function isPromotablePublicPath(path: string, locale?: Locale): boolean {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (/^news\/[a-z0-9-]+$/.test(normalized)) return !locale || locale === "ht";
  if (!promotablePublicPaths.has(normalized)) return false;
  if (locale) return locale === "ht";
  return true;
}
