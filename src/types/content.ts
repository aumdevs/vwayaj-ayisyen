import type { CountryCode, InformationType, Locale } from "@/types/domain";

export type PublicContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "notice"; text: string };

export type PublicContentSource = {
  title: string;
  publisher: string | null;
  url: string;
  isOfficial: boolean;
  publishedAt: string | null;
  accessedAt: string;
};

export type PublicCountryContent = {
  countryCode: CountryCode;
  sectionKey: string;
  slug: string;
  informationType: InformationType;
  riskLevel: "low" | "medium" | "high" | "critical";
  version: number;
  locale: Locale;
  title: string;
  summary: string | null;
  blocks: readonly PublicContentBlock[];
  lastVerifiedAt: string | null;
  nextReviewAt: string | null;
  sources: readonly PublicContentSource[];
};
