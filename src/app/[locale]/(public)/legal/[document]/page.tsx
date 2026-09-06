import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, FileText, Languages, Mail } from "lucide-react";
import {
  getLegalDocumentContent,
  getOfficialLegalLocale,
  isPublishedLegalDocument,
  LEGAL_ENTITY,
  LEGAL_NAV_DOCUMENTS,
  PUBLISHED_LEGAL_DOCUMENTS
} from "@/content/legal";
import { publicCopy } from "@/content/public-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

const titles = {
  terms: { ht: "Kondisyon", fr: "Conditions", es: "Condiciones", pt: "Termos", en: "Terms" },
  privacy: {
    ht: "Konfidansyalite",
    fr: "Confidentialité",
    es: "Privacidad",
    pt: "Privacidade",
    en: "Privacy"
  },
  security: {
    ht: "Sekirite",
    fr: "Sécurité",
    es: "Seguridad",
    pt: "Segurança",
    en: "Security"
  },
  payments: { ht: "Peman", fr: "Paiements", es: "Pagos", pt: "Pagamentos", en: "Payments" },
  cookies: { ht: "Cookies", fr: "Cookies", es: "Cookies", pt: "Cookies", en: "Cookies" }
} satisfies Record<(typeof PUBLISHED_LEGAL_DOCUMENTS)[number], Record<Locale, string>>;

type LegalPageProps = {
  params: Promise<{ locale: string; document: string }>;
  searchParams: Promise<{ version?: string | string[] }>;
};

export function generateStaticParams() {
  return PUBLISHED_LEGAL_DOCUMENTS.map((document) => ({ document }));
}

export default async function LegalPage({ params, searchParams }: LegalPageProps) {
  const { locale, document } = await params;
  const query = await searchParams;
  if (!isLocale(locale) || !isPublishedLegalDocument(document) || Array.isArray(query.version))
    notFound();
  const published = getLegalDocumentContent(document, locale, query.version);
  if (!published) notFound();
  const officialLocale = getOfficialLegalLocale(locale);
  const copy = publicCopy[locale];

  return (
    <>
      <section className="page-hero page-hero-legal">
        <div className="shell page-hero-inner" lang={officialLocale}>
          <p className="eyebrow">{published.kicker}</p>
          <h1>{published.title}</h1>
          <p className="page-lede">{published.summary}</p>
        </div>
      </section>
      <section className="section section-white legal-page-section">
        <div className="shell legal-layout">
          <nav aria-label={copy.footer.legal}>
            {LEGAL_NAV_DOCUMENTS.map((item) => (
              <Link
                aria-current={item === document ? "page" : undefined}
                href={localizedPath(locale, `legal/${item}`)}
                key={item}
              >
                {titles[item][locale]}
              </Link>
            ))}
          </nav>
          <article className="legal-document-card" lang={officialLocale}>
            <header className="legal-document-header">
              <div className="legal-document-meta">
                <span>
                  <CalendarDays aria-hidden="true" size={17} /> {published.updatedLabel}:{" "}
                  <strong>{published.effectiveDate}</strong>
                </span>
                <span>
                  <FileText aria-hidden="true" size={17} /> {published.versionLabel}:{" "}
                  <code>{published.version}</code>
                </span>
              </div>
              <div className="legal-language-notice">
                <Languages aria-hidden="true" size={20} />
                <div>
                  <strong>{published.languageLabel}</strong>
                  <p>{published.languageNotice}</p>
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
                  <a href={`mailto:${LEGAL_ENTITY.email.support}`}>{LEGAL_ENTITY.email.support}</a>
                </p>
                <small>{LEGAL_ENTITY.publicAddress}</small>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </>
  );
}
