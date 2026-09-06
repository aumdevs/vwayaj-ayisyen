import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

// Export web and OS sizes from the approved background-extracted master.
const root = process.cwd();
const brandDir = resolve(root, "public/images/brand");
const iconDir = resolve(root, "public/icons");
await mkdir(brandDir, { recursive: true });
await mkdir(iconDir, { recursive: true });
const master = resolve(brandDir, "logo-master.png");
const full = await sharp(master)
  .extract({ left: 108, top: 22, width: 1315, height: 973 })
  .resize(1024)
  .png()
  .toBuffer();
const symbol = await sharp(master)
  .extract({ left: 300, top: 22, width: 1090, height: 768 })
  .resize(640)
  .png()
  .toBuffer();
await sharp(full).toFile(resolve(brandDir, "logo-transparent.png"));
await sharp(full).flatten({ background: "#ffffff" }).toFile(resolve(brandDir, "logo-white.png"));
await sharp(symbol).toFile(resolve(brandDir, "symbol-transparent.png"));

async function icon(size, padding = 0.09, monochrome = false) {
  const contentSize = Math.round(size * (1 - padding * 2));
  let source = symbol;
  if (monochrome) {
    const { data, info } = await sharp(symbol)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    // OS notification icons use an alpha-only silhouette, not a colored tile.
    for (let offset = 0; offset < data.length; offset += info.channels) {
      const isBlue = data[offset + 2] - data[offset] > 35;
      data[offset + 3] = isBlue ? data[offset + 3] : 0;
      data[offset] = 0;
      data[offset + 1] = 0;
      data[offset + 2] = 0;
    }
    source = await sharp(data, { raw: info }).png().toBuffer();
  }
  return sharp(source)
    .resize(contentSize, contentSize, { fit: "contain", background: "#ffffff00" })
    .extend({
      top: Math.floor((size - contentSize) / 2),
      bottom: Math.ceil((size - contentSize) / 2),
      left: Math.floor((size - contentSize) / 2),
      right: Math.ceil((size - contentSize) / 2),
      background: "#ffffff00"
    })
    .png()
    .toBuffer();
}

for (const size of [32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512]) {
  const data = await icon(size);
  await sharp(data)
    .flatten({ background: "#ffffff" })
    .toFile(resolve(iconDir, `icon-${size}.png`));
}
await sharp(await icon(180))
  .flatten({ background: "#ffffff" })
  .toFile(resolve(iconDir, "apple-touch-icon-180.png"));
for (const size of [192, 512]) {
  await sharp(await icon(size, 0.2))
    .flatten({ background: "#ffffff" })
    .toFile(resolve(iconDir, `icon-maskable-${size}.png`));
  await writeFile(resolve(iconDir, `icon-monochrome-${size}.png`), await icon(size, 0.09, true));
}
for (const [name, filename] of [
  ["icon", "icon-512.png"],
  ["icon-maskable", "icon-maskable-512.png"],
  ["icon-monochrome", "icon-monochrome-512.png"]
]) {
  const encoded = (await readFile(resolve(iconDir, filename))).toString("base64");
  // Self-contained compatibility URLs preserve the official raster geometry.
  await writeFile(
    resolve(root, `public/${name}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,${encoded}"/></svg>\n`
  );
}
console.log("Exported official logo variants and application icons.");
