import Image from "next/image";
import Link from "next/link";
import { DESTINATION_COPY, RESIDENCE_COUNTRIES, type AgencyDestination } from "@/content/agency";
import { localizedPath } from "@/lib/i18n/paths";

export function TravelResidenceSelector({ destination }: { destination: AgencyDestination }) {
  const destinationCopy = DESTINATION_COPY[destination];

  return (
    <main className={`travel-selector-page travel-selector-${destination}`}>
      <section className="travel-selector-hero">
        <Image
          alt={destinationCopy.imageAlt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 50vw"
          src={destinationCopy.image}
        />
      </section>

      <section className="travel-selector-panel" aria-labelledby="residence-selector-title">
        <h1 id="residence-selector-title">Nan ki peyi ou ye kounye a?</h1>

        <div className="travel-residence-grid">
          {RESIDENCE_COUNTRIES.map((residence) => (
            <Link
              href={localizedPath("ht", `travel/${destination}/from/${residence.code}`)}
              key={residence.code}
            >
              <span aria-hidden="true">{residence.flag}</span>
              <strong>{residence.label}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
