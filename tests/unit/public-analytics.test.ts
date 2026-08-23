import { describe, expect, it } from "vitest";
import {
  isPublicAnalyticsEvent,
  localeFromAnalyticsPath,
  sanitizeAnalyticsPath
} from "@/lib/analytics/public-events";

describe("public analytics privacy boundary", () => {
  it("drops query strings and fragments", () => {
    expect(sanitizeAnalyticsPath("/ht/countries/usa?email=private@example.com#section")).toBe(
      "/ht/countries/usa"
    );
  });

  it("rejects paths without a supported locale or excessive length", () => {
    expect(sanitizeAnalyticsPath("/api/private")).toBeNull();
    expect(sanitizeAnalyticsPath(`/ht/${"x".repeat(181)}`)).toBeNull();
  });

  it("accepts only the fixed public event vocabulary", () => {
    expect(isPublicAnalyticsEvent("page_view")).toBe(true);
    expect(isPublicAnalyticsEvent("search:someone@example.com")).toBe(false);
  });

  it("derives locale only from a sanitized route", () => {
    expect(localeFromAnalyticsPath("/ht/countries/usa")).toBe("ht");
    expect(localeFromAnalyticsPath("/de/countries/usa")).toBeNull();
  });
});
