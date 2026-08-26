import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Country } from "@/lib/content/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type CountryCardProps = {
  country: Country;
  locale: Locale;
  actionLabel: string;
  tags: readonly string[];
  preload?: boolean;
  sizes?: string;
};

export function CountryCard({
  country,
  locale,
  actionLabel,
  tags,
  preload = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
}: CountryCardProps) {
  return (
    <Link
      className={`country-card country-${country.code} country-accent-${country.accent}`}
      href={localizedPath(locale, `countries/${country.code}`)}
    >
      <span className="country-card-media">
        <Image
          alt={country.imageAlt[locale]}
          fill
          loading={preload ? "eager" : "lazy"}
          preload={preload}
          sizes={sizes}
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
          {tags.slice(0, 3).map((goal) => (
            <span key={goal}>{goal}</span>
          ))}
        </span>
        <span className="country-card-action">{actionLabel}</span>
      </span>
    </Link>
  );
}
