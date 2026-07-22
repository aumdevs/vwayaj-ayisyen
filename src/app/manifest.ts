import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vwayaj Ayisyen",
    short_name: "Vwayaj Ayisyen",
    description: "Enfòmasyon estriktire pou kominote ayisyèn nan.",
    start_url: "/ht",
    display: "standalone",
    background_color: "#fbfcfa",
    theme_color: "#0e4a3e",
    lang: "ht",
    orientation: "any",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
