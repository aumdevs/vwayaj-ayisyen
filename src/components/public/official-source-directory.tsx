import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck2,
  FileBadge2,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPinned,
  PlaneTakeoff,
  ShieldCheck
} from "lucide-react";
import {
  COUNTRY_SOURCE_DIRECTORIES,
  officialDirectoryCopy,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT,
  sourceCategoryLabels,
  type OfficialSourceCategory
} from "@/content/official-source-directory";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import type { CountryCode, Locale } from "@/types/domain";

const categoryIcons = {
  visa: PlaneTakeoff,
  embassy: Landmark,
  immigration: MapPinned,
  identity: FileBadge2,
  work: BriefcaseBusiness,
  study: GraduationCap,
  health: HeartPulse,
  protection: ShieldCheck
} satisfies Record<OfficialSourceCategory, typeof Landmark>;

export function OfficialSourceDirectory({
  country,
  locale
}: {
  country: CountryCode;
  locale: Locale;
}) {
  const copy = officialDirectoryCopy[locale];
  const directory = COUNTRY_SOURCE_DIRECTORIES[country];
  const reviewedAt = formatLocalizedDate(OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT, locale);

  return (
    <section className="section section-white official-source-directory" id="official-sources">
      <div className="shell">
        <header className="official-source-directory-heading">
          <div>
            <p className="eyebrow">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
          <p className="official-source-date">
            <CalendarCheck2 aria-hidden="true" size={19} />
            <span>
              {copy.checked}
              <strong>
                <time dateTime={OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT}>{reviewedAt}</time>
              </strong>
            </span>
          </p>
        </header>

        <div className="source-path-panel">
          <div>
            <p className="eyebrow">{copy.pathTitle}</p>
            <ol>
              {directory.steps[locale].map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
          <aside>
            <ShieldCheck aria-hidden="true" size={24} />
            <div>
              <h3>{copy.safetyTitle}</h3>
              <p>{copy.safetyBody}</p>
            </div>
          </aside>
        </div>

        <div className="official-source-grid official-source-grid-complete">
          {directory.sources.map((source, index) => {
            const Icon = categoryIcons[source.category];
            return (
              <article key={source.url}>
                <span className="official-source-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <div className="official-source-meta">
                    <p className="eyebrow">{sourceCategoryLabels[locale][source.category]}</p>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{source.title}</h3>
                  <p className="source-publisher">{source.publisher}</p>
                  <p>{source.purpose[locale]}</p>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {copy.open} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
