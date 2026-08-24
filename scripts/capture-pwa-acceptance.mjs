import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3000";
const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const manifestOnly = process.env.PWA_MANIFEST_ONLY === "true";
const outputRoot = resolve(
  process.cwd(),
  process.env.PWA_VISUAL_OUTPUT_ROOT ?? "docs/screenshots/pwa-acceptance"
);
const manifestRoot = resolve(process.cwd(), "public/screenshots/pwa");
const installSessionKey = "vwayaj-install-prompt-shown";
const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };
const tabletPortrait = { width: 768, height: 1024 };
const tabletLandscape = { width: 1024, height: 768 };
const androidUserAgent =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36";
const iphoneUserAgent =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";
const ipadUserAgent =
  "Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

const scenarios = [
  { group: "desktop", name: "home", path: "/ht", viewport: desktop, fullPage: true },
  {
    action: async (page) => page.getByRole("button", { name: "Peyi yo" }).click(),
    group: "desktop",
    name: "mega-menu-countries",
    path: "/ht",
    viewport: desktop
  },
  { group: "desktop", name: "countries", path: "/ht/countries", viewport: desktop, fullPage: true },
  {
    group: "desktop",
    name: "country",
    path: "/ht/countries/usa",
    viewport: desktop,
    fullPage: true
  },
  {
    group: "desktop",
    name: "chile",
    path: "/ht/countries/chile",
    viewport: desktop,
    fullPage: true
  },
  {
    group: "desktop",
    name: "brazil",
    path: "/ht/countries/brazil",
    viewport: desktop,
    fullPage: true
  },
  {
    group: "desktop",
    name: "mexico",
    path: "/ht/countries/mexico",
    viewport: desktop,
    fullPage: true
  },
  { group: "desktop", name: "contact", path: "/ht/contact", viewport: desktop, fullPage: true },
  {
    group: "desktop",
    name: "legal",
    path: "/es/legal/privacy",
    viewport: desktop,
    fullPage: true
  },
  {
    group: "desktop",
    name: "footer",
    path: "/ht",
    viewport: desktop,
    locator: ".site-footer"
  },
  {
    group: "mobile",
    name: "home-app",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    action: async (page) => page.getByRole("button", { name: "Plis" }).click(),
    group: "mobile",
    name: "more-menu",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    group: "mobile",
    name: "countries",
    path: "/ht/countries",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent,
    fullPage: true
  },
  {
    group: "mobile",
    name: "country",
    path: "/ht/countries/usa",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent,
    fullPage: true
  },
  {
    action: dispatchAndroidInstall,
    allowInstallPrompt: true,
    group: "mobile",
    name: "install-android",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: androidUserAgent
  },
  {
    action: async (page) => {
      const prompt = page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" });
      await prompt.waitFor({ state: "visible", timeout: 6_000 });
      await prompt.getByRole("button", { name: "Enstale aplikasyon an" }).click();
    },
    allowInstallPrompt: true,
    group: "mobile",
    name: "install-ios-instructions",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    group: "mobile",
    name: "offline",
    path: "/offline",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    action: dispatchWaitingServiceWorker,
    group: "mobile",
    name: "update",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    group: "tablet",
    name: "home-portrait",
    path: "/ht",
    viewport: tabletPortrait,
    touch: true,
    userAgent: ipadUserAgent
  },
  {
    group: "tablet",
    name: "home-landscape",
    path: "/ht",
    viewport: tabletLandscape,
    touch: true,
    userAgent: ipadUserAgent
  },
  {
    group: "tablet",
    name: "country-master-detail",
    path: "/ht/countries/usa",
    viewport: tabletPortrait,
    touch: true,
    userAgent: ipadUserAgent,
    fullPage: true
  },
  {
    action: async (page) => {
      const prompt = page.getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" });
      await prompt.waitFor({ state: "visible", timeout: 6_000 });
    },
    allowInstallPrompt: true,
    group: "tablet",
    name: "install",
    path: "/ht",
    viewport: tabletPortrait,
    touch: true,
    userAgent: ipadUserAgent
  }
];

const manifestScreenshots = [
  {
    file: "home-mobile.png",
    path: "/ht",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    file: "country-mobile.png",
    path: "/ht/countries/usa",
    viewport: mobile,
    touch: true,
    userAgent: iphoneUserAgent
  },
  {
    file: "home-tablet.png",
    path: "/ht",
    viewport: tabletLandscape,
    touch: true,
    userAgent: ipadUserAgent
  }
];

await mkdir(outputRoot, { recursive: true });
await mkdir(manifestRoot, { recursive: true });
const browser = await chromium.launch();
const findings = [];
const manifestFindings = [];
const isLocalDevelopment = /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(baseUrl);

function isKnownDevelopmentCspNoise(message) {
  return (
    isLocalDevelopment &&
    message.includes("Content Security Policy") &&
    message.includes("inline style")
  );
}

async function dispatchAndroidInstall(page) {
  await page.evaluate(() => {
    const installEvent = new Event("beforeinstallprompt", { cancelable: true });
    Object.defineProperties(installEvent, {
      prompt: { value: async () => undefined },
      userChoice: {
        value: Promise.resolve({ outcome: "accepted", platform: "web" })
      }
    });
    window.dispatchEvent(installEvent);
  });
  await page
    .getByRole("dialog", { name: "Enstale Vwayaj Ayisyen" })
    .waitFor({ state: "visible", timeout: 6_000 });
}

async function dispatchWaitingServiceWorker(page) {
  await page.evaluate(() => {
    const registration = { waiting: { postMessage() {} } };
    window.dispatchEvent(new CustomEvent("vwayaj:sw-update", { detail: { registration } }));
  });
  await page.getByText("Yon nouvo vèsyon disponib.").waitFor({ state: "visible" });
}

async function createPage(options) {
  const context = await browser.newContext({
    colorScheme: "light",
    deviceScaleFactor: 1,
    extraHTTPHeaders: protectionBypass
      ? {
          "x-vercel-protection-bypass": protectionBypass,
          "x-vercel-set-bypass-cookie": "true"
        }
      : undefined,
    hasTouch: options.touch ?? false,
    reducedMotion: "reduce",
    userAgent: options.userAgent,
    viewport: options.viewport
  });
  if (!options.allowInstallPrompt) {
    await context.addInitScript(
      (key) => window.sessionStorage.setItem(key, "true"),
      installSessionKey
    );
  }
  const page = await context.newPage();
  return { context, page };
}

function observeErrors(page) {
  const browserErrors = [];
  let ignoredDevelopmentCspMessages = 0;
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (isKnownDevelopmentCspNoise(message.text())) {
      ignoredDevelopmentCspMessages += 1;
      return;
    }
    browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));
  return {
    browserErrors,
    getIgnoredDevelopmentCspMessages: () => ignoredDevelopmentCspMessages
  };
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise((done) => {
              image.addEventListener("load", done, { once: true });
              image.addEventListener("error", done, { once: true });
            })
        )
    );
  });
  await page.waitForTimeout(180);
}

for (const scenario of manifestOnly ? [] : scenarios) {
  const { context, page } = await createPage(scenario);
  const errors = observeErrors(page);
  const response = await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "networkidle" });
  await settle(page);
  if (scenario.action) {
    await scenario.action(page);
    await page.waitForTimeout(120);
  }
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    pathname: window.location.pathname,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title
  }));
  const directory = resolve(outputRoot, scenario.group);
  await mkdir(directory, { recursive: true });
  const screenshotPath = resolve(directory, `${scenario.name}.png`);
  if (scenario.locator) {
    await page
      .locator(scenario.locator)
      .screenshot({ animations: "disabled", path: screenshotPath });
  } else {
    await page.screenshot({
      animations: "disabled",
      fullPage: scenario.fullPage ?? false,
      path: screenshotPath
    });
  }
  findings.push({
    browserErrors: errors.browserErrors,
    finalPath: metrics.pathname,
    group: scenario.group,
    horizontalOverflow: metrics.scrollWidth > metrics.clientWidth,
    ignoredDevelopmentCspMessages: errors.getIgnoredDevelopmentCspMessages(),
    name: scenario.name,
    path: scenario.path,
    status: response?.status() ?? null,
    title: metrics.title,
    viewport: `${scenario.viewport.width}x${scenario.viewport.height}`
  });
  await context.close();
}

for (const screenshot of manifestScreenshots) {
  const { context, page } = await createPage(screenshot);
  const errors = observeErrors(page);
  const response = await page.goto(`${baseUrl}${screenshot.path}`, { waitUntil: "networkidle" });
  await settle(page);
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    pathname: window.location.pathname,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title
  }));
  await page.screenshot({
    animations: "disabled",
    fullPage: false,
    path: resolve(manifestRoot, screenshot.file)
  });
  manifestFindings.push({
    browserErrors: errors.browserErrors,
    finalPath: metrics.pathname,
    group: "manifest",
    horizontalOverflow: metrics.scrollWidth > metrics.clientWidth,
    ignoredDevelopmentCspMessages: errors.getIgnoredDevelopmentCspMessages(),
    name: screenshot.file,
    path: screenshot.path,
    status: response?.status() ?? null,
    title: metrics.title,
    viewport: `${screenshot.viewport.width}x${screenshot.viewport.height}`
  });
  await context.close();
}

await browser.close();
const allFindings = [...findings, ...manifestFindings];
const failures = allFindings.filter(
  ({ browserErrors, horizontalOverflow, status }) =>
    browserErrors.length > 0 || horizontalOverflow || (status !== null && status >= 400)
);
const report = {
  captures: allFindings.length,
  failureCount: failures.length,
  failures,
  findings: allFindings,
  manifestScreenshots: manifestScreenshots.map(({ file, viewport }) => ({
    file,
    viewport: `${viewport.width}x${viewport.height}`
  }))
};
if (!manifestOnly) {
  await writeFile(resolve(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
}
process.stdout.write(
  `${JSON.stringify({ captures: allFindings.length, failureCount: failures.length, failures }, null, 2)}\n`
);
if (failures.length > 0) process.exitCode = 1;
