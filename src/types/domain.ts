export const SUPPORTED_LOCALES = ["ht", "fr", "es", "pt", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const COUNTRY_CODES = ["usa", "chile", "brazil", "mexico"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];
