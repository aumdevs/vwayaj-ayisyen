import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessagesSquare,
  ShieldCheck
} from "lucide-react";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { PackageCard } from "@/components/public/package-card";
import { SectionHeading } from "@/components/public/section-heading";
import { countries, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type ServicesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 2 || (slug[0] && !isCountryCode(slug[0]))) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const country = slug[0] ? countries.find(({ code }) => code === slug[0]) : null;
  const title = country ? `${copy.services.title} · ${country.name[locale]}` : copy.services.title;
  const processIcons = [MessagesSquare, ClipboardCheck, CheckCircle2] as const;

  return (
    <>
      <section className="page-hero page-hero-services">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.services.kicker}</p>
          <h1>{title}</h1>
          <p className="page-lede">{copy.services.body}</p>
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
        <div className="shell">
          <SectionHeading
            body={copy.services.availability}
            kicker={dictionary.packages.title}
            title={copy.home.servicesTitle}
          />
          <div className="package-grid services-package-grid">
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
        </div>
      </section>

      <section className="section section-warm">
        <div className="shell">
          <SectionHeading
            body={copy.services.body}
            kicker={dictionary.common.simple_summary}
            title={copy.services.howTitle}
          />
          <div className="service-process-grid">
            {copy.services.steps.map((step, index) => {
              const Icon = processIcons[index] ?? ClipboardCheck;
              return (
                <article key={step}>
                  <div>
                    <span aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </div>
                  <h3>{step}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell service-limits-layout">
          <div>
            <p className="eyebrow">{dictionary.packages.excluded}</p>
            <h2>{copy.services.limitsTitle}</h2>
            <ul className="service-limit-list">
              {copy.services.limits.map((limit) => (
                <li key={limit}>
                  <ShieldCheck aria-hidden="true" size={20} /> {limit}
                </li>
              ))}
            </ul>
          </div>
          <aside className="service-availability-card">
            <span aria-hidden="true">
              <ClipboardCheck size={27} />
            </span>
            <p className="eyebrow">{copy.comingSoon}</p>
            <h3>{copy.services.availability}</h3>
            <p>{dictionary.packages.not_guarantee}</p>
          </aside>
        </div>
      </section>

      <section className="section section-warm service-faq-section">
        <div className="narrow-shell">
          <SectionHeading kicker="FAQ" title={copy.services.faqTitle} />
          <div className="service-faq-list">
            <details>
              <summary>{dictionary.packages.included}</summary>
              <p>{copy.services.levels.map((level) => level.result).join(" ")}</p>
            </details>
            <details>
              <summary>{dictionary.packages.excluded}</summary>
              <p>{copy.services.limits.join(" ")}</p>
            </details>
            <details>
              <summary>{dictionary.packages.price}</summary>
              <p>{copy.services.availability}</p>
            </details>
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
