import { isLocale } from "@/lib/i18n/config";
import type { Locale } from "@/types/domain";

export const PUBLIC_ANALYTICS_EVENTS = [
  "page_view",
  "country_view",
  "cta_clicked",
  "official_source_opened"
] as const;

export type PublicAnalyticsEvent = (typeof PUBLIC_ANALYTICS_EVENTS)[number];

const TRACKABLE_PUBLIC_PATH =
  /^\/(ht|fr|es|pt|en)(?:\/(?:about|contact|faq|countries(?:\/usa)?|legal\/(?:terms|privacy|cookies)))?\/?$/;

export function isPublicAnalyticsEvent(value: string): value is PublicAnalyticsEvent {
  return PUBLIC_ANALYTICS_EVENTS.some((event) => event === value);
}

export function sanitizeAnalyticsPath(value: string): string | null {
  try {
    const pathname = new URL(value, "https://analytics.invalid").pathname;
    if (!TRACKABLE_PUBLIC_PATH.test(pathname)) return null;
    return pathname;
  } catch {
    return null;
  }
}

export function localeFromAnalyticsPath(path: string): Locale | null {
  const [locale] = path.split("/").filter(Boolean);
  return locale && isLocale(locale) ? locale : null;
}
