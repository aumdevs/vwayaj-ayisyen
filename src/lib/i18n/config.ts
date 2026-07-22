import { SUPPORTED_LOCALES, type Locale } from "@/types/domain";

export const DEFAULT_LOCALE: Locale = "ht";

export const localeNames: Record<Locale, string> = {
  ht: "Kreyòl",
  fr: "Français",
  es: "Español",
  pt: "Português",
  en: "English"
};

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
