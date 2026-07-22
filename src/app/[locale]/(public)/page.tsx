import Link from "next/link";
import {
  BookOpenCheck,
  CalendarClock,
  Languages,
  LockKeyhole,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import { CountryCard } from "@/components/ui/country-card";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";
import { notFound } from "next/navigation";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  const trustItems = [
    { icon: SearchCheck, title: copy.reviewedOnly, body: copy.reviewedOnlyBody },
    { icon: Languages, title: copy.plainLanguage, body: copy.plainLanguageBody },
    { icon: LockKeyhole, title: copy.privacyFirst, body: copy.privacyFirstBody }
  ];

  return (
    <>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{dictionary.home.eyebrow}</p>
            <h1>{dictionary.home.title}</h1>
            <p className="page-lede">{dictionary.home.subtitle}</p>
            <div className="button-row">
              <Link className="button" href={localizedPath(locale, "countries")}>
                {dictionary.home.choose_country}
              </Link>
              <Link className="button button-secondary" href={localizedPath(locale, "compare")}>
                {dictionary.home.compare_cta}
              </Link>
            </div>
          </div>
          <aside className="hero-note" aria-label={copy.reviewedOnly}>
            <p className="status-label">
              <ShieldCheck aria-hidden="true" size={17} /> {copy.reviewBadge}
            </p>
            <ul className="hero-note-list">
              {trustItems.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <Icon aria-hidden="true" size={23} />
                  <span>
                    <strong>{title}</strong>
                    <small>{body}</small>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">01 · {dictionary.nav.countries}</p>
            <h2>{copy.countriesTitle}</h2>
            <p>{copy.countriesBody}</p>
          </header>
          <div className="country-grid">
            {countries.map((country) => (
              <CountryCard
                actionLabel={copy.openCountry}
                country={country}
                key={country.code}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">02 · {dictionary.common.learn_more}</p>
            <h2>{copy.howTitle}</h2>
            <p>{copy.howBody}</p>
          </header>
          <div className="step-grid">
            {copy.steps.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="button-row space-top-lg">
            <Link className="button" href={localizedPath(locale, "find-my-country")}>
              <BookOpenCheck aria-hidden="true" size={19} /> {dictionary.home.assessment_cta}
            </Link>
            <Link className="button button-secondary" href={localizedPath(locale, "guides")}>
              <CalendarClock aria-hidden="true" size={19} /> {dictionary.nav.guides}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
