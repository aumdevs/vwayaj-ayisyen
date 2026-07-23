"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, Search } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import type { CountryCode, Locale } from "@/types/domain";

type SearchResult = {
  country_code: CountryCode | null;
  section_key: string;
  slug: string;
  title: string;
  summary: string | null;
  last_verified_at: string | null;
};

type SearchFormProps = {
  dictionary: Dictionary;
  locale: Locale;
  title: string;
  noResultsTitle: string;
  noResultsBody: string;
};

export function SearchForm({
  dictionary,
  locale,
  title,
  noResultsTitle,
  noResultsBody
}: SearchFormProps) {
  const [items, setItems] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q");
    if (typeof query !== "string" || query.trim().length < 2) {
      setItems([]);
      setStatus("error");
      return;
    }

    setItems([]);
    setStatus("loading");
    try {
      const response = await fetch(
        `/api/search?locale=${locale}&q=${encodeURIComponent(query.trim())}`
      );
      if (!response.ok) {
        setStatus("error");
        return;
      }
      const data = (await response.json()) as { items?: SearchResult[] };
      const results = Array.isArray(data.items) ? data.items : [];
      setItems(results);
      setStatus(results.length > 0 ? "idle" : "empty");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="guide-search-card" aria-labelledby="search-form-title">
      <div className="guide-search-heading">
        <span aria-hidden="true">
          <Search size={25} />
        </span>
        <div>
          <p className="eyebrow">{dictionary.common.search}</p>
          <h2 id="search-form-title">{title}</h2>
        </div>
      </div>
      <form aria-busy={status === "loading"} onSubmit={submit} role="search">
        <label className="sr-only" htmlFor="public-search">
          {title}
        </label>
        <div className="guide-search-control">
          <Search aria-hidden="true" size={20} />
          <input
            id="public-search"
            maxLength={100}
            minLength={2}
            name="q"
            placeholder={title}
            required
            type="search"
          />
          <button className="button" disabled={status === "loading"} type="submit">
            {status === "loading" ? (
              <LoaderCircle aria-hidden="true" className="spin" size={19} />
            ) : null}
            {status === "loading" ? dictionary.common.loading : dictionary.common.search}
          </button>
        </div>
        <small>{dictionary.assessment.privacy}</small>
      </form>

      <div aria-live="polite" className="guide-search-results">
        {status === "empty" ? (
          <div className="search-feedback">
            <strong>{noResultsTitle}</strong>
            <p>{noResultsBody}</p>
          </div>
        ) : null}
        {status === "error" ? (
          <p className="search-feedback" role="alert">
            {dictionary.errors.generic}
          </p>
        ) : null}
        {items.map((item) => {
          const href = item.country_code
            ? localizedPath(locale, `guides/${item.country_code}/${item.slug}`)
            : localizedPath(locale, "guides");
          return (
            <article
              className="guide-search-result"
              key={`${item.country_code ?? "global"}-${item.slug}`}
            >
              <div>
                <h3>
                  <Link href={href}>{item.title}</Link>
                </h3>
                {item.summary ? <p>{item.summary}</p> : null}
                {item.last_verified_at ? (
                  <small>
                    {dictionary.common.updated}:{" "}
                    {new Date(item.last_verified_at).toLocaleDateString(locale)}
                  </small>
                ) : null}
              </div>
              <Link aria-label={`${dictionary.common.learn_more}: ${item.title}`} href={href}>
                <ArrowRight aria-hidden="true" size={19} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
