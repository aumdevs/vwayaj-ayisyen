import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

type NoticeTone = "info" | "warning" | "success" | "danger";

type StatusNoticeProps = {
  title: string;
  children: ReactNode;
  tone?: NoticeTone;
};

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  danger: ShieldAlert
};

export function StatusNotice({ title, children, tone = "info" }: StatusNoticeProps) {
  const Icon = icons[tone];
  return (
    <aside className={`status-notice status-${tone}`} role={tone === "danger" ? "alert" : "note"}>
      <Icon aria-hidden="true" size={22} />
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}
