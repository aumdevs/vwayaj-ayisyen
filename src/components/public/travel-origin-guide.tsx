import Image from "next/image";
import { Check, ExternalLink, MessageCircle, ShieldAlert } from "lucide-react";
import { DESTINATION_COPY, RESIDENCE_COUNTRIES } from "@/content/agency";
import type { TravelGuide } from "@/content/travel-guides";

function buildWhatsappUrl(number: string | null, guide: TravelGuide): string | null {
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(
    `Bonjou, mwen ta renmen mande èd pou pwojè ${guide.title}.`
  )}`;
}

export function TravelOriginGuide({
  guide,
  whatsappNumber
}: {
  guide: TravelGuide;
  whatsappNumber: string | null;
}) {
  const destination = DESTINATION_COPY[guide.destination];
  const destinationFlag = guide.destination === "chile" ? "🇨🇱" : "🇧🇷";
  const residenceFlag =
    RESIDENCE_COUNTRIES.find(({ code }) => code === guide.residence)?.flag ?? "🌎";
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, guide);

  return (
    <main className="travel-origin-page">
      <header className="travel-origin-hero">
        <Image
          alt={destination.imageAlt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 60vw"
          src={destination.image}
        />
        <span aria-hidden="true" />
        <div className="shell">
          <div className="travel-origin-hero-card">
            <div
              className="travel-route-badges"
              aria-label={`${guide.residenceLabel} pou ${destination.name}`}
            >
              <span>
                <i aria-hidden="true">{residenceFlag}</i>
                {guide.residenceLabel}
              </span>
              <span aria-hidden="true">→</span>
              <strong>
                <i aria-hidden="true">{destinationFlag}</i>
                {destination.name}
              </strong>
            </div>
            <h1>{guide.title}</h1>
            <p>{guide.introduction}</p>
          </div>
        </div>
      </header>

      <div className="shell travel-origin-layout">
        {guide.limited ? (
          <section className="travel-limited-notice">
            <ShieldAlert aria-hidden="true" size={25} />
            <div>
              <strong>Nou pa gen ase enfòmasyon pou peyi sa a.</strong>
              <p>
                Nou pito di w sa klè pase nou ba w yon move direksyon. Swiv etap ki anba yo pou
                jwenn repons nan men biwo ki responsab la.
              </p>
            </div>
          </section>
        ) : null}

        <section className="travel-step-section" aria-labelledby="travel-steps-title">
          <div className="travel-section-heading">
            <p className="eyebrow">Ann fè l ansanm</p>
            <h2 id="travel-steps-title">Etap pa etap</h2>
            <p>Fini yon etap, tcheke li, epi pase nan pwochen an.</p>
          </div>
          <ol className="travel-step-list">
            {guide.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {step.note ? <small>{step.note}</small> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="travel-checklist" aria-labelledby="travel-checklist-title">
          <div>
            <p className="eyebrow">Anvan ou kòmanse</p>
            <h2 id="travel-checklist-title">Ti lis pou kenbe bò kote w</h2>
          </div>
          <ul>
            {guide.checklist.map((item) => (
              <li key={item}>
                <span aria-hidden="true">
                  <Check size={17} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="travel-official-panel">
          <p className="eyebrow">Pòt ki kòrèk la</p>
          <h2>{guide.consularTitle}</h2>
          <p>{guide.consularBody}</p>
          <div>
            <a className="button" href={guide.consularUrl} rel="noreferrer" target="_blank">
              Kontakte biwo responsab la <ExternalLink aria-hidden="true" size={17} />
            </a>
            <a
              className="button button-quiet"
              href={guide.processUrl}
              rel="noreferrer"
              target="_blank"
            >
              {guide.processLabel} <ExternalLink aria-hidden="true" size={17} />
            </a>
          </div>
        </section>

        {whatsappUrl ? (
          <a className="travel-whatsapp" href={whatsappUrl} rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={22} />
            <span>
              <strong>Mande Vwayaj Ayisyen èd</strong>
              <small>Louvri WhatsApp</small>
            </span>
          </a>
        ) : null}

        <p className="travel-agency-notice">
          Vwayaj Ayisyen ede w konprann ak prepare demach la. Nou pa òganize vwayaj nan okenn
          sikonstans epi nou pa garanti okenn desizyon.
        </p>
      </div>
    </main>
  );
}
