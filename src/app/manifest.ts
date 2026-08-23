import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Vwayaj Ayisyen",
    short_name: "Vwayaj",
    description: "Enfòmasyon estriktire pou kominote ayisyèn nan.",
    start_url: "/ht?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone"],
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "ht",
    dir: "ltr",
    orientation: "any",
    categories: ["education", "travel", "utilities"],
    icons: [
      { src: "/icons/icon-48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/icons/icon-72.png", sizes: "72x72", type: "image/png", purpose: "any" },
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/icons/icon-128.png", sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/icons/icon-144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/icons/icon-152.png", sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-monochrome-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "monochrome"
      },
      {
        src: "/icons/icon-monochrome-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "monochrome"
      }
    ],
    screenshots: [
      {
        src: "/screenshots/pwa/home-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Akèy Vwayaj Ayisyen"
      },
      {
        src: "/screenshots/pwa/country-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Paj peyi"
      },
      {
        src: "/screenshots/pwa/home-tablet.png",
        sizes: "1024x768",
        type: "image/png",
        form_factor: "wide",
        label: "Akèy sou tablèt"
      }
    ],
    shortcuts: [
      {
        name: "Sous ofisyèl Etazini",
        short_name: "Sous USA",
        description: "Louvri anyè sous ofisyèl peyi pilòt la.",
        url: "/ht/countries/usa?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Kontakte ekip la",
        short_name: "Kontak",
        description: "Louvri chanèl ofisyèl ekip la.",
        url: "/ht/contact?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Kont mwen",
        short_name: "Kont",
        description: "Louvri aksè kont lan.",
        url: "/ht/portal?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
