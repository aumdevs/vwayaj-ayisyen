"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Grid2X2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { BRAND } from "@/config/brand";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

const copy = {
  ht: {
    back: "Retounen",
    close: "Fèmen",
    more: "Plis",
    countries: "Peyi yo",
    compare: "Konpare",
    guides: "Gid yo",
    services: "Sèvis",
    assessment: "Jwenn peyi pou mwen",
    faq: "Kesyon souvan",
    contact: "Kontakte nou",
    about: "Sou nou",
    privacy: "Konfidansyalite",
    terms: "Kondisyon itilizasyon",
    editorial: "Politik editoryal",
    account: "Kont mwen"
  },
  fr: {
    back: "Retour",
    close: "Fermer",
    more: "Plus",
    countries: "Pays",
    compare: "Comparer",
    guides: "Guides",
    services: "Services",
    assessment: "Trouver mon pays",
    faq: "Questions fréquentes",
    contact: "Nous contacter",
    about: "À propos",
    privacy: "Confidentialité",
    terms: "Conditions d’utilisation",
    editorial: "Politique éditoriale",
    account: "Mon compte"
  },
  es: {
    back: "Volver",
    close: "Cerrar",
    more: "Más",
    countries: "Países",
    compare: "Comparar",
    guides: "Guías",
    services: "Servicios",
    assessment: "Encontrar mi país",
    faq: "Preguntas frecuentes",
    contact: "Contactar",
    about: "Sobre nosotros",
    privacy: "Privacidad",
    terms: "Condiciones de uso",
    editorial: "Política editorial",
    account: "Mi cuenta"
  },
  pt: {
    back: "Voltar",
    close: "Fechar",
    more: "Mais",
    countries: "Países",
    compare: "Comparar",
    guides: "Guias",
    services: "Serviços",
    assessment: "Encontrar meu país",
    faq: "Perguntas frequentes",
    contact: "Contato",
    about: "Sobre nós",
    privacy: "Privacidade",
    terms: "Termos de uso",
    editorial: "Política editorial",
    account: "Minha conta"
  },
  en: {
    back: "Back",
    close: "Close",
    more: "More",
    countries: "Countries",
    compare: "Compare",
    guides: "Guides",
    services: "Services",
    assessment: "Find my country",
    faq: "Frequently asked questions",
    contact: "Contact",
    about: "About",
    privacy: "Privacy",
    terms: "Terms of use",
    editorial: "Editorial policy",
    account: "My account"
  }
} satisfies Record<Locale, Record<string, string>>;

export function MobileAppBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
  const text = copy[locale];
  const home = localizedPath(locale);
  const isHome = pathname === home;
  const title =
    pathname.includes("/countries") && pathname !== localizedPath(locale, "countries")
      ? text.countries
      : pathname.startsWith(localizedPath(locale, "countries"))
        ? text.countries
        : pathname.startsWith(localizedPath(locale, "compare"))
          ? text.compare
          : pathname.startsWith(localizedPath(locale, "guides"))
            ? text.guides
            : pathname.startsWith(localizedPath(locale, "services"))
              ? text.services
              : pathname.startsWith(localizedPath(locale, "find-my-country"))
                ? text.assessment
                : BRAND.name;

  useEffect(() => {
    if (!moreOpen) {
      if (wasOpenRef.current) moreButtonRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }
    wasOpenRef.current = true;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>("button, a[href]")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [moreOpen]);

  const links = [
    [text.assessment, "find-my-country"],
    [text.services, "services"],
    [text.faq, "faq"],
    [text.contact, "contact"],
    [text.about, "about"],
    [text.account, "portal"],
    [text.privacy, "legal/privacy"],
    [text.terms, "legal/terms"],
    [text.editorial, "legal/editorial"]
  ] as const;

  return (
    <>
      <header className="mobile-app-bar">
        <div className="mobile-app-bar-primary">
          {isHome ? (
            <Link className="mobile-app-brand" href={home}>
              <LogoMark />
              <span>{BRAND.name}</span>
            </Link>
          ) : (
            <>
              <button
                aria-label={text.back}
                className="mobile-app-back"
                onClick={() => {
                  if (window.history.length > 1) router.back();
                  else router.push(home);
                }}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={21} />
              </button>
              <strong className="mobile-app-title">{title}</strong>
            </>
          )}
        </div>
        <div className="mobile-app-actions">
          <LanguageSwitcher locale={locale} />
          <button
            aria-expanded={moreOpen}
            aria-haspopup="dialog"
            aria-label={text.more}
            className="mobile-app-more"
            onClick={() => setMoreOpen(true)}
            ref={moreButtonRef}
            type="button"
          >
            <Grid2X2 aria-hidden="true" size={20} />
          </button>
        </div>
      </header>

      {moreOpen ? (
        <div className="mobile-sheet-backdrop" onMouseDown={() => setMoreOpen(false)}>
          <section
            aria-labelledby="mobile-more-title"
            aria-modal="true"
            className="mobile-more-sheet"
            onMouseDown={(event) => event.stopPropagation()}
            ref={sheetRef}
            role="dialog"
          >
            <header>
              <h2 id="mobile-more-title">{text.more}</h2>
              <button
                aria-label={text.close}
                onClick={() => setMoreOpen(false)}
                ref={closeButtonRef}
                type="button"
              >
                <X aria-hidden="true" size={21} />
              </button>
            </header>
            <nav aria-label={text.more}>
              {links.map(([label, path]) => (
                <Link
                  href={localizedPath(locale, path)}
                  key={path}
                  onClick={() => setMoreOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </section>
        </div>
      ) : null}
    </>
  );
}
