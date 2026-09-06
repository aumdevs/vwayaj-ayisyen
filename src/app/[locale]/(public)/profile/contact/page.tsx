import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { AccountUnavailableNotice } from "@/components/auth/account-unavailable-notice";
import { SupportContactForm } from "@/components/auth/support-contact-form";
import { getFirebaseViewer } from "@/lib/firebase/session";

export default async function ProfileContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ht") notFound();
  const viewer = await getFirebaseViewer();
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const whatsappUrl = /^\d{8,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent("Bonjou, mwen bezwen pale ak ekip sipò Vwayaj Ayisyen an.")}`
    : null;

  return (
    <main className="profile-support-page">
      <Link className="profile-return-link" href="/ht/profile">
        <ArrowLeft aria-hidden="true" size={18} /> Retounen nan pwofil
      </Link>
      <header>
        <p className="eyebrow">Ekip sipò</p>
        <h1>Kontakte nou</h1>
        <p>
          {viewer
            ? "Ekri tit ak detay mesaj ou. Repons lan ap ale nan imèl kont Google ou."
            : "Jwenn enfòmasyon sou fason pou kontakte ekip la."}
        </p>
      </header>
      {viewer ? (
        <SupportContactForm />
      ) : (
        <section className="profile-empty-state">
          <h2>Mesaj prive yo ap vini byento</h2>
          <AccountUnavailableNotice detail="Fòm kontak pèsonèl la poko disponib. Ou ka kontinye itilize tout enfòmasyon piblik yo san kont." />
        </section>
      )}
      {whatsappUrl ? (
        <a className="profile-whatsapp-card" href={whatsappUrl} rel="noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={24} />
          <span>
            <strong>Pale ak nou sou WhatsApp</strong>
            <small>Louvri konvèsasyon an</small>
          </span>
        </a>
      ) : (
        <button className="profile-whatsapp-card profile-whatsapp-disabled" disabled type="button">
          <MessageCircle aria-hidden="true" size={24} />
          <span>
            <strong>WhatsApp</strong>
            <small>Sèvis la ap disponib byento</small>
          </span>
        </button>
      )}
    </main>
  );
}
