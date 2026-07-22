import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { CountryCode, Locale } from "@/types/domain";

export type Country = {
  code: CountryCode;
  iso2: "US" | "CL" | "BR" | "MX";
  name: Record<Locale, string>;
  shortLabel: string;
};

export const countries: readonly Country[] = [
  {
    code: "usa",
    iso2: "US",
    name: {
      ht: "Etazini",
      fr: "États-Unis",
      es: "Estados Unidos",
      pt: "Estados Unidos",
      en: "United States"
    },
    shortLabel: "US"
  },
  {
    code: "chile",
    iso2: "CL",
    name: { ht: "Chili", fr: "Chili", es: "Chile", pt: "Chile", en: "Chile" },
    shortLabel: "CL"
  },
  {
    code: "brazil",
    iso2: "BR",
    name: { ht: "Brezil", fr: "Brésil", es: "Brasil", pt: "Brasil", en: "Brazil" },
    shortLabel: "BR"
  },
  {
    code: "mexico",
    iso2: "MX",
    name: { ht: "Meksik", fr: "Mexique", es: "México", pt: "México", en: "Mexico" },
    shortLabel: "MX"
  }
] as const;

export const countrySectionKeys = [
  "overview",
  "who-it-may-suit",
  "who-it-may-not-suit",
  "legal-pathways",
  "community-reality",
  "work",
  "cost-of-living",
  "banking",
  "housing",
  "study",
  "health",
  "first-30-days",
  "risks",
  "services",
  "sources"
] as const;

export type CountrySectionKey = (typeof countrySectionKeys)[number];

export function isCountryCode(value: string): value is CountryCode {
  return countries.some((country) => country.code === value);
}

export function getCountry(code: CountryCode): Country {
  const country = countries.find((item) => item.code === code);
  if (!country) throw new Error("Unknown country code");
  return country;
}

export function getCountrySections(
  dictionary: Dictionary
): readonly { key: CountrySectionKey; label: string }[] {
  return [
    { key: "overview", label: dictionary.common.simple_summary },
    { key: "who-it-may-suit", label: dictionary.country.may_suit },
    { key: "who-it-may-not-suit", label: dictionary.country.may_not_suit },
    { key: "legal-pathways", label: dictionary.country.legal_pathways },
    { key: "community-reality", label: dictionary.country.community_reality },
    { key: "work", label: dictionary.country.work },
    { key: "cost-of-living", label: dictionary.country.cost },
    { key: "banking", label: dictionary.country.banking },
    { key: "housing", label: dictionary.country.housing },
    { key: "study", label: dictionary.country.education },
    { key: "health", label: dictionary.country.health },
    { key: "first-30-days", label: dictionary.country.first_30_days },
    { key: "risks", label: dictionary.country.scams },
    { key: "services", label: dictionary.nav.packages },
    { key: "sources", label: dictionary.common.sources }
  ];
}
