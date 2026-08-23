import type { Locale } from "@/types/domain";

export type OfficialSource = {
  title: string;
  publisher: string;
  url: string;
  purpose: Record<Locale, string>;
};

export const OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT = "2026-08-23";

export const USA_OFFICIAL_SOURCES: readonly OfficialSource[] = [
  {
    title: "myUSCIS",
    publisher: "U.S. Citizenship and Immigration Services",
    url: "https://my.uscis.gov/",
    purpose: {
      ht: "Kòmanse ak zouti ofisyèl USCIS pou eksplore opsyon, kont ak pwosesis yo.",
      fr: "Commencer avec les outils officiels de l’USCIS pour explorer les options et démarches.",
      es: "Empezar con las herramientas oficiales de USCIS para explorar opciones y trámites.",
      pt: "Começar pelas ferramentas oficiais do USCIS para explorar opções e processos.",
      en: "Start with official USCIS tools for exploring options, accounts and processes."
    }
  },
  {
    title: "Directory of Visa Categories",
    publisher: "U.S. Department of State",
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html",
    purpose: {
      ht: "Verifye kategori viza yo dapre objektif vwayaj la sou sit Depatman Deta a.",
      fr: "Vérifier les catégories de visa selon le motif du voyage sur le site du Département d’État.",
      es: "Verificar las categorías de visa según el propósito del viaje en el Departamento de Estado.",
      pt: "Verificar as categorias de visto conforme o objetivo da viagem no Departamento de Estado.",
      en: "Check visa categories by purpose of travel with the Department of State."
    }
  },
  {
    title: "I-94 and traveler compliance",
    publisher: "U.S. Customs and Border Protection",
    url: "https://i94.cbp.dhs.gov/",
    purpose: {
      ht: "Ale dirèkteman nan sèvis ofisyèl I-94 la pou dosye admisyon ak enfòmasyon vwayajè.",
      fr: "Accéder au service officiel I-94 pour les dossiers d’admission et informations voyageurs.",
      es: "Ir al servicio oficial I-94 para registros de admisión e información del viajero.",
      pt: "Acessar o serviço oficial I-94 para registros de admissão e informações do viajante.",
      en: "Use the official I-94 service for admission records and traveler information."
    }
  },
  {
    title: "Find Legal Representation",
    publisher: "U.S. Department of Justice — EOIR",
    url: "https://www.justice.gov/eoir/find-legal-representation",
    purpose: {
      ht: "Chèche lis ofisyèl pou avoka, sèvis pro bono ak reprezantan ki akredite.",
      fr: "Consulter les listes officielles d’avocats, services pro bono et représentants accrédités.",
      es: "Consultar listas oficiales de abogados, servicios pro bono y representantes acreditados.",
      pt: "Consultar listas oficiais de advogados, serviços pro bono e representantes credenciados.",
      en: "Find official lists of attorneys, pro bono services and accredited representatives."
    }
  },
  {
    title: "Scams Against Immigrants",
    publisher: "U.S. Federal Trade Commission",
    url: "https://consumer.ftc.gov/features/scams-against-immigrants",
    purpose: {
      ht: "Rekonèt epi rapòte magouy ki vize imigran yo.",
      fr: "Reconnaître et signaler les arnaques visant les personnes immigrées.",
      es: "Reconocer y denunciar estafas dirigidas a personas inmigrantes.",
      pt: "Reconhecer e denunciar golpes contra pessoas imigrantes.",
      en: "Recognize and report scams targeting immigrants."
    }
  }
] as const;

export const officialDirectoryCopy = {
  ht: {
    kicker: "Peyi pilòt · Sous ofisyèl",
    title: "Kòmanse ak sous gouvènman yo pou Etazini",
    body: "Anyè sa a mennen w dirèkteman nan sous prensipal yo. Li pa evalye kalifikasyon w epi li pa ranplase konsèy legal.",
    checked: "Lyen yo verifye",
    noticeTitle: "Sa ki poko pibliye",
    noticeBody:
      "Gid detaye sou travay, lojman, pri lavi ak chemen migrasyon rete fèmen jiskaske revizyon kreyòl, faktèl ak pwofesyonèl la fini.",
    open: "Louvri sous ofisyèl"
  },
  fr: {
    kicker: "Pays pilote · Sources officielles",
    title: "Commencer par les sources gouvernementales pour les États-Unis",
    body: "Ce répertoire mène directement aux sources primaires. Il n’évalue pas votre admissibilité et ne remplace pas un conseil juridique.",
    checked: "Liens vérifiés",
    noticeTitle: "Ce qui n’est pas encore publié",
    noticeBody:
      "Les guides détaillés sur le travail, le logement, le coût de la vie et les voies migratoires restent fermés jusqu’aux révisions linguistique, factuelle et professionnelle.",
    open: "Ouvrir la source officielle"
  },
  es: {
    kicker: "País piloto · Fuentes oficiales",
    title: "Empieza por las fuentes gubernamentales de Estados Unidos",
    body: "Este directorio conduce a fuentes primarias. No evalúa tu elegibilidad ni sustituye asesoría legal.",
    checked: "Enlaces verificados",
    noticeTitle: "Lo que aún no está publicado",
    noticeBody:
      "Las guías detalladas sobre trabajo, vivienda, costo de vida y vías migratorias seguirán cerradas hasta completar la revisión lingüística, factual y profesional.",
    open: "Abrir fuente oficial"
  },
  pt: {
    kicker: "País piloto · Fontes oficiais",
    title: "Comece pelas fontes governamentais dos Estados Unidos",
    body: "Este diretório leva diretamente às fontes primárias. Não avalia sua elegibilidade nem substitui orientação jurídica.",
    checked: "Links verificados",
    noticeTitle: "O que ainda não foi publicado",
    noticeBody:
      "Os guias detalhados sobre trabalho, moradia, custo de vida e vias migratórias permanecem fechados até a revisão linguística, factual e profissional.",
    open: "Abrir fonte oficial"
  },
  en: {
    kicker: "Pilot country · Official sources",
    title: "Start with United States government sources",
    body: "This directory links directly to primary sources. It does not assess eligibility or replace legal advice.",
    checked: "Links checked",
    noticeTitle: "What is not published yet",
    noticeBody:
      "Detailed work, housing, cost-of-living and immigration-pathway guidance remains closed until language, factual and professional review is complete.",
    open: "Open official source"
  }
} satisfies Record<
  Locale,
  {
    kicker: string;
    title: string;
    body: string;
    checked: string;
    noticeTitle: string;
    noticeBody: string;
    open: string;
  }
>;
