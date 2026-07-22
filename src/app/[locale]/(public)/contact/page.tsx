import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/page-intro";
import { StatusNotice } from "@/components/ui/status-notice";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type ContactPageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  return (
    <div className="narrow-shell page-section">
      <PageIntro title={copy.contactTitle} description={copy.contactBody} />
      <StatusNotice title={dictionary.security.do_not_share} tone="warning">
        <p>{dictionary.errors.feature_unavailable}</p>
      </StatusNotice>
    </div>
  );
}
