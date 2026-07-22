import { describe, expect, it } from "vitest";
import {
  countries,
  countrySectionKeys,
  getCountry,
  getCountrySections,
  isCountryCode
} from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";

describe("country catalog", () => {
  it("contains exactly the four approved countries", () => {
    expect(countries.map(({ code }) => code)).toEqual(["usa", "chile", "brazil", "mexico"]);
    expect(new Set(countries.map(({ iso2 }) => iso2)).size).toBe(4);
  });

  it("does not accept arbitrary country slugs", () => {
    expect(isCountryCode("usa")).toBe(true);
    expect(isCountryCode("haiti")).toBe(false);
    expect(getCountry("brazil").iso2).toBe("BR");
  });

  it("fails explicitly when an impossible typed country reaches the lookup", () => {
    expect(() => getCountry("unknown" as "usa")).toThrow("Unknown country code");
  });

  it("renders every required section in a stable order", () => {
    const sections = getCountrySections(getDictionary("ht"));
    expect(sections.map(({ key }) => key)).toEqual(countrySectionKeys);
    expect(sections.every(({ label }) => label.length > 1)).toBe(true);
  });
});
