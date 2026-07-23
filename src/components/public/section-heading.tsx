import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  body?: string;
  action?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  body,
  action,
  align = "left",
  inverse = false
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading-premium section-heading-${align}${inverse ? " section-heading-inverse" : ""}`}
    >
      <div>
        {kicker ? <p className="eyebrow">{kicker}</p> : null}
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </header>
  );
}
