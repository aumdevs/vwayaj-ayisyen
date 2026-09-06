import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

const asset = (path: string) => resolve(process.cwd(), "public", path);

describe("official globe brand assets", () => {
  it("provides a real transparent PNG and an opaque white alternative", async () => {
    for (const name of ["logo-transparent.png", "symbol-transparent.png"]) {
      const image = sharp(asset(`images/brand/${name}`));
      expect((await image.metadata()).hasAlpha).toBe(true);
      const stats = await image.stats();
      expect(stats.channels[3]?.min).toBe(0);
      expect(stats.channels[3]?.max).toBeGreaterThan(250);
    }
    const white = sharp(asset("images/brand/logo-white.png"));
    expect((await white.metadata()).hasAlpha).toBe(false);
    const pixel = await white.extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
    expect([...pixel]).toEqual([255, 255, 255]);
  });

  it("keeps maskable icons on white with a protected outer margin", async () => {
    const icon = sharp(asset("icons/icon-maskable-512.png"));
    const corner = await icon.extract({ left: 0, top: 0, width: 90, height: 90 }).raw().toBuffer();
    expect(corner.every((channel) => channel === 255)).toBe(true);
  });

  it("replaces legacy SVG icon geometry with self-contained official image exports", async () => {
    for (const file of ["icon.svg", "icon-maskable.svg", "icon-monochrome.svg"]) {
      const source = await readFile(asset(file), "utf8");
      expect(source).toContain("data:image/png;base64,");
      expect(source).not.toContain("<path");
    }
  });
});
