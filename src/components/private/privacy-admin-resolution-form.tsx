"use client";

import { useActionState } from "react";
import type { PrivacyAdminActionState } from "@/app/[locale]/privacy-admin-actions";
import type { Locale } from "@/types/domain";

type PrivacyAdminResolutionFormProps = {
  action: (
    _previous: PrivacyAdminActionState,
    formData: FormData
  ) => Promise<PrivacyAdminActionState>;
  locale: Locale;
  requestId: string;
};

const initialState: PrivacyAdminActionState = { status: "idle" };

const copy = {
  ht: {
    verification: "Metòd verifikasyon",
    verificationPlaceholder: "Eg.: sesyon MFA + konfimasyon imèl",
    summary: "Rezolisyon ak baz desizyon an",
    summaryPlaceholder: "Ekri sa ki te verifye, sa ki te fèt ak rezon rezilta a.",
    status: "Rezilta final",
    fulfilled: "Akonpli",
    denied: "Refize",
    cancelled: "Anile",
    submit: "Fèmen demann lan",
    invalid: "Ranpli metòd la ak yon rezime omwen 10 karaktè.",
    unavailable: "Nou pa ka fèmen demann lan. Verifye MFA oswa eskale nan kanal legal la.",
    resolved: "Demann lan fèmen epi desizyon an anrejistre."
  },
  fr: {
    verification: "Méthode de vérification",
    verificationPlaceholder: "Ex. : session MFA + confirmation par e-mail",
    summary: "Résolution et fondement de la décision",
    summaryPlaceholder: "Indiquez ce qui a été vérifié, l’action réalisée et le motif du résultat.",
    status: "Résultat final",
    fulfilled: "Traitée",
    denied: "Refusée",
    cancelled: "Annulée",
    submit: "Clore la demande",
    invalid: "Renseignez la méthode et un résumé d’au moins 10 caractères.",
    unavailable: "Impossible de clore la demande. Vérifiez la MFA ou escaladez au canal juridique.",
    resolved: "La demande est close et la décision a été enregistrée."
  },
  es: {
    verification: "Método de verificación",
    verificationPlaceholder: "Ej.: sesión MFA + confirmación por correo",
    summary: "Resolución y fundamento de la decisión",
    summaryPlaceholder: "Registra qué se verificó, qué se hizo y el motivo del resultado.",
    status: "Resultado final",
    fulfilled: "Atendida",
    denied: "Denegada",
    cancelled: "Cancelada",
    submit: "Cerrar solicitud",
    invalid: "Completa el método y un resumen de al menos 10 caracteres.",
    unavailable: "No se pudo cerrar la solicitud. Verifica MFA o escala al canal legal.",
    resolved: "La solicitud quedó cerrada y la decisión fue registrada."
  },
  pt: {
    verification: "Método de verificação",
    verificationPlaceholder: "Ex.: sessão MFA + confirmação por e-mail",
    summary: "Resolução e fundamento da decisão",
    summaryPlaceholder: "Registre o que foi verificado, a ação tomada e o motivo do resultado.",
    status: "Resultado final",
    fulfilled: "Atendida",
    denied: "Negada",
    cancelled: "Cancelada",
    submit: "Encerrar solicitação",
    invalid: "Informe o método e um resumo com pelo menos 10 caracteres.",
    unavailable:
      "Não foi possível encerrar a solicitação. Verifique o MFA ou escale ao canal jurídico.",
    resolved: "A solicitação foi encerrada e a decisão foi registrada."
  },
  en: {
    verification: "Verification method",
    verificationPlaceholder: "Example: MFA session + email confirmation",
    summary: "Resolution and decision basis",
    summaryPlaceholder: "Record what was verified, what was done, and why.",
    status: "Final outcome",
    fulfilled: "Fulfilled",
    denied: "Denied",
    cancelled: "Cancelled",
    submit: "Close request",
    invalid: "Enter the method and a summary of at least 10 characters.",
    unavailable: "The request could not be closed. Check MFA or escalate to the legal channel.",
    resolved: "The request was closed and the decision was recorded."
  }
} satisfies Record<Locale, Record<string, string>>;

export function PrivacyAdminResolutionForm({
  action,
  locale,
  requestId
}: PrivacyAdminResolutionFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const text = copy[locale];
  const message =
    state.status === "invalid"
      ? text.invalid
      : state.status === "unavailable"
        ? text.unavailable
        : state.status === "resolved"
          ? text.resolved
          : null;

  return (
    <form action={formAction} className="privacy-admin-resolution-form">
      <input name="request_id" type="hidden" value={requestId} />
      <label>
        <span>{text.verification}</span>
        <input
          maxLength={160}
          minLength={3}
          name="identity_verification_method"
          placeholder={text.verificationPlaceholder}
          required
          type="text"
        />
      </label>
      <label>
        <span>{text.summary}</span>
        <textarea
          maxLength={2000}
          minLength={10}
          name="resolution_summary"
          placeholder={text.summaryPlaceholder}
          required
          rows={3}
        />
      </label>
      <label>
        <span>{text.status}</span>
        <select defaultValue="fulfilled" name="terminal_status" required>
          <option value="fulfilled">{text.fulfilled}</option>
          <option value="denied">{text.denied}</option>
          <option value="cancelled">{text.cancelled}</option>
        </select>
      </label>
      <button className="button button-small" disabled={pending} type="submit">
        {pending ? "…" : text.submit}
      </button>
      {message ? (
        <p
          className={`privacy-admin-resolution-message privacy-admin-resolution-${state.status}`}
          role={state.status === "unavailable" || state.status === "invalid" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
