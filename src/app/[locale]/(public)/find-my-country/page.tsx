import { notFound } from "next/navigation";
import { AssessmentPreview } from "@/components/public/assessment-preview";
import { PageIntro } from "@/components/ui/page-intro";
import { StatusNotice } from "@/components/ui/status-notice";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type AssessmentPageProps = { params: Promise<{ locale: string }> };

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);

  return (
    <div className="shell page-section">
      <PageIntro title={dictionary.assessment.title} description={dictionary.assessment.intro} />
      <StatusNotice title={dictionary.notices.warning} tone="warning">
        <p>{copy.assessmentUnavailable}</p>
      </StatusNotice>
      <div className="space-top-lg">
        <AssessmentPreview
          dictionary={dictionary}
          unavailableMessage={copy.assessmentUnavailable}
        />
      </div>
    </div>
  );
}
