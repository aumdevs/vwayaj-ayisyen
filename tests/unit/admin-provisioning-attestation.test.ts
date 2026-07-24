import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createAdminProvisioningAttestation } from "../../scripts/lib/admin-provisioning-attestation";

describe("administrator provisioning attestation", () => {
  it("binds a one-time bootstrap signature to purpose, email, time and nonce", () => {
    const signingKey = "test_registration_gate_signing_key_at_least_32_chars";
    const attestation = createAdminProvisioningAttestation(
      " Owner@Example.COM ",
      signingKey,
      new Date("2026-07-23T14:30:00.123Z"),
      "d9a40880-6427-4b28-b953-2dbeca6f8bde"
    );

    expect(attestation).toMatchObject({
      provisioning_issued_at: "2026-07-23T14:30:00.123Z",
      provisioning_nonce: "d9a40880-6427-4b28-b953-2dbeca6f8bde",
      provisioning_purpose: "admin-bootstrap"
    });
    const expectedSignature = createHmac("sha256", signingKey)
      .update(
        [
          "admin-bootstrap",
          "owner@example.com",
          attestation.provisioning_issued_at,
          attestation.provisioning_nonce
        ].join("\n"),
        "utf8"
      )
      .digest("hex");
    expect(attestation.provisioning_signature).toBe(expectedSignature);
  });

  it("refuses a weak signing key", () => {
    expect(() =>
      createAdminProvisioningAttestation(
        "owner@example.com",
        "too-short",
        new Date("2026-07-23T14:30:00.123Z"),
        "d9a40880-6427-4b28-b953-2dbeca6f8bde"
      )
    ).toThrow("at least 32 characters");
  });
});
