import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Compass, Scale } from "lucide-react";
import { AssessmentPreview } from "@/components/public/assessment-preview";
import { SectionHeading } from "@/components/public/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type AssessmentPageProps = { params: Promise<{ locale: string }> };

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const copy = getExperienceCopy(locale);

  return (
    <>
      <section className="page-hero page-hero-assessment">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.assessment.kicker}</p>
          <h1>{copy.assessment.title}</h1>
          <p className="page-lede">{copy.assessment.body}</p>
        </div>
      </section>

      <section className="section assessment-stage">
        <div className="shell">
          <AssessmentPreview
            alternativeHref={localizedPath(locale, "compare")}
            alternativeLabel={copy.assessment.alternative}
            body={copy.assessment.pendingBody}
            privacy={dictionary.assessment.privacy}
            questions={copy.assessment.questions}
            title={copy.assessment.pendingTitle}
          />
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <SectionHeading
            body={dictionary.assessment.intro}
            kicker={dictionary.notices.practical}
            title={copy.assessment.questionsTitle}
          />
          <div className="assessment-principles">
            {[
              { icon: Compass, title: copy.goals[0], body: copy.home.assessmentBody },
              { icon: Scale, title: dictionary.nav.compare, body: dictionary.compare.not_ranking },
              {
                icon: CheckCircle2,
                title: dictionary.common.sources,
                body: copy.home.trust[0].body
              }
            ].map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon aria-hidden="true" size={25} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="centered-action">
            <Link className="button button-secondary" href={localizedPath(locale, "countries")}>
              {copy.explore} {dictionary.nav.countries} <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
