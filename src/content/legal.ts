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
  terms: "terms-2026-09-04-v5",
  privacy: "privacy-2026-09-04-v5",
  cookies: "cookies-2026-09-04-v5",
  security: "security-2026-09-04-v1",
  payments: "payments-2026-09-04-v1"
} as const;

export const PUBLISHED_LEGAL_DOCUMENTS = [
  "terms",
  "privacy",
  "security",
  "payments",
  "cookies"
] as const;
export const LEGAL_NAV_DOCUMENTS = ["terms", "privacy", "security", "payments"] as const;
export type PublishedLegalDocument = (typeof PUBLISHED_LEGAL_DOCUMENTS)[number];
export type OfficialLegalLocale = "ht" | "es" | "pt";

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
  effectiveDate: "25 de agosto de 2026"
} as const;

const sharedPortuguese = {
  kicker: "Documento jurídico oficial",
  updatedLabel: "Em vigor desde",
  versionLabel: "Versão",
  languageLabel: "Idiomas jurídicos oficiais",
  languageNotice:
    "As versões em espanhol e português são oficiais e equivalentes. As demais traduções facilitam a leitura.",
  contactTitle: "Contato jurídico e suporte",
  effectiveDate: "25 de agosto de 2026"
} as const;

const spanishTerms: LegalDocumentContent = {
  ...sharedSpanish,
  title: "Condiciones de uso",
  summary:
    "Estas condiciones regulan el uso de las guías públicas de Vwayaj Ayisyen y sus enlaces a fuentes oficiales.",
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
        "Vwayaj Ayisyen ofrece orientaciones generales y enlaces oficiales para ayudar a la comunidad haitiana a preparar un proyecto de viaje, residencia, trabajo, estudios o protección.",
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
        "Podemos corregir, actualizar o retirar contenido para mantener las guías útiles y seguras. La versión y la fecha vigentes aparecen en esta página.",
        `Para comunicar un enlace incorrecto, escribe a ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const portugueseTerms: LegalDocumentContent = {
  ...sharedPortuguese,
  title: "Termos de uso",
  summary:
    "Estes termos regulam o uso dos guias públicos Vwayaj Ayisyen e de seus links para fontes oficiais.",
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
        "Vwayaj Ayisyen oferece orientações gerais e links oficiais para ajudar a comunidade haitiana a preparar um projeto de viagem, residência, trabalho, estudos ou proteção.",
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
        "Podemos corrigir, atualizar ou retirar conteúdo para manter os guias úteis e seguros. A versão e a data vigentes aparecem nesta página.",
        `Para comunicar um link incorreto, escreva para ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const spanishPrivacy: LegalDocumentContent = {
  ...sharedSpanish,
  title: "Política de privacidad",
  summary:
    "Vwayaj Ayisyen funciona como una guía pública sin cuentas, pagos, formularios ni carga de documentos.",
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
    "Vwayaj Ayisyen funciona como um guia público sem contas, pagamentos, formulários ou envio de documentos.",
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
        "Las fuentes gubernamentales que abres desde las guías pueden utilizar sus propias cookies y aplican sus respectivas políticas."
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
        "As fontes governamentais abertas a partir dos guias podem usar seus próprios cookies e aplicam as respectivas políticas."
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

const sharedHaitian = {
  kicker: "Dokiman legal",
  updatedLabel: "An vigè depi",
  versionLabel: "Vèsyon",
  languageLabel: "Lang dokiman an",
  languageNotice: "Vèsyon an kreyòl ayisyen se vèsyon sit la itilize pou sèvis ak kont yo.",
  contactTitle: "Kontak legal ak sipò",
  effectiveDate: "4 septanm 2026"
} as const;

const haitianTerms: LegalDocumentContent = {
  ...sharedHaitian,
  title: "Kondisyon itilizasyon",
  summary:
    "Kondisyon sa yo esplike règ pou sèvi ak gid, kont ak chanèl asistans Vwayaj Ayisyen yo.",
  version: LEGAL_VERSIONS.terms,
  sections: [
    {
      id: "operator",
      title: "1. Kilès ki opere sèvis la",
      paragraphs: [
        `${LEGAL_ENTITY.name}, yon antite ${LEGAL_ENTITY.type} nan ${LEGAL_ENTITY.country}, opere sèvis la depi ${LEGAL_ENTITY.publicAddress}.`,
        `Pou sipò: ${LEGAL_ENTITY.email.support}. Pou kestyon legal oswa konfidansyalite: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "service",
      title: "2. Sa sèvis la fè",
      paragraphs: [
        "Vwayaj Ayisyen bay enfòmasyon jeneral epi li ka ede yon kliyan konprann oswa prepare yon demach pou Chili oswa Brezil lè sèvis sa a aktive aklè.",
        "Vwayaj Ayisyen pa òganize vwayaj nan okenn sikonstans. Nou pa achte tikè, nou pa fè rezèvasyon, nou pa chwazi wout vwayaj epi nou pa transpòte moun.",
        "Nou pa yon anbasad, yon konsila oswa yon biwo imigrasyon. Nou pa ka garanti viza, rezidans, travay, antre nan yon peyi, yon delè oswa yon rezilta."
      ]
    },
    {
      id: "acceptance",
      title: "3. Akseptasyon kondisyon yo",
      paragraphs: [
        "Lè ou itilize sit la, kreye yon kont oswa mande yon sèvis, ou dakò suiv kondisyon sa yo. Si ou pa dakò, ou dwe sispann sèvi ak fonksyon ki konsène a.",
        "Yon kondisyon espesifik ki parèt klèman anvan yon sèvis ka konplete kondisyon jeneral sa yo."
      ]
    },
    {
      id: "accounts",
      title: "4. Kont ak verifikasyon imèl",
      paragraphs: [
        "Lè enskripsyon aktive, kont la ka ouvri tousuit pou rann aksè a pi fasil. Itilizatè a dwe verifye adrès imèl li nan 24 èdtan ak lyen nou voye a.",
        "Ou responsab pou bay enfòmasyon ki kòrèk, pwoteje modpas ou epi pa kite yon lòt moun sèvi ak kont ou san otorizasyon."
      ]
    },
    {
      id: "assistance",
      title: "5. Limit asistans nou",
      paragraphs: [
        "Lè asistans viza disponib, nou ka ede òganize enfòmasyon ak etap yon dosye. Se otorite konsilè oswa migratwa a sèlman ki pran desizyon final la.",
        "Nou pa garanti yon viza, yon randevou, yon delè, yon travay, yon admisyon oswa yon rezilta."
      ]
    },
    {
      id: "accuracy",
      title: "6. Enfòmasyon ak desizyon",
      paragraphs: [
        "Règ gouvènman, pri ak pwosedi kapab chanje. Verifye enfòmasyon aktyèl la ak otorite ki responsab la anvan ou peye, remèt dokiman oswa achte yon tikè.",
        "Yon bouton pou fè demach la poukont ou mennen nan yon sèvis ekstèn. Sit ekstèn nan aplike pwòp kondisyon ak règleman konfidansyalite li."
      ]
    },
    {
      id: "conduct",
      title: "7. Itilizasyon ki pa akseptab",
      paragraphs: [
        "Pa sèvi ak sit la pou fwod, vòl idantite, antre nan kont yon lòt moun, voye kontni ilegal oswa deranje sekirite sèvis la.",
        "Nou ka limite oswa fèmen yon kont ki vyole règ sa yo, apre mezi ki apwopriye pou pwoteje sèvis la ak itilizatè yo."
      ]
    },
    {
      id: "external-services",
      title: "8. Lyen ak sèvis ekstèn",
      paragraphs: [
        "Lyen pou anbasad, konsila, sèvis gouvènman oswa WhatsApp mennen deyò Vwayaj Ayisyen. Chak sèvis ekstèn aplike pwòp règ ak règleman konfidansyalite li.",
        "Prezans yon lyen pa vle di Vwayaj Ayisyen kontwole sit sa a oswa garanti enfòmasyon, disponiblite ak desizyon li yo."
      ]
    },
    {
      id: "availability",
      title: "9. Disponiblite ak chanjman sèvis la",
      paragraphs: [
        "Nou ka korije, mete ajou, ajoute oswa retire yon fonksyon pou sekirite, antretyen oswa amelyorasyon sèvis la.",
        "Nou fè efò pou kenbe platfòm nan disponib, men nou pa pwomèt li pap janm gen yon pann oswa yon reta teknik."
      ]
    },
    {
      id: "updates-contact",
      title: "10. Mizajou ak kontak",
      paragraphs: [
        "Nou ka mete kondisyon sa yo ajou lè sèvis la oswa obligasyon nou yo chanje. Dat ak nimewo vèsyon ki anlè paj la montre dokiman ki an vigè a.",
        `Pou kestyon sou kondisyon sa yo, ekri ${LEGAL_ENTITY.email.legal}. Pou sipò jeneral, ekri ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const haitianSecurity: LegalDocumentContent = {
  ...sharedHaitian,
  title: "Sekirite",
  summary: "Gid sa a esplike fason pou pwoteje kont ou, dokiman ou, lajan ou ak kominikasyon ou.",
  version: LEGAL_VERSIONS.security,
  sections: [
    {
      id: "responsibility",
      title: "1. Sekirite se responsabilite tout moun",
      paragraphs: [
        "Vwayaj Ayisyen itilize mezi teknik ak òganizasyonèl pou pwoteje sèvis la. Ou dwe itilize bon abitid tou pou pwoteje aparèy, kont ak enfòmasyon ou.",
        "Okenn sistèm pa elimine tout risk. Rete vijilan lè yon mesaj mande aksyon rapid, lajan oswa dokiman prive."
      ]
    },
    {
      id: "passwords",
      title: "2. Modpas ak aksè nan kont",
      paragraphs: [
        "Chwazi yon modpas long ou pa itilize sou lòt sèvis. Pa bay pèsonn modpas ou, menm si moun nan di li travay pou Vwayaj Ayisyen.",
        "Dekonekte sou aparèy piblik oswa aparèy ou pataje. Si ou panse yon lòt moun antre nan kont ou, chanje modpas la tousuit."
      ]
    },
    {
      id: "verification",
      title: "3. Imèl ak kòd verifikasyon",
      paragraphs: [
        "Pa pataje kòd, lyen koneksyon oswa lyen verifikasyon imèl. Ekip nou an pap mande ou voye yon kòd prive nan WhatsApp.",
        "Verifye adrès moun ki voye mesaj la ak adrès sit la anvan ou klike sou yon lyen."
      ]
    },
    {
      id: "documents",
      title: "4. Dokiman pèsonèl",
      paragraphs: [
        "Pa voye paspò, kat idantite, dosye migrasyon, enfòmasyon medikal oswa done bankè nan yon gwoup oswa mesaj ki pa pwoteje.",
        "Si yon sèvis mande yon dokiman, verifye objektif la, moun k ap resevwa li ak mwayen sekirize ki prevwa pou transmisyon an."
      ]
    },
    {
      id: "messages",
      title: "5. WhatsApp ak rezo sosyal",
      paragraphs: [
        "Yon foto pwofil oswa yon logo pa pwouve yon kont ofisyèl. Sèvi sèlman ak nimewo ak lyen ki parèt sou platfòm Vwayaj Ayisyen an.",
        "Pa kwè mesaj ki garanti viza, travay, papye oswa randevou an echanj pou yon peman rapid."
      ]
    },
    {
      id: "phishing",
      title: "6. Fo sit ak fo lyen",
      paragraphs: [
        "Li adrès entènèt la anvan ou antre enfòmasyon. Yon ti chanjman nan non domèn nan ka mennen sou yon fo sit.",
        "Pa telechaje yon fichye oswa aplikasyon yon moun enkoni voye ba ou pou swadizan fini yon demach."
      ]
    },
    {
      id: "money",
      title: "7. Pwoteje lajan ou",
      paragraphs: [
        "Pa fè peman sou yon kont pèsonèl oswa ak yon metòd ki pa parèt nan enstriksyon ofisyèl sèvis la. Mande yon resi ki idantifye sèvis la.",
        "Yon peman pou asistans pa achte yon viza epi li pa ka fòse yon otorite pran yon desizyon."
      ]
    },
    {
      id: "devices",
      title: "8. Telefòn, òdinatè ak rezo",
      paragraphs: [
        "Mete sistèm ak navigatè ou ajou, sèvi ak yon kòd pou fèmen ekran an epi evite antre done sansib sou yon rezo piblik ou pa fè konfyans.",
        "Pa kite foto dokiman rete san pwoteksyon nan galri yon aparèy lòt moun ka itilize."
      ]
    },
    {
      id: "report",
      title: "9. Rapòte yon pwoblèm",
      paragraphs: [
        `Si yon moun sèvi ak non Vwayaj Ayisyen pou twonpe ou, sove prèv la san pataje li piblikman epi ekri ${LEGAL_ENTITY.email.support}.`,
        "Si gen vòl lajan, menas oswa vòl idantite, kontakte sèvis lokal ki responsab la tou."
      ]
    },
    {
      id: "emergency",
      title: "10. Lè gen yon ijans",
      paragraphs: [
        "Vwayaj Ayisyen pa yon sèvis ijans. Si lavi, sante oswa sekirite yon moun an danje, kontakte sèvis ijans oswa otorite lokal kote moun nan ye a.",
        "Pa tann yon repons sou sit la oswa WhatsApp pou yon sitiyasyon ijan."
      ]
    }
  ]
};

const haitianPayments: LegalDocumentContent = {
  ...sharedHaitian,
  title: "Peman",
  summary: "Règ sa yo esplike sa pou verifye anvan, pandan ak apre yon peman pou yon sèvis.",
  version: LEGAL_VERSIONS.payments,
  sections: [
    {
      id: "current-status",
      title: "1. Sitiyasyon peman sou sit la",
      paragraphs: [
        "Vwayaj Ayisyen pa resevwa ni trete peman dirèkteman sou sit la kounye a. Yon ekran ki mande kat oswa transfè sou sit la pa dwe konsidere kòm aktif san yon avi klè nan men nou.",
        "Nou pa vann tikè avyon, rezèvasyon vwayaj, viza oswa randevou gouvènman."
      ]
    },
    {
      id: "service-scope",
      title: "2. Sa yon sèvis peye dwe esplike",
      paragraphs: [
        "Anvan nenpòt peman, kliyan an dwe wè non sèvis la, sa li gen ladan l, sa li pa gen ladan l, pri a ak etap ki vin apre yo.",
        "Pa peye sou baz yon pwomès oral ki pa koresponn ak deskripsyon sèvis la."
      ]
    },
    {
      id: "government-fees",
      title: "3. Frè gouvènman ak frè sèvis",
      paragraphs: [
        "Yon frè konsila, anbasad oswa lòt otorite separe ak nenpòt frè asistans Vwayaj Ayisyen. Chak peman dwe idantifye kiyès k ap resevwa li ak rezon li.",
        "Pri ak metòd peman yon otorite ka chanje; verifye yo sou paj otorite a anvan ou peye."
      ]
    },
    {
      id: "authorized-methods",
      title: "4. Metòd peman ki otorize",
      paragraphs: [
        "Si peman aktive, sèvi sèlman ak metòd ki parèt nan òf oswa fakti ofisyèl la. Pa transfere lajan sou yon kont yon moun voye nan yon mesaj san verifikasyon.",
        "Non moun oswa antite k ap resevwa lajan an dwe koresponn ak enstriksyon peman an."
      ]
    },
    {
      id: "receipts",
      title: "5. Resi ak prèv peman",
      paragraphs: [
        "Kenbe fakti, resi, dat, kantite lajan ak referans tranzaksyon an. Pa pibliye prèv ki montre done bankè oswa enfòmasyon pèsonèl ou.",
        "Yon resi dwe idantifye sèvis ou te peye a; li pa yon prèv ke yon viza ap apwouve."
      ]
    },
    {
      id: "no-guarantee",
      title: "6. Peman pa garanti rezilta",
      paragraphs: [
        "Okenn peman pa garanti viza, rezidans, travay, randevou, admisyon, delè oswa yon desizyon favorab.",
        "Se otorite ki responsab la ki analize dosye a epi pran desizyon final la."
      ]
    },
    {
      id: "cancellation-refund",
      title: "7. Anilasyon ak ranbousman",
      paragraphs: [
        "Lè yon sèvis peye aktive, kondisyon anilasyon ak ranbousman ki aplikab yo dwe parèt anvan peman an. Li yo epi poze kestyon si yon pwen pa klè.",
        "Yon frè yon otorite ekstèn resevwa ka suiv pwòp règ ranbousman otorite sa a."
      ]
    },
    {
      id: "disputes",
      title: "8. Erè oswa dezakò sou yon peman",
      paragraphs: [
        `Si ou remake yon erè, pa voye done kat ou pa imèl oswa WhatsApp. Ekri ${LEGAL_ENTITY.email.support} ak referans ki pa sansib la.`,
        "Pa fè menm peman an plizyè fwa pandan w ap tann yon konfimasyon."
      ]
    },
    {
      id: "fraud",
      title: "9. Fo demann peman",
      paragraphs: [
        "Sispann si yon moun mete presyon sou ou, mande yon kòd sekrè oswa pwomèt yon rezilta garanti. Verifye demann lan atravè kontak ki sou sit la.",
        "Vwayaj Ayisyen pap mande modpas bank ou oswa kòd verifikasyon kont finansye ou."
      ]
    },
    {
      id: "updates",
      title: "10. Aktivasyon ak mizajou",
      paragraphs: [
        "N ap mete paj sa a ajou anvan nou aktive peman sou platfòm nan. Nimewo vèsyon ak dat ki anlè a ap montre règ ki an vigè yo.",
        `Pou kestyon sou yon sèvis oswa yon peman, ekri ${LEGAL_ENTITY.email.support}.`
      ]
    }
  ]
};

const haitianPrivacy: LegalDocumentContent = {
  ...sharedHaitian,
  title: "Règleman konfidansyalite",
  summary: "Règleman sa a esplike done nou itilize pou kont, pwofil, sekirite ak kominikasyon.",
  version: LEGAL_VERSIONS.privacy,
  sections: [
    {
      id: "responsible",
      title: "1. Responsab done yo",
      paragraphs: [
        `${LEGAL_ENTITY.name}, nan ${LEGAL_ENTITY.publicAddress}, responsab tretman ki dekri nan règleman sa a.`,
        `Pou yon kestyon oswa demann sou done ou: ${LEGAL_ENTITY.email.legal}.`
      ]
    },
    {
      id: "account-data",
      title: "2. Done kont ak pwofil",
      paragraphs: [
        "Pou konekte, Google voye nou idantifyan kont la, non, imèl verifye ak foto Google ou. Nou pa resevwa ni estoke modpas Google ou.",
        "Nan pwofil la, ou ka ajoute oswa modifye non, foto pwofil, nimewo kontak, peyi kote ou rete, dat nesans ak preferans notifikasyon. Imèl Google la rete sèlman pou lekti sou sit la. Nou kenbe tou lis nouvèl ou chwazi anrejistre yo.",
        "Pa mete paspò, nimewo idantite, dosye migrasyon, done medikal oswa dokiman prive nan foto pwofil la."
      ]
    },
    {
      id: "purpose",
      title: "3. Poukisa nou itilize done yo",
      paragraphs: [
        "Nou itilize done sa yo pou louvri ak pwoteje kont la, montre ak pèsonalize pwofil la, kenbe preferans ak nouvèl anrejistre, reponn sipò ak anpeche abi.",
        "Nou pa vann done pwofil ou. Founisè otantifikasyon, imèl ak lojman ka trete done teknik ki nesesè pou bay ak pwoteje sèvis la."
      ]
    },
    {
      id: "whatsapp",
      title: "4. WhatsApp ak sit ekstèn",
      paragraphs: [
        "Lè ou peze yon bouton WhatsApp, ou kite Vwayaj Ayisyen. Mesaj ki prepare a pa dwe gen non konplè, paspò, estati migratwa oswa lòt done sansib.",
        "Pa voye dokiman pèsonèl sou WhatsApp. WhatsApp ak paj gouvènman yo aplike pwòp règleman yo."
      ]
    },
    {
      id: "rights",
      title: "5. Chwa ak dwa ou",
      paragraphs: [
        "Ou ka mande aksè, koreksyon oswa efasman done kont ou atravè kontak legal la. Nou ka bezwen verifye idantite moun ki fè demann lan san mande plis done pase sa ki nesesè.",
        "N ap mete règleman sa a ajou anvan nou aktive yon fonksyon ki chanje fason nou trete done pèsonèl anpil."
      ]
    }
  ]
};

const haitianCookies: LegalDocumentContent = {
  ...sharedHaitian,
  title: "Cookies ak depo sou telefòn",
  summary:
    "Aplikasyon entènèt la itilize depo ki nesesè pou sesyon, sekirite, onboarding ak preferans aparèy la.",
  version: LEGAL_VERSIONS.cookies,
  sections: [
    {
      id: "necessary",
      title: "1. Cookies ki nesesè",
      paragraphs: [
        "Lè ou konekte ak Google, sèvis koneksyon an ak sit la itilize cookies sekirize ki nesesè pou kenbe sesyon an. Cookies sa yo pa sèvi pou piblisite sou Vwayaj Ayisyen.",
        "Nou itilize depo lokal sèlman pou sonje etap akèy aplikasyon an ak si ou te kontinye kòm envite."
      ]
    },
    {
      id: "device-storage",
      title: "2. Depo sou aparèy la",
      paragraphs: [
        "Nou sonje si ou deja wè splash ak onboarding lan, si ou kontinye kòm envite, epi si envitasyon pou enstale aplikasyon an te parèt.",
        "Navigatè a ka kenbe dosye piblik yo pou aplikasyon an louvri pi vit oswa montre yon paj lè entènèt la koupe."
      ]
    },
    {
      id: "control",
      title: "3. Kontwòl ou",
      paragraphs: [
        "Ou ka efase done sit la nan paramèt navigatè ou oswa dezinstale PWA a. Sa ka dekonekte kont la epi fè onboarding lan parèt ankò.",
        "Paj gouvènman ak WhatsApp ou louvri yo ka itilize pwòp cookies pa yo."
      ]
    }
  ]
};

const legalContent: Record<
  OfficialLegalLocale,
  Partial<Record<PublishedLegalDocument, LegalDocumentContent>>
> = {
  ht: {
    terms: haitianTerms,
    privacy: haitianPrivacy,
    security: haitianSecurity,
    payments: haitianPayments,
    cookies: haitianCookies
  },
  es: { terms: spanishTerms, privacy: spanishPrivacy, cookies: spanishCookies },
  pt: { terms: portugueseTerms, privacy: portuguesePrivacy, cookies: portugueseCookies }
};

export function isPublishedLegalDocument(value: string): value is PublishedLegalDocument {
  return PUBLISHED_LEGAL_DOCUMENTS.some((document) => document === value);
}

export function getOfficialLegalLocale(locale: Locale): OfficialLegalLocale {
  void locale;
  return "ht";
}

export function getLegalDocumentContent(
  document: PublishedLegalDocument,
  locale: Locale,
  version: string = LEGAL_VERSIONS[document]
): LegalDocumentContent | null {
  const content = legalContent[getOfficialLegalLocale(locale)][document];
  return content?.version === version ? content : null;
}
