import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicContentArticle } from "@/components/public/public-content-article";
import { FeatureUnavailable } from "@/components/ui/feature-unavailable";
import {
  countries,
  countrySectionKeys,
  getCountry,
  getCountrySections,
  isCountryCode
} from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";
import { getPublishedCountryContent } from "@/server/content/public-content";

type SectionPageProps = { params: Promise<{ locale: string; country: string; section: string }> };

export function generateStaticParams() {
  return countries.flatMap(({ code }) =>
    countrySectionKeys.map((section) => ({ country: code, section }))
  );
}

export default async function CountrySectionPage({ params }: SectionPageProps) {
  const { locale, country: countryParam, section: sectionParam } = await params;
  if (
    !isLocale(locale) ||
    !isCountryCode(countryParam) ||
    !countrySectionKeys.some((key) => key === sectionParam)
  ) {
    notFound();
  }
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  const country = getCountry(countryParam);
  const section = getCountrySections(dictionary).find((item) => item.key === sectionParam);
  if (!section) notFound();
  const publishedContent = (await getPublishedCountryContent(country.code, locale)).filter(
    (item) => item.sectionKey === section.key
  );

  return (
    <div className="narrow-shell page-section">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={localizedPath(locale, "countries")}>{dictionary.nav.countries}</Link>
        <span>/</span>
        <Link href={localizedPath(locale, `countries/${country.code}`)}>
          {country.name[locale]}
        </Link>
        <span>/</span>
        <span aria-current="page">{section.label}</span>
      </nav>
      <header className="page-intro page-intro-compact">
        <p className="eyebrow">{country.name[locale]}</p>
        <h1>{section.label}</h1>
        <p className="page-lede">{dictionary.country.review_notice}</p>
      </header>
      {publishedContent.length > 0 ? (
        publishedContent.map((item) => (
          <PublicContentArticle
            content={item}
            dictionary={dictionary}
            key={item.slug}
            locale={locale}
          />
        ))
      ) : (
        <FeatureUnavailable
          title={copy.draftTitle}
          message={copy.draftBody}
          detail={copy.noSources}
        />
      )}
      <p className="space-top-lg">
        <Link href={localizedPath(locale, `countries/${country.code}`)}>
          ← {copy.backToCountry}
        </Link>
      </p>
    </div>
  );
}
