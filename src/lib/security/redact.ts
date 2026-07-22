const sensitiveKey = /(authorization|cookie|password|secret|token|document|passport|signature)/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const bearerPattern = /\bBearer\s+[A-Za-z0-9._~-]+/gi;
const jwtPattern = /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g;

export function redactText(value: string): string {
  return value
    .replace(emailPattern, "[REDACTED_EMAIL]")
    .replace(bearerPattern, "Bearer [REDACTED]")
    .replace(jwtPattern, "[REDACTED_TOKEN]");
}

export function redactRecord(input: Readonly<Record<string, unknown>>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      if (sensitiveKey.test(key)) return [key, "[REDACTED]"];
      if (typeof value === "string") return [key, redactText(value)];
      return [key, value];
    })
  );
}
