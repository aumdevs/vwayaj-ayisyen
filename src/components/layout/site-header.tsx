import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { MobileNavigationDrawer } from "@/components/layout/mobile-navigation-drawer";
import { PublicNavigation, type PublicNavGroup } from "@/components/layout/public-navigation";
import { BRAND } from "@/config/brand";
import { publicCopy } from "@/content/public-copy";
import { countries } from "@/lib/content/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = publicCopy[locale];
  const compactNav = [
    { label: copy.navigation.countries, href: localizedPath(locale, "countries") },
    { label: copy.navigation.about, href: localizedPath(locale, "about") },
    { label: copy.navigation.faq, href: localizedPath(locale, "faq") },
    { label: copy.navigation.contact, href: localizedPath(locale, "contact") }
  ];
  const groups: readonly PublicNavGroup[] = [
    {
      label: copy.navigation.countries,
      links: [
        ...countries.map((country) => ({
          href: localizedPath(locale, `countries/${country.code}`),
          label: country.name[locale],
          meta: country.shortLabel
        })),
        {
          href: localizedPath(locale, "countries"),
          label: copy.country.allCountries,
          meta: "02"
        }
      ]
    },
    {
      label: copy.navigation.about,
      links: [
        { href: localizedPath(locale, "about"), label: copy.navigation.about },
        { href: localizedPath(locale, "faq"), label: copy.navigation.faq },
        { href: localizedPath(locale, "contact"), label: copy.navigation.contact },
        { href: localizedPath(locale, "legal/privacy"), label: copy.footer.privacy }
      ]
    }
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

        <PublicNavigation ariaLabel={copy.navigation.main} groups={groups} />

        <div className="header-actions">
          <Link className="button header-guide-action" href={localizedPath(locale, "countries")}>
            {copy.home.primary} <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <MobileNavigationDrawer
            actionHref={localizedPath(locale, "countries")}
            actionLabel={copy.home.primary}
            closeLabel={copy.navigation.close}
            items={compactNav}
            menuLabel={copy.navigation.menu}
          />
        </div>
      </div>
    </header>
  );
}
