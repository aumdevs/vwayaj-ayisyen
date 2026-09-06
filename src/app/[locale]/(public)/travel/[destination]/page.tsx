import { notFound } from "next/navigation";
import { TravelResidenceSelector } from "@/components/public/travel-residence-selector";
import type { AgencyDestination } from "@/content/agency";

type TravelSelectorPageProps = {
  params: Promise<{ destination: string; locale: string }>;
};

export function generateStaticParams() {
  return [{ destination: "chile" }, { destination: "brazil" }];
}

export default async function TravelSelectorPage({ params }: TravelSelectorPageProps) {
  const { destination, locale } = await params;
  if (locale !== "ht" || (destination !== "chile" && destination !== "brazil")) notFound();

  return <TravelResidenceSelector destination={destination as AgencyDestination} />;
}
