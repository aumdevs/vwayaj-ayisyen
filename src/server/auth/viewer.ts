import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { localizedPath } from "@/lib/i18n/paths";
import { APP_ROLES, type AppRole, type Locale } from "@/types/domain";

function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && APP_ROLES.some((role) => role === value);
}

export type Viewer = {
  id: string;
  email: string | null;
  assuranceLevel: "aal1" | "aal2" | null;
  roles: readonly AppRole[];
  forcePasswordChange: boolean;
};

export async function getViewer(): Promise<Viewer | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  if (error || !userId) return null;

  const [{ data: roleRows }, { data: profile }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", userId),
    supabase.from("profiles").select("force_password_change").eq("id", userId).maybeSingle()
  ]);

  const roles = (roleRows ?? []).map((row) => row.role).filter(isAppRole);

  return {
    id: userId,
    email: typeof claims?.email === "string" ? claims.email : null,
    assuranceLevel: claims?.aal === "aal2" ? "aal2" : claims?.aal === "aal1" ? "aal1" : null,
    roles,
    forcePasswordChange: profile?.force_password_change === true
  };
}

export async function requireViewer(
  locale: Locale,
  allowedRoles?: readonly AppRole[]
): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) redirect(`${localizedPath(locale, "auth/sign-in")}?reason=required`);
  if (viewer.forcePasswordChange) redirect(localizedPath(locale, "auth/reset-password"));
  if (allowedRoles && !allowedRoles.some((role) => viewer.roles.includes(role))) {
    redirect(localizedPath(locale, "forbidden"));
  }
  if (allowedRoles && viewer.assuranceLevel !== "aal2") {
    redirect(`${localizedPath(locale, "auth/mfa")}?reason=aal2`);
  }
  return viewer;
}
