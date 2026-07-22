import type { NextRequest } from "next/server";
import { apiError, featureUnavailable } from "@/server/http/responses";
import { isAuthorizedCronRequest } from "@/server/security/cron";

export function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) return apiError("UNAUTHORIZED", "Unauthorized.", 401);
  return featureUnavailable();
}
