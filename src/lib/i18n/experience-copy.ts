import type { Locale } from "@/types/domain";

type ServiceLevel = {
  name: string;
  audience: string;
  result: string;
  features: readonly [string, string, string];
};

export type ExperienceCopy = {
  menu: string;
  advisor: string;
  explore: string;
  viewAll: string;
  comingSoon: string;
  goals: readonly [string, string, string, string];
  home: {
    kicker: string;
    title: string;
    body: string;
    heroAlt: string;
    primary: string;
    secondary: string;
    destinationsTitle: string;
    destinationsBody: string;
    assessmentTitle: string;
    assessmentBody: string;
    comparisonTitle: string;
    comparisonBody: string;
    realityTitle: string;
    realityBody: string;
    servicesTitle: string;
    servicesBody: string;
    guidesTitle: string;
    guidesBody: string;
    finalTitle: string;
    finalBody: string;
    trust: readonly [
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string }
    ];
  };
  countries: {
    kicker: string;
    title: string;
    body: string;
    goalsTitle: string;
    chooseTitle: string;
    chooseBody: string;
  };
  country: {
    guideKicker: string;
    intro: string;
    quickFacts: readonly [string, string, string];
    coverageTitle: string;
    coverageBody: string;
    pendingTitle: string;
    pendingBody: string;
    nextTitle: string;
    nextBody: string;
    compareAction: string;
  };
  compare: {
    kicker: string;
    title: string;
    body: string;
    waitingTitle: string;
    waitingBody: string;
    criteriaTitle: string;
  };
  assessment: {
    kicker: string;
    title: string;
    body: string;
    pendingTitle: string;
    pendingBody: string;
    questionsTitle: string;
    questions: readonly [string, string, string];
    alternative: string;
  };
  services: {
    kicker: string;
    title: string;
    body: string;
    levels: readonly [ServiceLevel, ServiceLevel, ServiceLevel];
    availability: string;
    howTitle: string;
    steps: readonly [string, string, string];
    limitsTitle: string;
    limits: readonly [string, string, string];
    faqTitle: string;
  };
  guides: {
    kicker: string;
    title: string;
    body: string;
    searchTitle: string;
    categoriesTitle: string;
    pendingTitle: string;
    pendingBody: string;
  };
  auth: {
    kicker: string;
    title: string;
    body: string;
    points: readonly [string, string, string];
    showPassword: string;
    hidePassword: string;
    passwordHelp: string;
    acceptTerms: string;
    backHome: string;
  };
  states: {
    noResultsTitle: string;
    noResultsBody: string;
    unavailableTitle: string;
    unavailableBody: string;
  };
};

const copy = {
  ht: {
    menu: "Meni",
    advisor: "Pale ak yon konseye",
    explore: "Eksplore",
    viewAll: "Wè tout",
    comingSoon: "Byento",
    goals: ["Travay", "Etid", "Fanmi", "Antreprann"],
    home: {
      kicker: "Chwazi ak plis klète",
      title: "Prepare pwochen etap ou, san fo pwomès.",
      body: "Gid pratik, konparezon onèt ak akonpayman pou Etazini, Chili, Brezil ak Meksik.",
      heroAlt: "De pwofesyonèl ayisyen ap prepare pwochen etap yo ansanm",
      primary: "Jwenn peyi ki adapte avè m",
      secondary: "Konpare peyi yo",
      destinationsTitle: "Kat destinasyon. Yon desizyon ki merite tan.",
      destinationsBody: "Kòmanse ak sa ki enpòtan pou ou epi ouvri chak gid nan pwòp ritm ou.",
      assessmentTitle: "Pi bon kestyon yo vini anvan rekòmandasyon an.",
      assessmentBody:
        "Zouti nou an ap ede w reflechi sou objektif, lang, fanmi ak fason ou vle viv. Jiskaske metòd la pare, ou ka konpare peyi yo dirèkteman.",
      comparisonTitle: "Konpare sa ki chanje lavi chak jou.",
      comparisonBody:
        "Travay, pri lavi, etid, fanmi ak adaptasyon dwe eksplike ak mo senp, sous ak dat.",
      realityTitle: "Reyalite anvan pwomès.",
      realityBody:
        "Nou mete enfòmasyon ofisyèl, konsèy pratik ak eksperyans kominote a nan plas pa yo pou ou ka wè diferans lan.",
      servicesTitle: "Akonpayman ki kòmanse ak yon limit klè.",
      servicesBody:
        "Chwazi nivo sipò ou bezwen an. Pri ak acha ap parèt sèlman lè tout kondisyon sèvis yo pare.",
      guidesTitle: "Gid pou kestyon ki vini apre desizyon an.",
      guidesBody: "Travay, lojman, bank, etid ak premye jou yo—òganize pou li fasil sou telefòn.",
      finalTitle: "Ou pa bezwen deside tout bagay jodi a.",
      finalBody:
        "Kòmanse ak yon peyi, konpare de opsyon oswa prepare kestyon ou vle poze yon konseye.",
      trust: [
        { title: "Enfòmasyon ki gen sous", body: "Dat ak sous rete toupre kontni ki disponib la." },
        { title: "Oryantasyon onèt", body: "Nou separe sa ki ofisyèl, pratik ak kominotè." },
        {
          title: "Konfidansyalite pwoteje",
          body: "Done prive pa antre nan paj piblik ni nan rekòmandasyon fo."
        }
      ]
    },
    countries: {
      kicker: "Chwazi destinasyon ou",
      title: "Eksplore kat peyi yo ak menm nivo klète.",
      body: "Chak gid òganize kestyon esansyèl yo san klase yon peyi kòm solisyon pou tout moun.",
      goalsTitle: "Kisa ki pi enpòtan pou ou?",
      chooseTitle: "Yon bon chwa kòmanse ak bon kestyon.",
      chooseBody:
        "Gade objektif ou, lang ou vle aprann, moun k ap vwayaje avè w ak resous ou ka prepare. Apre sa, konpare diferans yo."
    },
    country: {
      guideKicker: "Gid destinasyon",
      intro:
        "Yon espas pou konprann lavi chak jou, preparasyon ak kestyon ou dwe verifye anvan ou avanse.",
      quickFacts: ["5 lang", "14 tèm pratik", "Sous ak dat"],
      coverageTitle: "Sa gid konplè a ap kouvri",
      coverageBody:
        "Nou montre sèlman seksyon ki gen kontni pare; pa gen kat vid ni konsèy envante.",
      pendingTitle: "Gid sa a ap pran fòm.",
      pendingBody:
        "Nou ap mete ansanm enfòmasyon ki itil san ranpli espas la ak reklamasyon nou pa ka soutni.",
      nextTitle: "Pandan w ap tann",
      nextBody:
        "Konpare destinasyon yo, ekri priyorite ou epi gade ki kestyon chak gid pral ede w reponn.",
      compareAction: "Konpare ak yon lòt peyi"
    },
    compare: {
      kicker: "Zouti pou deside",
      title: "Konpare peyi yo san pèdi nuans yo.",
      body: "Chwazi de a kat destinasyon. Nou pa montre nòt jiskaske chak kritè gen metòd, eksplikasyon ak sous ki merite konfyans.",
      waitingTitle: "Konparezon detaye a ap vini.",
      waitingBody:
        "Seleksyon ou ede w òganize refleksyon an; pandan n ap fini zouti a, louvri gid yo bò kote youn lòt.",
      criteriaTitle: "Sa konparezon an pral mete fas a fas"
    },
    assessment: {
      kicker: "Jwenn direksyon ou",
      title: "Yon rekòmandasyon dwe kapab esplike tèt li.",
      body: "Zouti sa a pa pral chwazi lavi w pou ou. Li pral òganize priyorite w epi montre yon destinasyon prensipal ak yon altènativ.",
      pendingTitle: "Nou ap prepare yon eksperyans ki merite konfyans.",
      pendingBody:
        "Olye nou bay yon rezilta twò presi, nou kenbe rekòmandasyon an fèmen jiskaske kestyon ak pwa yo fin valide.",
      questionsTitle: "Kèk kestyon li pral ede w reflechi sou",
      questions: [
        "Ki objektif ki vini an premye?",
        "Ki lang ou pale oswa ou vle aprann?",
        "Èske w ap vwayaje poukont ou oswa ak fanmi?"
      ],
      alternative: "Pou kounye a, konpare peyi yo dirèkteman"
    },
    services: {
      kicker: "Sipò san sipriz",
      title: "Chwazi nivo akonpayman ki mache ak etap ou.",
      body: "Chak sèvis pral montre sa li bay, sa li pa bay ak ki moun ki responsab—san presyon ni garanti fo.",
      levels: [
        {
          name: "Oryantasyon inisyal",
          audience: "Pou moun ki bezwen mete kestyon yo nan lòd.",
          result: "Yon direksyon klè pou pwochen rechèch ou.",
          features: ["Konvèsasyon estriktire", "Lis kestyon priyoritè", "Resous piblik ki itil"]
        },
        {
          name: "Preparasyon konplè",
          audience: "Pou moun ki deja chwazi yon destinasyon.",
          result: "Yon plan preparasyon òganize selon sèvis ki apwouve.",
          features: ["Plan etap pa etap", "Swivi travay yo", "Pwen pou verifye ak pwofesyonèl"]
        },
        {
          name: "Enstalasyon ak adaptasyon",
          audience: "Pou kliyan ki bezwen sipò apre arive.",
          result: "Yon chemen pratik pou premye bezwen lavi chak jou.",
          features: ["Premye etap yo", "Resous lokal verifye", "Randevou swivi"]
        }
      ],
      availability: "Acha a poko ouvè. Pa gen pri oswa kondisyon kache sou paj sa a.",
      howTitle: "Kijan akonpayman an ap mache",
      steps: [
        "Nou konprann objektif la",
        "Nou defini sa sèvis la kouvri",
        "Nou swiv pwochen aksyon yo"
      ],
      limitsTitle: "Sa nou pa pwomèt",
      limits: [
        "Nou pa garanti viza oswa rezidans.",
        "Nou pa envante pri, delè oswa kondisyon.",
        "Nou pa mande dokiman prive nan yon kanal piblik."
      ],
      faqTitle: "K kestyon ki enpòtan anvan ou chwazi"
    },
    guides: {
      kicker: "Bibliyotèk pratik",
      title: "Gid ki fèt pou sèvi nan lavi reyèl.",
      body: "Chèche pa peyi oswa sijè. Se sèlman kontni ki pibliye ak dat ki antre nan rezilta yo.",
      searchTitle: "Kisa ou vle konprann?",
      categoriesTitle: "Kòmanse ak yon sijè",
      pendingTitle: "Premye koleksyon gid yo ap vini.",
      pendingBody:
        "Pandan sa, paj peyi yo montre estrikti a epi zouti rechèch la rete limite ak kontni ki deja pibliye."
    },
    auth: {
      kicker: "Espas prive, aksè ki pwoteje",
      title: "Kontinye preparasyon ou nan yon sèl kote.",
      body: "Sove etap ou, jwenn mizajou epi kontwole sekirite kont ou san pataje dokiman pa mesaj.",
      points: [
        "Supabase Auth pwoteje sesyon an",
        "MFA obligatwa pou aksè privilejye",
        "Done prive pa antre nan paj piblik"
      ],
      showPassword: "Montre modpas",
      hidePassword: "Kache modpas",
      passwordHelp: "Omwen 12 karaktè ak yon lèt majiskil, yon miniskil, yon chif ak yon senbòl.",
      acceptTerms: "Mwen dakò kontinye selon kondisyon ki pibliye yo",
      backHome: "Retounen sou sit la"
    },
    states: {
      noResultsTitle: "Nou pa jwenn yon gid pou rechèch sa a.",
      noResultsBody: "Eseye yon peyi, yon sijè pi kout oswa ouvri bibliyotèk la.",
      unavailableTitle: "Espas sa a poko ouvè.",
      unavailableBody:
        "Nou ap kenbe fonksyon an fèmen jiskaske li ka sèvi w san konpwomèt sekirite oswa klète."
    }
  },
  fr: {
    menu: "Menu",
    advisor: "Parler à un conseiller",
    explore: "Explorer",
    viewAll: "Tout voir",
    comingSoon: "Bientôt",
    goals: ["Travailler", "Étudier", "Famille", "Entreprendre"],
    home: {
      kicker: "Choisir avec plus de clarté",
      title: "Préparez votre prochaine étape, sans fausses promesses.",
      body: "Des guides pratiques, des comparaisons honnêtes et un accompagnement pour les États-Unis, le Chili, le Brésil et le Mexique.",
      heroAlt: "Deux professionnels haïtiens préparent ensemble leur prochaine étape",
      primary: "Trouver le pays qui me convient",
      secondary: "Comparer les pays",
      destinationsTitle: "Quatre destinations. Une décision qui mérite du temps.",
      destinationsBody: "Commencez par vos priorités et ouvrez chaque guide à votre rythme.",
      assessmentTitle: "Les bonnes questions viennent avant la recommandation.",
      assessmentBody:
        "L’outil prendra en compte objectifs, langues, famille et mode de vie. En attendant, comparez directement les pays.",
      comparisonTitle: "Comparez ce qui change la vie quotidienne.",
      comparisonBody:
        "Travail, coût de la vie, études, famille et adaptation doivent être expliqués simplement, avec sources et dates.",
      realityTitle: "La réalité avant les promesses.",
      realityBody:
        "Nous distinguons clairement information officielle, conseils pratiques et expérience communautaire.",
      servicesTitle: "Un accompagnement qui commence par des limites claires.",
      servicesBody:
        "Choisissez le niveau de soutien utile. Les prix et achats n’apparaîtront que lorsque les conditions seront prêtes.",
      guidesTitle: "Des guides pour les questions qui viennent ensuite.",
      guidesBody: "Travail, logement, banque, études et premiers jours, pensés pour le mobile.",
      finalTitle: "Vous n’avez pas à tout décider aujourd’hui.",
      finalBody: "Commencez par un pays, comparez deux options ou préparez vos questions.",
      trust: [
        {
          title: "Informations sourcées",
          body: "Dates et sources restent proches du contenu disponible."
        },
        {
          title: "Orientation honnête",
          body: "Officiel, pratique et communautaire restent distincts."
        },
        {
          title: "Vie privée protégée",
          body: "Aucune donnée privée dans les pages publiques ou de faux résultats."
        }
      ]
    },
    countries: {
      kicker: "Choisir sa destination",
      title: "Explorez quatre pays avec le même niveau de clarté.",
      body: "Chaque guide organise les questions essentielles sans présenter un pays comme solution universelle.",
      goalsTitle: "Qu’est-ce qui compte le plus pour vous ?",
      chooseTitle: "Un bon choix commence par de bonnes questions.",
      chooseBody:
        "Regardez vos objectifs, les langues, les personnes qui voyagent avec vous et les ressources à préparer, puis comparez."
    },
    country: {
      guideKicker: "Guide destination",
      intro:
        "Un espace pour comprendre la vie quotidienne, la préparation et ce qu’il faut vérifier avant d’avancer.",
      quickFacts: ["5 langues", "14 thèmes pratiques", "Sources et dates"],
      coverageTitle: "Ce que couvrira le guide complet",
      coverageBody:
        "Seules les sections prêtes sont affichées : aucune carte vide ni conseil inventé.",
      pendingTitle: "Ce guide prend forme.",
      pendingBody:
        "Nous rassemblons des informations utiles sans remplir les vides par des affirmations impossibles à soutenir.",
      nextTitle: "En attendant",
      nextBody:
        "Comparez les destinations, notez vos priorités et découvrez les questions traitées par chaque guide.",
      compareAction: "Comparer avec un autre pays"
    },
    compare: {
      kicker: "Outil de décision",
      title: "Comparez les pays sans perdre leurs nuances.",
      body: "Choisissez deux à quatre destinations. Aucun score n’apparaît avant d’avoir une méthode, une explication et des sources fiables.",
      waitingTitle: "La comparaison détaillée arrive bientôt.",
      waitingBody:
        "Votre sélection structure la réflexion ; en attendant, ouvrez les guides côte à côte.",
      criteriaTitle: "Ce que la comparaison mettra face à face"
    },
    assessment: {
      kicker: "Trouver votre direction",
      title: "Une recommandation doit pouvoir s’expliquer.",
      body: "L’outil ne choisira pas votre vie. Il organisera vos priorités et montrera une destination principale et une alternative.",
      pendingTitle: "Nous préparons une expérience digne de confiance.",
      pendingBody:
        "Plutôt qu’un résultat artificiellement précis, la recommandation reste fermée jusqu’à validation des questions et des poids.",
      questionsTitle: "Quelques questions à considérer",
      questions: [
        "Quel objectif vient en premier ?",
        "Quelles langues parlez-vous ou voulez-vous apprendre ?",
        "Voyagez-vous seul ou en famille ?"
      ],
      alternative: "Pour l’instant, comparer directement les pays"
    },
    services: {
      kicker: "Un soutien sans surprise",
      title: "Choisissez un accompagnement adapté à votre étape.",
      body: "Chaque service indiquera son périmètre, ses limites et le responsable, sans pression ni garantie trompeuse.",
      levels: [
        {
          name: "Orientation initiale",
          audience: "Pour mettre ses questions en ordre.",
          result: "Une direction claire pour la suite de la recherche.",
          features: ["Échange structuré", "Questions prioritaires", "Ressources publiques utiles"]
        },
        {
          name: "Préparation complète",
          audience: "Pour une destination déjà choisie.",
          result: "Un plan organisé selon les services approuvés.",
          features: [
            "Plan par étapes",
            "Suivi des tâches",
            "Points à valider avec un professionnel"
          ]
        },
        {
          name: "Installation et adaptation",
          audience: "Pour un soutien après l’arrivée.",
          result: "Un parcours pratique pour les premiers besoins quotidiens.",
          features: ["Premières démarches", "Ressources locales vérifiées", "Rendez-vous de suivi"]
        }
      ],
      availability: "Les achats ne sont pas encore ouverts. Aucun prix ni condition cachés.",
      howTitle: "Comment fonctionnera l’accompagnement",
      steps: ["Comprendre l’objectif", "Définir le périmètre", "Suivre les prochaines actions"],
      limitsTitle: "Ce que nous ne promettons pas",
      limits: [
        "Aucune garantie de visa ou résidence.",
        "Aucun prix, délai ou critère inventé.",
        "Aucun document privé demandé sur un canal public."
      ],
      faqTitle: "Questions importantes avant de choisir"
    },
    guides: {
      kicker: "Bibliothèque pratique",
      title: "Des guides faits pour la vie réelle.",
      body: "Cherchez par pays ou sujet. Seul le contenu publié et daté apparaît.",
      searchTitle: "Que voulez-vous comprendre ?",
      categoriesTitle: "Commencer par un sujet",
      pendingTitle: "La première collection arrive bientôt.",
      pendingBody:
        "En attendant, les pages pays montrent la structure et la recherche reste limitée au contenu déjà publié."
    },
    auth: {
      kicker: "Espace privé, accès protégé",
      title: "Continuez votre préparation au même endroit.",
      body: "Enregistrez vos étapes, recevez les mises à jour et contrôlez la sécurité sans envoyer de documents par message.",
      points: [
        "Sessions protégées par Supabase Auth",
        "MFA pour les accès privilégiés",
        "Aucune donnée privée sur les pages publiques"
      ],
      showPassword: "Afficher le mot de passe",
      hidePassword: "Masquer le mot de passe",
      passwordHelp: "Au moins 12 caractères, avec majuscule, minuscule, chiffre et symbole.",
      acceptTerms: "J’accepte de continuer selon les conditions publiées",
      backHome: "Retour au site"
    },
    states: {
      noResultsTitle: "Aucun guide ne correspond à cette recherche.",
      noResultsBody: "Essayez un pays, un sujet plus court ou ouvrez la bibliothèque.",
      unavailableTitle: "Cet espace n’est pas encore ouvert.",
      unavailableBody:
        "La fonction reste fermée jusqu’à pouvoir être utilisée avec sécurité et clarté."
    }
  },
  es: {
    menu: "Menú",
    advisor: "Hablar con un asesor",
    explore: "Explorar",
    viewAll: "Ver todo",
    comingSoon: "Próximamente",
    goals: ["Trabajar", "Estudiar", "Familia", "Emprender"],
    home: {
      kicker: "Elegir con más claridad",
      title: "Prepara tu próximo paso, sin falsas promesas.",
      body: "Guías prácticas, comparaciones honestas y acompañamiento para Estados Unidos, Chile, Brasil y México.",
      heroAlt: "Dos profesionales haitianos preparan juntos su próximo paso",
      primary: "Encontrar el país para mí",
      secondary: "Comparar países",
      destinationsTitle: "Cuatro destinos. Una decisión que merece tiempo.",
      destinationsBody: "Empieza por tus prioridades y abre cada guía a tu ritmo.",
      assessmentTitle: "Las buenas preguntas vienen antes de la recomendación.",
      assessmentBody:
        "La herramienta tendrá en cuenta objetivos, idiomas, familia y estilo de vida. Mientras tanto, compara directamente los países.",
      comparisonTitle: "Compara lo que cambia la vida cotidiana.",
      comparisonBody:
        "Trabajo, costo de vida, estudios, familia y adaptación deben explicarse con claridad, fuentes y fechas.",
      realityTitle: "Realidad antes que promesas.",
      realityBody: "Separamos información oficial, consejos prácticos y experiencia comunitaria.",
      servicesTitle: "Acompañamiento que empieza con límites claros.",
      servicesBody:
        "Elige el nivel de apoyo útil. Los precios y compras aparecerán cuando todas las condiciones estén listas.",
      guidesTitle: "Guías para las preguntas que vienen después.",
      guidesBody: "Trabajo, vivienda, bancos, estudios y primeros días, pensados para el móvil.",
      finalTitle: "No tienes que decidirlo todo hoy.",
      finalBody: "Empieza con un país, compara dos opciones o prepara tus preguntas.",
      trust: [
        {
          title: "Información con fuentes",
          body: "Fechas y fuentes permanecen junto al contenido disponible."
        },
        {
          title: "Orientación honesta",
          body: "Lo oficial, práctico y comunitario se mantiene separado."
        },
        {
          title: "Privacidad protegida",
          body: "Sin datos privados en páginas públicas ni resultados falsos."
        }
      ]
    },
    countries: {
      kicker: "Elegir destino",
      title: "Explora cuatro países con el mismo nivel de claridad.",
      body: "Cada guía organiza preguntas esenciales sin presentar un país como solución universal.",
      goalsTitle: "¿Qué es lo más importante para ti?",
      chooseTitle: "Una buena elección empieza con buenas preguntas.",
      chooseBody:
        "Mira tus objetivos, idiomas, quién viaja contigo y los recursos que puedes preparar; después compara."
    },
    country: {
      guideKicker: "Guía de destino",
      intro:
        "Un espacio para entender la vida cotidiana, la preparación y lo que debes verificar antes de avanzar.",
      quickFacts: ["5 idiomas", "14 temas prácticos", "Fuentes y fechas"],
      coverageTitle: "Qué cubrirá la guía completa",
      coverageBody: "Sólo aparecen secciones listas: sin tarjetas vacías ni consejos inventados.",
      pendingTitle: "Esta guía está tomando forma.",
      pendingBody:
        "Reunimos información útil sin llenar espacios con afirmaciones que no podemos sostener.",
      nextTitle: "Mientras esperas",
      nextBody:
        "Compara destinos, anota tus prioridades y revisa las preguntas que cubrirá cada guía.",
      compareAction: "Comparar con otro país"
    },
    compare: {
      kicker: "Herramienta para decidir",
      title: "Compara países sin perder sus matices.",
      body: "Elige entre dos y cuatro destinos. No mostramos puntuaciones hasta contar con método, explicación y fuentes confiables.",
      waitingTitle: "La comparación detallada llegará pronto.",
      waitingBody:
        "Tu selección organiza la reflexión; mientras tanto, abre las guías en paralelo.",
      criteriaTitle: "Qué pondrá frente a frente la comparación"
    },
    assessment: {
      kicker: "Encontrar tu dirección",
      title: "Una recomendación debe poder explicarse.",
      body: "La herramienta no decidirá tu vida. Ordenará tus prioridades y mostrará un destino principal y una alternativa.",
      pendingTitle: "Preparamos una experiencia digna de confianza.",
      pendingBody:
        "En vez de un resultado artificialmente preciso, la recomendación permanece cerrada hasta validar preguntas y pesos.",
      questionsTitle: "Algunas preguntas para reflexionar",
      questions: [
        "¿Qué objetivo va primero?",
        "¿Qué idiomas hablas o quieres aprender?",
        "¿Viajas solo o con tu familia?"
      ],
      alternative: "Por ahora, comparar los países directamente"
    },
    services: {
      kicker: "Apoyo sin sorpresas",
      title: "Elige el acompañamiento que encaja con tu etapa.",
      body: "Cada servicio mostrará alcance, límites y responsable, sin presión ni garantías engañosas.",
      levels: [
        {
          name: "Orientación inicial",
          audience: "Para ordenar las primeras preguntas.",
          result: "Una dirección clara para continuar investigando.",
          features: [
            "Conversación estructurada",
            "Preguntas prioritarias",
            "Recursos públicos útiles"
          ]
        },
        {
          name: "Preparación completa",
          audience: "Para quien ya eligió destino.",
          result: "Un plan organizado según los servicios aprobados.",
          features: [
            "Plan por etapas",
            "Seguimiento de tareas",
            "Puntos para validar con un profesional"
          ]
        },
        {
          name: "Instalación y adaptación",
          audience: "Para apoyo después de llegar.",
          result: "Un recorrido práctico por las primeras necesidades diarias.",
          features: ["Primeros pasos", "Recursos locales verificados", "Citas de seguimiento"]
        }
      ],
      availability: "Las compras aún no están abiertas. No hay precios ni condiciones ocultas.",
      howTitle: "Cómo funcionará el acompañamiento",
      steps: ["Comprender el objetivo", "Definir el alcance", "Seguir las próximas acciones"],
      limitsTitle: "Lo que no prometemos",
      limits: [
        "No garantizamos visa o residencia.",
        "No inventamos precios, plazos ni requisitos.",
        "No pedimos documentos privados en canales públicos."
      ],
      faqTitle: "Preguntas importantes antes de elegir"
    },
    guides: {
      kicker: "Biblioteca práctica",
      title: "Guías hechas para la vida real.",
      body: "Busca por país o tema. Sólo aparece contenido publicado y fechado.",
      searchTitle: "¿Qué quieres entender?",
      categoriesTitle: "Empieza por un tema",
      pendingTitle: "La primera colección llegará pronto.",
      pendingBody:
        "Mientras tanto, las páginas de país muestran la estructura y la búsqueda se limita a contenido ya publicado."
    },
    auth: {
      kicker: "Espacio privado, acceso protegido",
      title: "Continúa tu preparación en un solo lugar.",
      body: "Guarda tus pasos, recibe novedades y controla la seguridad sin enviar documentos por mensaje.",
      points: [
        "Sesiones protegidas con Supabase Auth",
        "MFA para accesos privilegiados",
        "Sin datos privados en páginas públicas"
      ],
      showPassword: "Mostrar contraseña",
      hidePassword: "Ocultar contraseña",
      passwordHelp: "Al menos 12 caracteres, con mayúscula, minúscula, número y símbolo.",
      acceptTerms: "Acepto continuar según las condiciones publicadas",
      backHome: "Volver al sitio"
    },
    states: {
      noResultsTitle: "No encontramos una guía para esa búsqueda.",
      noResultsBody: "Prueba con un país, un tema más corto o abre la biblioteca.",
      unavailableTitle: "Este espacio aún no está abierto.",
      unavailableBody: "La función permanece cerrada hasta poder ofrecer seguridad y claridad."
    }
  },
  pt: {
    menu: "Menu",
    advisor: "Falar com um consultor",
    explore: "Explorar",
    viewAll: "Ver tudo",
    comingSoon: "Em breve",
    goals: ["Trabalhar", "Estudar", "Família", "Empreender"],
    home: {
      kicker: "Escolher com mais clareza",
      title: "Prepare seu próximo passo, sem falsas promessas.",
      body: "Guias práticos, comparações honestas e acompanhamento para Estados Unidos, Chile, Brasil e México.",
      heroAlt: "Dois profissionais haitianos preparam juntos seu próximo passo",
      primary: "Encontrar o país para mim",
      secondary: "Comparar países",
      destinationsTitle: "Quatro destinos. Uma decisão que merece tempo.",
      destinationsBody: "Comece pelas suas prioridades e abra cada guia no seu ritmo.",
      assessmentTitle: "As boas perguntas vêm antes da recomendação.",
      assessmentBody:
        "A ferramenta considerará objetivos, idiomas, família e estilo de vida. Enquanto isso, compare os países diretamente.",
      comparisonTitle: "Compare o que muda a vida cotidiana.",
      comparisonBody:
        "Trabalho, custo de vida, estudos, família e adaptação devem ser explicados com clareza, fontes e datas.",
      realityTitle: "Realidade antes de promessas.",
      realityBody: "Separamos informação oficial, orientação prática e experiência comunitária.",
      servicesTitle: "Acompanhamento que começa com limites claros.",
      servicesBody:
        "Escolha o apoio útil. Preços e compras aparecerão quando todas as condições estiverem prontas.",
      guidesTitle: "Guias para as perguntas que vêm depois.",
      guidesBody: "Trabalho, moradia, bancos, estudos e primeiros dias, pensados para o celular.",
      finalTitle: "Você não precisa decidir tudo hoje.",
      finalBody: "Comece por um país, compare duas opções ou prepare suas perguntas.",
      trust: [
        {
          title: "Informação com fontes",
          body: "Datas e fontes permanecem junto do conteúdo disponível."
        },
        {
          title: "Orientação honesta",
          body: "O oficial, prático e comunitário permanece separado."
        },
        {
          title: "Privacidade protegida",
          body: "Sem dados privados em páginas públicas ou resultados falsos."
        }
      ]
    },
    countries: {
      kicker: "Escolher destino",
      title: "Explore quatro países com o mesmo nível de clareza.",
      body: "Cada guia organiza perguntas essenciais sem apresentar um país como solução universal.",
      goalsTitle: "O que é mais importante para você?",
      chooseTitle: "Uma boa escolha começa com boas perguntas.",
      chooseBody:
        "Considere objetivos, idiomas, quem viaja com você e os recursos que pode preparar; depois compare."
    },
    country: {
      guideKicker: "Guia de destino",
      intro:
        "Um espaço para entender o cotidiano, a preparação e o que verificar antes de avançar.",
      quickFacts: ["5 idiomas", "14 temas práticos", "Fontes e datas"],
      coverageTitle: "O que o guia completo vai cobrir",
      coverageBody: "Só aparecem seções prontas: sem cartões vazios ou conselhos inventados.",
      pendingTitle: "Este guia está tomando forma.",
      pendingBody:
        "Reunimos informação útil sem preencher espaços com afirmações que não podemos sustentar.",
      nextTitle: "Enquanto isso",
      nextBody: "Compare destinos, anote prioridades e veja as perguntas que cada guia vai cobrir.",
      compareAction: "Comparar com outro país"
    },
    compare: {
      kicker: "Ferramenta para decidir",
      title: "Compare países sem perder as nuances.",
      body: "Escolha de dois a quatro destinos. Não mostramos notas sem método, explicação e fontes confiáveis.",
      waitingTitle: "A comparação detalhada chegará em breve.",
      waitingBody: "Sua seleção organiza a reflexão; por enquanto, abra os guias lado a lado.",
      criteriaTitle: "O que a comparação colocará frente a frente"
    },
    assessment: {
      kicker: "Encontrar sua direção",
      title: "Uma recomendação precisa conseguir se explicar.",
      body: "A ferramenta não decidirá sua vida. Ela organizará prioridades e mostrará um destino principal e uma alternativa.",
      pendingTitle: "Preparamos uma experiência confiável.",
      pendingBody:
        "Em vez de um resultado artificialmente preciso, a recomendação fica fechada até validar perguntas e pesos.",
      questionsTitle: "Algumas perguntas para refletir",
      questions: [
        "Qual objetivo vem primeiro?",
        "Quais idiomas você fala ou quer aprender?",
        "Você viaja sozinho ou com a família?"
      ],
      alternative: "Por enquanto, comparar os países diretamente"
    },
    services: {
      kicker: "Apoio sem surpresas",
      title: "Escolha o acompanhamento que combina com sua etapa.",
      body: "Cada serviço mostrará escopo, limites e responsável, sem pressão ou garantias enganosas.",
      levels: [
        {
          name: "Orientação inicial",
          audience: "Para organizar as primeiras perguntas.",
          result: "Uma direção clara para continuar pesquisando.",
          features: ["Conversa estruturada", "Perguntas prioritárias", "Recursos públicos úteis"]
        },
        {
          name: "Preparação completa",
          audience: "Para quem já escolheu o destino.",
          result: "Um plano organizado conforme os serviços aprovados.",
          features: [
            "Plano por etapas",
            "Acompanhamento de tarefas",
            "Pontos para validar com um profissional"
          ]
        },
        {
          name: "Instalação e adaptação",
          audience: "Para apoio depois da chegada.",
          result: "Um percurso prático para as primeiras necessidades diárias.",
          features: [
            "Primeiros passos",
            "Recursos locais verificados",
            "Consultas de acompanhamento"
          ]
        }
      ],
      availability: "As compras ainda não estão abertas. Não há preços ou condições escondidas.",
      howTitle: "Como o acompanhamento vai funcionar",
      steps: ["Entender o objetivo", "Definir o escopo", "Acompanhar as próximas ações"],
      limitsTitle: "O que não prometemos",
      limits: [
        "Não garantimos visto ou residência.",
        "Não inventamos preços, prazos ou requisitos.",
        "Não pedimos documentos privados em canais públicos."
      ],
      faqTitle: "Perguntas importantes antes de escolher"
    },
    guides: {
      kicker: "Biblioteca prática",
      title: "Guias feitos para a vida real.",
      body: "Busque por país ou tema. Só aparece conteúdo publicado e datado.",
      searchTitle: "O que você quer entender?",
      categoriesTitle: "Comece por um tema",
      pendingTitle: "A primeira coleção chegará em breve.",
      pendingBody:
        "Enquanto isso, as páginas de país mostram a estrutura e a busca fica limitada ao conteúdo já publicado."
    },
    auth: {
      kicker: "Espaço privado, acesso protegido",
      title: "Continue sua preparação em um só lugar.",
      body: "Salve etapas, receba novidades e controle a segurança sem enviar documentos por mensagem.",
      points: [
        "Sessões protegidas com Supabase Auth",
        "MFA para acessos privilegiados",
        "Sem dados privados em páginas públicas"
      ],
      showPassword: "Mostrar senha",
      hidePassword: "Ocultar senha",
      passwordHelp: "Pelo menos 12 caracteres, com maiúscula, minúscula, número e símbolo.",
      acceptTerms: "Aceito continuar conforme as condições publicadas",
      backHome: "Voltar ao site"
    },
    states: {
      noResultsTitle: "Não encontramos um guia para essa busca.",
      noResultsBody: "Tente um país, um tema mais curto ou abra a biblioteca.",
      unavailableTitle: "Este espaço ainda não está aberto.",
      unavailableBody: "A função permanece fechada até poder oferecer segurança e clareza."
    }
  },
  en: {
    menu: "Menu",
    advisor: "Talk to an advisor",
    explore: "Explore",
    viewAll: "View all",
    comingSoon: "Coming soon",
    goals: ["Work", "Study", "Family", "Entrepreneurship"],
    home: {
      kicker: "Choose with more clarity",
      title: "Prepare your next step, without false promises.",
      body: "Practical guides, honest comparisons and support for the United States, Chile, Brazil and Mexico.",
      heroAlt: "Two Haitian professionals prepare their next step together",
      primary: "Find the country for me",
      secondary: "Compare countries",
      destinationsTitle: "Four destinations. A decision worth taking time for.",
      destinationsBody: "Start with your priorities and open each guide at your own pace.",
      assessmentTitle: "Good questions come before the recommendation.",
      assessmentBody:
        "The tool will consider goals, languages, family and lifestyle. Until then, compare countries directly.",
      comparisonTitle: "Compare what changes everyday life.",
      comparisonBody:
        "Work, cost of living, study, family and adaptation should be explained clearly, with sources and dates.",
      realityTitle: "Reality before promises.",
      realityBody:
        "We keep official information, practical guidance and community experience clearly separated.",
      servicesTitle: "Support that begins with clear limits.",
      servicesBody:
        "Choose the support level that helps. Prices and purchases will appear once every condition is ready.",
      guidesTitle: "Guides for the questions that come next.",
      guidesBody: "Work, housing, banking, study and first days, designed for mobile.",
      finalTitle: "You do not have to decide everything today.",
      finalBody: "Start with one country, compare two options or prepare your questions.",
      trust: [
        {
          title: "Sourced information",
          body: "Dates and sources stay close to the available content."
        },
        {
          title: "Honest guidance",
          body: "Official, practical and community perspectives stay distinct."
        },
        { title: "Protected privacy", body: "No private data in public pages or false results." }
      ]
    },
    countries: {
      kicker: "Choose a destination",
      title: "Explore four countries with the same level of clarity.",
      body: "Each guide organizes essential questions without presenting one country as a universal answer.",
      goalsTitle: "What matters most to you?",
      chooseTitle: "A good choice starts with good questions.",
      chooseBody:
        "Consider goals, languages, who travels with you and the resources you can prepare, then compare."
    },
    country: {
      guideKicker: "Destination guide",
      intro:
        "A place to understand daily life, preparation and what to verify before moving forward.",
      quickFacts: ["5 languages", "14 practical topics", "Sources and dates"],
      coverageTitle: "What the complete guide will cover",
      coverageBody: "Only ready sections appear: no empty cards or invented advice.",
      pendingTitle: "This guide is taking shape.",
      pendingBody:
        "We are gathering useful information without filling gaps with claims we cannot support.",
      nextTitle: "While you wait",
      nextBody:
        "Compare destinations, write down priorities and see the questions each guide will cover.",
      compareAction: "Compare with another country"
    },
    compare: {
      kicker: "Decision tool",
      title: "Compare countries without losing the nuance.",
      body: "Choose two to four destinations. Scores stay hidden until every criterion has a method, explanation and trustworthy sources.",
      waitingTitle: "Detailed comparison is coming soon.",
      waitingBody: "Your selection organizes the decision; for now, open the guides side by side.",
      criteriaTitle: "What the comparison will put side by side"
    },
    assessment: {
      kicker: "Find your direction",
      title: "A recommendation should be able to explain itself.",
      body: "The tool will not choose your life. It will organize priorities and show one primary destination and an alternative.",
      pendingTitle: "We are preparing an experience worthy of trust.",
      pendingBody:
        "Instead of an artificially precise result, recommendations remain closed until questions and weights are validated.",
      questionsTitle: "A few questions to think through",
      questions: [
        "Which goal comes first?",
        "Which languages do you speak or want to learn?",
        "Are you travelling alone or with family?"
      ],
      alternative: "For now, compare countries directly"
    },
    services: {
      kicker: "Support without surprises",
      title: "Choose support that fits your current stage.",
      body: "Every service will show its scope, limits and owner, without pressure or misleading guarantees.",
      levels: [
        {
          name: "Initial orientation",
          audience: "For organizing the first questions.",
          result: "A clear direction for further research.",
          features: ["Structured conversation", "Priority questions", "Useful public resources"]
        },
        {
          name: "Complete preparation",
          audience: "For someone who has chosen a destination.",
          result: "An organized plan based on approved services.",
          features: ["Step-by-step plan", "Task follow-up", "Points to verify with a professional"]
        },
        {
          name: "Settlement and adaptation",
          audience: "For support after arrival.",
          result: "A practical path through first everyday needs.",
          features: ["First steps", "Verified local resources", "Follow-up appointments"]
        }
      ],
      availability: "Purchases are not open yet. There are no hidden prices or terms.",
      howTitle: "How support will work",
      steps: ["Understand the goal", "Define the scope", "Track the next actions"],
      limitsTitle: "What we do not promise",
      limits: [
        "No visa or residence guarantees.",
        "No invented prices, timelines or requirements.",
        "No private documents requested in public channels."
      ],
      faqTitle: "Important questions before choosing"
    },
    guides: {
      kicker: "Practical library",
      title: "Guides made for real life.",
      body: "Search by country or topic. Only published, dated content appears.",
      searchTitle: "What do you want to understand?",
      categoriesTitle: "Start with a topic",
      pendingTitle: "The first guide collection is coming soon.",
      pendingBody:
        "Until then, country pages show the structure and search stays limited to already published content."
    },
    auth: {
      kicker: "Private space, protected access",
      title: "Continue your preparation in one place.",
      body: "Save steps, receive updates and control account security without sending documents by message.",
      points: [
        "Sessions protected by Supabase Auth",
        "MFA for privileged access",
        "No private data in public pages"
      ],
      showPassword: "Show password",
      hidePassword: "Hide password",
      passwordHelp: "At least 12 characters with uppercase, lowercase, a number and a symbol.",
      acceptTerms: "I agree to continue under the published terms",
      backHome: "Back to the site"
    },
    states: {
      noResultsTitle: "We could not find a guide for that search.",
      noResultsBody: "Try a country, a shorter topic or open the library.",
      unavailableTitle: "This space is not open yet.",
      unavailableBody: "The feature stays closed until it can provide security and clarity."
    }
  }
} satisfies Record<Locale, ExperienceCopy>;

export function getExperienceCopy(locale: Locale): ExperienceCopy {
  return copy[locale];
}
