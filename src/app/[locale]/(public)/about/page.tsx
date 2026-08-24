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
    title: "Yon chemen pi klè pou jwenn bon enfòmasyon an.",
    body: "Vwayaj Ayisyen fèt pou kominote ayisyèn nan jwenn sous ofisyèl sou vwayaj ak lavi nan yon lòt peyi san pèdi tan nan paj ki pa klè.",
    principles: [
      [
        "Sous an premye",
        "Nou mennen w nan anbasad, sèvis imigrasyon ak lòt otorite ki responsab yo."
      ],
      ["Dat ki vizib", "Chak anyè montre dènye dat lyen yo te verifye."],
      ["Lang ki aksesib", "Eksplikasyon yo disponib an kreyòl, fransè, panyòl, pòtigè ak anglè."]
    ],
    processTitle: "Kijan nou òganize chak gid",
    process: [
      "Nou idantifye otorite ki responsab la.",
      "Nou verifye lyen an ak objektif li.",
      "Nou mete etap yo nan yon lòd ki fasil pou suiv."
    ]
  },
  fr: {
    title: "Un chemin plus clair vers la bonne information.",
    body: "Vwayaj Ayisyen aide la communauté haïtienne à trouver des sources officielles sur le voyage et la vie dans un autre pays sans se perdre dans des pages confuses.",
    principles: [
      [
        "Les sources d’abord",
        "Nous vous dirigeons vers les ambassades, services d’immigration et autres autorités responsables."
      ],
      [
        "Des dates visibles",
        "Chaque répertoire indique la dernière date de vérification des liens."
      ],
      [
        "Des langues accessibles",
        "Les explications sont disponibles en créole, français, espagnol, portugais et anglais."
      ]
    ],
    processTitle: "Comment chaque guide est organisé",
    process: [
      "Nous identifions l’autorité responsable.",
      "Nous vérifions le lien et son objectif.",
      "Nous plaçons les étapes dans un ordre facile à suivre."
    ]
  },
  es: {
    title: "Un camino más claro hacia la información correcta.",
    body: "Vwayaj Ayisyen ayuda a la comunidad haitiana a encontrar fuentes oficiales sobre viajes y vida en otro país sin perderse en páginas confusas.",
    principles: [
      [
        "Primero las fuentes",
        "Te llevamos a embajadas, servicios de inmigración y otras autoridades responsables."
      ],
      [
        "Fechas visibles",
        "Cada directorio muestra la última fecha de verificación de sus enlaces."
      ],
      [
        "Idiomas accesibles",
        "Las explicaciones están disponibles en kreyòl, francés, español, portugués e inglés."
      ]
    ],
    processTitle: "Cómo organizamos cada guía",
    process: [
      "Identificamos a la autoridad responsable.",
      "Verificamos el enlace y su propósito.",
      "Ordenamos los pasos para que sean fáciles de seguir."
    ]
  },
  pt: {
    title: "Um caminho mais claro para a informação certa.",
    body: "Vwayaj Ayisyen ajuda a comunidade haitiana a encontrar fontes oficiais sobre viagem e vida em outro país sem se perder em páginas confusas.",
    principles: [
      [
        "Fontes em primeiro lugar",
        "Levamos você a embaixadas, serviços de imigração e outras autoridades responsáveis."
      ],
      ["Datas visíveis", "Cada diretório mostra a data da última verificação dos links."],
      [
        "Idiomas acessíveis",
        "As explicações estão disponíveis em crioulo haitiano, francês, espanhol, português e inglês."
      ]
    ],
    processTitle: "Como organizamos cada guia",
    process: [
      "Identificamos a autoridade responsável.",
      "Verificamos o link e sua finalidade.",
      "Organizamos as etapas em uma ordem fácil de seguir."
    ]
  },
  en: {
    title: "A clearer path to the right information.",
    body: "Vwayaj Ayisyen helps the Haitian community find official sources about travel and life in another country without getting lost in confusing pages.",
    principles: [
      [
        "Sources first",
        "We take you to embassies, immigration services and other responsible authorities."
      ],
      ["Visible dates", "Every directory shows when its links were last checked."],
      [
        "Accessible languages",
        "Explanations are available in Haitian Creole, French, Spanish, Portuguese and English."
      ]
    ],
    processTitle: "How each guide is organized",
    process: [
      "We identify the responsible authority.",
      "We check the link and its purpose.",
      "We place the steps in an order that is easy to follow."
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
