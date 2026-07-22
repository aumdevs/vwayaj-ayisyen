import { featureUnavailable } from "@/server/http/responses";

export function GET() {
  return featureUnavailable();
}
