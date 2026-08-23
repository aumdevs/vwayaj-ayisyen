import type { CountryCode } from "@/types/domain";
import type { Locale } from "@/types/domain";

/**
 * Public launch scope. Keep this list intentionally small: navigation and SEO
 * must never advertise surfaces that do not yet contain useful, reviewed data.
 */
export const LAUNCH_READINESS = {
  pilotCountry: "usa" as CountryCode,
  promotableCountries: ["usa"] as readonly CountryCode[],
  tools: {
    assessment: false,
    compare: false,
    guides: false,
    services: false
  },
  countryContent: {
    officialSourceDirectory: true,
    reviewedEditorialGuide: false
  }
} as const;

export function isPromotableCountry(country: CountryCode): boolean {
  return LAUNCH_READINESS.promotableCountries.includes(country);
}

export const PROMOTABLE_CORE_PATHS = [
  "",
  "countries",
  "countries/usa",
  "about",
  "faq",
  "contact"
] as const;

export const PROMOTABLE_LEGAL_PATHS = [
  "legal/terms",
  "legal/privacy",
  "legal/cookies",
  "legal/ai",
  "legal/community",
  "legal/editorial"
] as const;

const promotablePublicPaths: ReadonlySet<string> = new Set([
  ...PROMOTABLE_CORE_PATHS,
  ...PROMOTABLE_LEGAL_PATHS
]);

export function isPromotablePublicPath(path: string, locale?: Locale): boolean {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (!promotablePublicPaths.has(normalized)) return false;
  if (normalized.startsWith("legal/") && locale) return locale === "es" || locale === "pt";
  return true;
}
