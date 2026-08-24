import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("premium public visual system", () => {
  const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");

  it("defines the premium hero, destination and official-source surfaces", () => {
    for (const selector of [
      ".premium-hero",
      ".destination-mosaic",
      ".country-hero",
      ".official-source-grid > article",
      ".premium-method"
    ]) {
      expect(css).toContain(selector);
    }
    expect(css).toContain("linear-gradient");
    expect(css).toContain("box-shadow");
  });

  it("includes responsive and reduced-motion treatment", () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*720px\)/);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });
});
