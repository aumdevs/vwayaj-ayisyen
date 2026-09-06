"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { NEWS_ARTICLES } from "@/content/agency";
import { getFirebaseAdminServices } from "@/lib/firebase/admin";
import { getFirebaseViewer } from "@/lib/firebase/session";

const knownSlugs = new Set(NEWS_ARTICLES.map(({ slug }) => slug));

export async function setNewsSavedAction(
  slug: string,
  saved: boolean
): Promise<{ status: "saved" | "removed" | "unauthorized" | "invalid" }> {
  const parsed = z
    .object({ slug: z.string().max(160), saved: z.boolean() })
    .safeParse({ slug, saved });
  if (!parsed.success || !knownSlugs.has(parsed.data.slug)) return { status: "invalid" };
  const viewer = await getFirebaseViewer();
  const services = await getFirebaseAdminServices();
  if (!viewer || !services) return { status: "unauthorized" };

  try {
    await services.db
      .collection("profiles")
      .doc(viewer.id)
      .set(
        {
          savedArticleSlugs: saved
            ? services.fieldValue.arrayUnion(parsed.data.slug)
            : services.fieldValue.arrayRemove(parsed.data.slug),
          updatedAt: services.fieldValue.serverTimestamp()
        },
        { merge: true }
      );
    revalidatePath(`/ht/news/${parsed.data.slug}`);
    revalidatePath("/ht/profile/saved");
    return { status: saved ? "saved" : "removed" };
  } catch {
    return { status: "invalid" };
  }
}
