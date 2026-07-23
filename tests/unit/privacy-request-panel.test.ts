/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/[locale]/privacy-actions", () => ({
  submitPrivacyRequestAction: vi.fn(async () => ({ status: "idle" }))
}));

import { PrivacyRequestPanel } from "@/components/private/privacy-request-panel";
import { portalMobileRoutes } from "@/lib/navigation/private";
import type { PrivacyCenterData } from "@/types/privacy";

describe("privacy center acceptance artifacts", () => {
  it("links to the exact accepted version in its recorded official locale", () => {
    const data: PrivacyCenterData = {
      available: true,
      profile: {
        privacyAcceptedAt: "2026-07-23T14:00:00.123Z",
        privacyLegacy: false,
        privacyLocale: "es",
        privacyVersion: "privacy-2026-07-23-v1",
        termsAcceptedAt: "2026-07-23T14:00:00.123Z",
        termsLegacy: false,
        termsLocale: "pt",
        termsVersion: "terms-2026-07-23-v1"
      },
      requests: []
    };

    render(
      createElement(PrivacyRequestPanel, {
        data,
        legalEmail: "legal@vwayajayisyen.com",
        locale: "ht"
      })
    );

    expect(screen.getByRole("link", { name: /Kondisyon/ })).toHaveAttribute(
      "href",
      "/pt/legal/terms?version=terms-2026-07-23-v1"
    );
    expect(screen.getByRole("link", { name: /Konfidansyalite/ })).toHaveAttribute(
      "href",
      "/es/legal/privacy?version=privacy-2026-07-23-v1"
    );
  });

  it("shows verified legacy profile evidence without inventing an accepted locale", () => {
    const data: PrivacyCenterData = {
      available: true,
      profile: {
        privacyAcceptedAt: null,
        privacyLegacy: false,
        privacyLocale: null,
        privacyVersion: null,
        termsAcceptedAt: "2026-07-22T14:00:00.123Z",
        termsLegacy: true,
        termsLocale: null,
        termsVersion: "terms-legacy-v1"
      },
      requests: []
    };

    render(
      createElement(PrivacyRequestPanel, {
        data,
        legalEmail: "legal@vwayajayisyen.com",
        locale: "es"
      })
    );

    expect(screen.getByText("terms-legacy-v1")).toBeVisible();
    expect(screen.getByText(/registro verificado anterior/)).toBeVisible();
    expect(screen.queryByRole("link", { name: /Términos/ })).not.toBeInTheDocument();
  });
});

describe("privacy center navigation", () => {
  it("keeps the privacy center discoverable in the mobile portal navigation", () => {
    expect(portalMobileRoutes).toHaveLength(5);
    expect(portalMobileRoutes).toContainEqual({
      label: "Konfidansyalite",
      path: "privacy"
    });
  });
});
