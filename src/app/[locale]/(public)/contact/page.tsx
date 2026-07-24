import { notFound } from "next/navigation";
import { BadgeInfo, Mail, Megaphone, Scale, ShieldCheck } from "lucide-react";
import { LEGAL_ENTITY } from "@/content/legal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";
import type { Locale } from "@/types/domain";

type ContactPageProps = { params: Promise<{ locale: string }> };

const contactCopy = {
  ht: {
    title: "Chanèl ofisyèl",
    body: "Chwazi adrès ki koresponn ak demann ou an. Pa voye dokiman sansib pa imèl.",
    support: "Sipò jeneral",
    supportBody: "Kesyon sou sit la, kont ou oswa yon pwoblèm teknik.",
    legal: "Legal ak vi prive",
    legalBody: "Dwa sou done, kondisyon, sekirite oswa yon demann legal.",
    marketing: "Pwomosyon",
    marketingBody: "Otorizasyon, dezabònman ak kominikasyon pwomosyonèl.",
    notice: "Imèl yo pa yon kanal pou ijans ni pou voye paspò, pyès idantite oswa dosye migrasyon."
  },
  fr: {
    title: "Canaux officiels",
    body: "Choisissez l’adresse correspondant à votre demande. N’envoyez aucun document sensible par e-mail.",
    support: "Assistance générale",
    supportBody: "Questions sur le site, votre compte ou un problème technique.",
    legal: "Juridique et confidentialité",
    legalBody: "Droits sur les données, conditions, sécurité ou demande juridique.",
    marketing: "Promotions",
    marketingBody: "Autorisation, désinscription et communications promotionnelles.",
    notice:
      "Les e-mails ne sont pas un canal d’urgence et ne doivent pas contenir de passeport, pièce d’identité ou dossier migratoire."
  },
  es: {
    title: "Canales oficiales",
    body: "Elige la dirección que corresponde a tu solicitud. No envíes documentos sensibles por correo.",
    support: "Soporte general",
    supportBody: "Preguntas sobre el sitio, tu cuenta o un problema técnico.",
    legal: "Legal y privacidad",
    legalBody: "Derechos de datos, términos, seguridad o una solicitud legal.",
    marketing: "Promociones",
    marketingBody: "Autorización, baja y comunicaciones promocionales.",
    notice:
      "El correo no es un canal de emergencias ni para enviar pasaportes, identificaciones o expedientes migratorios."
  },
  pt: {
    title: "Canais oficiais",
    body: "Escolha o endereço correspondente à sua solicitação. Não envie documentos sensíveis por e-mail.",
    support: "Suporte geral",
    supportBody: "Dúvidas sobre o site, sua conta ou um problema técnico.",
    legal: "Jurídico e privacidade",
    legalBody: "Direitos de dados, termos, segurança ou solicitação jurídica.",
    marketing: "Promoções",
    marketingBody: "Autorização, cancelamento e comunicações promocionais.",
    notice:
      "O e-mail não é um canal de emergência nem deve ser usado para enviar passaportes, identidades ou processos migratórios."
  },
  en: {
    title: "Official channels",
    body: "Choose the address that matches your request. Do not send sensitive documents by email.",
    support: "General support",
    supportBody: "Questions about the site, your account or a technical issue.",
    legal: "Legal and privacy",
    legalBody: "Data rights, terms, security or a legal request.",
    marketing: "Promotions",
    marketingBody: "Authorization, opt-out and promotional communications.",
    notice:
      "Email is not an emergency channel and must not be used to send passports, IDs or immigration files."
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
    marketing: string;
    marketingBody: string;
    notice: string;
  }
>;

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const experience = getExperienceCopy(locale);
  const copy = getProductCopy(locale);
  const contact = contactCopy[locale];

  return (
    <>
      <section className="page-hero page-hero-contact">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{experience.advisor}</p>
          <h1>{copy.contactTitle}</h1>
          <p className="page-lede">{copy.contactBody}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell contact-channels">
          <header>
            <p className="eyebrow">
              <BadgeInfo aria-hidden="true" size={15} /> {experience.advisor}
            </p>
            <h2>{contact.title}</h2>
            <p>{contact.body}</p>
          </header>
          <div className="contact-channel-grid">
            <a href={`mailto:${LEGAL_ENTITY.email.support}`}>
              <Mail aria-hidden="true" size={25} />
              <strong>{contact.support}</strong>
              <p>{contact.supportBody}</p>
              <span>{LEGAL_ENTITY.email.support}</span>
            </a>
            <a href={`mailto:${LEGAL_ENTITY.email.legal}`}>
              <Scale aria-hidden="true" size={25} />
              <strong>{contact.legal}</strong>
              <p>{contact.legalBody}</p>
              <span>{LEGAL_ENTITY.email.legal}</span>
            </a>
            <a href={`mailto:${LEGAL_ENTITY.email.marketing}`}>
              <Megaphone aria-hidden="true" size={25} />
              <strong>{contact.marketing}</strong>
              <p>{contact.marketingBody}</p>
              <span>{LEGAL_ENTITY.email.marketing}</span>
            </a>
          </div>
          <aside className="contact-security-note">
            <ShieldCheck aria-hidden="true" size={21} />
            <div>
              <strong>{dictionary.security.do_not_share}</strong>
              <p>{contact.notice}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
