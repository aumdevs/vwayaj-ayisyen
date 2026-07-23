import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

test("public registration stays closed until email delivery and anti-abuse are ready", async ({
  page
}) => {
  await page.goto("/ht/auth/sign-up");
  await expect(page.getByRole("heading", { name: "Kreye kont" })).toBeVisible();
  await expect(page.getByText(/kenbe fonksyon an fèmen/)).toBeVisible();
  await expect(page.getByLabel("Imèl")).toHaveCount(0);
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
