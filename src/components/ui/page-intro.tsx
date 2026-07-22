import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  compact?: boolean;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  compact = false
}: PageIntroProps) {
  return (
    <header className={`page-intro${compact ? " page-intro-compact" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p className="page-lede">{description}</p>
      {actions ? <div className="button-row">{actions}</div> : null}
    </header>
  );
}
