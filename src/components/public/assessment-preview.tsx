import Link from "next/link";
import { ArrowRight, Languages, ShieldCheck, Target, Users } from "lucide-react";
import type { Route } from "next";

type AssessmentPreviewProps = {
  questions: readonly [string, string, string];
  title: string;
  body: string;
  privacy: string;
  alternativeLabel: string;
  alternativeHref: Route;
};

const icons = [Target, Languages, Users] as const;

export function AssessmentPreview({
  questions,
  title,
  body,
  privacy,
  alternativeLabel,
  alternativeHref
}: AssessmentPreviewProps) {
  return (
    <section className="assessment-preview" aria-labelledby="assessment-preview-title">
      <div className="assessment-question-list">
        <p className="eyebrow">01 — 03</p>
        <h2 id="assessment-preview-title">{title}</h2>
        {questions.map((question, index) => {
          const Icon = icons[index] ?? Target;
          return (
            <article key={question}>
              <span aria-hidden="true">
                <Icon size={23} />
              </span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <p>{question}</p>
            </article>
          );
        })}
      </div>
      <div className="assessment-hold-card">
        <span className="assessment-hold-icon" aria-hidden="true">
          <ShieldCheck size={28} />
        </span>
        <h3>{title}</h3>
        <p>{body}</p>
        <small>{privacy}</small>
        <Link className="button button-light" href={alternativeHref}>
          {alternativeLabel} <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </section>
  );
}
