"use client";

import { useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import type { Country } from "@/lib/content/catalog";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

type CompareSelectorProps = {
  countries: readonly Country[];
  dictionary: Dictionary;
  locale: Locale;
  unavailableMessage: string;
};

export function CompareSelector({
  countries,
  dictionary,
  locale,
  unavailableMessage
}: CompareSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const enough = selected.length >= 2;

  function toggle(code: string) {
    setSelected((current) => {
      if (current.includes(code)) return current.filter((item) => item !== code);
      return current.length < 4 ? [...current, code] : current;
    });
  }

  return (
    <section className="compare-controls" aria-labelledby="compare-select-title">
      <h2 id="compare-select-title">{dictionary.compare.select}</h2>
      <div className="check-grid">
        {countries.map((country) => (
          <label className="check-option" key={country.code}>
            <input
              checked={selected.includes(country.code)}
              onChange={() => toggle(country.code)}
              type="checkbox"
            />
            <span>
              <strong>{country.name[locale]}</strong>
              <small>{country.iso2}</small>
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="fine-print">
        {selected.length}/4
      </p>
      <div className="status-notice status-info" role="status">
        {enough ? (
          <Check aria-hidden="true" size={22} />
        ) : (
          <AlertCircle aria-hidden="true" size={22} />
        )}
        <div>
          <strong>{enough ? dictionary.compare.explanation : dictionary.compare.select}</strong>
          <p>{enough ? unavailableMessage : dictionary.compare.not_ranking}</p>
        </div>
      </div>
      <button aria-disabled="true" className="button" disabled type="button">
        {dictionary.nav.compare}
      </button>
    </section>
  );
}
