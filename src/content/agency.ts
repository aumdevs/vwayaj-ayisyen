export const RESIDENCE_COUNTRIES = [
  { code: "dominican-republic", flag: "🇩🇴", label: "Repiblik Dominikèn" },
  { code: "haiti", flag: "🇭🇹", label: "Ayiti" },
  { code: "mexico", flag: "🇲🇽", label: "Meksik" },
  { code: "usa", flag: "🇺🇸", label: "Etazini" },
  { code: "chile", flag: "🇨🇱", label: "Chili" },
  { code: "brazil", flag: "🇧🇷", label: "Brezil" },
  { code: "other", flag: "🌎", label: "Lòt peyi" }
] as const;

export type ResidenceCountryCode = (typeof RESIDENCE_COUNTRIES)[number]["code"];
export type AgencyDestination = "chile" | "brazil";

export const DESTINATION_COPY = {
  chile: {
    name: "Chili",
    capital: "Santiago",
    population: "18 480 432 moun (resansman 2024)",
    image: "/images/editorial/country-chile-santiago.png",
    imageAlt: "Vil Santiago ak mòn Andes yo dèyè li",
    shortIntroduction:
      "Chili se yon peyi nan Amerik di Sid, ant mòn Andes yo ak Oseyan Pasifik la. Santiago se kapital la. Chwazi rezon vwayaj ou pou wè kategori ak dokiman ki koresponn ak sitiyasyon ou.",
    overviewTitle: "Sa pou w konnen sou Chili",
    sourceUrl: "https://www.chile.gob.cl/haiti/"
  },
  brazil: {
    name: "Brezil",
    capital: "Brasília",
    population: "213 421 037 moun (estimasyon 2025)",
    image: "/images/editorial/country-brazil-rio.png",
    imageAlt: "Kris Redanmtè, mòn Sugarloaf ak bè Rio de Janeiro",
    shortIntroduction:
      "Brezil se pi gwo peyi Amerik di Sid, epi lang prensipal li se pòtigè. Brasília se kapital la. Chwazi objektif ou—vizit, fanmi, etid oswa travay—pou wè etap ki koresponn ak sitiyasyon ou.",
    overviewTitle: "Sa pou w konnen sou Brezil",
    sourceUrl: "https://www.gov.br/mre/pt-br/embaixada-porto-principe"
  }
} as const;

const genericConsularDirectory = {
  chile: "https://www.chile.gob.cl/consulados/",
  brazil: "https://www.gov.br/mre/pt-br/assuntos/portal-consular/reparticoes-consulares-do-brasil"
} as const;

const haitiConsularOffice = {
  chile: {
    title: "Reprezantasyon Chili ann Ayiti",
    body: "Kòmanse sou paj Anbasad Chili ann Ayiti pou wè sèvis konsilè, avi aktyèl ak fason pou kontakte biwo a. Rele oswa ekri sèlman nan nimewo ak adrès ki parèt sou paj ofisyèl la; pa peye yon moun pou jwenn randevou.",
    url: "https://www.chile.gob.cl/haiti/"
  },
  brazil: {
    title: "Anbasad Brezil nan Pòtoprens",
    body: "Kòmanse sou paj Anbasad Brezil nan Pòtoprens, epi sèvi ak e-consular lè sèvis la mande sa. Paj anbasad la bay avi, sèvis konsilè ak kontak aktyèl. Pa voye paspò oswa dokiman prive sou WhatsApp.",
    url: "https://www.gov.br/mre/pt-br/embaixada-porto-principe"
  }
} as const;

export function getConsularHelp(destination: AgencyDestination, residence: ResidenceCountryCode) {
  const residenceLabel =
    RESIDENCE_COUNTRIES.find((country) => country.code === residence)?.label ?? "peyi ou";
  if (residence === "haiti") return haitiConsularOffice[destination];
  if (residence === "other") {
    return {
      title: `Chèche anbasad oswa konsila ${DESTINATION_COPY[destination].name} nan peyi kote ou ye a`,
      body: `Nou pa gen ase enfòmasyon sou peyi kote ou ye a pou nou ba w yon oryantasyon presi. Verifye si ${DESTINATION_COPY[destination].name} gen yon anbasad oswa konsila ki responsab zòn ou an, kontakte biwo a epi mande ki pwosedi ki koresponn ak sitiyasyon ou anvan ou peye oswa vwayaje.`,
      url: genericConsularDirectory[destination]
    };
  }

  return {
    title: `Jwenn konsila ${DESTINATION_COPY[destination].name} pou ${residenceLabel}`,
    body: `Chwazi biwo konsilè ki responsab kote ou rete legalman nan ${residenceLabel}. Verifye jiridiksyon biwo a anvan ou pran randevou, paske yon konsila ka pa sèvi tout vil oswa tout kalite demann. Rele oswa ekri sèlman ak kontak ki nan anyè ofisyèl la.`,
    url: genericConsularDirectory[destination]
  };
}

export type NewsArticle = {
  slug: string;
  country: "Chili" | "Brezil";
  publishedAt: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  paragraphs: readonly string[];
  points?: readonly string[];
  sourceUrl: string;
};

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    slug: "brezil-plan-nasyonal-migrasyon-2026",
    country: "Brezil",
    publishedAt: "2026-07-03",
    title: "Brezil fini premye plan nasyonal li pou migrasyon ak refij",
    summary: "Plan an rasanble direksyon pou politik migrasyon, refij ak apatrid nan peyi a.",
    image: "/images/editorial/news-brazil-policy.webp",
    imageAlt: "Moun migran k ap resevwa eksplikasyon sou dokiman nan yon biwo Brezil",
    paragraphs: [
      "Ministè Jistis ak Sekirite Piblik Brezil anonse li fini fòmilasyon premye Plan Nasyonal Migrasyon, Refij ak Apatrid la nan mwa jiyè 2026. Dokiman an soti nan pwopozisyon konferans, atelye teknik ak yon konsiltasyon piblik.",
      "Pou yon moun k ap prepare lavi li nan Brezil, nouvèl sa a enpòtan paske plan an bay direksyon jeneral pou fason plizyè sèvis piblik dwe travay ansanm. Li pa kreye yon viza otomatik epi li pa ranplase kondisyon yon pwosedi espesifik.",
      "Si ou gen yon demach k ap fèt, kontinye suiv biwo ki responsab dosye ou: konsila pou viza, Ministério da Justiça pou kèk otorizasyon, oswa Polícia Federal pou enskripsyon ak dokiman migratwa anndan Brezil."
    ],
    points: [
      "Plan an konsène migrasyon, refij ak apatrid.",
      "Li pa garanti yon rezilta pou yon dosye endividyèl.",
      "Chak moun dwe kontinye swiv pwosedi ki koresponn ak sitiyasyon li."
    ],
    sourceUrl:
      "https://www.gov.br/mj/pt-br/assuntos/noticias-1/i-planamigra-reune-diretrizes-acoes-e-indicadores-da-politica-migratoria"
  },
  {
    slug: "brezil-kontribisyon-migran-ak-refijye",
    country: "Brezil",
    publishedAt: "2026-07-17",
    title: "Nouvo piblikasyon mete aksan sou kontribisyon moun migran nan Brezil",
    summary: "Ministè Jistis la prezante travay li sou dokiman, akèy ak entegrasyon lokal.",
    image: "/images/editorial/news-brazil-contributions.webp",
    imageAlt: "Moun ayisyen ak brezilyen k ap bati yon pwojè kominotè ansanm",
    paragraphs: [
      "Nan yon piblikasyon 17 jiyè 2026, Ministè Jistis ak Sekirite Piblik la raple travay Depatman Migrasyon an sou regilarizasyon dokiman, akèy, refij ak entegrasyon sosyal ak ekonomik.",
      "Mesaj prensipal la se ke migrasyon pa limite ak kontwòl fwontyè. Dokiman, aksè a dwa, travay ak entegrasyon nan kominote a fè pati menm chemen an.",
      "Pou evite konfizyon, separe enfòmasyon sou refij ak enfòmasyon sou rezidans. Se pa tout moun ayisyen ki ranpli kondisyon legal refij; Brezil genyen lòt baz rezidans ki ka koresponn ak yon sitiyasyon espesifik."
    ],
    sourceUrl:
      "https://www.gov.br/mj/pt-br/assuntos/noticias-1/populacao-migrante-e-refugiada-contribui-para-as-sociedades-que-a-acolhem-apontam-estudos"
  },
  {
    slug: "brezil-rezidans-sa-pou-verifye",
    country: "Brezil",
    publishedAt: "2026-07-23",
    title: "Pòtal Brezil la mete enfòmasyon sou otorizasyon rezidans ajou",
    summary: "Paj la esplike plizyè baz legal ak ki administrasyon ki resevwa demann lan.",
    image: "/images/editorial/news-brazil-residency-online.webp",
    imageAlt: "Yon pwofesyonèl ayisyen k ap prepare demann rezidans sou entènèt",
    paragraphs: [
      "Pòtal Ministè Jistis la montre diferan kategori otorizasyon rezidans epi li endike si demann lan pase nan MigranteWeb oswa nan Polícia Federal. Paj la te mete ajou nan mwa jiyè 2026.",
      "Pa kòmanse ak yon lis dokiman ou jwenn sou rezo sosyal. Premye desizyon an se chwazi baz legal ki koresponn ak objektif ou: fanmi, travay, etid, rezon imanitè oswa yon lòt kategori ki egziste nan lwa a.",
      "Lè ou fin idantifye kategori a, tcheke lis dokiman aktyèl la, frè ki aplikab ak kote pou depoze demann lan. Yon dokiman ki manke oswa yon move kategori ka fè pwosedi a pran plis tan."
    ],
    sourceUrl:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes/autorizacao-de-residencia"
  },
  {
    slug: "brezil-akey-imanite-nouvo-kad",
    country: "Brezil",
    publishedAt: "2025-12-31",
    title: "Brezil pibliye yon nouvo kad pou akèy imanitè",
    summary: "Nouvo dispozisyon an ranplase ansyen règ ki te konsantre espesyalman sou Ayiti.",
    image: "/images/editorial/news-brazil-humanitarian.webp",
    imageAlt: "Moun ayisyen k ap resevwa oryantasyon nan yon sant akèy Brezil",
    paragraphs: [
      "Nan fen 2025, Brezil pibliye Portaria Interministerial MJSP/MRE nimewo 60 sou akèy imanitè. Se tèks aktyèl la ki dwe li anvan yon moun baze yon pwojè sou enfòmasyon ki te sikile anba ansyen règ yo.",
      "Egzistans yon kad imanitè pa vle di tout demann apwouve. Otorite a verifye nasyonalite, sikonstans, dokiman ak kondisyon pwosedi a.",
      "Si ou deyò Brezil, verifye sèvis konsilè ki responsab kote ou rete a. Si ou deja anndan Brezil, verifye si Polícia Federal oswa yon lòt administrasyon se pòt antre pou sitiyasyon ou."
    ],
    sourceUrl:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes/portal-de-imigracao-laboral/normas-migratorias-1/portarias/portarias-interministeriais/portaria-interministerial-mjsp-mre-no-60-de-30-de-dezembro-de-2025.pdf/view"
  },
  {
    slug: "brezil-reyinifikasyon-fanmi-ayisyen",
    country: "Brezil",
    publishedAt: "2026-08-03",
    title: "Ki kote pou suiv reyinyon fanmi pou moun ayisyen nan Brezil",
    summary: "Yon paj dedye rasanble pwosedi ak kontak pou kèk fanmi ayisyen ak apatrid.",
    image: "/images/editorial/news-brazil-community.webp",
    imageAlt: "Yon fanmi ayisyen reyini nan yon katye São Paulo",
    paragraphs: [
      "Ministè Jistis Brezil kenbe yon paj espesyal pou otorizasyon rezidans ak viza reyinyon fanmi ki konsène kèk moun ayisyen oswa apatrid ki gen lyen fanmi nan Brezil.",
      "Pwosedi a kòmanse ak moun ki deja nan Brezil nan kategori ki admèt la. Apre analiz administrasyon an, sèvis konsilè a ka kontakte manm fanmi ki ann Ayiti pou etap viza a.",
      "Pa konfonn yon demann ki resevwa ak yon apwobasyon. Kenbe nimewo dosye ou, itilize kontak ofisyèl la epi pa voye dokiman bay entèmedyè ki pa idantifye."
    ],
    sourceUrl:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/refugio/servicos/visto-para-reuniao-familiar"
  },
  {
    slug: "chili-rezidans-definitif-2026",
    country: "Chili",
    publishedAt: "2026-01-07",
    title: "Chili mete fich rezidans definitif la ajou pou 2026",
    summary: "Fich sèvis la esplike kondisyon jeneral, dokiman ak fason pou depoze demann lan.",
    image: "/images/editorial/news-chile-documents.webp",
    imageAlt: "Yon fanm ayisyèn k ap resevwa konsèy sou rezidans nan Santiago",
    paragraphs: [
      "ChileAtiende mete fich sou rezidans definitif la ajou nan kòmansman 2026. Fich la ede moun konprann kiyès ki ka mande, ki dokiman ki ka nesesè ak fason pwosedi a fèt sou entènèt.",
      "Rezidans definitif pa premye etap pou tout moun. An jeneral, moun nan dwe gen yon estati tanporè ki pèmèt li aplike epi respekte kondisyon ki asosye ak kategori li.",
      "Anvan ou soumèt, verifye validite dokiman etranje yo, bezwen apostiy oswa legalizasyon, ak nenpòt tradiksyon ki mande. Kenbe kopi resi ak kominikasyon ki soti nan sistèm ofisyèl la."
    ],
    sourceUrl: "https://www.chileatiende.gob.cl/fichas/104688-solicitud-de-residencia-definitiva"
  },
  {
    slug: "chili-rezidans-tanpore-deyo-peyi",
    country: "Chili",
    publishedAt: "2026-05-15",
    title: "Rezidans tanporè Chili: verifye si demann lan dwe kòmanse deyò peyi a",
    summary:
      "Plizyè kategori mande pou moun nan aplike sou platfòm migrasyon an pandan li aletranje.",
    image: "/images/editorial/news-chile-temporary-residence.webp",
    imageAlt: "Yon fanm ayisyèn k ap prepare dokiman rezidans tanporè anvan vwayaj",
    paragraphs: [
      "Sèvis Nasyonal Migrasyon Chili a se sous prensipal pou kategori rezidans tanporè. Paj kategori a endike kiyès ki ka aplike ak si yon demann dwe kòmanse pandan moun nan deyò Chili.",
      "Pa antre kòm vizitè ak lide pou chanje estati otomatikman apre sa. Posiblite pou aplike anndan peyi a limite ak sitiyasyon lalwa defini.",
      "Prepare paspò, prèv objektif vwayaj la ak dokiman sivil yo anvan ou kòmanse. Yon demann sou entènèt pa ranplase kondisyon pou antre legalman oswa pou reponn demann dokiman siplemantè."
    ],
    sourceUrl: "https://serviciomigraciones.cl/residencia-temporal/"
  },
  {
    slug: "chili-kat-idantite-pou-etranje",
    country: "Chili",
    publishedAt: "2026-08-18",
    title: "Kat idantite pou etranje nan Chili: dokiman an vini apre pèmisyon an",
    summary: "Cédula de identidad la sèvi pou idantifikasyon, men li pa kreye yon estati migratwa.",
    image: "/images/editorial/news-chile-identity-card.webp",
    imageAlt: "Yon pwofesyonèl ayisyen nan yon sèvis kat idantite nan Santiago",
    paragraphs: [
      "Nan Chili, Registro Civil okipe cédula de identidad pou etranje ki gen pèmisyon ki apwopriye a. Kat la fasilite anpil demach chak jou, men se pa li ki bay rezidans lan.",
      "Tcheke si pèmisyon ou deja antre an vigè ak ki dokiman Registro Civil mande anvan ou deplase. Non, dat nesans ak lòt done yo dwe koresponn ak dokiman migratwa ou.",
      "Si gen yon erè nan idantite ou, chèche korije l nan administrasyon ki responsab la. Pa sèvi ak yon twazyèm moun ki mande foto dokiman ou nan yon chat prive."
    ],
    sourceUrl:
      "https://www.chileatiende.gob.cl/fichas/3337-cedula-de-identidad-para-personas-extranjeras"
  },
  {
    slug: "chili-travay-ak-kontra",
    country: "Chili",
    publishedAt: "2026-08-25",
    title: "Travay nan Chili: kontra a dwe mache ak estati migratwa a",
    summary: "Yon òf travay pa ranplase pèmisyon ki nesesè pou travay legalman.",
    image: "/images/editorial/news-chile-work-health.webp",
    imageAlt: "Pwofesyonèl ayisyen k ap resevwa konsèy sou travay nan Santiago",
    paragraphs: [
      "Pou travay fòmèlman nan Chili, yon moun bezwen yon estati oswa otorizasyon ki pèmèt aktivite a. Yon kontra kapab fè pati yon dosye, men li pa anile lòt kondisyon migrasyon yo.",
      "Li kontra a anvan ou siyen: idantite patwon an, travay la, salè a, lè travay ak kote travay la dwe klè. Pa bay lajan pou yon pwomès travay ki pa ka verifye.",
      "Dirección del Trabajo bay enfòmasyon sou dwa ak obligasyon nan relasyon travay. Pou kestyon sou estati migratwa, sèvi ak Sèvis Nasyonal Migrasyon an."
    ],
    sourceUrl: "https://www.dt.gob.cl/portal/1626/w3-channel.html"
  },
  {
    slug: "chili-sante-piblik-pou-migran",
    country: "Chili",
    publishedAt: "2026-08-25",
    title: "Aksè nan sante piblik Chili depann de enskripsyon ak sitiyasyon moun nan",
    summary: "FONASA ak rezo sante a bay chemen diferan selon estati ak kondisyon moun nan.",
    image: "/images/editorial/news-chile-public-health.webp",
    imageAlt: "Yon fanm ayisyèn k ap resevwa oryantasyon nan yon sant sante Santiago",
    paragraphs: [
      "Sistèm sante piblik Chili a gen règ enskripsyon ak nivo pwoteksyon. Yon moun dwe verifye ki dokiman li genyen ak ki sant sante ki koresponn ak adrès li.",
      "Nan yon ijans, chèche asistans san tann yon demach administratif fini. Pou swen regilye, mande sant sante lokal la ki etap ki nesesè epi konsève prèv demann ou yo.",
      "Pa pataje dyagnostik, foto rezilta oswa nimewo idantite nan gwoup piblik pou mande èd. Itilize chanèl sante oswa sipò prive ki apwopriye."
    ],
    sourceUrl: "https://www.fonasa.cl/sites/fonasa/beneficiarios"
  }
] as const;

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}
