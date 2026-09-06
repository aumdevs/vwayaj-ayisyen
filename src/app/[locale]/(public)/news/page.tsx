import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/content/agency";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import { localizedPath } from "@/lib/i18n/paths";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ country?: string | string[] }>;
};

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale } = await params;
  if (locale !== "ht") notFound();
  const query = await searchParams;
  const requestedCountry = Array.isArray(query.country) ? undefined : query.country;
  const country =
    requestedCountry === "chile" ? "Chili" : requestedCountry === "brazil" ? "Brezil" : null;
  const articles = country
    ? NEWS_ARTICLES.filter((article) => article.country === country)
    : NEWS_ARTICLES;

  return (
    <div className="news-experience">
      <header className="news-index-header">
        <div className="shell">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" size={16} /> Enfòmasyon ki konte pou ou
          </p>
          <h1>Dènye nouvèl sou Chili ak Brezil</h1>
          <p>
            Sa k ap chanje sou viza, rezidans, dokiman ak lavi chak jou—eksplike klè pou kominote
            ayisyèn nan.
          </p>
          <div className="news-country-filters" aria-label="Filtre nouvèl yo">
            <Link aria-current={!country ? "page" : undefined} href={localizedPath("ht", "news")}>
              Tout
            </Link>
            <Link
              aria-current={country === "Chili" ? "page" : undefined}
              href={{ pathname: localizedPath("ht", "news"), query: { country: "chile" } }}
            >
              Chili
            </Link>
            <Link
              aria-current={country === "Brezil" ? "page" : undefined}
              href={{ pathname: localizedPath("ht", "news"), query: { country: "brazil" } }}
            >
              Brezil
            </Link>
          </div>
        </div>
      </header>

      <div className="shell news-index-main">
        <div className="news-card-grid">
          {articles.map((article, index) => (
            <article
              className={index === 0 ? "news-card news-card-featured" : "news-card"}
              data-country={article.country}
              key={article.slug}
            >
              <Link className="news-card-image" href={localizedPath("ht", `news/${article.slug}`)}>
                <Image
                  alt={article.imageAlt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 767px) 100vw, 40vw"
                  src={article.image}
                />
              </Link>
              <div className="news-card-copy">
                <div>
                  <span>{article.country}</span>
                  <time dateTime={article.publishedAt}>
                    <CalendarDays aria-hidden="true" size={14} />
                    {formatLocalizedDate(article.publishedAt, "ht")}
                  </time>
                </div>
                <h2>
                  <Link href={localizedPath("ht", `news/${article.slug}`)}>{article.title}</Link>
                </h2>
                <p>{article.summary}</p>
                <Link className="news-read-link" href={localizedPath("ht", `news/${article.slug}`)}>
                  Li nouvèl la <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
