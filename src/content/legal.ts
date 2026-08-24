import type { Locale } from "@/types/domain";

export const LEGAL_ENTITY = {
  name: "Vwayaj ayisyen",
  type: "Ltda.",
  country: "Brasil",
  publicAddress: "São Paulo, Brasil",
  email: {
    support: "support@vwayajayisyen.com",
    legal: "legal@vwayajayisyen.com"
  }
} as const;

export const LEGAL_VERSIONS = {
  terms: "terms-2026-08-24-v2",
  privacy: "privacy-2026-08-24-v2",
  cookies: "cookies-2026-08-24-v2"
} as const;

export const PUBLISHED_LEGAL_DOCUMENTS = ["terms", "privacy", "cookies"] as const;
export type PublishedLegalDocument = (typeof PUBLISHED_LEGAL_DOCUMENTS)[number];
export type OfficialLegalLocale = "es" | "pt";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
};

export type LegalDocumentContent = {
  title: string;
  kicker: string;
  summary: string;
  version: string;
  effectiveDate: string;
  updatedLabel: string;
  versionLabel: string;
  languageNotice: string;
  languageLabel: string;
  contactTitle: string;
  sections: readonly LegalSection[];
};

const sharedSpanish = {
  kicker: "Documento legal oficial",
  updatedLabel: "Vigente desde",
  versionLabel: "Versión",
  languageLabel: "Idiomas jurídicos oficiales",
  languageNotice:
    "Las versiones en español y portugués son oficiales y equivalentes. Las demás traducciones facilitan la lectura.",
  contactTitle: "Contacto legal y soporte",
  effectiveDate: "24 de agosto de 2026"
} as const;

const sharedPortuguese = {
  kicker: "Documento jurídico oficial",
  updatedLabel: "Em vigor desde",
  versionLabel: "Versão",
  languageLabel: "Idiomas jurídicos oficiais",
  languageNotice:
    "As versões em espanhol e português são oficiais e equivalentes. As demais traduções facilitam a leitura.",
  contactTitle: "Contato jurídico e suporte",
  effectiveDate: "24 de agosto de 2026"
} as const;

const spanishTerms: LegalDocumentContent = {
  ...sharedSpanish,
  title: "Condiciones de uso",
  summary:
    "Estas condiciones regulan el uso del directorio público de Vwayaj Ayisyen y sus enlaces a fuentes oficiales.",
  version: LEGAL_VERSIONS.terms,
  sections: [
    {
      id: "operator",
      title: "1. Operador",
      paragraphs: [
        `${LEGAL_ENTITY.name}, entidad de tipo ${LEGAL_ENTITY.type} en ${LEGAL_ENTITY.country}, opera este sitio desde ${LEGAL_ENTITY.publicAddress}.`,
        `Soporte: ${LEGAL_ENTITY.email.support}. Asuntos legales y de privacidad: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "service",
      title: "2. Servicio público de información",
      paragraphs: [
        "Vwayaj Ayisyen organiza enlaces y orientaciones generales para ayudar a la comunidad haitiana a encontrar autoridades responsables de visas, consulados, residencia, identidad, trabajo, estudios y salud.",
        "El sitio no ofrece cuentas, pagos, carga de documentos, asesoría individual ni representación. No somos una embajada, consulado, oficina de inmigración u organismo gubernamental."
      ]
    },
    {
      id: "accuracy",
      title: "3. Fuentes y decisiones",
      paragraphs: [
        "Indicamos la fuente y la fecha de revisión de los enlaces, pero las autoridades pueden cambiar requisitos, disponibilidad, precios o procedimientos sin aviso a Vwayaj Ayisyen.",
        "Comprueba siempre la página oficial antes de solicitar, pagar, entregar documentos o viajar. El sitio no determina elegibilidad ni garantiza visas, permisos, empleo, admisión, plazos o resultados."
      ]
    },
    {
      id: "external",
      title: "4. Sitios externos y uso permitido",
      paragraphs: [
        "Los sitios externos aplican sus propias condiciones y políticas. Un enlace identifica una fuente útil; no crea una asociación ni una garantía.",
        "No uses el sitio para fraude, suplantación, extracción abusiva de contenido, interferencia con la seguridad o actividades que vulneren la ley o derechos de terceros."
      ]
    },
    {
      id: "changes",
      title: "5. Cambios y contacto",
      paragraphs: [
        "Podemos corregir, actualizar o retirar contenido para mantener el directorio útil y seguro. La versión y la fecha vigentes aparecen en esta página.",
        `Para comunicar un enlace incorrecto, escribe a ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const portugueseTerms: LegalDocumentContent = {
  ...sharedPortuguese,
  title: "Termos de uso",
  summary:
    "Estes termos regulam o uso do diretório público Vwayaj Ayisyen e de seus links para fontes oficiais.",
  version: LEGAL_VERSIONS.terms,
  sections: [
    {
      id: "operator",
      title: "1. Operador",
      paragraphs: [
        `${LEGAL_ENTITY.name}, entidade do tipo ${LEGAL_ENTITY.type} no ${LEGAL_ENTITY.country}, opera este site a partir de ${LEGAL_ENTITY.publicAddress}.`,
        `Suporte: ${LEGAL_ENTITY.email.support}. Assuntos jurídicos e de privacidade: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "service",
      title: "2. Serviço público de informação",
      paragraphs: [
        "Vwayaj Ayisyen organiza links e orientações gerais para ajudar a comunidade haitiana a encontrar as autoridades responsáveis por vistos, consulados, residência, identidade, trabalho, estudos e saúde.",
        "O site não oferece contas, pagamentos, envio de documentos, orientação individual ou representação. Não somos embaixada, consulado, órgão de imigração ou entidade governamental."
      ]
    },
    {
      id: "accuracy",
      title: "3. Fontes e decisões",
      paragraphs: [
        "Indicamos a fonte e a data de revisão dos links, mas as autoridades podem alterar requisitos, disponibilidade, preços ou procedimentos sem aviso à Vwayaj Ayisyen.",
        "Confira sempre a página oficial antes de solicitar, pagar, entregar documentos ou viajar. O site não determina elegibilidade nem garante vistos, permissões, emprego, admissão, prazos ou resultados."
      ]
    },
    {
      id: "external",
      title: "4. Sites externos e uso permitido",
      paragraphs: [
        "Os sites externos aplicam seus próprios termos e políticas. Um link identifica uma fonte útil; não cria associação nem garantia.",
        "Não use o site para fraude, falsidade de identidade, extração abusiva de conteúdo, interferência na segurança ou atividades que violem a lei ou direitos de terceiros."
      ]
    },
    {
      id: "changes",
      title: "5. Alterações e contato",
      paragraphs: [
        "Podemos corrigir, atualizar ou retirar conteúdo para manter o diretório útil e seguro. A versão e a data vigentes aparecem nesta página.",
        `Para comunicar um link incorreto, escreva para ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const spanishPrivacy: LegalDocumentContent = {
  ...sharedSpanish,
  title: "Política de privacidad",
  summary:
    "Vwayaj Ayisyen funciona como un directorio público sin cuentas, pagos, formularios ni carga de documentos.",
  version: LEGAL_VERSIONS.privacy,
  sections: [
    {
      id: "responsible",
      title: "1. Responsable",
      paragraphs: [
        `${LEGAL_ENTITY.name}, en ${LEGAL_ENTITY.publicAddress}, es responsable del tratamiento descrito en esta política.`,
        `Consultas de privacidad: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "site-data",
      title: "2. Datos al visitar el sitio",
      paragraphs: [
        "No creamos perfiles de usuario ni pedimos pasaportes, identificaciones, expedientes migratorios, datos bancarios o información médica.",
        "El servicio de alojamiento puede procesar información básica de una visita, como dirección de red, fecha, página solicitada y navegador, para entregar y proteger el sitio."
      ]
    },
    {
      id: "email",
      title: "3. Cuando nos escribes",
      paragraphs: [
        "Si envías un correo, recibimos la dirección, el asunto y el contenido que decidas incluir para responder a tu solicitud.",
        "No envíes documentos personales o expedientes migratorios por correo. Puedes solicitar información sobre tus datos o su eliminación mediante el contacto legal."
      ]
    },
    {
      id: "external",
      title: "4. Enlaces oficiales externos",
      paragraphs: [
        "Al abrir una fuente gubernamental, sales de Vwayaj Ayisyen. La autoridad externa aplica su propia política de privacidad y decide qué información necesita para su trámite."
      ]
    },
    {
      id: "updates",
      title: "5. Actualizaciones",
      paragraphs: [
        "Actualizaremos esta política antes de habilitar una función que cambie de forma relevante el tratamiento de datos. La fecha y versión vigentes aparecen arriba."
      ]
    }
  ]
};

const portuguesePrivacy: LegalDocumentContent = {
  ...sharedPortuguese,
  title: "Política de privacidade",
  summary:
    "Vwayaj Ayisyen funciona como um diretório público sem contas, pagamentos, formulários ou envio de documentos.",
  version: LEGAL_VERSIONS.privacy,
  sections: [
    {
      id: "responsible",
      title: "1. Responsável",
      paragraphs: [
        `${LEGAL_ENTITY.name}, em ${LEGAL_ENTITY.publicAddress}, é responsável pelo tratamento descrito nesta política.`,
        `Consultas de privacidade: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "site-data",
      title: "2. Dados ao visitar o site",
      paragraphs: [
        "Não criamos perfis de usuário nem solicitamos passaportes, documentos de identidade, processos migratórios, dados bancários ou informações médicas.",
        "O serviço de hospedagem pode processar informações básicas de uma visita, como endereço de rede, data, página solicitada e navegador, para entregar e proteger o site."
      ]
    },
    {
      id: "email",
      title: "3. Quando você escreve",
      paragraphs: [
        "Se você envia um e-mail, recebemos o endereço, o assunto e o conteúdo que decidir incluir para responder à solicitação.",
        "Não envie documentos pessoais ou processos migratórios por e-mail. Você pode solicitar informações sobre seus dados ou sua eliminação pelo contato jurídico."
      ]
    },
    {
      id: "external",
      title: "4. Links oficiais externos",
      paragraphs: [
        "Ao abrir uma fonte governamental, você sai da Vwayaj Ayisyen. A autoridade externa aplica sua própria política de privacidade e decide quais informações precisa para o processo."
      ]
    },
    {
      id: "updates",
      title: "5. Atualizações",
      paragraphs: [
        "Atualizaremos esta política antes de habilitar uma função que altere de forma relevante o tratamento de dados. A data e a versão vigentes aparecem acima."
      ]
    }
  ]
};

const spanishCookies: LegalDocumentContent = {
  ...sharedSpanish,
  title: "Política de cookies y almacenamiento local",
  summary: "El sitio público no utiliza cookies de cuenta, publicidad o personalización.",
  version: LEGAL_VERSIONS.cookies,
  sections: [
    {
      id: "current-use",
      title: "1. Uso actual",
      paragraphs: [
        "Vwayaj Ayisyen no ofrece inicio de sesión y no utiliza cookies de cuenta, publicidad o seguimiento comercial.",
        "La preferencia de idioma forma parte de la dirección de la página y no necesita una cuenta."
      ]
    },
    {
      id: "pwa",
      title: "2. Aplicación instalable y uso sin conexión",
      paragraphs: [
        "Si instalas la aplicación o visitas páginas compatibles, el navegador puede guardar archivos del sitio en tu dispositivo para mejorar la carga y mostrar una pantalla sin conexión.",
        "Puedes borrar estos archivos desde la configuración del navegador o desinstalando la aplicación."
      ]
    },
    {
      id: "external",
      title: "3. Sitios externos",
      paragraphs: [
        "Las fuentes gubernamentales que abres desde el directorio pueden utilizar sus propias cookies y aplican sus respectivas políticas."
      ]
    },
    {
      id: "changes",
      title: "4. Cambios",
      paragraphs: [
        "Esta política se actualizará antes de introducir cookies opcionales o finalidades nuevas."
      ]
    }
  ]
};

const portugueseCookies: LegalDocumentContent = {
  ...sharedPortuguese,
  title: "Política de cookies e armazenamento local",
  summary: "O site público não utiliza cookies de conta, publicidade ou personalização.",
  version: LEGAL_VERSIONS.cookies,
  sections: [
    {
      id: "current-use",
      title: "1. Uso atual",
      paragraphs: [
        "Vwayaj Ayisyen não oferece login e não utiliza cookies de conta, publicidade ou rastreamento comercial.",
        "A preferência de idioma faz parte do endereço da página e não exige uma conta."
      ]
    },
    {
      id: "pwa",
      title: "2. Aplicativo instalável e uso offline",
      paragraphs: [
        "Se você instalar o aplicativo ou visitar páginas compatíveis, o navegador pode guardar arquivos do site no dispositivo para melhorar o carregamento e mostrar uma tela offline.",
        "Você pode apagar esses arquivos nas configurações do navegador ou desinstalando o aplicativo."
      ]
    },
    {
      id: "external",
      title: "3. Sites externos",
      paragraphs: [
        "As fontes governamentais abertas a partir do diretório podem usar seus próprios cookies e aplicam as respectivas políticas."
      ]
    },
    {
      id: "changes",
      title: "4. Alterações",
      paragraphs: [
        "Esta política será atualizada antes da introdução de cookies opcionais ou novas finalidades."
      ]
    }
  ]
};

const legalContent = {
  es: { terms: spanishTerms, privacy: spanishPrivacy, cookies: spanishCookies },
  pt: { terms: portugueseTerms, privacy: portuguesePrivacy, cookies: portugueseCookies }
} satisfies Record<OfficialLegalLocale, Record<PublishedLegalDocument, LegalDocumentContent>>;

export function isPublishedLegalDocument(value: string): value is PublishedLegalDocument {
  return PUBLISHED_LEGAL_DOCUMENTS.some((document) => document === value);
}

export function getOfficialLegalLocale(locale: Locale): OfficialLegalLocale {
  return locale === "pt" ? "pt" : "es";
}

export function getLegalDocumentContent(
  document: PublishedLegalDocument,
  locale: Locale,
  version: string = LEGAL_VERSIONS[document]
): LegalDocumentContent | null {
  const content = legalContent[getOfficialLegalLocale(locale)][document];
  return content.version === version ? content : null;
}
