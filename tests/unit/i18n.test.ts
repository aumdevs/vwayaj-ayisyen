import { describe, expect, it } from "vitest";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { DEFAULT_LOCALE, isLocale, normalizeLocale } from "@/lib/i18n/config";
import { getProductCopy } from "@/lib/i18n/product-copy";
import { localizedPath, replaceLocale } from "@/lib/i18n/paths";
import { SUPPORTED_LOCALES } from "@/types/domain";

function leafKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    leafKeys(child, prefix ? `${prefix}.${key}` : key)
  );
}

describe("locale configuration", () => {
  it("uses Haitian Creole as the fail-safe default", () => {
    expect(DEFAULT_LOCALE).toBe("ht");
    expect(normalizeLocale("unknown")).toBe("ht");
    expect(normalizeLocale(null)).toBe("ht");
  });

  it("recognizes only the five approved locales", () => {
    expect(SUPPORTED_LOCALES.every(isLocale)).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("HT")).toBe(false);
  });

  it("keeps the same UI dictionary shape in every locale", () => {
    const expected = leafKeys(getDictionary("ht")).sort();
    for (const locale of SUPPORTED_LOCALES) {
      expect(leafKeys(getDictionary(locale)).sort()).toEqual(expected);
      expect(getProductCopy(locale).productName).toBe("Vwayaj Ayisyen");
    }
  });

  it("builds and replaces localized paths without duplicate slashes", () => {
    expect(localizedPath("ht")).toBe("/ht");
    expect(localizedPath("es", "/countries/usa")).toBe("/es/countries/usa");
    expect(localizedPath("fr", "/")).toBe("/fr");
    expect(replaceLocale("/es/countries/chile", "pt")).toBe("/pt/countries/chile");
    expect(replaceLocale("/", "en")).toBe("/en");
  });
});
