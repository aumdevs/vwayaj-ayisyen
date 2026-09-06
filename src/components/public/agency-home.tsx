"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Landmark,
  MessageCircle,
  Newspaper,
  Search
} from "lucide-react";
import { useState } from "react";
import {
  DESTINATION_COPY,
  getConsularHelp,
  RESIDENCE_COUNTRIES,
  type AgencyDestination,
  type ResidenceCountryCode
} from "@/content/agency";
import { localizedPath } from "@/lib/i18n/paths";

type AgencyHomeProps = {
  dailyMessage: string;
  displayName: string | null;
  whatsappNumber: string | null;
};

function buildWhatsappUrl(number: string | null, destination: AgencyDestination): string | null {
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  const message = encodeURIComponent(
    `Bonjou, mwen ta renmen jwenn èd Vwayaj Ayisyen pou pwojè mwen pou ${DESTINATION_COPY[destination].name}.`
  );
  return `https://wa.me/${number}?text=${message}`;
}

export function AgencyHome({ dailyMessage, displayName, whatsappNumber }: AgencyHomeProps) {
  const router = useRouter();
  const [destination, setDestination] = useState<AgencyDestination | null>(null);
  const [residence, setResidence] = useState<ResidenceCountryCode | "">("");
  const [homeSearch, setHomeSearch] = useState("");
  const result = destination && residence ? getConsularHelp(destination, residence) : null;
  const whatsappUrl = destination ? buildWhatsappUrl(whatsappNumber, destination) : null;

  return (
    <>
      <section className="desktop-agency-home" aria-labelledby="desktop-agency-title">
        <div className="shell desktop-agency-grid">
          <div className="desktop-agency-copy">
            <p className="eyebrow">Ajans Vwayaj Ayisyen</p>
            <h1 id="desktop-agency-title">Ki kote ou vle ale?</h1>
            <p>
              Chwazi Chili oswa Brezil. N ap montre w chemen ki koresponn ak peyi kote w ap viv la,
              epi w ap deside si w vle fè demach la poukont ou oswa mande nou èd.
            </p>
          </div>

          <div className="desktop-destination-choices">
            {(["chile", "brazil"] as const).map((code) => {
              const country = DESTINATION_COPY[code];
              return (
                <button
                  aria-pressed={destination === code}
                  className={`desktop-destination-choice desktop-destination-${code}`}
                  key={code}
                  onClick={() => {
                    setDestination(code);
                    setResidence("");
                  }}
                  type="button"
                >
                  <Image alt={country.imageAlt} fill priority sizes="36vw" src={country.image} />
                  <span aria-hidden="true" />
                  <strong>Mwen vle ale {country.name}</strong>
                  <ArrowRight aria-hidden="true" size={20} />
                </button>
              );
            })}
          </div>

          {destination ? (
            <section className="desktop-residence-panel" aria-labelledby="residence-title">
              <div>
                <p className="eyebrow">Dezyèm etap</p>
                <h2 id="residence-title">Nan ki peyi ou rete kounye a?</h2>
                <p>
                  Nou gen gid presi pou sis peyi yo. Si ou rete yon lòt kote, chwazi “Lòt peyi” pou
                  wè kijan pou kontakte biwo ki responsab la.
                </p>
              </div>
              <label className="agency-country-select">
                <span>Chwazi peyi kote ou rete a</span>
                <span>
                  <select
                    onChange={(event) =>
                      setResidence(event.target.value as ResidenceCountryCode | "")
                    }
                    value={residence}
                  >
                    <option value="">Chwazi yon peyi</option>
                    {RESIDENCE_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" size={18} />
                </span>
              </label>
            </section>
          ) : null}

          {destination && residence && result ? (
            <article className="desktop-agency-result" aria-live="polite">
              <div className="desktop-result-copy">
                <span className="desktop-result-number">2026</span>
                <div>
                  <p className="eyebrow">Chemen pa w la</p>
                  <h2>
                    Ou rete {RESIDENCE_COUNTRIES.find(({ code }) => code === residence)?.label} epi
                    ou vle ale {DESTINATION_COPY[destination].name}
                  </h2>
                  <p>
                    Kòmanse pa idantifye rezon vwayaj la: vizit, fanmi, etid, travay oswa yon baz
                    rezidans. Apre sa, verifye si konsila ki responsab kote ou rete a resevwa
                    kategori sa a epi prepare dokiman yo anvan ou pran randevou.
                  </p>
                  <h3>{result.title}</h3>
                  <p>{result.body}</p>
                </div>
              </div>
              <div className="desktop-result-actions">
                <a className="button" href={result.url} rel="noreferrer" target="_blank">
                  Fè demach la poukont mwen <ExternalLink aria-hidden="true" size={18} />
                </a>
                {whatsappUrl ? (
                  <a
                    className="button button-whatsapp"
                    href={whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Mande nou èd <MessageCircle aria-hidden="true" size={18} />
                  </a>
                ) : (
                  <span className="agency-whatsapp-unavailable">
                    <MessageCircle aria-hidden="true" size={18} /> WhatsApp pa disponib pou kounye a
                  </span>
                )}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="mobile-agency-home" aria-labelledby="mobile-home-title">
        <div className="mobile-home-shell">
          <div className="mobile-home-hero">
            <span className="mobile-home-hero-shade" aria-hidden="true" />
            <div className="mobile-home-hero-content">
              <header className="mobile-home-heading">
                {displayName ? (
                  <>
                    <h1 id="mobile-home-title">Bonjou, {displayName}.</h1>
                    <p className="mobile-home-member-message">{dailyMessage}</p>
                  </>
                ) : (
                  <h1 className="mobile-home-welcome" id="mobile-home-title">
                    Byenvini sou
                    <br /> Vwayaj Ayisyen
                  </h1>
                )}
                <p className="mobile-home-intro">
                  Dekouvri, konpare epi pran pi bon desizyon pou avni ou ant Chili ak Brezil.
                </p>
              </header>

              <form
                className="mobile-home-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  const term = homeSearch.trim().toLocaleLowerCase("ht");
                  const path =
                    term.includes("chili") || term.includes("chile")
                      ? "travel/chile"
                      : term.includes("brezil") || term.includes("brazil")
                        ? "travel/brazil"
                        : "news";
                  router.push(localizedPath("ht", path));
                }}
                role="search"
              >
                <Search aria-hidden="true" size={19} />
                <input
                  aria-label="Chèche sou Vwayaj Ayisyen"
                  id="mobile-home-search-input"
                  onChange={(event) => setHomeSearch(event.target.value)}
                  placeholder="Kisa w ap chèche jodi a?"
                  type="search"
                  value={homeSearch}
                />
                <button aria-label="Chèche" type="submit">
                  <ArrowRight aria-hidden="true" size={19} />
                </button>
              </form>

              <Link className="mobile-home-feature" href={localizedPath("ht", "about")}>
                <Image
                  alt="Yon koup ayisyen k ap prepare pwojè vwayaj yo ansanm"
                  fill
                  priority
                  sizes="(max-width: 1366px) calc(100vw - 2rem), 1px"
                  src="/images/editorial/onboarding-guidance.webp"
                />
              </Link>

              <section
                className="mobile-home-destinations"
                aria-labelledby="mobile-destination-title"
              >
                <header>
                  <h2 id="mobile-destination-title">Chwazi destinasyon ou</h2>
                  <p>Chak gid adapte ak peyi ou chwazi a.</p>
                </header>
                <div>
                  {(["chile", "brazil"] as const).map((code) => {
                    const country = DESTINATION_COPY[code];
                    return (
                      <Link
                        className={`mobile-destination-card mobile-destination-card-${code}`}
                        href={localizedPath("ht", `travel/${code}`)}
                        key={code}
                      >
                        <Image alt={country.imageAlt} fill sizes="45vw" src={country.image} />
                        <span aria-hidden="true" className="mobile-destination-shade" />
                        <span className="mobile-destination-copy">
                          <span className="mobile-destination-title">
                            <span aria-hidden="true">{code === "chile" ? "🇨🇱" : "🇧🇷"}</span>
                            <strong>{country.name}</strong>
                          </span>
                          <span className="mobile-destination-capital">
                            <Landmark aria-hidden="true" size={15} /> {country.capital}
                          </span>
                        </span>
                        <ArrowRight aria-hidden="true" size={19} />
                      </Link>
                    );
                  })}
                </div>
              </section>

              <Link className="mobile-home-update" href={localizedPath("ht", "news")}>
                <span aria-hidden="true">
                  <Newspaper size={18} />
                </span>
                <span>
                  <small>Nouvèl enpòtan</small>
                  <strong>Dènye mizajou sou Chili ak Brezil</strong>
                </span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
