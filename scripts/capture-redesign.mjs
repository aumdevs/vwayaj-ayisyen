import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3000";
const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const outputRoot = resolve(
  process.cwd(),
  process.env.VISUAL_OUTPUT_ROOT ?? "docs/screenshots/redesign/after"
);
const routes = {
  home: "/ht",
  countries: "/ht/countries",
  country: "/ht/countries/usa",
  compare: "/ht/compare",
  assessment: "/ht/find-my-country",
  services: "/ht/services",
  guides: "/ht/guides",
  login: "/ht/auth/sign-in",
  "not-found": "/ht/page-that-does-not-exist"
};
const targetViewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};
const matrixViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1728, height: 1117 }
];

await mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch();
const findings = [];
const isLocalDevelopment = /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(baseUrl);

function isKnownDevelopmentCspNoise(message) {
  return (
    isLocalDevelopment &&
    message.includes("Content Security Policy") &&
    message.includes("inline style")
  );
}

async function capture(name, path, viewport, group) {
  const touch =
    group === "mobile" || (group === "matrix" && viewport.width >= 768 && viewport.width <= 1024);
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    hasTouch: touch,
    reducedMotion: "reduce",
    colorScheme: "light",
    extraHTTPHeaders: protectionBypass
      ? {
          "x-vercel-protection-bypass": protectionBypass,
          "x-vercel-set-bypass-cookie": "true"
        }
      : undefined
  });
  const page = await context.newPage();
  const browserErrors = [];
  let ignoredDevelopmentCspMessages = 0;
  let ignoredExpectedNotFoundMessages = 0;
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (isKnownDevelopmentCspNoise(message.text())) {
      ignoredDevelopmentCspMessages += 1;
      return;
    }
    if (
      path === routes["not-found"] &&
      message.text().includes("Failed to load resource") &&
      message.text().includes("404")
    ) {
      ignoredExpectedNotFoundMessages += 1;
      return;
    }
    browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
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
    document.querySelectorAll("details[open]").forEach((item) => item.removeAttribute("open"));
  });
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    title: document.title
  }));
  const directory = resolve(outputRoot, group);
  await mkdir(directory, { recursive: true });
  await page.screenshot({
    animations: "disabled",
    fullPage: true,
    path: resolve(directory, `${name}.png`)
  });
  findings.push({
    name,
    path,
    viewport: `${viewport.width}x${viewport.height}`,
    status: response?.status() ?? null,
    title: metrics.title,
    ignoredDevelopmentCspMessages,
    ignoredExpectedNotFoundMessages,
    horizontalOverflow: metrics.scrollWidth > metrics.clientWidth,
    browserErrors
  });
  await context.close();
}

for (const [group, viewport] of Object.entries(targetViewports)) {
  for (const [name, path] of Object.entries(routes)) {
    await capture(name, path, viewport, group);
  }
}

for (const viewport of matrixViewports) {
  await capture(`home-${viewport.width}x${viewport.height}`, routes.home, viewport, "matrix");
}

await browser.close();
const failures = findings.filter(
  ({ horizontalOverflow, browserErrors }) => horizontalOverflow || browserErrors.length > 0
);
const report = { captures: findings.length, failures, findings };
await writeFile(resolve(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(
  `${JSON.stringify({ captures: findings.length, failureCount: failures.length, failures }, null, 2)}\n`
);
if (failures.length > 0) process.exitCode = 1;
