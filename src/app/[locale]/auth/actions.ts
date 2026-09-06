"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { RESIDENCE_COUNTRIES } from "@/content/agency";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import { getFirebaseViewer, FIREBASE_SESSION_COOKIE } from "@/lib/firebase/session";

export type ProfileActionState = { status: "idle" | "saved" | "invalid" | "unauthorized" };

export async function mobileSignOutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(FIREBASE_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  redirect("/ht");
}

export async function updateMobileProfileAction(
  _previous: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const viewer = await getFirebaseViewer();
  if (!viewer) return { status: "unauthorized" };
  const parsed = z
    .object({
      displayName: z.string().trim().min(2).max(80),
      residenceCountry: z.enum(RESIDENCE_COUNTRIES.map(({ code }) => code)),
      phone: z.union([z.literal(""), z.string().regex(/^\+[1-9]\d{7,14}$/)]),
      birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((value) => {
          const birthDate = new Date(`${value}T00:00:00Z`);
          if (Number.isNaN(birthDate.getTime())) return false;
          const adultThreshold = new Date();
          adultThreshold.setUTCFullYear(adultThreshold.getUTCFullYear() - 18);
          return birthDate <= adultThreshold;
        }),
      notificationsEnabled: z.boolean()
    })
    .safeParse({
      displayName: formData.get("display_name"),
      residenceCountry: formData.get("residence_country"),
      phone: formData.get("phone"),
      birthDate: formData.get("birth_date"),
      notificationsEnabled: formData.get("notifications_enabled") === "on"
    });
  if (!parsed.success) return { status: "invalid" };
  const services = getFirebaseAdminServices();
  if (!services) return { status: "unauthorized" };
  try {
    await services.db.collection("profiles").doc(viewer.id).set(
      {
        displayName: parsed.data.displayName,
        residenceCountry: parsed.data.residenceCountry,
        phone: parsed.data.phone,
        birthDate: parsed.data.birthDate,
        notificationsEnabled: parsed.data.notificationsEnabled,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    return { status: "saved" };
  } catch {
    return { status: "invalid" };
  }
}
