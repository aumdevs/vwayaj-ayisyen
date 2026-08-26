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
    ht: "Gid 2026 pou Ayisyen prepare yon pwojè lavi, travay oswa etid aletranje.",
    fr: "Guide 2026 pour préparer un projet de vie, de travail ou d’études à l’étranger depuis Haïti.",
    es: "Guía 2026 para preparar desde Haití un proyecto de vida, trabajo o estudios en el extranjero.",
    pt: "Guia 2026 para preparar no Haiti um projeto de vida, trabalho ou estudos no exterior.",
    en: "A 2026 guide for preparing from Haiti to live, work or study abroad."
  } satisfies Record<Locale, string>
} as const;
