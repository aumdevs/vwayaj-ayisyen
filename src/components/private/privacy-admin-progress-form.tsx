"use client";

import { useActionState } from "react";
import type { PrivacyAdminActionState } from "@/app/[locale]/privacy-admin-actions";
import type { Locale } from "@/types/domain";
import type { PrivacyAdminQueueData } from "@/types/privacy";

type PrivacyAdminProgressFormProps = {
  action: (
    _previous: PrivacyAdminActionState,
    formData: FormData
  ) => Promise<PrivacyAdminActionState>;
  currentStatus: PrivacyAdminQueueData["requests"][number]["status"];
  locale: Locale;
  requestId: string;
};

const initialState: PrivacyAdminActionState = { status: "idle" };

const copy = {
  ht: {
    method: "Metòd swivi",
    methodPlaceholder: "Eg.: sesyon MFA + konfimasyon imèl",
    status: "Pwochen eta",
    identity_check: "Verifikasyon idantite",
    in_progress: "An kou",
    submit: "Mete eta a ajou",
    invalid: "Chwazi yon etap valab epi antre metòd swivi a.",
    unavailable: "Nou pa ka mete eta a ajou. Verifye MFA oswa eskale.",
    updated: "Eta demann lan mete ajou epi li anrejistre."
  },
  fr: {
    method: "Méthode de suivi",
    methodPlaceholder: "Ex. : session MFA + confirmation par e-mail",
    status: "Étape suivante",
    identity_check: "Vérification d’identité",
    in_progress: "En cours",
    submit: "Mettre à jour l’état",
    invalid: "Choisissez une étape valide et renseignez la méthode de suivi.",
    unavailable: "Impossible de mettre à jour l’état. Vérifiez la MFA ou escaladez.",
    updated: "L’état de la demande a été mis à jour et journalisé."
  },
  es: {
    method: "Método de seguimiento",
    methodPlaceholder: "Ej.: sesión MFA + confirmación por correo",
    status: "Siguiente estado",
    identity_check: "Verificación de identidad",
    in_progress: "En proceso",
    submit: "Actualizar estado",
    invalid: "Selecciona una etapa válida e indica el método de seguimiento.",
    unavailable: "No se pudo actualizar el estado. Verifica MFA o escala al canal legal.",
    updated: "El estado de la solicitud fue actualizado y auditado."
  },
  pt: {
    method: "Método de acompanhamento",
    methodPlaceholder: "Ex.: sessão MFA + confirmação por e-mail",
    status: "Próximo status",
    identity_check: "Verificação de identidade",
    in_progress: "Em andamento",
    submit: "Atualizar status",
    invalid: "Selecione uma etapa válida e informe o método de acompanhamento.",
    unavailable: "Não foi possível atualizar o status. Verifique o MFA ou escale.",
    updated: "O status da solicitação foi atualizado e auditado."
  },
  en: {
    method: "Tracking method",
    methodPlaceholder: "Example: MFA session + email confirmation",
    status: "Next status",
    identity_check: "Identity check",
    in_progress: "In progress",
    submit: "Update status",
    invalid: "Choose a valid step and enter the tracking method.",
    unavailable: "The status could not be updated. Check MFA or escalate.",
    updated: "The request status was updated and audited."
  }
} satisfies Record<Locale, Record<string, string>>;

export function PrivacyAdminProgressForm({
  action,
  currentStatus,
  locale,
  requestId
}: PrivacyAdminProgressFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const text = copy[locale];
  const nextStatuses: ("identity_check" | "in_progress")[] =
    currentStatus === "received"
      ? ["identity_check", "in_progress"]
      : currentStatus === "identity_check"
        ? ["in_progress"]
        : [];

  if (nextStatuses.length === 0) return null;

  const message =
    state.status === "invalid"
      ? text.invalid
      : state.status === "unavailable"
        ? text.unavailable
        : state.status === "updated"
          ? text.updated
          : null;

  return (
    <form action={formAction} className="privacy-admin-resolution-form privacy-admin-progress-form">
      <input name="request_id" type="hidden" value={requestId} />
      <label>
        <span>{text.method}</span>
        <input
          maxLength={160}
          minLength={3}
          name="identity_verification_method"
          placeholder={text.methodPlaceholder}
          required
          type="text"
        />
      </label>
      <label>
        <span>{text.status}</span>
        <select defaultValue={nextStatuses[0]} name="workflow_status" required>
          {nextStatuses.map((status) => (
            <option key={status} value={status}>
              {text[status]}
            </option>
          ))}
        </select>
      </label>
      <button className="button button-small" disabled={pending} type="submit">
        {pending ? "…" : text.submit}
      </button>
      {message ? (
        <p
          className={`privacy-admin-resolution-message privacy-admin-resolution-${state.status}`}
          role={state.status === "updated" ? "status" : "alert"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
