import { describe, expect, it } from "vitest";
import { getLegalDocumentContent, LEGAL_VERSIONS } from "@/content/legal";

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

  it("uses the official Spanish artifact for courtesy-language routes", () => {
    expect(getLegalDocumentContent("privacy", "ht")?.title).toBe("Política de Privacidad");
  });
});
