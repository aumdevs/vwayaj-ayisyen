/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/[locale]/privacy-actions", () => ({
  submitPrivacyRequestAction: vi.fn(async () => ({ status: "idle" }))
}));
vi.mock("@/app/[locale]/privacy-admin-actions", () => ({
  completePrivacyRequestAction: vi.fn(async () => ({ status: "idle" }))
}));

import { PrivacyAdminQueue } from "@/components/private/privacy-admin-queue";
import { PrivacyRequestPanel } from "@/components/private/privacy-request-panel";
import { portalMobileRoutes, privateAreas } from "@/lib/navigation/private";
import type { PrivacyAdminQueueData, PrivacyCenterData } from "@/types/privacy";

const action = vi.fn(async () => ({ status: "idle" as const }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

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
        action,
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
        action,
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
    expect(privateAreas.admin.routes).toContainEqual({
      label: "Demann konfidansyalite",
      path: "privacy-requests"
    });
  });
});

describe("privacy administrator queue", () => {
  it("renders the submitted request details in the privileged queue", () => {
    const data: PrivacyAdminQueueData = {
      available: true,
      requests: [
        {
          createdAt: "2026-07-23T23:59:59.000Z",
          description: "Corrige mi apellido de Dupond a Dupont.",
          id: "00000000-0000-4000-8000-000000000124",
          locale: "pt",
          requestType: "access",
          status: "received",
          updatedAt: "2026-07-23T23:59:59.000Z",
          userId: "00000000-0000-4000-8000-000000000123"
        }
      ]
    };

    render(
      createElement(PrivacyAdminQueue, {
        action,
        data,
        legalEmail: "legal@vwayajayisyen.com",
        locale: "es"
      })
    );

    expect(screen.getByRole("table", { name: "Solicitudes de privacidad abiertas" })).toBeVisible();
    expect(screen.getByText("Acceso")).toBeVisible();
    expect(screen.getByText("Recibida · pt")).toBeVisible();
    expect(screen.queryByText("access")).not.toBeInTheDocument();
    expect(screen.queryByText("received · pt")).not.toBeInTheDocument();
    expect(screen.getByText("Corrige mi apellido de Dupond a Dupont.")).toBeVisible();
    expect(screen.getByText("00000000-0000-4000-8000-000000000124")).toBeVisible();
    expect(screen.getByLabelText("Método de verificación")).toBeVisible();
    expect(screen.getByLabelText("Resolución y fundamento de la decisión")).toBeVisible();
    expect(screen.getByRole("button", { name: "Cerrar solicitud" })).toBeVisible();
    expect(screen.getByRole("link", { name: "legal@vwayajayisyen.com" })).toHaveAttribute(
      "href",
      "mailto:legal@vwayajayisyen.com"
    );
  });

  it("uses Haitian Creole labels for request and status enums on the default admin route", () => {
    const data: PrivacyAdminQueueData = {
      available: true,
      requests: [
        {
          createdAt: "2026-07-23T23:59:59.000Z",
          description: null,
          id: "00000000-0000-4000-8000-000000000124",
          locale: "pt",
          requestType: "access",
          status: "received",
          updatedAt: "2026-07-23T23:59:59.000Z",
          userId: "00000000-0000-4000-8000-000000000123"
        }
      ]
    };

    render(
      createElement(PrivacyAdminQueue, {
        action,
        data,
        legalEmail: "legal@vwayajayisyen.com",
        locale: "ht"
      })
    );

    expect(screen.getByText("Aksè")).toBeVisible();
    expect(screen.getByText("Resevwa · pt")).toBeVisible();
    expect(screen.getByText("Pa gen detay anplis.")).toBeVisible();
  });
});
