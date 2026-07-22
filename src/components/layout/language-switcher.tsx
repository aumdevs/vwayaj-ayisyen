"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localeNames } from "@/lib/i18n/config";
import { replaceLocale } from "@/lib/i18n/paths";
import { SUPPORTED_LOCALES, type Locale } from "@/types/domain";

type LanguageSwitcherProps = {
  locale: Locale;
  compact?: boolean;
};

export function LanguageSwitcher({ locale, compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname();

  if (compact) {
    return (
      <details className="language-menu">
        <summary>
          <Languages aria-hidden="true" size={20} />
          <span className="sr-only">Chanje lang: </span>
          <span>{localeNames[locale]}</span>
        </summary>
        <div className="language-popover">
          {SUPPORTED_LOCALES.map((option) => (
            <Link
              aria-current={option === locale ? "page" : undefined}
              href={replaceLocale(pathname, option)}
              key={option}
              lang={option}
            >
              {localeNames[option]}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <nav className="language-list" aria-label="Chwazi lang">
      {SUPPORTED_LOCALES.map((option) => (
        <Link
          aria-current={option === locale ? "page" : undefined}
          href={replaceLocale(pathname, option)}
          key={option}
          lang={option}
        >
          {localeNames[option]}
        </Link>
      ))}
    </nav>
  );
}
