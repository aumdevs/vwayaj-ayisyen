"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckCircle2, Clock3, FileCheck2, Send, ShieldCheck } from "lucide-react";
import type { PrivacyRequestActionState } from "@/app/[locale]/privacy-actions";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";
import type { PrivacyCenterData } from "@/types/privacy";

type PrivacyRequestPanelProps = {
  action: (
    _previous: PrivacyRequestActionState,
    formData: FormData
  ) => Promise<PrivacyRequestActionState>;
  data: PrivacyCenterData;
  legalEmail: string;
  locale: Locale;
};

const initialState: PrivacyRequestActionState = { status: "idle" };

const copy = {
  ht: {
    intro: "Jere dwa ou sou done yo epi konsilte prèv akseptasyon legal ou.",
    accepted: "Dokiman ou te aksepte",
    noAcceptance: "Pa gen akseptasyon legal anrejistre pou kont sa a.",
    legacyAcceptance: "Prèv sa a soti nan yon ansyen rejis verifye; lang legal la pa t anrejistre.",
    terms: "Kondisyon",
    privacy: "Konfidansyalite",
    requestTitle: "Voye yon demann sou done ou",
    requestBody:
      "Chwazi dwa ou vle egzèse. Nou ka mande yon verifikasyon pwopòsyonèl anvan nou reponn.",
    type: "Kalite demann",
    details: "Detay itil (opsyonèl)",
    detailsHelp: "Pa mete paspò, pyès idantite oswa lòt done sansib.",
    submit: "Voye demann lan",
    submitted: "Nou resevwa demann ou an.",
    invalid: "Verifye enfòmasyon yo epi eseye ankò.",
    unavailable: "Nou pa ka resevwa demann lan kounye a. Ekri legal@vwayajayisyen.com.",
    history: "Dènye demann yo",
    empty: "Ou poko voye okenn demann.",
    email: "Ou ka ekri tou",
    types: {
      access: "Aksè",
      correct: "Koreksyon",
      delete: "Efase",
      export: "Pòtabilite / ekspòtasyon",
      restrict: "Restriksyon",
      object: "Opozisyon"
    },
    statuses: {
      received: "Resevwa",
      identity_check: "Verifikasyon idantite",
      in_progress: "An kou",
      fulfilled: "Konplete",
      denied: "Refize",
      cancelled: "Anile"
    }
  },
  fr: {
    intro:
      "Gérez vos droits sur les données et consultez la preuve de vos acceptations juridiques.",
    accepted: "Documents acceptés",
    noAcceptance: "Aucune acceptation juridique n’est enregistrée pour ce compte.",
    legacyAcceptance:
      "Cette preuve provient d’un ancien registre vérifié ; la langue juridique n’a pas été enregistrée.",
    terms: "Conditions",
    privacy: "Confidentialité",
    requestTitle: "Envoyer une demande relative à vos données",
    requestBody:
      "Choisissez le droit à exercer. Une vérification proportionnée peut être demandée avant la réponse.",
    type: "Type de demande",
    details: "Détails utiles (facultatif)",
    detailsHelp: "N’ajoutez pas de passeport, pièce d’identité ou autre donnée sensible.",
    submit: "Envoyer la demande",
    submitted: "Votre demande a bien été reçue.",
    invalid: "Vérifiez les informations et réessayez.",
    unavailable:
      "La demande ne peut pas être reçue actuellement. Écrivez à legal@vwayajayisyen.com.",
    history: "Demandes récentes",
    empty: "Vous n’avez encore envoyé aucune demande.",
    email: "Vous pouvez également écrire à",
    types: {
      access: "Accès",
      correct: "Correction",
      delete: "Suppression",
      export: "Portabilité / export",
      restrict: "Limitation",
      object: "Opposition"
    },
    statuses: {
      received: "Reçue",
      identity_check: "Vérification d’identité",
      in_progress: "En cours",
      fulfilled: "Traitée",
      denied: "Refusée",
      cancelled: "Annulée"
    }
  },
  es: {
    intro: "Gestiona tus derechos de datos y consulta la evidencia de tus aceptaciones legales.",
    accepted: "Documentos aceptados",
    noAcceptance: "Esta cuenta no tiene una aceptación legal registrada.",
    legacyAcceptance:
      "Esta evidencia procede de un registro verificado anterior; el idioma jurídico no quedó registrado.",
    terms: "Términos",
    privacy: "Privacidad",
    requestTitle: "Enviar una solicitud sobre tus datos",
    requestBody:
      "Elige el derecho que quieres ejercer. Podemos solicitar una verificación proporcional antes de responder.",
    type: "Tipo de solicitud",
    details: "Detalles útiles (opcional)",
    detailsHelp: "No incluyas pasaportes, identificaciones ni otros datos sensibles.",
    submit: "Enviar solicitud",
    submitted: "Recibimos tu solicitud.",
    invalid: "Revisa la información e inténtalo de nuevo.",
    unavailable: "No podemos recibir la solicitud ahora. Escribe a legal@vwayajayisyen.com.",
    history: "Solicitudes recientes",
    empty: "Todavía no has enviado solicitudes.",
    email: "También puedes escribir a",
    types: {
      access: "Acceso",
      correct: "Corrección",
      delete: "Eliminación",
      export: "Portabilidad / exportación",
      restrict: "Restricción",
      object: "Oposición"
    },
    statuses: {
      received: "Recibida",
      identity_check: "Verificación de identidad",
      in_progress: "En proceso",
      fulfilled: "Atendida",
      denied: "Denegada",
      cancelled: "Cancelada"
    }
  },
  pt: {
    intro: "Gerencie seus direitos de dados e consulte a evidência dos seus aceites jurídicos.",
    accepted: "Documentos aceitos",
    noAcceptance: "Esta conta não possui aceite jurídico registrado.",
    legacyAcceptance:
      "Esta evidência vem de um registro verificado anterior; o idioma jurídico não foi registrado.",
    terms: "Termos",
    privacy: "Privacidade",
    requestTitle: "Enviar uma solicitação sobre seus dados",
    requestBody:
      "Escolha o direito que deseja exercer. Podemos solicitar verificação proporcional antes de responder.",
    type: "Tipo de solicitação",
    details: "Detalhes úteis (opcional)",
    detailsHelp: "Não inclua passaporte, documento de identidade ou outros dados sensíveis.",
    submit: "Enviar solicitação",
    submitted: "Recebemos sua solicitação.",
    invalid: "Revise as informações e tente novamente.",
    unavailable:
      "Não foi possível receber a solicitação agora. Escreva para legal@vwayajayisyen.com.",
    history: "Solicitações recentes",
    empty: "Você ainda não enviou solicitações.",
    email: "Você também pode escrever para",
    types: {
      access: "Acesso",
      correct: "Correção",
      delete: "Eliminação",
      export: "Portabilidade / exportação",
      restrict: "Restrição",
      object: "Oposição"
    },
    statuses: {
      received: "Recebida",
      identity_check: "Verificação de identidade",
      in_progress: "Em andamento",
      fulfilled: "Atendida",
      denied: "Negada",
      cancelled: "Cancelada"
    }
  },
  en: {
    intro: "Manage your data rights and review evidence of your legal acceptances.",
    accepted: "Accepted documents",
    noAcceptance: "No legal acceptance is recorded for this account.",
    legacyAcceptance:
      "This evidence comes from a verified legacy record; the legal language was not recorded.",
    terms: "Terms",
    privacy: "Privacy",
    requestTitle: "Submit a request about your data",
    requestBody:
      "Choose the right you want to exercise. We may request proportionate verification before responding.",
    type: "Request type",
    details: "Helpful details (optional)",
    detailsHelp: "Do not include passports, IDs or other sensitive data.",
    submit: "Submit request",
    submitted: "We received your request.",
    invalid: "Review the information and try again.",
    unavailable: "We cannot receive the request now. Email legal@vwayajayisyen.com.",
    history: "Recent requests",
    empty: "You have not submitted any requests yet.",
    email: "You can also email",
    types: {
      access: "Access",
      correct: "Correction",
      delete: "Deletion",
      export: "Portability / export",
      restrict: "Restriction",
      object: "Objection"
    },
    statuses: {
      received: "Received",
      identity_check: "Identity check",
      in_progress: "In progress",
      fulfilled: "Fulfilled",
      denied: "Denied",
      cancelled: "Cancelled"
    }
  }
} satisfies Record<
  Locale,
  {
    intro: string;
    accepted: string;
    noAcceptance: string;
    legacyAcceptance: string;
    terms: string;
    privacy: string;
    requestTitle: string;
    requestBody: string;
    type: string;
    details: string;
    detailsHelp: string;
    submit: string;
    submitted: string;
    invalid: string;
    unavailable: string;
    history: string;
    empty: string;
    email: string;
    types: Record<PrivacyCenterData["requests"][number]["requestType"], string>;
    statuses: Record<PrivacyCenterData["requests"][number]["status"], string>;
  }
>;

function formatDate(value: string, locale: Locale) {
  const language = locale === "ht" ? "fr" : locale;
  return new Intl.DateTimeFormat(language, { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(value)
  );
}

export function PrivacyRequestPanel({
  action,
  data,
  legalEmail,
  locale
}: PrivacyRequestPanelProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const text = copy[locale];
  const termsHref =
    !data.profile?.termsLegacy && data.profile?.termsLocale && data.profile.termsVersion
      ? {
          pathname: localizedPath(data.profile.termsLocale, "legal/terms"),
          query: { version: data.profile.termsVersion }
        }
      : null;
  const privacyHref =
    !data.profile?.privacyLegacy && data.profile?.privacyLocale && data.profile.privacyVersion
      ? {
          pathname: localizedPath(data.profile.privacyLocale, "legal/privacy"),
          query: { version: data.profile.privacyVersion }
        }
      : null;
  const message = !data.available
    ? text.unavailable
    : state.status === "submitted"
      ? text.submitted
      : state.status === "invalid"
        ? text.invalid
        : state.status === "unavailable"
          ? text.unavailable
          : null;

  return (
    <div className="privacy-center">
      <p className="privacy-center-intro">{text.intro}</p>

      <section className="privacy-acceptance-card">
        <header>
          <FileCheck2 aria-hidden="true" size={23} />
          <h2>{text.accepted}</h2>
        </header>
        {data.profile?.termsVersion || data.profile?.privacyVersion ? (
          <div className="privacy-acceptance-grid">
            {data.profile?.termsVersion ? (
              termsHref ? (
                <Link href={termsHref} hrefLang={data.profile.termsLocale ?? undefined}>
                  <strong>{text.terms}</strong>
                  <code>{data.profile.termsVersion}</code>
                  <small>
                    {data.profile.termsAcceptedAt
                      ? formatDate(data.profile.termsAcceptedAt, locale)
                      : "—"}
                  </small>
                </Link>
              ) : (
                <div>
                  <strong>{text.terms}</strong>
                  <code>{data.profile.termsVersion}</code>
                  <small>
                    {data.profile.termsAcceptedAt
                      ? formatDate(data.profile.termsAcceptedAt, locale)
                      : "—"}
                  </small>
                  <small>{text.legacyAcceptance}</small>
                </div>
              )
            ) : null}
            {data.profile?.privacyVersion ? (
              privacyHref ? (
                <Link href={privacyHref} hrefLang={data.profile.privacyLocale ?? undefined}>
                  <strong>{text.privacy}</strong>
                  <code>{data.profile.privacyVersion}</code>
                  <small>
                    {data.profile.privacyAcceptedAt
                      ? formatDate(data.profile.privacyAcceptedAt, locale)
                      : "—"}
                  </small>
                </Link>
              ) : (
                <div>
                  <strong>{text.privacy}</strong>
                  <code>{data.profile.privacyVersion}</code>
                  <small>
                    {data.profile.privacyAcceptedAt
                      ? formatDate(data.profile.privacyAcceptedAt, locale)
                      : "—"}
                  </small>
                  <small>{text.legacyAcceptance}</small>
                </div>
              )
            ) : null}
          </div>
        ) : (
          <p>{text.noAcceptance}</p>
        )}
      </section>

      <section className="privacy-request-card">
        <header>
          <div>
            <p className="eyebrow">
              <ShieldCheck aria-hidden="true" size={15} /> {text.privacy}
            </p>
            <h2>{text.requestTitle}</h2>
            <p>{text.requestBody}</p>
          </div>
        </header>
        {message ? (
          <p
            className={`privacy-request-message privacy-request-message-${
              data.available ? state.status : "unavailable"
            }`}
            role={data.available && state.status === "submitted" ? "status" : "alert"}
          >
            {data.available && state.status === "submitted" ? (
              <CheckCircle2 aria-hidden="true" size={18} />
            ) : null}
            {message}
          </p>
        ) : null}
        <form action={formAction}>
          <div className="field">
            <label htmlFor="privacy-request-type">{text.type}</label>
            <select id="privacy-request-type" name="request_type" required>
              {Object.entries(text.types).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="privacy-request-description">{text.details}</label>
            <textarea
              aria-describedby="privacy-request-description-help"
              id="privacy-request-description"
              maxLength={2000}
              name="description"
              rows={5}
            />
            <small id="privacy-request-description-help">{text.detailsHelp}</small>
          </div>
          <button className="button" disabled={pending || !data.available} type="submit">
            <Send aria-hidden="true" size={17} /> {text.submit}
          </button>
        </form>
        <small className="privacy-request-email">
          {text.email} <a href={`mailto:${legalEmail}`}>{legalEmail}</a>
        </small>
      </section>

      <section className="privacy-history-card">
        <header>
          <Clock3 aria-hidden="true" size={22} />
          <h2>{text.history}</h2>
        </header>
        {data.requests.length > 0 ? (
          <ul>
            {data.requests.map((request) => (
              <li key={request.id}>
                <div>
                  <strong>{text.types[request.requestType]}</strong>
                  <small>{formatDate(request.createdAt, locale)}</small>
                </div>
                <span>{text.statuses[request.status]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{text.empty}</p>
        )}
      </section>
    </div>
  );
}
