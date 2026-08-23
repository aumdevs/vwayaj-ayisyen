import { describe, expect, it } from "vitest";
import { isPromotablePublicPath } from "@/config/launch-readiness";

describe("promotion readiness", () => {
  it("allows the pilot and hides unfinished product surfaces", () => {
    expect(isPromotablePublicPath("countries/usa", "ht")).toBe(true);
    expect(isPromotablePublicPath("compare", "ht")).toBe(false);
    expect(isPromotablePublicPath("countries/chile", "es")).toBe(false);
  });

  it("indexes legal documents only in their official locales", () => {
    expect(isPromotablePublicPath("legal/privacy", "es")).toBe(true);
    expect(isPromotablePublicPath("legal/privacy", "pt")).toBe(true);
    expect(isPromotablePublicPath("legal/privacy", "ht")).toBe(false);
  });
});
