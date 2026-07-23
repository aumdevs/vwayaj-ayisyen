import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";

type FaqPageProps = { params: Promise<{ locale: string }> };

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const experience = getExperienceCopy(locale);
  const copy = getProductCopy(locale);
  const items = [
    { question: copy.aboutTitle, answer: copy.aboutBody },
    { question: dictionary.nav.compare, answer: experience.compare.body },
    { question: dictionary.assessment.title, answer: experience.assessment.pendingBody },
    { question: dictionary.packages.title, answer: experience.services.availability },
    { question: copy.privacyFirst, answer: copy.privacyFirstBody }
  ];

  return (
    <>
      <section className="page-hero page-hero-faq">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{dictionary.common.learn_more}</p>
          <h1>FAQ</h1>
          <p className="page-lede">{copy.reviewedOnlyBody}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="narrow-shell public-faq-list">
          {items.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
