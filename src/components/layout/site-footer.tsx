import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BRAND } from "@/config/brand";
import { publicCopy } from "@/content/public-copy";
import { countries } from "@/lib/content/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = publicCopy[locale];

  return (
    <footer className="site-footer premium-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <div className="footer-brand">
            <LogoMark className="brand-mark" />
            <strong>{BRAND.name}</strong>
          </div>
          <p>{copy.footer.promise}</p>
          <LanguageSwitcher locale={locale} placement="footer" />
        </div>
        <nav aria-label={copy.footer.destinations}>
          <strong>{copy.footer.destinations}</strong>
          {countries.map((country) => (
            <Link href={localizedPath(locale, `countries/${country.code}`)} key={country.code}>
              {country.name[locale]}
            </Link>
          ))}
        </nav>
        <nav aria-label={copy.footer.resources}>
          <strong>{copy.footer.resources}</strong>
          <Link href={localizedPath(locale, "countries")}>{copy.navigation.countries}</Link>
          <Link href={localizedPath(locale, "about")}>{copy.navigation.about}</Link>
          <Link href={localizedPath(locale, "faq")}>{copy.navigation.faq}</Link>
          <Link href={localizedPath(locale, "contact")}>{copy.navigation.contact}</Link>
        </nav>
        <nav aria-label={copy.footer.legal}>
          <strong>{copy.footer.legal}</strong>
          <Link href={localizedPath(locale, "legal/privacy")}>{copy.footer.privacy}</Link>
          <Link href={localizedPath(locale, "legal/terms")}>{copy.footer.terms}</Link>
          <Link href={localizedPath(locale, "legal/cookies")}>{copy.footer.cookies}</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} {BRAND.name}.
        </span>
        <span>{copy.footer.notice}</span>
        <a href="#page-top">
          {copy.footer.top} <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </div>
    </footer>
  );
}
