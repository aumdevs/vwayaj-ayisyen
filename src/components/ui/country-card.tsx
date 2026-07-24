import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Country } from "@/lib/content/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";

type CountryCardProps = {
  country: Country;
  locale: Locale;
  actionLabel: string;
  preload?: boolean;
};

export function CountryCard({ country, locale, actionLabel, preload = false }: CountryCardProps) {
  const copy = getExperienceCopy(locale);
  return (
    <Link
      className={`country-card country-${country.code} country-accent-${country.accent}`}
      href={localizedPath(locale, `countries/${country.code}`)}
    >
      <span className="country-card-media">
        <Image
          alt={country.imageAlt[locale]}
          fill
          preload={preload}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
          src={country.image}
        />
      </span>
      <span className="country-card-overlay" aria-hidden="true" />
      <span className="country-card-content">
        <span className="country-card-topline">
          <span className="country-code">{country.shortLabel}</span>
          <ArrowUpRight aria-hidden="true" size={22} />
        </span>
        <span className="country-card-title">{country.name[locale]}</span>
        <span className="country-card-tags" aria-label={actionLabel}>
          {copy.goals.slice(0, 3).map((goal) => (
            <span key={goal}>{goal}</span>
          ))}
        </span>
        <span className="country-card-action">{actionLabel}</span>
      </span>
    </Link>
  );
}
