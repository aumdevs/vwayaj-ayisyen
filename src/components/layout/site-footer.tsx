import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BRAND } from "@/config/brand";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { countries } from "@/lib/content/catalog";
import type { Locale } from "@/types/domain";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <div className="footer-brand">
            <LogoMark className="brand-mark" />
            <strong>{BRAND.name}</strong>
          </div>
          <p>{BRAND.descriptions[locale]}</p>
          <LanguageSwitcher locale={locale} placement="footer" />
        </div>
        <nav aria-label="Peyi yo">
          <strong>{dictionary.nav.countries}</strong>
          {countries.map((country) => (
            <Link href={localizedPath(locale, `countries/${country.code}`)} key={country.code}>
              {country.name[locale]}
            </Link>
          ))}
        </nav>
        <nav aria-label="Zouti yo">
          <strong>{dictionary.common.learn_more}</strong>
          <Link href={localizedPath(locale, "compare")}>{dictionary.nav.compare}</Link>
          <Link href={localizedPath(locale, "find-my-country")}>{dictionary.nav.assessment}</Link>
          <Link href={localizedPath(locale, "guides")}>{dictionary.nav.guides}</Link>
          <Link href={localizedPath(locale, "services")}>{dictionary.nav.packages}</Link>
        </nav>
        <nav aria-label="Èd ak legal">
          <strong>{dictionary.nav.help}</strong>
          <Link href={localizedPath(locale, "about")}>{dictionary.nav.help}</Link>
          <Link href={localizedPath(locale, "faq")}>FAQ</Link>
          <Link href={localizedPath(locale, "contact")}>{dictionary.common.contact}</Link>
          <Link href={localizedPath(locale, "legal/editorial")}>Politik editoryal</Link>
          <Link href={localizedPath(locale, "legal/privacy")}>Konfidansyalite</Link>
          <Link href={localizedPath(locale, "legal/terms")}>Kondisyon</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} {BRAND.name}.
        </span>
        <span>{dictionary.packages.not_guarantee}</span>
        <a href="#page-top">Retounen anlè</a>
      </div>
    </footer>
  );
}
