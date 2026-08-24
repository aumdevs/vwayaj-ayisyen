import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Vwayaj Ayisyen",
    short_name: "Vwayaj",
    description: "Sous ofisyèl sou viza, konsila ak lavi pratik pou kominote ayisyèn nan.",
    start_url: "/ht?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone"],
    background_color: "#f8f5ef",
    theme_color: "#07152e",
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
        name: "Gid Etazini",
        short_name: "Etazini",
        description: "Louvri sous ofisyèl pou Etazini.",
        url: "/ht/countries/usa?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Gid Chili",
        short_name: "Chili",
        description: "Louvri sous ofisyèl pou Chili.",
        url: "/ht/countries/chile?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Gid Brezil",
        short_name: "Brezil",
        description: "Louvri sous ofisyèl pou Brezil.",
        url: "/ht/countries/brazil?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Gid Meksik",
        short_name: "Meksik",
        description: "Louvri sous ofisyèl pou Meksik.",
        url: "/ht/countries/mexico?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
