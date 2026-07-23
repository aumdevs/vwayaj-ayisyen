import { notFound } from "next/navigation";
import { SearchForm } from "@/components/public/search-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";

type SearchPageProps = { params: Promise<{ locale: string }> };

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);

  return (
    <>
      <section className="page-hero page-hero-search">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.guides.kicker}</p>
          <h1>{copy.guides.searchTitle}</h1>
          <p className="page-lede">{copy.guides.body}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell">
          <SearchForm
            dictionary={dictionary}
            locale={locale}
            noResultsBody={copy.states.noResultsBody}
            noResultsTitle={copy.states.noResultsTitle}
            title={copy.guides.searchTitle}
          />
        </div>
      </section>
    </>
  );
}
