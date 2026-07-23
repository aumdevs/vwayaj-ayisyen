/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/[locale]/privacy-actions", () => ({
  submitPrivacyRequestAction: vi.fn(async () => ({ status: "idle" }))
}));

import { PrivacyRequestPanel } from "@/components/private/privacy-request-panel";
import type { PrivacyCenterData } from "@/types/privacy";

describe("privacy center acceptance artifacts", () => {
  it("links to the exact accepted version in its recorded official locale", () => {
    const data: PrivacyCenterData = {
      available: true,
      profile: {
        privacyAcceptedAt: "2026-07-23T14:00:00.123Z",
        privacyLocale: "es",
        privacyVersion: "privacy-2026-07-23-v1",
        termsAcceptedAt: "2026-07-23T14:00:00.123Z",
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
});
