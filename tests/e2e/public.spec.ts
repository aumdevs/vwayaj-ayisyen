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
  await expect(page.getByRole("link", { name: "Kondisyon itilizasyon" })).toHaveAttribute(
    "href",
    "/ht/legal/terms"
  );
  await expect(page.getByRole("link", { name: "Konfidansyalite" })).toHaveAttribute(
    "href",
    "/ht/legal/privacy"
  );
  await expect(page.getByText("Vèsyon kondisyon yo:")).toContainText("ci-unpublished-v1");
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
  const termsVersion = process.env.REGISTRATION_TERMS_VERSION;
  expect(supabaseUrl).toBeTruthy();
  expect(serviceRoleKey).toBeTruthy();
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
      .select("terms_version, terms_accepted_at")
      .eq("id", userId!)
      .single();
    expect(profileError).toBeNull();
    expect(profile?.terms_version).toBe(termsVersion);
    expect(profile?.terms_accepted_at).toBeTruthy();
    expect(Number.isNaN(Date.parse(profile!.terms_accepted_at!))).toBe(false);
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
