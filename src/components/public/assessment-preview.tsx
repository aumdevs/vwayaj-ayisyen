"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type AssessmentPreviewProps = {
  dictionary: Dictionary;
  unavailableMessage: string;
};

const safeQuestions = [
  "Objektif prensipal / objectif principal / objetivo principal",
  "Lang ou pale oswa ou vle aprann / langues / idiomas",
  "Priyorite ou / priorité / prioridad",
  "Vwayaje poukont ou oswa ak fanmi / seul ou en famille",
  "Kalite vil ou prefere / type de ville / tipo de ciudad"
] as const;

export function AssessmentPreview({ dictionary, unavailableMessage }: AssessmentPreviewProps) {
  const [step, setStep] = useState(0);

  return (
    <section className="form-card" aria-labelledby="assessment-preview-title">
      <p className="status-label" id="assessment-preview-title">
        {dictionary.assessment.progress
          .replace("{current}", String(step + 1))
          .replace("{total}", String(safeQuestions.length))}
      </p>
      <h2>{safeQuestions[step]}</h2>
      <p>{dictionary.assessment.privacy}</p>
      <div className="placeholder-copy">
        <strong>{dictionary.errors.feature_unavailable}</strong>
        <p>{unavailableMessage}</p>
      </div>
      <div className="button-row space-top-md">
        <button
          className="button button-secondary"
          disabled={step === 0}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          type="button"
        >
          {dictionary.common.back}
        </button>
        <button
          className="button button-secondary"
          disabled={step === safeQuestions.length - 1}
          onClick={() => setStep((current) => Math.min(safeQuestions.length - 1, current + 1))}
          type="button"
        >
          {dictionary.common.next}
        </button>
      </div>
    </section>
  );
}
