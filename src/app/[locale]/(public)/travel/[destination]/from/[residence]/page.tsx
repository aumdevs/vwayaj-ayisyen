import { notFound } from "next/navigation";
import { TravelOriginGuide } from "@/components/public/travel-origin-guide";
import {
  RESIDENCE_COUNTRIES,
  type AgencyDestination,
  type ResidenceCountryCode
} from "@/content/agency";
import { getTravelGuide } from "@/content/travel-guides";

type TravelOriginPageProps = {
  params: Promise<{ destination: string; locale: string; residence: string }>;
};

export function generateStaticParams() {
  return (["chile", "brazil"] as const).flatMap((destination) =>
    RESIDENCE_COUNTRIES.map(({ code: residence }) => ({ destination, residence }))
  );
}

export default async function TravelOriginPage({ params }: TravelOriginPageProps) {
  const { destination, locale, residence } = await params;
  const validDestination = destination === "chile" || destination === "brazil";
  const validResidence = RESIDENCE_COUNTRIES.some(({ code }) => code === residence);
  if (locale !== "ht" || !validDestination || !validResidence) notFound();

  const whatsappNumber = /^\d{8,15}$/.test(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "")
    ? (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null)
    : null;
  const guide = getTravelGuide(destination as AgencyDestination, residence as ResidenceCountryCode);

  return <TravelOriginGuide guide={guide} whatsappNumber={whatsappNumber} />;
}
