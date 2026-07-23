import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type ContextualAdvisorCtaProps = {
  locale: Locale;
  title: string;
  body: string;
};

export function ContextualAdvisorCTA({ locale, title, body }: ContextualAdvisorCtaProps) {
  const copy = getExperienceCopy(locale);
  return (
    <section className="advisor-cta">
      <span className="advisor-cta-icon" aria-hidden="true">
        <MessagesSquare size={28} />
      </span>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link className="button button-light" href={localizedPath(locale, "contact")}>
        {copy.advisor} <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </section>
  );
}
