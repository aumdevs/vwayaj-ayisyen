import type { Locale } from "@/types/domain";

type PublicCopy = {
  navigation: {
    countries: string;
    about: string;
    faq: string;
    contact: string;
    search: string;
    main: string;
    menu: string;
    close: string;
  };
  home: {
    kicker: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    sources: string;
    countries: string;
    languages: string;
    reviewed: string;
    destinationsKicker: string;
    destinationsTitle: string;
    destinationsBody: string;
    explore: string;
    methodKicker: string;
    methodTitle: string;
    methodBody: string;
    methodItems: readonly { title: string; body: string }[];
    finalTitle: string;
    finalBody: string;
  };
  countries: {
    kicker: string;
    title: string;
    body: string;
    cardTags: readonly [string, string, string];
  };
  country: {
    kicker: string;
    introLabel: string;
    allCountries: string;
    sourcesLabel: string;
    verifiedLabel: string;
  };
  footer: {
    promise: string;
    destinations: string;
    resources: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    top: string;
    notice: string;
  };
};

export const publicCopy = {
  ht: {
    navigation: {
      countries: "Peyi yo",
      about: "Sou nou",
      faq: "Kesyon",
      contact: "Kontak",
      search: "Chèche",
      main: "Navigasyon prensipal",
      menu: "Louvri meni",
      close: "Fèmen"
    },
    home: {
      kicker: "Enfòmasyon klè pou desizyon serye",
      title: "Soti Ayiti ak yon plan ki klè.",
      body: "Chwazi Etazini, Chili, Brezil oswa Meksik epi konprann sa ki posib an 2026: kijan pou antre legalman, ki papye pou prepare, kote pou travay oswa etidye, ak sa pou fè apre ou rive.",
      primary: "Chwazi yon peyi",
      secondary: "Gade tout sous yo",
      sources: "sous ofisyèl",
      countries: "peyi",
      languages: "lang",
      reviewed: "verifye",
      destinationsKicker: "Kat destinasyon · Yon sèl estanda",
      destinationsTitle: "Kòmanse kote plan ou mennen w.",
      destinationsBody:
        "Chak peyi gen yon repons klè sou antre, fanmi, travay, etid, dokiman, pwoteksyon ak risk wout iregilye yo.",
      explore: "Louvri gid la",
      methodKicker: "Fè bon etap la an premye",
      methodTitle: "Repons klè anvan ou depanse lajan.",
      methodBody:
        "Gid la esplike reyalite 2026 la nan lang senp, montre ki etap pou fè epi mennen w nan paj ofisyèl ki konfime chak pwen.",
      methodItems: [
        {
          title: "Verifye si li posib kounye a",
          body: "Konnen si chemen an ouvè, limite oswa fini anvan ou peye pou yon dosye oswa tikè."
        },
        {
          title: "Prepare depi Ayiti",
          body: "Mete paspò, batistè, dosye penal, kontra, admisyon oswa prèv fanmi yo nan bon lòd la."
        },
        {
          title: "Konnen kijan pou viv apre",
          body: "Jwenn kat idantite, travay, etid, sante ak pwoteksyon san konfonn yon vizit ak rezidans."
        }
      ],
      finalTitle: "Pa kite rimè chwazi wout ou.",
      finalBody: "Chwazi peyi a, li reyalite 2026 la epi prepare chak etap anvan ou kite Ayiti."
    },
    countries: {
      kicker: "Gid pa peyi",
      title: "Ki kote ou vle kòmanse?",
      body: "Eksplore kat gid konplè pou antre, viv, travay oswa etidye — ak yon repons onèt sou sa ki posib an 2026.",
      cardTags: ["Viza", "Rezidans", "Lavi pratik"]
    },
    country: {
      kicker: "Gid pratik 2026",
      introLabel: "Sa pou w konnen an premye",
      allCountries: "Tout peyi yo",
      sourcesLabel: "sous ofisyèl",
      verifiedLabel: "Lyen verifye"
    },
    footer: {
      promise: "Gid pratik, lang klè ak sous ofisyèl pou kominote ayisyèn nan.",
      destinations: "Destinasyon",
      resources: "Resous",
      legal: "Legal",
      privacy: "Konfidansyalite",
      terms: "Kondisyon",
      cookies: "Cookies",
      top: "Retounen anlè",
      notice: "Verifye kondisyon aktyèl yo dirèkteman ak otorite ki responsab la."
    }
  },
  fr: {
    navigation: {
      countries: "Pays",
      about: "À propos",
      faq: "Questions",
      contact: "Contact",
      search: "Rechercher",
      main: "Navigation principale",
      menu: "Ouvrir le menu",
      close: "Fermer"
    },
    home: {
      kicker: "Des informations claires pour des décisions sérieuses",
      title: "Quittez Haïti avec un projet clair.",
      body: "Choisissez les États-Unis, le Chili, le Brésil ou le Mexique et comprenez ce qui est possible en 2026: entrée légale, documents, travail, études et premières démarches après l’arrivée.",
      primary: "Choisir un pays",
      secondary: "Voir toutes les sources",
      sources: "sources officielles",
      countries: "pays",
      languages: "langues",
      reviewed: "vérifiés",
      destinationsKicker: "Quatre destinations · Un seul standard",
      destinationsTitle: "Commencez là où votre projet vous mène.",
      destinationsBody:
        "Chaque pays donne une réponse claire sur entrée, famille, travail, études, documents, protection et risques des routes irrégulières.",
      explore: "Ouvrir le guide",
      methodKicker: "Faire le bon premier pas",
      methodTitle: "Des réponses claires avant de dépenser.",
      methodBody:
        "Le guide explique la réalité de 2026 en langage simple, indique les étapes et relie chaque point à la page officielle qui le confirme.",
      methodItems: [
        {
          title: "Vérifier si c’est possible maintenant",
          body: "Sachez si la voie est ouverte, limitée ou terminée avant de payer un dossier ou un billet."
        },
        {
          title: "Préparer depuis Haïti",
          body: "Mettez passeport, actes civils, casier, contrat, admission ou preuves familiales dans le bon ordre."
        },
        {
          title: "Savoir vivre après l’arrivée",
          body: "Trouvez identité, travail, études, santé et protection sans confondre visite et résidence."
        }
      ],
      finalTitle: "Ne laissez pas les rumeurs choisir votre route.",
      finalBody:
        "Choisissez le pays, lisez la réalité de 2026 et préparez chaque étape avant de quitter Haïti."
    },
    countries: {
      kicker: "Guides par pays",
      title: "Où voulez-vous commencer?",
      body: "Explorez quatre guides complets pour entrer, vivre, travailler ou étudier, avec une réponse honnête sur 2026.",
      cardTags: ["Visa", "Résidence", "Vie pratique"]
    },
    country: {
      kicker: "Guide pratique 2026",
      introLabel: "À savoir en premier",
      allCountries: "Tous les pays",
      sourcesLabel: "sources officielles",
      verifiedLabel: "Liens vérifiés"
    },
    footer: {
      promise:
        "Des guides pratiques, un langage clair et des sources officielles pour la communauté haïtienne.",
      destinations: "Destinations",
      resources: "Ressources",
      legal: "Juridique",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Cookies",
      top: "Retour en haut",
      notice: "Vérifiez les conditions actuelles directement auprès de l’autorité responsable."
    }
  },
  es: {
    navigation: {
      countries: "Países",
      about: "Nosotros",
      faq: "Preguntas",
      contact: "Contacto",
      search: "Buscar",
      main: "Navegación principal",
      menu: "Abrir menú",
      close: "Cerrar"
    },
    home: {
      kicker: "Información clara para decisiones serias",
      title: "Sal de Haití con un plan claro.",
      body: "Elige Estados Unidos, Chile, Brasil o México y entiende qué es posible en 2026: entrada legal, documentos, trabajo, estudios y primeros pasos después de llegar.",
      primary: "Elegir un país",
      secondary: "Ver todas las fuentes",
      sources: "fuentes oficiales",
      countries: "países",
      languages: "idiomas",
      reviewed: "verificadas",
      destinationsKicker: "Cuatro destinos · Un solo estándar",
      destinationsTitle: "Empieza donde te lleva tu plan.",
      destinationsBody:
        "Cada país responde con claridad sobre entrada, familia, trabajo, estudios, documentos, protección y riesgos de las rutas irregulares.",
      explore: "Abrir guía",
      methodKicker: "Dar primero el paso correcto",
      methodTitle: "Respuestas claras antes de gastar dinero.",
      methodBody:
        "La guía explica la realidad de 2026 en lenguaje sencillo, muestra los pasos y enlaza cada punto con la página oficial que lo confirma.",
      methodItems: [
        {
          title: "Comprueba si es posible ahora",
          body: "Sabe si la vía está abierta, limitada o terminada antes de pagar un trámite o pasaje."
        },
        {
          title: "Prepárate desde Haití",
          body: "Ordena pasaporte, actas, antecedentes, contrato, admisión o pruebas familiares."
        },
        {
          title: "Entiende la vida después de llegar",
          body: "Encuentra identidad, trabajo, estudios, salud y protección sin confundir visita con residencia."
        }
      ],
      finalTitle: "No dejes que los rumores elijan tu ruta.",
      finalBody:
        "Elige el país, lee la realidad de 2026 y prepara cada paso antes de salir de Haití."
    },
    countries: {
      kicker: "Guías por país",
      title: "¿Dónde quieres empezar?",
      body: "Explora cuatro guías completas para entrar, vivir, trabajar o estudiar, con una respuesta honesta sobre 2026.",
      cardTags: ["Visa", "Residencia", "Vida práctica"]
    },
    country: {
      kicker: "Guía práctica 2026",
      introLabel: "Lo primero que debes saber",
      allCountries: "Todos los países",
      sourcesLabel: "fuentes oficiales",
      verifiedLabel: "Enlaces verificados"
    },
    footer: {
      promise: "Guías prácticas, lenguaje claro y fuentes oficiales para la comunidad haitiana.",
      destinations: "Destinos",
      resources: "Recursos",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Condiciones",
      cookies: "Cookies",
      top: "Volver arriba",
      notice: "Verifica las condiciones actuales directamente con la autoridad responsable."
    }
  },
  pt: {
    navigation: {
      countries: "Países",
      about: "Sobre",
      faq: "Perguntas",
      contact: "Contato",
      search: "Buscar",
      main: "Navegação principal",
      menu: "Abrir menu",
      close: "Fechar"
    },
    home: {
      kicker: "Informação clara para decisões sérias",
      title: "Saia do Haiti com um plano claro.",
      body: "Escolha Estados Unidos, Chile, Brasil ou México e entenda o que é possível em 2026: entrada legal, documentos, trabalho, estudo e primeiros passos após a chegada.",
      primary: "Escolher um país",
      secondary: "Ver todas as fontes",
      sources: "fontes oficiais",
      countries: "países",
      languages: "idiomas",
      reviewed: "verificadas",
      destinationsKicker: "Quatro destinos · Um só padrão",
      destinationsTitle: "Comece onde o seu plano leva você.",
      destinationsBody:
        "Cada país responde claramente sobre entrada, família, trabalho, estudo, documentos, proteção e riscos das rotas irregulares.",
      explore: "Abrir guia",
      methodKicker: "Dar primeiro o passo certo",
      methodTitle: "Respostas claras antes de gastar dinheiro.",
      methodBody:
        "O guia explica a realidade de 2026 em linguagem simples, mostra os passos e liga cada ponto à página oficial que o confirma.",
      methodItems: [
        {
          title: "Confira se é possível agora",
          body: "Saiba se a via está aberta, limitada ou encerrada antes de pagar processo ou passagem."
        },
        {
          title: "Prepare-se no Haiti",
          body: "Organize passaporte, certidões, antecedentes, contrato, admissão ou provas familiares."
        },
        {
          title: "Entenda a vida após a chegada",
          body: "Encontre identidade, trabalho, estudo, saúde e proteção sem confundir visita com residência."
        }
      ],
      finalTitle: "Não deixe boatos escolherem sua rota.",
      finalBody:
        "Escolha o país, leia a realidade de 2026 e prepare cada passo antes de sair do Haiti."
    },
    countries: {
      kicker: "Guias por país",
      title: "Por onde você quer começar?",
      body: "Explore quatro guias completos para entrar, viver, trabalhar ou estudar, com uma resposta honesta sobre 2026.",
      cardTags: ["Visto", "Residência", "Vida prática"]
    },
    country: {
      kicker: "Guia prático 2026",
      introLabel: "O que saber primeiro",
      allCountries: "Todos os países",
      sourcesLabel: "fontes oficiais",
      verifiedLabel: "Links verificados"
    },
    footer: {
      promise: "Guias práticos, linguagem clara e fontes oficiais para a comunidade haitiana.",
      destinations: "Destinos",
      resources: "Recursos",
      legal: "Legal",
      privacy: "Privacidade",
      terms: "Condições",
      cookies: "Cookies",
      top: "Voltar ao topo",
      notice: "Verifique as condições atuais diretamente com a autoridade responsável."
    }
  },
  en: {
    navigation: {
      countries: "Countries",
      about: "About",
      faq: "Questions",
      contact: "Contact",
      search: "Search",
      main: "Main navigation",
      menu: "Open menu",
      close: "Close"
    },
    home: {
      kicker: "Clear information for serious decisions",
      title: "Leave Haiti with a clear plan.",
      body: "Choose the United States, Chile, Brazil or Mexico and understand what is possible in 2026: lawful entry, documents, work, study and first steps after arrival.",
      primary: "Choose a country",
      secondary: "See every source",
      sources: "official sources",
      countries: "countries",
      languages: "languages",
      reviewed: "verified",
      destinationsKicker: "Four destinations · One standard",
      destinationsTitle: "Start where your plan is taking you.",
      destinationsBody:
        "Each country clearly answers questions about entry, family, work, study, documents, protection and irregular-route risks.",
      explore: "Open guide",
      methodKicker: "Take the right first step",
      methodTitle: "Clear answers before spending money.",
      methodBody:
        "The guide explains the 2026 reality in plain language, shows the steps and links every point to the official page that confirms it.",
      methodItems: [
        {
          title: "Check whether it is possible now",
          body: "Know whether the route is open, limited or ended before paying for a process or ticket."
        },
        {
          title: "Prepare from Haiti",
          body: "Put the passport, civil records, criminal record, contract, admission or family proof in order."
        },
        {
          title: "Understand life after arrival",
          body: "Find identity, work, study, health and protection without confusing a visit with residence."
        }
      ],
      finalTitle: "Do not let rumors choose your route.",
      finalBody:
        "Choose the country, read the 2026 reality and prepare every step before leaving Haiti."
    },
    countries: {
      kicker: "Country guides",
      title: "Where do you want to start?",
      body: "Explore four complete guides for entry, living, work or study, with an honest answer about 2026.",
      cardTags: ["Visa", "Residence", "Daily life"]
    },
    country: {
      kicker: "Practical 2026 guide",
      introLabel: "What to know first",
      allCountries: "All countries",
      sourcesLabel: "official sources",
      verifiedLabel: "Links verified"
    },
    footer: {
      promise: "Practical guides, plain language and official sources for the Haitian community.",
      destinations: "Destinations",
      resources: "Resources",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      top: "Back to top",
      notice: "Check current conditions directly with the responsible authority."
    }
  }
} satisfies Record<Locale, PublicCopy>;
