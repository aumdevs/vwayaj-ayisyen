import { ImageResponse } from "next/og";
import { BRAND } from "@/config/brand";

export const alt = "Vwayaj Ayisyen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #122660 0%, #3157d9 58%, #f1c94a 100%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%"
      }}
    >
      <div
        style={{
          background: "rgba(8, 19, 54, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderRadius: "38px",
          display: "flex",
          flexDirection: "column",
          gap: "26px",
          padding: "64px",
          width: "100%"
        }}
      >
        <div style={{ color: "#f7d86f", display: "flex", fontSize: 24, letterSpacing: 4 }}>
          VWAYAJAYISYEN.COM
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02 }}>
          {BRAND.name}
        </div>
        <div style={{ display: "flex", gap: "18px", marginTop: "8px" }}>
          {["HT", "FR", "ES", "PT", "EN"].map((locale) => (
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
                width: "76px"
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
