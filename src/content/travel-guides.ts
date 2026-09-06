import {
  DESTINATION_COPY,
  getConsularHelp,
  RESIDENCE_COUNTRIES,
  type AgencyDestination,
  type ResidenceCountryCode
} from "@/content/agency";

export type TravelGuideStep = {
  title: string;
  body: string;
  note?: string;
};

export type TravelGuide = {
  destination: AgencyDestination;
  residence: ResidenceCountryCode;
  residenceLabel: string;
  title: string;
  introduction: string;
  steps: readonly TravelGuideStep[];
  checklist: readonly string[];
  consularTitle: string;
  consularBody: string;
  consularUrl: string;
  processUrl: string;
  processLabel: string;
  limited: boolean;
};

const destinationProcess = {
  chile: {
    url: "https://serviciomigraciones.cl/residencia-temporal/",
    label: "Gade demach Chili yo",
    purpose:
      "Pou Chili, vizit, travay, etid ak fanmi pa sèvi ak menm kalite pèmi. Kòmanse ak rezon ki vrè a epi li kondisyon kategori sa a anvan ou prepare dokiman.",
    arrival:
      "Si otorite a apwouve dosye a, li desizyon an ak anpil atansyon. Verifye kilè ou ka antre, ki dokiman pou pote ak ki etap ki rete pou fè nan Chili."
  },
  brazil: {
    url: "https://formulario-mre.serpro.gov.br/",
    label: "Gade demach Brezil yo",
    purpose:
      "Pou Brezil, vizit, travay, etid ak fanmi gen pwosedi diferan. Kòmanse ak rezon ki vrè a epi verifye si etap la kòmanse nan konsila, sou fòm viza a oswa ak yon lòt otorite.",
    arrival:
      "Si otorite a apwouve dosye a, li viza oswa desizyon an byen. Verifye dat yo, antre a ak nenpòt enskripsyon otorite brezilyen an mande apre ou rive."
  }
} as const;

function residenceLabel(residence: ResidenceCountryCode): string {
  return RESIDENCE_COUNTRIES.find(({ code }) => code === residence)?.label ?? "peyi kote ou ye a";
}

export function getTravelGuide(
  destination: AgencyDestination,
  residence: ResidenceCountryCode
): TravelGuide {
  const destinationCopy = DESTINATION_COPY[destination];
  const origin = residenceLabel(residence);
  const process = destinationProcess[destination];
  const consular = getConsularHelp(destination, residence);
  const alreadyThere = residence === destination;
  const limited = residence === "other";

  if (limited) {
    return {
      destination,
      residence,
      residenceLabel: origin,
      title: `Ale ${destinationCopy.name} pandan wap viv nan yon lòt peyi`,
      introduction:
        "Ann pran sa dousman. Nou poko gen ase enfòmasyon serye sou peyi kote ou ye a pou nou fè yon gid pèsonalize san nou pa riske twonpe w.",
      steps: [
        {
          title: "Chèche biwo ki responsab zòn ou an",
          body: `Sèvi ak anyè konsilè ${destinationCopy.name} la pou wè si gen yon anbasad oswa konsila nan peyi kote ou ye a. Si pa gen youn, mande ki biwo nan yon lòt peyi ki gen jiridiksyon sou zòn ou an.`
        },
        {
          title: "Ekri kestyon an anvan ou kontakte yo",
          body: "Di ki paspò ou genyen, nan ki peyi ou rete legalman ak rezon ou vle deplase a. Pa voye foto paspò oswa dokiman prive nan premye mesaj la."
        },
        {
          title: "Tann enstriksyon biwo a",
          body: "Mande ki kategori, pòtal ak fason pou pran randevou ki aplike pou ou. Pa peye yon moun ki pwomèt yon randevou oswa yon rezilta garanti."
        }
      ],
      checklist: [
        "Non peyi ak vil kote ou rete a",
        "Kalite paspò ou genyen",
        "Rezon vwayaj la: vizit, fanmi, etid oswa travay",
        "Repons ekri anbasad oswa konsila a"
      ],
      consularTitle: consular.title,
      consularBody: consular.body,
      consularUrl: consular.url,
      processUrl: process.url,
      processLabel: process.label,
      limited: true
    };
  }

  if (alreadyThere) {
    return {
      destination,
      residence,
      residenceLabel: origin,
      title: `Ou deja ap viv nan ${destinationCopy.name}`,
      introduction: `Si ou deja nan ${destinationCopy.name}, kestyon prensipal la se pa chèche yon anbasad pou antre. Se konprann estati ou genyen kounye a ak ki demach lokal ki koresponn ak pwojè ou.`,
      steps: [
        {
          title: "Gade dokiman ou genyen kounye a",
          body: "Ekri non dokiman oswa pèmi a, dat li kòmanse ak dat li fini. Pa baze yon desizyon sou non yon dokiman yon lòt moun genyen."
        },
        {
          title: "Chwazi sa ou bezwen regle",
          body: "Èske ou bezwen renouvle, chanje kategori, etidye, travay, reyini ak fanmi oswa korije yon enfòmasyon? Yon sèl objektif klè ap ede w jwenn bon paj la."
        },
        {
          title: "Sèvi ak otorite migrasyon ki anndan peyi a",
          body: `Louvri pòtal migrasyon ${destinationCopy.name} la epi chèche pwosedi ki matche ak estati ak objektif ou. Yon konsila aletranje pa toujou responsab dosye moun ki deja nan peyi a.`
        },
        {
          title: "Fè yon lis anvan ou soumèt",
          body: "Verifye dokiman, fòma, dat ak fason otorite a mande pou voye yo. Kenbe resi ak nimewo dosye a nan yon kote ki an sekirite."
        }
      ],
      checklist: [
        "Dokiman migrasyon ou genyen kounye a",
        "Dat ekspirasyon an",
        "Objektif demach ou",
        "Nimewo dosye oswa resi, si ou deja kòmanse"
      ],
      consularTitle: `Otorite migrasyon ${destinationCopy.name}`,
      consularBody:
        "Kòmanse ak pòtal migrasyon peyi a. Si sitiyasyon ou konplike oswa delè a pre, chèche yon pwofesyonèl ki otorize nan peyi a.",
      consularUrl: process.url,
      processUrl: process.url,
      processLabel: process.label,
      limited: false
    };
  }

  return {
    destination,
    residence,
    residenceLabel: origin,
    title: `Ale ${destinationCopy.name} pandan wap viv ${origin}`,
    introduction: `Zanmi, ou pa bezwen fè tout bagay yon sèl kou. Men yon chemen senp pou w konprann ki pòt pou frape depi ${origin} anvan ou depanse lajan oswa achte yon tikè.`,
    steps: [
      {
        title: "Di poukisa ou vle ale",
        body: process.purpose,
        note: "Pa chwazi yon kategori sèlman paske li sanble pi rapid. Li dwe koresponn ak sitiyasyon ou."
      },
      {
        title: `Jwenn biwo ki sèvi moun nan ${origin}`,
        body: consular.body,
        note: "Kote ou rete legalman ka chanje ki konsila ki responsab dosye a."
      },
      {
        title: "Prepare lis pa w la",
        body: `Rasanble enfòmasyon konsila a mande pou kategori ou. Si ou gen dokiman ki soti Ayiti ak lòt ki soti ${origin}, mande biwo a kijan chak dokiman dwe prepare.`,
        note: "Pa voye dokiman prive sou WhatsApp epi pa peye pou yon lis envante."
      },
      {
        title: "Fè demann lan epi kenbe prèv yo",
        body: "Sèvi ak pòtal oswa randevou biwo a bay. Kenbe nimewo dosye, resi ak kopi sa ou soumèt. Yon demann oswa yon randevou pa vle di dosye a apwouve."
      },
      {
        title: "Prepare depa a sèlman apre desizyon an",
        body: process.arrival,
        note: "Tcheke tou règ tranzit pou chak peyi avyon an pase."
      }
    ],
    checklist: [
      "Rezon vwayaj ou ekri aklè",
      `Prèv ou rete legalman nan ${origin}`,
      "Paspò ak dokiman sivil ki valab",
      "Enstriksyon ki soti dirèkteman nan biwo responsab la"
    ],
    consularTitle: consular.title,
    consularBody: consular.body,
    consularUrl: consular.url,
    processUrl: process.url,
    processLabel: process.label,
    limited: false
  };
}
