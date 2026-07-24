import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

test("root selects Haitian Creole and renders the four countries", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ht$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Prepare pwochen etap");
  const cards = page.locator(".country-card");
  await expect(cards).toHaveCount(4);
  await expect(cards.locator(".country-card-title")).toHaveText([
    "Etazini",
    "Chili",
    "Brezil",
    "Meksik"
  ]);
});

test("desktop and mobile expose their intended navigation shells", async ({ page }, testInfo) => {
  await page.goto("/ht");
  const appBar = page.locator(".mobile-app-bar");
  const bottomNavigation = page.locator(".mobile-bottom-navigation");
  const desktopHeader = page.locator(".site-header");

  if (testInfo.project.name === "mobile") {
    await expect(appBar).toBeVisible();
    await expect(bottomNavigation).toBeVisible();
    await expect(desktopHeader).toBeHidden();
    await expect(bottomNavigation.getByRole("link")).toHaveCount(5);
    await expect(bottomNavigation.getByRole("link", { name: "Kont" })).toHaveAttribute(
      "href",
      "/ht/portal"
    );
    await page.getByRole("button", { name: "Plis" }).click();
    await expect(page.getByRole("dialog", { name: "Plis" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Konfidansyalite" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Kont mwen" })).toHaveAttribute(
      "href",
      "/ht/portal"
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Plis" })).toHaveCount(0);
  } else {
    await expect(desktopHeader).toBeVisible();
    await expect(appBar).toBeHidden();
    await expect(bottomNavigation).toBeHidden();
    await page.getByRole("button", { name: "Peyi yo" }).click();
    await expect(page.locator(".desktop-mega-menu")).toBeVisible();
    await expect(
      page.locator(".desktop-mega-menu").getByRole("link", { name: /Etazini/ })
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".desktop-mega-menu")).toHaveCount(0);
  }
});

test("touch tablet keeps the app shell in portrait and landscape", async ({
  browser
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One dedicated tablet matrix is sufficient.");

  for (const viewport of [
    { width: 768, height: 1024 },
    { width: 1024, height: 768 }
  ]) {
    const context = await browser.newContext({
      hasTouch: true,
      viewport,
      reducedMotion: "reduce"
    });
    const page = await context.newPage();
    await page.goto("/ht");
    await expect(page.locator(".mobile-app-bar")).toBeVisible();
    await expect(page.locator(".mobile-bottom-navigation")).toBeVisible();
    await expect(page.locator(".site-header")).toBeHidden();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
    await context.close();
  }
});

test("manifest exposes install assets and the controlled offline surface", async ({
  page,
  request
}) => {
  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBe(true);
  const manifestBody = (await manifest.json()) as {
    display?: string;
    shortcuts?: { short_name?: string; url?: string }[];
  };
  expect(manifestBody.display).toBe("standalone");
  expect(manifestBody.shortcuts).toContainEqual(
    expect.objectContaining({
      short_name: "Kont",
      url: "/ht/portal?source=pwa-shortcut"
    })
  );

  await page.goto("/offline");
  await expect(page.getByRole("heading", { name: "Ou pa konekte kounye a" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Eseye ankò" })).toBeVisible();
  await expect(page.locator("form[data-offline-retry]")).toHaveAttribute("action", "");
  await expect(page.getByRole("link", { name: /Gade kontni/ })).toHaveAttribute(
    "href",
    "/ht/guides"
  );
});

test("iPhone install guidance appears once per navigation session", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The mobile project emulates an iPhone.");

  await page.goto("/ht");
  const prompt = page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" });
  await expect(prompt).toBeVisible({ timeout: 6_000 });
  await prompt.getByRole("button", { name: "Enstale aplikasyon an" }).click();
  await expect(prompt.getByText("Peze bouton Pataje a.")).toBeVisible();
  await prompt.getByRole("button", { name: "Pa kounye a" }).click();
  await page.locator(".mobile-bottom-navigation").getByRole("link", { name: "Peyi" }).click();
  await expect(page).toHaveURL(/\/ht\/countries$/);
  await page.waitForTimeout(2_700);
  await expect(prompt).toHaveCount(0);
});

test("Android installation starts only after an explicit user action", async ({
  browser
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One Android install simulation is sufficient.");

  const context = await browser.newContext({
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36",
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  await page.goto("/ht");
  await page.evaluate(() => {
    const installEvent = new Event("beforeinstallprompt", { cancelable: true });
    Object.defineProperties(installEvent, {
      prompt: {
        value: async () => {
          document.documentElement.dataset.nativeInstallPrompt = "requested";
        }
      },
      userChoice: {
        value: Promise.resolve({ outcome: "accepted", platform: "web" })
      }
    });
    window.dispatchEvent(installEvent);
  });

  const prompt = page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" });
  await expect(prompt).toBeVisible({ timeout: 6_000 });
  await expect(page.locator("html")).not.toHaveAttribute("data-native-install-prompt", "requested");
  await prompt.getByRole("button", { name: "Enstale aplikasyon an" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-native-install-prompt", "requested");
  await expect(prompt).toHaveCount(0);
  await context.close();
});

test("installed standalone experience hides the install invitation", async ({
  browser
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One standalone simulation is sufficient.");

  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 }
  });
  await context.addInitScript(() => {
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      if (query === "(display-mode: standalone)") {
        return {
          addEventListener() {},
          addListener() {},
          dispatchEvent: () => false,
          matches: true,
          media: query,
          onchange: null,
          removeEventListener() {},
          removeListener() {}
        } as MediaQueryList;
      }
      return nativeMatchMedia(query);
    };
  });
  const page = await context.newPage();
  await page.goto("/ht");
  await expect(page.locator(".mobile-app-bar")).toBeVisible();
  await page.waitForTimeout(3_000);
  await expect(page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" })).toHaveCount(0);
  await context.close();
});

test("a waiting service worker updates only after an explicit action", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled-update check is sufficient.");

  await page.goto("/ht");
  await page.evaluate(() => {
    const registration = {
      waiting: {
        postMessage(message: { type?: string }) {
          document.documentElement.dataset.updateMessage = message.type ?? "";
        }
      }
    };
    window.dispatchEvent(
      new CustomEvent("vwayaj:sw-update", {
        detail: { registration }
      })
    );
  });
  await expect(page.getByText("Yon nouvo vèsyon disponib.")).toBeVisible();
  await page.getByRole("button", { name: "Mete ajou" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-update-message", "SKIP_WAITING");
});

test("a pending form blocks a service-worker update", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One form-protection check is sufficient.");

  await page.goto("/ht/auth/sign-in");
  await page.locator("#auth-email").fill("unfinished@example.com");
  await page.evaluate(() => {
    const registration = {
      waiting: {
        postMessage(message: { type?: string }) {
          document.documentElement.dataset.blockedUpdateMessage = message.type ?? "";
        }
      }
    };
    window.dispatchEvent(
      new CustomEvent("vwayaj:sw-update", {
        detail: { registration }
      })
    );
  });
  await page.getByRole("button", { name: "Mete ajou" }).click();
  await expect(page.getByText("Fini oswa anrejistre fòm ou anvan ou mete ajou.")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-blocked-update-message");
  await expect(page.locator("#auth-email")).toHaveValue("unfinished@example.com");
});

test("country pages show review status instead of invented claims", async ({ page }) => {
  await page.goto("/ht/countries/usa/legal-pathways");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Fason legal");
  await expect(page.getByText("Gid sa a ap pran fòm.")).toBeVisible();
  await expect(page.locator(".empty-state-premium")).toHaveCount(1);
});

test("official legal center publishes Spanish and Portuguese documents without private email", async ({
  page
}) => {
  const documents = [
    ["/es/legal/terms", "Términos de uso y servicio", "terms-2026-07-23-v1"],
    ["/es/legal/privacy", "Política de Privacidad", "privacy-2026-07-23-v1"],
    ["/pt/legal/cookies", "Política de Cookies", "cookies-2026-07-23-v1"]
  ] as const;

  for (const [path, heading, version] of documents) {
    await page.goto(`${path}?version=${version}`);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.getByText(version, { exact: true }).first()).toBeVisible();
    await expect(page.locator("body")).toContainText("legal@vwayajayisyen.com");
    const emailLinks = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks.every((href) => href?.toLowerCase().endsWith("@vwayajayisyen.com"))).toBe(
      true
    );
  }

  await page.goto("/ht/legal/terms?version=terms-2026-07-23-v1");
  await expect(page.locator(".page-hero-inner")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("link", { name: "Português" })).toHaveAttribute(
    "href",
    "/pt/legal/terms?version=terms-2026-07-23-v1"
  );

  for (const invalidVersion of ["terms-obsolete", "__proto__"]) {
    const missingVersion = await page.goto(`/es/legal/terms?version=${invalidVersion}`);
    expect(missingVersion?.status()).toBe(404);
  }
});

test("comparison accepts a safe selection without inventing scores", async ({ page }) => {
  await page.goto("/es/compare");
  await page.getByRole("checkbox", { name: /Estados Unidos/ }).check();
  await page.getByRole("checkbox", { name: /Chile/ }).check();
  await expect(page.getByText("La comparación detallada llegará pronto.")).toBeVisible();
  await expect(page.locator(".selection-count")).toContainText("02");
  await expect(page.locator(".selection-count")).toContainText("/ 04");
});

test("private routes redirect to sign in without a session", async ({ page }) => {
  await page.goto("/ht/admin");
  await expect(page).toHaveURL(/\/ht\/auth\/sign-in\?reason=required$/);
  await expect(page.getByRole("heading", { name: "Konekte" })).toBeVisible();
});

test("public registration renders the protected account form when launch gates are ready", async ({
  page
}) => {
  await page.goto("/ht/auth/sign-up");
  await expect(page.getByRole("heading", { name: "Kreye kont" })).toBeVisible();
  await expect(page.locator("#auth-email")).toBeVisible();
  await expect(page.locator("#auth-password")).toBeVisible();
  await expect(page.locator('input[name="accept_terms"]')).toBeVisible();
  await expect(page.locator('input[name="accept_privacy"]')).toBeVisible();
  await expect(page.locator('input[name="accept_age_capacity"]')).toBeVisible();
  await expect(page.locator('input[name="terms_version"]')).toHaveValue("terms-2026-07-23-v1");
  await expect(page.locator('input[name="privacy_version"]')).toHaveValue("privacy-2026-07-23-v1");
  await expect(page.getByRole("link", { name: "Kondisyon itilizasyon" })).toHaveAttribute(
    "href",
    "/ht/legal/terms?version=terms-2026-07-23-v1"
  );
  await expect(page.getByRole("link", { name: "Konfidansyalite" })).toHaveAttribute(
    "href",
    "/ht/legal/privacy?version=privacy-2026-07-23-v1"
  );
  await expect(page.getByText("terms-2026-07-23-v1")).toBeVisible();
  await expect(page.getByText("privacy-2026-07-23-v1")).toBeVisible();
  await expect(page.locator(".auth-turnstile")).toBeVisible();
  await expect(page.getByRole("button", { name: "Kreye kont" })).toBeEnabled({
    timeout: 20_000
  });
});

test("public registration crosses the live Auth hook and persists verified terms", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One live registration is enough per CI run.");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const privacyVersion = process.env.REGISTRATION_PRIVACY_VERSION;
  const termsVersion = process.env.REGISTRATION_TERMS_VERSION;
  expect(supabaseUrl).toBeTruthy();
  expect(serviceRoleKey).toBeTruthy();
  expect(privacyVersion).toBeTruthy();
  expect(termsVersion).toBeTruthy();

  const admin = createClient(supabaseUrl!, serviceRoleKey!, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const email = `registration-e2e-${randomUUID()}@example.com`;
  let userId: string | undefined;

  try {
    await page.goto("/ht/auth/sign-up");
    await page.locator("#auth-email").fill(email);
    await page.locator("#auth-password").fill("Secure-E2E-Password-2026!");
    await page.locator("#auth-accept-terms").check();
    await page.locator("#auth-accept-privacy").check();
    await page.locator("#auth-accept-age-capacity").check();
    await expect(page.getByRole("button", { name: "Kreye kont" })).toBeEnabled({
      timeout: 20_000
    });
    await page.getByRole("button", { name: "Kreye kont" }).click();
    await expect(page.getByRole("status")).toContainText("Verifye imèl ou");

    await expect
      .poll(async () => {
        const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 });
        if (error) throw error;
        userId = data.users.find((user) => user.email === email)?.id;
        return Boolean(userId);
      })
      .toBe(true);

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("terms_version, privacy_version, terms_accepted_at, privacy_accepted_at")
      .eq("id", userId!)
      .single();
    expect(profileError).toBeNull();
    expect(profile?.terms_version).toBe(termsVersion);
    expect(profile?.privacy_version).toBe(privacyVersion);
    expect(profile?.terms_accepted_at).toBeTruthy();
    expect(profile?.privacy_accepted_at).toBe(profile?.terms_accepted_at);
    expect(Number.isNaN(Date.parse(profile!.terms_accepted_at!))).toBe(false);

    const { data: consents, error: consentError } = await admin
      .from("consent_records")
      .select("consent_type, policy_version, locale, granted, evidence_hash, scope")
      .eq("user_id", userId!)
      .order("consent_type");
    expect(consentError).toBeNull();
    expect(consents).toEqual([
      expect.objectContaining({
        consent_type: "terms",
        evidence_hash: expect.any(String),
        granted: true,
        locale: "es",
        policy_version: termsVersion,
        scope: expect.objectContaining({
          age_capacity_mechanism: "signup_age_capacity_checkbox",
          age_capacity_confirmed_at: expect.any(String),
          document_hash: expect.stringMatching(/^[0-9a-f]{64}$/),
          document_hash_algorithm: "sha256",
          mechanism: "signup_terms_checkbox",
          provenance: "auth_hook_signed_v1",
          separate_acceptance: true
        })
      }),
      expect.objectContaining({
        consent_type: "privacy",
        evidence_hash: expect.any(String),
        granted: true,
        locale: "es",
        policy_version: privacyVersion,
        scope: expect.objectContaining({
          acceptance_kind: "acknowledgement",
          document_hash: expect.stringMatching(/^[0-9a-f]{64}$/),
          document_hash_algorithm: "sha256",
          mechanism: "signup_privacy_acknowledgement_checkbox",
          provenance: "auth_hook_signed_v1",
          separate_acceptance: true
        })
      })
    ]);
  } finally {
    if (userId) {
      const { error } = await admin.auth.admin.deleteUser(userId);
      expect(error).toBeNull();
    }
  }
});

test("mobile navigation traps focus and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ht");
  const trigger = page.getByRole("button", { name: "Plis" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Plis" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fèmen" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Plis" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("public experience no longer exposes audio controls", async ({ page }) => {
  await page.goto("/ht");
  await expect(page.locator("audio")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /koute|listen|écouter|ouvir/i })).toHaveCount(0);
});

test("public home has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/ht");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const blocking = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical"
  );
  expect(blocking).toEqual([]);
});

test("health endpoint is sanitized and not cached", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(response.headers()["cache-control"]).toBe("no-store");
  const body = (await response.json()) as Record<string, unknown>;
  expect(body.status).toBe("ok");
  expect(JSON.stringify(body)).not.toMatch(/secret|password|token/i);
});

test("security headers and risky API defaults fail closed", async ({ page, request }) => {
  const response = await page.goto("/ht");
  const csp = response?.headers()["content-security-policy"] ?? "";
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain("https://challenges.cloudflare.com");
  expect(csp).toContain("sha256-dMnbuGXRM5Y7/d67w8MZPydMv+XXsm0B9vkgAYOXC1I=");

  const ai = await request.post("/api/ai/chat", { data: { message: "test" } });
  expect(ai.status()).toBe(503);
  expect(await ai.json()).toMatchObject({ error: { code: "FEATURE_UNAVAILABLE" } });

  const invalidSearch = await request.get("/api/search?locale=ht&q=x");
  expect(invalidSearch.status()).toBe(400);
  const validSearch = await request.get("/api/search?locale=ht&q=travay");
  if (validSearch.status() === 503) {
    expect(await validSearch.json()).toMatchObject({ error: { code: "SERVICE_UNAVAILABLE" } });
  } else {
    expect(validSearch.ok()).toBe(true);
    expect(await validSearch.json()).toMatchObject({ items: expect.any(Array) });
  }
});
