import { notFound } from "next/navigation";
import { Link2, Mail, Scale, ShieldCheck } from "lucide-react";
import { LEGAL_ENTITY } from "@/content/legal";
import { publicCopy } from "@/content/public-copy";
import { isLocale } from "@/lib/i18n/config";
import type { Locale } from "@/types/domain";

const contactCopy = {
  ht: {
    title: "Pale ak ekip la",
    body: "Rapòte yon lyen ki pa mache, yon fraz ki pa klè oswa yon koreksyon enpòtan.",
    support: "Koreksyon ak sipò",
    supportBody: "Voye non peyi a, tit paj la ak lyen ki bezwen verifye a.",
    legal: "Kesyon legal ak vi prive",
    legalBody: "Pou kestyon sou kondisyon, konfidansyalite oswa done yon imèl ou te voye.",
    notice: "Pa voye paspò, pyès idantite, dosye migrasyon, enfòmasyon bankè oswa medikal pa imèl."
  },
  fr: {
    title: "Parler à l’équipe",
    body: "Signalez un lien cassé, une phrase peu claire ou une correction importante.",
    support: "Corrections et assistance",
    supportBody: "Envoyez le pays, le titre de la page et le lien à vérifier.",
    legal: "Questions juridiques et confidentialité",
    legalBody:
      "Pour les questions sur les conditions, la confidentialité ou les données d’un e-mail envoyé.",
    notice:
      "N’envoyez aucun passeport, pièce d’identité, dossier migratoire, information bancaire ou médicale par e-mail."
  },
  es: {
    title: "Habla con el equipo",
    body: "Informa de un enlace roto, una frase poco clara o una corrección importante.",
    support: "Correcciones y soporte",
    supportBody: "Envía el país, el título de la página y el enlace que debemos verificar.",
    legal: "Preguntas legales y privacidad",
    legalBody: "Para consultas sobre términos, privacidad o datos de un correo que enviaste.",
    notice:
      "No envíes pasaportes, identificaciones, expedientes migratorios, datos bancarios ni información médica por correo."
  },
  pt: {
    title: "Fale com a equipe",
    body: "Avise sobre um link quebrado, uma frase pouco clara ou uma correção importante.",
    support: "Correções e suporte",
    supportBody: "Envie o país, o título da página e o link que precisa ser verificado.",
    legal: "Questões jurídicas e privacidade",
    legalBody: "Para dúvidas sobre termos, privacidade ou dados de um e-mail enviado.",
    notice:
      "Não envie passaportes, documentos de identidade, processos migratórios, dados bancários ou informações médicas por e-mail."
  },
  en: {
    title: "Talk to the team",
    body: "Report a broken link, unclear phrase or important correction.",
    support: "Corrections and support",
    supportBody: "Send the country, page title and link that needs to be checked.",
    legal: "Legal and privacy questions",
    legalBody: "For questions about terms, privacy or data in an email you sent.",
    notice:
      "Do not send passports, identity documents, immigration files, bank data or medical information by email."
  }
} satisfies Record<
  Locale,
  {
    title: string;
    body: string;
    support: string;
    supportBody: string;
    legal: string;
    legalBody: string;
    notice: string;
  }
>;

type ContactPageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = contactCopy[locale];
  const copy = publicCopy[locale];

  return (
    <>
      <section className="page-hero page-hero-contact">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.navigation.contact}</p>
          <h1>{page.title}</h1>
          <p className="page-lede">{page.body}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell contact-channels premium-contact-channels">
          <div className="contact-channel-grid">
            <a href={`mailto:${LEGAL_ENTITY.email.support}`}>
              <Link2 aria-hidden="true" size={25} />
              <strong>{page.support}</strong>
              <p>{page.supportBody}</p>
              <span>{LEGAL_ENTITY.email.support}</span>
            </a>
            <a href={`mailto:${LEGAL_ENTITY.email.legal}`}>
              <Scale aria-hidden="true" size={25} />
              <strong>{page.legal}</strong>
              <p>{page.legalBody}</p>
              <span>{LEGAL_ENTITY.email.legal}</span>
            </a>
          </div>
          <aside className="contact-security-note">
            <ShieldCheck aria-hidden="true" size={21} />
            <div>
              <strong>
                <Mail aria-hidden="true" size={17} /> {copy.footer.privacy}
              </strong>
              <p>{page.notice}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
