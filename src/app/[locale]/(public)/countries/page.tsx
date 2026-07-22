import { notFound } from "next/navigation";
import { CountryCard } from "@/components/ui/country-card";
import { PageIntro } from "@/components/ui/page-intro";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type CountriesPageProps = { params: Promise<{ locale: string }> };

export default async function CountriesPage({ params }: CountriesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  return (
    <div className="shell page-section">
      <PageIntro
        eyebrow={dictionary.home.eyebrow}
        title={copy.countriesTitle}
        description={copy.countriesBody}
      />
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
  );
}
