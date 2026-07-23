import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Home as HomeIcon,
  ShieldCheck
} from "lucide-react";
import { BRAND } from "@/config/brand";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { PackageCard } from "@/components/public/package-card";
import { SectionHeading } from "@/components/public/section-heading";
import { TrustStrip } from "@/components/public/trust-strip";
import { CountryCard } from "@/components/ui/country-card";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const comparisonCriteria = [
    { icon: BriefcaseBusiness, label: dictionary.country.work },
    { icon: HomeIcon, label: dictionary.country.cost },
    { icon: GraduationCap, label: dictionary.country.education },
    { icon: HeartHandshake, label: copy.goals[2] }
  ];

  return (
    <>
      <section className="editorial-hero">
        <div className="shell editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="eyebrow">{copy.home.kicker}</p>
            <h1>{copy.home.title}</h1>
            <p className="page-lede">{copy.home.body}</p>
            <div className="button-row">
              <Link className="button button-large" href={localizedPath(locale, "find-my-country")}>
                {copy.home.primary} <ArrowRight aria-hidden="true" size={19} />
              </Link>
              <Link
                className="button button-secondary button-large"
                href={localizedPath(locale, "compare")}
              >
                {copy.home.secondary}
              </Link>
            </div>
          </div>
          <div className="editorial-hero-visual">
            <div className="hero-image-frame">
              <Image
                alt={copy.home.heroAlt}
                fill
                priority
                sizes="(max-width: 899px) 100vw, 52vw"
                src={BRAND.editorialImages.hero}
              />
            </div>
            <div className="hero-data-card hero-data-primary">
              <span>04</span>
              <p>{dictionary.nav.countries}</p>
            </div>
            <div className="hero-data-card hero-data-secondary">
              <ShieldCheck aria-hidden="true" size={21} />
              <p>{copy.home.trust[0].title}</p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip items={copy.home.trust} />

      <section className="section section-destinations">
        <div className="shell">
          <SectionHeading
            action={
              <Link className="text-link" href={localizedPath(locale, "countries")}>
                {copy.viewAll} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            }
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

      <section className="section section-journey">
        <div className="shell journey-panel">
          <div className="journey-copy">
            <p className="eyebrow">{dictionary.nav.assessment}</p>
            <h2>{copy.home.assessmentTitle}</h2>
            <p>{copy.home.assessmentBody}</p>
            <Link className="button button-light" href={localizedPath(locale, "compare")}>
              {copy.home.secondary} <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="journey-question-stack" aria-label={copy.assessment.questionsTitle}>
            {copy.assessment.questions.map((question, index) => (
              <article key={question}>
                <span>0{index + 1}</span>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-comparison-preview">
        <div className="shell">
          <SectionHeading
            body={copy.home.comparisonBody}
            kicker={dictionary.nav.compare}
            title={copy.home.comparisonTitle}
          />
          <div className="comparison-story-grid">
            <article className="comparison-country-stack">
              {countries.map((country, index) => (
                <div
                  className={`comparison-country country-accent-${country.accent}`}
                  key={country.code}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{country.name[locale]}</strong>
                </div>
              ))}
            </article>
            <div className="comparison-criteria-list">
              {comparisonCriteria.map(({ icon: Icon, label }) => (
                <article key={label}>
                  <Icon aria-hidden="true" size={22} />
                  <span>{label}</span>
                  <span className="comparison-dash" aria-hidden="true" />
                </article>
              ))}
              <Link className="text-link" href={localizedPath(locale, "compare")}>
                {copy.home.secondary} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell reality-grid">
          <div className="reality-lead">
            <p className="eyebrow">{dictionary.notices.practical}</p>
            <h2>{copy.home.realityTitle}</h2>
            <p>{copy.home.realityBody}</p>
          </div>
          <div className="reality-cards">
            {[
              {
                icon: Building2,
                title: dictionary.notices.official,
                body: copy.home.trust[0].body
              },
              {
                icon: BookOpenText,
                title: dictionary.notices.practical,
                body: copy.home.trust[1].body
              },
              {
                icon: HeartHandshake,
                title: dictionary.notices.community,
                body: copy.home.trust[2].body
              }
            ].map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon aria-hidden="true" size={23} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-services-preview">
        <div className="shell">
          <SectionHeading
            body={copy.home.servicesBody}
            kicker={dictionary.nav.packages}
            title={copy.home.servicesTitle}
          />
          <div className="package-grid">
            {copy.services.levels.map((level, index) => (
              <PackageCard
                audience={level.audience}
                availability={copy.services.availability}
                featured={index === 1}
                featuredLabel={copy.comingSoon}
                features={level.features}
                key={level.name}
                name={level.name}
                result={level.result}
              />
            ))}
          </div>
          <div className="centered-action">
            <Link className="button button-secondary" href={localizedPath(locale, "services")}>
              {copy.viewAll} <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-guides-preview">
        <div className="shell">
          <SectionHeading
            body={copy.home.guidesBody}
            kicker={dictionary.nav.guides}
            title={copy.home.guidesTitle}
          />
          <div className="editorial-card-grid">
            {[
              dictionary.country.work,
              dictionary.country.housing,
              dictionary.country.first_30_days
            ].map((title, index) => (
              <article className="editorial-card" key={title}>
                <span className="editorial-card-index">0{index + 1}</span>
                <BookOpenText aria-hidden="true" size={25} />
                <h3>{title}</h3>
                <p>{copy.guides.pendingBody}</p>
                <span className="status-badge">{copy.comingSoon}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-final-cta">
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
