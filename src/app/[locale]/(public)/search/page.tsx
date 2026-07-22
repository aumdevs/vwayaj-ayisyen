import { notFound } from "next/navigation";
import { SearchForm } from "@/components/public/search-form";
import { PageIntro } from "@/components/ui/page-intro";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type SearchPageProps = { params: Promise<{ locale: string }> };

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  return (
    <div className="narrow-shell page-section">
      <PageIntro title={dictionary.common.search} description={copy.guidesBody} />
      <SearchForm dictionary={dictionary} locale={locale} />
    </div>
  );
}
