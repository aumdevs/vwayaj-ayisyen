import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/config/brand";

export const alt = "Vwayaj Ayisyen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/brand/logo-white.png"));
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #122660 0%, #3157d9 58%, #f1c94a 100%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "48px",
        gap: "36px",
        width: "100%"
      }}
    >
      {/* ImageResponse renders the local raster directly; next/image is not supported here. */}
      <img
        alt="Vwayaj Ayisyen"
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={400}
        height={296}
        style={{ background: "white", borderRadius: 24, padding: 24, objectFit: "contain" }}
      />
      <div
        style={{
          background: "rgba(8, 19, 54, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderRadius: "38px",
          display: "flex",
          flexDirection: "column",
          gap: "26px",
          padding: "32px",
          width: "650px"
        }}
      >
        <div style={{ color: "#f7d86f", display: "flex", fontSize: 24, letterSpacing: 4 }}>
          VWAYAJAYISYEN.COM
        </div>
        <div style={{ display: "flex", fontSize: 55, fontWeight: 800, lineHeight: 1.02 }}>
          {BRAND.name}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.82)",
            display: "flex",
            fontSize: 27,
            lineHeight: 1.3,
            maxWidth: "900px"
          }}
        >
          Soti Ayiti ak yon plan klè pou viv, travay oswa etidye aletranje an 2026.
        </div>
        <div style={{ display: "flex", gap: "18px", marginTop: "8px" }}>
          {["Chili", "Brezil"].map((locale) => (
            <span
              key={locale}
              style={{
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.24)",
                borderRadius: "999px",
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                height: "52px",
                justifyContent: "center",
                width: "96px"
              }}
            >
              {locale}
            </span>
          ))}
        </div>
      </div>
    </div>,
    size
  );
}
