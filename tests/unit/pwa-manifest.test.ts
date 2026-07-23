import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

function pngDimensions(path: string): { height: number; width: number } {
  const image = readFileSync(resolve(process.cwd(), "public", path.replace(/^\//, "")));
  expect(image.subarray(1, 4).toString()).toBe("PNG");
  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20)
  };
}

describe("PWA manifest", () => {
  const value = manifest();

  it("defines a scoped standalone application with the approved identity", () => {
    expect(value).toMatchObject({
      id: "/",
      name: "Vwayaj Ayisyen",
      short_name: "Vwayaj",
      start_url: "/ht?source=pwa",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      lang: "ht",
      dir: "ltr",
      orientation: "any"
    });
    expect(value.shortcuts).toHaveLength(4);
  });

  it("ships every required normal, maskable, monochrome and Apple icon size", () => {
    for (const size of [48, 72, 96, 128, 144, 152, 192, 384, 512]) {
      expect(pngDimensions(`/icons/icon-${size}.png`)).toEqual({ width: size, height: size });
    }
    expect(pngDimensions("/icons/apple-touch-icon-180.png")).toEqual({
      width: 180,
      height: 180
    });
    expect(pngDimensions("/icons/icon-maskable-192.png")).toEqual({
      width: 192,
      height: 192
    });
    expect(pngDimensions("/icons/icon-maskable-512.png")).toEqual({
      width: 512,
      height: 512
    });
    expect(pngDimensions("/icons/icon-monochrome-192.png")).toEqual({
      width: 192,
      height: 192
    });
    expect(pngDimensions("/icons/icon-monochrome-512.png")).toEqual({
      width: 512,
      height: 512
    });
    expect(
      readFileSync(resolve(process.cwd(), "public/icon-monochrome.svg"), "utf8")
    ).not.toContain('fill="#ffffff"');
  });

  it("references four real product screenshots with valid declared dimensions", () => {
    expect(value.screenshots).toHaveLength(4);
    for (const screenshot of value.screenshots ?? []) {
      expect(typeof screenshot.src).toBe("string");
      const source = screenshot.src as string;
      expect(existsSync(resolve(process.cwd(), "public", source.replace(/^\//, "")))).toBe(true);
      const [width, height] = String(screenshot.sizes).split("x").map(Number);
      expect(pngDimensions(source)).toEqual({ width, height });
    }
  });
});
