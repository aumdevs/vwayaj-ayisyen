import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenText, CalendarDays, Languages, Layers3 } from "lucide-react";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { PublicContentArticle } from "@/components/public/public-content-article";
import { SectionHeading } from "@/components/public/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { countries, getCountry, getCountrySections, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
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
  const copy = getExperienceCopy(locale);
  const country = getCountry(countryParam);
  const sections = getCountrySections(dictionary);
  const publishedContent = await getPublishedCountryContent(country.code, locale);
  const sectionsWithContent = sections.filter((section) =>
    publishedContent.some((item) => item.sectionKey === section.key)
  );
  const allSources = publishedContent.flatMap((item) => item.sources);
  const latestUpdate = publishedContent
    .map((item) => item.lastVerifiedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  return (
    <>
      <section className={`country-hero country-accent-${country.accent}`}>
        <Image alt={country.imageAlt[locale]} fill priority sizes="100vw" src={country.image} />
        <span className="country-hero-overlay" aria-hidden="true" />
        <div className="shell country-hero-inner">
          <nav className="breadcrumbs breadcrumbs-inverse" aria-label="Breadcrumb">
            <Link href={localizedPath(locale, "countries")}>{dictionary.nav.countries}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{country.name[locale]}</span>
          </nav>
          <div className="country-hero-copy">
            <p className="eyebrow">{copy.country.guideKicker}</p>
            <h1>{country.name[locale]}</h1>
            <p>{copy.country.intro}</p>
            <div className="country-quick-facts">
              {[Languages, Layers3, CalendarDays].map((Icon, index) => (
                <span key={copy.country.quickFacts[index]}>
                  <Icon aria-hidden="true" size={18} />
                  {copy.country.quickFacts[index]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {publishedContent.length === 0 ? (
        <>
          <section className="section section-white">
            <div className="shell country-pending-layout">
              <div>
                <SectionHeading
                  body={copy.country.coverageBody}
                  kicker={dictionary.common.learn_more}
                  title={copy.country.coverageTitle}
                />
                <ul className="coverage-list">
                  {sections
                    .filter((section) => section.key !== "sources")
                    .map((section, index) => (
                      <li key={section.key}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {section.label}
                      </li>
                    ))}
                </ul>
              </div>
              <aside>
                <EmptyState
                  actions={
                    <>
                      <Link className="button" href={localizedPath(locale, "compare")}>
                        {copy.country.compareAction}
                      </Link>
                      <Link
                        className="button button-secondary"
                        href={localizedPath(locale, "countries")}
                      >
                        {dictionary.nav.countries}
                      </Link>
                    </>
                  }
                  body={copy.country.pendingBody}
                  icon={BookOpenText}
                  title={copy.country.pendingTitle}
                />
                <div className="country-next-card">
                  <h3>{copy.country.nextTitle}</h3>
                  <p>{copy.country.nextBody}</p>
                  <Link className="text-link" href={localizedPath(locale, "compare")}>
                    {copy.home.secondary} <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
          <section className="section section-white section-final-cta">
            <div className="shell">
              <ContextualAdvisorCTA
                body={copy.home.finalBody}
                locale={locale}
                title={copy.home.finalTitle}
              />
            </div>
          </section>
        </>
      ) : (
        <section className="section section-white">
          <div className="shell country-content-layout">
            <aside className="country-guide-rail">
              <nav aria-label={dictionary.common.learn_more}>
                {sectionsWithContent.map((section) => (
                  <a href={`#${section.key}`} key={section.key}>
                    {section.label}
                  </a>
                ))}
                {allSources.length > 0 ? <a href="#sources">{dictionary.common.sources}</a> : null}
              </nav>
              <div className="country-guide-meta">
                {latestUpdate ? (
                  <p>
                    <CalendarDays aria-hidden="true" size={17} />
                    <span>
                      {dictionary.common.updated}
                      <strong>{new Date(latestUpdate).toLocaleDateString(locale)}</strong>
                    </span>
                  </p>
                ) : null}
                <p>
                  <BookOpenText aria-hidden="true" size={17} />
                  <span>
                    {dictionary.common.sources}
                    <strong>{allSources.length}</strong>
                  </span>
                </p>
              </div>
            </aside>
            <div className="country-published-content">
              {sectionsWithContent.map((section) => (
                <section id={section.key} key={section.key}>
                  <h2>{section.label}</h2>
                  {publishedContent
                    .filter((item) => item.sectionKey === section.key)
                    .map((item) => (
                      <PublicContentArticle
                        content={item}
                        dictionary={dictionary}
                        key={item.slug}
                        locale={locale}
                      />
                    ))}
                </section>
              ))}
              {allSources.length > 0 ? (
                <section id="sources">
                  <h2>{dictionary.common.sources}</h2>
                  <ul className="source-list">
                    {allSources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} rel="noreferrer" target="_blank">
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
