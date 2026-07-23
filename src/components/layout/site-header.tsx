import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNavigationDrawer } from "@/components/layout/mobile-navigation-drawer";
import { PublicNavigation, type PublicNavItem } from "@/components/layout/public-navigation";
import { BRAND } from "@/config/brand";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import type { Locale } from "@/types/domain";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const experience = getExperienceCopy(locale);
  const nav: readonly PublicNavItem[] = [
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
            <span className="brand-name">{BRAND.name}</span>
          </span>
        </Link>

        <PublicNavigation items={nav} />

        <div className="header-actions">
          <LanguageSwitcher locale={locale} />
          <Link
            className="button button-quiet desktop-signin"
            href={localizedPath(locale, "auth/sign-in")}
          >
            {dictionary.auth.sign_in}
          </Link>
          <Link className="button header-advisor" href={localizedPath(locale, "contact")}>
            {experience.advisor}
          </Link>
          <MobileNavigationDrawer
            advisorHref={localizedPath(locale, "contact")}
            advisorLabel={experience.advisor}
            closeLabel={dictionary.common.close}
            items={nav}
            menuLabel={experience.menu}
            signInHref={localizedPath(locale, "auth/sign-in")}
            signInLabel={dictionary.auth.sign_in}
          />
        </div>
      </div>
    </header>
  );
}
