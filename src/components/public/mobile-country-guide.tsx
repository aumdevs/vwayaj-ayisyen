"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ExternalLink,
  FileBadge2,
  GraduationCap,
  House,
  Landmark,
  MessageCircle,
  Newspaper,
  Plane,
  ShieldCheck,
  Store,
  UsersRound,
  X
} from "lucide-react";
import { useRef, useState } from "react";
import {
  DESTINATION_COPY,
  getConsularHelp,
  RESIDENCE_COUNTRIES,
  type AgencyDestination,
  type ResidenceCountryCode
} from "@/content/agency";
import { COUNTRY_MIGRATION_GUIDES } from "@/content/migration-guides";
import { localizedPath } from "@/lib/i18n/paths";

type MobileCountryGuideProps = {
  country: AgencyDestination;
  whatsappNumber: string | null;
};

const culturalCopy = {
  chile: {
    places:
      "Chili gen anpil kote istorik ak natirèl. Nan Santiago, sant istorik la, Plaza de Armas ak mize piblik yo ede w konprann peyi a. Valparaíso gen achitekti, pò ak mòn ki make istwa li. Zile Pak, yo rele Rapa Nui tou, gen yon eritaj polinezyen ki mande respè pou kominote lokal la. Anvan yon vizit, tcheke lè ouvèti, pri ak règ antre dirèkteman ak kote a.",
    community:
      "Moun ayisyen ap viv nan plizyè rejyon Chili. Lè w ap chèche sipò, chwazi òganizasyon ki idantifye klèman, sèvis minisipal, sant sante ak rezo kominotè ki pa mande paspò ou nan yon mesaj prive. Pa pran yon temwayaj kòm règ legal: chak estati migratwa ak chak fanmi diferan."
  },
  brazil: {
    places:
      "Brezil gen yon eritaj istorik ak kiltirèl ki varye anpil selon rejyon an. Nan São Paulo, sant istorik la ak mize yo montre devlopman vil la ak kontribisyon plizyè kominote migran. Brasília rekonèt pou achitekti modèn li. Salvador gen yon eritaj afro-brezilyen enpòtan. Anvan yon vizit, tcheke transpò, lè ouvèti ak règ sekirite lokal yo.",
    community:
      "Moun ayisyen ap viv nan plizyè vil ak eta Brezil. Rezo kominotè kapab ede ak lang, premye oryantasyon ak lavi chak jou, men yo pa ranplase Polícia Federal, konsila oswa yon pwofesyonèl otorize. Pa voye foto dokiman oswa nimewo paspò bay yon moun sèlman paske li nan yon gwoup WhatsApp."
  }
} as const;

const chileTopics = {
  work: {
    intro:
      "Pou travay legalman nan Chili, verifye dabò si estati migratwa ou pèmèt aktivite ou pral fè a. Yon òf travay oswa yon kontra pa ranplase otorizasyon ki nesesè a.",
    items: [
      {
        title: "Anvan ou aksepte travay la",
        body: "Verifye non patwon an, fonksyon an, kote travay la, orè a, peman an ak dire kontra a. Pa peye yon moun pou yon pwomès travay epi pa siyen yon paj vid."
      },
      {
        title: "Kontra ak dwa ou",
        body: "Li tout kontra a anvan ou siyen li epi kenbe yon kopi. Pou kestyon sou relasyon travay la, sèvi ak enfòmasyon Dirección del Trabajo bay sou chanèl ofisyèl li yo."
      },
      {
        title: "Estati migratwa ak travay",
        body: "Tcheke kondisyon pèmisyon ou dirèkteman ak Servicio Nacional de Migraciones. Pa pran eksperyans yon lòt moun kòm prèv sitiyasyon pa w la menm."
      }
    ]
  },
  documents: {
    intro:
      "Chak dokiman gen yon fonksyon diferan. Paspò, desizyon migratwa, kat idantite ak dokiman sivil pa ranplase youn lòt.",
    items: [
      {
        title: "Dokiman migratwa",
        body: "Kenbe desizyon, resi, nimewo dosye ak dat enpòtan yo ansanm. Verifye enfòmasyon yo sou pòtal otorite ki responsab la olye ou konte sèlman sou yon mesaj prive."
      },
      {
        title: "Kat idantite pou etranje",
        body: "Cédula pou etranje a vini apre estati oswa kondisyon ki pèmèt demach la. Verifye ak Registro Civil ki dokiman ak randevou ki koresponn ak ka ou."
      },
      {
        title: "Dokiman ki soti aletranje",
        body: "Yon batistè, dosye penal, maryaj oswa diplòm ka bezwen yon preparasyon espesyal selon demach la. Tcheke lis ofisyèl dosye pa w la anvan ou peye pou tradiksyon oswa legalizasyon."
      }
    ]
  },
  community: {
    intro:
      "Gen moun ak fanmi ayisyen nan plizyè rejyon Chili. Rezo kominotè kapab ede ak premye oryantasyon, men yo pa ranplase sèvis piblik oswa yon pwofesyonèl otorize.",
    items: [
      {
        title: "Jwenn bon enfòmasyon",
        body: "Kòmanse ak sèvis minisipal, sant sante, lekòl ak òganizasyon ki idantifye klèman. Verifye nenpòt konsèy legal oswa migratwa sou yon sous ofisyèl."
      },
      {
        title: "Pwoteje enfòmasyon ou",
        body: "Pa voye paspò, nimewo idantite, kòd verifikasyon oswa dosye konplè nan yon gwoup piblik. Mande poukisa yo bezwen chak enfòmasyon anvan ou pataje li."
      },
      {
        title: "Chèche sipò lè sa nesesè",
        body: "Si ou rankontre diskriminasyon, eksplwatasyon oswa vyolans, konsève prèv yo an sekirite epi chèche yon sèvis piblik oswa òganizasyon serye ki ka oryante w."
      }
    ]
  },
  safety: {
    intro:
      "Sekirite nan Chili gen ladan pwoteksyon fizik, dokiman, lajan ak done pèsonèl. Bon verifikasyon ede diminye risk fwod ak move kontra.",
    items: [
      {
        title: "Evite fwod",
        body: "Pa kwè moun ki garanti viza, rezidans, travay oswa randevou. Pa pataje modpas, kòd bankè oswa kòd verifikasyon ak yon moun ki kontakte w san ou pa mande sa."
      },
      {
        title: "Lè w ap deplase",
        body: "Aprann zòn nan, planifye retou ou epi sèvi ak sèvis transpò ki ka idantifye. Kenbe kopi dokiman enpòtan yo nan yon kote separe ak orijinal yo."
      },
      {
        title: "Lè gen yon ijans",
        body: "Mete sekirite ou an premye epi kontakte sèvis ijans oswa otorite ki koresponn ak sitiyasyon an. Pa mete tèt ou an danje pou eseye rezoud yon menas poukont ou."
      }
    ]
  },
  immigration: {
    intro:
      "Demach imigrasyon an depann de rezon ou antre, kategori ou mande ak sitiyasyon pèsonèl ou. Sèvi ak pòtal Servicio Nacional de Migraciones pou verifye etap aktyèl yo.",
    items: [
      {
        title: "Chwazi chemen ki koresponn lan",
        body: "Vizit, travay, etid ak reyinyon fanmi pa nesesèman suiv menm pwosedi. Li objektif ak kondisyon kategori a anvan ou soumèt oswa peye."
      },
      {
        title: "Swiv dosye ou",
        body: "Kenbe nimewo demann, resi, kopi dokiman ak mesaj ofisyèl yo. Verifye estati a nan chanèl ofisyèl la epi pa kite yon twazyèm moun kontwole sèl aksè ou."
      },
      {
        title: "Respekte dat yo",
        body: "Note dat ki sou pèmisyon ak kominikasyon ou resevwa yo. Si ou pa konprann yon desizyon oswa yon delè, chèche asistans serye bonè."
      }
    ]
  },
  housing: {
    intro:
      "Pou lwe oswa achte yon kay nan Chili, verifye pwopriyete a, moun k ap fè kontra a ak tout depans yo anvan ou transfere lajan.",
    items: [
      {
        title: "Pou lwe yon kay",
        body: "Vizite kote a si sa posib epi mande yon kontra alekri ki esplike lwaye, garanti, dat peman, depans komen ak kondisyon pou kite kay la."
      },
      {
        title: "Pou achte yon kay",
        body: "Fè verifye kiyès ki pwopriyetè a, sitiyasyon legal kay la, dèt ak kondisyon kontra a pa yon pwofesyonèl endepandan anvan ou siyen oswa peye."
      },
      {
        title: "Kenbe prèv yo",
        body: "Konsève anons, foto, kontra, resi ak mesaj enpòtan yo. Pa voye depo sèlman paske yon moun di gen anpil lòt kliyan k ap tann."
      }
    ]
  },
  study: {
    intro:
      "Pou etidye nan Chili, verifye enstitisyon an, pwogram nan, kondisyon admisyon ak estati migratwa ki koresponn ak dire etid la.",
    items: [
      {
        title: "Chwazi yon enstitisyon serye",
        body: "Verifye non pwogram nan, dire li, frè yo ak kalite sètifika oswa diplòm li bay. Pa peye yon entèmedyè ki pa ka pwouve relasyon li ak lekòl la."
      },
      {
        title: "Admisyon ak demach migrasyon",
        body: "Yon lèt admisyon pa vle di tout demach migrasyon fini. Konpare dokiman lekòl la bay ak kondisyon kategori ki koresponn ak pwojè ou."
      },
      {
        title: "Diplòm ou deja genyen",
        body: "Si ou vle itilize yon diplòm etranje, verifye si pwofesyon oswa enstitisyon an mande rekonesans, validasyon oswa lòt pwosedi apa."
      }
    ]
  },
  business: {
    intro:
      "Fè biznis nan Chili mande yon plan klè, yon estrikti ki apwopriye ak bon jesyon taks, kontra ak done kliyan yo.",
    items: [
      {
        title: "Prepare aktivite a",
        body: "Defini sa w ap vann, kliyan ou, depans yo ak responsablite chak asosye. Pa mete lajan nan yon pwojè ki baze sèlman sou pwomès oral."
      },
      {
        title: "Verifye enskripsyon ki nesesè yo",
        body: "Kalite aktivite a ka chanje demach fiskal, minisipal oswa pwofesyonèl ki aplike. Mande yon kontab oswa pwofesyonèl endepandan anvan ou chwazi yon estrikti."
      },
      {
        title: "Jere biznis la ak prèv",
        body: "Separe lajan pèsonèl ak lajan aktivite a, konsève resi ak kontra epi pwoteje enfòmasyon kliyan yo. Okenn biznis pa garanti pwofi."
      }
    ]
  }
} as const;

const brazilTopics = {
  work: {
    intro:
      "Pou travay legalman nan Brezil, premye bagay la se verifye si estati migratwa ou pèmèt ou travay. Yon bèl pwomès oswa yon mesaj WhatsApp pa ranplase yon kontra reyèl ni yon otorizasyon.",
    items: [
      {
        title: "Anvan ou aksepte yon travay",
        body: "Mande non legal antrepriz la, adrès li, fonksyon an, orè a, salè a ak kondisyon kontra a alekri. Pa peye yon moun pou li vann ou yon plas travay."
      },
      {
        title: "Pou chèche travay",
        body: "Lè ou gen dwa travay, ou ka sèvi ak SINE, Emprega Brasil ak Carteira de Trabalho Digital. Prepare yon CV senp an pòtigè epi pa voye paspò konplè ou nan gwoup piblik."
      },
      {
        title: "Pwoteje dwa ou",
        body: "Kenbe kopi kontra, fich peman ak mesaj enpòtan yo. Si kondisyon reyèl yo diferan ak sa yo te pwomèt la, chèche sèvis travay piblik oswa asistans legal ki serye."
      }
    ]
  },
  documents: {
    intro:
      "Dokiman yo pa sèvi menm bagay. CPF, CRNM, paspò ak yon pwotokòl migratwa ka nesesè nan diferan moman, men youn pa ranplase lòt.",
    items: [
      {
        title: "Dokiman idantite ak migrasyon",
        body: "Kenbe paspò ou valab epi respekte kondisyon ki ekri sou viza oswa otorizasyon ou. CRNM se kat enskripsyon migratwa a pou moun ki antre nan kategori ki mande li."
      },
      {
        title: "CPF",
        body: "CPF se nimewo fiskal yo itilize pou anpil sèvis tankou travay, bank ak kontra. Gen yon CPF pa vle di ou gen rezidans oswa pèmisyon travay."
      },
      {
        title: "Dokiman ki soti aletranje",
        body: "Batistè, maryaj, dosye penal oswa diplòm ka bezwen apostiy, legalizasyon oswa tradiksyon selon demach la. Verifye egzijans dosye pa w la anvan ou peye."
      }
    ]
  },
  community: {
    intro:
      "Gen kominote ayisyèn nan plizyè vil Brezil. Rezo sa yo ka ede ak lang, premye oryantasyon ak lavi chak jou, men yo pa ranplase sèvis piblik yo.",
    items: [
      {
        title: "Kòmanse lavi a",
        body: "Aprann pòtigè debaz, idantifye sant sèvis piblik ki toupre ou epi kenbe kontak ak moun ou fè konfyans. Sa ede w jere travay, sante, lekòl ak lojman."
      },
      {
        title: "Chwazi bon èd la",
        body: "Verifye non òganizasyon an ak sèvis li bay anvan ou pataje dokiman. Yon administratè gwoup oswa yon moun nan kominote a pa otomatikman yon pwofesyonèl migrasyon."
      },
      {
        title: "Pa rete poukont ou",
        body: "Si ou sibi diskriminasyon, eksplwatasyon oswa vyolans, konsève prèv ki an sekirite epi chèche yon sèvis piblik oswa yon òganizasyon serye ki ka oryante w."
      }
    ]
  },
  safety: {
    intro:
      "Sekirite kòmanse ak bon abitid: pwoteje dokiman ou, lajan ou ak enfòmasyon pèsonèl ou, ni sou entènèt ni nan lavi chak jou.",
    items: [
      {
        title: "Evite fwod",
        body: "Pa kwè moun ki garanti viza, travay oswa papye rapid. Pa pataje kòd verifikasyon, modpas, done bankè oswa foto dokiman nan yon mesaj ki pa pwoteje."
      },
      {
        title: "Lè w ap deplase",
        body: "Aprann zòn nan, itilize transpò ki idantifye, evite montre gwo kantite lajan epi fè yon moun ou fè konfyans konnen kote ou prale lè sa nesesè."
      },
      {
        title: "Si gen yon pwoblèm",
        body: "Mete sante ak sekirite ou an premye. Chèche sèvis ijans lokal, lapolis oswa asistans konsilè selon kalite sitiyasyon an; pa eseye rezoud yon menas poukont ou."
      }
    ]
  },
  immigration: {
    intro:
      "Imigrasyon se yon pwosesis ki depann de rezon ou antre a, kalite viza oswa otorizasyon ou genyen, ak etap ou dwe fè apre ou rive.",
    items: [
      {
        title: "Antre ak bon kategori a",
        body: "Vizit, etid, travay, fanmi ak pwoteksyon se chemen diferan. Pa planifye antre kòm vizitè si objektif reyèl la mande yon lòt otorizasyon."
      },
      {
        title: "Apre ou rive",
        body: "Li tout kondisyon ki sou dokiman ou epi verifye si ou dwe anrejistre nan Polícia Federal pou jwenn pwotokòl oswa CRNM. Pa kite yon dat enpòtan pase."
      },
      {
        title: "Kenbe sitiyasyon ou ajou",
        body: "Konsève resi ak nimewo pwosesis yo, mete adrès ou ajou lè sa obligatwa epi kòmanse renouvèlman an bonè. Refij se pou yon bezwen pwoteksyon reyèl; li pa yon ranplasman pou viza travay."
      }
    ]
  },
  housing: {
    intro:
      "Kit ou vle lwe oswa achte, pa pran desizyon sèlman sou foto ak mesaj. Vizite kote a, konprann tout depans yo epi verifye moun k ap fè kontra a.",
    items: [
      {
        title: "Pou lwe yon kay",
        body: "Mande kontra alekri, pri total, garanti yo mande, dat peman ak kiyès ki responsab dlo, kouran, condomínio ak reparasyon. Pa voye depo san ou pa verifye kay la ak moun k ap lwe li a."
      },
      {
        title: "Pou achte yon kay",
        body: "Pri anons la pa sèl depans lan. Fè verifye pwopriyetè a, rejis kay la, dèt, taks ak kondisyon kontra a pa yon pwofesyonèl endepandan anvan ou siyen oswa transfere lajan."
      },
      {
        title: "Evite move sipriz",
        body: "Pran foto eta kay la, kenbe tout resi epi pa siyen yon dokiman ou pa konprann. Mande tradiksyon oswa eksplikasyon endepandan si kontra a pa klè pou ou."
      }
    ]
  },
  study: {
    intro:
      "Pou etidye nan Brezil, chwazi yon enstitisyon serye, konprann kondisyon admisyon li epi verifye ki estati migratwa pwogram nan mande.",
    items: [
      {
        title: "Anvan enskripsyon",
        body: "Verifye non enstitisyon an, dire kou a, frè yo, kalandriye a ak dokiman admisyon li bay. Pa peye yon entèmedyè ki pa ka montre relasyon li ak lekòl la."
      },
      {
        title: "Viza ak dokiman",
        body: "Pou kèk etid ki dire lontan, kategori etid la ka mande admisyon, prèv finans ak lòt dokiman anvan vwayaj. Kondisyon an depann de pwogram nan ak konsila ki responsab ou."
      },
      {
        title: "Diplòm etranje",
        body: "Si ou deja gen yon diplòm, rekonesans li se yon demach apa. Yon pwofesyon reglemante ka mande verifikasyon diplòm ak enskripsyon nan konsèy pwofesyonèl li."
      }
    ]
  },
  business: {
    intro:
      "Fè biznis mande plis pase vann yon pwodwi. Ou bezwen konprann estati migratwa ou, enskripsyon aktivite a, taks, pèmi ak responsabilite ou anvè kliyan.",
    items: [
      {
        title: "Prepare lide a",
        body: "Defini kliyan ou, depans yo, pri a ak risk yo. Pa antre nan yon asosiyasyon sèlman sou pawòl; mete kontribisyon, pwopriyete ak fason pou soti nan biznis la alekri."
      },
      {
        title: "Fè aktivite a regilye",
        body: "Kalite aktivite a detèmine ki fòm antrepriz, enskripsyon, lisans ak taks ki ka aplike. Pale ak yon kontab serye anvan ou chwazi yon estrikti oswa sèvi ak non yon lòt moun."
      },
      {
        title: "Pwoteje lajan ak done",
        body: "Separe lajan pèsonèl ak lajan biznis la, bay resi, kenbe dosye depans ak lavant epi pwoteje enfòmasyon kliyan yo. Okenn biznis pa garanti pwofi."
      }
    ]
  }
} as const;

function CountryTopic({
  intro,
  items
}: {
  intro: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <>
      <p>{intro}</p>
      <div className="mobile-guide-topic-list">
        {items.map((item, index) => (
          <article key={item.title}>
            <span aria-hidden="true">{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function whatsappUrl(number: string | null, country: AgencyDestination): string | null {
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(
    `Bonjou, mwen bezwen èd pou yon demach pou ${DESTINATION_COPY[country].name}.`
  )}`;
}

export function MobileCountryGuide({ country, whatsappNumber }: MobileCountryGuideProps) {
  const [actionOpen, setActionOpen] = useState(false);
  const [residence, setResidence] = useState<ResidenceCountryCode | "">("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const destination = DESTINATION_COPY[country];
  const guide = COUNTRY_MIGRATION_GUIDES[country];
  const consularHelp = residence ? getConsularHelp(country, residence) : null;
  const helpUrl = whatsappUrl(whatsappNumber, country);
  const sections = [
    {
      id: "visa",
      icon: FileBadge2,
      title: `Viza pou ${destination.name}`,
      content: (
        <>
          <p>{guide.verdict.body.ht}</p>
          <div className="mobile-guide-stack">
            {guide.pathways.map((pathway) => (
              <article key={pathway.title.ht}>
                <small>{pathway.availability.ht}</small>
                <h3>{pathway.title.ht}</h3>
                <p>{pathway.summary.ht}</p>
                <strong>Sa pou w fè</strong>
                <p>{pathway.action.ht}</p>
              </article>
            ))}
          </div>
          <MobileGuideActions helpUrl={helpUrl} onSelfService={() => setActionOpen(true)} />
        </>
      )
    },
    {
      id: "work",
      icon: BriefcaseBusiness,
      title: `Travay nan ${destination.name}`,
      content: (
        <>
          {guide.life
            .filter((area) => area.title.ht.toLocaleLowerCase("ht").includes("travay"))
            .map((area) => (
              <div key={area.title.ht}>
                <p>{area.body.ht}</p>
              </div>
            ))}
          <p>
            Pa peye pou yon kontra san ou pa verifye antrepriz la. Yon pwomès travay pa ranplase yon
            viza oswa yon pèmisyon ki pèmèt ou travay legalman.
          </p>
        </>
      )
    },
    {
      id: "documents",
      icon: Building2,
      title: `Dokiman nan ${destination.name}`,
      content: (
        <>
          <p>{guide.fromHaiti.intro.ht}</p>
          <ol className="mobile-document-steps">
            {guide.fromHaiti.steps.map((step, index) => (
              <li key={step.ht}>
                <span>{index + 1}</span>
                <p>{step.ht}</p>
              </li>
            ))}
          </ol>
          {guide.life
            .filter((area) => !area.title.ht.toLocaleLowerCase("ht").includes("travay"))
            .slice(0, 3)
            .map((area) => (
              <article className="mobile-inline-info" key={area.title.ht}>
                <h3>{area.title.ht}</h3>
                <p>{area.body.ht}</p>
              </article>
            ))}
        </>
      )
    },
    {
      id: "places",
      icon: Landmark,
      title: `Kote istorik nan ${destination.name}`,
      content: <p>{culturalCopy[country].places}</p>
    },
    {
      id: "community",
      icon: UsersRound,
      title: `Ayisyen nan ${destination.name}`,
      content: <p>{culturalCopy[country].community}</p>
    },
    {
      id: "news",
      icon: Newspaper,
      title: `Nouvèl ${destination.name}`,
      content: (
        <div className="mobile-news-jump">
          <p>Li dènye mizajou enpòtan sou migrasyon, dokiman, travay ak lavi pratik nan peyi a.</p>
          <Link
            className="button"
            href={{ pathname: localizedPath("ht", "news"), query: { country } }}
          >
            Ale nan nouvèl yo <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      )
    }
  ] as const;
  const brazilSections = [
    {
      id: "visa",
      icon: FileBadge2,
      title: "Koze viza Brezil",
      content: sections[0].content
    },
    {
      id: "work",
      icon: BriefcaseBusiness,
      title: "Koze travay nan Brezil",
      content: <CountryTopic {...brazilTopics.work} />
    },
    {
      id: "documents",
      icon: Building2,
      title: "Koze dokiman nan Brezil",
      content: <CountryTopic {...brazilTopics.documents} />
    },
    {
      id: "community",
      icon: UsersRound,
      title: "Ayisyen nan Brezil",
      content: <CountryTopic {...brazilTopics.community} />
    },
    {
      id: "safety",
      icon: ShieldCheck,
      title: "Koze sekirite nan Brezil",
      content: <CountryTopic {...brazilTopics.safety} />
    },
    {
      id: "immigration",
      icon: Plane,
      title: "Koze imigrasyon nan Brezil",
      content: <CountryTopic {...brazilTopics.immigration} />
    },
    {
      id: "housing",
      icon: House,
      title: "Koze lwe ak achte kay nan Brezil",
      content: <CountryTopic {...brazilTopics.housing} />
    },
    {
      id: "study",
      icon: GraduationCap,
      title: "Koze etidye nan Brezil",
      content: <CountryTopic {...brazilTopics.study} />
    },
    {
      id: "business",
      icon: Store,
      title: "Koze fè biznis nan Brezil",
      content: <CountryTopic {...brazilTopics.business} />
    }
  ] as const;
  const chileSections = [
    {
      id: "visa",
      icon: FileBadge2,
      title: "Koze viza Chili",
      content: sections[0].content
    },
    {
      id: "work",
      icon: BriefcaseBusiness,
      title: "Koze travay nan Chili",
      content: <CountryTopic {...chileTopics.work} />
    },
    {
      id: "documents",
      icon: Building2,
      title: "Koze dokiman nan Chili",
      content: <CountryTopic {...chileTopics.documents} />
    },
    {
      id: "community",
      icon: UsersRound,
      title: "Ayisyen nan Chili",
      content: <CountryTopic {...chileTopics.community} />
    },
    {
      id: "safety",
      icon: ShieldCheck,
      title: "Koze sekirite nan Chili",
      content: <CountryTopic {...chileTopics.safety} />
    },
    {
      id: "immigration",
      icon: Plane,
      title: "Koze imigrasyon nan Chili",
      content: <CountryTopic {...chileTopics.immigration} />
    },
    {
      id: "housing",
      icon: House,
      title: "Koze lwe ak achte kay nan Chili",
      content: <CountryTopic {...chileTopics.housing} />
    },
    {
      id: "study",
      icon: GraduationCap,
      title: "Koze etidye nan Chili",
      content: <CountryTopic {...chileTopics.study} />
    },
    {
      id: "business",
      icon: Store,
      title: "Koze fè biznis nan Chili",
      content: <CountryTopic {...chileTopics.business} />
    }
  ] as const;
  const displayedSections = country === "brazil" ? brazilSections : chileSections;

  return (
    <div className={`mobile-country-experience mobile-country-experience-${country}`}>
      <section className={`mobile-country-banner mobile-country-banner-${country}`}>
        <Image alt={destination.imageAlt} fill priority sizes="100vw" src={destination.image} />
        <span aria-hidden="true" />
        <div>
          <h1>{destination.name}</h1>
          <div className="mobile-country-facts">
            <span>
              <Landmark aria-hidden="true" size={15} /> Kapital: {destination.capital}
            </span>
            <span>
              <UsersRound aria-hidden="true" size={15} /> Popilasyon: {destination.population}
            </span>
          </div>
        </div>
      </section>

      <section className="mobile-country-introduction">
        <p className="eyebrow">{destination.overviewTitle}</p>
        <p>{destination.shortIntroduction}</p>
      </section>

      <section
        className="mobile-country-accordions"
        aria-label={`Enfòmasyon sou ${destination.name}`}
      >
        {displayedSections.map(({ id, icon: Icon, title, content }) => (
          <details key={id}>
            <summary>
              <span aria-hidden="true">
                <Icon size={20} />
              </span>
              <strong>{title}</strong>
              <ChevronDown aria-hidden="true" size={20} />
            </summary>
            <div className="mobile-accordion-content">{content}</div>
          </details>
        ))}
      </section>

      {actionOpen ? (
        <div className="agency-action-backdrop" role="presentation">
          <section
            aria-labelledby="self-service-title"
            aria-modal="true"
            className="agency-action-sheet"
            role="dialog"
          >
            <header>
              <div>
                <small>Fè demach la poukont ou</small>
                <h2 id="self-service-title">Nan ki peyi ou ye kounye a?</h2>
              </div>
              <button
                aria-label="Fèmen"
                onClick={() => setActionOpen(false)}
                ref={closeRef}
                type="button"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </header>
            <label>
              <span>Chwazi peyi a</span>
              <select
                autoFocus
                onChange={(event) => setResidence(event.target.value as ResidenceCountryCode | "")}
                value={residence}
              >
                <option value="">Chwazi yon peyi</option>
                {RESIDENCE_COUNTRIES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            {consularHelp ? (
              <article aria-live="polite">
                <h3>{consularHelp.title}</h3>
                <p>{consularHelp.body}</p>
                <a className="button" href={consularHelp.url} rel="noreferrer" target="_blank">
                  Louvri paj sèvis la <ExternalLink aria-hidden="true" size={17} />
                </a>
              </article>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

function MobileGuideActions({
  helpUrl,
  onSelfService
}: {
  helpUrl: string | null;
  onSelfService: () => void;
}) {
  return (
    <div className="mobile-guide-actions">
      <button className="button button-quiet" onClick={onSelfService} type="button">
        Fè l poukont mwen
      </button>
      {helpUrl ? (
        <a className="button button-whatsapp" href={helpUrl} rel="noreferrer" target="_blank">
          Mande nou èd <MessageCircle aria-hidden="true" size={17} />
        </a>
      ) : (
        <span className="mobile-whatsapp-off">
          <MessageCircle aria-hidden="true" size={17} /> WhatsApp pa disponib pou kounye a
        </span>
      )}
    </div>
  );
}
