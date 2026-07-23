import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GraduationCap } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";

type CoursesPageProps = { params: Promise<{ locale: string; slug?: string[] }> };

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || slug.length > 1) notFound();
  const dictionary = getDictionary(locale);
  const experience = getExperienceCopy(locale);
  const copy = getProductCopy(locale);

  return (
    <>
      <section className="page-hero page-hero-courses">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{dictionary.nav.courses}</p>
          <h1>{dictionary.nav.courses}</h1>
          <p className="page-lede">{copy.coursesBody}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="narrow-shell">
          <EmptyState
            actions={
              <Link className="button" href={localizedPath(locale, "guides")}>
                {dictionary.nav.guides} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            }
            body={experience.states.unavailableBody}
            icon={GraduationCap}
            title={experience.states.unavailableTitle}
          />
        </div>
      </section>
    </>
  );
}
