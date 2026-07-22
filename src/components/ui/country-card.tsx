import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Country } from "@/lib/content/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type CountryCardProps = {
  country: Country;
  locale: Locale;
  actionLabel: string;
};

export function CountryCard({ country, locale, actionLabel }: CountryCardProps) {
  return (
    <Link
      className={`country-card country-${country.code}`}
      href={localizedPath(locale, `countries/${country.code}`)}
    >
      <span className="country-code" aria-hidden="true">
        {country.shortLabel}
      </span>
      <span>
        <strong>{country.name[locale]}</strong>
        <small>{actionLabel}</small>
      </span>
      <ArrowUpRight aria-hidden="true" size={22} />
    </Link>
  );
}
