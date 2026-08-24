import { describe, expect, it } from "vitest";
import { publicCopy } from "@/content/public-copy";
import { DEFAULT_LOCALE, isLocale, normalizeLocale } from "@/lib/i18n/config";
import { formatLocalizedDate } from "@/lib/i18n/dates";
import { localizedPath, replaceLocale } from "@/lib/i18n/paths";
import { SUPPORTED_LOCALES } from "@/types/domain";

describe("public locale configuration", () => {
  it("uses Haitian Creole as the default", () => {
    expect(DEFAULT_LOCALE).toBe("ht");
    expect(normalizeLocale("unknown")).toBe("ht");
    expect(normalizeLocale(null)).toBe("ht");
  });

  it("recognizes only the five approved locales", () => {
    expect(SUPPORTED_LOCALES.every(isLocale)).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("HT")).toBe(false);
  });

  it("ships complete public copy in every language", () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(publicCopy[locale].home.title.length).toBeGreaterThan(10);
      expect(publicCopy[locale].countries.cardTags).toHaveLength(3);
      expect(publicCopy[locale].home.methodItems).toHaveLength(3);
      expect(publicCopy[locale].navigation.countries.length).toBeGreaterThan(2);
    }
  });

  it("builds and replaces localized paths", () => {
    expect(localizedPath("ht")).toBe("/ht");
    expect(localizedPath("es", "/countries/usa")).toBe("/es/countries/usa");
    expect(replaceLocale("/es/countries/chile", "pt")).toBe("/pt/countries/chile");
  });

  it("formats the review date in Haitian Creole", () => {
    expect(formatLocalizedDate("2026-08-24", "ht")).toBe("24 out 2026");
  });
});
