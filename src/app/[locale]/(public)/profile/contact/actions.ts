"use server";

import { z } from "zod";
import { BRAND } from "@/config/brand";
import { isSupportEmailReady } from "@/lib/config/runtime";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import { getFirebaseViewer } from "@/lib/firebase/session";

export type SupportMessageState = {
  status: "idle" | "sent" | "invalid" | "unauthorized" | "limited" | "unavailable";
};

const supportMessageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4)
    .max(120)
    .regex(/^[^\r\n]+$/),
  detail: z.string().trim().min(20).max(4000)
});

const SUPPORT_WINDOW_MS = 60 * 60 * 1000;
const SUPPORT_WINDOW_LIMIT = 5;

export async function sendSupportMessageAction(
  _previous: SupportMessageState,
  formData: FormData
): Promise<SupportMessageState> {
  const viewer = await getFirebaseViewer();
  const services = await getFirebaseAdminServices();
  if (!viewer?.email || !services) return { status: "unauthorized" };
  if (!isSupportEmailReady()) return { status: "unavailable" };
  const parsed = supportMessageSchema.safeParse({
    title: formData.get("title"),
    detail: formData.get("detail")
  });
  if (!parsed.success) return { status: "invalid" };

  const rateRef = services.db.collection("support_rate_limits").doc(viewer.id);
  const now = Date.now();
  let allowed: boolean;
  try {
    allowed = await services.db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(rateRef);
      const data = snapshot.data() as { count?: unknown; windowStartedAtMs?: unknown } | undefined;
      const startedAt = typeof data?.windowStartedAtMs === "number" ? data.windowStartedAtMs : 0;
      const count = typeof data?.count === "number" ? data.count : 0;
      if (now - startedAt < SUPPORT_WINDOW_MS && count >= SUPPORT_WINDOW_LIMIT) return false;
      transaction.set(
        rateRef,
        now - startedAt >= SUPPORT_WINDOW_MS
          ? { count: 1, windowStartedAtMs: now }
          : { count: count + 1, windowStartedAtMs: startedAt },
        { merge: true }
      );
      return true;
    });
  } catch {
    return { status: "unavailable" };
  }
  if (!allowed) return { status: "limited" };

  const apiKey = process.env.EMAIL_PROVIDER_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) return { status: "unavailable" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [BRAND.contact.email],
        reply_to: viewer.email,
        subject: `[Sipò Vwayaj Ayisyen] ${parsed.data.title}`,
        text: `Non: ${viewer.displayName ?? "Pa espesifye"}\nImèl: ${viewer.email}\n\n${parsed.data.detail}`
      }),
      cache: "no-store"
    });
    return { status: response.ok ? "sent" : "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}
