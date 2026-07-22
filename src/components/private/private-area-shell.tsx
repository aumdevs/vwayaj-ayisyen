import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { signOutAction } from "@/app/[locale]/auth/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { privateAreas, type PrivateArea } from "@/lib/navigation/private";
import type { Locale } from "@/types/domain";

type PrivateAreaShellProps = {
  area: PrivateArea;
  dictionary: Dictionary;
  locale: Locale;
  path: readonly string[];
  email: string | null;
  assuranceLevel: "aal1" | "aal2" | null;
};

export function PrivateAreaShell({
  area,
  dictionary,
  locale,
  path,
  email,
  assuranceLevel
}: PrivateAreaShellProps) {
  const definition = privateAreas[area];
  const section = path[0] ?? "";
  const selected = definition.routes.find((route) => route.path === section);
  const title = selected?.label ?? dictionary.common.full_explanation;

  return (
    <div className="shell page-section">
      <header className="page-intro page-intro-compact">
        <p className="eyebrow">
          <LockKeyhole aria-hidden="true" size={16} /> {definition.title}
        </p>
        <h1>{title}</h1>
        <div className="inline-meta">
          <span>{email ?? "—"}</span>
          <span className="status-label">
            <ShieldCheck aria-hidden="true" size={16} /> {assuranceLevel ?? "aal1"}
          </span>
        </div>
      </header>
      <div className="private-shell">
        <aside>
          <nav className="private-nav" aria-label={definition.title}>
            {definition.routes.map((route) => (
              <Link
                href={localizedPath(locale, `${area}${route.path ? `/${route.path}` : ""}`)}
                key={route.path}
              >
                {route.label}
              </Link>
            ))}
            <form action={signOutAction}>
              <input name="locale" type="hidden" value={locale} />
              <button className="button button-quiet" type="submit">
                {dictionary.auth.logout}
              </button>
            </form>
          </nav>
        </aside>
        <section>
          <div className="portal-grid">
            <article className="portal-card">
              <p className="status-label">{dictionary.dashboard.next_step}</p>
              <h2>{title}</h2>
              <p>{dictionary.common.in_preparation}</p>
            </article>
            <article className="portal-card">
              <p className="status-label">{dictionary.dashboard.notifications}</p>
              <h2>0</h2>
              <p>{dictionary.security.do_not_share}</p>
            </article>
          </div>
          <div className="empty-state space-top-sm">
            <h3>{dictionary.common.in_preparation}</h3>
            <p>{dictionary.errors.feature_unavailable}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
