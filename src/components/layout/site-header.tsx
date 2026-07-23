import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNavigationDrawer } from "@/components/layout/mobile-navigation-drawer";
import { PublicNavigation, type PublicNavGroup } from "@/components/layout/public-navigation";
import { BRAND } from "@/config/brand";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { countries } from "@/lib/content/catalog";
import type { Locale } from "@/types/domain";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const experience = getExperienceCopy(locale);
  const compactNav = [
    { label: dictionary.nav.countries, href: localizedPath(locale, "countries") },
    { label: dictionary.nav.compare, href: localizedPath(locale, "compare") },
    { label: dictionary.nav.assessment, href: localizedPath(locale, "find-my-country") },
    { label: dictionary.nav.packages, href: localizedPath(locale, "services") },
    { label: dictionary.nav.guides, href: localizedPath(locale, "guides") }
  ];
  const navigationCopy = {
    ht: {
      about: "Sou nou",
      editorial: "Politik editoryal",
      main: "Navigasyon prensipal",
      privacy: "Konfidansyalite",
      resources: "Gid ak resous",
      tools: "Zouti"
    },
    fr: {
      about: "À propos",
      editorial: "Politique éditoriale",
      main: "Navigation principale",
      privacy: "Confidentialité",
      resources: "Guides et ressources",
      tools: "Outils"
    },
    es: {
      about: "Sobre nosotros",
      editorial: "Política editorial",
      main: "Navegación principal",
      privacy: "Privacidad",
      resources: "Guías y recursos",
      tools: "Herramientas"
    },
    pt: {
      about: "Sobre nós",
      editorial: "Política editorial",
      main: "Navegação principal",
      privacy: "Privacidade",
      resources: "Guias e recursos",
      tools: "Ferramentas"
    },
    en: {
      about: "About",
      editorial: "Editorial policy",
      main: "Main navigation",
      privacy: "Privacy",
      resources: "Guides and resources",
      tools: "Tools"
    }
  }[locale];
  const groups: readonly PublicNavGroup[] = [
    {
      label: dictionary.nav.countries,
      links: [
        ...countries.map((country) => ({
          href: localizedPath(locale, `countries/${country.code}`),
          label: country.name[locale],
          meta: country.shortLabel
        })),
        {
          href: localizedPath(locale, "countries"),
          label: experience.viewAll,
          meta: "04"
        }
      ]
    },
    {
      label: navigationCopy.tools,
      links: [
        {
          href: localizedPath(locale, "compare"),
          label: dictionary.nav.compare
        },
        {
          href: localizedPath(locale, "find-my-country"),
          label: dictionary.nav.assessment
        }
      ]
    },
    {
      label: dictionary.nav.packages,
      links: [
        {
          href: localizedPath(locale, "services"),
          label: experience.services.title
        },
        ...countries.map((country) => ({
          href: localizedPath(locale, `services/${country.code}`),
          label: country.name[locale],
          meta: country.shortLabel
        }))
      ]
    },
    {
      label: navigationCopy.resources,
      links: [
        { href: localizedPath(locale, "guides"), label: dictionary.nav.guides },
        { href: localizedPath(locale, "about"), label: navigationCopy.about },
        { href: localizedPath(locale, "faq"), label: "FAQ" },
        { href: localizedPath(locale, "contact"), label: dictionary.common.contact },
        { href: localizedPath(locale, "legal/editorial"), label: navigationCopy.editorial },
        { href: localizedPath(locale, "legal/privacy"), label: navigationCopy.privacy }
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

        <PublicNavigation ariaLabel={navigationCopy.main} groups={groups} />

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
            items={compactNav}
            menuLabel={experience.menu}
            signInHref={localizedPath(locale, "auth/sign-in")}
            signInLabel={dictionary.auth.sign_in}
          />
        </div>
      </div>
    </header>
  );
}
