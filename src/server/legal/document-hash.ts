import "server-only";

import { createHash } from "node:crypto";
import {
  getLegalDocumentContent,
  type OfficialLegalLocale,
  type PublishedLegalDocument
} from "@/content/legal";

export type RegistrationLegalDocument = Extract<PublishedLegalDocument, "terms" | "privacy">;

const PINNED_REGISTRATION_LEGAL_HASHES = {
  es: {
    terms: "6d551cabc0195bbba6e892e046ded9bbd39ef1c958b875cddf23ceaf931786e2",
    privacy: "0c36529aae6ae19eb47ac5423578522c11365c39ce50594166564169bf6215a8"
  },
  pt: {
    terms: "e5994facd4640c1293e87f04fb7dafa98f6247d5659db9044d0ec9253d8d9887",
    privacy: "d4a372965e22713ae5f10c786b5f1e65985d76a97f732f1d186e01baaea262c9"
  }
} as const satisfies Record<OfficialLegalLocale, Record<RegistrationLegalDocument, string>>;

export function getPublishedLegalDocumentHash(
  document: RegistrationLegalDocument,
  locale: OfficialLegalLocale
): string | null {
  const content = getLegalDocumentContent(document, locale);
  if (!content) return null;

  const artifact = JSON.stringify({ content, document, locale });
  const contentHash = createHash("sha256").update(artifact, "utf8").digest("hex");
  return contentHash === PINNED_REGISTRATION_LEGAL_HASHES[locale][document] ? contentHash : null;
}

export function arePublishedRegistrationLegalDocumentsPinned(): boolean {
  return (["es", "pt"] as const).every((locale) =>
    (["terms", "privacy"] as const).every(
      (document) => getPublishedLegalDocumentHash(document, locale) !== null
    )
  );
}
