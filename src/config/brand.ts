import type { CountryCode, Locale } from "@/types/domain";

export const BRAND = {
  name: "Vwayaj Ayisyen",
  shortName: "Vwayaj Ayisyen",
  organizationName: "Vwayaj Ayisyen",
  siteUrl: "https://vwayajayisyen.com",
  logoLabel: "Vwayaj Ayisyen",
  contact: {
    email: null,
    phone: null,
    whatsapp: null
  },
  social: {},
  editorialImages: {
    hero: "/images/editorial/hero-community.png",
    countries: {
      usa: "/images/editorial/country-usa.png",
      chile: "/images/editorial/country-chile.png",
      brazil: "/images/editorial/country-brazil.png",
      mexico: "/images/editorial/country-mexico.png"
    } satisfies Record<CountryCode, string>
  },
  descriptions: {
    ht: "Gid pratik, konparezon onèt ak akonpayman pou kominote ayisyèn nan.",
    fr: "Des guides pratiques, des comparaisons honnêtes et un accompagnement pour la communauté haïtienne.",
    es: "Guías prácticas, comparaciones honestas y acompañamiento para la comunidad haitiana.",
    pt: "Guias práticos, comparações honestas e acompanhamento para a comunidade haitiana.",
    en: "Practical guides, honest comparisons and support for the Haitian community."
  } satisfies Record<Locale, string>
} as const;
