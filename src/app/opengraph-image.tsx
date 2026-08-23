import { ImageResponse } from "next/og";
import { BRAND } from "@/config/brand";

export const alt = "Vwayaj Ayisyen — sous ofisyèl pou kominote ayisyèn nan";
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
          SOUS OFISYÈL · LIMIT VIZIB
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02 }}>
          {BRAND.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, lineHeight: 1.35, maxWidth: 900 }}>
          Prepare pwochen etap ou, san fo pwomès.
        </div>
      </div>
    </div>,
    size
  );
}
