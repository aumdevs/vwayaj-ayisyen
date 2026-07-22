import { notFound } from "next/navigation";
import { PreparationPage } from "@/components/public/preparation-page";
import { countries, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type ServicesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 2 || (slug[0] && !isCountryCode(slug[0]))) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  const country = slug[0] ? countries.find(({ code }) => code === slug[0]) : null;
  const title = country
    ? `${dictionary.packages.title} · ${country.name[locale]}`
    : dictionary.packages.title;

  return (
    <PreparationPage
      locale={locale}
      title={title}
      description={copy.servicesBody}
      draftTitle={copy.draftTitle}
      unavailable={dictionary.errors.feature_unavailable}
      draftDetail={dictionary.packages.not_guarantee}
      homeLabel={dictionary.nav.home}
    />
  );
}
