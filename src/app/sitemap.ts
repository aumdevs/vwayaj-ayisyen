import type { MetadataRoute } from "next";
import { PROMOTABLE_CORE_PATHS, PROMOTABLE_LEGAL_PATHS } from "@/config/launch-readiness";
import { NEWS_ARTICLES } from "@/content/agency";
import { getSiteUrl } from "@/lib/config/runtime";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = [
    ...PROMOTABLE_CORE_PATHS.map((path) => `/ht${path ? `/${path}` : ""}`),
    ...PROMOTABLE_LEGAL_PATHS.map((path) => `/ht/${path}`),
    ...NEWS_ARTICLES.map(({ slug }) => `/ht/news/${slug}`)
  ];

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "weekly",
    lastModified: new Date("2026-08-25T00:00:00.000Z"),
    priority: path.split("/").filter(Boolean).length === 1 ? 1 : 0.7
  }));
}
