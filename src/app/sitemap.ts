import type { MetadataRoute } from "next";
import { countries, countrySectionKeys } from "@/lib/content/catalog";
import { getSiteUrl } from "@/lib/config/runtime";
import { SUPPORTED_LOCALES } from "@/types/domain";

const publicPaths = [
  "",
  "countries",
  "compare",
  "find-my-country",
  "guides",
  "services",
  "courses",
  "about",
  "faq",
  "contact",
  "search",
  "legal/terms",
  "legal/privacy",
  "legal/cookies",
  "legal/refunds",
  "legal/ai",
  "legal/community",
  "legal/editorial"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = SUPPORTED_LOCALES.flatMap((locale) => [
    ...publicPaths.map((path) => `/${locale}${path ? `/${path}` : ""}`),
    ...countries.flatMap(({ code }) => [
      `/${locale}/countries/${code}`,
      ...countrySectionKeys.map((section) => `/${locale}/countries/${code}/${section}`)
    ])
  ]);

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "weekly",
    priority: path.split("/").filter(Boolean).length === 1 ? 1 : 0.7
  }));
}
