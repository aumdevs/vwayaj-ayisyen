import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Compass, ListChecks, Scale } from "lucide-react";
import { SectionHeading } from "@/components/public/section-heading";
import { CountryCard } from "@/components/ui/country-card";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type CountriesPageProps = { params: Promise<{ locale: string }> };

export default async function CountriesPage({ params }: CountriesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);

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
            {countries.map((country) => (
              <CountryCard
                actionLabel={copy.explore}
                country={country}
                key={country.code}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell choosing-grid">
          <div>
            <p className="eyebrow">{copy.countries.goalsTitle}</p>
            <h2>{copy.countries.chooseTitle}</h2>
            <p>{copy.countries.chooseBody}</p>
          </div>
          <div className="decision-steps">
            {[
              { icon: Compass, title: copy.goals[0], body: dictionary.assessment.intro },
              { icon: ListChecks, title: copy.goals[1], body: copy.compare.criteriaTitle },
              { icon: Scale, title: dictionary.nav.compare, body: dictionary.compare.not_ranking }
            ].map(({ icon: Icon, title, body }, index) => (
              <article key={`${title}-${index}`}>
                <span className="decision-step-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <small>0{index + 1}</small>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell country-index-cta">
          <div>
            <p className="eyebrow">{dictionary.nav.compare}</p>
            <h2>{copy.compare.title}</h2>
            <p>{copy.compare.body}</p>
          </div>
          <Link className="button button-large" href={localizedPath(locale, "compare")}>
            {copy.home.secondary} <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
