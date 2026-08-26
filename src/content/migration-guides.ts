import type { CountryCode, Locale } from "@/types/domain";

type LocalizedText = Record<Locale, string>;

export type GuideTone = "caution" | "conditional" | "possible";

export type GuideLink = {
  label: LocalizedText;
  url: string;
};

export type GuidePathway = {
  title: LocalizedText;
  availability: LocalizedText;
  tone: GuideTone;
  summary: LocalizedText;
  action: LocalizedText;
  link: GuideLink;
};

export type GuideLifeArea = {
  title: LocalizedText;
  body: LocalizedText;
  link: GuideLink;
};

export type GuideUpdate = {
  date: string;
  title: LocalizedText;
  body: LocalizedText;
  link: GuideLink;
};

export type CountryMigrationGuide = {
  country: CountryCode;
  tone: GuideTone;
  reviewedAt: string;
  summary: LocalizedText;
  facts: readonly {
    label: LocalizedText;
    value: LocalizedText;
  }[];
  verdict: {
    label: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    points: readonly LocalizedText[];
  };
  pathways: readonly GuidePathway[];
  fromHaiti: {
    intro: LocalizedText;
    steps: readonly LocalizedText[];
  };
  life: readonly GuideLifeArea[];
  irregular: {
    title: LocalizedText;
    body: LocalizedText;
    patterns: readonly LocalizedText[];
    risks: readonly LocalizedText[];
    closing: LocalizedText;
  };
  updates: readonly GuideUpdate[];
};

function text(ht: string, fr: string, es: string, pt: string, en: string): LocalizedText {
  return { ht, fr, es, pt, en };
}

const sharedFacts = {
  capital: text("Kapital", "Capitale", "Capital", "Capital", "Capital"),
  language: text(
    "Lang prensipal",
    "Langue principale",
    "Idioma principal",
    "Idioma principal",
    "Main language"
  ),
  currency: text("Lajan", "Monnaie", "Moneda", "Moeda", "Currency"),
  region: text("Rejyon", "Région", "Región", "Região", "Region")
};

const usa: CountryMigrationGuide = {
  country: "usa",
  tone: "caution",
  reviewedAt: "2026-08-25",
  summary: text(
    "Etazini se yon gwo peyi federal nan Amerik dinò. Gen gwo kominote ayisyèn ladan l, men sa pa vle di tout moun gen menm estati. An 2026, antre ak yon paspò ayisyen vin ekstrèmman limite.",
    "Les États-Unis sont un grand pays fédéral d’Amérique du Nord. Ils comptent d’importantes communautés haïtiennes, mais chaque personne a un statut différent. En 2026, l’entrée avec un passeport haïtien est extrêmement limitée.",
    "Estados Unidos es un gran país federal de América del Norte. Tiene importantes comunidades haitianas, pero cada persona posee un estatus distinto. En 2026, entrar con pasaporte haitiano está extremadamente limitado.",
    "Os Estados Unidos são um grande país federal da América do Norte. Há grandes comunidades haitianas, mas cada pessoa tem uma situação migratória diferente. Em 2026, a entrada com passaporte haitiano está extremamente limitada.",
    "The United States is a large federal country in North America. It has major Haitian communities, but every person has a different status. In 2026, entry on a Haitian passport is extremely limited."
  ),
  facts: [
    {
      label: sharedFacts.capital,
      value: text(
        "Washington, D.C.",
        "Washington, D.C.",
        "Washington, D. C.",
        "Washington, D.C.",
        "Washington, D.C."
      )
    },
    { label: sharedFacts.language, value: text("Anglè", "Anglais", "Inglés", "Inglês", "English") },
    {
      label: sharedFacts.currency,
      value: text(
        "Dola ameriken (USD)",
        "Dollar américain (USD)",
        "Dólar estadounidense (USD)",
        "Dólar americano (USD)",
        "U.S. dollar (USD)"
      )
    },
    {
      label: sharedFacts.region,
      value: text(
        "Amerik dinò",
        "Amérique du Nord",
        "América del Norte",
        "América do Norte",
        "North America"
      )
    }
  ],
  verdict: {
    label: text(
      "Trè limite an 2026",
      "Très limité en 2026",
      "Muy limitado en 2026",
      "Muito limitado em 2026",
      "Highly limited in 2026"
    ),
    title: text(
      "Pou pifò moun ki nan Ayiti ak yon paspò ayisyen, pa gen yon nouvo wout viza nòmal kounye a.",
      "Pour la plupart des personnes en Haïti munies d’un passeport haïtien, il n’existe actuellement pas de voie normale pour un nouveau visa.",
      "Para la mayoría de las personas en Haití con pasaporte haitiano, actualmente no hay una vía normal para obtener una visa nueva.",
      "Para a maioria das pessoas no Haiti com passaporte haitiano, atualmente não há uma via normal para obter um novo visto.",
      "For most people in Haiti with a Haitian passport, there is currently no normal route to a new visa."
    ),
    body: text(
      "Pwoklamasyon 10998 sispann emisyon viza imigran ak viza tanporè pou sitwayen ayisyen depi 1ye janvye 2026, sof kèk eksepsyon ki etwat. Ou ka depoze yon demann oswa ale nan entèvyou, men sa pa vle di yo kapab bay viza a.",
      "La proclamation 10998 suspend depuis le 1er janvier 2026 la délivrance des visas immigrants et temporaires aux ressortissants haïtiens, sauf exceptions étroites. Une demande ou un entretien peut rester possible sans que le visa puisse être délivré.",
      "La Proclamación 10998 suspendió desde el 1 de enero de 2026 la emisión de visas de inmigrante y temporales a nacionales haitianos, salvo excepciones limitadas. Poder solicitar o asistir a una entrevista no significa que la visa pueda emitirse.",
      "A Proclamação 10998 suspendeu desde 1º de janeiro de 2026 a emissão de vistos de imigrante e temporários a cidadãos haitianos, salvo exceções restritas. Poder solicitar ou comparecer à entrevista não significa que o visto possa ser emitido.",
      "Proclamation 10998 suspended immigrant and nonimmigrant visa issuance to Haitian nationals from January 1, 2026, subject to narrow exceptions. Being able to apply or attend an interview does not mean a visa can be issued."
    ),
    points: [
      text(
        "Yon viza ki te deja valab anvan 1ye janvye 2026 pa t revoke sèlman poutèt pwoklamasyon an; ajan fwontyè a toujou pran desizyon final sou admisyon.",
        "Un visa déjà valable avant le 1er janvier 2026 n’a pas été révoqué uniquement par cette proclamation; l’agent à la frontière décide toujours de l’admission.",
        "Una visa que ya era válida antes del 1 de enero de 2026 no fue revocada solo por la proclamación; el agente fronterizo sigue decidiendo la admisión.",
        "Um visto já válido antes de 1º de janeiro de 2026 não foi revogado apenas pela proclamação; o agente de fronteira continua decidindo a admissão.",
        "A visa already valid before January 1, 2026 was not revoked solely by the proclamation; a border officer still decides admission."
      ),
      text(
        "Eksepsyon yo gen ladan kèk diplomat, rezidan pèmanan, doub nasyonalite k ap sèvi ak yon paspò ki pa restrenn, ak kèk ka espesyal oswa enterè nasyonal.",
        "Les exceptions couvrent notamment certains diplomates, résidents permanents, doubles nationaux utilisant un passeport non restreint et certains cas spéciaux ou d’intérêt national.",
        "Las excepciones incluyen a ciertos diplomáticos, residentes permanentes, dobles nacionales que usan un pasaporte no restringido y algunos casos especiales o de interés nacional.",
        "As exceções incluem certos diplomatas, residentes permanentes, pessoas com dupla nacionalidade usando passaporte não restrito e alguns casos especiais ou de interesse nacional.",
        "Exceptions include certain diplomats, permanent residents, dual nationals using an unrestricted passport, and some special or national-interest cases."
      ),
      text(
        "Sèvis viza nòmal nan Pòtoprens rete sispann. Transfere yon dosye nan yon lòt anbasad mande pou ou kapab antre epi rete legalman nan peyi sa a.",
        "Les services ordinaires de visa à Port-au-Prince restent suspendus. Le transfert d’un dossier vers une autre ambassade suppose de pouvoir entrer et rester légalement dans ce pays.",
        "Los servicios rutinarios de visa en Puerto Príncipe siguen suspendidos. Transferir un caso a otra embajada exige poder entrar y permanecer legalmente en ese país.",
        "Os serviços rotineiros de visto em Porto Príncipe continuam suspensos. Transferir um caso para outra embaixada exige poder entrar e permanecer legalmente nesse país.",
        "Routine visa services in Port-au-Prince remain suspended. Moving a case to another embassy requires lawful entry and stay in that country."
      ),
      text(
        "Kontwòl imigrasyon, arestasyon ak depòtasyon ap fèt an 2026. Si ou deja Ozetazini san yon estati ki klè, pa rate okenn odyans epi chèche yon avoka oswa reprezantan ki akredite.",
        "Les contrôles, arrestations et expulsions se poursuivent en 2026. Si vous êtes déjà aux États-Unis sans statut clair, ne manquez aucune audience et cherchez un avocat ou représentant accrédité.",
        "Los controles migratorios, arrestos y deportaciones continúan en 2026. Si ya estás en Estados Unidos sin un estatus claro, no faltes a ninguna audiencia y busca un abogado o representante acreditado.",
        "Fiscalizações migratórias, prisões e deportações continuam em 2026. Se já está nos Estados Unidos sem status claro, não falte a audiências e procure advogado ou representante credenciado.",
        "Immigration enforcement, arrests and removals continue in 2026. If already in the United States without clear status, do not miss any hearing and seek an attorney or accredited representative."
      )
    ]
  },
  pathways: [
    {
      title: text(
        "Viza ki deja valab oswa eksepsyon",
        "Visa déjà valable ou exception",
        "Visa ya válida o excepción",
        "Visto já válido ou exceção",
        "Existing valid visa or exception"
      ),
      availability: text(
        "Ka pa ka",
        "Au cas par cas",
        "Caso por caso",
        "Caso a caso",
        "Case by case"
      ),
      tone: "conditional",
      summary: text(
        "Sa se premye bagay pou verifye. Yon ansyen viza, rezidans pèmanan, doub nasyonalite oswa yon eksepsyon espesifik ka chanje analiz la.",
        "C’est le premier point à vérifier. Un visa antérieur, la résidence permanente, une double nationalité ou une exception précise peuvent changer l’analyse.",
        "Es lo primero que debes comprobar. Una visa anterior, residencia permanente, doble nacionalidad o una excepción concreta pueden cambiar el análisis.",
        "É o primeiro ponto a verificar. Visto anterior, residência permanente, dupla nacionalidade ou exceção específica podem mudar a análise.",
        "Check this first. A previous visa, permanent residence, dual nationality or a specific exception may change the analysis."
      ),
      action: text(
        "Li avi 2026 la, konpare sitiyasyon ou ak eksepsyon yo, epi mande yon avoka oswa reprezantan akredite si gen dout anvan ou achte tikè.",
        "Lisez l’avis 2026, comparez votre situation aux exceptions et consultez un avocat ou représentant accrédité avant d’acheter un billet.",
        "Lee el aviso de 2026, compara tu situación con las excepciones y consulta a un abogado o representante acreditado antes de comprar el pasaje.",
        "Leia o aviso de 2026, compare sua situação com as exceções e consulte advogado ou representante credenciado antes de comprar passagem.",
        "Read the 2026 notice, compare your situation with the exceptions, and consult an attorney or accredited representative before buying a ticket."
      ),
      link: {
        label: text(
          "Li restriksyon 2026 la",
          "Lire la restriction de 2026",
          "Leer la restricción de 2026",
          "Ler a restrição de 2026",
          "Read the 2026 restriction"
        ),
        url: "https://travel.state.gov/content/travel/en/News/visas-news/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-security-of-the-united-states.html"
      }
    },
    {
      title: text("Fanmi", "Famille", "Familia", "Família", "Family"),
      availability: text(
        "Kategori a egziste, men viza a bloke pou pifò moun",
        "La catégorie existe, mais le visa est bloqué pour la plupart",
        "La categoría existe, pero la visa está bloqueada para la mayoría",
        "A categoria existe, mas o visto está bloqueado para a maioria",
        "Category exists, but visas are blocked for most"
      ),
      tone: "caution",
      summary: text(
        "Yon fanmi ameriken oswa rezidan kapab toujou gen yon petisyon fanmi. Men yon petisyon apwouve pa yon viza, epi eksepsyon otomatik pou fanmi pwòch yo pa nan règ 2026 la ankò.",
        "Un citoyen ou résident américain peut toujours avoir une pétition familiale. Mais une pétition approuvée n’est pas un visa et l’exception automatique pour la famille proche a disparu du texte de 2026.",
        "Un ciudadano o residente puede seguir teniendo una petición familiar. Pero una petición aprobada no es una visa y la excepción automática para familiares inmediatos desapareció en 2026.",
        "Um cidadão ou residente pode continuar com petição familiar. Porém, petição aprovada não é visto e a exceção automática para familiares imediatos saiu da regra de 2026.",
        "A U.S. citizen or resident may still have a family petition. But an approved petition is not a visa, and the automatic immediate-family exception was removed in 2026."
      ),
      action: text(
        "Kenbe dosye a ajou, suiv enstriksyon NVC oswa USCIS, epi verifye si yon eksepsyon reyèl aplike anvan ou planifye vwayaj la.",
        "Gardez le dossier à jour, suivez les instructions du NVC ou de l’USCIS et vérifiez si une véritable exception s’applique avant de planifier le voyage.",
        "Mantén el caso actualizado, sigue las instrucciones de NVC o USCIS y confirma si aplica una excepción real antes de planear el viaje.",
        "Mantenha o processo atualizado, siga NVC ou USCIS e confirme se uma exceção real se aplica antes de planejar a viagem.",
        "Keep the case current, follow NVC or USCIS instructions, and confirm whether a real exception applies before planning travel."
      ),
      link: {
        label: text(
          "Gade kategori fanmi yo",
          "Voir les catégories familiales",
          "Ver categorías familiares",
          "Ver categorias familiares",
          "View family categories"
        ),
        url: "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration.html"
      }
    },
    {
      title: text("Etid", "Études", "Estudios", "Estudos", "Study"),
      availability: text(
        "Pa yon wout pratik kounye a",
        "Pas une voie praticable actuellement",
        "No es una vía práctica ahora",
        "Não é uma via prática agora",
        "Not a practical route now"
      ),
      tone: "caution",
      summary: text(
        "Yon lekòl ki sètifye ka bay I-20 apre admisyon ak prèv finans. Men sa pa retire sispansyon viza F oswa M pou yon sitwayen ayisyen.",
        "Une école certifiée peut délivrer un I-20 après admission et preuve de ressources. Cela ne lève pas la suspension des visas F ou M pour un ressortissant haïtien.",
        "Una escuela certificada puede emitir el I-20 tras la admisión y la prueba de fondos. Eso no elimina la suspensión de visas F o M para un nacional haitiano.",
        "Uma escola certificada pode emitir o I-20 após admissão e prova financeira. Isso não elimina a suspensão dos vistos F ou M para cidadão haitiano.",
        "A certified school may issue an I-20 after admission and proof of funds. That does not remove the F or M visa suspension for a Haitian national."
      ),
      action: text(
        "Pa peye gwo depo san ou pa li politik ranbousman lekòl la epi verifye restriksyon viza a an premye.",
        "Ne versez pas de dépôt important sans lire la politique de remboursement de l’école et vérifier d’abord la restriction de visa.",
        "No pagues depósitos grandes sin leer la política de reembolso de la escuela y verificar primero la restricción de visa.",
        "Não pague grandes depósitos sem ler a política de reembolso da escola e verificar primeiro a restrição de visto.",
        "Do not pay a large deposit without reading the school’s refund policy and checking the visa restriction first."
      ),
      link: {
        label: text(
          "Chèche lekòl sètifye",
          "Chercher une école certifiée",
          "Buscar escuelas certificadas",
          "Buscar escolas certificadas",
          "Search certified schools"
        ),
        url: "https://studyinthestates.dhs.gov/school-search"
      }
    },
    {
      title: text("Travay", "Travail", "Trabajo", "Trabalho", "Work"),
      availability: text(
        "Anplwayè nesesè; viza yo jeneralman sispann",
        "Employeur requis; visas généralement suspendus",
        "Se necesita empleador; visas generalmente suspendidas",
        "Empregador necessário; vistos geralmente suspensos",
        "Employer required; visas generally suspended"
      ),
      tone: "caution",
      summary: text(
        "Yon òf travay poukont li pa bay dwa antre. Pifò kategori mande yon anplwayè ki fè petisyon, otorizasyon apwouve epi yon viza ki koresponn.",
        "Une offre d’emploi seule ne donne aucun droit d’entrée. La plupart des catégories exigent une pétition de l’employeur, une autorisation et le visa correspondant.",
        "Una oferta de trabajo por sí sola no permite entrar. La mayoría de categorías exige petición del empleador, aprobación y la visa correspondiente.",
        "Uma oferta de emprego sozinha não permite entrar. A maioria das categorias exige petição do empregador, aprovação e o visto correspondente.",
        "A job offer alone does not grant entry. Most categories require an employer petition, approval and the matching visa."
      ),
      action: text(
        "Pa peye yon moun pou yon “kontra garanti”. Verifye anplwayè a, petisyon an ak kapasite pou resevwa viza a anvan nenpòt depans.",
        "Ne payez personne pour un « contrat garanti ». Vérifiez l’employeur, la pétition et la possibilité réelle d’obtenir le visa avant toute dépense.",
        "No pagues por un “contrato garantizado”. Verifica al empleador, la petición y la posibilidad real de recibir la visa antes de gastar.",
        "Não pague por “contrato garantido”. Verifique empregador, petição e possibilidade real de receber o visto antes de gastar.",
        "Do not pay for a “guaranteed contract.” Verify the employer, petition and real ability to receive the visa before spending money."
      ),
      link: {
        label: text(
          "Konprann travay legal",
          "Comprendre le travail légal",
          "Entender el trabajo legal",
          "Entender o trabalho legal",
          "Understand lawful work"
        ),
        url: "https://www.uscis.gov/working-in-the-united-states"
      }
    },
    {
      title: text(
        "Pwoteksyon pou moun ki deja Ozetazini",
        "Protection pour les personnes déjà aux États-Unis",
        "Protección para quienes ya están en EE. UU.",
        "Proteção para quem já está nos EUA",
        "Protection for people already in the U.S."
      ),
      availability: text(
        "Sèlman selon istwa pèsonèl la",
        "Uniquement selon l’histoire personnelle",
        "Solo según la historia personal",
        "Somente conforme a história pessoal",
        "Only based on the individual case"
      ),
      tone: "conditional",
      summary: text(
        "Azil se pa yon viza pou kite Ayiti. Se yon demann pwoteksyon pou yon moun ki deja Ozetazini epi ki ka montre risk ki antre nan definisyon legal la; an jeneral gen yon delè yon ane pou depoze.",
        "L’asile n’est pas un visa pour quitter Haïti. C’est une protection pour une personne déjà aux États-Unis pouvant démontrer un risque relevant de la définition légale; le dépôt se fait généralement dans l’année.",
        "El asilo no es una visa para salir de Haití. Es protección para alguien que ya está en Estados Unidos y puede demostrar un riesgo dentro de la definición legal; por regla general se solicita dentro de un año.",
        "Asilo não é visto para sair do Haiti. É proteção para quem já está nos Estados Unidos e consegue demonstrar risco dentro da definição legal; em geral deve ser pedido em um ano.",
        "Asylum is not a visa for leaving Haiti. It is protection for someone already in the United States who can show risk within the legal definition; filing is generally required within one year."
      ),
      action: text(
        "Pa suiv konsèy notè oswa ajans vwayaj. Chèche yon avoka oswa yon reprezantan EOIR akredite epi pa rate odyans oswa avi adrès.",
        "Ne suivez pas les conseils d’un notaire ou d’une agence de voyage. Cherchez un avocat ou représentant accrédité par l’EOIR et ne manquez aucune audience ni mise à jour d’adresse.",
        "No sigas consejos de notarios o agencias de viaje. Busca un abogado o representante acreditado por EOIR y no faltes a audiencias ni avisos de cambio de dirección.",
        "Não siga conselho de notário ou agência de viagem. Procure advogado ou representante credenciado pela EOIR e não perca audiências nem atualizações de endereço.",
        "Do not rely on a notario or travel agent. Find an attorney or EOIR-accredited representative and do not miss hearings or address updates."
      ),
      link: {
        label: text(
          "Jwenn èd legal otorize",
          "Trouver une aide juridique autorisée",
          "Encontrar ayuda legal autorizada",
          "Encontrar ajuda jurídica autorizada",
          "Find authorized legal help"
        ),
        url: "https://www.justice.gov/eoir/find-legal-representation"
      }
    }
  ],
  fromHaiti: {
    intro: text(
      "Pa kòmanse ak tikè avyon. Kòmanse ak kesyon sa a: ki dokiman egzak ki ta pèmèt yo bay mwen yon viza oswa admèt mwen an 2026?",
      "Ne commencez pas par le billet d’avion. Commencez par cette question: quel document précis permettrait qu’un visa me soit délivré ou que je sois admis en 2026?",
      "No empieces por el pasaje. Empieza con esta pregunta: ¿qué documento exacto permitiría que me emitan una visa o me admitan en 2026?",
      "Não comece pela passagem. Comece por esta pergunta: qual documento exato permitiria emitir meu visto ou admitir minha entrada em 2026?",
      "Do not start with an airline ticket. Start with this question: what exact document would allow a visa to be issued or admission in 2026?"
    ),
    steps: [
      text(
        "Fè oswa renouvle paspò ayisyen an nan DIE; verifye validite li pou tout dire plan an.",
        "Demandez ou renouvelez le passeport haïtien auprès de la DIE et vérifiez sa validité pour tout le projet.",
        "Solicita o renueva el pasaporte haitiano en la DIE y comprueba su validez para todo el plan.",
        "Solicite ou renove o passaporte haitiano na DIE e confira sua validade para todo o plano.",
        "Apply for or renew the Haitian passport through DIE and check its validity for the whole plan."
      ),
      text(
        "Li restriksyon 2026 la epi idantifye, ak prèv, si yon eksepsyon konsène ou.",
        "Lisez la restriction de 2026 et identifiez, preuves à l’appui, si une exception vous concerne.",
        "Lee la restricción de 2026 e identifica, con pruebas, si alguna excepción te corresponde.",
        "Leia a restrição de 2026 e identifique, com provas, se alguma exceção se aplica.",
        "Read the 2026 restriction and identify, with evidence, whether an exception applies."
      ),
      text(
        "Si ou gen yon dosye deja, sèvi ak nimewo dosye a pou kontakte NVC, USCIS oswa anbasad ki responsab la.",
        "Si vous avez déjà un dossier, utilisez son numéro pour contacter le NVC, l’USCIS ou l’ambassade responsable.",
        "Si ya tienes un caso, usa su número para contactar a NVC, USCIS o la embajada responsable.",
        "Se já tem processo, use o número para contatar NVC, USCIS ou a embaixada responsável.",
        "If you already have a case, use its number to contact NVC, USCIS or the responsible embassy."
      ),
      text(
        "Pa vwayaje nan yon twazyèm peyi pou entèvyou si ou pa gen dwa antre epi rete ladan l legalman.",
        "Ne voyagez pas dans un pays tiers pour un entretien sans droit d’y entrer et d’y séjourner légalement.",
        "No viajes a un tercer país para una entrevista si no puedes entrar y permanecer allí legalmente.",
        "Não viaje a terceiro país para entrevista sem poder entrar e permanecer legalmente.",
        "Do not travel to a third country for an interview unless you can lawfully enter and remain there."
      ),
      text(
        "Achte tikè sèlman apre ou gen dokiman vwayaj ki valab epi konpayi avyon an konfime kondisyon tranzit yo.",
        "Achetez le billet seulement après avoir les documents de voyage valables et confirmation des règles de transit par la compagnie.",
        "Compra el pasaje solo cuando tengas documentos válidos y la aerolínea confirme los requisitos de tránsito.",
        "Compre passagem somente com documentos válidos e após a companhia confirmar as regras de trânsito.",
        "Buy a ticket only after you have valid travel documents and the airline confirms transit requirements."
      )
    ]
  },
  life: [
    {
      title: text(
        "Dokiman ak estati",
        "Documents et statut",
        "Documentos y estatus",
        "Documentos e status",
        "Documents and status"
      ),
      body: text(
        "Kenbe I-94, avi USCIS, pèmi travay ak papye tribinal yo separe. Verifye dat ekspirasyon yo epi mete adrès ou ajou ak chak otorite ki gen dosye ou.",
        "Conservez séparément l’I-94, les avis USCIS, le permis de travail et les documents du tribunal. Vérifiez les échéances et mettez votre adresse à jour auprès de chaque autorité.",
        "Guarda por separado I-94, avisos de USCIS, permiso de trabajo y documentos de corte. Revisa vencimientos y actualiza tu dirección con cada autoridad.",
        "Guarde separadamente I-94, avisos do USCIS, autorização de trabalho e documentos do tribunal. Confira vencimentos e atualize o endereço em cada órgão.",
        "Keep I-94, USCIS notices, work authorization and court papers separately. Check expiration dates and update your address with every authority handling your case."
      ),
      link: {
        label: text("Ale nan I-94", "Ouvrir I-94", "Abrir I-94", "Abrir I-94", "Open I-94"),
        url: "https://i94.cbp.dhs.gov/"
      }
    },
    {
      title: text(
        "Chèche travay",
        "Chercher du travail",
        "Buscar trabajo",
        "Buscar trabalho",
        "Find work"
      ),
      body: text(
        "Sèvi ak CareerOneStop sèlman si estati ou deja pèmèt ou travay. Yon anplwayè pa dwe pran yon pèmi travay ki pa valab kòm prèv.",
        "Utilisez CareerOneStop uniquement si votre statut vous autorise déjà à travailler. Un employeur ne peut pas traiter un permis expiré comme valable.",
        "Usa CareerOneStop solo si tu estatus ya te autoriza a trabajar. Un empleador no puede tratar un permiso vencido como válido.",
        "Use CareerOneStop somente se seu status já autoriza trabalhar. Empregador não pode tratar autorização vencida como válida.",
        "Use CareerOneStop only if your status already authorizes work. An employer cannot treat expired authorization as valid."
      ),
      link: {
        label: text(
          "Chèche travay ofisyèl",
          "Chercher un emploi",
          "Buscar empleos",
          "Buscar empregos",
          "Search jobs"
        ),
        url: "https://www.careeronestop.org/JobSearch/job-search.aspx"
      }
    },
    {
      title: text("Etid", "Études", "Estudios", "Estudos", "Study"),
      body: text(
        "Yon admisyon lekòl pa regilarize estati ou. Verifye lekòl la, kalite estati etid la ak dwa travay la anvan enskripsyon.",
        "Une admission scolaire ne régularise pas le statut. Vérifiez l’école, le statut d’étudiant et le droit au travail avant l’inscription.",
        "Una admisión escolar no regulariza tu estatus. Verifica la escuela, la condición de estudiante y el permiso de trabajo antes de inscribirte.",
        "Admissão escolar não regulariza status. Verifique escola, condição de estudante e direito ao trabalho antes de se matricular.",
        "School admission does not regularize status. Check the school, student status and work permission before enrolling."
      ),
      link: {
        label: text(
          "Verifye yon lekòl",
          "Vérifier une école",
          "Verificar una escuela",
          "Verificar uma escola",
          "Verify a school"
        ),
        url: "https://studyinthestates.dhs.gov/school-search"
      }
    },
    {
      title: text(
        "Dosye devan tribinal",
        "Dossier au tribunal",
        "Caso ante la corte",
        "Processo no tribunal",
        "Court case"
      ),
      body: text(
        "Tcheke dat odyans lan dirèkteman nan EOIR. Yon aplikasyon ki annatant pa anile yon odyans, epi absans ka mennen nan yon lòd depòtasyon.",
        "Vérifiez directement la date d’audience auprès de l’EOIR. Une demande en attente n’annule pas une audience et l’absence peut entraîner une décision d’expulsion.",
        "Comprueba la audiencia directamente en EOIR. Una solicitud pendiente no cancela una audiencia y faltar puede producir una orden de expulsión.",
        "Confira a audiência diretamente na EOIR. Pedido pendente não cancela audiência e a ausência pode gerar ordem de remoção.",
        "Check hearing dates directly with EOIR. A pending application does not cancel a hearing, and missing it can lead to a removal order."
      ),
      link: {
        label: text(
          "Tcheke dosye EOIR",
          "Vérifier le dossier EOIR",
          "Consultar caso EOIR",
          "Consultar processo EOIR",
          "Check EOIR case"
        ),
        url: "https://acis.eoir.justice.gov/en/"
      }
    }
  ],
  irregular: {
    title: text(
      "Sa yo rele “wout la” pa yon pwogram imigrasyon",
      "Ce que l’on appelle « la route » n’est pas un programme d’immigration",
      "Lo que llaman “la ruta” no es un programa migratorio",
      "O que chamam de “rota” não é programa migratório",
      "What people call “the route” is not an immigration program"
    ),
    body: text(
      "Gen moun ki pale de vwayaj lanmè nan Karayib la oswa de yon long deplasman atravè Amerik di Sid, Darién, Amerik Santral ak Meksik pou rive sou fwontyè Etazini. An 2026 sa pa bay yon randevou, yon parole, yon viza oswa garanti pou mande azil.",
      "Certaines personnes parlent de traversées maritimes dans les Caraïbes ou d’un long parcours par l’Amérique du Sud, le Darién, l’Amérique centrale et le Mexique jusqu’à la frontière américaine. En 2026, cela ne donne ni rendez-vous, ni parole, ni visa, ni garantie d’asile.",
      "Algunas personas hablan de viajes por mar en el Caribe o de un trayecto largo por Sudamérica, Darién, Centroamérica y México hasta la frontera de Estados Unidos. En 2026 eso no da cita, parole, visa ni garantía de asilo.",
      "Algumas pessoas falam de viagens marítimas no Caribe ou de um longo trajeto pela América do Sul, Darién, América Central e México até a fronteira dos EUA. Em 2026 isso não dá agendamento, parole, visto nem garantia de asilo.",
      "People discuss Caribbean sea journeys or a long trip through South America, the Darién, Central America and Mexico to the U.S. border. In 2026 that provides no appointment, parole, visa or guarantee of asylum."
    ),
    patterns: [
      text(
        "Vwayaj lanmè nan Karayib la gen risk nwaye, disparisyon, entèsepsyon ak retou.",
        "Les voyages maritimes dans les Caraïbes comportent des risques de noyade, disparition, interception et retour.",
        "Los viajes marítimos en el Caribe implican riesgo de ahogamiento, desaparición, intercepción y devolución.",
        "Viagens marítimas no Caribe envolvem risco de afogamento, desaparecimento, interceptação e retorno.",
        "Caribbean sea journeys carry risks of drowning, disappearance, interception and return."
      ),
      text(
        "Koridò tè atravè plizyè peyi mande otorizasyon pou chak fwontyè; antre nan yon peyi pa bay dwa antre nan pwochen an.",
        "Un parcours terrestre par plusieurs pays exige une autorisation à chaque frontière; l’entrée dans un pays n’autorise pas l’entrée dans le suivant.",
        "Un corredor terrestre por varios países exige autorización en cada frontera; entrar en un país no autoriza entrar en el siguiente.",
        "Corredor terrestre por vários países exige autorização em cada fronteira; entrar em um país não autoriza entrar no próximo.",
        "A land corridor across several countries requires permission at every border; entry to one country does not authorize entry to the next."
      ),
      text(
        "Darién rete yon zòn ekstrèmman danjere, menm si kantite moun k ap pase la bese anpil depi 2025.",
        "Le Darién reste extrêmement dangereux, même si le nombre de passages a fortement diminué depuis 2025.",
        "Darién sigue siendo extremadamente peligroso aunque los cruces hayan disminuido mucho desde 2025.",
        "Darién continua extremamente perigoso, mesmo com forte queda nas travessias desde 2025.",
        "The Darién remains extremely dangerous even though crossings have fallen sharply since 2025."
      )
    ],
    risks: [
      text(
        "detansyon oswa depòtasyon",
        "détention ou expulsion",
        "detención o deportación",
        "detenção ou deportação",
        "detention or removal"
      ),
      text(
        "vòl, ekstòsyon ak trafik moun",
        "vol, extorsion et traite",
        "robo, extorsión y trata",
        "roubo, extorsão e tráfico",
        "robbery, extortion and trafficking"
      ),
      text(
        "lanmò, blesi, dezidratasyon ak mank swen",
        "mort, blessures, déshydratation et absence de soins",
        "muerte, lesiones, deshidratación y falta de atención",
        "morte, ferimentos, desidratação e falta de atendimento",
        "death, injury, dehydration and lack of care"
      ),
      text(
        "konsekans ki ka fè viza oswa retou legal pi difisil pita",
        "conséquences pouvant compliquer un futur visa ou retour légal",
        "consecuencias que pueden dificultar una visa o regreso legal futuro",
        "consequências que podem dificultar visto ou retorno legal no futuro",
        "consequences that may make a future visa or lawful return harder"
      )
    ],
    closing: text(
      "Nou pa bay pwen travèse, transpò, kontak oswa metòd pou evite kontwòl. Pi bon etap la se verifye yon wout legal anvan ou kite Ayiti.",
      "Nous ne donnons ni points de passage, ni transport, ni contacts, ni méthodes pour éviter les contrôles. Vérifiez une voie légale avant de quitter Haïti.",
      "No damos puntos de cruce, transporte, contactos ni métodos para evadir controles. Verifica una vía legal antes de salir de Haití.",
      "Não fornecemos pontos de travessia, transporte, contatos nem métodos para evitar controles. Verifique uma via legal antes de sair do Haiti.",
      "We do not provide crossing points, transportation, contacts or methods to evade controls. Verify a lawful route before leaving Haiti."
    )
  },
  updates: [
    {
      date: "2026-01-01",
      title: text(
        "Nouvo sispansyon viza pou sitwayen ayisyen",
        "Nouvelle suspension des visas pour les ressortissants haïtiens",
        "Nueva suspensión de visas para nacionales haitianos",
        "Nova suspensão de vistos para cidadãos haitianos",
        "New visa suspension for Haitian nationals"
      ),
      body: text(
        "Pwoklamasyon 10998 mete Ayiti anba yon sispansyon konplè pou pifò viza imigran ak tanporè, ak kèk eksepsyon limite.",
        "La proclamation 10998 place Haïti sous suspension complète pour la plupart des visas immigrants et temporaires, avec quelques exceptions limitées.",
        "La Proclamación 10998 aplica a Haití una suspensión completa para la mayoría de visas de inmigrante y temporales, con excepciones limitadas.",
        "A Proclamação 10998 aplica ao Haiti suspensão completa para a maioria dos vistos de imigrante e temporários, com exceções limitadas.",
        "Proclamation 10998 places Haiti under a full suspension for most immigrant and nonimmigrant visas, with limited exceptions."
      ),
      link: {
        label: text(
          "Li avi ofisyèl la",
          "Lire l’avis officiel",
          "Leer aviso oficial",
          "Ler aviso oficial",
          "Read official notice"
        ),
        url: "https://travel.state.gov/content/travel/en/News/visas-news/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-security-of-the-united-states.html"
      }
    },
    {
      date: "2025-06-12",
      title: text(
        "Pwogram CHNV la fini",
        "Le programme CHNV est terminé",
        "El programa CHNV terminó",
        "O programa CHNV terminou",
        "The CHNV program ended"
      ),
      body: text(
        "Pwogram parole prezidan Biden te mete pou Kiba, Ayiti, Nikaragwa ak Venezyela pa resevwa nouvo moun ankò. Li pa yon fason pou soti Ayiti an 2026.",
        "Le programme de parole créé sous le président Biden pour Cuba, Haïti, le Nicaragua et le Venezuela n’accepte plus de nouveaux bénéficiaires. Ce n’est pas une voie de départ d’Haïti en 2026.",
        "El programa de parole creado durante la presidencia de Biden para Cuba, Haití, Nicaragua y Venezuela ya no recibe nuevos beneficiarios. No es una vía para salir de Haití en 2026.",
        "O programa de parole criado durante a presidência de Biden para Cuba, Haiti, Nicarágua e Venezuela não recebe novos beneficiários. Não é uma via para sair do Haiti em 2026.",
        "The parole program created under President Biden for Cuba, Haiti, Nicaragua and Venezuela no longer accepts new beneficiaries. It is not a route out of Haiti in 2026."
      ),
      link: {
        label: text(
          "Verifye fen CHNV la",
          "Vérifier la fin de CHNV",
          "Verificar el fin de CHNV",
          "Verificar o fim do CHNV",
          "Verify CHNV termination"
        ),
        url: "https://i94.cbp.dhs.gov/help"
      }
    },
    {
      date: "2026-08-07",
      title: text(
        "TPS Ayiti fini apre desizyon tribinal 2026 yo",
        "Le TPS Haïti a pris fin après les décisions judiciaires de 2026",
        "El TPS de Haití terminó tras las decisiones judiciales de 2026",
        "O TPS do Haiti terminou após decisões judiciais de 2026",
        "Haiti TPS ended after 2026 court decisions"
      ),
      body: text(
        "TPS pa t janm yon viza pou antre Etazini. Aprè Kou Siprèm lan leve blokaj tribinal la, fen TPS Ayiti a te kapab antre an aplikasyon. Yon lòt dosye, tankou azil, dwe evalye apa.",
        "Le TPS n’a jamais été un visa d’entrée. Après la levée du blocage judiciaire par la Cour suprême, la fin du TPS Haïti a pu prendre effet. Un autre dossier, comme l’asile, doit être évalué séparément.",
        "TPS nunca fue una visa para entrar a Estados Unidos. Después de que la Corte Suprema levantó el bloqueo judicial, la terminación del TPS de Haití pudo entrar en vigor. Otro caso, como asilo, debe evaluarse por separado.",
        "TPS nunca foi visto para entrar nos Estados Unidos. Depois que a Suprema Corte derrubou o bloqueio judicial, o encerramento do TPS do Haiti pôde entrar em vigor. Outro processo, como asilo, precisa ser avaliado separadamente.",
        "TPS was never a visa for entering the United States. After the Supreme Court lifted the judicial block, the termination of Haiti TPS could take effect. Another case, such as asylum, must be evaluated separately."
      ),
      link: {
        label: text(
          "Li mizajou ofisyèl la",
          "Lire la mise à jour officielle",
          "Leer la actualización oficial",
          "Ler a atualização oficial",
          "Read the official update"
        ),
        url: "https://www.justice.gov/usao-dc/pr/usao-dcs-civil-division-earns-supreme-court-victory-miot-v-trump"
      }
    }
  ]
};

const chile: CountryMigrationGuide = {
  country: "chile",
  tone: "possible",
  reviewedAt: "2026-08-25",
  summary: text(
    "Chili se yon peyi long sou kòt Pasifik Amerik di Sid, ak kapital li Santiago. Panyòl se lang lavi chak jou. Pou yon moun ayisyen, li posib pou bati yon plan legal, men viza oswa rezidans ki koresponn lan dwe prepare anvan depa a nan pifò ka.",
    "Le Chili est un long pays de la côte pacifique sud-américaine, dont la capitale est Santiago. L’espagnol est la langue quotidienne. Un projet légal est possible pour une personne haïtienne, mais le visa ou la résidence correspondante se prépare généralement avant le départ.",
    "Chile es un país largo de la costa del Pacífico sudamericano, con capital en Santiago. El español es el idioma cotidiano. Para una persona haitiana es posible construir un plan legal, pero normalmente debe preparar la visa o residencia correcta antes de salir.",
    "O Chile é um país longo na costa do Pacífico sul-americano, com capital em Santiago. O espanhol é o idioma cotidiano. É possível montar um plano legal para uma pessoa haitiana, mas em geral o visto ou residência corretos devem ser preparados antes da saída.",
    "Chile is a long country on South America’s Pacific coast, with Santiago as its capital. Spanish is the everyday language. A Haitian national can build a lawful plan, but the correct visa or residence normally must be prepared before departure."
  ),
  facts: [
    {
      label: sharedFacts.capital,
      value: text("Santiago", "Santiago", "Santiago", "Santiago", "Santiago")
    },
    {
      label: sharedFacts.language,
      value: text("Panyòl", "Espagnol", "Español", "Espanhol", "Spanish")
    },
    {
      label: sharedFacts.currency,
      value: text(
        "Peso chilyen (CLP)",
        "Peso chilien (CLP)",
        "Peso chileno (CLP)",
        "Peso chileno (CLP)",
        "Chilean peso (CLP)"
      )
    },
    {
      label: sharedFacts.region,
      value: text(
        "Amerik di Sid",
        "Amérique du Sud",
        "América del Sur",
        "América do Sul",
        "South America"
      )
    }
  ],
  verdict: {
    label: text(
      "Posib avèk otorizasyon davans",
      "Possible avec autorisation préalable",
      "Posible con autorización previa",
      "Possível com autorização prévia",
      "Possible with prior authorization"
    ),
    title: text(
      "Chwazi rezon ou anvan ou vwayaje: vizit, travay, etid oswa fanmi pa sèvi ak menm pèmi.",
      "Choisissez le motif avant de voyager: visite, travail, études et famille n’utilisent pas le même permis.",
      "Elige el motivo antes de viajar: visita, trabajo, estudios y familia no usan el mismo permiso.",
      "Escolha o motivo antes de viajar: visita, trabalho, estudo e família não usam a mesma autorização.",
      "Choose your purpose before traveling: visiting, work, study and family do not use the same permission."
    ),
    body: text(
      "Sitwayen ayisyen bezwen yon viza pou vizit touris. Pou etabli w, prensipal rezidans travay ak etid yo mande depi aletranje. Antre kòm vizitè pa bay yon dwa nòmal pou chanje estati a apre ou rive.",
      "Les ressortissants haïtiens ont besoin d’un visa de tourisme. Pour s’installer, les principales résidences de travail et d’études se demandent depuis l’étranger. Entrer comme visiteur ne donne pas un droit normal de changer de statut après l’arrivée.",
      "Los nacionales haitianos necesitan visa de turismo. Para establecerse, las residencias principales de trabajo y estudio se solicitan desde el extranjero. Entrar como visitante no da un derecho normal a cambiar de estatus después.",
      "Cidadãos haitianos precisam de visto de turismo. Para se estabelecer, as principais residências de trabalho e estudo são solicitadas no exterior. Entrar como visitante não dá direito normal de mudar o status depois.",
      "Haitian nationals need a tourist visa. To settle, the main work and study residence permits are requested from abroad. Entering as a visitor does not normally create a right to change status after arrival."
    ),
    points: [
      text(
        "Travay legal mande yon pèmi ki otorize aktivite peye; yon kontra oswa òf fòmèl se yon pati enpòtan nan dosye a.",
        "Le travail légal exige un permis autorisant l’activité rémunérée; un contrat ou une offre formelle est une pièce essentielle.",
        "Trabajar legalmente exige un permiso que autorice actividad remunerada; un contrato u oferta formal es una parte clave.",
        "Trabalho legal exige autorização para atividade remunerada; contrato ou oferta formal é parte essencial.",
        "Lawful work requires permission for paid activity; a contract or formal offer is a key part of the file."
      ),
      text(
        "Etid mande admisyon nan yon etablisman leta rekonèt, prèv mwayen finansye ak dokiman ki prepare kòrèkteman.",
        "Les études exigent l’admission dans un établissement reconnu par l’État, des ressources et des documents correctement préparés.",
        "Estudiar exige admisión en una institución reconocida por el Estado, medios económicos y documentos preparados correctamente.",
        "Estudar exige admissão em instituição reconhecida pelo Estado, meios financeiros e documentos bem preparados.",
        "Study requires admission to a state-recognized institution, financial support and properly prepared documents."
      ),
      text(
        "Reyinifikasyon fanmi konsène kèk fanmi yon sitwayen chilyen oswa yon moun ki gen Rezidans Definitif.",
        "La réunification familiale vise certains proches d’un citoyen chilien ou d’un titulaire de résidence définitive.",
        "La reunificación familiar cubre a ciertos familiares de una persona chilena o con Residencia Definitiva.",
        "Reunificação familiar abrange certos familiares de pessoa chilena ou com Residência Definitiva.",
        "Family reunification covers certain relatives of a Chilean citizen or permanent resident."
      )
    ]
  },
  pathways: [
    {
      title: text(
        "Travay ak kontra oswa òf",
        "Travail avec contrat ou offre",
        "Trabajo con contrato u oferta",
        "Trabalho com contrato ou oferta",
        "Work with a contract or offer"
      ),
      availability: text(
        "Ouvè depi aletranje",
        "Ouvert depuis l’étranger",
        "Disponible desde el extranjero",
        "Disponível no exterior",
        "Available from abroad"
      ),
      tone: "possible",
      summary: text(
        "Rezidans pou aktivite peye a fèt pou moun ki gen yon anplwayè nan Chili, yon kontra, yon òf fòmèl aksepte, oswa kèk kontra sèvis endepandan ki satisfè règ yo.",
        "La résidence pour activité rémunérée vise les personnes ayant un employeur au Chili, un contrat, une offre formelle acceptée ou certains contrats de services indépendants conformes.",
        "La residencia para actividades remuneradas es para quien tiene empleador en Chile, contrato, oferta formal aceptada o ciertos contratos de servicios independientes.",
        "A residência para atividade remunerada atende quem tem empregador no Chile, contrato, oferta formal aceita ou certos contratos de serviço independente.",
        "Paid-activity residence is for people with a Chilean employer, contract, accepted formal offer, or certain qualifying independent-service contracts."
      ),
      action: text(
        "Mande depi aletranje sou pòtal SERMIG. Si se yon òf, pèmi inisyal la ka mande pou kontra definitif la depoze apre antre nan delè otorite a bay.",
        "Demandez depuis l’étranger sur le portail SERMIG. Avec une offre, le permis initial peut exiger le dépôt du contrat définitif après l’entrée dans le délai fixé.",
        "Solicita desde el extranjero en SERMIG. Con una oferta, el permiso inicial puede exigir presentar el contrato definitivo después de entrar dentro del plazo oficial.",
        "Solicite no exterior pelo SERMIG. Com oferta, a autorização inicial pode exigir apresentação do contrato definitivo após a entrada dentro do prazo oficial.",
        "Apply from abroad through SERMIG. With an offer, the initial permission may require filing the final contract after entry within the official deadline."
      ),
      link: {
        label: text(
          "Gade rezidans travay",
          "Voir la résidence de travail",
          "Ver residencia de trabajo",
          "Ver residência de trabalho",
          "View work residence"
        ),
        url: "https://serviciomigraciones.cl/residencia-temporal/subcategorias/actividades-remuneradas/"
      }
    },
    {
      title: text("Etid", "Études", "Estudios", "Estudos", "Study"),
      availability: text(
        "Ouvè depi aletranje",
        "Ouvert depuis l’étranger",
        "Disponible desde el extranjero",
        "Disponível no exterior",
        "Available from abroad"
      ),
      tone: "possible",
      summary: text(
        "Ou bezwen enskripsyon oswa sètifika elèv nan yon etablisman leta rekonèt, paspò, dosye penal pou granmoun ak prèv kòman w ap viv.",
        "Il faut une inscription ou attestation d’étudiant d’un établissement reconnu, le passeport, le casier judiciaire pour les adultes et la preuve de ressources.",
        "Necesitas matrícula o certificado de alumno de una institución reconocida, pasaporte, antecedentes para adultos y prueba de sustento.",
        "É necessário matrícula ou certificado de aluno em instituição reconhecida, passaporte, antecedentes para adultos e prova de sustento.",
        "You need enrollment or a student certificate from a recognized institution, passport, adult criminal record and proof of support."
      ),
      action: text(
        "Mande rezidans lan depi aletranje. Pèmi etid la pèmèt jiska 30 èdtan travay pa semèn, men ou dwe kenbe kalite elèv regilye.",
        "Demandez la résidence depuis l’étranger. Le permis d’études autorise jusqu’à 30 heures de travail par semaine, à condition de rester étudiant régulier.",
        "Solicita desde el extranjero. El permiso de estudiante permite hasta 30 horas de trabajo semanal, pero debes mantener la calidad de estudiante regular.",
        "Solicite no exterior. A autorização de estudante permite até 30 horas semanais de trabalho, mantendo a condição de aluno regular.",
        "Apply from abroad. Student residence allows up to 30 hours of work per week, while you remain a regular student."
      ),
      link: {
        label: text(
          "Gade rezidans etid",
          "Voir la résidence d’études",
          "Ver residencia de estudios",
          "Ver residência de estudos",
          "View study residence"
        ),
        url: "https://serviciomigraciones.cl/residencia-temporal/subcategorias/estudiantes/"
      }
    },
    {
      title: text(
        "Reyinifikasyon fanmi",
        "Réunification familiale",
        "Reunificación familiar",
        "Reunificação familiar",
        "Family reunification"
      ),
      availability: text(
        "Ouvè pou fanmi ki kalifye",
        "Ouvert aux proches admissibles",
        "Disponible para familiares elegibles",
        "Disponível para familiares elegíveis",
        "Available to eligible relatives"
      ),
      tone: "possible",
      summary: text(
        "Sa ka konsène mari oswa madanm, paran, timoun minè, timoun andikape, oswa yon timoun selibatè k ap etidye epi ki poko gen 24 an, selon relasyon an.",
        "Cela peut concerner conjoint, parent, enfant mineur, enfant handicapé ou enfant célibataire étudiant de moins de 24 ans, selon le lien.",
        "Puede incluir cónyuge, padre o madre, hijo menor, hijo con discapacidad o hijo soltero estudiante menor de 24 años, según el vínculo.",
        "Pode incluir cônjuge, pai ou mãe, filho menor, filho com deficiência ou filho solteiro estudante menor de 24 anos, conforme o vínculo.",
        "It may include a spouse, parent, minor child, disabled child, or unmarried student child under 24, depending on the relationship."
      ),
      action: text(
        "Moun nan Chili dwe se yon sitwayen chilyen oswa gen Rezidans Definitif. Prepare prèv fanmi yo, legalizasyon oswa apostiy ak tradiksyon ki aplikab.",
        "La personne au Chili doit être chilienne ou résidente définitive. Préparez les preuves du lien, légalisations ou apostilles et traductions requises.",
        "La persona en Chile debe ser chilena o tener Residencia Definitiva. Prepara pruebas del vínculo, legalizaciones o apostillas y traducciones aplicables.",
        "A pessoa no Chile deve ser chilena ou ter Residência Definitiva. Prepare provas do vínculo, legalizações ou apostilas e traduções exigidas.",
        "The person in Chile must be Chilean or hold permanent residence. Prepare relationship evidence, legalization or apostilles, and required translations."
      ),
      link: {
        label: text(
          "Gade reyinifikasyon",
          "Voir la réunification",
          "Ver reunificación",
          "Ver reunificação",
          "View reunification"
        ),
        url: "https://serviciomigraciones.cl/residencia-temporal/subcategorias/reunificacion-familiar/"
      }
    },
    {
      title: text("Vizit", "Visite", "Visita", "Visita", "Visit"),
      availability: text(
        "Viza obligatwa pou paspò ayisyen",
        "Visa obligatoire pour le passeport haïtien",
        "Visa obligatoria con pasaporte haitiano",
        "Visto obrigatório para passaporte haitiano",
        "Visa required for Haitian passport"
      ),
      tone: "conditional",
      summary: text(
        "Viza touris la se pou yon vizit tanporè. Li pa dwe sèvi kòm yon pwomès pou jwenn rezidans oswa travay apre antre.",
        "Le visa de tourisme sert à une visite temporaire. Il ne constitue pas une promesse de résidence ou de travail après l’entrée.",
        "La visa de turismo es para una visita temporal. No promete residencia ni trabajo después de entrar.",
        "O visto de turismo é para visita temporária. Não promete residência nem trabalho depois da entrada.",
        "A tourist visa is for a temporary visit. It is not a promise of residence or work after entry."
      ),
      action: text(
        "Fè demann lan anvan vwayaj, verifye anbasad Chili ann Ayiti, epi pa achte tikè anvan yo apwouve dokiman an.",
        "Faites la demande avant le voyage, vérifiez auprès de l’ambassade du Chili en Haïti et n’achetez pas le billet avant approbation.",
        "Solicita antes de viajar, comprueba la Embajada de Chile en Haití y no compres el pasaje antes de la aprobación.",
        "Solicite antes da viagem, verifique a Embaixada do Chile no Haiti e não compre passagem antes da aprovação.",
        "Apply before traveling, check with the Chilean Embassy in Haiti and do not buy a ticket before approval."
      ),
      link: {
        label: text(
          "Gade règ pou Ayisyen",
          "Voir la règle pour les Haïtiens",
          "Ver regla para haitianos",
          "Ver regra para haitianos",
          "View rule for Haitians"
        ),
        url: "https://www.chile.gob.cl/chile/blog/haiti/requisitos-para-ciudadanos-haitianos-que-quieran-viajar-a-chile"
      }
    },
    {
      title: text("Refij", "Asile", "Refugio", "Refúgio", "Refuge"),
      availability: text(
        "Pwoteksyon selon ka a",
        "Protection selon le cas",
        "Protección según el caso",
        "Proteção conforme o caso",
        "Protection based on the case"
      ),
      tone: "conditional",
      summary: text(
        "Refij se pou yon moun ki bezwen pwoteksyon kont pèsekisyon, vyolans oswa vyolasyon grav ki antre nan definisyon legal la. Se pa yon pèmi travay rapid.",
        "L’asile protège une personne exposée à des persécutions, violences ou violations graves relevant de la définition légale. Ce n’est pas un permis de travail rapide.",
        "El refugio protege a quien enfrenta persecución, violencia o violaciones graves dentro de la definición legal. No es un permiso de trabajo rápido.",
        "Refúgio protege quem enfrenta perseguição, violência ou graves violações dentro da definição legal. Não é autorização rápida de trabalho.",
        "Refuge protects someone facing persecution, violence or serious violations within the legal definition. It is not a quick work permit."
      ),
      action: text(
        "Demann lan fèt pèsonèlman nan Chili epi, an jeneral, nan premye 7 jou ouvrab apre antre. Si ou depase delè a, chèche konsèy sou fason pou eksplike sitiyasyon an.",
        "La demande se fait personnellement au Chili et, en général, dans les 7 premiers jours ouvrables après l’entrée. En cas de dépassement, demandez conseil pour expliquer la situation.",
        "La solicitud es personal en Chile y, en general, dentro de los primeros 7 días hábiles desde la entrada. Si pasó el plazo, busca orientación para explicar el motivo.",
        "O pedido é pessoal no Chile e, em geral, nos primeiros 7 dias úteis após a entrada. Se passou o prazo, busque orientação para explicar a situação.",
        "The request is made in person in Chile and generally within the first 7 business days after entry. If late, seek advice on explaining the circumstances."
      ),
      link: {
        label: text(
          "Gade pwosesis refij",
          "Voir la procédure d’asile",
          "Ver proceso de refugio",
          "Ver processo de refúgio",
          "View refuge process"
        ),
        url: "https://serviciomigraciones.cl/refugio/"
      }
    }
  ],
  fromHaiti: {
    intro: text(
      "Pou Chili, pi bon plan an se chwazi kalite rezidans lan epi depoze li depi Ayiti oswa yon peyi kote ou rete legalman, anvan ou fè depans vwayaj.",
      "Pour le Chili, le meilleur plan consiste à choisir la catégorie de résidence et à déposer depuis Haïti ou un pays de résidence légale avant les dépenses de voyage.",
      "Para Chile, el mejor plan es elegir la residencia y solicitarla desde Haití o desde un país donde resides legalmente antes de gastar en el viaje.",
      "Para o Chile, o melhor plano é escolher a residência e solicitar no Haiti ou em país onde reside legalmente antes de gastar com a viagem.",
      "For Chile, choose the residence category and apply from Haiti or a country where you lawfully reside before spending on travel."
    ),
    steps: [
      text(
        "Verifye paspò a epi rasanble batistè, maryaj, diplòm ak sètifika penal ki koresponn ak ka a.",
        "Vérifiez le passeport et rassemblez actes de naissance, mariage, diplômes et casier judiciaire selon le cas.",
        "Verifica el pasaporte y reúne actas de nacimiento, matrimonio, diplomas y antecedentes según tu caso.",
        "Confira o passaporte e reúna certidões, diplomas e antecedentes conforme o caso.",
        "Check the passport and gather birth, marriage, education and criminal records for the case."
      ),
      text(
        "Jwenn òf travay, admisyon lekòl oswa prèv relasyon fanmi an anvan ou chwazi soukategori a.",
        "Obtenez l’offre d’emploi, l’admission scolaire ou la preuve du lien familial avant de choisir la sous-catégorie.",
        "Obtén la oferta laboral, admisión o prueba familiar antes de elegir la subcategoría.",
        "Obtenha oferta de trabalho, admissão ou prova familiar antes de escolher a subcategoria.",
        "Obtain the job offer, school admission or family proof before choosing the subcategory."
      ),
      text(
        "Apostiye oswa legalize dokiman yo epi tradui yo jan SERMIG mande a; pa voye foto ki pa lizib.",
        "Apostillez ou légalisez les documents et traduisez-les selon SERMIG; n’envoyez pas d’images illisibles.",
        "Apostilla o legaliza y traduce según SERMIG; no envíes imágenes ilegibles.",
        "Apostile ou legalize e traduza conforme o SERMIG; não envie imagens ilegíveis.",
        "Apostille or legalize and translate as SERMIG requires; do not upload unreadable images."
      ),
      text(
        "Depoze demann lan sou pòtal ofisyèl la epi suiv mesaj nan kont ou; pa peye yon entèmedyè pou yon apwobasyon.",
        "Déposez sur le portail officiel et suivez les messages du compte; ne payez pas un intermédiaire pour une approbation.",
        "Solicita en el portal oficial y revisa los mensajes; no pagues a un intermediario por una aprobación.",
        "Solicite no portal oficial e acompanhe as mensagens; não pague intermediário por aprovação.",
        "Apply on the official portal and monitor account messages; do not pay an intermediary for approval."
      ),
      text(
        "Vwayaje sèlman ak pèmi oswa viza apwouve a epi verifye tout peyi tranzit yo ak konpayi avyon an.",
        "Voyagez seulement avec le permis ou visa approuvé et vérifiez tous les pays de transit avec la compagnie.",
        "Viaja solo con el permiso o visa aprobado y verifica todos los países de tránsito con la aerolínea.",
        "Viaje somente com autorização ou visto aprovado e verifique todos os países de trânsito com a companhia.",
        "Travel only with the approved permit or visa and verify every transit country with the airline."
      )
    ]
  },
  life: [
    {
      title: text(
        "Sèdula ak RUN",
        "Cédula et RUN",
        "Cédula y RUN",
        "Cédula e RUN",
        "Identity card and RUN"
      ),
      body: text(
        "Apre rezidans lan kòmanse valab, mande kat idantite etranje a nan Registro Civil nan 30 jou. Li montre RUN ou, ki sèvi pou anpil sèvis.",
        "Après l’entrée en vigueur de la résidence, demandez la carte d’identité étrangère au Registro Civil dans les 30 jours. Elle indique le RUN utilisé pour de nombreux services.",
        "Cuando la residencia entre en vigor, solicita la cédula de extranjero en Registro Civil dentro de 30 días. Incluye el RUN usado en muchos servicios.",
        "Quando a residência entrar em vigor, solicite a cédula de estrangeiro no Registro Civil em até 30 dias. Ela inclui o RUN usado em muitos serviços.",
        "Once residence takes effect, apply for the foreign identity card at Registro Civil within 30 days. It includes the RUN used for many services."
      ),
      link: {
        label: text(
          "Kijan pou jwenn sèdula",
          "Comment obtenir la cédula",
          "Cómo obtener la cédula",
          "Como obter a cédula",
          "How to get the card"
        ),
        url: "https://www.chileatiende.gob.cl/fichas/3337-cedula-de-identidad-para-extranjeros-obtencion-y-renovacion"
      }
    },
    {
      title: text("Travay", "Travail", "Trabajo", "Trabalho", "Work"),
      body: text(
        "Bolsa Nacional de Empleo se pòtal piblik pou chèche pòs. Pou aplike nòmalman ou bezwen enskripsyon ak dokiman idantifikasyon; BNE pa mande depo oswa peman nan seleksyon.",
        "La Bolsa Nacional de Empleo est le portail public d’offres. La candidature exige normalement inscription et identité; la BNE ne demande ni dépôt ni paiement lors de la sélection.",
        "La Bolsa Nacional de Empleo es el portal público de ofertas. Para postular normalmente necesitas registro e identificación; BNE no pide depósitos ni pagos en selección.",
        "A Bolsa Nacional de Empleo é o portal público de vagas. Para candidatar-se normalmente precisa cadastro e identificação; a BNE não pede depósitos nem pagamentos em seleção.",
        "Bolsa Nacional de Empleo is the public job portal. Applying normally requires registration and identification; BNE does not ask for deposits or payments in selection."
      ),
      link: {
        label: text(
          "Chèche travay nan BNE",
          "Chercher sur BNE",
          "Buscar trabajo en BNE",
          "Buscar trabalho na BNE",
          "Search BNE jobs"
        ),
        url: "https://www.bne.cl/ofertas?mostrar=empleo"
      }
    },
    {
      title: text(
        "Rekonesans etid",
        "Reconnaissance des études",
        "Reconocimiento de estudios",
        "Reconhecimento de estudos",
        "Recognition of studies"
      ),
      body: text(
        "Pou lekòl debaz oswa segondè, Mineduc eksplike rekonesans ak konvalidasyon. Depi 2026, kèk granmoun etranje san RUN dwe fè yon enrolman anvan.",
        "Pour le primaire ou secondaire, Mineduc explique reconnaissance et validation. Depuis 2026, certains adultes étrangers sans RUN doivent effectuer un enrôlement préalable.",
        "Para básica o media, Mineduc explica reconocimiento y convalidación. Desde 2026, algunos adultos extranjeros sin RUN deben hacer enrolamiento previo.",
        "Para ensino básico ou médio, o Mineduc explica reconhecimento e validação. Desde 2026, alguns adultos estrangeiros sem RUN precisam de cadastro prévio.",
        "For primary or secondary school, Mineduc explains recognition and validation. From 2026, some foreign adults without a RUN need prior enrollment."
      ),
      link: {
        label: text(
          "Rekonèt etid yo",
          "Faire reconnaître les études",
          "Reconocer estudios",
          "Reconhecer estudos",
          "Recognize studies"
        ),
        url: "https://www.ayudamineduc.cl/ficha/reconocimiento-y-convalidacion-de-estudios-basicos-y-medios-no-profesionales-realizados-en-el"
      }
    },
    {
      title: text("Sante", "Santé", "Salud", "Saúde", "Health"),
      body: text(
        "Verifye si ou ka afilye ak Fonasa selon rezidans, travay oswa sitiyasyon fanmi ou. Pou yon ijans, chèche swen menm si papye ou poko fini.",
        "Vérifiez l’affiliation à Fonasa selon résidence, travail ou famille. En urgence, cherchez des soins même si les documents ne sont pas terminés.",
        "Comprueba si puedes afiliarte a Fonasa según residencia, trabajo o familia. En una urgencia, busca atención aunque tus documentos estén en trámite.",
        "Verifique filiação ao Fonasa conforme residência, trabalho ou família. Em emergência, procure atendimento mesmo com documentos em andamento.",
        "Check Fonasa enrollment based on residence, work or family situation. In an emergency, seek care even while documents are pending."
      ),
      link: {
        label: text("Gade Fonasa", "Voir Fonasa", "Ver Fonasa", "Ver Fonasa", "View Fonasa"),
        url: "https://www.chileatiende.gob.cl/fichas/9715-afiliacion-a-fonasa"
      }
    },
    {
      title: text(
        "Si estati a pa regilye",
        "Si le statut est irrégulier",
        "Si el estatus es irregular",
        "Se o status estiver irregular",
        "If status is irregular"
      ),
      body: text(
        "Pa sipoze yon amann otomatikman ba ou rezidans. SERMIG gen yon chanèl pou deklare enfraksyon ak kalkile amann; apre sa ou toujou bezwen yon baz legal pou rezidans.",
        "Ne supposez pas qu’une amende donne automatiquement la résidence. SERMIG permet de déclarer l’infraction et calculer l’amende; il faut encore une base légale de résidence.",
        "No supongas que pagar una multa da residencia. SERMIG permite declarar la infracción y calcular la multa; todavía necesitas una base legal para residir.",
        "Não suponha que pagar multa dá residência. O SERMIG permite declarar infração e calcular multa; ainda é necessária uma base legal de residência.",
        "Do not assume paying a fine grants residence. SERMIG lets you declare an infringement and calculate the fine; you still need a lawful basis to reside."
      ),
      link: {
        label: text(
          "Deklare yon enfraksyon",
          "Déclarer une infraction",
          "Declarar infracción",
          "Declarar infração",
          "Declare an infringement"
        ),
        url: "https://serviciomigraciones.cl/declarar-infraccion/"
      }
    }
  ],
  irregular: {
    title: text(
      "Yon chèn peyi pa tounen yon antre legal nan Chili",
      "Une chaîne de pays ne devient pas une entrée légale au Chili",
      "Una cadena de países no se convierte en entrada legal a Chile",
      "Uma cadeia de países não vira entrada legal no Chile",
      "A chain of countries does not become lawful entry to Chile"
    ),
    body: text(
      "Gen moun ki pale de soti Ayiti pa lanmè oswa atravè zile Karayib yo, rive nan nò Amerik di Sid, epi kontinye pa Brezil, Pewou oswa Bolivi anvan Chili. Sa se plizyè fwontyè diferan, pa yon “wout Chili” ofisyèl. Chak peyi ka mande viza, admisyon ak prèv pwòp pa li.",
      "Certains parlent de quitter Haïti par mer ou les îles caraïbes, d’arriver au nord de l’Amérique du Sud puis de continuer par le Brésil, le Pérou ou la Bolivie avant le Chili. Ce sont plusieurs frontières distinctes, pas une « route chilienne » officielle. Chaque pays a ses propres exigences.",
      "Algunos hablan de salir de Haití por mar o por islas del Caribe, llegar al norte de Sudamérica y seguir por Brasil, Perú o Bolivia antes de Chile. Son varias fronteras distintas, no una “ruta chilena” oficial. Cada país exige su propia visa o admisión.",
      "Alguns falam em sair do Haiti por mar ou ilhas do Caribe, chegar ao norte da América do Sul e seguir por Brasil, Peru ou Bolívia antes do Chile. São várias fronteiras, não uma “rota chilena” oficial. Cada país tem suas próprias exigências.",
      "People discuss leaving Haiti by sea or through Caribbean islands, reaching northern South America and continuing through Brazil, Peru or Bolivia before Chile. Those are separate borders, not an official “Chile route.” Each country has its own requirements."
    ),
    patterns: [
      text(
        "Travèse yon fwontyè ki pa ofisyèl ka kreye enfraksyon, ekspilsyon ak difikilte pou rezidans pita.",
        "Franchir un point non officiel peut entraîner infraction, expulsion et difficultés de résidence ultérieures.",
        "Cruzar por un punto no oficial puede generar infracción, expulsión y dificultades futuras para residir.",
        "Cruzar por ponto não oficial pode gerar infração, expulsão e dificuldade futura de residência.",
        "Crossing at an unofficial point can lead to violations, expulsion and future residence problems."
      ),
      text(
        "Yon papye Brezil, Pewou oswa Bolivi pa bay otorizasyon pou antre Chili.",
        "Un document du Brésil, du Pérou ou de Bolivie n’autorise pas l’entrée au Chili.",
        "Un documento de Brasil, Perú o Bolivia no autoriza entrar a Chile.",
        "Documento do Brasil, Peru ou Bolívia não autoriza entrada no Chile.",
        "A document from Brazil, Peru or Bolivia does not authorize entry to Chile."
      ),
      text(
        "Moun k ap fè transpò klandesten ka ekspoze w ak vòl, abandòn, eksplwatasyon oswa trafik moun.",
        "Le transport clandestin expose au vol, à l’abandon, à l’exploitation ou à la traite.",
        "El transporte clandestino puede exponerte a robo, abandono, explotación o trata.",
        "Transporte clandestino pode expor a roubo, abandono, exploração ou tráfico.",
        "Clandestine transport can expose you to robbery, abandonment, exploitation or trafficking."
      )
    ],
    risks: [
      text(
        "pèdi lajan ak dokiman",
        "perte d’argent et de documents",
        "pérdida de dinero y documentos",
        "perda de dinheiro e documentos",
        "loss of money and documents"
      ),
      text(
        "blesi, grangou oswa mank swen sou vwayaj la",
        "blessures, faim ou absence de soins en route",
        "lesiones, hambre o falta de atención",
        "ferimentos, fome ou falta de atendimento",
        "injury, hunger or lack of care"
      ),
      text(
        "amann, lòd sòti oswa ekspilsyon",
        "amende, ordre de sortie ou expulsion",
        "multa, orden de salida o expulsión",
        "multa, ordem de saída ou expulsão",
        "fine, departure order or expulsion"
      ),
      text(
        "pa kapab travay ak yon kontra regilye",
        "impossibilité de travailler avec un contrat régulier",
        "imposibilidad de trabajar con contrato regular",
        "impossibilidade de trabalhar com contrato regular",
        "inability to work under a regular contract"
      )
    ],
    closing: text(
      "Pou Chili, plan ki pi solid la se jwenn baz rezidans lan anvan depa epi antre nan yon pwen kontwòl ofisyèl ak dokiman ki apwouve yo.",
      "Pour le Chili, le plan le plus solide est d’obtenir la base de résidence avant le départ et d’entrer par un contrôle officiel avec les documents approuvés.",
      "Para Chile, el plan más sólido es obtener la base de residencia antes de salir y entrar por control oficial con documentos aprobados.",
      "Para o Chile, o plano mais sólido é obter a base de residência antes da saída e entrar por controle oficial com documentos aprovados.",
      "For Chile, the strongest plan is to secure the residence basis before departure and enter at an official checkpoint with approved documents."
    )
  },
  updates: [
    {
      date: "2026-05-15",
      title: text(
        "Règ fanmi yo ajou",
        "Règles familiales mises à jour",
        "Reglas familiares actualizadas",
        "Regras familiares atualizadas",
        "Family rules updated"
      ),
      body: text(
        "SERMIG konfime ki relasyon fanmi ki kalifye epi ke rezidans fanmi an pèmèt aktivite peye legal.",
        "SERMIG confirme les liens admissibles et que la résidence familiale permet une activité rémunérée légale.",
        "SERMIG confirma los vínculos elegibles y que la residencia familiar permite actividad remunerada legal.",
        "O SERMIG confirma vínculos elegíveis e que residência familiar permite atividade remunerada legal.",
        "SERMIG confirms eligible relationships and that family residence allows lawful paid activity."
      ),
      link: {
        label: text(
          "Li règ fanmi an",
          "Lire la règle familiale",
          "Leer regla familiar",
          "Ler regra familiar",
          "Read family rule"
        ),
        url: "https://serviciomigraciones.cl/residencia-temporal/subcategorias/reunificacion-familiar/"
      }
    },
    {
      date: "2026-08-18",
      title: text(
        "Nouvo prèv sou entènèt pou montre dwa travay",
        "Nouvelle preuve en ligne du droit au travail",
        "Nuevo comprobante en línea para demostrar permiso de trabajo",
        "Novo comprovante online para demonstrar direito ao trabalho",
        "New online proof of work authorization"
      ),
      body: text(
        "SERMIG lanse Habilitación Laboral pou yon moun jwenn yon prèv imedya ki montre si rezidans oswa otorizasyon li pèmèt li fè aktivite peye devan yon anplwayè.",
        "SERMIG a lancé Habilitación Laboral afin d’obtenir immédiatement une preuve indiquant si le titre de séjour ou l’autorisation permet une activité rémunérée devant un employeur.",
        "SERMIG lanzó Habilitación Laboral para obtener de inmediato un comprobante que demuestra ante un empleador si la residencia o autorización permite trabajar.",
        "O SERMIG lançou Habilitación Laboral para obter imediatamente um comprovante que demonstra ao empregador se a residência ou autorização permite trabalhar.",
        "SERMIG launched Habilitación Laboral to provide immediate proof for an employer showing whether a residence document or authorization permits paid work."
      ),
      link: {
        label: text(
          "Gade kijan prèv travay la mache",
          "Voir comment fonctionne le justificatif",
          "Ver cómo funciona el comprobante",
          "Ver como funciona o comprovante",
          "See how the proof works"
        ),
        url: "https://serviciomigraciones.cl/conoce-el-paso-a-paso-del-tramite-de-habilitacion-laboral/"
      }
    }
  ]
};

const brazil: CountryMigrationGuide = {
  country: "brazil",
  tone: "conditional",
  reviewedAt: "2026-08-25",
  summary: text(
    "Brezil se pi gwo peyi Amerik di Sid. Lang prensipal la se pòtigè, kapital la se Brasília, epi gen plizyè kominote ayisyèn. Travay, etid ak fanmi rete posib ak bon kategori a, men ansyen viza imanitè Ayiti a pa dwe prezante kòm yon pòt otomatik an 2026.",
    "Le Brésil est le plus grand pays d’Amérique du Sud. La langue principale est le portugais, la capitale Brasília et plusieurs communautés haïtiennes y vivent. Travail, études et famille restent possibles avec la bonne catégorie, mais l’ancien visa humanitaire Haïti n’est pas une porte automatique en 2026.",
    "Brasil es el país más grande de Sudamérica. Su idioma principal es portugués, la capital es Brasilia y existen varias comunidades haitianas. Trabajo, estudios y familia siguen siendo posibles con la categoría correcta, pero la antigua visa humanitaria para Haití no es una puerta automática en 2026.",
    "O Brasil é o maior país da América do Sul. O idioma principal é português, a capital é Brasília e há várias comunidades haitianas. Trabalho, estudo e família continuam possíveis com a categoria correta, mas o antigo visto humanitário do Haiti não é porta automática em 2026.",
    "Brazil is South America’s largest country. Portuguese is the main language, Brasília is the capital, and several Haitian communities live there. Work, study and family remain possible in the right category, but the former Haiti humanitarian visa is not an automatic route in 2026."
  ),
  facts: [
    {
      label: sharedFacts.capital,
      value: text("Brasília", "Brasília", "Brasilia", "Brasília", "Brasília")
    },
    {
      label: sharedFacts.language,
      value: text("Pòtigè", "Portugais", "Portugués", "Português", "Portuguese")
    },
    {
      label: sharedFacts.currency,
      value: text(
        "Real brezilyen (BRL)",
        "Réal brésilien (BRL)",
        "Real brasileño (BRL)",
        "Real brasileiro (BRL)",
        "Brazilian real (BRL)"
      )
    },
    {
      label: sharedFacts.region,
      value: text(
        "Amerik di Sid",
        "Amérique du Sud",
        "América del Sur",
        "América do Sul",
        "South America"
      )
    }
  ],
  verdict: {
    label: text(
      "Posib, men kategori a dwe klè",
      "Possible, mais la catégorie doit être claire",
      "Posible, pero la categoría debe estar clara",
      "Possível, mas a categoria deve estar clara",
      "Possible, but the category must be clear"
    ),
    title: text(
      "Pa bati plan an sou rimè ki di tout Ayisyen jwenn papye lè yo rive.",
      "Ne construisez pas le projet sur la rumeur que toute personne haïtienne obtient des papiers à l’arrivée.",
      "No construyas el plan sobre el rumor de que todo haitiano obtiene documentos al llegar.",
      "Não monte o plano sobre o boato de que todo haitiano recebe documentos ao chegar.",
      "Do not build a plan on the rumor that every Haitian receives papers after arrival."
    ),
    body: text(
      "Règ imanitè espesifik pou Ayiti a te revoke nan fen 2025 epi ranplase pa yon kad jeneral ki mande yon desizyon espesifik pou peyi ak pòs konsilè yo. Lis ofisyèl 2026 nou te verifye pa montre yon nouvo ouvèti jeneral pou Ayiti. Fanmi, etid, travay ak pwoteksyon selon ka a rete separe.",
      "La règle humanitaire spécifique à Haïti a été révoquée fin 2025 et remplacée par un cadre général exigeant une désignation par pays et poste consulaire. La liste officielle 2026 vérifiée ne montre pas de nouvelle ouverture générale pour Haïti. Famille, études, travail et protection restent des voies distinctes.",
      "La norma humanitaria específica para Haití fue revocada a finales de 2025 y reemplazada por un marco general que exige designación por país y consulado. La lista oficial de 2026 revisada no muestra una nueva apertura general para Haití. Familia, estudios, trabajo y protección son vías separadas.",
      "A norma humanitária específica do Haiti foi revogada no fim de 2025 e substituída por regra geral que exige designação por país e posto consular. A lista oficial de 2026 verificada não mostra nova abertura geral para o Haiti. Família, estudo, trabalho e proteção seguem vias separadas.",
      "The Haiti-specific humanitarian rule was revoked at the end of 2025 and replaced by a general framework requiring country and consular-post designation. The official 2026 list reviewed does not show a new general opening for Haiti. Family, study, work and protection remain separate routes."
    ),
    points: [
      text(
        "Paspò ayisyen an mande viza pou antre Brezil; konsila a ka bezwen konsiltasyon davans pou kategori a.",
        "Le passeport haïtien exige un visa pour le Brésil; le consulat peut devoir effectuer une consultation préalable.",
        "El pasaporte haitiano requiere visa para Brasil; el consulado puede necesitar consulta previa para la categoría.",
        "Passaporte haitiano exige visto para o Brasil; o consulado pode precisar de consulta prévia.",
        "A Haitian passport requires a visa for Brazil; the consulate may need prior consultation for the category."
      ),
      text(
        "Viza fanmi elektwonik 2025–2026 sèlman fini kèk dosye fanmi ki te deja apwouve anba pwogram 2023 la; li pa yon nouvo enskripsyon piblik.",
        "Le visa familial électronique 2025–2026 ne finalise que certains dossiers déjà approuvés sous le programme 2023; ce n’est pas une nouvelle inscription publique.",
        "La visa familiar electrónica 2025–2026 solo finaliza ciertos casos ya aprobados bajo el programa de 2023; no es una nueva inscripción pública.",
        "O visto familiar eletrônico 2025–2026 apenas finaliza certos casos já aprovados no programa de 2023; não é nova inscrição pública.",
        "The 2025–2026 electronic family visa only completes certain cases already approved under the 2023 program; it is not a new public application."
      ),
      text(
        "Azil ka mande sèlman lè moun nan deja Brezil epi li gen yon bezwen pwoteksyon ki antre nan definisyon legal la.",
        "L’asile ne peut être demandé que lorsque la personne est déjà au Brésil et relève de la définition légale de protection.",
        "El refugio solo puede solicitarse cuando la persona ya está en Brasil y necesita protección dentro de la definición legal.",
        "Refúgio só pode ser solicitado quando a pessoa já está no Brasil e precisa de proteção dentro da definição legal.",
        "Refuge can only be requested when the person is already in Brazil and needs protection within the legal definition."
      )
    ]
  },
  pathways: [
    {
      title: text("Fanmi", "Famille", "Familia", "Família", "Family"),
      availability: text(
        "Posib selon relasyon ak dosye a",
        "Possible selon le lien et le dossier",
        "Posible según vínculo y caso",
        "Possível conforme vínculo e processo",
        "Possible based on relationship and case"
      ),
      tone: "possible",
      summary: text(
        "VITEM XI ka sèvi pou kèk fanmi yon sitwayen brezilyen oswa yon moun ki gen rezidans regilye. Relasyon an, dokiman sivil yo ak estati moun ki rele a dwe pwouve.",
        "Le VITEM XI peut servir à certains proches d’un Brésilien ou résident régulier. Le lien, les actes civils et le statut du répondant doivent être prouvés.",
        "VITEM XI puede servir para ciertos familiares de brasileño o residente regular. Deben probarse vínculo, documentos civiles y estatus de quien llama.",
        "O VITEM XI pode atender certos familiares de brasileiro ou residente regular. É preciso provar vínculo, documentos civis e status de quem chama.",
        "VITEM XI may serve certain relatives of a Brazilian citizen or lawful resident. The relationship, civil records and sponsor’s status must be proven."
      ),
      action: text(
        "Kòmanse ak règ fanmi nòmal la nan anbasad la. Si ou te deja gen apwobasyon anba Pwotaria 38/2023, suiv sèlman lyen pèsonèl yo voye pou pwosedi elektwonik la.",
        "Commencez par la règle familiale normale auprès de l’ambassade. Si vous aviez déjà une approbation sous la Portaria 38/2023, suivez uniquement le lien personnel reçu pour la procédure électronique.",
        "Empieza con la regla familiar normal en la embajada. Si ya tenías aprobación bajo la Portaria 38/2023, sigue solo el enlace personal enviado para el proceso electrónico.",
        "Comece pela regra familiar normal na embaixada. Se já tinha aprovação pela Portaria 38/2023, siga somente o link pessoal enviado para o processo eletrônico.",
        "Start with the normal family rule at the embassy. If already approved under Portaria 38/2023, use only the personal link sent for the electronic process."
      ),
      link: {
        label: text(
          "Gade viza fanmi",
          "Voir le visa familial",
          "Ver visa familiar",
          "Ver visto familiar",
          "View family visa"
        ),
        url: "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/refugio/servicos/visto-para-reuniao-familiar"
      }
    },
    {
      title: text(
        "Etid — VITEM IV",
        "Études — VITEM IV",
        "Estudios — VITEM IV",
        "Estudo — VITEM IV",
        "Study — VITEM IV"
      ),
      availability: text(
        "Ouvè ak admisyon",
        "Ouvert avec admission",
        "Disponible con admisión",
        "Disponível com admissão",
        "Available with admission"
      ),
      tone: "possible",
      summary: text(
        "Pou kou ki dire plis pase 90 jou, lekòl la dwe regilye epi bay prèv admisyon oswa enskripsyon. Yo ka mande prèv finans, dosye penal ak lòt dokiman konsilè.",
        "Pour un cursus de plus de 90 jours, l’établissement doit être régulier et fournir admission ou inscription. Ressources, casier et autres documents consulaires peuvent être exigés.",
        "Para estudios de más de 90 días, la institución debe ser regular y emitir admisión o matrícula. Pueden pedir solvencia, antecedentes y otros documentos consulares.",
        "Para estudos acima de 90 dias, a instituição deve ser regular e emitir admissão ou matrícula. Podem ser exigidos meios financeiros, antecedentes e outros documentos.",
        "For study over 90 days, the institution must be lawful and issue admission or enrollment. Funds, criminal record and other consular documents may be required."
      ),
      action: text(
        "Verifye enstitisyon an, mande VITEM IV anvan vwayaj epi anrejistre ak Polícia Federal apre antre nan delè viza a bay.",
        "Vérifiez l’établissement, demandez le VITEM IV avant le voyage et enregistrez-vous auprès de la Police fédérale après l’entrée dans le délai du visa.",
        "Verifica la institución, solicita VITEM IV antes de viajar y regístrate con la Policía Federal después de entrar dentro del plazo de la visa.",
        "Verifique a instituição, peça o VITEM IV antes da viagem e registre-se na Polícia Federal após a entrada dentro do prazo do visto.",
        "Verify the institution, request VITEM IV before travel and register with the Federal Police after entry within the visa deadline."
      ),
      link: {
        label: text(
          "Gade règ VITEM IV",
          "Voir les règles VITEM IV",
          "Ver reglas VITEM IV",
          "Ver regras VITEM IV",
          "View VITEM IV rules"
        ),
        url: "https://www.gov.br/mre/pt-br/consulado-geral-do-brasil-mexico/servicios-para-extranjeros/visa-para-estudiantes-vitem-iv"
      }
    },
    {
      title: text(
        "Travay — VITEM V",
        "Travail — VITEM V",
        "Trabajo — VITEM V",
        "Trabalho — VITEM V",
        "Work — VITEM V"
      ),
      availability: text(
        "Anplwayè oswa otorizasyon davans nesesè",
        "Employeur ou autorisation préalable requis",
        "Se necesita empleador o autorización previa",
        "Empregador ou autorização prévia necessária",
        "Employer or prior authorization required"
      ),
      tone: "conditional",
      summary: text(
        "Viza travay la pa kòmanse ak achte yon kontra. Anplwayè oswa antite ki responsab la nòmalman dwe fè etap otorizasyon travay oswa migrasyon an anvan konsila a bay viza.",
        "Le visa de travail ne commence pas par l’achat d’un contrat. L’employeur ou l’entité responsable doit généralement obtenir l’autorisation avant la délivrance consulaire.",
        "La visa de trabajo no empieza comprando un contrato. El empleador o entidad responsable normalmente debe obtener autorización antes de que el consulado emita la visa.",
        "Visto de trabalho não começa comprando contrato. Empregador ou entidade responsável normalmente deve obter autorização antes da emissão consular.",
        "A work visa does not start by buying a contract. The employer or responsible organization normally must obtain authorization before consular issuance."
      ),
      action: text(
        "Mande nimewo pwosesis la, verifye li nan pòtal migrasyon an epi pa peye pou yon òf “garanti”. Yon viza vizit pa bay dwa nòmal pou travay.",
        "Demandez le numéro de dossier, vérifiez-le sur le portail migratoire et ne payez pas pour une offre « garantie ». Un visa de visite n’autorise pas normalement le travail.",
        "Pide el número de trámite, verifícalo en el portal migratorio y no pagues por oferta “garantizada”. Una visa de visita no autoriza normalmente a trabajar.",
        "Peça o número do processo, confira no portal migratório e não pague por oferta “garantida”. Visto de visita normalmente não autoriza trabalho.",
        "Ask for the case number, verify it on the migration portal and do not pay for a “guaranteed” offer. A visitor visa does not normally authorize work."
      ),
      link: {
        label: text(
          "Gade pòtal migrasyon travay",
          "Voir le portail migration-travail",
          "Ver portal de migración laboral",
          "Ver portal de imigração laboral",
          "View labor migration portal"
        ),
        url: "https://portaldeimigracao.mj.gov.br/pt/"
      }
    },
    {
      title: text("Vizit", "Visite", "Visita", "Visita", "Visit"),
      availability: text(
        "Viza obligatwa",
        "Visa obligatoire",
        "Visa obligatoria",
        "Visto obrigatório",
        "Visa required"
      ),
      tone: "conditional",
      summary: text(
        "Yon vizit se pou touris, fanmi oswa aktivite ki pa kreye yon rezidans. Paspò ayisyen an mande viza, epi apwobasyon toujou depann de analiz konsilè.",
        "Une visite sert au tourisme, à la famille ou à une activité sans résidence. Le passeport haïtien exige un visa et l’approbation dépend de l’analyse consulaire.",
        "Una visita es para turismo, familia o actividad sin residencia. El pasaporte haitiano requiere visa y la aprobación depende del análisis consular.",
        "Visita é para turismo, família ou atividade sem residência. Passaporte haitiano exige visto e a aprovação depende da análise consular.",
        "A visit is for tourism, family or activity without residence. A Haitian passport requires a visa, and approval depends on consular review."
      ),
      action: text(
        "Ranpli fòm viza ofisyèl la, swiv e-consular/anbasad la epi pa itilize yon vizit pou pran yon travay ki pa otorize.",
        "Remplissez le formulaire officiel, suivez e-consular/l’ambassade et n’utilisez pas une visite pour accepter un travail non autorisé.",
        "Completa el formulario oficial, sigue e-consular/embajada y no uses una visita para aceptar trabajo no autorizado.",
        "Preencha o formulário oficial, siga e-consular/embaixada e não use visita para aceitar trabalho não autorizado.",
        "Complete the official form, follow e-consular/embassy instructions and do not use a visit to take unauthorized work."
      ),
      link: {
        label: text(
          "Kòmanse fòm viza a",
          "Commencer le formulaire de visa",
          "Iniciar formulario de visa",
          "Iniciar formulário de visto",
          "Start visa form"
        ),
        url: "https://formulario-mre.serpro.gov.br/"
      }
    },
    {
      title: text("Refij", "Asile", "Refugio", "Refúgio", "Refuge"),
      availability: text(
        "Pou moun ki deja Brezil",
        "Pour les personnes déjà au Brésil",
        "Para personas ya en Brasil",
        "Para quem já está no Brasil",
        "For people already in Brazil"
      ),
      tone: "conditional",
      summary: text(
        "Refij se pou pèsekisyon oswa vyolasyon grav ak jeneralize dwa moun. Li gratis, men moun nan dwe deja Brezil; li pa ka mande soti Ayiti.",
        "L’asile concerne persécution ou violations graves et généralisées des droits humains. Il est gratuit, mais la personne doit déjà être au Brésil; impossible depuis Haïti.",
        "El refugio es para persecución o violaciones graves y generalizadas de derechos. Es gratuito, pero la persona debe estar ya en Brasil; no se solicita desde Haití.",
        "Refúgio é para perseguição ou grave e generalizada violação de direitos. É gratuito, mas a pessoa precisa estar no Brasil; não se pede do Haiti.",
        "Refuge is for persecution or serious and generalized human-rights violations. It is free, but the person must already be in Brazil; it cannot be requested from Haiti."
      ),
      action: text(
        "Kreye kont Sisconare, fini demann lan, pran nimewo kontwòl la epi ale nan Polícia Federal pou pwotokòl la. Dosye a sèlman kòmanse bay dwa apre etap PF la.",
        "Créez le compte Sisconare, terminez la demande, notez le numéro de contrôle et allez à la Police fédérale pour le protocole. Les droits commencent après l’étape PF.",
        "Crea cuenta Sisconare, finaliza la solicitud, guarda el número de control y acude a Policía Federal para el protocolo. Los derechos comienzan tras ese paso.",
        "Crie conta no Sisconare, finalize o pedido, guarde o número de controle e vá à Polícia Federal para o protocolo. Os direitos começam após essa etapa.",
        "Create a Sisconare account, finish the request, save the control number and go to the Federal Police for the protocol. Rights begin after that PF step."
      ),
      link: {
        label: text(
          "Mande refij",
          "Demander l’asile",
          "Solicitar refugio",
          "Pedir refúgio",
          "Request refuge"
        ),
        url: "https://www.gov.br/pt-br/servicos/solicitar-refugio"
      }
    }
  ],
  fromHaiti: {
    intro: text(
      "Anvan ou kite Ayiti pou Brezil, fè kategori a vizib sou papye: fanmi, lekòl, anplwayè oswa vizit. Pa konte sou regilarizasyon apre antre kòm plan prensipal.",
      "Avant de quitter Haïti pour le Brésil, rendez la catégorie visible sur papier: famille, école, employeur ou visite. Ne comptez pas sur une régularisation après l’entrée comme plan principal.",
      "Antes de salir de Haití hacia Brasil, deja la categoría clara en documentos: familia, escuela, empleador o visita. No cuentes con regularizarte después de entrar como plan principal.",
      "Antes de sair do Haiti para o Brasil, deixe a categoria clara em documentos: família, escola, empregador ou visita. Não conte com regularização após a entrada como plano principal.",
      "Before leaving Haiti for Brazil, make the category clear in documents: family, school, employer or visit. Do not rely on regularizing after entry as the main plan."
    ),
    steps: [
      text(
        "Renouvle paspò a epi prepare batistè, maryaj, dosye penal, admisyon oswa kontra ki koresponn.",
        "Renouvelez le passeport et préparez actes civils, casier, admission ou contrat applicable.",
        "Renueva el pasaporte y prepara actas, antecedentes, admisión o contrato aplicable.",
        "Renove o passaporte e prepare certidões, antecedentes, admissão ou contrato aplicável.",
        "Renew the passport and prepare civil records, criminal record, admission or applicable contract."
      ),
      text(
        "Tcheke si kategori ou mande otorizasyon anvan viza a; mande nimewo pwosesis ofisyèl la.",
        "Vérifiez si la catégorie exige une autorisation avant le visa et demandez le numéro officiel du dossier.",
        "Comprueba si la categoría requiere autorización antes de visa y pide el número oficial del trámite.",
        "Confira se a categoria exige autorização antes do visto e peça o número oficial do processo.",
        "Check whether the category needs authorization before the visa and request the official case number."
      ),
      text(
        "Ranpli fòm MRE a epi suiv sèlman anbasad/e-consular. Yon randevou oswa lis tann pa yon apwobasyon.",
        "Remplissez le formulaire MRE et suivez uniquement l’ambassade/e-consular. Un rendez-vous ou une liste d’attente n’est pas une approbation.",
        "Completa el formulario MRE y sigue solo embajada/e-consular. Una cita o lista de espera no es aprobación.",
        "Preencha o formulário MRE e siga apenas embaixada/e-consular. Agendamento ou fila não é aprovação.",
        "Complete the MRE form and follow only embassy/e-consular channels. An appointment or wait list is not approval."
      ),
      text(
        "Verifye viza tranzit nan tout peyi vòl la pase; pa achte yon itinerè ki mande yon viza ou pa genyen.",
        "Vérifiez le visa de transit dans chaque pays du vol; n’achetez pas un itinéraire exigeant un visa absent.",
        "Verifica visa de tránsito en cada país del vuelo; no compres una ruta que exija una visa que no tienes.",
        "Confira visto de trânsito em cada país do voo; não compre itinerário que exija visto que não possui.",
        "Check transit visas for every flight country; do not buy an itinerary requiring a visa you do not hold."
      ),
      text(
        "Apre antre ak yon viza tanporè, respekte delè pou enskripsyon nan Polícia Federal ak CRNM.",
        "Après l’entrée avec un visa temporaire, respectez le délai d’enregistrement auprès de la Police fédérale et pour la CRNM.",
        "Después de entrar con visa temporal, respeta el plazo para registrarte con Policía Federal y obtener CRNM.",
        "Após entrada com visto temporário, respeite o prazo de registro na Polícia Federal e da CRNM.",
        "After entry on a temporary visa, meet the Federal Police registration and CRNM deadline."
      )
    ]
  },
  life: [
    {
      title: text(
        "CRNM ak Polícia Federal",
        "CRNM et Police fédérale",
        "CRNM y Policía Federal",
        "CRNM e Polícia Federal",
        "CRNM and Federal Police"
      ),
      body: text(
        "CRNM se kat enskripsyon migratwa a. Kalite viza a fikse ki dokiman ak ki delè ki aplike; anpil viza tanporè mande enskripsyon nan 90 jou apre antre.",
        "La CRNM est la carte d’enregistrement migratoire. Le type de visa fixe documents et délai; de nombreux visas temporaires exigent l’enregistrement dans les 90 jours.",
        "CRNM es la tarjeta de registro migratorio. El tipo de visa define documentos y plazo; muchas visas temporales exigen registro dentro de 90 días.",
        "A CRNM é a carteira de registro migratório. O tipo de visto define documentos e prazo; muitos vistos temporários exigem registro em 90 dias.",
        "CRNM is the migration registration card. Visa type determines documents and deadline; many temporary visas require registration within 90 days."
      ),
      link: {
        label: text(
          "Gade rezidans nan PF",
          "Voir la résidence à la PF",
          "Ver residencia en PF",
          "Ver residência na PF",
          "View PF residence"
        ),
        url: "https://www.gov.br/pf/pt-br/assuntos/carta-de-servicos/migracao/obter-autorizacao-de-residencia"
      }
    },
    {
      title: text("CPF", "CPF", "CPF", "CPF", "CPF"),
      body: text(
        "CPF se nimewo fiskal ki sèvi pou travay, bank ak anpil sèvis. Etranje ki rete oswa pa rete Brezil kapab mande li sou sèvis Receita Federal la.",
        "Le CPF est le numéro fiscal utilisé pour travail, banque et de nombreux services. Les étrangers résidents ou non peuvent le demander auprès de la Receita Federal.",
        "CPF es el número fiscal usado para trabajo, banco y muchos servicios. Extranjeros residentes o no pueden solicitarlo en Receita Federal.",
        "CPF é o número fiscal usado para trabalho, banco e muitos serviços. Estrangeiros residentes ou não podem solicitá-lo na Receita Federal.",
        "CPF is the tax number used for work, banking and many services. Resident and nonresident foreigners may request it from Receita Federal."
      ),
      link: {
        label: text(
          "Mande CPF",
          "Demander le CPF",
          "Solicitar CPF",
          "Solicitar CPF",
          "Request CPF"
        ),
        url: "https://www.gov.br/pt-br/servicos/inscrever-no-cpf"
      }
    },
    {
      title: text(
        "Travay ak SINE",
        "Travail et SINE",
        "Trabajo y SINE",
        "Trabalho e SINE",
        "Work and SINE"
      ),
      body: text(
        "Apre ou gen dwa travay, sèvi ak SINE, Emprega Brasil oswa aplikasyon Carteira de Trabalho Digital. Sèvis SINE pou moun k ap chèche travay la gratis.",
        "Après obtention du droit au travail, utilisez SINE, Emprega Brasil ou l’application Carteira de Trabalho Digital. Le service SINE est gratuit pour le candidat.",
        "Cuando tengas derecho a trabajar, usa SINE, Emprega Brasil o Carteira de Trabalho Digital. El servicio SINE para buscar empleo es gratuito.",
        "Quando tiver direito ao trabalho, use SINE, Emprega Brasil ou Carteira de Trabalho Digital. O serviço SINE para trabalhador é gratuito.",
        "Once authorized to work, use SINE, Emprega Brasil or the Digital Work Card app. SINE job-search service is free."
      ),
      link: {
        label: text(
          "Chèche travay nan SINE",
          "Chercher sur SINE",
          "Buscar trabajo en SINE",
          "Buscar trabalho no SINE",
          "Search SINE jobs"
        ),
        url: "https://www.gov.br/pt-br/servicos/buscar-emprego-no-sistema-nacional-de-emprego-sine"
      }
    },
    {
      title: text(
        "Sante piblik — SUS",
        "Santé publique — SUS",
        "Salud pública — SUS",
        "Saúde pública — SUS",
        "Public health — SUS"
      ),
      body: text(
        "SUS bay swen piblik gratis pou moun ki nan peyi a kèlkeswa estati migratwa. Cartão SUS ede, men mank dokiman brezilyen pa dwe anpeche swen.",
        "Le SUS offre des soins publics gratuits aux personnes dans le pays quel que soit le statut migratoire. La carte SUS aide, mais l’absence de document brésilien ne doit pas empêcher les soins.",
        "SUS ofrece atención pública gratuita a personas en el país sin importar estatus migratorio. La tarjeta SUS ayuda, pero no tener documento brasileño no debe impedir atención.",
        "O SUS oferece atendimento público gratuito a quem está no país, independentemente do status migratório. O Cartão SUS ajuda, mas falta de documento brasileiro não impede atendimento.",
        "SUS provides free public care to people in the country regardless of migration status. A SUS card helps, but lacking Brazilian documents should not prevent care."
      ),
      link: {
        label: text(
          "Konnen dwa ou nan SUS",
          "Connaître vos droits au SUS",
          "Conocer derechos en SUS",
          "Conhecer direitos no SUS",
          "Know your SUS rights"
        ),
        url: "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/cartilhas/2024/conheca-seus-direitos-no-sus.pdf"
      }
    },
    {
      title: text(
        "Diplòm etranje",
        "Diplôme étranger",
        "Título extranjero",
        "Diploma estrangeiro",
        "Foreign degree"
      ),
      body: text(
        "Pou yon diplòm inivèsite, platfòm Carolina Bori ede ak revalidasyon oswa rekonesans. Pwofesyon reglemante yo ka mande yon konsèy pwofesyonèl anplis.",
        "Pour un diplôme universitaire, la plateforme Carolina Bori aide à la revalidation ou reconnaissance. Les professions réglementées peuvent exiger un ordre professionnel.",
        "Para un título universitario, Carolina Bori ayuda con revalidación o reconocimiento. Profesiones reguladas pueden requerir consejo profesional.",
        "Para diploma universitário, a Plataforma Carolina Bori orienta revalidação ou reconhecimento. Profissões regulamentadas podem exigir conselho profissional.",
        "For a university degree, Carolina Bori supports revalidation or recognition. Regulated professions may also require a professional council."
      ),
      link: {
        label: text(
          "Louvri Carolina Bori",
          "Ouvrir Carolina Bori",
          "Abrir Carolina Bori",
          "Abrir Carolina Bori",
          "Open Carolina Bori"
        ),
        url: "https://plataformacarolinabori.mec.gov.br/usuario/acesso"
      }
    }
  ],
  irregular: {
    title: text(
      "Antre pa yon koridò klandesten pa garanti rezidans imanitè",
      "Une entrée clandestine ne garantit pas la résidence humanitaire",
      "Entrar por un corredor clandestino no garantiza residencia humanitaria",
      "Entrar por corredor clandestino não garante residência humanitária",
      "Entering through a clandestine corridor does not guarantee humanitarian residence"
    ),
    body: text(
      "Gen moun ki pale de soti Ayiti pou zile Karayib oswa nò Amerik di Sid, epi kontinye nan direksyon Brezil. Non peyi yo ka chanje selon rezo k ap fè trafik la, men reyalite legal la pa chanje: chak fwontyè mande admisyon, epi ansyen règ imanitè Ayiti a pa yon garanti an 2026.",
      "Certains parlent de quitter Haïti vers des îles caraïbes ou le nord de l’Amérique du Sud puis de continuer vers le Brésil. Les pays cités changent selon les réseaux, mais la réalité juridique reste la même: chaque frontière exige une admission et l’ancienne règle humanitaire n’est pas une garantie en 2026.",
      "Algunos hablan de salir de Haití hacia islas del Caribe o el norte de Sudamérica y continuar a Brasil. Los países cambian según las redes, pero la realidad legal es la misma: cada frontera exige admisión y la antigua regla humanitaria no garantiza nada en 2026.",
      "Alguns falam em sair do Haiti para ilhas do Caribe ou norte da América do Sul e seguir ao Brasil. Os países mudam conforme as redes, mas a realidade jurídica é a mesma: cada fronteira exige admissão e a antiga regra humanitária não é garantia em 2026.",
      "People discuss leaving Haiti for Caribbean islands or northern South America and continuing toward Brazil. Country names vary by smuggling network, but the legal reality is the same: every border requires admission, and the old Haiti humanitarian rule is no guarantee in 2026."
    ),
    patterns: [
      text(
        "Yon viza oswa antre nan Jamayik, Giyàn oswa yon lòt peyi pa bay dwa pou antre Brezil.",
        "Un visa ou une entrée en Jamaïque, au Guyana ou ailleurs n’autorise pas l’entrée au Brésil.",
        "Una visa o entrada a Jamaica, Guyana u otro país no autoriza entrar a Brasil.",
        "Visto ou entrada na Jamaica, Guiana ou outro país não autoriza entrar no Brasil.",
        "A visa or entry to Jamaica, Guyana or another country does not authorize entry to Brazil."
      ),
      text(
        "Travèse forè, rivyè oswa lanmè san kontwòl ofisyèl ogmante risk disparisyon, eksplwatasyon ak retou.",
        "Traverser forêt, rivière ou mer hors contrôle officiel augmente le risque de disparition, exploitation et retour.",
        "Cruzar selva, río o mar fuera de control oficial aumenta riesgo de desaparición, explotación y devolución.",
        "Cruzar floresta, rio ou mar fora do controle oficial aumenta risco de desaparecimento, exploração e retorno.",
        "Crossing forest, river or sea outside official control raises risks of disappearance, exploitation and return."
      ),
      text(
        "Yon demann refij dwe baze sou pwòp bezwen pwoteksyon ou; li pa fèt pou kouvri yon plan travay.",
        "Une demande d’asile doit reposer sur votre besoin de protection; elle ne sert pas à couvrir un projet de travail.",
        "Una solicitud de refugio debe basarse en tu propia necesidad de protección; no sirve para cubrir un plan laboral.",
        "Pedido de refúgio deve se basear na sua necessidade de proteção; não serve para encobrir plano de trabalho.",
        "A refuge request must be based on your own protection need; it is not a cover for a work plan."
      )
    ],
    risks: [
      text(
        "trafik moun, vòl ak ekstòsyon",
        "traite, vol et extorsion",
        "trata, robo y extorsión",
        "tráfico, roubo e extorsão",
        "trafficking, robbery and extortion"
      ),
      text(
        "refi antre, detansyon oswa retou",
        "refus d’entrée, détention ou retour",
        "rechazo de entrada, detención o devolución",
        "recusa de entrada, detenção ou retorno",
        "refusal of entry, detention or return"
      ),
      text(
        "pèdi paspò ak prèv fanmi",
        "perte du passeport et des preuves familiales",
        "pérdida de pasaporte y pruebas familiares",
        "perda de passaporte e provas familiares",
        "loss of passport and family evidence"
      ),
      text(
        "pa ka pase nan travay ak lokasyon regilye",
        "difficulté d’accès au travail et au logement réguliers",
        "dificultad para empleo y vivienda regulares",
        "dificuldade para emprego e moradia regulares",
        "difficulty accessing regular work and housing"
      )
    ],
    closing: text(
      "Si objektif la se Brezil, pi bon wout la se jwenn kategori viza a, otorizasyon an ak admisyon an anvan depa, epi antre nan yon pwen kontwòl ofisyèl.",
      "Si le but est le Brésil, la meilleure voie est d’obtenir catégorie, autorisation et admission avant le départ et d’entrer à un contrôle officiel.",
      "Si el destino es Brasil, la mejor vía es obtener categoría, autorización y admisión antes de salir y entrar por control oficial.",
      "Se o destino é o Brasil, a melhor via é obter categoria, autorização e admissão antes da saída e entrar por controle oficial.",
      "If Brazil is the destination, secure the visa category, authorization and admission before departure and enter at an official checkpoint."
    )
  },
  updates: [
    {
      date: "2025-12-31",
      title: text(
        "Ansyen règ imanitè Ayiti a revoke",
        "Ancienne règle humanitaire Haïti révoquée",
        "Antigua norma humanitaria para Haití revocada",
        "Antiga regra humanitária do Haiti revogada",
        "Former Haiti humanitarian rule revoked"
      ),
      body: text(
        "Portaria 60/2025 ranplase règ espesifik yo ak yon kad jeneral ki mande yon zak apa pou defini peyi, kondisyon ak pòs ki ka bay viza.",
        "La Portaria 60/2025 remplace les règles spécifiques par un cadre général exigeant un acte séparé pour définir pays, conditions et postes émetteurs.",
        "La Portaria 60/2025 reemplazó reglas específicas por un marco general que exige un acto aparte para definir países, condiciones y consulados.",
        "A Portaria 60/2025 substituiu regras específicas por norma geral que exige ato separado para definir países, condições e postos emissores.",
        "Portaria 60/2025 replaced specific rules with a general framework requiring a separate act to define countries, conditions and issuing posts."
      ),
      link: {
        label: text(
          "Li Portaria 60 la",
          "Lire la Portaria 60",
          "Leer Portaria 60",
          "Ler Portaria 60",
          "Read Portaria 60"
        ),
        url: "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes/portal-de-imigracao-laboral/normas-migratorias-1/portarias/portarias-interministeriais/portaria-interministerial-mjsp-mre-no-60-de-30-de-dezembro-de-2025.pdf/view"
      }
    },
    {
      date: "2026-08-03",
      title: text(
        "Pwosedi elektwonik fanmi an pwolonje pou dosye ki deja egziste",
        "Procédure familiale électronique prolongée pour dossiers existants",
        "Proceso familiar electrónico extendido para casos existentes",
        "Processo familiar eletrônico prorrogado para casos existentes",
        "Electronic family process extended for existing cases"
      ),
      body: text(
        "Portaria 67/2026 modifye pwosedi elektwonik pou Ayisyen ki te deja gen otorizasyon fanmi anba Portaria 38/2023. Li pa louvri yon nouvo pwogram pou tout moun.",
        "La Portaria 67/2026 modifie la procédure électronique pour les Haïtiens déjà autorisés sous la Portaria 38/2023. Elle n’ouvre pas un nouveau programme général.",
        "La Portaria 67/2026 modifica el proceso electrónico para haitianos ya autorizados bajo la Portaria 38/2023. No abre un programa nuevo para todos.",
        "A Portaria 67/2026 altera o processo eletrônico para haitianos já autorizados pela Portaria 38/2023. Não abre programa novo para todos.",
        "Portaria 67/2026 changes the electronic process for Haitians already authorized under Portaria 38/2023. It does not open a new general program."
      ),
      link: {
        label: text(
          "Li desizyon 2026 la",
          "Lire la décision de 2026",
          "Leer decisión 2026",
          "Ler decisão de 2026",
          "Read the 2026 decision"
        ),
        url: "https://bibliotecadigital.mj.gov.br/handle/1/17421"
      }
    }
  ]
};

const mexico: CountryMigrationGuide = {
  country: "mexico",
  tone: "possible",
  reviewedAt: "2026-08-25",
  summary: text(
    "Meksik se yon peyi Amerik dinò, ak kapital li Ciudad de México ak lang prensipal panyòl. Pou paspò ayisyen, viza nesesè menm pou touris oswa tranzit. Travay, etid ak fanmi gen pwosedi reyèl, men yo dwe kòmanse nan bon lòd la.",
    "Le Mexique est un pays d’Amérique du Nord, avec Mexico pour capitale et l’espagnol comme langue principale. Le passeport haïtien exige un visa même pour tourisme ou transit. Travail, études et famille ont des procédures réelles, à suivre dans le bon ordre.",
    "México es un país de América del Norte, con capital en Ciudad de México y español como idioma principal. El pasaporte haitiano requiere visa incluso para turismo o tránsito. Trabajo, estudios y familia tienen procesos reales que deben seguirse en el orden correcto.",
    "O México é um país da América do Norte, com capital na Cidade do México e espanhol como idioma principal. Passaporte haitiano exige visto até para turismo ou trânsito. Trabalho, estudo e família têm processos reais, na ordem correta.",
    "Mexico is a North American country, with Mexico City as its capital and Spanish as its main language. A Haitian passport requires a visa even for tourism or transit. Work, study and family have real processes that must be followed in the right order."
  ),
  facts: [
    {
      label: sharedFacts.capital,
      value: text(
        "Ciudad de México",
        "Mexico",
        "Ciudad de México",
        "Cidade do México",
        "Mexico City"
      )
    },
    {
      label: sharedFacts.language,
      value: text("Panyòl", "Espagnol", "Español", "Espanhol", "Spanish")
    },
    {
      label: sharedFacts.currency,
      value: text(
        "Peso meksiken (MXN)",
        "Peso mexicain (MXN)",
        "Peso mexicano (MXN)",
        "Peso mexicano (MXN)",
        "Mexican peso (MXN)"
      )
    },
    {
      label: sharedFacts.region,
      value: text(
        "Amerik dinò",
        "Amérique du Nord",
        "América del Norte",
        "América do Norte",
        "North America"
      )
    }
  ],
  verdict: {
    label: text(
      "Posib ak viza ki koresponn",
      "Possible avec le visa correspondant",
      "Posible con la visa correcta",
      "Possível com o visto correto",
      "Possible with the correct visa"
    ),
    title: text(
      "Pou travay oswa fanmi, etap la kòmanse nan Meksik; pou etid oswa vizit, li kòmanse nan anbasad la.",
      "Pour le travail ou la famille, la première étape commence au Mexique; pour études ou visite, elle commence à l’ambassade.",
      "Para trabajo o familia, el primer paso empieza en México; para estudios o visita, empieza en la embajada.",
      "Para trabalho ou família, o primeiro passo começa no México; para estudo ou visita, começa na embaixada.",
      "For work or family, the first step starts in Mexico; for study or a visit, it starts at the embassy."
    ),
    body: text(
      "Yon anplwayè oswa fanmi nan Meksik dwe mande otorizasyon INM ak yon NUT pou travay oswa inite fanmi. Etidyan mande viza dirèk ak lèt admisyon. Vizitè ayisyen bezwen viza epi viza vizit la pa pèmèt travay.",
      "Un employeur ou proche au Mexique doit demander l’autorisation INM et un NUT pour travail ou unité familiale. L’étudiant demande directement avec lettre d’admission. Le visiteur haïtien a besoin d’un visa qui n’autorise pas le travail.",
      "Un empleador o familiar en México debe solicitar autorización del INM y NUT para trabajo o unidad familiar. El estudiante solicita directamente con carta de admisión. El visitante haitiano necesita visa y esa visa no permite trabajar.",
      "Empregador ou familiar no México deve pedir autorização do INM e NUT para trabalho ou unidade familiar. Estudante solicita diretamente com carta de admissão. Visitante haitiano precisa de visto e esse visto não permite trabalho.",
      "An employer or family member in Mexico must request INM authorization and a NUT for work or family unity. A student applies directly with an admission letter. Haitian visitors need a visa, and that visa does not allow work."
    ),
    points: [
      text(
        "Randevou MiConsulado a gratis epi endividyèl; plas yo konn fini vit epi anbasad la anonse nouvo ouvèti yo.",
        "Le rendez-vous MiConsulado est gratuit et individuel; les places partent vite et l’ambassade annonce les nouvelles ouvertures.",
        "La cita MiConsulado es gratuita e individual; los espacios se agotan rápido y la embajada anuncia nuevas aperturas.",
        "O agendamento MiConsulado é gratuito e individual; as vagas acabam rápido e a embaixada anuncia novas aberturas.",
        "MiConsulado appointments are free and individual; spaces fill quickly and the embassy announces new openings."
      ),
      text(
        "Yon NUT oswa randevou pa garanti viza; desizyon final la depann de verifikasyon ak entèvyou.",
        "Un NUT ou rendez-vous ne garantit pas le visa; la décision finale dépend de la vérification et de l’entretien.",
        "Un NUT o una cita no garantiza la visa; la decisión final depende de verificación y entrevista.",
        "NUT ou agendamento não garante visto; a decisão final depende de verificação e entrevista.",
        "A NUT or appointment does not guarantee a visa; the final decision depends on verification and interview."
      ),
      text(
        "Apre antre ak yon viza rezidans, kat rezidan an dwe chanje nan INM nan 30 jou natirèl.",
        "Après l’entrée avec un visa de résidence, la carte doit être échangée auprès de l’INM dans les 30 jours calendaires.",
        "Después de entrar con visa de residencia, debes canjearla por tarjeta ante INM dentro de 30 días naturales.",
        "Após entrar com visto de residência, troque pela carteira no INM em 30 dias corridos.",
        "After entry with a residence visa, exchange it for the INM residence card within 30 calendar days."
      )
    ]
  },
  pathways: [
    {
      title: text(
        "Travay ak NUT",
        "Travail avec NUT",
        "Trabajo con NUT",
        "Trabalho com NUT",
        "Work with NUT"
      ),
      availability: text(
        "Ouvè ak yon anplwayè anrejistre",
        "Ouvert avec un employeur enregistré",
        "Disponible con empleador registrado",
        "Disponível com empregador registrado",
        "Available with a registered employer"
      ),
      tone: "possible",
      summary: text(
        "Anplwayè a nan Meksik dwe gen enskripsyon INM epi mande otorizasyon pou òf travay la. Si yo apwouve, INM bay NUT pou etap konsilè a.",
        "L’employeur au Mexique doit être enregistré auprès de l’INM et demander l’autorisation de l’offre. Après approbation, l’INM délivre le NUT pour l’étape consulaire.",
        "El empleador en México debe tener registro ante INM y solicitar autorización de la oferta. Si se aprueba, INM emite NUT para la etapa consular.",
        "O empregador no México deve ter registro no INM e pedir autorização da oferta. Se aprovado, o INM emite NUT para a etapa consular.",
        "The Mexican employer must be registered with INM and request authorization for the offer. If approved, INM issues a NUT for the consular step."
      ),
      action: text(
        "Mande kopi NUT, òf travay orijinal, idantite moun ki siyen an ak prèv enskripsyon anplwayè a. Apre sa pran randevou “visa con autorización del INM”.",
        "Demandez copie du NUT, offre originale, identité du signataire et preuve d’enregistrement de l’employeur. Prenez ensuite le rendez-vous « visa con autorización del INM ».",
        "Pide copia del NUT, oferta original, identificación del firmante y constancia del empleador. Luego toma cita “visa con autorización del INM”.",
        "Peça cópia do NUT, oferta original, identificação do signatário e registro do empregador. Depois agende “visa con autorización del INM”.",
        "Request the NUT copy, original offer, signer’s ID and employer registration proof. Then book “visa con autorización del INM.”"
      ),
      link: {
        label: text(
          "Gade travay ak NUT",
          "Voir travail avec NUT",
          "Ver trabajo con NUT",
          "Ver trabalho com NUT",
          "View work with NUT"
        ),
        url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/nutespanol"
      }
    },
    {
      title: text(
        "Fanmi ak NUT",
        "Famille avec NUT",
        "Familia con NUT",
        "Família com NUT",
        "Family with NUT"
      ),
      availability: text(
        "Ouvè pou relasyon ki kalifye",
        "Ouvert aux liens admissibles",
        "Disponible para vínculos elegibles",
        "Disponível para vínculos elegíveis",
        "Available to eligible relationships"
      ),
      tone: "possible",
      summary: text(
        "Fanmi ki se sitwayen meksiken oswa rezidan an ka kòmanse demann lan nan INM. Kalite rezidans la depann de relasyon an ak estati fanmi an.",
        "Le proche mexicain ou résident peut commencer la demande auprès de l’INM. Le type de résidence dépend du lien et du statut du proche.",
        "El familiar mexicano o residente puede iniciar en INM. El tipo de residencia depende del vínculo y estatus del familiar.",
        "O familiar mexicano ou residente pode iniciar no INM. O tipo de residência depende do vínculo e status do familiar.",
        "The Mexican or resident family member may start the request with INM. Residence type depends on the relationship and the family member’s status."
      ),
      action: text(
        "Fanmi an prezante dosye a nan Meksik. Lè NUT la soti, pote batistè oswa maryaj ki pwouve relasyon an, ansanm ak kopi kat rezidans oswa idantite moun ki rele a.",
        "Le proche dépose au Mexique. Après le NUT, présentez actes prouvant le lien et copie de la carte de résidence ou identité du répondant.",
        "El familiar presenta en México. Cuando salga el NUT, lleva actas que prueben vínculo y copia de tarjeta de residencia o identificación del promovente.",
        "O familiar apresenta no México. Com o NUT, leve certidões do vínculo e cópia da carteira de residência ou identificação de quem chama.",
        "The family member files in Mexico. Once the NUT is issued, bring civil records proving the relationship and a copy of the sponsor’s residence card or ID."
      ),
      link: {
        label: text(
          "Gade inite fanmi",
          "Voir l’unité familiale",
          "Ver unidad familiar",
          "Ver unidade familiar",
          "View family unity"
        ),
        url: "https://www.gob.mx/inm/documentos/preguntas-frecuentes-para-solicitar-visa-por-unidad-familiar"
      }
    },
    {
      title: text("Etid", "Études", "Estudios", "Estudos", "Study"),
      availability: text(
        "Ouvè ak admisyon ak mwayen finans",
        "Ouvert avec admission et ressources",
        "Disponible con admisión y solvencia",
        "Disponível com admissão e meios financeiros",
        "Available with admission and funds"
      ),
      tone: "possible",
      summary: text(
        "Lekòl meksiken an dwe bay yon lèt admisyon orijinal ki montre pwogram, dat, dire ak frè. Ou dwe pwouve kijan ou pral peye etid ak lavi a oswa yon bous valid.",
        "L’établissement mexicain doit fournir une lettre originale indiquant programme, dates, durée et coûts. Il faut prouver les ressources ou une bourse valable.",
        "La institución mexicana debe emitir carta original con programa, fechas, duración y costos. Debes probar cómo pagarás estudios y manutención o una beca válida.",
        "A instituição mexicana deve emitir carta original com programa, datas, duração e custos. É preciso provar meios para estudo e manutenção ou bolsa válida.",
        "The Mexican school must issue an original letter with program, dates, duration and costs. You must prove study and living funds or a valid scholarship."
      ),
      action: text(
        "Pran randevou “visa sin autorización del INM”, pote orijinal yo epi, si yo apwouve, chanje viza a pou kat rezidan nan 30 jou apre antre.",
        "Prenez le rendez-vous « visa sin autorización del INM », apportez les originaux et, après approbation, échangez le visa contre la carte dans les 30 jours suivant l’entrée.",
        "Toma cita “visa sin autorización del INM”, lleva originales y, si se aprueba, canjea la visa por tarjeta dentro de 30 días de entrar.",
        "Agende “visa sin autorización del INM”, leve originais e, se aprovado, troque o visto pela carteira em 30 dias após a entrada.",
        "Book “visa sin autorización del INM,” bring originals and, if approved, exchange the visa for a card within 30 days of entry."
      ),
      link: {
        label: text(
          "Gade viza etid",
          "Voir le visa d’études",
          "Ver visa de estudiante",
          "Ver visto de estudante",
          "View student visa"
        ),
        url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/estudiante"
      }
    },
    {
      title: text(
        "Vizit oswa tranzit",
        "Visite ou transit",
        "Visita o tránsito",
        "Visita ou trânsito",
        "Visit or transit"
      ),
      availability: text(
        "Viza obligatwa",
        "Visa obligatoire",
        "Visa obligatoria",
        "Visto obrigatório",
        "Visa required"
      ),
      tone: "conditional",
      summary: text(
        "Paspò ayisyen bezwen viza pou touris, biznis oswa tranzit. Viza sa a pa pèmèt travay. Gen kèk eksepsyon pou moun ki gen sèten viza miltip oswa kat rezidans pèmanan valab lòt peyi.",
        "Le passeport haïtien exige un visa pour tourisme, affaires ou transit. Il n’autorise pas le travail. Certaines exceptions existent avec certains visas multiples ou cartes de résidence permanente valables.",
        "El pasaporte haitiano requiere visa para turismo, negocios o tránsito. No permite trabajar. Existen excepciones para ciertos titulares de visas múltiples o residencias permanentes válidas.",
        "Passaporte haitiano exige visto para turismo, negócios ou trânsito. Não permite trabalho. Há exceções para certos vistos múltiplos ou residências permanentes válidas.",
        "A Haitian passport requires a visa for tourism, business or transit. It does not allow work. Some exceptions apply to holders of certain valid multiple-entry visas or permanent residence cards."
      ),
      action: text(
        "Tcheke si eksepsyon an egzakteman koresponn ak dokiman ou. Si non, pran randevou MiConsulado epi pa achte tikè anvan desizyon an.",
        "Vérifiez que l’exception correspond exactement à votre document. Sinon, prenez rendez-vous MiConsulado et n’achetez pas le billet avant décision.",
        "Verifica que la excepción coincida exactamente con tu documento. Si no, toma cita MiConsulado y no compres pasaje antes de la decisión.",
        "Confira se a exceção corresponde exatamente ao seu documento. Se não, agende MiConsulado e não compre passagem antes da decisão.",
        "Check that the exception exactly matches your document. Otherwise book MiConsulado and do not buy a ticket before the decision."
      ),
      link: {
        label: text(
          "Gade viza vizit",
          "Voir le visa de visite",
          "Ver visa de visitante",
          "Ver visto de visitante",
          "View visitor visa"
        ),
        url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/visavisitante"
      }
    },
    {
      title: text(
        "Refij ak COMAR",
        "Asile avec COMAR",
        "Refugio con COMAR",
        "Refúgio com COMAR",
        "Refuge with COMAR"
      ),
      availability: text(
        "Pou moun ki deja Meksik",
        "Pour les personnes déjà au Mexique",
        "Para personas ya en México",
        "Para quem já está no México",
        "For people already in Mexico"
      ),
      tone: "conditional",
      summary: text(
        "Refij se pou yon moun ki pa ka retounen akoz pèsekisyon oswa vyolans grav ki menase lavi, sekirite oswa libète li. Li pa mande soti Ayiti.",
        "L’asile protège une personne qui ne peut rentrer en raison de persécution ou violence grave menaçant vie, sécurité ou liberté. Impossible depuis Haïti.",
        "El refugio protege a quien no puede volver por persecución o violencia grave que amenaza vida, seguridad o libertad. No se pide desde Haití.",
        "Refúgio protege quem não pode voltar por perseguição ou violência grave contra vida, segurança ou liberdade. Não se pede do Haiti.",
        "Refuge protects someone unable to return due to persecution or serious violence threatening life, safety or freedom. It cannot be requested from Haiti."
      ),
      action: text(
        "An jeneral, prezante demann lan nan COMAR oswa INM nan 30 jou ouvrab apre antre. Ou dwe rete nan eta kote ou depoze a epi siyen prezans jan COMAR mande.",
        "En général, déposez auprès de COMAR ou INM dans les 30 jours ouvrables après l’entrée. Restez dans l’État de dépôt et signez la présence demandée.",
        "En general, solicita ante COMAR o INM dentro de 30 días hábiles de entrar. Debes permanecer en el estado donde solicitaste y firmar asistencia.",
        "Em geral, peça à COMAR ou INM em 30 dias úteis após a entrada. Permaneça no estado onde pediu e registre presença.",
        "Generally apply with COMAR or INM within 30 business days of entry. Stay in the state where you applied and complete required check-ins."
      ),
      link: {
        label: text("Gade COMAR", "Voir COMAR", "Ver COMAR", "Ver COMAR", "View COMAR"),
        url: "https://www.gob.mx/comar/que-hacemos"
      }
    }
  ],
  fromHaiti: {
    intro: text(
      "Pou Meksik, idantifye kiyès ki dwe kòmanse dosye a: ou menm pou etid/vizit, oswa anplwayè/fanmi an nan Meksik pou NUT.",
      "Pour le Mexique, identifiez qui commence le dossier: vous pour études/visite, ou l’employeur/le proche au Mexique pour le NUT.",
      "Para México, identifica quién inicia el trámite: tú para estudios/visita, o empleador/familiar en México para el NUT.",
      "Para o México, identifique quem inicia: você para estudo/visita, ou empregador/familiar no México para o NUT.",
      "For Mexico, identify who starts the case: you for study/visit, or the employer/family member in Mexico for the NUT."
    ),
    steps: [
      text(
        "Renouvle paspò a epi prepare orijinal batistè, maryaj, bank, travay oswa admisyon ki koresponn.",
        "Renouvelez le passeport et préparez les originaux d’état civil, banque, travail ou admission applicables.",
        "Renueva el pasaporte y prepara originales de actas, banco, trabajo o admisión aplicables.",
        "Renove o passaporte e prepare originais de certidões, banco, trabalho ou admissão.",
        "Renew the passport and prepare original civil, bank, work or admission documents."
      ),
      text(
        "Si se travay oswa fanmi, tann INM apwouve epi bay NUT anvan ou chèche randevou konsilè.",
        "Pour travail ou famille, attendez l’approbation INM et le NUT avant le rendez-vous consulaire.",
        "Para trabajo o familia, espera aprobación del INM y NUT antes de buscar cita consular.",
        "Para trabalho ou família, espere aprovação do INM e NUT antes do agendamento consular.",
        "For work or family, wait for INM approval and the NUT before seeking a consular appointment."
      ),
      text(
        "Kreye pwòp kont MiConsulado ou. Randevou a gratis; pa achte l nan men yon moun oswa yon gwoup WhatsApp.",
        "Créez votre propre compte MiConsulado. Le rendez-vous est gratuit; ne l’achetez pas à une personne ou sur WhatsApp.",
        "Crea tu propia cuenta MiConsulado. La cita es gratuita; no la compres a una persona o grupo de WhatsApp.",
        "Crie sua conta MiConsulado. O agendamento é gratuito; não compre de pessoa ou grupo de WhatsApp.",
        "Create your own MiConsulado account. The appointment is free; do not buy it from a person or WhatsApp group."
      ),
      text(
        "Pote tout orijinal ak kopi nan entèvyou a; yon dosye enkonplè ka pa resevwa.",
        "Apportez tous les originaux et copies; un dossier incomplet peut ne pas être reçu.",
        "Lleva todos los originales y copias; un expediente incompleto puede no ser recibido.",
        "Leve todos os originais e cópias; processo incompleto pode não ser recebido.",
        "Bring all originals and copies; an incomplete file may not be accepted."
      ),
      text(
        "Apre viza rezidans lan apwouve, antre pandan validite li epi fè canje nan INM nan 30 jou natirèl.",
        "Après approbation du visa de résidence, entrez pendant sa validité et faites l’échange INM dans les 30 jours calendaires.",
        "Tras aprobarse la visa de residencia, entra durante su vigencia y haz canje en INM dentro de 30 días naturales.",
        "Após aprovação do visto de residência, entre durante a validade e faça o canje no INM em 30 dias corridos.",
        "After residence visa approval, enter during its validity and complete the INM exchange within 30 calendar days."
      )
    ]
  },
  life: [
    {
      title: text(
        "Kat rezidan",
        "Carte de résident",
        "Tarjeta de residente",
        "Carteira de residente",
        "Residence card"
      ),
      body: text(
        "Viza rezidans nan paspò a se pou antre ak fè canje. Ale nan biwo INM ki koresponn ak adrès ou nan 30 jou natirèl pou jwenn kat la.",
        "Le visa de résidence dans le passeport sert à entrer et faire l’échange. Allez au bureau INM de votre domicile dans les 30 jours calendaires.",
        "La visa de residencia en el pasaporte sirve para entrar y hacer canje. Acude a la oficina INM de tu domicilio dentro de 30 días naturales.",
        "O visto de residência no passaporte serve para entrar e fazer o canje. Vá ao INM do seu endereço em 30 dias corridos.",
        "The passport residence visa is for entry and exchange. Go to the INM office for your address within 30 calendar days."
      ),
      link: {
        label: text(
          "Fè canje a",
          "Faire l’échange",
          "Hacer el canje",
          "Fazer o canje",
          "Complete the exchange"
        ),
        url: "https://www.gob.mx/tramites/ficha/expedicion-de-documento-migratorio-por-canje/INM811"
      }
    },
    {
      title: text("CURP", "CURP", "CURP", "CURP", "CURP"),
      body: text(
        "CURP se kle idantifikasyon pou anpil sèvis. INM oswa COMAR ka bay yon CURP tanporè selon dokiman migratwa oswa pwosedi pwoteksyon ou.",
        "La CURP est la clé d’identification de nombreux services. INM ou COMAR peut délivrer une CURP temporaire selon le document migratoire ou la procédure de protection.",
        "CURP es la clave de identificación para muchos servicios. INM o COMAR puede emitir CURP temporal según tu documento migratorio o proceso de protección.",
        "CURP é a chave de identificação para muitos serviços. INM ou COMAR pode emitir CURP temporária conforme documento migratório ou processo de proteção.",
        "CURP is the identification key for many services. INM or COMAR may issue a temporary CURP based on migration documents or a protection process."
      ),
      link: {
        label: text(
          "Konprann CURP tanporè",
          "Comprendre la CURP temporaire",
          "Entender CURP temporal",
          "Entender CURP temporária",
          "Understand temporary CURP"
        ),
        url: "https://www.gob.mx/segob%7Crenapo/acciones-y-programas/preguntas-frecuentes-sobre-la-clave-unica-de-registro-de-poblacion-temporal-para-extranjeros"
      }
    },
    {
      title: text("Travay", "Travail", "Trabajo", "Trabalho", "Work"),
      body: text(
        "Apre dokiman ou pèmèt travay, itilize Portal del Empleo ak biwo Servicio Nacional de Empleo. Sèvis piblik sa yo pa dwe mande w peye pou wè yon pòs.",
        "Après autorisation de travail, utilisez Portal del Empleo et les bureaux du Service national de l’emploi. Ces services publics ne doivent pas vous faire payer pour voir une offre.",
        "Cuando tu documento permita trabajar, usa Portal del Empleo y oficinas del Servicio Nacional de Empleo. Estos servicios públicos no deben cobrarte por ver vacantes.",
        "Quando seu documento permitir trabalho, use Portal del Empleo e escritórios do Serviço Nacional de Emprego. Esses serviços públicos não cobram para ver vagas.",
        "Once your document allows work, use Portal del Empleo and National Employment Service offices. These public services should not charge to view jobs."
      ),
      link: {
        label: text(
          "Chèche travay",
          "Chercher un emploi",
          "Buscar trabajo",
          "Buscar trabalho",
          "Search jobs"
        ),
        url: "https://empleo.gob.mx/"
      }
    },
    {
      title: text(
        "Etid ak ekivalans",
        "Études et équivalence",
        "Estudios y equivalencia",
        "Estudos e equivalência",
        "Study and equivalency"
      ),
      body: text(
        "Pou sèvi ak etid ki fèt Ayiti, tcheke si SEP mande ekivalans oswa revalidasyon. Pote nòt, diplòm ak legalizasyon/tradiksyon yo mande.",
        "Pour utiliser les études faites en Haïti, vérifiez si la SEP exige équivalence ou revalidation. Apportez relevés, diplômes et légalisations/traductions demandés.",
        "Para usar estudios de Haití, comprueba si SEP exige equivalencia o revalidación. Lleva notas, diplomas y legalizaciones/traducciones requeridas.",
        "Para usar estudos do Haiti, confira se a SEP exige equivalência ou revalidação. Leve notas, diplomas e legalizações/traduções exigidas.",
        "To use Haitian studies, check whether SEP requires equivalency or revalidation. Bring transcripts, diplomas and required legalization/translations."
      ),
      link: {
        label: text("Ale nan SERE", "Ouvrir SERE", "Abrir SERE", "Abrir SERE", "Open SERE"),
        url: "https://sere.sep.gob.mx/"
      }
    },
    {
      title: text(
        "Pwoteksyon ak prezans",
        "Protection et présence",
        "Protección y firmas",
        "Proteção e presença",
        "Protection and check-ins"
      ),
      body: text(
        "Si ou mande refij, rete nan eta kote ou depoze a epi fè siyati prezans nan dat COMAR bay. Deplase san otorizasyon ka fè yo fèmen dosye a kòm abandone.",
        "Si vous demandez l’asile, restez dans l’État de dépôt et effectuez les signatures demandées par COMAR. Partir sans autorisation peut fermer le dossier pour abandon.",
        "Si solicitas refugio, permanece en el estado donde lo hiciste y firma asistencia según COMAR. Moverte sin autorización puede cerrar el caso por abandono.",
        "Se pedir refúgio, permaneça no estado do pedido e registre presença conforme COMAR. Mudar sem autorização pode encerrar o processo por abandono.",
        "If requesting refuge, remain in the filing state and complete COMAR check-ins. Moving without authorization may close the case as abandoned."
      ),
      link: {
        label: text(
          "Jwenn biwo COMAR",
          "Trouver un bureau COMAR",
          "Encontrar oficina COMAR",
          "Encontrar escritório COMAR",
          "Find COMAR office"
        ),
        url: "https://www.gob.mx/comar/es/articulos/directorio-comar"
      }
    }
  ],
  irregular: {
    title: text(
      "Meksik pa yon pasaj otomatik pou Etazini",
      "Le Mexique n’est pas un passage automatique vers les États-Unis",
      "México no es un paso automático hacia Estados Unidos",
      "México não é passagem automática para os Estados Unidos",
      "Mexico is not an automatic passage to the United States"
    ),
    body: text(
      "Gen moun ki rive Meksik apre vwayaj nan Karayib, Amerik di Sid, Darién ak Amerik Santral. An 2026, mouvman sa yo bese anpil epi gen plis retou nan direksyon sid. Rive Meksik pa bay randevou sou fwontyè Etazini, parole oswa garanti azil.",
      "Certaines personnes arrivent au Mexique après les Caraïbes, l’Amérique du Sud, le Darién et l’Amérique centrale. En 2026, ces mouvements ont fortement baissé et les retours vers le sud ont augmenté. Arriver au Mexique ne donne ni rendez-vous à la frontière américaine, ni parole, ni garantie d’asile.",
      "Algunas personas llegan a México tras Caribe, Sudamérica, Darién y Centroamérica. En 2026 esos movimientos bajaron mucho y crecieron los retornos al sur. Llegar a México no da cita en la frontera de EE. UU., parole ni garantía de asilo.",
      "Algumas pessoas chegam ao México após Caribe, América do Sul, Darién e América Central. Em 2026 esses movimentos caíram muito e aumentaram retornos ao sul. Chegar ao México não dá agendamento na fronteira dos EUA, parole nem garantia de asilo.",
      "Some people reach Mexico after traveling through the Caribbean, South America, the Darién and Central America. In 2026 those movements fell sharply and southbound returns increased. Reaching Mexico provides no U.S. border appointment, parole or asylum guarantee."
    ),
    patterns: [
      text(
        "Travèse plizyè peyi san papye ekspoze w ak refi antre, retou ak prizon administratif.",
        "Traverser plusieurs pays sans papiers expose au refus, retour et détention administrative.",
        "Cruzar varios países sin documentos expone a rechazo, devolución y detención administrativa.",
        "Cruzar vários países sem documentos expõe a recusa, retorno e detenção administrativa.",
        "Crossing several countries without documents exposes you to refusal, return and administrative detention."
      ),
      text(
        "Darién gen forè, rivyè, mank swen ak gwoup kriminèl; pa gen yon travèse san danje nou ka konseye.",
        "Le Darién comporte jungle, rivières, absence de soins et groupes criminels; il n’existe pas de traversée sûre à conseiller.",
        "Darién tiene selva, ríos, falta de atención y grupos criminales; no existe un cruce seguro que podamos recomendar.",
        "Darién tem floresta, rios, falta de atendimento e grupos criminosos; não existe travessia segura que possamos recomendar.",
        "The Darién has jungle, rivers, lack of care and criminal groups; there is no safe crossing we can recommend."
      ),
      text(
        "Mande refij nan Meksik vle di respekte pwosesis COMAR la; li pa yon dokiman pou kontinye vwayaj nò a.",
        "Demander l’asile au Mexique signifie respecter COMAR; ce n’est pas un document pour poursuivre vers le nord.",
        "Solicitar refugio en México significa cumplir el proceso COMAR; no es documento para seguir viaje al norte.",
        "Pedir refúgio no México significa cumprir o processo COMAR; não é documento para seguir viagem ao norte.",
        "Requesting refuge in Mexico means following COMAR’s process; it is not a document for continuing north."
      )
    ],
    risks: [
      text(
        "kidnaping, ekstòsyon ak trafik moun",
        "enlèvement, extorsion et traite",
        "secuestro, extorsión y trata",
        "sequestro, extorsão e tráfico",
        "kidnapping, extortion and trafficking"
      ),
      text(
        "blesi, maladi ak lanmò sou vwayaj la",
        "blessure, maladie et mort en route",
        "lesión, enfermedad y muerte en el trayecto",
        "ferimento, doença e morte no trajeto",
        "injury, illness and death on the journey"
      ),
      text(
        "detansyon oswa retou nan yon lòt peyi",
        "détention ou retour vers un autre pays",
        "detención o devolución a otro país",
        "detenção ou retorno a outro país",
        "detention or return to another country"
      ),
      text(
        "abandòn dosye COMAR si ou kite eta a san otorizasyon",
        "abandon du dossier COMAR si vous quittez l’État sans autorisation",
        "abandono del caso COMAR si sales del estado sin autorización",
        "abandono do processo COMAR se sair do estado sem autorização",
        "abandonment of a COMAR case if you leave the state without authorization"
      )
    ],
    closing: text(
      "Si objektif ou se viv Meksik, itilize travay, fanmi, etid oswa pwoteksyon ki koresponn ak reyalite ou. Si objektif la se Etazini, li gid Etazini an anvan ou pran okenn desizyon.",
      "Si votre but est de vivre au Mexique, utilisez travail, famille, études ou protection selon votre réalité. Si le but est les États-Unis, lisez d’abord le guide États-Unis.",
      "Si tu objetivo es vivir en México, usa trabajo, familia, estudios o protección según tu realidad. Si el objetivo es Estados Unidos, lee primero esa guía.",
      "Se o objetivo é viver no México, use trabalho, família, estudo ou proteção conforme sua realidade. Se o objetivo é os EUA, leia primeiro esse guia.",
      "If the goal is to live in Mexico, use work, family, study or protection based on your real situation. If the goal is the United States, read that guide first."
    )
  },
  updates: [
    {
      date: "2026-08-11",
      title: text(
        "Anbasad Meksik la konfime viza pou touris ak tranzit",
        "L’ambassade confirme le visa pour tourisme et transit",
        "La embajada confirma visa para turismo y tránsito",
        "A embaixada confirma visto para turismo e trânsito",
        "Embassy confirms visa for tourism and transit"
      ),
      body: text(
        "Paspò ayisyen mande viza pou touris, biznis oswa tranzit. Anbasad la mande randevou MiConsulado epi dekouraje entèmedyè.",
        "Le passeport haïtien exige un visa pour tourisme, affaires ou transit. L’ambassade demande MiConsulado et déconseille les intermédiaires.",
        "El pasaporte haitiano requiere visa para turismo, negocios o tránsito. La embajada exige MiConsulado y desaconseja intermediarios.",
        "Passaporte haitiano exige visto para turismo, negócios ou trânsito. A embaixada exige MiConsulado e desaconselha intermediários.",
        "A Haitian passport requires a visa for tourism, business or transit. The embassy requires MiConsulado and discourages intermediaries."
      ),
      link: {
        label: text(
          "Li avi anbasad la",
          "Lire l’avis de l’ambassade",
          "Leer aviso de embajada",
          "Ler aviso da embaixada",
          "Read embassy notice"
        ),
        url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/visavisitante"
      }
    },
    {
      date: "2026-08-07",
      title: text(
        "Etidyan gen yon chemen konsilè klè",
        "Les étudiants ont une procédure consulaire claire",
        "Los estudiantes tienen un proceso consular claro",
        "Estudantes têm processo consular claro",
        "Students have a clear consular process"
      ),
      body: text(
        "Anbasad la mete ajou kondisyon admisyon, mwayen finans, frè ak obligasyon pou chanje viza a pou kat rezidan nan 30 jou apre antre.",
        "L’ambassade a mis à jour admission, ressources, frais et obligation d’échanger le visa contre la carte dans les 30 jours après l’entrée.",
        "La embajada actualizó admisión, solvencia, costo y obligación de canjear la visa por tarjeta dentro de 30 días de entrar.",
        "A embaixada atualizou admissão, meios financeiros, taxa e obrigação de trocar o visto pela carteira em 30 dias após a entrada.",
        "The embassy updated admission, funds, fee and the requirement to exchange the visa for a residence card within 30 days of entry."
      ),
      link: {
        label: text(
          "Li kondisyon etid yo",
          "Lire les conditions d’études",
          "Leer requisitos de estudiante",
          "Ler requisitos de estudante",
          "Read student requirements"
        ),
        url: "https://embamex.sre.gob.mx/haiti/index.php/es/asuntos-consulares/visas/espanol/estudiante"
      }
    }
  ]
};

export const COUNTRY_MIGRATION_GUIDES = {
  usa,
  chile,
  brazil,
  mexico
} satisfies Record<CountryCode, CountryMigrationGuide>;

export const migrationGuideCopy = {
  ht: {
    guideKicker: "Gid pratik 2026 pou Ayisyen",
    jumpLabel: "Ale dirèkteman nan",
    overview: "Konprann peyi a",
    pathways: "Fason legal pou antre",
    preparation: "Prepare depi Ayiti",
    arrival: "Lavi apre ou rive",
    irregular: "Wout iregilye: sa pou konnen",
    updates: "Sa ki chanje an 2026",
    verdictKicker: "Repons kout la",
    pathwaysKicker: "Chwazi selon rezon ou",
    pathwaysTitle: "Fason ki egziste vre — ak limit yo",
    pathwaysBody:
      "Chak opsyon kòmanse ak yon moun, yon dokiman oswa yon otorizasyon diferan. Pa melanje yon viza vizit ak yon pèmi pou viv oswa travay.",
    whatToDo: "Sa pou w fè",
    openOfficial: "Louvri paj ofisyèl",
    preparationKicker: "Anvan ou depanse lajan",
    preparationTitle: "Soti Ayiti nan bon lòd la",
    arrivalKicker: "Enstale w ak bon papye",
    arrivalTitle: "Dokiman, travay, etid ak sèvis",
    irregularKicker: "Enfòmasyon san mete moun an danje",
    knownPatterns: "Sa moun rele wout yo",
    risksTitle: "Risk reyèl yo",
    updatesKicker: "Dat yo enpòtan",
    updatesTitle: "Dènye gwo chanjman nou verifye",
    reviewed: "Gid verifye",
    sourceNote:
      "Lyen yo mennen nan otorite ki responsab la. Règ yo ka chanje apre dat verifikasyon an."
  },
  fr: {
    guideKicker: "Guide pratique 2026 pour les Haïtiens",
    jumpLabel: "Aller directement à",
    overview: "Comprendre le pays",
    pathways: "Voies légales d’entrée",
    preparation: "Préparer depuis Haïti",
    arrival: "La vie après l’arrivée",
    irregular: "Routes irrégulières: à savoir",
    updates: "Changements en 2026",
    verdictKicker: "La réponse courte",
    pathwaysKicker: "Choisir selon votre objectif",
    pathwaysTitle: "Les voies qui existent vraiment — et leurs limites",
    pathwaysBody:
      "Chaque option commence par une personne, un document ou une autorisation différente. Ne confondez pas visa de visite et permis de vivre ou travailler.",
    whatToDo: "Ce qu’il faut faire",
    openOfficial: "Ouvrir la page officielle",
    preparationKicker: "Avant de dépenser",
    preparationTitle: "Quitter Haïti dans le bon ordre",
    arrivalKicker: "S’installer avec les bons documents",
    arrivalTitle: "Documents, travail, études et services",
    irregularKicker: "Informer sans mettre en danger",
    knownPatterns: "Ce que l’on appelle les routes",
    risksTitle: "Les risques réels",
    updatesKicker: "Les dates comptent",
    updatesTitle: "Derniers changements importants vérifiés",
    reviewed: "Guide vérifié",
    sourceNote:
      "Les liens mènent à l’autorité responsable. Les règles peuvent changer après la date de vérification."
  },
  es: {
    guideKicker: "Guía práctica 2026 para haitianos",
    jumpLabel: "Ir directamente a",
    overview: "Entender el país",
    pathways: "Formas legales de entrar",
    preparation: "Preparar desde Haití",
    arrival: "Vida después de llegar",
    irregular: "Rutas irregulares: qué saber",
    updates: "Cambios en 2026",
    verdictKicker: "La respuesta corta",
    pathwaysKicker: "Elige según tu objetivo",
    pathwaysTitle: "Las vías que existen de verdad — y sus límites",
    pathwaysBody:
      "Cada opción empieza con una persona, documento o autorización diferente. No confundas visa de visita con permiso para vivir o trabajar.",
    whatToDo: "Qué debes hacer",
    openOfficial: "Abrir página oficial",
    preparationKicker: "Antes de gastar dinero",
    preparationTitle: "Salir de Haití en el orden correcto",
    arrivalKicker: "Instalarte con los documentos correctos",
    arrivalTitle: "Documentos, trabajo, estudios y servicios",
    irregularKicker: "Informar sin poner a nadie en peligro",
    knownPatterns: "Lo que llaman las rutas",
    risksTitle: "Los riesgos reales",
    updatesKicker: "Las fechas importan",
    updatesTitle: "Últimos cambios importantes verificados",
    reviewed: "Guía verificada",
    sourceNote:
      "Los enlaces llevan a la autoridad responsable. Las reglas pueden cambiar después de la fecha de revisión."
  },
  pt: {
    guideKicker: "Guia prático 2026 para haitianos",
    jumpLabel: "Ir diretamente para",
    overview: "Entender o país",
    pathways: "Formas legais de entrada",
    preparation: "Preparar no Haiti",
    arrival: "Vida após a chegada",
    irregular: "Rotas irregulares: o que saber",
    updates: "Mudanças em 2026",
    verdictKicker: "A resposta curta",
    pathwaysKicker: "Escolha conforme o objetivo",
    pathwaysTitle: "As vias que realmente existem — e seus limites",
    pathwaysBody:
      "Cada opção começa com uma pessoa, documento ou autorização diferente. Não confunda visto de visita com permissão para viver ou trabalhar.",
    whatToDo: "O que fazer",
    openOfficial: "Abrir página oficial",
    preparationKicker: "Antes de gastar dinheiro",
    preparationTitle: "Sair do Haiti na ordem certa",
    arrivalKicker: "Estabelecer-se com os documentos certos",
    arrivalTitle: "Documentos, trabalho, estudo e serviços",
    irregularKicker: "Informar sem colocar ninguém em risco",
    knownPatterns: "O que chamam de rotas",
    risksTitle: "Os riscos reais",
    updatesKicker: "As datas importam",
    updatesTitle: "Últimas mudanças importantes verificadas",
    reviewed: "Guia verificado",
    sourceNote:
      "Os links levam à autoridade responsável. As regras podem mudar após a data de revisão."
  },
  en: {
    guideKicker: "Practical 2026 guide for Haitians",
    jumpLabel: "Jump directly to",
    overview: "Understand the country",
    pathways: "Lawful ways to enter",
    preparation: "Prepare from Haiti",
    arrival: "Life after arrival",
    irregular: "Irregular routes: what to know",
    updates: "Changes in 2026",
    verdictKicker: "The short answer",
    pathwaysKicker: "Choose by your purpose",
    pathwaysTitle: "Routes that really exist — and their limits",
    pathwaysBody:
      "Each option starts with a different person, document or authorization. Do not confuse a visitor visa with permission to live or work.",
    whatToDo: "What to do",
    openOfficial: "Open official page",
    preparationKicker: "Before spending money",
    preparationTitle: "Leave Haiti in the right order",
    arrivalKicker: "Settle with the right documents",
    arrivalTitle: "Documents, work, study and services",
    irregularKicker: "Inform without putting anyone at risk",
    knownPatterns: "What people call the routes",
    risksTitle: "The real risks",
    updatesKicker: "Dates matter",
    updatesTitle: "Latest major changes reviewed",
    reviewed: "Guide reviewed",
    sourceNote: "Links go to the responsible authority. Rules may change after the review date."
  }
} satisfies Record<Locale, Record<string, string>>;
