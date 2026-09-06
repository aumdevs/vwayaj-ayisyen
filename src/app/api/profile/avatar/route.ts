import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl } from "@/lib/config/runtime";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import { getFirebaseViewer } from "@/lib/firebase/session";

const MAX_AVATAR_BYTES = 1024 * 1024;

function hasTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return Boolean(origin && (origin === request.nextUrl.origin || origin === getSiteUrl().origin));
}

function isWebp(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false;
  return (
    new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
  );
}

export async function GET() {
  const viewer = await getFirebaseViewer();
  const services = await getFirebaseAdminServices();
  if (!viewer || !viewer.hasCustomAvatar || !services)
    return NextResponse.json({ error: "not_found" }, { status: 404 });

  try {
    const [buffer] = await services.bucket.file(`avatars/${viewer.id}/profile.webp`).download();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Type": "image/webp",
        "Content-Disposition": "inline"
      }
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  if (!hasTrustedOrigin(request) || request.headers.get("content-type") !== "image/webp")
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const viewer = await getFirebaseViewer();
  const services = await getFirebaseAdminServices();
  if (!viewer || !services) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_AVATAR_BYTES)
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (!bytes.length || bytes.length > MAX_AVATAR_BYTES || !isWebp(bytes))
    return NextResponse.json({ error: "invalid_image" }, { status: 400 });

  try {
    await services.bucket.file(`avatars/${viewer.id}/profile.webp`).save(Buffer.from(bytes), {
      resumable: false,
      metadata: {
        contentType: "image/webp",
        cacheControl: "private, no-store, max-age=0"
      }
    });
    await services.db.collection("profiles").doc(viewer.id).set(
      {
        hasCustomAvatar: true,
        avatarUpdatedAt: services.fieldValue.serverTimestamp(),
        updatedAt: services.fieldValue.serverTimestamp()
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
