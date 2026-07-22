import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/page-intro";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type FaqPageProps = { params: Promise<{ locale: string }> };

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  const items = [
    { question: copy.aboutTitle, answer: copy.aboutBody },
    { question: copy.draftTitle, answer: copy.draftBody },
    { question: dictionary.assessment.title, answer: copy.assessmentUnavailable },
    { question: dictionary.packages.title, answer: copy.servicesBody }
  ];

  return (
    <div className="narrow-shell page-section">
      <PageIntro title="FAQ" description={copy.reviewedOnlyBody} />
      <div className="card-grid">
        {items.map((item) => (
          <details className="content-card" key={item.question}>
            <summary>
              <strong>{item.question}</strong>
            </summary>
            <p className="space-top-sm">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
