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

const footerCopy = {
  ht: {
    countries: "Peyi yo",
    tools: "Zouti yo",
    help: "Èd ak legal",
    editorial: "Politik editoryal",
    privacy: "Konfidansyalite",
    terms: "Kondisyon",
    top: "Retounen anlè"
  },
  fr: {
    countries: "Pays",
    tools: "Outils",
    help: "Aide et juridique",
    editorial: "Politique éditoriale",
    privacy: "Confidentialité",
    terms: "Conditions",
    top: "Retour en haut"
  },
  es: {
    countries: "Países",
    tools: "Herramientas",
    help: "Ayuda y legal",
    editorial: "Política editorial",
    privacy: "Privacidad",
    terms: "Términos",
    top: "Volver arriba"
  },
  pt: {
    countries: "Países",
    tools: "Ferramentas",
    help: "Ajuda e jurídico",
    editorial: "Política editorial",
    privacy: "Privacidade",
    terms: "Termos",
    top: "Voltar ao topo"
  },
  en: {
    countries: "Countries",
    tools: "Tools",
    help: "Help and legal",
    editorial: "Editorial policy",
    privacy: "Privacy",
    terms: "Terms",
    top: "Back to top"
  }
} satisfies Record<
  Locale,
  {
    countries: string;
    tools: string;
    help: string;
    editorial: string;
    privacy: string;
    terms: string;
    top: string;
  }
>;

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const copy = footerCopy[locale];

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
        <nav aria-label={copy.countries}>
          <strong>{copy.countries}</strong>
          {countries.map((country) => (
            <Link href={localizedPath(locale, `countries/${country.code}`)} key={country.code}>
              {country.name[locale]}
            </Link>
          ))}
        </nav>
        <nav aria-label={copy.tools}>
          <strong>{copy.tools}</strong>
          <Link href={localizedPath(locale, "compare")}>{dictionary.nav.compare}</Link>
          <Link href={localizedPath(locale, "find-my-country")}>{dictionary.nav.assessment}</Link>
          <Link href={localizedPath(locale, "guides")}>{dictionary.nav.guides}</Link>
          <Link href={localizedPath(locale, "services")}>{dictionary.nav.packages}</Link>
        </nav>
        <nav aria-label={copy.help}>
          <strong>{copy.help}</strong>
          <Link href={localizedPath(locale, "about")}>{dictionary.nav.help}</Link>
          <Link href={localizedPath(locale, "faq")}>FAQ</Link>
          <Link href={localizedPath(locale, "contact")}>{dictionary.common.contact}</Link>
          <Link href={localizedPath(locale, "legal/editorial")}>{copy.editorial}</Link>
          <Link href={localizedPath(locale, "legal/privacy")}>{copy.privacy}</Link>
          <Link href={localizedPath(locale, "legal/terms")}>{copy.terms}</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} {BRAND.name}.
        </span>
        <span>{dictionary.packages.not_guarantee}</span>
        <a href="#page-top">{copy.top}</a>
      </div>
    </footer>
  );
}
