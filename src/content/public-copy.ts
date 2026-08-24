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
      title: "Vwayaje ak sous ki merite konfyans.",
      body: "Viza, anbasad, rezidans, dokiman, travay, etid ak sante pou Etazini, Chili, Brezil ak Meksik — òganize pou kominote ayisyèn nan.",
      primary: "Chwazi yon peyi",
      secondary: "Gade tout sous yo",
      sources: "sous ofisyèl",
      countries: "peyi",
      languages: "lang",
      reviewed: "verifye",
      destinationsKicker: "Kat destinasyon · Yon sèl estanda",
      destinationsTitle: "Kòmanse kote plan ou mennen w.",
      destinationsBody:
        "Chak gid rasanble otorite ki responsab yo nan lòd ki pi itil pou prepare yon demach.",
      explore: "Louvri gid la",
      methodKicker: "Fè bon etap la an premye",
      methodTitle: "Mwens bri. Plis direksyon.",
      methodBody:
        "Vwayaj Ayisyen pa vann randevou epi li pa fè pwomès. Li ede w rive nan bon sous la pi vit.",
      methodItems: [
        {
          title: "Kòmanse nan konsila a",
          body: "Verifye antre oswa viza nan reprezantan ofisyèl peyi a pou Ayiti."
        },
        {
          title: "Prepare etap apre antre",
          body: "Jwenn rezidans, idantite ak sèvis piblik nan otorite ki responsab yo."
        },
        {
          title: "Tcheke ankò anvan ou aji",
          body: "Règ yo ka chanje. Chak gid montre dat dènye verifikasyon lyen yo."
        }
      ],
      finalTitle: "Yon bon desizyon kòmanse ak bon sous la.",
      finalBody: "Chwazi peyi a, suiv chemen an epi louvri sit gouvènman ki responsab la."
    },
    countries: {
      kicker: "Anyè peyi",
      title: "Ki kote ou vle kòmanse?",
      body: "Eksplore kat gid piblik ki fèt pou mennen w dirèkteman nan enfòmasyon ofisyèl ki pi itil yo.",
      cardTags: ["Viza", "Rezidans", "Lavi pratik"]
    },
    country: {
      kicker: "Gid ofisyèl",
      introLabel: "Sa pou w konnen an premye",
      allCountries: "Tout peyi yo",
      sourcesLabel: "sous ofisyèl",
      verifiedLabel: "Lyen verifye"
    },
    footer: {
      promise: "Sous ofisyèl, òganize ak respè pou kominote ayisyèn nan.",
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
      title: "Voyagez avec des sources dignes de confiance.",
      body: "Visas, ambassades, résidence, documents, travail, études et santé pour les États-Unis, le Chili, le Brésil et le Mexique — organisés pour la communauté haïtienne.",
      primary: "Choisir un pays",
      secondary: "Voir toutes les sources",
      sources: "sources officielles",
      countries: "pays",
      languages: "langues",
      reviewed: "vérifiés",
      destinationsKicker: "Quatre destinations · Un seul standard",
      destinationsTitle: "Commencez là où votre projet vous mène.",
      destinationsBody:
        "Chaque guide rassemble les autorités responsables dans l’ordre le plus utile pour préparer une démarche.",
      explore: "Ouvrir le guide",
      methodKicker: "Faire le bon premier pas",
      methodTitle: "Moins de bruit. Plus de direction.",
      methodBody:
        "Vwayaj Ayisyen ne vend pas de rendez-vous et ne fait pas de promesses. Il vous aide à atteindre plus vite la bonne source.",
      methodItems: [
        {
          title: "Commencer par le consulat",
          body: "Vérifiez l’entrée ou le visa auprès de la représentation officielle du pays pour Haïti."
        },
        {
          title: "Préparer l’après-arrivée",
          body: "Trouvez résidence, identité et services publics auprès des autorités responsables."
        },
        {
          title: "Vérifier avant d’agir",
          body: "Les règles peuvent changer. Chaque guide indique la date de dernière vérification des liens."
        }
      ],
      finalTitle: "Une bonne décision commence par la bonne source.",
      finalBody:
        "Choisissez le pays, suivez le parcours et ouvrez le site de l’autorité responsable."
    },
    countries: {
      kicker: "Répertoire des pays",
      title: "Où voulez-vous commencer?",
      body: "Explorez quatre guides publics qui vous mènent directement aux informations officielles les plus utiles.",
      cardTags: ["Visa", "Résidence", "Vie pratique"]
    },
    country: {
      kicker: "Guide officiel",
      introLabel: "À savoir en premier",
      allCountries: "Tous les pays",
      sourcesLabel: "sources officielles",
      verifiedLabel: "Liens vérifiés"
    },
    footer: {
      promise: "Des sources officielles, organisées avec respect pour la communauté haïtienne.",
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
      title: "Viaja con fuentes que merecen confianza.",
      body: "Visas, embajadas, residencia, documentos, trabajo, estudios y salud para Estados Unidos, Chile, Brasil y México — organizados para la comunidad haitiana.",
      primary: "Elegir un país",
      secondary: "Ver todas las fuentes",
      sources: "fuentes oficiales",
      countries: "países",
      languages: "idiomas",
      reviewed: "verificadas",
      destinationsKicker: "Cuatro destinos · Un solo estándar",
      destinationsTitle: "Empieza donde te lleva tu plan.",
      destinationsBody:
        "Cada guía reúne a las autoridades responsables en el orden más útil para preparar un trámite.",
      explore: "Abrir guía",
      methodKicker: "Dar primero el paso correcto",
      methodTitle: "Menos ruido. Más dirección.",
      methodBody:
        "Vwayaj Ayisyen no vende citas ni hace promesas. Te ayuda a llegar antes a la fuente correcta.",
      methodItems: [
        {
          title: "Empieza por el consulado",
          body: "Verifica entrada o visa con la representación oficial del país para Haití."
        },
        {
          title: "Prepara lo que viene después",
          body: "Encuentra residencia, identidad y servicios públicos en las autoridades responsables."
        },
        {
          title: "Comprueba antes de actuar",
          body: "Las reglas pueden cambiar. Cada guía muestra la fecha de la última revisión de enlaces."
        }
      ],
      finalTitle: "Una buena decisión empieza con la fuente correcta.",
      finalBody: "Elige el país, sigue la ruta y abre el sitio de la autoridad responsable."
    },
    countries: {
      kicker: "Directorio de países",
      title: "¿Dónde quieres empezar?",
      body: "Explora cuatro guías públicas que te llevan directamente a la información oficial más útil.",
      cardTags: ["Visa", "Residencia", "Vida práctica"]
    },
    country: {
      kicker: "Guía oficial",
      introLabel: "Lo primero que debes saber",
      allCountries: "Todos los países",
      sourcesLabel: "fuentes oficiales",
      verifiedLabel: "Enlaces verificados"
    },
    footer: {
      promise: "Fuentes oficiales, organizadas con respeto para la comunidad haitiana.",
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
      title: "Viaje com fontes que merecem confiança.",
      body: "Vistos, embaixadas, residência, documentos, trabalho, estudos e saúde para Estados Unidos, Chile, Brasil e México — organizados para a comunidade haitiana.",
      primary: "Escolher um país",
      secondary: "Ver todas as fontes",
      sources: "fontes oficiais",
      countries: "países",
      languages: "idiomas",
      reviewed: "verificadas",
      destinationsKicker: "Quatro destinos · Um só padrão",
      destinationsTitle: "Comece onde o seu plano leva você.",
      destinationsBody:
        "Cada guia reúne as autoridades responsáveis na ordem mais útil para preparar um processo.",
      explore: "Abrir guia",
      methodKicker: "Dar primeiro o passo certo",
      methodTitle: "Menos ruído. Mais direção.",
      methodBody:
        "Vwayaj Ayisyen não vende agendamentos nem faz promessas. Ajuda você a chegar mais rápido à fonte correta.",
      methodItems: [
        {
          title: "Comece pelo consulado",
          body: "Verifique entrada ou visto com a representação oficial do país para o Haiti."
        },
        {
          title: "Prepare o que vem depois",
          body: "Encontre residência, identidade e serviços públicos nas autoridades responsáveis."
        },
        {
          title: "Confira antes de agir",
          body: "As regras podem mudar. Cada guia mostra a data da última verificação dos links."
        }
      ],
      finalTitle: "Uma boa decisão começa com a fonte certa.",
      finalBody: "Escolha o país, siga o caminho e abra o site da autoridade responsável."
    },
    countries: {
      kicker: "Diretório de países",
      title: "Por onde você quer começar?",
      body: "Explore quatro guias públicos que levam diretamente às informações oficiais mais úteis.",
      cardTags: ["Visto", "Residência", "Vida prática"]
    },
    country: {
      kicker: "Guia oficial",
      introLabel: "O que saber primeiro",
      allCountries: "Todos os países",
      sourcesLabel: "fontes oficiais",
      verifiedLabel: "Links verificados"
    },
    footer: {
      promise: "Fontes oficiais, organizadas com respeito para a comunidade haitiana.",
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
      title: "Travel with sources worth trusting.",
      body: "Visas, embassies, residence, documents, work, study and health for the United States, Chile, Brazil and Mexico — organized for the Haitian community.",
      primary: "Choose a country",
      secondary: "See every source",
      sources: "official sources",
      countries: "countries",
      languages: "languages",
      reviewed: "verified",
      destinationsKicker: "Four destinations · One standard",
      destinationsTitle: "Start where your plan is taking you.",
      destinationsBody:
        "Each guide brings the responsible authorities together in the most useful order for preparing a process.",
      explore: "Open guide",
      methodKicker: "Take the right first step",
      methodTitle: "Less noise. More direction.",
      methodBody:
        "Vwayaj Ayisyen does not sell appointments or make promises. It helps you reach the right source sooner.",
      methodItems: [
        {
          title: "Start with the consulate",
          body: "Check entry or visa information with the country’s official representation for Haiti."
        },
        {
          title: "Prepare for what comes next",
          body: "Find residence, identity and public services through the responsible authorities."
        },
        {
          title: "Check before you act",
          body: "Rules can change. Each guide shows the date its links were last checked."
        }
      ],
      finalTitle: "A good decision starts with the right source.",
      finalBody: "Choose the country, follow the path and open the responsible authority’s website."
    },
    countries: {
      kicker: "Country directory",
      title: "Where do you want to start?",
      body: "Explore four public guides that take you directly to the most useful official information.",
      cardTags: ["Visa", "Residence", "Daily life"]
    },
    country: {
      kicker: "Official guide",
      introLabel: "What to know first",
      allCountries: "All countries",
      sourcesLabel: "official sources",
      verifiedLabel: "Links verified"
    },
    footer: {
      promise: "Official sources, organized with respect for the Haitian community.",
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
