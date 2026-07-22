import type { Locale } from "@/types/domain";

type ProductCopy = {
  productName: string;
  reviewBadge: string;
  reviewedOnly: string;
  reviewedOnlyBody: string;
  plainLanguage: string;
  plainLanguageBody: string;
  privacyFirst: string;
  privacyFirstBody: string;
  howTitle: string;
  howBody: string;
  steps: readonly [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string }
  ];
  countriesTitle: string;
  countriesBody: string;
  openCountry: string;
  tableOfContents: string;
  draftTitle: string;
  draftBody: string;
  draftDetail: string;
  noSources: string;
  compareBody: string;
  compareUnavailable: string;
  assessmentUnavailable: string;
  servicesBody: string;
  guidesBody: string;
  coursesBody: string;
  aboutTitle: string;
  aboutBody: string;
  contactTitle: string;
  contactBody: string;
  legalDraft: string;
  backToCountry: string;
};

const copy = {
  ht: {
    productName: "Vwayaj Ayisyen",
    reviewBadge: "Revizyon obligatwa",
    reviewedOnly: "Sous ak dat vizib",
    reviewedOnlyBody:
      "Nou pibliye enfòmasyon sansib sèlman lè ekip la verifye sous, dat ak limit li yo.",
    plainLanguage: "Langaj ki senp",
    plainLanguageBody: "Rezime fasil ak eksplikasyon konplè ede ou konprann san pwomès fo.",
    privacyFirst: "Konfidansyalite an premye",
    privacyFirstBody: "Pa mete nimewo paspò, dokiman oswa lòt done prive nan paj piblik yo.",
    howTitle: "Kijan platfòm la dwe ede ou",
    howBody: "Yon chemen senp pou enfòme tèt ou, konpare opsyon epi mande èd lè li nesesè.",
    steps: [
      {
        title: "Chwazi sa w ap chèche",
        body: "Kòmanse ak yon peyi, yon gid oswa yon kesyon senp."
      },
      {
        title: "Verifye enfòmasyon an",
        body: "Gade kalite enfòmasyon an, dat li ak sous ofisyèl li."
      },
      {
        title: "Prepare pwochen etap la",
        body: "Sove travay ou oswa pale ak yon moun lè sèvis la apwouve."
      }
    ],
    countriesTitle: "Kat peyi, menm estrikti klè",
    countriesBody:
      "Chak peyi gen menm seksyon yo. Kontni ki poko verifye rete klèman make kòm an preparasyon.",
    openCountry: "Louvri gid peyi a",
    tableOfContents: "Sou paj sa a",
    draftTitle: "Kontni an poko pare pou piblikasyon",
    draftBody:
      "Estrikti a disponib, men ekip la dwe ajoute sous prensipal, dat ak revizyon pwofesyonèl anvan nenpòt enfòmasyon operasyonèl parèt.",
    draftDetail:
      "Nou pa ranpli espas sa a ak konsèy legal, pri oswa eksperyans kominotè ki pa verifye.",
    noSources: "Pa gen sous apwouve ki pibliye pou seksyon sa a ankò.",
    compareBody: "Chwazi de a kat peyi. Chak nòt dwe gen eksplikasyon, sous ak dat.",
    compareUnavailable:
      "Done konparezon yo rete fèmen jiskaske metòd la, sous yo ak nòt yo fin revize.",
    assessmentUnavailable:
      "Kesyon ak pwa yo poko valide. Nou pap montre yon rekòmandasyon ki ka bay yon fo sans presizyon.",
    servicesBody:
      "Sèvis, pri ak kondisyon yo ap parèt sèlman apre apwobasyon komèsyal, legal ak operasyonèl.",
    guidesBody: "Gid ki revize yo pral rasanble etap pratik ak sous pou chak peyi.",
    coursesBody: "Kou gratis ap louvri apre kontni, transkripsyon ak aksè yo fin revize.",
    aboutTitle: "Yon zouti enfòmasyon, pa yon garanti",
    aboutBody:
      "Platfòm sa a fèt pou ede kominote ayisyèn nan konprann opsyon, sous ak limit. Li pa ranplase konsèy yon pwofesyonèl otorize.",
    contactTitle: "Kontakte ekip la",
    contactBody: "Chanèl piblik la poko aktive. Pa voye dokiman, modpas, kòd oswa lòt done sansib.",
    legalDraft: "Tèks sa a se yon espas teknik. Li dwe revize epi apwouve anvan lansman piblik.",
    backToCountry: "Retounen nan paj peyi a"
  },
  fr: {
    productName: "Vwayaj Ayisyen",
    reviewBadge: "Révision obligatoire",
    reviewedOnly: "Sources et dates visibles",
    reviewedOnlyBody:
      "Les informations sensibles ne sont publiées qu’après vérification des sources, dates et limites.",
    plainLanguage: "Langage clair",
    plainLanguageBody: "Des résumés simples et des explications complètes, sans fausses promesses.",
    privacyFirst: "Confidentialité d’abord",
    privacyFirstBody:
      "Ne saisissez jamais de numéro de passeport, document ou donnée privée sur une page publique.",
    howTitle: "Comment la plateforme doit vous aider",
    howBody: "Un parcours simple pour s’informer, comparer et demander de l’aide au bon moment.",
    steps: [
      {
        title: "Choisissez votre besoin",
        body: "Commencez par un pays, un guide ou une question simple."
      },
      {
        title: "Vérifiez l’information",
        body: "Consultez son type, sa date et sa source officielle."
      },
      {
        title: "Préparez la suite",
        body: "Enregistrez votre travail ou contactez une personne quand le service est approuvé."
      }
    ],
    countriesTitle: "Quatre pays, une structure claire",
    countriesBody:
      "Chaque pays suit les mêmes sections. Le contenu non vérifié reste clairement indiqué comme en préparation.",
    openCountry: "Ouvrir le guide du pays",
    tableOfContents: "Sur cette page",
    draftTitle: "Contenu non prêt à être publié",
    draftBody:
      "La structure est disponible, mais des sources primaires, des dates et une révision professionnelle sont requises.",
    draftDetail:
      "Aucun conseil juridique, prix ou témoignage communautaire non vérifié ne remplit cet espace.",
    noSources: "Aucune source approuvée n’est encore publiée pour cette section.",
    compareBody:
      "Choisissez deux à quatre pays. Chaque note doit inclure une explication, une source et une date.",
    compareUnavailable:
      "Les données restent fermées jusqu’à validation de la méthode, des sources et des notes.",
    assessmentUnavailable:
      "Les questions et leurs poids ne sont pas encore validés. Aucun résultat à fausse précision ne sera affiché.",
    servicesBody:
      "Les services, prix et conditions ne paraîtront qu’après validation commerciale, juridique et opérationnelle.",
    guidesBody:
      "Les guides révisés réuniront des étapes pratiques et des sources pour chaque pays.",
    coursesBody:
      "Les cours gratuits ouvriront après révision du contenu, des transcriptions et de l’accessibilité.",
    aboutTitle: "Un outil d’information, pas une garantie",
    aboutBody:
      "Cette plateforme aide la communauté haïtienne à comprendre options, sources et limites. Elle ne remplace pas un professionnel autorisé.",
    contactTitle: "Contacter l’équipe",
    contactBody:
      "Le canal public n’est pas encore activé. N’envoyez aucun document, mot de passe, code ou donnée sensible.",
    legalDraft:
      "Ce texte est un espace technique. Il doit être révisé et approuvé avant le lancement public.",
    backToCountry: "Retour au pays"
  },
  es: {
    productName: "Vwayaj Ayisyen",
    reviewBadge: "Revisión obligatoria",
    reviewedOnly: "Fuentes y fechas visibles",
    reviewedOnlyBody:
      "La información sensible se publica solo después de verificar sus fuentes, fechas y límites.",
    plainLanguage: "Lenguaje claro",
    plainLanguageBody: "Resúmenes sencillos y explicaciones completas, sin falsas promesas.",
    privacyFirst: "Privacidad primero",
    privacyFirstBody:
      "No escribas números de pasaporte, documentos ni datos privados en páginas públicas.",
    howTitle: "Cómo debe ayudarte la plataforma",
    howBody:
      "Un recorrido simple para informarte, comparar opciones y pedir ayuda en el momento adecuado.",
    steps: [
      {
        title: "Elige lo que buscas",
        body: "Comienza por un país, una guía o una pregunta sencilla."
      },
      { title: "Verifica la información", body: "Revisa su tipo, fecha y fuente oficial." },
      {
        title: "Prepara el siguiente paso",
        body: "Guarda tu trabajo o habla con una persona cuando el servicio esté aprobado."
      }
    ],
    countriesTitle: "Cuatro países, la misma estructura clara",
    countriesBody:
      "Cada país tiene las mismas secciones. El contenido no verificado queda marcado como en preparación.",
    openCountry: "Abrir la guía del país",
    tableOfContents: "En esta página",
    draftTitle: "Contenido aún no apto para publicación",
    draftBody:
      "La estructura está disponible, pero faltan fuentes primarias, fechas y revisión profesional.",
    draftDetail:
      "No completamos este espacio con asesoría legal, precios ni experiencias comunitarias sin verificar.",
    noSources: "Todavía no hay fuentes aprobadas publicadas para esta sección.",
    compareBody:
      "Elige entre dos y cuatro países. Cada nota debe incluir explicación, fuente y fecha.",
    compareUnavailable:
      "Los datos permanecen cerrados hasta validar método, fuentes y puntuaciones.",
    assessmentUnavailable:
      "Las preguntas y sus pesos no están validados. No mostraremos resultados con falsa precisión.",
    servicesBody:
      "Los servicios, precios y condiciones aparecerán solo tras la aprobación comercial, legal y operativa.",
    guidesBody: "Las guías revisadas reunirán pasos prácticos y fuentes para cada país.",
    coursesBody:
      "Los cursos gratuitos abrirán después de revisar contenido, transcripciones y accesibilidad.",
    aboutTitle: "Una herramienta informativa, no una garantía",
    aboutBody:
      "Esta plataforma ayuda a la comunidad haitiana a comprender opciones, fuentes y límites. No reemplaza a un profesional autorizado.",
    contactTitle: "Contactar al equipo",
    contactBody:
      "El canal público aún no está activo. No envíes documentos, contraseñas, códigos ni datos sensibles.",
    legalDraft:
      "Este texto es un espacio técnico. Debe revisarse y aprobarse antes del lanzamiento público.",
    backToCountry: "Volver al país"
  },
  pt: {
    productName: "Vwayaj Ayisyen",
    reviewBadge: "Revisão obrigatória",
    reviewedOnly: "Fontes e datas visíveis",
    reviewedOnlyBody:
      "Informações sensíveis só são publicadas após a verificação de fontes, datas e limites.",
    plainLanguage: "Linguagem clara",
    plainLanguageBody: "Resumos simples e explicações completas, sem falsas promessas.",
    privacyFirst: "Privacidade primeiro",
    privacyFirstBody:
      "Não informe números de passaporte, documentos ou dados privados em páginas públicas.",
    howTitle: "Como a plataforma deve ajudar você",
    howBody: "Um caminho simples para se informar, comparar opções e pedir ajuda na hora certa.",
    steps: [
      {
        title: "Escolha o que procura",
        body: "Comece por um país, um guia ou uma pergunta simples."
      },
      { title: "Verifique a informação", body: "Confira o tipo, a data e a fonte oficial." },
      {
        title: "Prepare o próximo passo",
        body: "Salve seu trabalho ou fale com alguém quando o serviço estiver aprovado."
      }
    ],
    countriesTitle: "Quatro países, a mesma estrutura clara",
    countriesBody:
      "Cada país tem as mesmas seções. Conteúdo não verificado fica marcado como em preparação.",
    openCountry: "Abrir o guia do país",
    tableOfContents: "Nesta página",
    draftTitle: "Conteúdo ainda não pronto para publicação",
    draftBody:
      "A estrutura está disponível, mas faltam fontes primárias, datas e revisão profissional.",
    draftDetail:
      "Não preenchemos este espaço com orientação jurídica, preços ou relatos comunitários sem verificação.",
    noSources: "Ainda não há fontes aprovadas publicadas para esta seção.",
    compareBody:
      "Escolha de dois a quatro países. Cada nota deve incluir explicação, fonte e data.",
    compareUnavailable:
      "Os dados permanecem fechados até a validação do método, das fontes e das notas.",
    assessmentUnavailable:
      "As perguntas e os pesos ainda não foram validados. Não mostraremos resultados com falsa precisão.",
    servicesBody:
      "Serviços, preços e condições só aparecerão após aprovação comercial, jurídica e operacional.",
    guidesBody: "Os guias revisados reunirão passos práticos e fontes para cada país.",
    coursesBody:
      "Os cursos gratuitos abrirão após revisão de conteúdo, transcrições e acessibilidade.",
    aboutTitle: "Uma ferramenta de informação, não uma garantia",
    aboutBody:
      "A plataforma ajuda a comunidade haitiana a entender opções, fontes e limites. Não substitui um profissional autorizado.",
    contactTitle: "Falar com a equipe",
    contactBody:
      "O canal público ainda não está ativo. Não envie documentos, senhas, códigos ou dados sensíveis.",
    legalDraft:
      "Este texto é um espaço técnico. Deve ser revisado e aprovado antes do lançamento público.",
    backToCountry: "Voltar ao país"
  },
  en: {
    productName: "Vwayaj Ayisyen",
    reviewBadge: "Review required",
    reviewedOnly: "Visible sources and dates",
    reviewedOnlyBody:
      "Sensitive information is published only after its sources, dates and limits are verified.",
    plainLanguage: "Plain language",
    plainLanguageBody: "Easy summaries and full explanations, without false promises.",
    privacyFirst: "Privacy first",
    privacyFirstBody: "Never enter passport numbers, documents or private data on public pages.",
    howTitle: "How the platform should help you",
    howBody: "A simple path to learn, compare options and ask for help at the right time.",
    steps: [
      {
        title: "Choose what you need",
        body: "Start with a country, a guide or a simple question."
      },
      { title: "Check the information", body: "Review its type, date and official source." },
      {
        title: "Prepare the next step",
        body: "Save your work or speak to a person once the service is approved."
      }
    ],
    countriesTitle: "Four countries, one clear structure",
    countriesBody:
      "Each country uses the same sections. Unverified content stays clearly marked as in preparation.",
    openCountry: "Open the country guide",
    tableOfContents: "On this page",
    draftTitle: "Content not ready for publication",
    draftBody:
      "The structure is available, but primary sources, dates and professional review are still required.",
    draftDetail:
      "We do not fill this space with unverified legal guidance, prices or community experiences.",
    noSources: "No approved sources have been published for this section yet.",
    compareBody:
      "Choose two to four countries. Every score must include an explanation, source and date.",
    compareUnavailable: "Data remains closed until the method, sources and scores are validated.",
    assessmentUnavailable:
      "Questions and weights are not yet validated. We will not show a result with false precision.",
    servicesBody:
      "Services, prices and terms will appear only after commercial, legal and operational approval.",
    guidesBody: "Reviewed guides will bring together practical steps and sources for each country.",
    coursesBody:
      "Free courses will open after content, transcripts and accessibility are reviewed.",
    aboutTitle: "An information tool, not a guarantee",
    aboutBody:
      "This platform helps the Haitian community understand options, sources and limits. It does not replace an authorized professional.",
    contactTitle: "Contact the team",
    contactBody:
      "The public channel is not active yet. Do not send documents, passwords, codes or sensitive data.",
    legalDraft:
      "This text is a technical placeholder. It must be reviewed and approved before public launch.",
    backToCountry: "Back to the country"
  }
} satisfies Record<Locale, ProductCopy>;

export function getProductCopy(locale: Locale): ProductCopy {
  return copy[locale];
}
