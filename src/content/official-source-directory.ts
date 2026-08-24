import type { CountryCode, Locale } from "@/types/domain";

export const OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT = "2026-08-24";

export const OFFICIAL_SOURCE_CATEGORIES = [
  "visa",
  "embassy",
  "immigration",
  "identity",
  "work",
  "study",
  "health",
  "protection"
] as const;

export type OfficialSourceCategory = (typeof OFFICIAL_SOURCE_CATEGORIES)[number];

export type OfficialSource = {
  title: string;
  publisher: string;
  url: string;
  category: OfficialSourceCategory;
  purpose: Record<Locale, string>;
};

export type CountrySourceDirectory = {
  country: CountryCode;
  intro: Record<Locale, string>;
  steps: Record<Locale, readonly string[]>;
  sources: readonly OfficialSource[];
};

const usa: CountrySourceDirectory = {
  country: "usa",
  intro: {
    ht: "Verifye sèvis viza pou Ayiti an premye, idantifye kategori ki koresponn ak objektif ou, epi sèvi sèlman ak sit gouvènman ameriken yo.",
    fr: "Vérifiez d’abord la situation des services de visa pour Haïti, identifiez la catégorie adaptée à votre objectif et utilisez uniquement les sites du gouvernement américain.",
    es: "Primero verifica el estado de los servicios de visa para Haití, identifica la categoría adecuada a tu objetivo y utiliza solo sitios del Gobierno de Estados Unidos.",
    pt: "Primeiro verifique a situação dos serviços de visto para o Haiti, identifique a categoria adequada ao seu objetivo e use somente sites do governo dos Estados Unidos.",
    en: "First check the status of visa services for Haiti, identify the category that fits your purpose and use only United States government websites."
  },
  steps: {
    ht: [
      "Tcheke avi pou Ayiti",
      "Chwazi kategori viza a",
      "Swiv dosye a sou sit ofisyèl",
      "Verifye antre ak pwoteksyon"
    ],
    fr: [
      "Consulter l’avis pour Haïti",
      "Choisir la catégorie de visa",
      "Suivre le dossier sur le site officiel",
      "Vérifier l’entrée et la protection"
    ],
    es: [
      "Consultar el aviso para Haití",
      "Elegir la categoría de visa",
      "Seguir el caso en el sitio oficial",
      "Verificar entrada y protección"
    ],
    pt: [
      "Consultar o aviso para o Haiti",
      "Escolher a categoria de visto",
      "Acompanhar o processo no site oficial",
      "Verificar entrada e proteção"
    ],
    en: [
      "Check the Haiti notice",
      "Choose the visa category",
      "Track the case on the official site",
      "Check entry and protection"
    ]
  },
  sources: [
    {
      title: "Visa Information for Nationals of Haiti",
      publisher: "U.S. Department of State",
      url: "https://travel.state.gov/content/travel/en/News/visas-news/visa-information-for-nationals-of-haiti.html",
      category: "visa",
      purpose: {
        ht: "Tcheke dènye avi ofisyèl ki pibliye sou sèvis viza pou moun Ayiti.",
        fr: "Consulter le dernier avis officiel publié sur les services de visa pour les ressortissants haïtiens.",
        es: "Consultar el último aviso oficial publicado sobre servicios de visa para nacionales de Haití.",
        pt: "Consultar o último aviso oficial publicado sobre serviços de visto para cidadãos do Haiti.",
        en: "Check the latest published official notice about visa services for Haitian nationals."
      }
    },
    {
      title: "Directory of Visa Categories",
      publisher: "U.S. Department of State",
      url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html",
      category: "visa",
      purpose: {
        ht: "Konpare kategori viza yo dapre rezon vwayaj ou anvan ou kòmanse yon demann.",
        fr: "Comparer les catégories de visa selon le motif du voyage avant de commencer une demande.",
        es: "Comparar las categorías de visa según el motivo del viaje antes de iniciar una solicitud.",
        pt: "Comparar as categorias de visto conforme o motivo da viagem antes de iniciar um pedido.",
        en: "Compare visa categories by travel purpose before starting an application."
      }
    },
    {
      title: "U.S. Embassy in Haiti",
      publisher: "U.S. Embassy in Haiti",
      url: "https://ht.usembassy.gov/",
      category: "embassy",
      purpose: {
        ht: "Jwenn anons, kontak ak sèvis aktyèl Anbasad Etazini ann Ayiti.",
        fr: "Trouver les annonces, contacts et services actuels de l’ambassade des États-Unis en Haïti.",
        es: "Encontrar avisos, contactos y servicios actuales de la Embajada de Estados Unidos en Haití.",
        pt: "Encontrar avisos, contatos e serviços atuais da Embaixada dos Estados Unidos no Haiti.",
        en: "Find current notices, contacts and services from the U.S. Embassy in Haiti."
      }
    },
    {
      title: "myUSCIS",
      publisher: "U.S. Citizenship and Immigration Services",
      url: "https://my.uscis.gov/",
      category: "immigration",
      purpose: {
        ht: "Ale nan zouti USCIS yo pou eksplore opsyon epi jere pwosesis ki konsène USCIS.",
        fr: "Accéder aux outils de l’USCIS pour explorer les options et gérer les démarches relevant de l’USCIS.",
        es: "Acceder a las herramientas de USCIS para explorar opciones y gestionar trámites de USCIS.",
        pt: "Acessar as ferramentas do USCIS para explorar opções e gerenciar processos do USCIS.",
        en: "Use USCIS tools to explore options and manage USCIS-related processes."
      }
    },
    {
      title: "I-94 and Traveler Compliance",
      publisher: "U.S. Customs and Border Protection",
      url: "https://i94.cbp.dhs.gov/",
      category: "identity",
      purpose: {
        ht: "Jwenn sèvis ofisyèl pou dosye admisyon I-94 ak enfòmasyon sou konfòmite vwayajè.",
        fr: "Accéder au service officiel des dossiers d’admission I-94 et des informations de conformité des voyageurs.",
        es: "Acceder al servicio oficial de registros de admisión I-94 e información de cumplimiento del viajero.",
        pt: "Acessar o serviço oficial de registros de admissão I-94 e informações de conformidade do viajante.",
        en: "Use the official service for I-94 admission records and traveler compliance information."
      }
    },
    {
      title: "Working in the United States",
      publisher: "U.S. Citizenship and Immigration Services",
      url: "https://www.uscis.gov/working-in-the-united-states",
      category: "work",
      purpose: {
        ht: "Konprann kategori ak otorizasyon ofisyèl ki gen rapò ak travay Ozetazini.",
        fr: "Comprendre les catégories et autorisations officielles liées au travail aux États-Unis.",
        es: "Comprender las categorías y autorizaciones oficiales relacionadas con trabajar en Estados Unidos.",
        pt: "Entender as categorias e autorizações oficiais relacionadas ao trabalho nos Estados Unidos.",
        en: "Understand official categories and authorizations related to working in the United States."
      }
    },
    {
      title: "School Search",
      publisher: "Study in the States — U.S. Department of Homeland Security",
      url: "https://studyinthestates.dhs.gov/school-search",
      category: "study",
      purpose: {
        ht: "Chèche lekòl ak pwogram ki sètifye pou resevwa elèv entènasyonal F oswa M.",
        fr: "Rechercher des écoles et programmes certifiés pour accueillir des étudiants internationaux F ou M.",
        es: "Buscar escuelas y programas certificados para recibir estudiantes internacionales F o M.",
        pt: "Buscar escolas e programas certificados para receber estudantes internacionais F ou M.",
        en: "Search for schools and programs certified to enroll F or M international students."
      }
    },
    {
      title: "Find Legal Representation",
      publisher: "U.S. Department of Justice — EOIR",
      url: "https://www.justice.gov/eoir/find-legal-representation",
      category: "protection",
      purpose: {
        ht: "Jwenn lis ofisyèl avoka, sèvis pro bono ak reprezantan ki akredite.",
        fr: "Trouver les listes officielles d’avocats, de services pro bono et de représentants accrédités.",
        es: "Encontrar listas oficiales de abogados, servicios pro bono y representantes acreditados.",
        pt: "Encontrar listas oficiais de advogados, serviços pro bono e representantes credenciados.",
        en: "Find official lists of attorneys, pro bono services and accredited representatives."
      }
    }
  ]
};

const chile: CountrySourceDirectory = {
  country: "chile",
  intro: {
    ht: "Kòmanse nan anbasad la oswa nan sèvis konsilè ofisyèl la, epi itilize SERMIG ak ChileAtiende pou règleman aktyèl sou antre, rezidans ak sèvis piblik.",
    fr: "Commencez par l’ambassade ou le service consulaire officiel, puis utilisez SERMIG et ChileAtiende pour les règles actuelles d’entrée, de résidence et de services publics.",
    es: "Empieza por la embajada o el servicio consular oficial y utiliza SERMIG y ChileAtiende para las reglas actuales de entrada, residencia y servicios públicos.",
    pt: "Comece pela embaixada ou pelo serviço consular oficial e use o SERMIG e o ChileAtiende para as regras atuais de entrada, residência e serviços públicos.",
    en: "Start with the embassy or official consular service, then use SERMIG and ChileAtiende for current entry, residence and public-service rules."
  },
  steps: {
    ht: [
      "Konfime viza oswa otorizasyon",
      "Idantifye kalite rezidans lan",
      "Prepare idantite ak etid",
      "Tcheke travay ak sante"
    ],
    fr: [
      "Confirmer le visa ou l’autorisation",
      "Identifier le type de résidence",
      "Préparer identité et études",
      "Vérifier travail et santé"
    ],
    es: [
      "Confirmar visa o autorización",
      "Identificar el tipo de residencia",
      "Preparar identidad y estudios",
      "Verificar trabajo y salud"
    ],
    pt: [
      "Confirmar visto ou autorização",
      "Identificar o tipo de residência",
      "Preparar identidade e estudos",
      "Verificar trabalho e saúde"
    ],
    en: [
      "Confirm visa or authorization",
      "Identify the residence type",
      "Prepare identity and study records",
      "Check work and health"
    ]
  },
  sources: [
    {
      title: "Embajada de Chile en Haití",
      publisher: "Ministerio de Relaciones Exteriores de Chile",
      url: "https://www.chile.gob.cl/haiti/",
      category: "embassy",
      purpose: {
        ht: "Jwenn nouvèl, sèvis konsilè ak kontak reprezantasyon Chili ann Ayiti.",
        fr: "Trouver les actualités, services consulaires et contacts de la représentation du Chili en Haïti.",
        es: "Encontrar noticias, servicios consulares y contactos de la representación de Chile en Haití.",
        pt: "Encontrar notícias, serviços consulares e contatos da representação do Chile no Haiti.",
        en: "Find news, consular services and contacts for Chile’s representation in Haiti."
      }
    },
    {
      title: "Autorización previa o visa",
      publisher: "ChileAtiende — Ministerio de Relaciones Exteriores",
      url: "https://www.chileatiende.gob.cl/fichas/115648-autorizacion-previa-o-visa",
      category: "visa",
      purpose: {
        ht: "Verifye pwosedi aktyèl pou mande otorizasyon davans oswa viza, si sa aplikab.",
        fr: "Vérifier la procédure actuelle pour demander une autorisation préalable ou un visa, le cas échéant.",
        es: "Verificar el procedimiento actual para solicitar autorización previa o visa, cuando corresponda.",
        pt: "Verificar o procedimento atual para solicitar autorização prévia ou visto, quando aplicável.",
        en: "Check the current process for requesting prior authorization or a visa when applicable."
      }
    },
    {
      title: "Residencia Temporal",
      publisher: "Servicio Nacional de Migraciones de Chile",
      url: "https://serviciomigraciones.cl/residencia-temporal/",
      category: "immigration",
      purpose: {
        ht: "Konprann kad rezidans tanporè a epi ale nan chanèl ofisyèl pou fè demann lan.",
        fr: "Comprendre le cadre de la résidence temporaire et accéder au canal officiel de demande.",
        es: "Entender el marco de residencia temporal y acceder al canal oficial para solicitarla.",
        pt: "Entender o regime de residência temporária e acessar o canal oficial de solicitação.",
        en: "Understand the temporary residence framework and access the official application channel."
      }
    },
    {
      title: "Subcategorías de Residencia Temporal",
      publisher: "Servicio Nacional de Migraciones de Chile",
      url: "https://serviciomigraciones.cl/residencia-temporal/subcategorias/",
      category: "immigration",
      purpose: {
        ht: "Konpare soukategori rezidans yo pou w jwenn sa ki mache ak sitiyasyon pa w la.",
        fr: "Comparer les sous-catégories de résidence afin d’identifier celle qui correspond à votre situation.",
        es: "Comparar subcategorías de residencia para identificar la que corresponde a tu situación.",
        pt: "Comparar subcategorias de residência para identificar a que corresponde à sua situação.",
        en: "Compare residence subcategories to identify the one that matches your situation."
      }
    },
    {
      title: "Cédula de identidad para extranjeros",
      publisher: "ChileAtiende — Servicio de Registro Civil e Identificación",
      url: "https://www.chileatiende.gob.cl/fichas/3337-cedula-de-identidad-para-extranjeros-obtencion-y-renovacion",
      category: "identity",
      purpose: {
        ht: "Tcheke kijan pou jwenn oswa renouvle kat idantite pou etranje apre pèmi ki koresponn lan.",
        fr: "Vérifier comment obtenir ou renouveler la carte d’identité pour étrangers après le permis correspondant.",
        es: "Consultar cómo obtener o renovar la cédula de identidad para extranjeros tras el permiso correspondiente.",
        pt: "Consultar como obter ou renovar a carteira de identidade para estrangeiros após a permissão correspondente.",
        en: "Check how to obtain or renew a foreign resident identity card after the relevant permit."
      }
    },
    {
      title: "Preguntas frecuentes de Migraciones",
      publisher: "Servicio Nacional de Migraciones de Chile",
      url: "https://serviciomigraciones.cl/preguntas-frecuentes/",
      category: "work",
      purpose: {
        ht: "Verifye repons aktyèl sou antre, rezidans, travay ak etap demann migratwa yo.",
        fr: "Vérifier les réponses actuelles sur l’entrée, la résidence, le travail et les étapes des démarches migratoires.",
        es: "Consultar respuestas actuales sobre entrada, residencia, trabajo y etapas de los trámites migratorios.",
        pt: "Consultar respostas atuais sobre entrada, residência, trabalho e etapas dos processos migratórios.",
        en: "Check current answers about entry, residence, work and immigration process stages."
      }
    },
    {
      title: "Reconocimiento y convalidación de estudios",
      publisher: "Ayuda Mineduc — Ministerio de Educación de Chile",
      url: "https://www.ayudamineduc.cl/ficha/reconocimiento-y-convalidacion-de-estudios-basicos-y-medios-no-profesionales-realizados-en-el",
      category: "study",
      purpose: {
        ht: "Prepare rekonesans etid debaz oswa segondè ou te fè aletranje.",
        fr: "Préparer la reconnaissance des études primaires ou secondaires effectuées à l’étranger.",
        es: "Preparar el reconocimiento de estudios básicos o medios realizados en el extranjero.",
        pt: "Preparar o reconhecimento de estudos básicos ou médios realizados no exterior.",
        en: "Prepare recognition of primary or secondary studies completed abroad."
      }
    },
    {
      title: "Afiliación a Fonasa",
      publisher: "ChileAtiende — Fondo Nacional de Salud",
      url: "https://www.chileatiende.gob.cl/fichas/9715-afiliacion-a-fonasa",
      category: "health",
      purpose: {
        ht: "Tcheke kiyès ki ka antre nan sistèm sante piblik la ak chanèl ofisyèl pou afilyasyon.",
        fr: "Vérifier qui peut rejoindre le système public de santé et les canaux officiels d’affiliation.",
        es: "Consultar quién puede incorporarse al sistema público de salud y los canales oficiales de afiliación.",
        pt: "Consultar quem pode ingressar no sistema público de saúde e os canais oficiais de filiação.",
        en: "Check who can join the public health system and the official enrollment channels."
      }
    }
  ]
};

const brazil: CountrySourceDirectory = {
  country: "brazil",
  intro: {
    ht: "Sèvi ak anbasad la ak e-consular pou sèvis ann Ayiti; apre sa, verifye rezidans, dokiman, travay, etid ak sante nan pòtal federal yo.",
    fr: "Utilisez l’ambassade et e-consular pour les services en Haïti, puis vérifiez résidence, documents, travail, études et santé sur les portails fédéraux.",
    es: "Utiliza la embajada y e-consular para servicios en Haití; después verifica residencia, documentos, trabajo, estudios y salud en los portales federales.",
    pt: "Use a embaixada e o e-consular para serviços no Haiti; depois verifique residência, documentos, trabalho, estudos e saúde nos portais federais.",
    en: "Use the embassy and e-consular for services in Haiti, then check residence, documents, work, study and health on federal portals."
  },
  steps: {
    ht: [
      "Kòmanse nan konsila a",
      "Verifye rezidans ak RNM",
      "Prepare CPF ak travay",
      "Tcheke etid ak sante"
    ],
    fr: [
      "Commencer au consulat",
      "Vérifier résidence et RNM",
      "Préparer CPF et travail",
      "Vérifier études et santé"
    ],
    es: [
      "Empezar en el consulado",
      "Verificar residencia y RNM",
      "Preparar CPF y trabajo",
      "Consultar estudios y salud"
    ],
    pt: [
      "Começar no consulado",
      "Verificar residência e RNM",
      "Preparar CPF e trabalho",
      "Consultar estudos e saúde"
    ],
    en: [
      "Start with the consulate",
      "Check residence and RNM",
      "Prepare CPF and work",
      "Check study and health"
    ]
  },
  sources: [
    {
      title: "Embaixada do Brasil em Porto Príncipe",
      publisher: "Ministério das Relações Exteriores do Brasil",
      url: "https://www.gov.br/mre/pt-br/embaixada-porto-principe",
      category: "embassy",
      purpose: {
        ht: "Jwenn paj ofisyèl anbasad la, sèvis konsilè ak avi pou Ayiti.",
        fr: "Trouver le site officiel de l’ambassade, les services consulaires et les avis pour Haïti.",
        es: "Encontrar el sitio oficial de la embajada, servicios consulares y avisos para Haití.",
        pt: "Encontrar o site oficial da embaixada, serviços consulares e avisos para o Haiti.",
        en: "Find the official embassy site, consular services and notices for Haiti."
      }
    },
    {
      title: "e-consular Porto Príncipe",
      publisher: "Embaixada do Brasil em Porto Príncipe",
      url: "https://ec-portoprincipe.itamaraty.gov.br/",
      category: "visa",
      purpose: {
        ht: "Mande sèvis epi pran randevou ofisyèlman; platfòm nan gen enstriksyon an kreyòl tou.",
        fr: "Demander des services et prendre rendez-vous officiellement; la plateforme propose aussi des instructions en créole.",
        es: "Solicitar servicios y reservar atención por el canal oficial; la plataforma también ofrece instrucciones en kreyòl.",
        pt: "Solicitar serviços e agendar atendimento pelo canal oficial; a plataforma também oferece instruções em crioulo haitiano.",
        en: "Request services and book appointments through the official channel; the platform also includes Haitian Creole instructions."
      }
    },
    {
      title: "Serviços de imigração para estrangeiros",
      publisher: "Polícia Federal do Brasil",
      url: "https://www.gov.br/pf/pt-br/assuntos/imigracao/estrangeiro",
      category: "immigration",
      purpose: {
        ht: "Chwazi sèvis federal ki koresponn ak rezidans, enskripsyon oswa dokiman migratwa ou.",
        fr: "Choisir le service fédéral correspondant à votre résidence, enregistrement ou document migratoire.",
        es: "Elegir el servicio federal correspondiente a residencia, registro o documento migratorio.",
        pt: "Escolher o serviço federal correspondente à residência, registro ou documento migratório.",
        en: "Choose the federal service that matches your residence, registration or migration document need."
      }
    },
    {
      title: "Obter Autorização de Residência",
      publisher: "Polícia Federal do Brasil",
      url: "https://www.gov.br/pf/pt-br/assuntos/carta-de-servicos/migracao/obter-autorizacao-de-residencia",
      category: "identity",
      purpose: {
        ht: "Verifye modalite rezidans ak etap ofisyèl ki mennen nan enskripsyon migratwa ak RNM.",
        fr: "Vérifier les modalités de résidence et les étapes officielles menant à l’enregistrement migratoire et au RNM.",
        es: "Consultar modalidades de residencia y pasos oficiales hacia el registro migratorio y el RNM.",
        pt: "Consultar modalidades de residência e etapas oficiais para o registro migratório e o RNM.",
        en: "Check residence pathways and official steps toward migration registration and an RNM."
      }
    },
    {
      title: "Preguntas frecuentes para trabajadores migrantes",
      publisher: "Ministério do Trabalho e Emprego do Brasil",
      url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/proteja/estrangeiro/espanol/perguntas-frecuentes",
      category: "work",
      purpose: {
        ht: "Li gid ofisyèl sou CPF, kat travay dijital ak travay fòmèl; vèsyon an disponib an panyòl.",
        fr: "Lire le guide officiel sur le CPF, la carte de travail numérique et l’emploi formel, disponible en espagnol.",
        es: "Leer la guía oficial sobre CPF, cartera de trabajo digital y empleo formal, disponible en español.",
        pt: "Consultar o guia oficial sobre CPF, carteira de trabalho digital e emprego formal, em espanhol.",
        en: "Read the official guide to CPF, the digital work card and formal employment, available in Spanish."
      }
    },
    {
      title: "Inscrever no CPF",
      publisher: "Receita Federal do Brasil",
      url: "https://www.gov.br/pt-br/servicos/inscrever-no-cpf",
      category: "identity",
      purpose: {
        ht: "Tcheke sèvis ofisyèl pou mande nimewo CPF kòm moun brezilyen oswa etranje.",
        fr: "Consulter le service officiel pour demander un numéro CPF en tant que personne brésilienne ou étrangère.",
        es: "Consultar el servicio oficial para solicitar un CPF como persona brasileña o extranjera.",
        pt: "Consultar o serviço oficial para solicitar CPF como pessoa brasileira ou estrangeira.",
        en: "Use the official service to request a CPF as a Brazilian or foreign national."
      }
    },
    {
      title: "Portal Carolina Bori",
      publisher: "Ministério da Educação do Brasil",
      url: "https://carolinabori.mec.gov.br/",
      category: "study",
      purpose: {
        ht: "Jwenn règ ak chanèl ofisyèl pou revalidasyon oswa rekonesans diplòm etranje.",
        fr: "Trouver les règles et le canal officiel de revalidation ou reconnaissance des diplômes étrangers.",
        es: "Encontrar reglas y el canal oficial para revalidar o reconocer diplomas extranjeros.",
        pt: "Encontrar regras e o canal oficial para revalidar ou reconhecer diplomas estrangeiros.",
        en: "Find rules and the official channel for revalidation or recognition of foreign diplomas."
      }
    },
    {
      title: "Cartão Nacional de Saúde",
      publisher: "Ministério da Saúde do Brasil",
      url: "https://www.gov.br/saude/pt-br/composicao/seidigi/meususdigital/perguntas-e-respostas/cidadao/9-como-faco-o-cartao",
      category: "health",
      purpose: {
        ht: "Verifye kijan pou mande yon nouvo Kat Nasyonal Sante oswa mete done li ajou.",
        fr: "Vérifier comment demander une nouvelle Carte nationale de santé ou mettre ses données à jour.",
        es: "Consultar cómo solicitar una nueva Tarjeta Nacional de Salud o actualizar sus datos.",
        pt: "Consultar como solicitar um novo Cartão Nacional de Saúde ou atualizar seus dados.",
        en: "Check how to request a new National Health Card or update its records."
      }
    }
  ]
};

const mexico: CountrySourceDirectory = {
  country: "mexico",
  intro: {
    ht: "Kòmanse nan Anbasad Meksik ann Ayiti, pran randevou sèlman sou MiConsulado, epi verifye nenpòt etap andedan Meksik dirèkteman ak INM oswa lòt otorite ki responsab la.",
    fr: "Commencez par l’ambassade du Mexique en Haïti, prenez rendez-vous uniquement sur MiConsulado et vérifiez toute démarche au Mexique directement auprès de l’INM ou de l’autorité responsable.",
    es: "Empieza por la Embajada de México en Haití, reserva citas solo en MiConsulado y verifica cualquier trámite dentro de México directamente con el INM o la autoridad responsable.",
    pt: "Comece pela Embaixada do México no Haiti, marque atendimentos somente no MiConsulado e verifique qualquer trâmite no México diretamente com o INM ou a autoridade responsável.",
    en: "Start with the Mexican Embassy in Haiti, book appointments only through MiConsulado and verify any process in Mexico directly with INM or the responsible authority."
  },
  steps: {
    ht: [
      "Chwazi kalite viza a",
      "Pran randevou ofisyèl",
      "Swiv etap INM yo",
      "Prepare idantite ak etid"
    ],
    fr: [
      "Choisir le type de visa",
      "Prendre un rendez-vous officiel",
      "Suivre les étapes de l’INM",
      "Préparer identité et études"
    ],
    es: [
      "Elegir el tipo de visa",
      "Reservar una cita oficial",
      "Seguir los pasos del INM",
      "Preparar identidad y estudios"
    ],
    pt: [
      "Escolher o tipo de visto",
      "Marcar atendimento oficial",
      "Seguir as etapas do INM",
      "Preparar identidade e estudos"
    ],
    en: [
      "Choose the visa type",
      "Book an official appointment",
      "Follow INM steps",
      "Prepare identity and study records"
    ]
  },
  sources: [
    {
      title: "Embajada de México en Haití",
      publisher: "Secretaría de Relaciones Exteriores de México",
      url: "https://embamex.sre.gob.mx/haiti/index.php/es/",
      category: "embassy",
      purpose: {
        ht: "Jwenn avi, kontak ak sèvis aktyèl Anbasad Meksik ann Ayiti.",
        fr: "Trouver les avis, contacts et services actuels de l’ambassade du Mexique en Haïti.",
        es: "Encontrar avisos, contactos y servicios actuales de la Embajada de México en Haití.",
        pt: "Encontrar avisos, contatos e serviços atuais da Embaixada do México no Haiti.",
        en: "Find current notices, contacts and services from the Mexican Embassy in Haiti."
      }
    },
    {
      title: "Visas y legalizaciones",
      publisher: "Embajada de México en Haití",
      url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol",
      category: "visa",
      purpose: {
        ht: "Tcheke avi konsilè aktyèl, disponiblite randevou ak chanèl otorize pou viza.",
        fr: "Vérifier les avis consulaires actuels, la disponibilité des rendez-vous et les canaux autorisés pour les visas.",
        es: "Consultar avisos consulares actuales, disponibilidad de citas y canales autorizados para visas.",
        pt: "Consultar avisos consulares atuais, disponibilidade de atendimentos e canais autorizados para vistos.",
        en: "Check current consular notices, appointment availability and authorized visa channels."
      }
    },
    {
      title: "Visa de visitante",
      publisher: "Embajada de México en Haití",
      url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/visavisitante",
      category: "visa",
      purpose: {
        ht: "Verifye enfòmasyon aktyèl pou yon vizit san aktivite ki peye nan Meksik.",
        fr: "Vérifier les informations actuelles pour une visite sans activité rémunérée au Mexique.",
        es: "Consultar la información actual para una visita sin actividades remuneradas en México.",
        pt: "Consultar as informações atuais para uma visita sem atividades remuneradas no México.",
        en: "Check current information for a visit without paid activities in Mexico."
      }
    },
    {
      title: "Visa con autorización del INM (NUT)",
      publisher: "Embajada de México en Haití",
      url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/nutespanol",
      category: "work",
      purpose: {
        ht: "Tcheke pwosedi konsilè lè INM deja bay yon Nimewo Inik Pwosedi pou ka a.",
        fr: "Vérifier la procédure consulaire lorsqu’un numéro unique de démarche a déjà été délivré par l’INM.",
        es: "Consultar el procedimiento consular cuando el INM ya emitió un Número Único de Trámite.",
        pt: "Consultar o procedimento consular quando o INM já emitiu um Número Único de Trâmite.",
        en: "Check the consular process when INM has already issued a unique procedure number."
      }
    },
    {
      title: "MiConsulado — Citas",
      publisher: "Secretaría de Relaciones Exteriores de México",
      url: "https://citas.sre.gob.mx/",
      category: "embassy",
      purpose: {
        ht: "Sèvi ak platfòm randevou Anbasad la endike; randevou yo fèt endividyèlman.",
        fr: "Utiliser la plateforme de rendez-vous indiquée par l’ambassade; les rendez-vous sont individuels.",
        es: "Utilizar la plataforma de citas indicada por la embajada; las citas son individuales.",
        pt: "Usar a plataforma de agendamentos indicada pela embaixada; os atendimentos são individuais.",
        en: "Use the appointment platform identified by the embassy; appointments are individual."
      }
    },
    {
      title: "Micrositio de Trámites Migratorios",
      publisher: "Instituto Nacional de Migración de México",
      url: "https://www.inm.gob.mx/mpublic/publico/inm-tramites.html",
      category: "immigration",
      purpose: {
        ht: "Jwenn pwosedi, kondisyon, biwo ak chanèl randevou INM pou etap andedan Meksik.",
        fr: "Trouver les démarches, conditions, bureaux et canaux de rendez-vous de l’INM pour les étapes au Mexique.",
        es: "Encontrar trámites, requisitos, oficinas y canales de cita del INM para procesos dentro de México.",
        pt: "Encontrar processos, requisitos, escritórios e canais de agendamento do INM para etapas no México.",
        en: "Find INM processes, requirements, offices and appointment channels for steps inside Mexico."
      }
    },
    {
      title: "CURP Temporal para Extranjeros",
      publisher: "Registro Nacional de Población de México",
      url: "https://www.gob.mx/segob%7Crenapo/acciones-y-programas/preguntas-frecuentes-sobre-la-clave-unica-de-registro-de-poblacion-temporal-para-extranjeros",
      category: "identity",
      purpose: {
        ht: "Konprann kilè yon moun etranje ka resevwa yon CURP tanporè pandan pwosedi ki aplikab la.",
        fr: "Comprendre quand une personne étrangère peut recevoir une CURP temporaire pendant la démarche applicable.",
        es: "Entender cuándo una persona extranjera puede recibir una CURP temporal durante el procedimiento aplicable.",
        pt: "Entender quando uma pessoa estrangeira pode receber uma CURP temporária durante o processo aplicável.",
        en: "Understand when a foreign national may receive a temporary CURP during the applicable process."
      }
    },
    {
      title: "Sistema de Equivalencia y Revalidación de Estudios",
      publisher: "Secretaría de Educación Pública de México",
      url: "https://sere.sep.gob.mx/",
      category: "study",
      purpose: {
        ht: "Ale nan sistèm ofisyèl pou ekivalans oswa revalidasyon etid ki fèt aletranje.",
        fr: "Accéder au système officiel d’équivalence ou de revalidation des études effectuées à l’étranger.",
        es: "Acceder al sistema oficial de equivalencia o revalidación de estudios realizados en el extranjero.",
        pt: "Acessar o sistema oficial de equivalência ou revalidação de estudos realizados no exterior.",
        en: "Access the official system for equivalency or revalidation of studies completed abroad."
      }
    }
  ]
};

export const COUNTRY_SOURCE_DIRECTORIES = {
  usa,
  chile,
  brazil,
  mexico
} satisfies Record<CountryCode, CountrySourceDirectory>;

export const OFFICIAL_SOURCE_COUNT = Object.values(COUNTRY_SOURCE_DIRECTORIES).reduce(
  (total, directory) => total + directory.sources.length,
  0
);

export const sourceCategoryLabels = {
  ht: {
    visa: "Viza ak antre",
    embassy: "Anbasad ak konsila",
    immigration: "Rezidans ak imigrasyon",
    identity: "Idantite ak dokiman",
    work: "Travay",
    study: "Etid",
    health: "Sante",
    protection: "Pwoteksyon"
  },
  fr: {
    visa: "Visa et entrée",
    embassy: "Ambassade et consulat",
    immigration: "Résidence et immigration",
    identity: "Identité et documents",
    work: "Travail",
    study: "Études",
    health: "Santé",
    protection: "Protection"
  },
  es: {
    visa: "Visa y entrada",
    embassy: "Embajada y consulado",
    immigration: "Residencia e inmigración",
    identity: "Identidad y documentos",
    work: "Trabajo",
    study: "Estudios",
    health: "Salud",
    protection: "Protección"
  },
  pt: {
    visa: "Visto e entrada",
    embassy: "Embaixada e consulado",
    immigration: "Residência e imigração",
    identity: "Identidade e documentos",
    work: "Trabalho",
    study: "Estudos",
    health: "Saúde",
    protection: "Proteção"
  },
  en: {
    visa: "Visa and entry",
    embassy: "Embassy and consulate",
    immigration: "Residence and immigration",
    identity: "Identity and documents",
    work: "Work",
    study: "Study",
    health: "Health",
    protection: "Protection"
  }
} satisfies Record<Locale, Record<OfficialSourceCategory, string>>;

export const officialDirectoryCopy = {
  ht: {
    kicker: "Sous gouvènman verifye",
    title: "Tout lyen enpòtan yo, nan yon sèl kote",
    body: "Chak lyen mennen dirèkteman nan otorite ki responsab la. Tcheke paj ofisyèl la ankò anvan ou aplike, peye oswa vwayaje.",
    checked: "Dènye verifikasyon",
    open: "Louvri sous ofisyèl",
    pathTitle: "Chemen pou kòmanse",
    safetyTitle: "Pwoteje tèt ou",
    safetyBody:
      "Pa achte randevou epi pa voye dokiman pèsonèl bay moun ki pa nan yon chanèl ofisyèl."
  },
  fr: {
    kicker: "Sources gouvernementales vérifiées",
    title: "Tous les liens importants, au même endroit",
    body: "Chaque lien mène directement à l’autorité responsable. Vérifiez à nouveau la page officielle avant de demander, payer ou voyager.",
    checked: "Dernière vérification",
    open: "Ouvrir la source officielle",
    pathTitle: "Par où commencer",
    safetyTitle: "Protégez-vous",
    safetyBody:
      "N’achetez pas de rendez-vous et n’envoyez pas de documents personnels en dehors d’un canal officiel."
  },
  es: {
    kicker: "Fuentes gubernamentales verificadas",
    title: "Todos los enlaces importantes, en un solo lugar",
    body: "Cada enlace lleva directamente a la autoridad responsable. Vuelve a revisar la página oficial antes de solicitar, pagar o viajar.",
    checked: "Última verificación",
    open: "Abrir fuente oficial",
    pathTitle: "Por dónde empezar",
    safetyTitle: "Protégete",
    safetyBody: "No compres citas ni envíes documentos personales fuera de un canal oficial."
  },
  pt: {
    kicker: "Fontes governamentais verificadas",
    title: "Todos os links importantes, em um só lugar",
    body: "Cada link leva diretamente à autoridade responsável. Verifique novamente a página oficial antes de solicitar, pagar ou viajar.",
    checked: "Última verificação",
    open: "Abrir fonte oficial",
    pathTitle: "Por onde começar",
    safetyTitle: "Proteja-se",
    safetyBody: "Não compre agendamentos nem envie documentos pessoais fora de um canal oficial."
  },
  en: {
    kicker: "Verified government sources",
    title: "Every important link, in one place",
    body: "Each link goes directly to the responsible authority. Check the official page again before applying, paying or traveling.",
    checked: "Last checked",
    open: "Open official source",
    pathTitle: "Where to start",
    safetyTitle: "Protect yourself",
    safetyBody: "Do not buy appointments or send personal documents outside an official channel."
  }
} satisfies Record<
  Locale,
  {
    kicker: string;
    title: string;
    body: string;
    checked: string;
    open: string;
    pathTitle: string;
    safetyTitle: string;
    safetyBody: string;
  }
>;
