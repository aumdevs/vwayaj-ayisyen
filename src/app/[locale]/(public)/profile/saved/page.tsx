import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";
import { AccountUnavailableNotice } from "@/components/auth/account-unavailable-notice";
import { NEWS_ARTICLES } from "@/content/agency";
import { getFirebaseViewer } from "@/lib/firebase/session";
import { localizedPath } from "@/lib/i18n/paths";

export default async function SavedNewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ht") notFound();
  const viewer = await getFirebaseViewer();
  const saved = viewer
    ? NEWS_ARTICLES.filter((article) => viewer.savedArticleSlugs?.includes(article.slug))
    : [];

  return (
    <main className="profile-support-page">
      <Link className="profile-return-link" href="/ht/profile">
        <ArrowLeft aria-hidden="true" size={18} /> Retounen nan pwofil
      </Link>
      <header>
        <p className="eyebrow">Bibliyotèk pa ou</p>
        <h1>Enfòmasyon anrejistre</h1>
        <p>Nouvèl ou anrejistre yo ap rete ansanm isit la.</p>
      </header>
      {!viewer ? (
        <section className="profile-empty-state">
          <Bookmark aria-hidden="true" size={28} />
          <h2>Enfòmasyon anrejistre ap vini byento</h2>
          <AccountUnavailableNotice detail="Lè kont yo disponib, w ap kapab konsève nouvèl ou vle jwenn ankò." />
          <Link className="button" href={localizedPath("ht", "news")}>
            Li nouvèl yo san kont
          </Link>
        </section>
      ) : saved.length ? (
        <section className="profile-saved-news" aria-label="Nouvèl anrejistre">
          {saved.map((article) => (
            <article key={article.slug}>
              <Image alt={article.imageAlt} height={72} src={article.image} width={96} />
              <div>
                <small>{article.country}</small>
                <h2>{article.title}</h2>
                <Link href={localizedPath("ht", `news/${article.slug}`)}>
                  Li nouvèl la <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="profile-empty-state">
          <Bookmark aria-hidden="true" size={28} />
          <h2>Ou poko anrejistre nouvèl</h2>
          <p>Louvri yon nouvèl epi peze Anrejistre nouvèl la.</p>
          <Link className="button" href={localizedPath("ht", "news")}>
            Gade nouvèl yo
          </Link>
        </section>
      )}
    </main>
  );
}
