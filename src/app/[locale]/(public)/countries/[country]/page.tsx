import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicContentArticle } from "@/components/public/public-content-article";
import { FeatureUnavailable } from "@/components/ui/feature-unavailable";
import { StatusNotice } from "@/components/ui/status-notice";
import { countries, getCountry, getCountrySections, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";
import { getPublishedCountryContent } from "@/server/content/public-content";

type CountryPageProps = { params: Promise<{ locale: string; country: string }> };

export function generateStaticParams() {
  return countries.map(({ code }) => ({ country: code }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { locale, country } = await params;
  if (!isLocale(locale) || !isCountryCode(country)) return {};
  return { title: getCountry(country).name[locale] };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { locale, country: countryParam } = await params;
  if (!isLocale(locale) || !isCountryCode(countryParam)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  const country = getCountry(countryParam);
  const sections = getCountrySections(dictionary);
  const publishedContent = await getPublishedCountryContent(country.code, locale);
  const allSources = publishedContent.flatMap((item) => item.sources);

  return (
    <div className="shell page-section">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={localizedPath(locale, "countries")}>{dictionary.nav.countries}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{country.name[locale]}</span>
      </nav>
      <header className="page-intro page-intro-compact">
        <p className="eyebrow">{dictionary.notices.practical}</p>
        <h1>{country.name[locale]}</h1>
        <p className="page-lede">{copy.countriesBody}</p>
      </header>
      <StatusNotice title={dictionary.notices.warning} tone="warning">
        <p>{dictionary.country.review_notice}</p>
      </StatusNotice>
      <div className="country-layout space-top-lg">
        <aside className="country-toc">
          <strong>{copy.tableOfContents}</strong>
          <nav aria-label={copy.tableOfContents}>
            {sections.map((section) => (
              <a href={`#${section.key}`} key={section.key}>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="country-content">
          {sections.map((section) => {
            const items = publishedContent.filter((item) => item.sectionKey === section.key);
            return (
              <section className="country-section" id={section.key} key={section.key}>
                <p className="info-label">{dictionary.notices.practical}</p>
                <h2>{section.label}</h2>
                {section.key === "sources" ? (
                  allSources.length > 0 ? (
                    <ul>
                      {allSources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} rel="noreferrer" target="_blank">
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="placeholder-copy">{copy.noSources}</p>
                  )
                ) : items.length > 0 ? (
                  items.map((item) => (
                    <PublicContentArticle
                      content={item}
                      dictionary={dictionary}
                      key={item.slug}
                      locale={locale}
                    />
                  ))
                ) : (
                  <>
                    <p className="placeholder-copy">{dictionary.common.in_preparation}</p>
                    <Link href={localizedPath(locale, `countries/${country.code}/${section.key}`)}>
                      {dictionary.common.learn_more}
                    </Link>
                  </>
                )}
              </section>
            );
          })}
          {publishedContent.length === 0 ? (
            <FeatureUnavailable
              title={copy.draftTitle}
              message={copy.draftBody}
              detail={copy.draftDetail}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
