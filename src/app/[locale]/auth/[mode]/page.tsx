import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { AccountUnavailableNotice } from "@/components/auth/account-unavailable-notice";
import { LogoMark } from "@/components/brand/logo-mark";
import { FirebaseGoogleButton } from "@/components/auth/firebase-google-button";
import { isFirebaseAccountsReady } from "@/lib/config/runtime";

type AuthPageProps = { params: Promise<{ locale: string; mode: string }> };

export default async function AuthPage({ params }: AuthPageProps) {
  const { locale, mode } = await params;
  if (locale !== "ht" || (mode !== "sign-in" && mode !== "sign-up")) notFound();
  const ready = isFirebaseAccountsReady();

  return (
    <main className="mobile-auth-page">
      <header>
        <Link href="/ht/profile">
          <ArrowLeft aria-hidden="true" size={18} /> Retounen
        </Link>
        <span>
          <LogoMark /> Vwayaj Ayisyen
        </span>
      </header>
      <section className="mobile-auth-card">
        <p className="eyebrow">Yon sèl etap</p>
        <h1>Konekte oswa enskri</h1>
        {ready ? (
          <>
            <p>Sèvi ak kont Google ou. Pa gen modpas pou kreye oswa sonje sou sit la.</p>
            <FirebaseGoogleButton enabled />
            <p className="mobile-auth-legal-copy">
              Lè ou kontinye, ou dakò ak <Link href="/ht/legal/terms">Kondisyon itilizasyon</Link>{" "}
              yo epi ou rekonèt <Link href="/ht/legal/privacy">Règleman konfidansyalite</Link> a.
            </p>
          </>
        ) : (
          <AccountUnavailableNotice />
        )}
        <nav aria-label="Opsyon kont">
          <Link href="/ht">Kontinye san kont</Link>
        </nav>
      </section>
    </main>
  );
}
