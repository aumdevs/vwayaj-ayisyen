import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

test("root selects Haitian Creole and renders the four countries", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ht$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Prepare pwochen etap");
  for (const country of ["Etazini", "Chili", "Brezil", "Meksik"]) {
    await expect(page.getByRole("link", { name: country, exact: true })).toBeVisible();
  }
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
  const trigger = page.getByRole("button", { name: "Meni" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Meni" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fèmen" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Meni" })).toHaveCount(0);
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
