import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Languages, ShieldCheck } from "lucide-react";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { BRAND } from "@/config/brand";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";

type AboutPageProps = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const experience = getExperienceCopy(locale);
  const copy = getProductCopy(locale);
  const principles = [
    { icon: CheckCircle2, title: copy.reviewedOnly, body: copy.reviewedOnlyBody },
    { icon: Languages, title: copy.plainLanguage, body: copy.plainLanguageBody },
    { icon: ShieldCheck, title: copy.privacyFirst, body: copy.privacyFirstBody }
  ];

  return (
    <>
      <section className="about-hero">
        <div className="shell about-hero-grid">
          <div>
            <p className="eyebrow">{BRAND.name}</p>
            <h1>{copy.aboutTitle}</h1>
            <p className="page-lede">{copy.aboutBody}</p>
            <Link className="button button-large" href={localizedPath(locale, "countries")}>
              {experience.explore} {dictionary.nav.countries}{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="about-hero-image">
            <Image
              alt={experience.home.heroAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={BRAND.editorialImages.hero}
            />
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <SectionHeading
            body={copy.howBody}
            kicker={dictionary.common.simple_summary}
            title={copy.howTitle}
          />
          <div className="about-principle-grid">
            {principles.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon aria-hidden="true" size={26} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell about-process-layout">
          <div>
            <p className="eyebrow">{dictionary.common.full_explanation}</p>
            <h2>{copy.howTitle}</h2>
            <p>{copy.howBody}</p>
          </div>
          <ol>
            {copy.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-white section-final-cta">
        <div className="shell">
          <ContextualAdvisorCTA
            body={experience.home.finalBody}
            locale={locale}
            title={experience.home.finalTitle}
          />
        </div>
      </section>
    </>
  );
}
