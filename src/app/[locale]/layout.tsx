import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { isPromotablePublicPath } from "@/config/launch-readiness";
import { isIndexingAllowed } from "@/lib/config/runtime";
import { BRAND } from "@/config/brand";
import { getCountry, isCountryCode } from "@/lib/content/catalog";
import { publicCopy } from "@/content/public-copy";
import { COUNTRY_MIGRATION_GUIDES } from "@/content/migration-guides";
import { SUPPORTED_LOCALES } from "@/types/domain";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const pathname = (await headers()).get("x-pathname") ?? localizedPath(locale);
  const path = pathname.split("/").filter(Boolean).slice(1).join("/");
  const allowIndexing = isIndexingAllowed() && isPromotablePublicPath(path, locale);
  const officialLegalRoute = path.startsWith("legal/");
  const alternateLocales = officialLegalRoute ? (["es", "pt"] as const) : SUPPORTED_LOCALES;
  const canonicalLocale = officialLegalRoute && locale !== "es" && locale !== "pt" ? "es" : locale;
  const copy = publicCopy[locale];
  const legalTitles = {
    terms: {
      ht: "Kondisyon itilizasyon",
      fr: "Conditions d’utilisation",
      es: "Condiciones de uso",
      pt: "Termos de uso",
      en: "Terms of use"
    },
    privacy: {
      ht: "Konfidansyalite",
      fr: "Confidentialité",
      es: "Privacidad",
      pt: "Privacidade",
      en: "Privacy"
    },
    cookies: { ht: "Cookies", fr: "Cookies", es: "Cookies", pt: "Cookies", en: "Cookies" }
  } as const;
  const legalDocument = path.startsWith("legal/") ? path.slice("legal/".length) : "";
  const legalTitle =
    legalDocument in legalTitles
      ? legalTitles[legalDocument as keyof typeof legalTitles][locale]
      : null;
  const countryPathSegment = path.match(/^countries\/([^/]+)$/)?.[1];
  const countryRecord =
    countryPathSegment && isCountryCode(countryPathSegment) ? getCountry(countryPathSegment) : null;
  const countryTitle = countryRecord?.name[locale] ?? null;
  const title =
    path === ""
      ? BRAND.name
      : path === "countries"
        ? copy.navigation.countries
        : countryTitle
          ? countryTitle
          : path === "about"
            ? copy.navigation.about
            : path === "contact"
              ? copy.navigation.contact
              : path === "faq"
                ? "FAQ"
                : (legalTitle ?? BRAND.name);
  const description =
    countryPathSegment && isCountryCode(countryPathSegment)
      ? COUNTRY_MIGRATION_GUIDES[countryPathSegment].summary[locale]
      : path === "about"
        ? copy.footer.promise
        : path === "contact"
          ? copy.footer.promise
          : BRAND.descriptions[locale];
  const socialImages = countryRecord
    ? [{ url: countryRecord.image, alt: countryRecord.imageAlt[locale] }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: BRAND.name }];
  return {
    title: title === BRAND.name ? { absolute: BRAND.name } : title,
    description,
    alternates: {
      canonical: localizedPath(canonicalLocale, path),
      languages: Object.fromEntries([
        ...alternateLocales.map((supportedLocale) => [
          supportedLocale,
          localizedPath(supportedLocale, path)
        ]),
        ["x-default", localizedPath(officialLegalRoute ? "es" : "ht", path)]
      ])
    },
    robots: allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: true, noarchive: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: localizedPath(canonicalLocale, path),
      locale: { ht: "ht_HT", fr: "fr_FR", es: "es_ES", pt: "pt_BR", en: "en_US" }[locale],
      images: socialImages
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
