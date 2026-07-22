import Link from "next/link";
import { Menu } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";
import type { Locale } from "@/types/domain";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const productCopy = getProductCopy(locale);
  const nav = [
    { label: dictionary.nav.countries, href: localizedPath(locale, "countries") },
    { label: dictionary.nav.compare, href: localizedPath(locale, "compare") },
    { label: dictionary.nav.assessment, href: localizedPath(locale, "find-my-country") },
    { label: dictionary.nav.packages, href: localizedPath(locale, "services") },
    { label: dictionary.nav.guides, href: localizedPath(locale, "guides") }
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-link" href={localizedPath(locale)}>
          <LogoMark className="brand-mark" />
          <span className="brand-copy">
            <span className="brand-name">{productCopy.productName}</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasyon prensipal">
          {nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher locale={locale} compact />
          <Link
            className="button button-quiet desktop-signin"
            href={localizedPath(locale, "auth/sign-in")}
          >
            {dictionary.auth.sign_in}
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Louvri meni an">
              <Menu aria-hidden="true" size={24} />
              <span>Meni</span>
            </summary>
            <div className="mobile-menu-panel">
              <nav aria-label="Navigasyon mobil">
                {nav.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
                <Link href={localizedPath(locale, "auth/sign-in")}>{dictionary.auth.sign_in}</Link>
              </nav>
              <LanguageSwitcher locale={locale} />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
