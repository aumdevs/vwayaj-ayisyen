export type PrivacyCenterData = {
  available: boolean;
  profile: {
    privacyAcceptedAt: string | null;
    privacyLegacy: boolean;
    privacyLocale: "es" | "pt" | null;
    privacyVersion: string | null;
    termsAcceptedAt: string | null;
    termsLegacy: boolean;
    termsLocale: "es" | "pt" | null;
    termsVersion: string | null;
  } | null;
  requests: {
    createdAt: string;
    id: string;
    requestType: "access" | "correct" | "delete" | "export" | "restrict" | "object";
    status: "received" | "identity_check" | "in_progress" | "fulfilled" | "denied" | "cancelled";
  }[];
};

export type PrivacyAdminQueueData = {
  available: boolean;
  requests: {
    createdAt: string;
    description: string | null;
    id: string;
    locale: "ht" | "fr" | "es" | "pt" | "en";
    requestType: PrivacyCenterData["requests"][number]["requestType"];
    status: PrivacyCenterData["requests"][number]["status"];
    updatedAt: string;
    userId: string | null;
  }[];
};
