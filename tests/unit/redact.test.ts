import { describe, expect, it } from "vitest";
import { redactRecord, redactText } from "@/lib/security/redact";

describe("log redaction", () => {
  it("redacts email addresses and authorization material", () => {
    const result = redactText(
      "user@example.com Bearer token.value eyJhbGciOiJIUzI1NiJ9.payload.signature"
    );
    expect(result).not.toContain("user@example.com");
    expect(result).not.toContain("token.value");
    expect(result).not.toContain("payload.signature");
  });

  it("redacts values associated with sensitive keys", () => {
    expect(
      redactRecord({ email: "person@example.org", passportNumber: "P123", status: "ready" })
    ).toEqual({ email: "[REDACTED_EMAIL]", passportNumber: "[REDACTED]", status: "ready" });
  });

  it("preserves non-sensitive non-string values", () => {
    expect(redactRecord({ count: 2, enabled: true, note: "safe" })).toEqual({
      count: 2,
      enabled: true,
      note: "safe"
    });
  });
});
