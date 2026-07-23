import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, FileText, Languages, Mail, ShieldCheck } from "lucide-react";
import {
  getLegalDocumentContent,
  getOfficialLegalLocale,
  isPublishedLegalDocument,
  LEGAL_ENTITY
} from "@/content/legal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

const documents = [
  "terms",
  "privacy",
  "cookies",
  "refunds",
  "ai",
  "community",
  "editorial"
] as const;
type LegalDocument = (typeof documents)[number];

const titles: Record<LegalDocument, Record<Locale, string>> = {
  terms: {
    ht: "Kondisyon itilizasyon",
    fr: "Conditions d’utilisation",
    es: "Condiciones de uso",
    pt: "Termos de uso",
    en: "Terms of use"
  },
  privacy: {
    ht: "Konfidansyalite",
    fr: "Confidentialité",
    es: "Privacidad",
    pt: "Privacidade",
    en: "Privacy"
  },
  cookies: { ht: "Cookies", fr: "Cookies", es: "Cookies", pt: "Cookies", en: "Cookies" },
  refunds: {
    ht: "Ranbousman",
    fr: "Remboursements",
    es: "Reembolsos",
    pt: "Reembolsos",
    en: "Refunds"
  },
  ai: {
    ht: "Asistan IA",
    fr: "Assistant IA",
    es: "Asistente de IA",
    pt: "Assistente de IA",
    en: "AI assistant"
  },
  community: {
    ht: "Règ kominote",
    fr: "Règles de la communauté",
    es: "Reglas de la comunidad",
    pt: "Regras da comunidade",
    en: "Community rules"
  },
  editorial: {
    ht: "Politik editoryal",
    fr: "Politique éditoriale",
    es: "Política editorial",
    pt: "Política editorial",
    en: "Editorial policy"
  }
};

const legalStatus: Record<Locale, { kicker: string; title: string; body: string; note: string }> = {
  ht: {
    kicker: "Dokiman legal",
    title: "Dokiman sa a ap prepare.",
    body: "Nou poko pibliye yon tèks ofisyèl pou seksyon sa a. Jiskaske li pare, paj la pa prezante kondisyon, dwa oswa angajman ki ta ka twonpe w.",
    note: "Lè dokiman an pibliye, dat li ak vèsyon li ap parèt klèman sou paj la."
  },
  fr: {
    kicker: "Document juridique",
    title: "Ce document est en préparation.",
    body: "Aucun texte officiel n’est encore publié dans cette section. Jusqu’à sa mise en ligne, la page ne présente ni conditions, ni droits, ni engagements susceptibles d’induire en erreur.",
    note: "Lors de la publication, la date et la version du document seront clairement indiquées."
  },
  es: {
    kicker: "Documento legal",
    title: "Este documento está en preparación.",
    body: "Todavía no se ha publicado un texto oficial para esta sección. Hasta que esté listo, la página no presenta condiciones, derechos ni compromisos que puedan resultar engañosos.",
    note: "Al publicarse, la fecha y la versión del documento aparecerán de forma clara."
  },
  pt: {
    kicker: "Documento jurídico",
    title: "Este documento está em preparação.",
    body: "Ainda não há um texto oficial publicado nesta seção. Até que esteja pronto, a página não apresenta condições, direitos ou compromissos que possam induzir ao erro.",
    note: "Quando for publicado, a data e a versão do documento aparecerão de forma clara."
  },
  en: {
    kicker: "Legal document",
    title: "This document is being prepared.",
    body: "No official text has been published for this section yet. Until it is ready, this page does not present terms, rights or commitments that could be misleading.",
    note: "When published, the document date and version will be shown clearly."
  }
};

const officialLanguageNotice: Record<Locale, string> = {
  ht: "Dokiman legal ofisyèl yo disponib an panyòl ak pòtigè. Paj sa a montre vèsyon panyòl la.",
  fr: "Les documents juridiques officiels sont disponibles en espagnol et en portugais. Cette page affiche la version espagnole.",
  es: "Consulta también la versión oficial en portugués.",
  pt: "Consulte também a versão oficial em espanhol.",
  en: "Official legal documents are available in Spanish and Portuguese. This page shows the Spanish version."
};

type LegalPageProps = {
  params: Promise<{ locale: string; document: string }>;
  searchParams: Promise<{ version?: string | string[] }>;
};

export function generateStaticParams() {
  return documents.map((document) => ({ document }));
}

export default async function LegalPage({ params, searchParams }: LegalPageProps) {
  const { locale, document } = await params;
  const query = await searchParams;
  if (!isLocale(locale) || !documents.some((item) => item === document)) notFound();
  const legalDocument = document as LegalDocument;
  const dictionary = getDictionary(locale);
  const status = legalStatus[locale];
  const hasAmbiguousVersion = Array.isArray(query.version);
  const requestedVersion = typeof query.version === "string" ? query.version : undefined;
  const isPublished = isPublishedLegalDocument(legalDocument);
  if (isPublished && hasAmbiguousVersion) notFound();
  const published = isPublished
    ? getLegalDocumentContent(legalDocument, locale, requestedVersion)
    : null;
  if (isPublished && !published) notFound();
  const officialLocale = getOfficialLegalLocale(locale);

  return (
    <>
      <section className="page-hero page-hero-legal">
        <div className="shell page-hero-inner" lang={published ? officialLocale : undefined}>
          <p className="eyebrow">{published?.kicker ?? status.kicker}</p>
          <h1>{published?.title ?? titles[legalDocument][locale]}</h1>
          <p className="page-lede">{published?.summary ?? status.body}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell legal-layout">
          <nav aria-label={status.kicker}>
            {documents.map((item) => (
              <Link
                aria-current={item === legalDocument ? "page" : undefined}
                href={localizedPath(locale, `legal/${item}`)}
                key={item}
              >
                {titles[item][locale]}
              </Link>
            ))}
          </nav>
          {published ? (
            <article className="legal-document-card" lang={officialLocale}>
              <header className="legal-document-header">
                <div className="legal-document-meta">
                  <span>
                    <CalendarDays aria-hidden="true" size={17} />
                    {published.updatedLabel}: <strong>{published.effectiveDate}</strong>
                  </span>
                  <span>
                    <FileText aria-hidden="true" size={17} />
                    {published.versionLabel}: <code>{published.version}</code>
                  </span>
                </div>
                <div className="legal-language-notice">
                  <Languages aria-hidden="true" size={20} />
                  <div>
                    <strong>{published.languageLabel}</strong>
                    <p>{published.languageNotice}</p>
                    <p lang={locale}>{officialLanguageNotice[locale]}</p>
                    <span>
                      <Link
                        href={{
                          pathname: localizedPath("es", `legal/${legalDocument}`),
                          query: { version: published.version }
                        }}
                      >
                        Español
                      </Link>
                      <Link
                        href={{
                          pathname: localizedPath("pt", `legal/${legalDocument}`),
                          query: { version: published.version }
                        }}
                      >
                        Português
                      </Link>
                    </span>
                  </div>
                </div>
              </header>

              <div className="legal-document-sections">
                {published.sections.map((section) => (
                  <section id={section.id} key={section.id}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items ? (
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <footer className="legal-contact-panel">
                <Mail aria-hidden="true" size={25} />
                <div>
                  <strong>{published.contactTitle}</strong>
                  <p>
                    <a href={`mailto:${LEGAL_ENTITY.email.legal}`}>{LEGAL_ENTITY.email.legal}</a>
                    <span aria-hidden="true"> · </span>
                    <a href={`mailto:${LEGAL_ENTITY.email.support}`}>
                      {LEGAL_ENTITY.email.support}
                    </a>
                  </p>
                  <small>{LEGAL_ENTITY.publicAddress}</small>
                </div>
              </footer>
            </article>
          ) : (
            <article className="legal-pending-card">
              <span aria-hidden="true">
                <FileText size={29} />
              </span>
              <p className="eyebrow">{dictionary.common.in_preparation}</p>
              <h2>{status.title}</h2>
              <p>{status.body}</p>
              <small>
                <ShieldCheck aria-hidden="true" size={17} /> {status.note}
              </small>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
