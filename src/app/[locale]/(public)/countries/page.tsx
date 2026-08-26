import { notFound } from "next/navigation";
import { Globe2, Landmark, ShieldCheck } from "lucide-react";
import { CountryCard } from "@/components/ui/country-card";
import { OFFICIAL_SOURCE_COUNT } from "@/content/official-source-directory";
import { publicCopy } from "@/content/public-copy";
import { countries } from "@/lib/content/catalog";
import { isLocale } from "@/lib/i18n/config";

type CountriesPageProps = { params: Promise<{ locale: string }> };

export default async function CountriesPage({ params }: CountriesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = publicCopy[locale];

  return (
    <>
      <section className="country-index-hero">
        <div className="shell">
          <div>
            <p className="eyebrow">{copy.countries.kicker}</p>
            <h1>{copy.countries.title}</h1>
            <p className="page-lede">{copy.countries.body}</p>
          </div>
          <div className="country-index-badge" aria-hidden="true">
            <Globe2 size={44} />
            <strong>{countries.length}</strong>
            <span>{copy.home.countries}</span>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <div className="country-index-proof">
            <span>
              <Landmark aria-hidden="true" size={20} /> {OFFICIAL_SOURCE_COUNT} {copy.home.sources}
            </span>
            <span>
              <ShieldCheck aria-hidden="true" size={20} /> {copy.home.reviewed}
            </span>
          </div>
          <div className="country-grid country-index-grid">
            {countries.map((country) => (
              <CountryCard
                actionLabel={copy.home.explore}
                country={country}
                key={country.code}
                locale={locale}
                preload
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 50vw"
                tags={copy.countries.cardTags}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
