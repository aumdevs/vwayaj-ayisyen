import { createHmac, randomUUID } from "node:crypto";

const PURPOSE = "admin-bootstrap";
const MINIMUM_SIGNING_KEY_LENGTH = 32;

export type AdminProvisioningAttestation = {
  provisioning_issued_at: string;
  provisioning_nonce: string;
  provisioning_purpose: typeof PURPOSE;
  provisioning_signature: string;
};

export function createAdminProvisioningAttestation(
  email: string,
  signingKey: string,
  issuedAt = new Date(),
  nonce = randomUUID()
): AdminProvisioningAttestation {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedKey = signingKey.trim();
  if (!normalizedEmail) throw new Error("Cannot attest an empty bootstrap email.");
  if (normalizedKey.length < MINIMUM_SIGNING_KEY_LENGTH) {
    throw new Error("REGISTRATION_GATE_SIGNING_KEY must contain at least 32 characters.");
  }

  const provisioningIssuedAt = issuedAt.toISOString();
  const payload = [PURPOSE, normalizedEmail, provisioningIssuedAt, nonce].join("\n");
  const provisioningSignature = createHmac("sha256", normalizedKey)
    .update(payload, "utf8")
    .digest("hex");

  return {
    provisioning_issued_at: provisioningIssuedAt,
    provisioning_nonce: nonce,
    provisioning_purpose: PURPOSE,
    provisioning_signature: provisioningSignature
  };
}
