import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes("mobile first visit")) {
    return;
  }
  await page.addInitScript(() => {
    window.localStorage.setItem("vwayaj-mobile-onboarding-v1", "done");
    window.localStorage.setItem("vwayaj-account-state", "guest");
    window.localStorage.setItem("vwayaj-pwa-installed", "true");
    window.sessionStorage.setItem("vwayaj-mobile-splash-v1", "shown");
  });
});

test("the agency home presents only Chile and Brazil", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ht$/);
  const logo = page.locator(
    testInfo.project.name === "mobile" ? ".mobile-app-logo" : ".brand-link .logo-symbol"
  );
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", /\/images\/brand\//);
  await expect(logo).toHaveJSProperty(
    "naturalWidth",
    testInfo.project.name === "mobile" ? 1024 : 640
  );
  if (testInfo.project.name === "mobile") {
    await expect(page.locator(".mobile-app-logo")).toHaveAttribute(
      "src",
      "/images/brand/logo-transparent.png"
    );
    await expect(page.locator(".mobile-app-airplane")).toBeVisible();
    await expect(page.locator(".mobile-agency-home")).toBeVisible();
    await expect(page.locator(".mobile-destination-card")).toHaveCount(2);
    await expect(page.locator(".mobile-home-destinations")).toContainText("Chili");
    await expect(page.locator(".mobile-home-destinations")).toContainText("Brezil");
    await expect(page.locator(".mobile-home-destinations")).toContainText("Santiago");
    await expect(page.locator(".mobile-home-destinations")).toContainText("Brasília");
    await expect(page.getByRole("link", { name: /Santiago/ })).toHaveAttribute(
      "href",
      "/ht/travel/chile"
    );
    await expect(page.locator(".mobile-home-hero")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1)
    ).toBe(true);
    await expect(page.locator('.mobile-bottom-navigation [data-nav-key="chile"]')).toHaveAttribute(
      "href",
      "/ht/countries/chile"
    );
    await page.getByRole("link", { name: /Santiago/ }).click();
    await expect(page).toHaveURL(/\/ht\/travel\/chile$/);
    await expect(page.locator(".mobile-app-title-plane")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Nan ki peyi ou ye kounye a?" })).toBeVisible();
  } else {
    await expect(
      page.getByRole("heading", { level: 1, name: "Ki kote ou vle ale?" })
    ).toBeVisible();
    await expect(page.locator(".desktop-destination-choice")).toHaveCount(2);
    await expect(page.locator(".desktop-agency-home")).not.toContainText(/Etazini|Meksik/);
  }
});

test("travel buttons select an origin before opening a tailored guide", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The guided journey begins in the mobile app.");
  await page.goto("/ht/travel/chile");
  await expect(page.getByRole("heading", { name: "Nan ki peyi ou ye kounye a?" })).toBeVisible();
  await expect(page.locator(".travel-residence-grid a")).toHaveCount(7);
  await page.getByRole("link", { name: /Ayiti/ }).click();
  await expect(page).toHaveURL(/\/ht\/travel\/chile\/from\/haiti$/, { timeout: 15_000 });
  await expect(
    page.getByRole("heading", { level: 1, name: "Ale Chili pandan wap viv Ayiti" })
  ).toBeVisible();
  await expect(page.locator(".travel-step-list > li")).toHaveCount(5);
});

test("mobile first visit follows splash, onboarding and guest access", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The entry flow exists only in the mobile app.");
  await page.goto("/ht");
  // The splash is intentionally brief, so assert the stable onboarding destination.
  const onboardingHeadings = [
    "Planifye pwojè w ak bon enfòmasyon.",
    "Prepare chak etap anvan ou pati.",
    "Jwenn èd lè ou bezwen li.",
    "Rete ajou san w pa pèdi tan."
  ];
  for (const [index, heading] of onboardingHeadings.entries()) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible({ timeout: 10_000 });
    await expect(page.locator(".mobile-onboarding-brand .logo-symbol")).toBeVisible();
    await expect(page.locator(".onboarding-visual img")).toBeVisible();
    await page
      .getByRole("button", {
        name: index === onboardingHeadings.length - 1 ? "Kòmanse" : "Kontinye"
      })
      .click();
  }
  await expect(page.getByRole("button", { name: "Kontinye kòm envite" })).toBeVisible();
  await page.getByRole("button", { name: "Kontinye kòm envite" }).click();
  await expect(page.locator(".mobile-agency-home")).toBeVisible();
});

test("each destination exposes practical guidance", async ({ page }, testInfo) => {
  for (const country of ["chile", "brazil"]) {
    await page.goto(`/ht/countries/${country}`);
    if (testInfo.project.name === "mobile") {
      await expect(page.locator(".mobile-country-experience")).toBeVisible();
      await expect(page.locator(".mobile-country-accordions details")).toHaveCount(9);
      await expect(page.locator(".desktop-country-experience")).toBeHidden();
    } else {
      await expect(page.locator(".guide-verdict")).toBeVisible();
      await expect(page.locator(".guide-pathway-grid article")).toHaveCount(5);
      await expect(page.locator(".official-source-grid-complete article")).toHaveCount(12);
    }
  }
});

test("removed destinations and private staff routes do not exist", async ({ request }) => {
  for (const path of [
    "/ht/countries/usa",
    "/ht/countries/mexico",
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
  expect((await request.get("/ht/auth/sign-in")).status()).toBe(200);
  expect((await request.get("/ht/auth/sign-up")).status()).toBe(200);
});

test("account features stay non-blocking and profile support pages remain public", async ({
  page
}) => {
  await page.goto("/ht/profile");
  await expect(page.getByText("Kreyasyon kont poko disponib")).toBeVisible();
  await expect(page.getByText("Espas pèsonèl ou ap vini byento.")).toBeVisible();
  await expect(page.locator(".mobile-profile-options button:disabled")).toHaveCount(3);

  await page.goto("/ht/auth/sign-in");
  await expect(page.getByText("Sèvis kont lan pa disponib pou kounye a")).toBeVisible();
  await expect(page.getByRole("button", { name: "Kontinye ak Google" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Kontinye san kont" })).toHaveAttribute(
    "href",
    "/ht"
  );
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/Firebase|konfigirasyon/i);
  await expect(page.getByRole("link", { name: "Retounen" })).toHaveAttribute("href", "/ht/profile");

  for (const path of ["faq", "saved", "contact"]) {
    await page.goto(`/ht/profile/${path}`);
    await expect(page.getByRole("link", { name: "Retounen nan pwofil" })).toHaveAttribute(
      "href",
      "/ht/profile"
    );
  }
});

test("news has a focused Chile and Brazil edition with ten visual stories", async ({ page }) => {
  await page.goto("/ht/news");
  await expect(
    page.getByRole("heading", { level: 1, name: "Dènye nouvèl sou Chili ak Brezil" })
  ).toBeVisible();
  await expect(page.locator(".news-card")).toHaveCount(10);
  await expect(page.locator(".news-card-image img")).toHaveCount(10);
});

test("non-Creole locale routes redirect to Haitian Creole", async ({ request }) => {
  const response = await request.get("/es/countries/chile", { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toContain("/ht/countries/chile");
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
    await expect(bottomNavigation).toContainText("Pwofil");
    await page.getByRole("button", { name: "Plis" }).click();
    const informationDialog = page.getByRole("dialog", { name: "Enfòmasyon itil" });
    await expect(informationDialog).toBeVisible();
    await expect(informationDialog.getByRole("link")).toHaveCount(4);
    await expect(informationDialog).not.toContainText(/Chili|Brezil|Nouvèl|Pwofil mwen/);
  } else {
    await expect(desktopHeader).toBeVisible();
    await expect(appBar).toBeHidden();
    await expect(bottomNavigation).toBeHidden();
    await expect(desktopHeader).not.toContainText("Konekte");
    await page.getByRole("button", { name: "Peyi yo" }).click();
    await expect(page.locator(".desktop-mega-menu")).toBeVisible();
    await expect(page.locator(".desktop-mega-menu").getByRole("link")).toHaveCount(3);
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
  expect(manifest.shortcuts).toHaveLength(3);
  expect(manifest.shortcuts?.map(({ short_name }) => short_name)).toEqual([
    "Chili",
    "Brezil",
    "Nouvèl"
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
  for (const path of ["/ht", "/ht/countries/chile", "/ht/countries/brazil", "/ht/news"]) {
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
  await page.addInitScript(() => {
    window.localStorage.setItem("vwayaj-mobile-onboarding-v1", "done");
    window.localStorage.setItem("vwayaj-account-state", "guest");
    window.sessionStorage.setItem("vwayaj-mobile-splash-v1", "shown");
  });
  await page.goto("/ht");
  await expect(page.locator("html")).toHaveAttribute("data-install-prompt-listener", "ready");
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
