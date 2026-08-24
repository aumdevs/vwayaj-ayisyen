import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Compass, Landmark, Route, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/public/section-heading";
import { CountryCard } from "@/components/ui/country-card";
import {
  OFFICIAL_SOURCE_COUNT,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT
} from "@/content/official-source-directory";
import { publicCopy } from "@/content/public-copy";
import { countries } from "@/lib/content/catalog";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = publicCopy[locale];
  const reviewedAt = formatLocalizedDate(OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT, locale, "short");
  const proofItems = [
    { icon: Landmark, label: copy.home.sources, value: String(OFFICIAL_SOURCE_COUNT) },
    { icon: Compass, label: copy.home.countries, value: String(countries.length) },
    { icon: ShieldCheck, label: copy.home.reviewed, value: reviewedAt }
  ] as const;

  return (
    <>
      <section className="premium-hero">
        <div className="shell premium-hero-grid">
          <div className="premium-hero-copy">
            <p className="eyebrow">{copy.home.kicker}</p>
            <h1>{copy.home.title}</h1>
            <p className="page-lede">{copy.home.body}</p>
            <div className="button-row">
              <Link className="button button-large" href={localizedPath(locale, "countries")}>
                {copy.home.primary} <ArrowRight aria-hidden="true" size={19} />
              </Link>
              <a className="button button-glass button-large" href="#destinations">
                {copy.home.secondary}
              </a>
            </div>
            <dl className="premium-hero-stats">
              <div>
                <dt>{copy.home.sources}</dt>
                <dd>{OFFICIAL_SOURCE_COUNT}</dd>
              </div>
              <div>
                <dt>{copy.home.countries}</dt>
                <dd>{countries.length}</dd>
              </div>
              <div>
                <dt>{copy.home.languages}</dt>
                <dd>5</dd>
              </div>
            </dl>
          </div>

          <div className="destination-mosaic" aria-label={copy.home.countries}>
            {countries.map((country, index) => (
              <Link
                className={`destination-mosaic-card destination-mosaic-card-${index + 1}`}
                href={localizedPath(locale, `countries/${country.code}`)}
                key={country.code}
              >
                <Image
                  alt={country.imageAlt[locale]}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 899px) 46vw, 24vw"
                  src={country.image}
                />
                <span aria-hidden="true" />
                <strong>{country.name[locale]}</strong>
                <small>{country.shortLabel}</small>
              </Link>
            ))}
            <div className="mosaic-verification-card">
              <ShieldCheck aria-hidden="true" size={21} />
              <span>
                {copy.home.reviewed}
                <strong>
                  <time dateTime={OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT}>{reviewedAt}</time>
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-proof-bar" aria-label={copy.home.reviewed}>
        <div className="shell">
          {proofItems.map(({ icon: Icon, label, value }) => (
            <article key={label}>
              <Icon aria-hidden="true" size={20} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section premium-destinations" id="destinations">
        <div className="shell">
          <SectionHeading
            body={copy.home.destinationsBody}
            kicker={copy.home.destinationsKicker}
            title={copy.home.destinationsTitle}
          />
          <div className="country-grid premium-country-grid">
            {countries.map((country, index) => (
              <CountryCard
                actionLabel={copy.home.explore}
                country={country}
                key={country.code}
                locale={locale}
                preload={index < 2}
                tags={copy.countries.cardTags}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-method">
        <div className="shell premium-method-grid">
          <div className="premium-method-lead">
            <span className="premium-orbit" aria-hidden="true">
              <Route size={38} />
            </span>
            <p className="eyebrow">{copy.home.methodKicker}</p>
            <h2>{copy.home.methodTitle}</h2>
            <p>{copy.home.methodBody}</p>
          </div>
          <ol className="premium-method-steps">
            {copy.home.methodItems.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <Check aria-hidden="true" size={20} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section premium-final-cta">
        <div className="shell">
          <div>
            <span className="eyebrow">Vwayaj Ayisyen</span>
            <h2>{copy.home.finalTitle}</h2>
            <p>{copy.home.finalBody}</p>
          </div>
          <Link
            className="button button-light button-large"
            href={localizedPath(locale, "countries")}
          >
            {copy.home.primary} <ArrowRight aria-hidden="true" size={19} />
          </Link>
        </div>
      </section>
    </>
  );
}
