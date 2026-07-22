import { notFound, redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { MfaPanel } from "@/components/auth/mfa-panel";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isPublicRegistrationEnabled } from "@/lib/config/runtime";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getViewer } from "@/server/auth/viewer";

const modes = ["sign-in", "sign-up", "verify", "forgot-password", "reset-password", "mfa"] as const;
type AuthMode = (typeof modes)[number];

type AuthPageProps = { params: Promise<{ locale: string; mode: string }> };

export function generateStaticParams() {
  return modes.map((mode) => ({ mode }));
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { locale, mode } = await params;
  if (!isLocale(locale) || !modes.some((item) => item === mode)) notFound();
  const authMode = mode as AuthMode;
  const dictionary = getDictionary(locale);
  const registrationEnabled = isPublicRegistrationEnabled();

  if (authMode === "mfa") {
    const viewer = await getViewer();
    if (!viewer) redirect(localizedPath(locale, "auth/sign-in"));
    if (viewer.assuranceLevel === "aal2") redirect(localizedPath(locale, "portal"));
    return (
      <div className="shell auth-shell">
        <MfaPanel dictionary={dictionary} locale={locale} />
      </div>
    );
  }

  if (authMode === "verify") {
    return (
      <div className="shell auth-shell">
        <section className="auth-card">
          <p className="eyebrow">{dictionary.auth.verify}</p>
          <h1>{dictionary.auth.verify}</h1>
          <p>{dictionary.security.do_not_share}</p>
        </section>
      </div>
    );
  }

  if (authMode === "sign-up" && !registrationEnabled) {
    return (
      <div className="shell auth-shell">
        <section className="auth-card">
          <p className="eyebrow">{dictionary.security.do_not_share}</p>
          <h1>{dictionary.auth.sign_up}</h1>
          <p>{dictionary.errors.feature_unavailable}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="shell auth-shell">
      <AuthForm
        dictionary={dictionary}
        locale={locale}
        mode={authMode}
        registrationEnabled={registrationEnabled}
      />
    </div>
  );
}
