import type { MetadataRoute } from "next";
import { PROMOTABLE_CORE_PATHS, PROMOTABLE_LEGAL_PATHS } from "@/config/launch-readiness";
import { getSiteUrl } from "@/lib/config/runtime";
import { SUPPORTED_LOCALES } from "@/types/domain";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = SUPPORTED_LOCALES.flatMap((locale) => [
    ...PROMOTABLE_CORE_PATHS.map((path) => `/${locale}${path ? `/${path}` : ""}`),
    ...(locale === "es" || locale === "pt"
      ? PROMOTABLE_LEGAL_PATHS.map((path) => `/${locale}/${path}`)
      : [])
  ]);

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "weekly",
    priority: path.split("/").filter(Boolean).length === 1 ? 1 : 0.7
  }));
}
