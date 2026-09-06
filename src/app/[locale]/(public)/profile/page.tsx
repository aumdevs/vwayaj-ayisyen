import { notFound } from "next/navigation";
import { MobileProfile } from "@/components/auth/mobile-profile";
import { isFirebaseAccountsReady } from "@/lib/config/runtime";
import { getFirebaseViewer } from "@/lib/firebase/session";

type ProfilePageProps = { params: Promise<{ locale: string }> };

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  if (locale !== "ht") notFound();
  const viewer = await getFirebaseViewer();
  const avatarUrl = viewer?.hasCustomAvatar ? "/api/profile/avatar" : (viewer?.photoUrl ?? null);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const whatsappUrl = /^\d{8,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent("Bonjou, mwen ta renmen pale ak ekip Vwayaj Ayisyen.")}`
    : null;

  return (
    <main className="mobile-profile-page">
      <MobileProfile
        accountsReady={isFirebaseAccountsReady()}
        avatarUrl={avatarUrl}
        viewer={viewer}
        whatsappUrl={whatsappUrl}
      />
    </main>
  );
}
