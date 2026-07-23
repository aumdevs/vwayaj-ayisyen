import { Inbox, ShieldCheck } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { PrivacyAdminQueueData } from "@/types/privacy";

type PrivacyAdminQueueProps = {
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
    fallback: "Escalation channel"
  }
} satisfies Record<Locale, Record<string, string>>;

function formatTimestamp(value: string, locale: Locale) {
  const language = locale === "ht" ? "fr" : locale;
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(new Date(value));
}

export function PrivacyAdminQueue({ data, legalEmail, locale }: PrivacyAdminQueueProps) {
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
          </div>
          {data.requests.map((request) => (
            <div className="privacy-admin-table-row" key={request.id} role="row">
              <strong role="cell">{request.requestType}</strong>
              <span role="cell">
                {request.status} · {request.locale}
              </span>
              <time dateTime={request.createdAt} role="cell">
                {formatTimestamp(request.createdAt, locale)}
              </time>
              <code role="cell">{request.userId ?? "—"}</code>
              <code role="cell">{request.id}</code>
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
