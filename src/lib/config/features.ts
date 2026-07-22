import type { FeatureKey } from "@/types/domain";

type FeatureDefinition = {
  disableEnv: string;
  requiredEnv: readonly string[];
  reviewGate: string;
};

const definitions: Record<FeatureKey, FeatureDefinition> = {
  payments: {
    disableEnv: "DISABLE_PAYMENTS",
    requiredEnv: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_API_VERSION"],
    reviewGate: "stripe_test_e2e"
  },
  document_uploads: {
    disableEnv: "DISABLE_DOCUMENT_UPLOADS",
    requiredEnv: [
      "MALWARE_SCANNER_URL",
      "MALWARE_SCANNER_TOKEN",
      "DOCUMENT_METADATA_ENCRYPTION_KEY_V1"
    ],
    reviewGate: "private_scanner_and_pentest"
  },
  ai_assistant: {
    disableEnv: "DISABLE_AI_ASSISTANT",
    requiredEnv: ["OPENAI_API_KEY", "AI_MODEL", "AI_EMBEDDING_MODEL"],
    reviewGate: "rag_evaluation_and_human_approval"
  },
  community: {
    disableEnv: "DISABLE_COMMUNITY",
    requiredEnv: [],
    reviewGate: "moderation_staffed"
  },
  appointments: {
    disableEnv: "DISABLE_APPOINTMENTS",
    requiredEnv: ["MEETING_PROVIDER"],
    reviewGate: "timezone_and_privacy_review"
  },
  public_intake: {
    disableEnv: "DISABLE_PUBLIC_INTAKE",
    requiredEnv: ["CRM_ENCRYPTION_KEY_V1", "CRM_BLIND_INDEX_KEY_V1"],
    reviewGate: "consent_captcha_and_rate_limit"
  },
  whatsapp: {
    disableEnv: "DISABLE_WHATSAPP",
    requiredEnv: ["NEXT_PUBLIC_WHATSAPP_NUMBER"],
    reviewGate: "number_and_privacy_notice"
  },
  courses: {
    disableEnv: "DISABLE_COURSES",
    requiredEnv: [],
    reviewGate: "approved_course_content"
  },
  professional_portal: {
    disableEnv: "DISABLE_PROFESSIONAL_PORTAL",
    requiredEnv: [],
    reviewGate: "professional_access_review"
  }
};

export type FeatureStatus = {
  enabled: boolean;
  reason: "kill_switch" | "missing_configuration" | "database_gate" | "enabled";
  missing: readonly string[];
  reviewGate: string;
};

export function evaluateFeatureGate(feature: FeatureKey, databaseEnabled = false): FeatureStatus {
  const definition = definitions[feature];
  if (process.env[definition.disableEnv] !== "false") {
    return {
      enabled: false,
      reason: "kill_switch",
      missing: [],
      reviewGate: definition.reviewGate
    };
  }

  const missing = definition.requiredEnv.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) {
    return {
      enabled: false,
      reason: "missing_configuration",
      missing,
      reviewGate: definition.reviewGate
    };
  }

  if (!databaseEnabled) {
    return {
      enabled: false,
      reason: "database_gate",
      missing: [],
      reviewGate: definition.reviewGate
    };
  }

  return { enabled: true, reason: "enabled", missing: [], reviewGate: definition.reviewGate };
}
