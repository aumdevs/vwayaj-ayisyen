import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vwayaj Ayisyen",
    short_name: "Vwayaj",
    description: "Enfòmasyon estriktire pou kominote ayisyèn nan.",
    start_url: "/ht",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#0b1324",
    lang: "ht",
    orientation: "any",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
