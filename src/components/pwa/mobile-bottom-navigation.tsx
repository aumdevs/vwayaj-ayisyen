"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, CircleUserRound, House, MapPinned, Scale } from "lucide-react";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";
import { useKeyboardOpen } from "@/components/pwa/app-experience";

const labels = {
  ht: ["Akèy", "Peyi", "Konpare", "Gid", "Kont"],
  fr: ["Accueil", "Pays", "Comparer", "Guides", "Compte"],
  es: ["Inicio", "Países", "Comparar", "Guías", "Cuenta"],
  pt: ["Início", "Países", "Comparar", "Guias", "Conta"],
  en: ["Home", "Countries", "Compare", "Guides", "Account"]
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
    { href: localizedPath(locale, "compare"), icon: Scale, label: copy[2], key: "compare" },
    {
      href: localizedPath(locale, "guides"),
      icon: BookOpenText,
      label: copy[3],
      key: "guides"
    },
    {
      href: localizedPath(locale, "auth/sign-in"),
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
