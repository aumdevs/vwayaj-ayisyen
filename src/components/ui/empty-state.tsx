import { Compass, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  body: string;
  actions?: ReactNode;
  icon?: LucideIcon;
  compact?: boolean;
  inverse?: boolean;
};

export function EmptyState({
  title,
  body,
  actions,
  icon: Icon = Compass,
  compact = false,
  inverse = false
}: EmptyStateProps) {
  return (
    <section
      className={`empty-state-premium${compact ? " empty-state-compact" : ""}${inverse ? " empty-state-inverse" : ""}`}
    >
      <span className="empty-state-icon" aria-hidden="true">
        <Icon size={26} />
      </span>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        {actions ? <div className="button-row">{actions}</div> : null}
      </div>
    </section>
  );
}
