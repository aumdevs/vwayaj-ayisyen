import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  ShieldCheck
} from "lucide-react";
import { CompareSelector } from "@/components/public/compare-selector";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type ComparePageProps = { params: Promise<{ locale: string }> };

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const criteria = [
    { icon: BriefcaseBusiness, label: dictionary.country.work },
    { icon: Home, label: dictionary.country.cost },
    { icon: GraduationCap, label: dictionary.country.education },
    { icon: HeartHandshake, label: copy.goals[2] },
    { icon: Languages, label: copy.country.quickFacts[0] },
    { icon: ShieldCheck, label: dictionary.country.legal_pathways }
  ];

  return (
    <>
      <section className="page-hero page-hero-compare">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.compare.kicker}</p>
          <h1>{copy.compare.title}</h1>
          <p className="page-lede">{copy.compare.body}</p>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <CompareSelector
            countries={countries}
            dictionary={dictionary}
            exploreLabel={copy.explore}
            locale={locale}
            waitingBody={copy.compare.waitingBody}
            waitingTitle={copy.compare.waitingTitle}
          />
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell">
          <SectionHeading
            body={dictionary.compare.explanation}
            kicker={dictionary.notices.practical}
            title={copy.compare.criteriaTitle}
          />
          <div className="comparison-criteria-grid">
            {criteria.map(({ icon: Icon, label }, index) => (
              <article key={label}>
                <span aria-hidden="true">
                  <Icon size={22} />
                </span>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{label}</h3>
              </article>
            ))}
          </div>
          <p className="comparison-method-note">
            <ShieldCheck aria-hidden="true" size={19} /> {copy.home.trust[0].body}
          </p>
        </div>
      </section>

      <section className="section section-white section-final-cta">
        <div className="shell">
          <ContextualAdvisorCTA
            body={copy.home.finalBody}
            locale={locale}
            title={copy.home.finalTitle}
          />
          <p className="centered-action">
            <Link className="text-link" href={localizedPath(locale, "countries")}>
              {copy.viewAll} {dictionary.nav.countries}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
