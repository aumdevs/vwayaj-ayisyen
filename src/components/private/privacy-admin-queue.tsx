import { Inbox, ShieldCheck } from "lucide-react";
import type { PrivacyAdminActionState } from "@/app/[locale]/privacy-admin-actions";
import { PrivacyAdminResolutionForm } from "@/components/private/privacy-admin-resolution-form";
import type { Locale } from "@/types/domain";
import type { PrivacyAdminQueueData } from "@/types/privacy";

type PrivacyAdminQueueProps = {
  action: (
    _previous: PrivacyAdminActionState,
    formData: FormData
  ) => Promise<PrivacyAdminActionState>;
  data: PrivacyAdminQueueData;
  legalEmail: string;
  locale: Locale;
};

const copy = {
  ht: {
    kicker: "Ke operasyonèl",
    title: "Demann konfidansyalite ki louvri",
    intro:
      "Revize ke sa a chak jou ouvrab. Trete demann yo sèlman atravè yon kont administratè ak MFA.",
    empty: "Pa gen demann ouvè.",
    unavailable: "Ke a pa disponib. Kontakte kanal legal la imedyatman.",
    type: "Dwa",
    status: "Eta / lang",
    received: "Resevwa (UTC)",
    account: "Kont",
    reference: "Referans",
    details: "Detay moun nan voye",
    noDetails: "Pa gen detay anplis.",
    resolution: "Fèmen",
    fallback: "Kanal eskalad"
  },
  fr: {
    kicker: "File opérationnelle",
    title: "Demandes de confidentialité ouvertes",
    intro:
      "Contrôlez cette file chaque jour ouvré. Traitez les demandes uniquement avec un compte administrateur protégé par MFA.",
    empty: "Aucune demande ouverte.",
    unavailable: "La file est indisponible. Contactez immédiatement le canal juridique.",
    type: "Droit",
    status: "État / langue",
    received: "Reçue (UTC)",
    account: "Compte",
    reference: "Référence",
    details: "Détails fournis",
    noDetails: "Aucun détail supplémentaire.",
    resolution: "Clôture",
    fallback: "Canal d’escalade"
  },
  es: {
    kicker: "Cola operativa",
    title: "Solicitudes de privacidad abiertas",
    intro:
      "Revisa esta cola cada día hábil. Gestiona las solicitudes únicamente con una cuenta administradora protegida por MFA.",
    empty: "No hay solicitudes abiertas.",
    unavailable: "La cola no está disponible. Escala de inmediato al canal legal.",
    type: "Derecho",
    status: "Estado / idioma",
    received: "Recibida (UTC)",
    account: "Cuenta",
    reference: "Referencia",
    details: "Detalle enviado",
    noDetails: "Sin detalles adicionales.",
    resolution: "Cierre",
    fallback: "Canal de escalamiento"
  },
  pt: {
    kicker: "Fila operacional",
    title: "Solicitações de privacidade abertas",
    intro:
      "Revise esta fila em cada dia útil. Trate as solicitações somente com uma conta administradora protegida por MFA.",
    empty: "Não há solicitações abertas.",
    unavailable: "A fila está indisponível. Escale imediatamente ao canal jurídico.",
    type: "Direito",
    status: "Status / idioma",
    received: "Recebida (UTC)",
    account: "Conta",
    reference: "Referência",
    details: "Detalhes enviados",
    noDetails: "Sem detalhes adicionais.",
    resolution: "Encerramento",
    fallback: "Canal de escalonamento"
  },
  en: {
    kicker: "Operations queue",
    title: "Open privacy requests",
    intro:
      "Review this queue every business day. Handle requests only from an MFA-protected administrator account.",
    empty: "There are no open requests.",
    unavailable: "The queue is unavailable. Escalate to the legal channel immediately.",
    type: "Right",
    status: "Status / language",
    received: "Received (UTC)",
    account: "Account",
    reference: "Reference",
    details: "Submitted details",
    noDetails: "No additional details.",
    resolution: "Completion",
    fallback: "Escalation channel"
  }
} satisfies Record<Locale, Record<string, string>>;

const requestTypeLabels = {
  ht: {
    access: "Aksè",
    correct: "Koreksyon",
    delete: "Efase",
    export: "Pòtabilite / ekspòtasyon",
    restrict: "Restriksyon",
    object: "Opozisyon"
  },
  fr: {
    access: "Accès",
    correct: "Correction",
    delete: "Suppression",
    export: "Portabilité / export",
    restrict: "Limitation",
    object: "Opposition"
  },
  es: {
    access: "Acceso",
    correct: "Corrección",
    delete: "Eliminación",
    export: "Portabilidad / exportación",
    restrict: "Restricción",
    object: "Oposición"
  },
  pt: {
    access: "Acesso",
    correct: "Correção",
    delete: "Eliminação",
    export: "Portabilidade / exportação",
    restrict: "Restrição",
    object: "Oposição"
  },
  en: {
    access: "Access",
    correct: "Correction",
    delete: "Deletion",
    export: "Portability / export",
    restrict: "Restriction",
    object: "Objection"
  }
} satisfies Record<
  Locale,
  Record<PrivacyAdminQueueData["requests"][number]["requestType"], string>
>;

const requestStatusLabels = {
  ht: {
    received: "Resevwa",
    identity_check: "Verifikasyon idantite",
    in_progress: "An kou",
    fulfilled: "Konplete",
    denied: "Refize",
    cancelled: "Anile"
  },
  fr: {
    received: "Reçue",
    identity_check: "Vérification d’identité",
    in_progress: "En cours",
    fulfilled: "Traitée",
    denied: "Refusée",
    cancelled: "Annulée"
  },
  es: {
    received: "Recibida",
    identity_check: "Verificación de identidad",
    in_progress: "En proceso",
    fulfilled: "Atendida",
    denied: "Denegada",
    cancelled: "Cancelada"
  },
  pt: {
    received: "Recebida",
    identity_check: "Verificação de identidade",
    in_progress: "Em andamento",
    fulfilled: "Atendida",
    denied: "Negada",
    cancelled: "Cancelada"
  },
  en: {
    received: "Received",
    identity_check: "Identity check",
    in_progress: "In progress",
    fulfilled: "Fulfilled",
    denied: "Denied",
    cancelled: "Cancelled"
  }
} satisfies Record<Locale, Record<PrivacyAdminQueueData["requests"][number]["status"], string>>;

function formatTimestamp(value: string, locale: Locale) {
  const language = locale === "ht" ? "fr" : locale;
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(new Date(value));
}

export function PrivacyAdminQueue({ action, data, legalEmail, locale }: PrivacyAdminQueueProps) {
  const text = copy[locale];

  return (
    <section className="staff-table-panel privacy-admin-queue">
      <header>
        <div>
          <p className="status-label">
            {text.kicker}: {data.requests.length}
          </p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <span>
          <Inbox aria-hidden="true" size={23} />
        </span>
      </header>

      {!data.available ? (
        <p className="privacy-admin-queue-state" role="alert">
          {text.unavailable}
        </p>
      ) : data.requests.length === 0 ? (
        <p className="privacy-admin-queue-state">{text.empty}</p>
      ) : (
        <div className="staff-table privacy-admin-table" role="table" aria-label={text.title}>
          <div className="staff-table-head" role="row">
            <span role="columnheader">{text.type}</span>
            <span role="columnheader">{text.status}</span>
            <span role="columnheader">{text.received}</span>
            <span role="columnheader">{text.account}</span>
            <span role="columnheader">{text.reference}</span>
            <span role="columnheader">{text.details}</span>
            <span role="columnheader">{text.resolution}</span>
          </div>
          {data.requests.map((request) => (
            <div className="privacy-admin-table-row" key={request.id} role="row">
              <strong role="cell">{requestTypeLabels[locale][request.requestType]}</strong>
              <span role="cell">
                {requestStatusLabels[locale][request.status]} · {request.locale}
              </span>
              <time dateTime={request.createdAt} role="cell">
                {formatTimestamp(request.createdAt, locale)}
              </time>
              <code role="cell">{request.userId ?? "—"}</code>
              <code role="cell">{request.id}</code>
              <p className="privacy-admin-description" role="cell">
                {request.description?.trim() || text.noDetails}
              </p>
              <div role="cell">
                <PrivacyAdminResolutionForm
                  action={action}
                  locale={locale}
                  requestId={request.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <footer>
        <ShieldCheck aria-hidden="true" size={17} />
        <span>{text.fallback}:</span>
        <a href={`mailto:${legalEmail}`}>{legalEmail}</a>
      </footer>
    </section>
  );
}
