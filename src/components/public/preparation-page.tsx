import Link from "next/link";
import { FeatureUnavailable } from "@/components/ui/feature-unavailable";
import { PageIntro } from "@/components/ui/page-intro";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type PreparationPageProps = {
  locale: Locale;
  title: string;
  description: string;
  draftTitle: string;
  draftDetail: string;
  unavailable: string;
  homeLabel: string;
};

export function PreparationPage({
  locale,
  title,
  description,
  draftTitle,
  draftDetail,
  unavailable,
  homeLabel
}: PreparationPageProps) {
  return (
    <div className="narrow-shell page-section">
      <PageIntro title={title} description={description} />
      <FeatureUnavailable title={draftTitle} message={unavailable} detail={draftDetail} />
      <p className="space-top-lg">
        <Link href={localizedPath(locale)}>← {homeLabel}</Link>
      </p>
    </div>
  );
}
