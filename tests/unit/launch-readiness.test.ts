import { describe, expect, it } from "vitest";
import { isPromotablePublicPath, LAUNCH_READINESS } from "@/config/launch-readiness";

describe("promotion readiness", () => {
  it("publishes only the two agency destinations", () => {
    expect(LAUNCH_READINESS.promotableCountries).toEqual(["chile", "brazil"]);
    expect(isPromotablePublicPath("countries/usa", "ht")).toBe(false);
    expect(isPromotablePublicPath("countries/chile", "ht")).toBe(true);
    expect(isPromotablePublicPath("countries/brazil", "ht")).toBe(true);
    expect(isPromotablePublicPath("countries/mexico", "ht")).toBe(false);
    expect(isPromotablePublicPath("news", "ht")).toBe(true);
    expect(isPromotablePublicPath("compare", "ht")).toBe(false);
    expect(isPromotablePublicPath("portal", "ht")).toBe(false);
  });

  it("indexes legal documents only in Haitian Creole", () => {
    expect(isPromotablePublicPath("legal/privacy", "es")).toBe(false);
    expect(isPromotablePublicPath("legal/privacy", "pt")).toBe(false);
    expect(isPromotablePublicPath("legal/privacy", "ht")).toBe(true);
    expect(isPromotablePublicPath("legal/security", "ht")).toBe(true);
    expect(isPromotablePublicPath("legal/payments", "ht")).toBe(true);
    expect(isPromotablePublicPath("legal/ai", "es")).toBe(false);
    expect(isPromotablePublicPath("legal/community", "pt")).toBe(false);
    expect(isPromotablePublicPath("legal/editorial", "es")).toBe(false);
  });
});
