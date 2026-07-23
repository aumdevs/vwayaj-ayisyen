import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("mandatory light theme", () => {
  const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");
  function sourceText(directory: string): string {
    return readdirSync(resolve(process.cwd(), directory), { withFileTypes: true })
      .map((entry) => {
        const path = `${directory}/${entry.name}`;
        if (entry.isDirectory()) return sourceText(path);
        return /\.(?:css|ts|tsx)$/.test(entry.name)
          ? readFileSync(resolve(process.cwd(), path), "utf8")
          : "";
      })
      .join("\n");
  }

  it("does not contain a dark-mode selector or system dark-mode override", () => {
    expect(css).not.toMatch(/prefers-color-scheme:\s*dark/i);
    expect(css).not.toMatch(/(?:^|[\s,{])\.dark(?:[\s:{.#]|$)/m);
    expect(`${sourceText("src/app")}\n${sourceText("src/components")}`).not.toContain("dark:");
  });

  it("keeps the footer, authentication shell and staff navigation on light surfaces", () => {
    expect(css).toMatch(/\.site-footer\s*\{[\s\S]*?background:\s*var\(--warm-canvas\)/);
    expect(css).toMatch(/\.staff-sidebar\s*\{[\s\S]*?background:\s*var\(--surface\)/);
    expect(css).toMatch(/\.auth-experience\s*\{[\s\S]*?background:\s*var\(--surface\)/);
  });
});
