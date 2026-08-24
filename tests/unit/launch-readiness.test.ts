import { describe, expect, it } from "vitest";
import { isPromotablePublicPath, LAUNCH_READINESS } from "@/config/launch-readiness";

describe("promotion readiness", () => {
  it("publishes the four reviewed country guides", () => {
    expect(LAUNCH_READINESS.promotableCountries).toEqual(["usa", "chile", "brazil", "mexico"]);
    expect(isPromotablePublicPath("countries/usa", "ht")).toBe(true);
    expect(isPromotablePublicPath("countries/chile", "es")).toBe(true);
    expect(isPromotablePublicPath("countries/brazil", "pt")).toBe(true);
    expect(isPromotablePublicPath("countries/mexico", "fr")).toBe(true);
    expect(isPromotablePublicPath("compare", "ht")).toBe(false);
    expect(isPromotablePublicPath("portal", "ht")).toBe(false);
  });

  it("indexes legal documents only in their official locales", () => {
    expect(isPromotablePublicPath("legal/privacy", "es")).toBe(true);
    expect(isPromotablePublicPath("legal/privacy", "pt")).toBe(true);
    expect(isPromotablePublicPath("legal/privacy", "ht")).toBe(false);
    expect(isPromotablePublicPath("legal/ai", "es")).toBe(false);
    expect(isPromotablePublicPath("legal/community", "pt")).toBe(false);
    expect(isPromotablePublicPath("legal/editorial", "es")).toBe(false);
  });
});
