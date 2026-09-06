import { notFound } from "next/navigation";
import { publicCopy } from "@/content/public-copy";
import { isLocale } from "@/lib/i18n/config";
import type { Locale } from "@/types/domain";

const faqCopy = {
  ht: {
    title: "Kesyon ou ka genyen",
    body: "Repons kout pou konprann gid yo epi pran desizyon ak plis prekosyon.",
    items: [
      [
        "Kisa Vwayaj Ayisyen ye?",
        "Se yon ajans dijital ki ede kominote ayisyèn nan prepare yon pwojè pou Chili oswa Brezil, jwenn etap ofisyèl yo epi mande sipò lè sèvis la aktive."
      ],
      [
        "Èske sit la ranplase yon anbasad oswa yon konseye legal?",
        "Non. Sit la mennen w nan otorite ki responsab la. Pou yon ka pèsonèl, pale ak yon pwofesyonèl otorize nan kote ki konsène a."
      ],
      [
        "Èske enfòmasyon yo toujou aktyèl?",
        "Nou montre dat dènye verifikasyon lyen yo. Règ ak sèvis ka chanje, se poutèt sa ou dwe tcheke paj ofisyèl la anvan ou aji."
      ],
      [
        "Poukisa nou pa bay detay pou travèse ilegalman?",
        "Nou esplike koridò yo konnen ak danje yo pou w konprann reyalite a, men nou pa bay kontak, transpò, pwen travèse oswa fason pou evite kontwòl. Detay sa yo ka mete lavi w an danje."
      ],
      [
        "Èske Vwayaj Ayisyen vann randevou oswa viza?",
        "Non. Nou pa vann viza, randevou gouvènman oswa garanti. Ajans lan ka ede w konprann epi prepare demach la, men se otorite a sèlman ki pran desizyon an."
      ],
      [
        "Kijan mwen ka rapòte yon lyen ki pa bon?",
        "Ekri nou nan adrès sipò ki sou paj kontak la epi bay non peyi a ak lyen an."
      ]
    ]
  },
  fr: {
    title: "Questions que vous pouvez vous poser",
    body: "Des réponses brèves pour comprendre les guides et décider avec davantage de prudence.",
    items: [
      [
        "Qu’est-ce que Vwayaj Ayisyen?",
        "Un guide public qui explique comment une personne haïtienne peut se préparer à vivre, travailler ou étudier aux États-Unis, au Chili, au Brésil ou au Mexique selon les règles de 2026."
      ],
      [
        "Le site remplace-t-il une ambassade ou un conseil juridique?",
        "Non. Le site vous dirige vers l’autorité responsable. Pour un cas personnel, consultez un professionnel autorisé dans la juridiction concernée."
      ],
      [
        "Les informations sont-elles toujours à jour?",
        "Nous indiquons la date de dernière vérification des liens. Les règles peuvent changer; vérifiez la page officielle avant d’agir."
      ],
      [
        "Pourquoi ne donnez-vous pas d’instructions pour les passages irréguliers?",
        "Nous expliquons les corridors connus et leurs dangers, mais ne donnons ni contacts, ni transports, ni points de passage, ni méthodes pour éviter les contrôles. Ces détails peuvent mettre des vies en danger."
      ],
      [
        "Vwayaj Ayisyen vend-il des rendez-vous ou des visas?",
        "Non. Nous ne vendons ni rendez-vous, ni visa, ni garantie. Utilisez uniquement le canal indiqué par l’autorité."
      ],
      [
        "Comment signaler un lien incorrect?",
        "Écrivez à l’adresse d’assistance de la page contact avec le nom du pays et le lien."
      ]
    ]
  },
  es: {
    title: "Preguntas que puedes tener",
    body: "Respuestas breves para entender las guías y decidir con mayor cuidado.",
    items: [
      [
        "¿Qué es Vwayaj Ayisyen?",
        "Una guía pública que explica cómo una persona haitiana puede prepararse para vivir, trabajar o estudiar en Estados Unidos, Chile, Brasil o México según las reglas de 2026."
      ],
      [
        "¿El sitio sustituye a una embajada o a un asesor legal?",
        "No. El sitio te lleva a la autoridad responsable. Para un caso personal, consulta a un profesional autorizado en la jurisdicción correspondiente."
      ],
      [
        "¿La información está siempre actualizada?",
        "Mostramos la fecha de la última verificación de los enlaces. Las reglas pueden cambiar; revisa la página oficial antes de actuar."
      ],
      [
        "¿Por qué no dan instrucciones para cruces irregulares?",
        "Explicamos los corredores conocidos y sus peligros, pero no damos contactos, transportes, puntos de cruce ni formas de evitar controles. Esos detalles pueden poner vidas en riesgo."
      ],
      [
        "¿Vwayaj Ayisyen vende citas o visas?",
        "No. No vendemos citas, visas ni garantías. Utiliza únicamente el canal indicado por la autoridad."
      ],
      [
        "¿Cómo informo de un enlace incorrecto?",
        "Escribe a la dirección de soporte de la página de contacto e indica el país y el enlace."
      ]
    ]
  },
  pt: {
    title: "Perguntas que você pode ter",
    body: "Respostas breves para entender os guias e decidir com mais cuidado.",
    items: [
      [
        "O que é Vwayaj Ayisyen?",
        "Um guia público que explica como uma pessoa haitiana pode se preparar para viver, trabalhar ou estudar nos Estados Unidos, Chile, Brasil ou México conforme as regras de 2026."
      ],
      [
        "O site substitui uma embaixada ou orientação jurídica?",
        "Não. O site leva você à autoridade responsável. Para um caso pessoal, consulte um profissional autorizado na jurisdição correspondente."
      ],
      [
        "As informações estão sempre atualizadas?",
        "Mostramos a data da última verificação dos links. As regras podem mudar; confira a página oficial antes de agir."
      ],
      [
        "Por que vocês não dão instruções para travessias irregulares?",
        "Explicamos os corredores conhecidos e seus perigos, mas não damos contatos, transportes, pontos de travessia nem formas de evitar controles. Esses detalhes podem colocar vidas em risco."
      ],
      [
        "Vwayaj Ayisyen vende agendamentos ou vistos?",
        "Não. Não vendemos agendamentos, vistos nem garantias. Use somente o canal indicado pela autoridade."
      ],
      [
        "Como aviso sobre um link incorreto?",
        "Escreva para o endereço de suporte na página de contato e informe o país e o link."
      ]
    ]
  },
  en: {
    title: "Questions you may have",
    body: "Short answers to understand the guides and make decisions more carefully.",
    items: [
      [
        "What is Vwayaj Ayisyen?",
        "A public guide explaining how a Haitian person can prepare to live, work or study in the United States, Chile, Brazil or Mexico under 2026 rules."
      ],
      [
        "Does the site replace an embassy or legal adviser?",
        "No. The site takes you to the responsible authority. For an individual case, consult an authorized professional in the relevant jurisdiction."
      ],
      [
        "Is the information always current?",
        "We show when links were last checked. Rules can change, so check the official page before acting."
      ],
      [
        "Why do you not give instructions for irregular crossings?",
        "We explain known corridors and their dangers, but do not provide contacts, transport, crossing points or ways to avoid controls. Those details can put lives at risk."
      ],
      [
        "Does Vwayaj Ayisyen sell appointments or visas?",
        "No. We do not sell appointments, visas or guarantees. Use only the channel identified by the authority."
      ],
      [
        "How do I report a broken link?",
        "Write to the support address on the contact page and include the country and link."
      ]
    ]
  }
} satisfies Record<
  Locale,
  { title: string; body: string; items: readonly (readonly [string, string])[] }
>;

type FaqPageProps = { params: Promise<{ locale: string }> };

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = faqCopy[locale];
  const copy = publicCopy[locale];

  return (
    <>
      <section className="page-hero page-hero-faq">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{copy.navigation.faq}</p>
          <h1>{page.title}</h1>
          <p className="page-lede">{page.body}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="narrow-shell public-faq-list">
          {page.items.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {question}
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
