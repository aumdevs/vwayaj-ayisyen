import { notFound } from "next/navigation";
import { AgencyHome } from "@/components/public/agency-home";
import { getDailyMessage } from "@/lib/content/daily-message";
import { getFirebaseViewer } from "@/lib/firebase/session";
import { isLocale } from "@/lib/i18n/config";

type HomePageProps = { params: Promise<{ locale: string }> };

function getPublicWhatsappNumber(): string | null {
  const value = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  return /^\d{8,15}$/.test(value) ? value : null;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "ht") notFound();
  const viewer = await getFirebaseViewer();

  return (
    <AgencyHome
      dailyMessage={getDailyMessage()}
      displayName={viewer?.displayName ?? null}
      whatsappNumber={getPublicWhatsappNumber()}
    />
  );
}
