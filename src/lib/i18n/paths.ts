import type { Route } from "next";
import type { Locale } from "@/types/domain";

export function localizedPath(locale: Locale, path = ""): Route {
  const normalizedPath = path === "" || path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `/${locale}${normalizedPath}` as Route;
}

export function replaceLocale(pathname: string, locale: Locale): Route {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return localizedPath(locale);
  segments[0] = locale;
  return `/${segments.join("/")}` as Route;
}
