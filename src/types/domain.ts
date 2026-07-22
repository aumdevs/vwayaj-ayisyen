export const SUPPORTED_LOCALES = ["ht", "fr", "es", "pt", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const COUNTRY_CODES = ["usa", "chile", "brazil", "mexico"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export const APP_ROLES = [
  "user",
  "advisor",
  "professional",
  "content_editor",
  "moderator",
  "admin",
  "super_admin"
] as const;
export type AppRole = (typeof APP_ROLES)[number];

export type InformationType = "official" | "practical" | "community" | "warning" | "commercial";

export const FEATURE_KEYS = [
  "payments",
  "document_uploads",
  "ai_assistant",
  "community",
  "appointments",
  "public_intake",
  "whatsapp",
  "courses",
  "professional_portal"
] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];
