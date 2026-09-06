import { describe, expect, it } from "vitest";
import { RESIDENCE_COUNTRIES } from "@/content/agency";
import { getTravelGuide } from "@/content/travel-guides";

describe("origin-specific travel guides", () => {
  it("builds a distinct guide for every destination and residence option", () => {
    const guides = (["chile", "brazil"] as const).flatMap((destination) =>
      RESIDENCE_COUNTRIES.map(({ code }) => getTravelGuide(destination, code))
    );
    expect(guides).toHaveLength(14);
    expect(
      new Set(guides.map(({ destination, residence }) => `${destination}:${residence}`)).size
    ).toBe(14);
  });

  it("uses a deliberately limited path for countries without enough information", () => {
    const guide = getTravelGuide("chile", "other");
    expect(guide.limited).toBe(true);
    expect(guide.introduction).toContain("poko gen ase enfòmasyon");
    expect(guide.steps).toHaveLength(3);
    expect(guide.consularUrl).toMatch(/^https:\/\//);
  });

  it("changes the journey when the person already lives at the destination", () => {
    const guide = getTravelGuide("brazil", "brazil");
    expect(guide.title).toBe("Ou deja ap viv nan Brezil");
    expect(guide.steps.some(({ body }) => body.includes("pòtal migrasyon"))).toBe(true);
  });

  it("creates a friendly Haiti-to-Chile route with official actions", () => {
    const guide = getTravelGuide("chile", "haiti");
    expect(guide.title).toBe("Ale Chili pandan wap viv Ayiti");
    expect(guide.introduction).toContain("Zanmi");
    expect(guide.steps).toHaveLength(5);
    expect(guide.consularUrl).toBe("https://www.chile.gob.cl/haiti/");
  });
});
