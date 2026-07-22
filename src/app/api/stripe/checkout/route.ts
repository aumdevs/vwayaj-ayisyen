import { featureUnavailable } from "@/server/http/responses";

export function POST() {
  return featureUnavailable();
}
