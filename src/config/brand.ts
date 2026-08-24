import type { CountryCode, Locale } from "@/types/domain";

export const BRAND = {
  name: "Vwayaj Ayisyen",
  shortName: "Vwayaj Ayisyen",
  organizationName: "Vwayaj ayisyen",
  siteUrl: "https://vwayajayisyen.com",
  logoLabel: "Vwayaj Ayisyen",
  contact: {
    email: "support@vwayajayisyen.com",
    legal: "legal@vwayajayisyen.com",
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
    ht: "Sous ofisyèl, dat ak limit vizib pou kominote ayisyèn nan.",
    fr: "Sources officielles, dates et limites visibles pour la communauté haïtienne.",
    es: "Fuentes oficiales, fechas y límites visibles para la comunidad haitiana.",
    pt: "Fontes oficiais, datas e limites visíveis para a comunidade haitiana.",
    en: "Official sources, dates and visible limits for the Haitian community."
  } satisfies Record<Locale, string>
} as const;
