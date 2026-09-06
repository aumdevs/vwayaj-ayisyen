import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PROFILE_FAQ } from "@/content/profile-faq";

export default async function ProfileFaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ht") notFound();

  return (
    <main className="profile-support-page">
      <Link className="profile-return-link" href="/ht/profile">
        <ArrowLeft aria-hidden="true" size={18} /> Retounen nan pwofil
      </Link>
      <header>
        <p className="eyebrow">10 repons rapid</p>
        <h1>Kesyon souvan</h1>
        <p>Peze yon kestyon pou li repons lan.</p>
      </header>
      <section className="profile-faq-list" aria-label="Kesyon ak repons">
        {PROFILE_FAQ.map(({ answer, question }, index) => (
          <details key={question}>
            <summary>
              <span>{index + 1}</span>
              <strong>{question}</strong>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
