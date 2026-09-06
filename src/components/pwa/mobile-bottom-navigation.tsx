"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Newspaper, UserRound } from "lucide-react";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";
import { useKeyboardOpen } from "@/components/pwa/app-experience";

export function MobileBottomNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const keyboardOpen = useKeyboardOpen();
  const items = [
    { href: localizedPath(locale), flag: null, icon: House, label: "Akèy", key: "home" },
    {
      href: localizedPath(locale, "countries/chile"),
      flag: "🇨🇱",
      icon: null,
      label: "Chili",
      key: "chile"
    },
    {
      href: localizedPath(locale, "news"),
      flag: null,
      icon: Newspaper,
      label: "Nouvèl",
      key: "news"
    },
    {
      href: localizedPath(locale, "countries/brazil"),
      flag: "🇧🇷",
      icon: null,
      label: "Brezil",
      key: "brazil"
    },
    {
      href: localizedPath(locale, "profile"),
      flag: null,
      icon: UserRound,
      label: "Pwofil",
      key: "profile"
    }
  ] as const;

  if (keyboardOpen) return null;

  return (
    <nav className="mobile-bottom-navigation" aria-label="Navigasyon aplikasyon an">
      {items.map(({ flag, href, icon: Icon, key, label }) => {
        const current =
          key === "home" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            aria-current={current ? "page" : undefined}
            data-nav-key={key}
            href={href}
            key={key}
          >
            <span aria-hidden="true" className={flag ? "mobile-country-flag" : undefined}>
              {Icon ? <Icon size={21} strokeWidth={2} /> : flag}
            </span>
            <small>{label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
