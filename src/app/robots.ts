import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config/runtime";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    ...(isIndexingAllowed()
      ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() }
      : { host: siteUrl.origin })
  };
}
