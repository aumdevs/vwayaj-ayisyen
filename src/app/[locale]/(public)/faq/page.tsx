import { notFound } from "next/navigation";
import { publicCopy } from "@/content/public-copy";
import { isLocale } from "@/lib/i18n/config";
import type { Locale } from "@/types/domain";

const faqCopy = {
  ht: {
    title: "Kesyon ou ka genyen",
    body: "Repons kout sou sous yo, limit yo ak fason pou sèvi ak Vwayaj Ayisyen.",
    items: [
      [
        "Kisa Vwayaj Ayisyen ye?",
        "Se yon anyè piblik ki òganize lyen ofisyèl pou Etazini, Chili, Brezil ak Meksik pou kominote ayisyèn nan."
      ],
      [
        "Èske sit la ranplase yon anbasad oswa yon konseye legal?",
        "Non. Sit la mennen w nan otorite ki responsab la. Pou yon ka pèsonèl, pale ak yon pwofesyonèl otorize nan kote ki konsène a."
      ],
      [
        "Èske enfòmasyon yo toujou aktyèl?",
        "Nou montre dat dènye verifikasyon lyen yo. Règ ak sèvis ka chanje, se poutèt sa ou dwe tcheke paj ofisyèl la anvan ou aji."
      ],
      ["Èske mwen bezwen yon kont?", "Non. Tout gid yo piblik epi yo pa mande koneksyon."],
      [
        "Èske Vwayaj Ayisyen vann randevou oswa viza?",
        "Non. Nou pa vann randevou, viza oswa garanti. Sèvi sèlman ak chanèl otorite a endike."
      ],
      [
        "Kijan mwen ka rapòte yon lyen ki pa bon?",
        "Ekri nou nan adrès sipò ki sou paj kontak la epi bay non peyi a ak lyen an."
      ]
    ]
  },
  fr: {
    title: "Questions que vous pouvez vous poser",
    body: "Des réponses brèves sur les sources, leurs limites et l’utilisation de Vwayaj Ayisyen.",
    items: [
      [
        "Qu’est-ce que Vwayaj Ayisyen?",
        "Un répertoire public qui organise des liens officiels pour les États-Unis, le Chili, le Brésil et le Mexique à destination de la communauté haïtienne."
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
        "Ai-je besoin d’un compte?",
        "Non. Tous les guides sont publics et ne demandent aucune connexion."
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
    body: "Respuestas breves sobre las fuentes, sus límites y cómo usar Vwayaj Ayisyen.",
    items: [
      [
        "¿Qué es Vwayaj Ayisyen?",
        "Un directorio público que organiza enlaces oficiales para Estados Unidos, Chile, Brasil y México dirigido a la comunidad haitiana."
      ],
      [
        "¿El sitio sustituye a una embajada o a un asesor legal?",
        "No. El sitio te lleva a la autoridad responsable. Para un caso personal, consulta a un profesional autorizado en la jurisdicción correspondiente."
      ],
      [
        "¿La información está siempre actualizada?",
        "Mostramos la fecha de la última verificación de los enlaces. Las reglas pueden cambiar; revisa la página oficial antes de actuar."
      ],
      ["¿Necesito una cuenta?", "No. Todas las guías son públicas y no requieren iniciar sesión."],
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
    body: "Respostas breves sobre as fontes, seus limites e como usar Vwayaj Ayisyen.",
    items: [
      [
        "O que é Vwayaj Ayisyen?",
        "Um diretório público que organiza links oficiais para Estados Unidos, Chile, Brasil e México voltado à comunidade haitiana."
      ],
      [
        "O site substitui uma embaixada ou orientação jurídica?",
        "Não. O site leva você à autoridade responsável. Para um caso pessoal, consulte um profissional autorizado na jurisdição correspondente."
      ],
      [
        "As informações estão sempre atualizadas?",
        "Mostramos a data da última verificação dos links. As regras podem mudar; confira a página oficial antes de agir."
      ],
      ["Preciso de uma conta?", "Não. Todos os guias são públicos e não exigem login."],
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
    body: "Short answers about the sources, their limits and how to use Vwayaj Ayisyen.",
    items: [
      [
        "What is Vwayaj Ayisyen?",
        "A public directory that organizes official links for the United States, Chile, Brazil and Mexico for the Haitian community."
      ],
      [
        "Does the site replace an embassy or legal adviser?",
        "No. The site takes you to the responsible authority. For an individual case, consult an authorized professional in the relevant jurisdiction."
      ],
      [
        "Is the information always current?",
        "We show when links were last checked. Rules can change, so check the official page before acting."
      ],
      ["Do I need an account?", "No. Every guide is public and does not require sign-in."],
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
