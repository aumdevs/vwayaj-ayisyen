import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays, Search } from "lucide-react";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { PublicContentArticle } from "@/components/public/public-content-article";
import { SearchForm } from "@/components/public/search-form";
import { SectionHeading } from "@/components/public/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { countries, getCountrySections, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getPublishedCountryContent } from "@/server/content/public-content";

type GuidesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 2 || (slug[0] && !isCountryCode(slug[0]))) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const country = slug[0] ? countries.find(({ code }) => code === slug[0]) : null;
  const published = country ? await getPublishedCountryContent(country.code, locale) : [];
  const articleSlug = slug[1];

  if (country && articleSlug) {
    const article = published.find((item) => item.slug === articleSlug);
    return (
      <div className="guide-article-page">
        <div className="narrow-shell page-section">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href={localizedPath(locale, "guides")}>{dictionary.nav.guides}</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizedPath(locale, `guides/${country.code}`)}>
              {country.name[locale]}
            </Link>
            {article ? (
              <>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{article.title}</span>
              </>
            ) : null}
          </nav>
          {article ? (
            <>
              <header className="page-intro page-intro-compact">
                <p className="eyebrow">{country.name[locale]}</p>
                <h1>{article.title}</h1>
                {article.summary ? <p className="page-lede">{article.summary}</p> : null}
              </header>
              <PublicContentArticle content={article} dictionary={dictionary} locale={locale} />
            </>
          ) : (
            <EmptyState
              actions={
                <Link className="button" href={localizedPath(locale, `guides/${country.code}`)}>
                  <ArrowLeft aria-hidden="true" size={17} /> {dictionary.common.back}
                </Link>
              }
              body={copy.guides.pendingBody}
              icon={BookOpenText}
              title={copy.guides.pendingTitle}
            />
          )}
        </div>
      </div>
    );
  }

  const title = country ? `${copy.guides.title} · ${country.name[locale]}` : copy.guides.title;
  const sections = getCountrySections(dictionary).filter(
    ({ key }) => !["overview", "sources", "services"].includes(key)
  );

  return (
    <>
      <section className="page-hero page-hero-guides">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.guides.kicker}</p>
          <h1>{title}</h1>
          <p className="page-lede">{copy.guides.body}</p>
          {country ? (
            <Link
              className="text-link page-hero-link"
              href={localizedPath(locale, `countries/${country.code}`)}
            >
              {copy.explore} {country.name[locale]} <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ) : null}
        </div>
      </section>

      <section className="section section-white">
        <div className="shell guide-library-layout">
          <SearchForm
            dictionary={dictionary}
            locale={locale}
            noResultsBody={copy.states.noResultsBody}
            noResultsTitle={copy.states.noResultsTitle}
            title={copy.guides.searchTitle}
          />

          {country && published.length > 0 ? (
            <section className="published-guide-list" aria-labelledby="published-guides-title">
              <SectionHeading kicker={country?.name[locale]} title={dictionary.nav.guides} />
              <div>
                {published.map((item) => (
                  <article key={item.slug}>
                    <div>
                      <p className="info-label">{dictionary.notices[item.informationType]}</p>
                      <h3>{item.title}</h3>
                      {item.summary ? <p>{item.summary}</p> : null}
                      {item.lastVerifiedAt ? (
                        <small>
                          <CalendarDays aria-hidden="true" size={15} /> {dictionary.common.updated}:{" "}
                          {new Date(item.lastVerifiedAt).toLocaleDateString(locale)}
                        </small>
                      ) : null}
                    </div>
                    <Link
                      aria-label={`${dictionary.common.learn_more}: ${item.title}`}
                      href={localizedPath(locale, `guides/${country.code}/${item.slug}`)}
                    >
                      <ArrowRight aria-hidden="true" size={20} />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <EmptyState
              actions={
                <Link className="button button-secondary" href={localizedPath(locale, "countries")}>
                  {copy.explore} {dictionary.nav.countries}{" "}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              }
              body={copy.guides.pendingBody}
              icon={BookOpenText}
              title={copy.guides.pendingTitle}
            />
          )}
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell">
          <SectionHeading
            body={copy.home.guidesBody}
            kicker={dictionary.common.simple_summary}
            title={copy.guides.categoriesTitle}
          />
          <div className="guide-category-grid">
            {sections.map((section, index) => (
              <article key={section.key}>
                <div>
                  <Search aria-hidden="true" size={21} />
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
                <h3>{section.label}</h3>
              </article>
            ))}
          </div>
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
  );
}
