import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the public home presents all four reviewed destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ht$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Soti Ayiti");
  await expect(page.locator(".premium-hero-stats")).toContainText("48");
  await expect(page.locator(".country-card")).toHaveCount(4);
  await expect(page.locator(".country-card-title")).toHaveText([
    "Etazini",
    "Chili",
    "Brezil",
    "Meksik"
  ]);
});

test("each country guide exposes practical guidance and twelve official sources", async ({
  page
}) => {
  for (const country of ["usa", "chile", "brazil", "mexico"]) {
    await page.goto(`/ht/countries/${country}`);
    await expect(page.locator(".guide-verdict")).toBeVisible();
    await expect(page.locator(".guide-pathway-grid article")).toHaveCount(5);
    await expect(page.locator(".guide-preparation-steps li")).toHaveCount(5);
    await expect(page.locator(".guide-irregular-panel")).toBeVisible();
    await expect(page.locator(".guide-update-grid article")).toHaveCount(country === "usa" ? 3 : 2);
    await expect(page.locator(".official-source-grid-complete article")).toHaveCount(12);
    await expect(page.locator(".source-path-panel li")).toHaveCount(4);
    const links = page.locator(".official-source-grid-complete article a");
    await expect(links).toHaveCount(12);
    for (const href of await links.evaluateAll((items) =>
      items.map((item) => item.getAttribute("href"))
    )) {
      expect(href).toMatch(/^https:\/\//);
    }
  }
});

test("account, admin and private service routes no longer exist", async ({ request }) => {
  for (const path of [
    "/ht/auth/sign-in",
    "/ht/portal",
    "/ht/admin",
    "/ht/advisor",
    "/ht/professional",
    "/api/health",
    "/api/search",
    "/api/stripe/checkout"
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test("desktop and mobile navigation are public-only", async ({ page }, testInfo) => {
  await page.goto("/ht");
  const appBar = page.locator(".mobile-app-bar");
  const bottomNavigation = page.locator(".mobile-bottom-navigation");
  const desktopHeader = page.locator(".site-header");

  if (testInfo.project.name === "mobile") {
    await expect(appBar).toBeVisible();
    await expect(bottomNavigation).toBeVisible();
    await expect(desktopHeader).toBeHidden();
    await expect(bottomNavigation.getByRole("link")).toHaveCount(5);
    await expect(bottomNavigation).not.toContainText(/Kont mwen|Kont$/);
    await page.getByRole("button", { name: "Plis" }).click();
    await expect(page.getByRole("dialog", { name: "Plis" })).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Plis" })).not.toContainText("Kont mwen");
  } else {
    await expect(desktopHeader).toBeVisible();
    await expect(appBar).toBeHidden();
    await expect(bottomNavigation).toBeHidden();
    await expect(desktopHeader).not.toContainText("Konekte");
    await page.getByRole("button", { name: "Peyi yo" }).click();
    await expect(page.locator(".desktop-mega-menu")).toBeVisible();
    await expect(page.locator(".desktop-mega-menu").getByRole("link")).toHaveCount(5);
  }
});

test("the manifest is installable and contains only public shortcuts", async ({ request }) => {
  const response = await request.get("/manifest.webmanifest");
  expect(response.ok()).toBe(true);
  const manifest = (await response.json()) as {
    display?: string;
    shortcuts?: { short_name?: string; url?: string }[];
  };
  expect(manifest.display).toBe("standalone");
  expect(manifest.shortcuts).toHaveLength(4);
  expect(manifest.shortcuts?.map(({ short_name }) => short_name)).toEqual([
    "Etazini",
    "Chili",
    "Brezil",
    "Meksik"
  ]);
  expect(JSON.stringify(manifest.shortcuts)).not.toMatch(/portal|auth|account|kont mwen/i);
});

test("offline support remains useful", async ({ page }) => {
  await page.goto("/offline");
  await expect(page.getByRole("heading", { name: "Ou pa konekte kounye a" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Eseye ankò" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ale nan paj dakèy" })).toHaveAttribute(
    "href",
    "/ht"
  );
});

test("representative public pages pass accessibility checks", async ({ page }) => {
  for (const path of ["/ht", "/ht/countries", "/ht/countries/brazil", "/ht/faq"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, path).toEqual([]);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow, path).toBe(false);
  }
});

test("Android installation starts only after a user action", async ({ browser }, testInfo) => {
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
      userChoice: { value: Promise.resolve({ outcome: "accepted", platform: "web" }) }
    });
    window.dispatchEvent(installEvent);
  });
  const prompt = page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" });
  await expect(prompt).toBeVisible({ timeout: 6_000 });
  await expect(page.locator("html")).not.toHaveAttribute("data-native-install-prompt", "requested");
  await prompt.getByRole("button", { name: "Enstale aplikasyon an" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-native-install-prompt", "requested");
  await context.close();
});
