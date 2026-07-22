import "server-only";

import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  PublicContentBlock,
  PublicContentSource,
  PublicCountryContent
} from "@/types/content";
import { COUNTRY_CODES, SUPPORTED_LOCALES, type CountryCode, type Locale } from "@/types/domain";

const text = z.string().trim().min(1).max(10_000);
const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text }),
  z.object({ type: z.literal("heading"), text: z.string().trim().min(1).max(220) }),
  z.object({
    type: z.literal("list"),
    items: z.array(z.string().trim().min(1).max(1_000)).min(1).max(30)
  }),
  z.object({ type: z.literal("notice"), text: z.string().trim().min(1).max(2_000) })
]);
const bodySchema = z.array(blockSchema).max(100);
const contentRowSchema = z.object({
  content_version_id: z.uuid(),
  country_code: z.enum(COUNTRY_CODES),
  section_key: z.string().min(1).max(80),
  slug: z.string().min(1).max(200),
  information_type: z.enum(["official", "practical", "community", "warning", "commercial"]),
  risk_level: z.enum(["low", "medium", "high", "critical"]),
  version_no: z.number().int().positive(),
  last_verified_at: z.string().nullable(),
  next_review_at: z.string().nullable(),
  locale: z.enum(SUPPORTED_LOCALES),
  title: z.string().min(1).max(220),
  summary: z.string().max(1_200).nullable(),
  body: z.unknown()
});

function parseBlocks(value: unknown): readonly PublicContentBlock[] {
  const parsed = bodySchema.safeParse(value);
  return parsed.success ? parsed.data : [];
}

function safeWebUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getPublishedCountryContent(
  countryCode: CountryCode,
  locale: Locale
): Promise<readonly PublicCountryContent[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("published_country_content")
    .select(
      "content_version_id,country_code,section_key,slug,information_type,risk_level,version_no,last_verified_at,next_review_at,locale,title,summary,body"
    )
    .eq("country_code", countryCode)
    .eq("locale", locale);
  if (error || !data?.length) return [];

  const rows = data.flatMap((row) => {
    const parsed = contentRowSchema.safeParse(row);
    return parsed.success ? [parsed.data] : [];
  });
  if (!rows.length) return [];

  const { data: sourceRows } = await supabase
    .from("content_sources")
    .select(
      "content_version_id,title,publisher,url,is_official,published_at,accessed_at,display_order"
    )
    .in(
      "content_version_id",
      rows.map(({ content_version_id: id }) => id)
    )
    .order("display_order", { ascending: true });

  const sourcesByVersion = new Map<string, PublicContentSource[]>();
  for (const source of sourceRows ?? []) {
    const url = safeWebUrl(source.url);
    if (!url) continue;
    const items = sourcesByVersion.get(source.content_version_id) ?? [];
    items.push({
      title: source.title,
      publisher: source.publisher,
      url,
      isOfficial: source.is_official,
      publishedAt: source.published_at,
      accessedAt: source.accessed_at
    });
    sourcesByVersion.set(source.content_version_id, items);
  }

  return rows.map((row) => ({
    countryCode: row.country_code,
    sectionKey: row.section_key.replaceAll("_", "-"),
    slug: row.slug,
    informationType: row.information_type,
    riskLevel: row.risk_level,
    version: row.version_no,
    locale: row.locale,
    title: row.title,
    summary: row.summary,
    blocks: parseBlocks(row.body),
    lastVerifiedAt: row.last_verified_at,
    nextReviewAt: row.next_review_at,
    sources: sourcesByVersion.get(row.content_version_id) ?? []
  }));
}
