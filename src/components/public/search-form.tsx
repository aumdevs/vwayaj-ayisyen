"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
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

export function SearchForm({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const [items, setItems] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q");
    if (typeof query !== "string" || query.trim().length < 2) {
      setStatus("error");
      return;
    }
    setStatus("loading");
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
  }

  return (
    <section className="form-card" aria-labelledby="search-form-title">
      <form onSubmit={submit} role="search">
        <div className="field">
          <label htmlFor="public-search" id="search-form-title">
            {dictionary.common.search}
          </label>
          <input id="public-search" maxLength={100} minLength={2} name="q" required type="search" />
          <span className="field-help">{dictionary.assessment.privacy}</span>
        </div>
        <button className="button" disabled={status === "loading"} type="submit">
          {status === "loading" ? dictionary.common.loading : dictionary.common.search}
        </button>
      </form>
      <div aria-live="polite" className="space-top-md">
        {status === "empty" ? <p>{dictionary.common.in_preparation}</p> : null}
        {status === "error" ? <p role="alert">{dictionary.errors.generic}</p> : null}
        {items.map((item) => {
          const href = item.country_code
            ? localizedPath(locale, `guides/${item.country_code}/${item.slug}`)
            : localizedPath(locale, "guides");
          return (
            <article className="content-card" key={`${item.country_code ?? "global"}-${item.slug}`}>
              <h2>
                <Link href={href}>{item.title}</Link>
              </h2>
              {item.summary ? <p>{item.summary}</p> : null}
              {item.last_verified_at ? (
                <small>
                  {dictionary.common.updated}:{" "}
                  {new Date(item.last_verified_at).toLocaleDateString(locale)}
                </small>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
