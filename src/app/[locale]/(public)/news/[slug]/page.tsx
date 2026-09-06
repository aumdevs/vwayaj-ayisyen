import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { SaveNewsButton } from "@/components/auth/save-news-button";
import { getNewsArticle, NEWS_ARTICLES } from "@/content/agency";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import { localizedPath } from "@/lib/i18n/paths";
import { getFirebaseViewer } from "@/lib/firebase/session";

type NewsArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return NEWS_ARTICLES.map(({ slug }) => ({ slug }));
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug);
  if (locale !== "ht" || !article) notFound();
  const viewer = await getFirebaseViewer();
  const initialSaved = viewer?.savedArticleSlugs?.includes(slug) ?? false;

  return (
    <article className="news-article">
      <header className="news-article-hero">
        <Image alt={article.imageAlt} fill priority sizes="100vw" src={article.image} />
        <span aria-hidden="true" />
        <div className="shell">
          <Link href={localizedPath("ht", "news")}>
            <ArrowLeft aria-hidden="true" size={18} /> Retounen nan nouvèl yo
          </Link>
          <div className="news-article-meta">
            <span>{article.country}</span>
            <time dateTime={article.publishedAt}>
              <CalendarDays aria-hidden="true" size={15} />
              {formatLocalizedDate(article.publishedAt, "ht")}
            </time>
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
      </header>

      <div className="shell news-article-layout">
        <div className="news-article-body">
          {article.paragraphs.map((paragraph, index) => (
            <section key={paragraph}>
              {index === 0 ? <h2>Sa k pase</h2> : null}
              {index === 1 ? <h2>Sa sa vle di pou ou</h2> : null}
              {index === 2 ? <h2>Ki sa pou w fè kounye a</h2> : null}
              <p>{paragraph}</p>
            </section>
          ))}
          {article.points ? (
            <aside>
              <h2>Twa bagay pou sonje</h2>
              <ul>
                {article.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
        <nav className="news-article-actions" aria-label="Apre nouvèl la">
          <SaveNewsButton initialSaved={initialSaved} signedIn={Boolean(viewer)} slug={slug} />
          <Link className="button button-quiet" href={localizedPath("ht", "news")}>
            <ArrowLeft aria-hidden="true" size={17} /> Tout nouvèl yo
          </Link>
        </nav>
      </div>
    </article>
  );
}
