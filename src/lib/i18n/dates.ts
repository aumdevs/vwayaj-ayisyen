import type { Locale } from "@/types/domain";

const HAITIAN_MONTHS = [
  "janvye",
  "fevriye",
  "mas",
  "avril",
  "me",
  "jen",
  "jiyè",
  "out",
  "septanm",
  "oktòb",
  "novanm",
  "desanm"
] as const;

export function formatLocalizedDate(
  isoDate: string,
  locale: Locale,
  month: "long" | "short" = "long"
): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new RangeError(`Invalid date: ${isoDate}`);

  if (locale === "ht") {
    return `${date.getUTCDate()} ${HAITIAN_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}
