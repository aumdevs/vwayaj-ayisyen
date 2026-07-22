import { notFound } from "next/navigation";
import { FeatureUnavailable } from "@/components/ui/feature-unavailable";
import { PageIntro } from "@/components/ui/page-intro";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";
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

type LegalPageProps = { params: Promise<{ locale: string; document: string }> };

export function generateStaticParams() {
  return documents.map((document) => ({ document }));
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale, document } = await params;
  if (!isLocale(locale) || !documents.some((item) => item === document)) notFound();
  const legalDocument = document as LegalDocument;
  const dictionary = getDictionary(locale);
  const copy = getProductCopy(locale);
  return (
    <div className="narrow-shell page-section">
      <PageIntro title={titles[legalDocument][locale]} description={copy.legalDraft} />
      <FeatureUnavailable
        title={copy.reviewBadge}
        message={dictionary.common.in_preparation}
        detail={copy.draftDetail}
      />
    </div>
  );
}
