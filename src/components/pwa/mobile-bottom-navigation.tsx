"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, House, Info, Mail, MapPinned } from "lucide-react";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";
import { useKeyboardOpen } from "@/components/pwa/app-experience";

const labels = {
  ht: ["Akèy", "Peyi", "Sou nou", "Kontak", "Kont"],
  fr: ["Accueil", "Pays", "À propos", "Contact", "Compte"],
  es: ["Inicio", "Países", "Nosotros", "Contacto", "Cuenta"],
  pt: ["Início", "Países", "Sobre", "Contato", "Conta"],
  en: ["Home", "Countries", "About", "Contact", "Account"]
} satisfies Record<Locale, readonly [string, string, string, string, string]>;

export function MobileBottomNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const keyboardOpen = useKeyboardOpen();
  const copy = labels[locale];
  const items = [
    { href: localizedPath(locale), icon: House, label: copy[0], key: "home" },
    {
      href: localizedPath(locale, "countries"),
      icon: MapPinned,
      label: copy[1],
      key: "countries"
    },
    { href: localizedPath(locale, "about"), icon: Info, label: copy[2], key: "about" },
    {
      href: localizedPath(locale, "contact"),
      icon: Mail,
      label: copy[3],
      key: "contact"
    },
    {
      href: localizedPath(locale, "portal"),
      icon: CircleUserRound,
      label: copy[4],
      key: "account"
    }
  ] as const;

  if (keyboardOpen || pathname.includes("/find-my-country")) return null;

  return (
    <nav className="mobile-bottom-navigation" aria-label={copy.join(", ")}>
      {items.map(({ href, icon: Icon, key, label }) => {
        const current =
          key === "home"
            ? pathname === href
            : key === "account"
              ? pathname.includes("/auth/") || pathname.includes("/portal")
              : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link aria-current={current ? "page" : undefined} href={href} key={key}>
            <span aria-hidden="true">
              <Icon size={21} strokeWidth={2} />
            </span>
            <small>{label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
