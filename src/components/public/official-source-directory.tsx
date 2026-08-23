import { ArrowUpRight, CalendarCheck2, Landmark, ShieldAlert } from "lucide-react";
import {
  officialDirectoryCopy,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT,
  USA_OFFICIAL_SOURCES
} from "@/content/official-source-directory";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import type { Locale } from "@/types/domain";

export function OfficialSourceDirectory({ locale }: { locale: Locale }) {
  const copy = officialDirectoryCopy[locale];
  const reviewedAt = formatLocalizedDate(OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT, locale);

  return (
    <section className="section section-white official-source-directory">
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

        <div className="official-source-grid">
          {USA_OFFICIAL_SOURCES.map((source, index) => (
            <article key={source.url}>
              <span className="official-source-icon" aria-hidden="true">
                <Landmark size={22} />
              </span>
              <div>
                <div className="official-source-meta">
                  <p className="eyebrow">{source.publisher}</p>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{source.title}</h3>
                <p>{source.purpose[locale]}</p>
                <a
                  data-analytics-event="official_source_opened"
                  href={source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.open} <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <aside className="official-source-notice">
          <ShieldAlert aria-hidden="true" size={23} />
          <div>
            <h3>{copy.noticeTitle}</h3>
            <p>{copy.noticeBody}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
