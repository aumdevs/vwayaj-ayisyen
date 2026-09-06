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

  it.each(["__proto__", "constructor", "toString"])(
    "rejects inherited object property %s as a legal version",
    (version) => {
      expect(getLegalDocumentContent("terms", "es", version)).toBeNull();
    }
  );

  it("uses Haitian Creole for every visible legal route", () => {
    expect(getLegalDocumentContent("privacy", "ht")?.title).toBe("Règleman konfidansyalite");
    expect(getLegalDocumentContent("terms", "ht")?.title).toBe("Kondisyon itilizasyon");
    expect(getLegalDocumentContent("security", "ht")?.title).toBe("Sekirite");
    expect(getLegalDocumentContent("payments", "ht")?.title).toBe("Peman");
  });

  it("describes Google identity and editable profile data", () => {
    const privacy = getLegalDocumentContent("privacy", "ht");
    expect(privacy?.version).toBe("privacy-2026-09-04-v5");
    expect(privacy?.summary).toContain("kont, pwofil, sekirite ak kominikasyon");
    const accountData = privacy?.sections
      .find(({ id }) => id === "account-data")
      ?.paragraphs.join(" ");
    expect(accountData).toContain("Google");
    expect(accountData).toContain("Nou pa resevwa ni estoke modpas Google ou");
    expect(accountData).toContain("dat nesans");
  });

  it("states the travel, security and payment boundaries clearly", () => {
    const terms = getLegalDocumentContent("terms", "ht");
    const security = getLegalDocumentContent("security", "ht");
    const payments = getLegalDocumentContent("payments", "ht");
    expect(terms?.sections).toHaveLength(10);
    expect(security?.sections).toHaveLength(10);
    expect(payments?.sections).toHaveLength(10);
    expect(terms?.sections.find(({ id }) => id === "service")?.paragraphs.join(" ")).toContain(
      "pa òganize vwayaj nan okenn sikonstans"
    );
    expect(
      payments?.sections.find(({ id }) => id === "no-guarantee")?.paragraphs.join(" ")
    ).toContain("Okenn peman pa garanti viza");
  });
});
