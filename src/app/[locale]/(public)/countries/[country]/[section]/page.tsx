import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";
import { PublicContentArticle } from "@/components/public/public-content-article";
import { EmptyState } from "@/components/ui/empty-state";
import {
  countries,
  countrySectionKeys,
  getCountry,
  getCountrySections,
  isCountryCode
} from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
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
  const copy = getExperienceCopy(locale);
  const country = getCountry(countryParam);
  const section = getCountrySections(dictionary).find((item) => item.key === sectionParam);
  if (!section) notFound();
  const publishedContent = (await getPublishedCountryContent(country.code, locale)).filter(
    (item) => item.sectionKey === section.key
  );

  return (
    <div className="section-page">
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
          <p className="page-lede">{copy.country.intro}</p>
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
          <EmptyState
            actions={
              <>
                <Link className="button" href={localizedPath(locale, `countries/${country.code}`)}>
                  <ArrowLeft aria-hidden="true" size={17} /> {copy.country.nextTitle}
                </Link>
                <Link className="button button-secondary" href={localizedPath(locale, "compare")}>
                  {copy.home.secondary} <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </>
            }
            body={copy.country.pendingBody}
            icon={BookOpenText}
            title={copy.country.pendingTitle}
          />
        )}
      </div>
    </div>
  );
}
