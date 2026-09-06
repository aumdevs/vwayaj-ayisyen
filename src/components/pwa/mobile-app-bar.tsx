"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  ChevronRight,
  CreditCard,
  FileText,
  Grid2X2,
  LockKeyhole,
  ShieldCheck,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/config/brand";
import { BrandLogo, LogoMark } from "@/components/brand/logo-mark";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

const copy = {
  ht: {
    back: "Retounen",
    close: "Fèmen",
    more: "Plis",
    countries: "Peyi yo",
    faq: "Kesyon souvan",
    contact: "Kontakte nou",
    about: "Sou nou",
    privacy: "Konfidansyalite",
    terms: "Kondisyon itilizasyon"
  },
  fr: {
    back: "Retour",
    close: "Fermer",
    more: "Plus",
    countries: "Pays",
    faq: "Questions fréquentes",
    contact: "Nous contacter",
    about: "À propos",
    privacy: "Confidentialité",
    terms: "Conditions d’utilisation"
  },
  es: {
    back: "Volver",
    close: "Cerrar",
    more: "Más",
    countries: "Países",
    faq: "Preguntas frecuentes",
    contact: "Contactar",
    about: "Sobre nosotros",
    privacy: "Privacidad",
    terms: "Condiciones de uso"
  },
  pt: {
    back: "Voltar",
    close: "Fechar",
    more: "Mais",
    countries: "Países",
    faq: "Perguntas frequentes",
    contact: "Contato",
    about: "Sobre nós",
    privacy: "Privacidade",
    terms: "Termos de uso"
  },
  en: {
    back: "Back",
    close: "Close",
    more: "More",
    countries: "Countries",
    faq: "Frequently asked questions",
    contact: "Contact",
    about: "About",
    privacy: "Privacy",
    terms: "Terms of use"
  }
} satisfies Record<Locale, Record<string, string>>;

export function MobileAppBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
  const text = copy[locale];
  const home = localizedPath(locale);
  const isHome = pathname === home;
  const title = pathname.includes("/countries/chile")
    ? "Chili"
    : pathname.includes("/countries/brazil")
      ? "Brezil"
      : pathname.includes("/travel/chile")
        ? "Ale Chili"
        : pathname.includes("/travel/brazil")
          ? "Ale Brezil"
          : pathname.startsWith(localizedPath(locale, "news"))
            ? "Nouvèl"
            : pathname.startsWith(localizedPath(locale, "profile"))
              ? "Pwofil"
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
    {
      description: "Konnen règ sit la ak sèvis yo",
      icon: FileText,
      label: text.terms,
      path: "legal/terms"
    },
    {
      description: "Kijan nou sèvi ak pwoteje done ou",
      icon: ShieldCheck,
      label: text.privacy,
      path: "legal/privacy"
    },
    {
      description: "Fason pou pwoteje tèt ou",
      icon: LockKeyhole,
      label: "Sekirite",
      path: "legal/security"
    },
    {
      description: "Sa pou konnen anvan yon peman",
      icon: CreditCard,
      label: "Peman",
      path: "legal/payments"
    }
  ] as const;

  return (
    <>
      <header className="mobile-app-bar">
        <div className="mobile-app-bar-primary">
          {isHome ? (
            <Link aria-label="Akèy Vwayaj Ayisyen" className="mobile-app-brand" href={home}>
              <BrandLogo className="mobile-app-logo" priority />
            </Link>
          ) : (
            <strong className="mobile-app-title">
              <span>{title}</span>
              <LogoMark />
            </strong>
          )}
        </div>
        <div className="mobile-app-actions">
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
              <h2 id="mobile-more-title">Enfòmasyon itil</h2>
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
              {links.map(({ description, icon: Icon, label, path }) => (
                <Link
                  href={localizedPath(locale, path)}
                  key={path}
                  onClick={() => setMoreOpen(false)}
                >
                  <span aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <small>{description}</small>
                  </span>
                  <ChevronRight aria-hidden="true" size={18} />
                </Link>
              ))}
            </nav>
            <p className="mobile-more-disclaimer">
              <AlertTriangle aria-hidden="true" size={20} />
              <span>
                <strong>Yon nòt enpòtan</strong>
                Vwayaj Ayisyen pa òganize vwayaj nan okenn peyi.
              </span>
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
