import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  Building2,
  HeartHandshake,
  Info,
  Mail,
  MapPinned,
  ShieldCheck
} from "lucide-react";
import { BRAND } from "@/config/brand";
import { ContextualAdvisorCTA } from "@/components/public/contextual-advisor-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { TrustStrip } from "@/components/public/trust-strip";
import { CountryCard } from "@/components/ui/country-card";
import { getCountry } from "@/lib/content/catalog";
import {
  officialDirectoryCopy,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT,
  USA_OFFICIAL_SOURCES
} from "@/content/official-source-directory";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { getProductCopy } from "@/lib/i18n/product-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);
  const product = getProductCopy(locale);
  const pilotCountry = getCountry("usa");
  const directoryCopy = officialDirectoryCopy[locale];
  const reviewedAt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT}T00:00:00Z`));

  return (
    <>
      <section className="editorial-hero">
        <div className="shell editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="eyebrow">{copy.home.kicker}</p>
            <h1>{copy.home.title}</h1>
            <p className="page-lede">{copy.home.body}</p>
            <div className="button-row">
              <Link className="button button-large" href={localizedPath(locale, "countries/usa")}>
                {copy.home.primary} <ArrowRight aria-hidden="true" size={19} />
              </Link>
              <Link
                className="button button-secondary button-large"
                href={localizedPath(locale, "contact")}
              >
                {copy.advisor}
              </Link>
            </div>
          </div>
          <div className="editorial-hero-visual">
            <div className="hero-image-frame">
              <Image
                alt={copy.home.heroAlt}
                fill
                fetchPriority="high"
                preload
                sizes="(max-width: 899px) 100vw, 52vw"
                src={BRAND.editorialImages.hero}
              />
            </div>
            <div className="hero-data-card hero-data-primary">
              <span>{String(USA_OFFICIAL_SOURCES.length).padStart(2, "0")}</span>
              <p>{dictionary.common.sources}</p>
            </div>
            <div className="hero-data-card hero-data-secondary">
              <ShieldCheck aria-hidden="true" size={21} />
              <p>
                {directoryCopy.checked}
                <time dateTime={OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT}>{reviewedAt}</time>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="app-home-actions" aria-label={dictionary.nav.home}>
        <div className="shell">
          {[
            {
              href: localizedPath(locale, "countries/usa"),
              icon: MapPinned,
              label: dictionary.nav.countries
            },
            {
              href: localizedPath(locale, "about"),
              icon: Info,
              label: dictionary.nav.help
            },
            {
              href: localizedPath(locale, "faq"),
              icon: HeartHandshake,
              label: "FAQ"
            },
            {
              href: localizedPath(locale, "contact"),
              icon: Mail,
              label: dictionary.common.contact
            }
          ].map(({ href, icon: Icon, label }) => (
            <Link href={href} key={href}>
              <Icon aria-hidden="true" size={22} />
              <span>{label}</span>
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ))}
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
          <div className="pilot-showcase">
            <div className="country-grid country-grid-editorial">
              <CountryCard
                actionLabel={copy.explore}
                country={pilotCountry}
                locale={locale}
                preload
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </div>
            <aside className="pilot-proof-panel">
              <div className="pilot-proof-seal" aria-hidden="true">
                <ShieldCheck size={28} />
              </div>
              <p className="eyebrow">{directoryCopy.kicker}</p>
              <h3>{directoryCopy.title}</h3>
              <p>{directoryCopy.body}</p>
              <dl>
                <div>
                  <dt>{dictionary.common.sources}</dt>
                  <dd>{String(USA_OFFICIAL_SOURCES.length).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{directoryCopy.checked}</dt>
                  <dd>
                    <time dateTime={OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT}>{reviewedAt}</time>
                  </dd>
                </div>
              </dl>
              <Link className="text-link" href={localizedPath(locale, "countries/usa")}>
                {copy.explore} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </aside>
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
                title: product.privacyFirst,
                body: product.privacyFirstBody
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
