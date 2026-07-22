import { notFound } from "next/navigation";
import { PreparationPage } from "@/components/public/preparation-page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type AboutPageProps = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  return (
    <PreparationPage
      locale={locale}
      title={copy.aboutTitle}
      description={copy.aboutBody}
      draftTitle={copy.reviewBadge}
      unavailable={copy.legalDraft}
      draftDetail={dictionary.packages.not_guarantee}
      homeLabel={dictionary.nav.home}
    />
  );
}
