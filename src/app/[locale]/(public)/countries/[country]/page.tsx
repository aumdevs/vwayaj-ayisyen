import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, CalendarCheck2, Languages, Landmark, Route } from "lucide-react";
import { OfficialSourceDirectory } from "@/components/public/official-source-directory";
import { StructuredData } from "@/components/seo/structured-data";
import {
  COUNTRY_SOURCE_DIRECTORIES,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT
} from "@/content/official-source-directory";
import { publicCopy } from "@/content/public-copy";
import { getSiteUrl } from "@/lib/config/runtime";
import { countries, getCountry, isCountryCode } from "@/lib/content/catalog";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type CountryPageProps = { params: Promise<{ locale: string; country: string }> };

export function generateStaticParams() {
  return countries.map(({ code }) => ({ country: code }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { locale, country: countryParam } = await params;
  if (!isLocale(locale) || !isCountryCode(countryParam)) notFound();
  const copy = publicCopy[locale];
  const country = getCountry(countryParam);
  const directory = COUNTRY_SOURCE_DIRECTORIES[country.code];
  const reviewedAt = formatLocalizedDate(OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT, locale, "short");
  const siteUrl = getSiteUrl();

  return (
    <>
      <section className={`country-hero premium-country-hero country-accent-${country.accent}`}>
        <Image alt={country.imageAlt[locale]} fill priority sizes="100vw" src={country.image} />
        <span className="country-hero-overlay" aria-hidden="true" />
        <div className="shell country-hero-inner">
          <nav className="breadcrumbs breadcrumbs-inverse" aria-label="Breadcrumb">
            <Link href={localizedPath(locale, "countries")}>{copy.country.allCountries}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{country.name[locale]}</span>
          </nav>
          <div className="country-hero-copy">
            <p className="eyebrow">
              {copy.country.kicker} · {country.shortLabel}
            </p>
            <h1>{country.name[locale]}</h1>
            <p>{directory.intro[locale]}</p>
            <div className="country-quick-facts">
              <span>
                <Landmark aria-hidden="true" size={18} /> {directory.sources.length}{" "}
                {copy.country.sourcesLabel}
              </span>
              <span>
                <CalendarCheck2 aria-hidden="true" size={18} /> {copy.country.verifiedLabel}:{" "}
                {reviewedAt}
              </span>
              <span>
                <Languages aria-hidden="true" size={18} /> 5 {copy.home.languages}
              </span>
            </div>
            <a className="button button-large country-hero-action" href="#official-sources">
              {copy.home.secondary} <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>
          <div className="country-hero-route" aria-hidden="true">
            <Route size={34} />
            <span>01</span>
            <i />
            <span>04</span>
          </div>
        </div>
      </section>

      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: copy.navigation.countries,
              item: new URL(localizedPath(locale, "countries"), siteUrl).toString()
            },
            {
              "@type": "ListItem",
              position: 2,
              name: country.name[locale],
              item: new URL(localizedPath(locale, `countries/${country.code}`), siteUrl).toString()
            }
          ]
        }}
      />

      <OfficialSourceDirectory country={country.code} locale={locale} />

      <section className="section country-cross-links">
        <div className="shell">
          <p className="eyebrow">{copy.country.allCountries}</p>
          <div>
            {countries
              .filter(({ code }) => code !== country.code)
              .map((item) => (
                <Link href={localizedPath(locale, `countries/${item.code}`)} key={item.code}>
                  <span>{item.shortLabel}</span>
                  <strong>{item.name[locale]}</strong>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
