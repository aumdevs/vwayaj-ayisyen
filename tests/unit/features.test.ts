import { afterEach, describe, expect, it, vi } from "vitest";
import { evaluateFeatureGate } from "@/lib/config/features";

afterEach(() => vi.unstubAllEnvs());

describe("feature gates", () => {
  it("fails closed when a kill switch is absent", () => {
    vi.stubEnv("DISABLE_AI_ASSISTANT", "");
    expect(evaluateFeatureGate("ai_assistant", true)).toMatchObject({
      enabled: false,
      reason: "kill_switch"
    });
  });

  it("does not enable a feature without all required configuration", () => {
    vi.stubEnv("DISABLE_PAYMENTS", "false");
    vi.stubEnv("STRIPE_SECRET_KEY", "configured");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "");
    vi.stubEnv("STRIPE_API_VERSION", "configured");
    expect(evaluateFeatureGate("payments", true)).toMatchObject({
      enabled: false,
      reason: "missing_configuration",
      missing: ["STRIPE_WEBHOOK_SECRET"]
    });
  });

  it("requires the independent database review gate", () => {
    vi.stubEnv("DISABLE_WHATSAPP", "false");
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+10000000000");
    expect(evaluateFeatureGate("whatsapp", false)).toMatchObject({
      enabled: false,
      reason: "database_gate"
    });
  });

  it("enables only when kill switch, configuration and database gate agree", () => {
    vi.stubEnv("DISABLE_WHATSAPP", "false");
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+10000000000");
    expect(evaluateFeatureGate("whatsapp", true)).toMatchObject({
      enabled: true,
      reason: "enabled"
    });
  });
});
