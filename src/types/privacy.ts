export type PrivacyCenterData = {
  available: boolean;
  profile: {
    privacyAcceptedAt: string | null;
    privacyVersion: string | null;
    termsAcceptedAt: string | null;
    termsVersion: string | null;
  } | null;
  requests: {
    createdAt: string;
    id: string;
    requestType: "access" | "correct" | "delete" | "export" | "restrict" | "object";
    status: "received" | "identity_check" | "in_progress" | "fulfilled" | "denied" | "cancelled";
  }[];
};
