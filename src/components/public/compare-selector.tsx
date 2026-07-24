"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Compass } from "lucide-react";
import type { Country } from "@/lib/content/catalog";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import type { CountryCode, Locale } from "@/types/domain";

type CompareSelectorProps = {
  countries: readonly Country[];
  dictionary: Dictionary;
  locale: Locale;
  waitingTitle: string;
  waitingBody: string;
  exploreLabel: string;
};

export function CompareSelector({
  countries,
  dictionary,
  locale,
  waitingTitle,
  waitingBody,
  exploreLabel
}: CompareSelectorProps) {
  const [selected, setSelected] = useState<CountryCode[]>([]);
  const enough = selected.length >= 2;

  function toggle(code: CountryCode) {
    setSelected((current) => {
      if (current.includes(code)) return current.filter((item) => item !== code);
      return current.length < 4 ? [...current, code] : current;
    });
  }

  return (
    <section className="compare-workspace" aria-labelledby="compare-select-title">
      <div className="compare-workspace-heading">
        <div>
          <p className="eyebrow">01 · {dictionary.nav.compare}</p>
          <h2 id="compare-select-title">{dictionary.compare.select}</h2>
          <p>{dictionary.compare.not_ranking}</p>
        </div>
        <p aria-live="polite" className="selection-count">
          <strong>{String(selected.length).padStart(2, "0")}</strong>
          <span>/ 04</span>
        </p>
      </div>

      <div className="compare-option-grid">
        {countries.map((country, index) => {
          const isSelected = selected.includes(country.code);
          return (
            <label
              className={`compare-option country-accent-${country.accent}${isSelected ? " compare-option-selected" : ""}`}
              key={country.code}
            >
              <input
                checked={isSelected}
                className="compare-option-input"
                onChange={() => toggle(country.code)}
                type="checkbox"
              />
              <span className="compare-option-media">
                <Image
                  alt=""
                  fill
                  preload={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  src={country.image}
                />
                <span aria-hidden="true" className="compare-option-overlay" />
              </span>
              <span className="compare-option-copy">
                <small>{country.iso2}</small>
                <strong>{country.name[locale]}</strong>
              </span>
              <span aria-hidden="true" className="compare-option-check">
                <Check size={18} />
              </span>
            </label>
          );
        })}
      </div>

      <div aria-live="polite" className={`compare-result${enough ? " compare-result-ready" : ""}`}>
        <span className="compare-result-icon" aria-hidden="true">
          {enough ? <Check size={25} /> : <Compass size={25} />}
        </span>
        <div>
          <h3>{enough ? waitingTitle : dictionary.compare.select}</h3>
          <p>{enough ? waitingBody : dictionary.compare.not_ranking}</p>
          {enough ? (
            <div className="selected-country-links">
              {countries
                .filter((country) => selected.includes(country.code))
                .map((country) => (
                  <Link
                    key={country.code}
                    href={localizedPath(locale, `countries/${country.code}`)}
                  >
                    {country.name[locale]} <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                ))}
            </div>
          ) : (
            <Link className="text-link" href={localizedPath(locale, "countries")}>
              {exploreLabel} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
