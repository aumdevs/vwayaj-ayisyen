import { NextResponse } from "next/server";

const noStoreHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "Content-Type": "application/json; charset=utf-8"
};

export function apiError(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status, headers: noStoreHeaders });
}

export function featureUnavailable(): NextResponse {
  return apiError("FEATURE_UNAVAILABLE", "This feature is not safely available yet.", 503);
}

export function methodNotAvailable(): NextResponse {
  return apiError("NOT_FOUND", "The requested resource is not available.", 404);
}
