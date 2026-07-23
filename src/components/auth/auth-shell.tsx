import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BRAND } from "@/config/brand";
import type { ExperienceCopy } from "@/lib/i18n/experience-copy";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type AuthShellProps = {
  locale: Locale;
  copy: ExperienceCopy["auth"];
  children: ReactNode;
};

export function AuthShell({ locale, copy, children }: AuthShellProps) {
  return (
    <main className="auth-experience" id="main-content" tabIndex={-1}>
      <section className="auth-visual-panel">
        <span className="auth-visual-media" aria-hidden="true">
          <Image
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            src={BRAND.editorialImages.hero}
          />
        </span>
        <span className="auth-visual-overlay" aria-hidden="true" />
        <Link className="auth-brand" href={localizedPath(locale)}>
          <LogoMark className="brand-mark" />
          <strong>{BRAND.name}</strong>
        </Link>
        <div className="auth-visual-copy">
          <p className="eyebrow">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
          <ul>
            {copy.points.map((point) => (
              <li key={point}>
                <Check aria-hidden="true" size={17} /> {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="auth-form-panel">
        <header className="auth-panel-header">
          <Link href={localizedPath(locale)}>
            <ArrowLeft aria-hidden="true" size={18} /> {copy.backHome}
          </Link>
          <LanguageSwitcher locale={locale} />
        </header>
        <div className="auth-form-wrap">{children}</div>
        <p className="auth-panel-security">
          <LockKeyhole aria-hidden="true" size={15} /> {copy.points[0]}
        </p>
      </section>
    </main>
  );
}
