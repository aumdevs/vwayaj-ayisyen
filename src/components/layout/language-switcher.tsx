"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { localeNames } from "@/lib/i18n/config";
import { replaceLocale } from "@/lib/i18n/paths";
import { SUPPORTED_LOCALES, type Locale } from "@/types/domain";

type LanguageSwitcherProps = {
  locale: Locale;
  placement?: "header" | "footer";
};

export function LanguageSwitcher({ locale, placement = "header" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <details className={`language-menu language-menu-${placement}`}>
      <summary aria-label={`${localeNames[locale]} · Chwazi lang`}>
        <Globe2 aria-hidden="true" size={18} />
        <span className="language-current">{localeNames[locale]}</span>
        <ChevronDown aria-hidden="true" size={16} />
      </summary>
      <div className="language-popover">
        <span className="language-popover-label">Chwazi lang</span>
        {SUPPORTED_LOCALES.map((option) => (
          <Link
            aria-current={option === locale ? "page" : undefined}
            href={replaceLocale(pathname, option)}
            key={option}
            lang={option}
          >
            <span>{localeNames[option]}</span>
            {option === locale ? <Check aria-hidden="true" size={17} /> : null}
          </Link>
        ))}
      </div>
    </details>
  );
}
