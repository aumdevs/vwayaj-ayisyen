import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getLegalDocumentContent, LEGAL_VERSIONS } from "@/content/legal";
import { getPublishedLegalDocumentHash } from "@/server/legal/document-hash";

describe("versioned legal content", () => {
  it.each([
    ["terms", LEGAL_VERSIONS.terms],
    ["privacy", LEGAL_VERSIONS.privacy],
    ["cookies", LEGAL_VERSIONS.cookies]
  ] as const)("serves the immutable %s artifact by version", (document, version) => {
    expect(getLegalDocumentContent(document, "es", version)?.version).toBe(version);
    expect(getLegalDocumentContent(document, "pt", version)?.version).toBe(version);
  });

  it("does not replace an unknown historical version with the current document", () => {
    expect(getLegalDocumentContent("terms", "es", "terms-obsolete")).toBeNull();
  });

  it.each(["__proto__", "constructor", "toString"])(
    "rejects inherited object property %s as a legal version",
    (version) => {
      expect(getLegalDocumentContent("terms", "es", version)).toBeNull();
    }
  );

  it("uses the official Spanish artifact for courtesy-language routes", () => {
    expect(getLegalDocumentContent("privacy", "ht")?.title).toBe("Política de Privacidad");
  });

  it("pins each official registration artifact in code and the database registry", () => {
    const migration = readFileSync(
      "supabase/migrations/20260723193000_harden_distinct_legal_acceptance.sql",
      "utf8"
    );
    const expected = [
      ["terms", "es", "6d551cabc0195bbba6e892e046ded9bbd39ef1c958b875cddf23ceaf931786e2"],
      ["privacy", "es", "0c36529aae6ae19eb47ac5423578522c11365c39ce50594166564169bf6215a8"],
      ["terms", "pt", "e5994facd4640c1293e87f04fb7dafa98f6247d5659db9044d0ec9253d8d9887"],
      ["privacy", "pt", "d4a372965e22713ae5f10c786b5f1e65985d76a97f732f1d186e01baaea262c9"]
    ] as const;

    for (const [document, locale, contentHash] of expected) {
      expect(getPublishedLegalDocumentHash(document, locale)).toBe(contentHash);
      expect(migration).toContain(`'${contentHash}'`);
    }
  });
});
