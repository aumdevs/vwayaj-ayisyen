import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PublicCountryContent } from "@/types/content";
import type { Locale } from "@/types/domain";

export function PublicContentArticle({
  content,
  dictionary,
  locale
}: {
  content: PublicCountryContent;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const notice = dictionary.notices[content.informationType];

  return (
    <article className="content-card space-bottom-sm">
      <p className="info-label">{notice}</p>
      <h3>{content.title}</h3>
      {content.summary ? <p>{content.summary}</p> : null}
      {content.blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === "heading") return <h4 key={key}>{block.text}</h4>;
        if (block.type === "list") {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "notice") {
          return (
            <p className="placeholder-copy" key={key}>
              {block.text}
            </p>
          );
        }
        return <p key={key}>{block.text}</p>;
      })}
      <div className="inline-meta">
        {content.lastVerifiedAt ? (
          <small>
            {dictionary.common.updated}:{" "}
            {new Date(content.lastVerifiedAt).toLocaleDateString(locale)}
          </small>
        ) : null}
        <small>v{content.version}</small>
      </div>
      {content.sources.length > 0 ? (
        <details className="space-top-sm">
          <summary>
            <strong>{dictionary.common.sources}</strong>
          </summary>
          <ul>
            {content.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.title}
                </a>
                {source.publisher ? ` · ${source.publisher}` : ""}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </article>
  );
}
