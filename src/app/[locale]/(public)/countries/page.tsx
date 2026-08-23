import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/public/section-heading";
import { CountryCard } from "@/components/ui/country-card";
import { getCountry } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";

type CountriesPageProps = { params: Promise<{ locale: string }> };

export default async function CountriesPage({ params }: CountriesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const pilotCountry = getCountry("usa");

  return (
    <>
      <section className="page-hero page-hero-countries">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.countries.kicker}</p>
          <h1>{copy.countries.title}</h1>
          <p className="page-lede">{copy.countries.body}</p>
          <div className="goal-list" aria-label={copy.countries.goalsTitle}>
            {copy.goals.map((goal) => (
              <span key={goal}>{goal}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="country-grid">
        <div className="shell">
          <SectionHeading
            body={copy.home.destinationsBody}
            kicker={dictionary.nav.countries}
            title={copy.home.destinationsTitle}
          />
          <div className="country-grid country-grid-editorial">
            <CountryCard
              actionLabel={copy.explore}
              country={pilotCountry}
              locale={locale}
              preload
            />
          </div>
        </div>
      </section>
    </>
  );
}
