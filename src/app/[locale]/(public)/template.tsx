import type { ReactNode } from "react";

export default function PublicPageTransition({ children }: { children: ReactNode }) {
  return <div className="route-transition-shell">{children}</div>;
}
