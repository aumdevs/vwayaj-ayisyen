"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSiteUrl, getTurnstileSiteKey, isPublicRegistrationReady } from "@/lib/config/runtime";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Locale } from "@/types/domain";

export type AuthActionState = {
  status: "idle" | "invalid" | "unavailable" | "check_email";
};

const passwordSchema = z
  .string()
  .min(12)
  .max(72)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/);

const credentialsSchema = z.object({
  email: z.email().max(254),
  password: passwordSchema
});

const signupSchema = credentialsSchema.extend({
  captchaToken: z.string().min(1).max(2048)
});

const captchaTokenSchema = z.string().min(1).max(2048);

function readLocale(formData: FormData): Locale | null {
  const locale = formData.get("locale");
  return typeof locale === "string" && isLocale(locale) ? locale : null;
}

function readCaptchaToken(formData: FormData): string | null | undefined {
  if (!getTurnstileSiteKey()) return undefined;
  const parsed = captchaTokenSchema.safeParse(formData.get("captcha_token"));
  return parsed.success ? parsed.data : null;
}

export async function signInAction(
  _previous: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });
  const captchaToken = readCaptchaToken(formData);
  if (!locale || !parsed.success || captchaToken === null) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
    options: captchaToken ? { captchaToken } : undefined
  });
  if (error) return { status: "invalid" };
  redirect(localizedPath(locale, "portal"));
}

export async function signUpAction(
  _previous: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isPublicRegistrationReady()) return { status: "unavailable" };

  const locale = readLocale(formData);
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    captchaToken: formData.get("captcha_token")
  });
  const accepted = formData.get("accept_account_use") === "yes";
  if (!locale || !parsed.success || !accepted) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };
  const callback = new URL(localizedPath(locale, "auth/callback"), getSiteUrl());
  callback.searchParams.set("next", localizedPath(locale, "portal"));
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      captchaToken: parsed.data.captchaToken,
      emailRedirectTo: callback.toString(),
      data: { preferred_locale: locale }
    }
  });
  if (error) return { status: "invalid" };

  // Deliberately identical for existing and new accounts.
  return { status: "check_email" };
}

export async function forgotPasswordAction(
  _previous: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const email = formData.get("email");
  const parsed = z.email().max(254).safeParse(email);
  const captchaToken = readCaptchaToken(formData);
  if (!locale || captchaToken === null) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };
  if (parsed.success) {
    const callback = new URL(localizedPath(locale, "auth/callback"), getSiteUrl());
    callback.searchParams.set("next", localizedPath(locale, "auth/reset-password"));
    await supabase.auth.resetPasswordForEmail(parsed.data, {
      captchaToken,
      redirectTo: callback.toString()
    });
  }

  // Do not disclose whether the address exists or whether delivery was attempted.
  return { status: "check_email" };
}

export async function resetPasswordAction(
  _previous: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const password = formData.get("password");
  const confirmation = formData.get("password_confirmation");
  const parsed = passwordSchema.safeParse(password);
  if (!locale || !parsed.success || parsed.data !== confirmation) return { status: "invalid" };

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { status: "unavailable" };
  const { error } = await supabase.auth.updateUser({ password: parsed.data });
  if (error) return { status: "invalid" };
  await supabase.rpc("complete_required_password_change");
  await supabase.auth.signOut({ scope: "others" });
  redirect(localizedPath(locale, "auth/mfa"));
}

export async function signOutAction(formData: FormData): Promise<void> {
  const locale = readLocale(formData) ?? "ht";
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut({ scope: "local" });
  redirect(localizedPath(locale, "auth/sign-in"));
}
