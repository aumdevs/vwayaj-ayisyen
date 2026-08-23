import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { isPromotablePublicPath } from "@/config/launch-readiness";
import { isIndexingAllowed } from "@/lib/config/runtime";
import { BRAND } from "@/config/brand";
import { getCountry } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProductCopy } from "@/lib/i18n/product-copy";
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
  const dictionary = getDictionary(locale);
  const product = getProductCopy(locale);
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
    cookies: { ht: "Cookies", fr: "Cookies", es: "Cookies", pt: "Cookies", en: "Cookies" },
    ai: {
      ht: "Asistan IA",
      fr: "Assistant IA",
      es: "Asistente de IA",
      pt: "Assistente de IA",
      en: "AI assistant"
    },
    community: {
      ht: "Règ kominote",
      fr: "Règles de la communauté",
      es: "Reglas de la comunidad",
      pt: "Regras da comunidade",
      en: "Community rules"
    },
    editorial: {
      ht: "Politik editoryal",
      fr: "Politique éditoriale",
      es: "Política editorial",
      pt: "Política editorial",
      en: "Editorial policy"
    }
  } as const;
  const legalDocument = path.startsWith("legal/") ? path.slice("legal/".length) : "";
  const legalTitle =
    legalDocument in legalTitles
      ? legalTitles[legalDocument as keyof typeof legalTitles][locale]
      : null;
  const title =
    path === ""
      ? BRAND.name
      : path === "countries"
        ? dictionary.nav.countries
        : path === "countries/usa"
          ? getCountry("usa").name[locale]
          : path === "about"
            ? product.aboutTitle
            : path === "contact"
              ? product.contactTitle
              : path === "faq"
                ? "FAQ"
                : (legalTitle ?? BRAND.name);
  const description =
    path === "about"
      ? product.aboutBody
      : path === "contact"
        ? product.contactBody
        : BRAND.descriptions[locale];
  return {
    title: path === "" ? { absolute: BRAND.name } : title,
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: BRAND.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"]
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
