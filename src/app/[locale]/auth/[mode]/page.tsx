import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, LockKeyhole, MailCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { MfaPanel } from "@/components/auth/mfa-panel";
import { isPublicRegistrationEnabled } from "@/lib/config/runtime";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
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
  const experience = getExperienceCopy(locale);
  const registrationEnabled = isPublicRegistrationEnabled();

  if (authMode === "mfa") {
    const viewer = await getViewer();
    if (!viewer) redirect(localizedPath(locale, "auth/sign-in"));
    if (viewer.assuranceLevel === "aal2") redirect(localizedPath(locale, "portal"));
    return (
      <AuthShell copy={experience.auth} locale={locale}>
        <MfaPanel dictionary={dictionary} locale={locale} />
      </AuthShell>
    );
  }

  if (authMode === "verify") {
    return (
      <AuthShell copy={experience.auth} locale={locale}>
        <section className="auth-state-card">
          <span aria-hidden="true">
            <MailCheck size={29} />
          </span>
          <p className="eyebrow">{dictionary.auth.verify}</p>
          <h2>{dictionary.auth.verify}</h2>
          <p>{dictionary.security.do_not_share}</p>
          <Link className="button" href={localizedPath(locale, "auth/sign-in")}>
            {dictionary.auth.sign_in} <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>
      </AuthShell>
    );
  }

  if (authMode === "sign-up" && !registrationEnabled) {
    return (
      <AuthShell copy={experience.auth} locale={locale}>
        <section className="auth-state-card">
          <span aria-hidden="true">
            <LockKeyhole size={29} />
          </span>
          <p className="eyebrow">{experience.comingSoon}</p>
          <h2>{dictionary.auth.sign_up}</h2>
          <p>{experience.states.unavailableBody}</p>
          <Link className="button" href={localizedPath(locale, "auth/sign-in")}>
            {dictionary.auth.sign_in} <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>
      </AuthShell>
    );
  }

  return (
    <AuthShell copy={experience.auth} locale={locale}>
      <AuthForm
        copy={experience.auth}
        dictionary={dictionary}
        locale={locale}
        mode={authMode}
        registrationEnabled={registrationEnabled}
      />
    </AuthShell>
  );
}
