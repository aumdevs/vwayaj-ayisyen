import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config/runtime";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  if (!isIndexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/portal/",
          "/*/admin/",
          "/*/advisor/",
          "/*/professional/",
          "/*/editor/",
          "/*/moderation/",
          "/api/"
        ]
      }
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString()
  };
}
