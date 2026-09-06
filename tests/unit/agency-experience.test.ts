import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { NEWS_ARTICLES, RESIDENCE_COUNTRIES, getConsularHelp } from "@/content/agency";
import { PROFILE_FAQ } from "@/content/profile-faq";
import { isFirebaseAccountsReady } from "@/lib/config/runtime";

describe("agency experience", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("offers the six known residence countries and an explicit fallback", () => {
    expect(RESIDENCE_COUNTRIES.map(({ code }) => code)).toEqual([
      "dominican-republic",
      "haiti",
      "mexico",
      "usa",
      "chile",
      "brazil",
      "other"
    ]);
  });

  it("routes Haiti to the destination embassy and other residences to a consular directory", () => {
    expect(getConsularHelp("chile", "haiti").url).toBe("https://www.chile.gob.cl/haiti/");
    expect(getConsularHelp("brazil", "haiti").url).toContain("embaixada-porto-principe");
    expect(getConsularHelp("chile", "mexico").title).toContain("Meksik");
  });

  it("publishes exactly ten substantial Haitian Creole news articles", () => {
    expect(NEWS_ARTICLES).toHaveLength(10);
    expect(new Set(NEWS_ARTICLES.map(({ slug }) => slug)).size).toBe(10);
    for (const article of NEWS_ARTICLES) {
      expect(article.paragraphs).toHaveLength(3);
      expect(article.sourceUrl).toMatch(/^https:\/\//);
      expect(article.image).toContain("/images/editorial/news-");
    }
    expect(new Set(NEWS_ARTICLES.map(({ image }) => image)).size).toBe(10);
  });

  it("publishes ten account help questions with answers", () => {
    expect(PROFILE_FAQ).toHaveLength(10);
    PROFILE_FAQ.forEach(({ answer, question }) => {
      expect(question.length).toBeGreaterThan(10);
      expect(answer.length).toBeGreaterThan(40);
    });
  });

  it("enables Google accounts only when public and admin Firebase projects match", () => {
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "firebase-browser-key-value");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "vwayaj.test.firebaseapp.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "vwayaj-test");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "vwayaj-test.firebasestorage.app");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_APP_ID", "1:123:web:firebase-test");
    vi.stubEnv("FIREBASE_ADMIN_PROJECT_ID", "another-project");
    vi.stubEnv("FIREBASE_ADMIN_CLIENT_EMAIL", "firebase-admin@example.com");
    vi.stubEnv("FIREBASE_ADMIN_PRIVATE_KEY", "TEST PRIVATE KEY - NOT A REAL CREDENTIAL");
    expect(isFirebaseAccountsReady()).toBe(false);
    vi.stubEnv("FIREBASE_ADMIN_PROJECT_ID", "vwayaj-test");
    vi.stubEnv("ACCOUNTS_ENABLED", "false");
    expect(isFirebaseAccountsReady()).toBe(false);
    vi.stubEnv("ACCOUNTS_ENABLED", "true");
    expect(isFirebaseAccountsReady()).toBe(true);
  });
});
