import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck2, Languages, Landmark } from "lucide-react";
import { BRAND } from "@/config/brand";
import { publicCopy } from "@/content/public-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

const aboutCopy = {
  ht: {
    title: "Yon gid klè pou pran yon desizyon ki pi byen prepare.",
    body: "Vwayaj Ayisyen esplike sa yon Ayisyen bezwen konnen anvan li chwazi Etazini, Chili, Brezil oswa Meksik: ki chemen ki ouvè, sa pou prepare depi Ayiti ak premye demach pou viv, travay oswa etidye lè li rive.",
    principles: [
      [
        "Sous an premye",
        "Nou mennen w nan anbasad, sèvis imigrasyon ak lòt otorite ki responsab yo."
      ],
      ["Reyalite 2026", "Nou di klèman lè yon chemen ouvè, limite oswa fèmen pou Ayisyen."],
      ["Lang ki aksesib", "Eksplikasyon yo disponib an kreyòl, fransè, panyòl, pòtigè ak anglè."]
    ],
    processTitle: "Kijan nou òganize chak gid",
    process: [
      "Nou verifye règ aktyèl yo ak otorite ki responsab la.",
      "Nou esplike opsyon legal yo ak risk yo nan mo ki senp.",
      "Nou mete preparasyon, arive ak lavi chak jou nan yon lòd ki fasil pou suiv."
    ]
  },
  fr: {
    title: "Un guide clair pour prendre une décision mieux préparée.",
    body: "Vwayaj Ayisyen explique ce qu’une personne haïtienne doit savoir avant de choisir les États-Unis, le Chili, le Brésil ou le Mexique : voies disponibles, préparation depuis Haïti et premières démarches pour vivre, travailler ou étudier à l’arrivée.",
    principles: [
      [
        "Les sources d’abord",
        "Nous vous dirigeons vers les ambassades, services d’immigration et autres autorités responsables."
      ],
      [
        "La réalité de 2026",
        "Nous indiquons clairement lorsqu’une voie est ouverte, limitée ou fermée aux Haïtiens."
      ],
      [
        "Des langues accessibles",
        "Les explications sont disponibles en créole, français, espagnol, portugais et anglais."
      ]
    ],
    processTitle: "Comment chaque guide est organisé",
    process: [
      "Nous vérifions les règles actuelles auprès de l’autorité responsable.",
      "Nous expliquons les options légales et les risques en mots simples.",
      "Nous ordonnons la préparation, l’arrivée et la vie quotidienne pour faciliter le parcours."
    ]
  },
  es: {
    title: "Una guía clara para tomar una decisión mejor preparada.",
    body: "Vwayaj Ayisyen explica lo que una persona haitiana necesita saber antes de elegir Estados Unidos, Chile, Brasil o México: caminos disponibles, preparación desde Haití y primeros trámites para vivir, trabajar o estudiar al llegar.",
    principles: [
      [
        "Primero las fuentes",
        "Te llevamos a embajadas, servicios de inmigración y otras autoridades responsables."
      ],
      [
        "La realidad de 2026",
        "Decimos claramente si un camino está abierto, limitado o cerrado para personas haitianas."
      ],
      [
        "Idiomas accesibles",
        "Las explicaciones están disponibles en kreyòl, francés, español, portugués e inglés."
      ]
    ],
    processTitle: "Cómo organizamos cada guía",
    process: [
      "Verificamos las reglas actuales con la autoridad responsable.",
      "Explicamos las opciones legales y los riesgos con palabras sencillas.",
      "Ordenamos la preparación, la llegada y la vida diaria para que sea fácil de seguir."
    ]
  },
  pt: {
    title: "Um guia claro para tomar uma decisão mais bem preparada.",
    body: "Vwayaj Ayisyen explica o que uma pessoa haitiana precisa saber antes de escolher Estados Unidos, Chile, Brasil ou México: caminhos disponíveis, preparação no Haiti e primeiros trâmites para viver, trabalhar ou estudar ao chegar.",
    principles: [
      [
        "Fontes em primeiro lugar",
        "Levamos você a embaixadas, serviços de imigração e outras autoridades responsáveis."
      ],
      [
        "A realidade de 2026",
        "Dizemos claramente quando um caminho está aberto, limitado ou fechado para haitianos."
      ],
      [
        "Idiomas acessíveis",
        "As explicações estão disponíveis em crioulo haitiano, francês, espanhol, português e inglês."
      ]
    ],
    processTitle: "Como organizamos cada guia",
    process: [
      "Verificamos as regras atuais com a autoridade responsável.",
      "Explicamos as opções legais e os riscos em linguagem simples.",
      "Organizamos preparação, chegada e vida diária em uma ordem fácil de seguir."
    ]
  },
  en: {
    title: "A clear guide for a better-prepared decision.",
    body: "Vwayaj Ayisyen explains what a Haitian person needs to know before choosing the United States, Chile, Brazil or Mexico: available pathways, preparation from Haiti and first steps for living, working or studying after arrival.",
    principles: [
      [
        "Sources first",
        "We take you to embassies, immigration services and other responsible authorities."
      ],
      [
        "The reality in 2026",
        "We say clearly when a pathway is open, limited or closed to Haitian people."
      ],
      [
        "Accessible languages",
        "Explanations are available in Haitian Creole, French, Spanish, Portuguese and English."
      ]
    ],
    processTitle: "How each guide is organized",
    process: [
      "We check current rules with the responsible authority.",
      "We explain legal options and risks in plain language.",
      "We put preparation, arrival and daily life in an order that is easy to follow."
    ]
  }
} satisfies Record<
  Locale,
  {
    title: string;
    body: string;
    principles: readonly (readonly [string, string])[];
    processTitle: string;
    process: readonly string[];
  }
>;

const icons = [Landmark, CalendarCheck2, Languages] as const;

type AboutPageProps = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = aboutCopy[locale];
  const copy = publicCopy[locale];

  return (
    <>
      <section className="about-hero premium-about-hero">
        <div className="shell about-hero-grid">
          <div>
            <p className="eyebrow">{BRAND.name}</p>
            <h1>{page.title}</h1>
            <p className="page-lede">{page.body}</p>
            <Link className="button button-large" href={localizedPath(locale, "countries")}>
              {copy.home.primary} <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="about-hero-image">
            <Image
              alt="Vwayaj Ayisyen"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={BRAND.editorialImages.hero}
            />
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell about-principle-grid">
          {page.principles.map(([title, body], index) => {
            const Icon = icons[index] ?? Landmark;
            return (
              <article key={title}>
                <Icon aria-hidden="true" size={26} />
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="section premium-about-process">
        <div className="shell about-process-layout">
          <div>
            <p className="eyebrow">{copy.home.methodKicker}</p>
            <h2>{page.processTitle}</h2>
            <p>{copy.home.methodBody}</p>
          </div>
          <ol>
            {page.process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
