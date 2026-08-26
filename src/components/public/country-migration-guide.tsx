import {
  AlertTriangle,
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  FileBadge2,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPinned,
  Route,
  ShieldAlert,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { COUNTRY_MIGRATION_GUIDES, migrationGuideCopy } from "@/content/migration-guides";
import { getCountry } from "@/lib/content/catalog";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import type { CountryCode, Locale } from "@/types/domain";

const pathwayIconsByCountry = {
  usa: [FileBadge2, UsersRound, GraduationCap, BriefcaseBusiness, ShieldCheck],
  chile: [BriefcaseBusiness, GraduationCap, UsersRound, MapPinned, ShieldCheck],
  brazil: [UsersRound, GraduationCap, BriefcaseBusiness, MapPinned, ShieldCheck],
  mexico: [BriefcaseBusiness, UsersRound, GraduationCap, MapPinned, ShieldCheck]
} satisfies Record<CountryCode, readonly (typeof ShieldCheck)[]>;
const lifeIconsByCountry = {
  usa: [FileBadge2, BriefcaseBusiness, GraduationCap, Landmark],
  chile: [FileBadge2, BriefcaseBusiness, GraduationCap, HeartPulse, ShieldCheck],
  brazil: [FileBadge2, FileBadge2, BriefcaseBusiness, HeartPulse, GraduationCap],
  mexico: [FileBadge2, FileBadge2, BriefcaseBusiness, GraduationCap, ShieldCheck]
} satisfies Record<CountryCode, readonly (typeof ShieldCheck)[]>;

export function CountryMigrationGuide({
  country: countryCode,
  locale
}: {
  country: CountryCode;
  locale: Locale;
}) {
  const guide = COUNTRY_MIGRATION_GUIDES[countryCode];
  const country = getCountry(countryCode);
  const copy = migrationGuideCopy[locale];
  const reviewedAt = formatLocalizedDate(guide.reviewedAt, locale);

  return (
    <div className={`migration-guide country-accent-${country.accent}`}>
      <section className="migration-guide-overview" id="guide-overview">
        <div className="shell">
          <div className="guide-jump-card" aria-label={copy.jumpLabel}>
            <span>{copy.jumpLabel}</span>
            <nav>
              <a href="#guide-overview">{copy.overview}</a>
              <a href="#legal-pathways">{copy.pathways}</a>
              <a href="#from-haiti">{copy.preparation}</a>
              <a href="#after-arrival">{copy.arrival}</a>
              <a href="#irregular-routes">{copy.irregular}</a>
              <a href="#guide-updates">{copy.updates}</a>
            </nav>
          </div>

          <div className="guide-overview-grid">
            <div>
              <p className="eyebrow">{copy.guideKicker}</p>
              <h2>{country.name[locale]}</h2>
              <p className="guide-country-summary">{guide.summary[locale]}</p>
              <p className="guide-review-stamp">
                <CalendarCheck2 aria-hidden="true" size={18} />
                <span>
                  {copy.reviewed}: <time dateTime={guide.reviewedAt}>{reviewedAt}</time>
                </span>
              </p>
            </div>
            <dl className="guide-fact-grid">
              {guide.facts.map((fact) => (
                <div key={fact.label.en}>
                  <dt>{fact.label[locale]}</dt>
                  <dd>{fact.value[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <article className={`guide-verdict guide-tone-${guide.tone}`}>
            <div className="guide-verdict-mark" aria-hidden="true">
              {guide.tone === "possible" ? <CheckCircle2 size={30} /> : <AlertTriangle size={30} />}
            </div>
            <div className="guide-verdict-main">
              <p className="eyebrow">{copy.verdictKicker}</p>
              <span className={`guide-status guide-status-${guide.tone}`}>
                {guide.verdict.label[locale]}
              </span>
              <h2>{guide.verdict.title[locale]}</h2>
              <p>{guide.verdict.body[locale]}</p>
            </div>
            <ul>
              {guide.verdict.points.map((point) => (
                <li key={point.en}>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <span>{point[locale]}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section guide-pathways-section" id="legal-pathways">
        <div className="shell">
          <header className="guide-section-heading">
            <div>
              <p className="eyebrow">{copy.pathwaysKicker}</p>
              <h2>{copy.pathwaysTitle}</h2>
            </div>
            <p>{copy.pathwaysBody}</p>
          </header>

          <div className="guide-pathway-grid">
            {guide.pathways.map((pathway, index) => {
              const Icon = pathwayIconsByCountry[countryCode][index] ?? ShieldCheck;
              return (
                <article key={pathway.title.en}>
                  <div className="guide-pathway-top">
                    <span className="guide-card-icon" aria-hidden="true">
                      <Icon size={23} />
                    </span>
                    <span className={`guide-status guide-status-${pathway.tone}`}>
                      {pathway.availability[locale]}
                    </span>
                  </div>
                  <h3>{pathway.title[locale]}</h3>
                  <p>{pathway.summary[locale]}</p>
                  <div className="guide-action-box">
                    <strong>{copy.whatToDo}</strong>
                    <p>{pathway.action[locale]}</p>
                  </div>
                  <a href={pathway.link.url} rel="noreferrer" target="_blank">
                    {pathway.link.label[locale]} <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section guide-preparation-section" id="from-haiti">
        <div className="shell guide-preparation-layout">
          <div className="guide-preparation-intro">
            <span className="guide-large-icon" aria-hidden="true">
              <Route size={30} />
            </span>
            <p className="eyebrow">{copy.preparationKicker}</p>
            <h2>{copy.preparationTitle}</h2>
            <p>{guide.fromHaiti.intro[locale]}</p>
            <a
              className="guide-passport-link"
              href="https://immigration.mict.gouv.ht/informations-utiles/demande-de-passeport/"
              rel="noreferrer"
              target="_blank"
            >
              <FileBadge2 aria-hidden="true" size={18} />
              Direction de l&apos;Immigration et de l&apos;Émigration
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
          <ol className="guide-preparation-steps">
            {guide.fromHaiti.steps.map((step, index) => (
              <li key={step.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section guide-life-section" id="after-arrival">
        <div className="shell">
          <header className="guide-section-heading">
            <div>
              <p className="eyebrow">{copy.arrivalKicker}</p>
              <h2>{copy.arrivalTitle}</h2>
            </div>
            <Landmark aria-hidden="true" size={44} />
          </header>
          <div className="guide-life-grid">
            {guide.life.map((area, index) => {
              const Icon = lifeIconsByCountry[countryCode][index] ?? ShieldCheck;
              return (
                <article key={area.title.en}>
                  <span className="guide-card-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{area.title[locale]}</h3>
                  <p>{area.body[locale]}</p>
                  <a href={area.link.url} rel="noreferrer" target="_blank">
                    {area.link.label[locale]} <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section guide-irregular-section" id="irregular-routes">
        <div className="shell guide-irregular-panel">
          <header>
            <span aria-hidden="true">
              <ShieldAlert size={28} />
            </span>
            <div>
              <p className="eyebrow">{copy.irregularKicker}</p>
              <h2>{guide.irregular.title[locale]}</h2>
              <p>{guide.irregular.body[locale]}</p>
            </div>
          </header>
          <div className="guide-irregular-columns">
            <div>
              <h3>{copy.knownPatterns}</h3>
              <ul>
                {guide.irregular.patterns.map((pattern) => (
                  <li key={pattern.en}>{pattern[locale]}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{copy.risksTitle}</h3>
              <ul className="guide-risk-list">
                {guide.irregular.risks.map((risk) => (
                  <li key={risk.en}>
                    <AlertTriangle aria-hidden="true" size={16} /> {risk[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="guide-irregular-closing">{guide.irregular.closing[locale]}</p>
        </div>
      </section>

      <section className="section guide-updates-section" id="guide-updates">
        <div className="shell">
          <header className="guide-section-heading">
            <div>
              <p className="eyebrow">{copy.updatesKicker}</p>
              <h2>{copy.updatesTitle}</h2>
            </div>
            <CalendarCheck2 aria-hidden="true" size={44} />
          </header>
          <div className="guide-update-grid">
            {guide.updates.map((update) => (
              <article key={`${update.date}-${update.title.en}`}>
                <time dateTime={update.date}>{formatLocalizedDate(update.date, locale)}</time>
                <h3>{update.title[locale]}</h3>
                <p>{update.body[locale]}</p>
                <a href={update.link.url} rel="noreferrer" target="_blank">
                  {update.link.label[locale]} <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="guide-source-note">
            <BookOpenCheck aria-hidden="true" size={18} /> {copy.sourceNote}
          </p>
        </div>
      </section>
    </div>
  );
}
