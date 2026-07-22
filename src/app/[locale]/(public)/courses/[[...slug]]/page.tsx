import { notFound } from "next/navigation";
import { PreparationPage } from "@/components/public/preparation-page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type CoursesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 1) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  return (
    <PreparationPage
      locale={locale}
      title={dictionary.nav.courses}
      description={copy.coursesBody}
      draftTitle={copy.draftTitle}
      unavailable={dictionary.errors.feature_unavailable}
      draftDetail={copy.draftDetail}
      homeLabel={dictionary.nav.home}
    />
  );
}
