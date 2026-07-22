import { notFound } from "next/navigation";
import { PreparationPage } from "@/components/public/preparation-page";
import { countries, isCountryCode } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type GuidesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 2 || (slug[0] && !isCountryCode(slug[0]))) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  const country = slug[0] ? countries.find(({ code }) => code === slug[0]) : null;
  const title = country
    ? `${dictionary.nav.guides} · ${country.name[locale]}`
    : dictionary.nav.guides;

  return (
    <PreparationPage
      locale={locale}
      title={title}
      description={copy.guidesBody}
      draftTitle={copy.draftTitle}
      unavailable={dictionary.common.in_preparation}
      draftDetail={copy.draftDetail}
      homeLabel={dictionary.nav.home}
    />
  );
}
