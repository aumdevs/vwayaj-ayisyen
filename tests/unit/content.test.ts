import { describe, expect, it } from "vitest";
import { countries, getCountry, isCountryCode } from "@/lib/content/catalog";
import {
  COUNTRY_SOURCE_DIRECTORIES,
  OFFICIAL_SOURCE_COUNT,
  OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT
} from "@/content/official-source-directory";
import { COUNTRY_MIGRATION_GUIDES } from "@/content/migration-guides";
import { SUPPORTED_LOCALES } from "@/types/domain";

describe("public country catalog", () => {
  it("contains exactly the four approved countries", () => {
    expect(countries.map(({ code }) => code)).toEqual(["usa", "chile", "brazil", "mexico"]);
    expect(new Set(countries.map(({ iso2 }) => iso2)).size).toBe(4);
  });

  it("rejects arbitrary country slugs", () => {
    expect(isCountryCode("usa")).toBe(true);
    expect(isCountryCode("haiti")).toBe(false);
    expect(getCountry("brazil").iso2).toBe("BR");
    expect(() => getCountry("unknown" as "usa")).toThrow("Unknown country code");
  });

  it("publishes twelve reviewed sources for every country", () => {
    expect(OFFICIAL_SOURCE_COUNT).toBe(48);
    expect(OFFICIAL_SOURCE_DIRECTORY_REVIEWED_AT).toBe("2026-08-25");
    for (const country of countries) {
      const directory = COUNTRY_SOURCE_DIRECTORIES[country.code];
      expect(directory.sources).toHaveLength(12);
      expect(directory.steps.ht).toHaveLength(4);
    }
  });

  it("publishes a complete practical migration guide for every country and locale", () => {
    for (const country of countries) {
      const guide = COUNTRY_MIGRATION_GUIDES[country.code];
      expect(guide.reviewedAt).toBe("2026-08-25");
      expect(guide.pathways.length).toBeGreaterThanOrEqual(5);
      expect(guide.fromHaiti.steps).toHaveLength(5);
      expect(guide.life.length).toBeGreaterThanOrEqual(4);
      expect(guide.irregular.patterns.length).toBeGreaterThanOrEqual(3);
      expect(guide.irregular.risks.length).toBeGreaterThanOrEqual(4);
      expect(guide.updates.length).toBeGreaterThanOrEqual(2);

      for (const locale of SUPPORTED_LOCALES) {
        expect(guide.summary[locale].length).toBeGreaterThan(80);
        expect(guide.verdict.title[locale].length).toBeGreaterThan(30);
        expect(guide.irregular.body[locale].length).toBeGreaterThan(100);
      }

      for (const url of [
        ...guide.pathways.map(({ link }) => link.url),
        ...guide.life.map(({ link }) => link.url),
        ...guide.updates.map(({ link }) => link.url)
      ]) {
        expect(url).toMatch(/^https:\/\//);
      }
    }
  });

  it("uses unique HTTPS links with complete multilingual purposes", () => {
    const sources = Object.values(COUNTRY_SOURCE_DIRECTORIES).flatMap(({ sources }) => sources);
    expect(new Set(sources.map(({ url }) => url)).size).toBe(sources.length);
    for (const source of sources) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.title.length).toBeGreaterThan(3);
      expect(source.publisher.length).toBeGreaterThan(3);
      for (const locale of SUPPORTED_LOCALES) {
        expect(source.purpose[locale].length).toBeGreaterThan(20);
      }
    }
  });
});
