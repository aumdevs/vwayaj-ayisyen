import { notFound } from "next/navigation";
import { CompareSelector } from "@/components/public/compare-selector";
import { PageIntro } from "@/components/ui/page-intro";
import { countries } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type ComparePageProps = { params: Promise<{ locale: string }> };

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  return (
    <div className="shell page-section">
      <PageIntro
        eyebrow={dictionary.notices.practical}
        title={dictionary.compare.title}
        description={copy.compareBody}
      />
      <CompareSelector
        countries={countries}
        dictionary={dictionary}
        locale={locale}
        unavailableMessage={copy.compareUnavailable}
      />
    </div>
  );
}
