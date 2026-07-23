import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
  resetPasswordForEmail: vi.fn(),
  signInWithPassword: vi.fn(),
  signUp: vi.fn()
}));

vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({ auth }))
}));

import { forgotPasswordAction, signInAction, signUpAction } from "@/app/[locale]/auth/actions";

const strongPassword = "Valid-password-2026!";

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

beforeEach(() => {
  auth.resetPasswordForEmail.mockResolvedValue({ data: {}, error: null });
  auth.signInWithPassword.mockResolvedValue({ data: {}, error: null });
  auth.signUp.mockResolvedValue({ data: {}, error: null });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("Auth CAPTCHA enforcement", () => {
  it("rejects public signup before calling Supabase when the token is missing", async () => {
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");

    const result = await signUpAction(
      { status: "idle" },
      formData({
        accept_terms: "yes",
        email: "new@example.com",
        locale: "ht",
        password: strongPassword
      })
    );

    expect(result).toEqual({ status: "invalid" });
    expect(auth.signUp).not.toHaveBeenCalled();
  });

  it("requires explicit terms acceptance before calling Supabase signup", async () => {
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");

    const result = await signUpAction(
      { status: "idle" },
      formData({
        captcha_token: "verified-turnstile-token",
        email: "new@example.com",
        locale: "ht",
        password: strongPassword
      })
    );

    expect(result).toEqual({ status: "invalid" });
    expect(auth.signUp).not.toHaveBeenCalled();
  });

  it("passes the CAPTCHA token and exact callback to Supabase signup", async () => {
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://vwayajayisyen.com");

    const result = await signUpAction(
      { status: "idle" },
      formData({
        accept_terms: "yes",
        captcha_token: "verified-turnstile-token",
        email: "new@example.com",
        locale: "ht",
        password: strongPassword
      })
    );

    expect(result).toEqual({ status: "check_email" });
    expect(auth.signUp).toHaveBeenCalledWith({
      email: "new@example.com",
      password: strongPassword,
      options: {
        captchaToken: "verified-turnstile-token",
        data: { preferred_locale: "ht" },
        emailRedirectTo: "https://vwayajayisyen.com/ht/auth/callback?next=%2Fht%2Fportal"
      }
    });
  });

  it("requires CAPTCHA for sign-in and password recovery when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");

    expect(
      await signInAction(
        { status: "idle" },
        formData({ email: "user@example.com", locale: "es", password: strongPassword })
      )
    ).toEqual({ status: "invalid" });
    expect(auth.signInWithPassword).not.toHaveBeenCalled();

    expect(
      await forgotPasswordAction(
        { status: "idle" },
        formData({ email: "user@example.com", locale: "es" })
      )
    ).toEqual({ status: "invalid" });
    expect(auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("fails closed when Auth CAPTCHA is enabled without a public site key", async () => {
    expect(
      await signInAction(
        { status: "idle" },
        formData({
          captcha_token: "unusable-without-site-key",
          email: "user@example.com",
          locale: "es",
          password: strongPassword
        })
      )
    ).toEqual({ status: "unavailable" });
    expect(auth.signInWithPassword).not.toHaveBeenCalled();

    expect(
      await forgotPasswordAction(
        { status: "idle" },
        formData({
          captcha_token: "unusable-without-site-key",
          email: "user@example.com",
          locale: "es"
        })
      )
    ).toEqual({ status: "unavailable" });
    expect(auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("reports CAPTCHA rejection instead of claiming a recovery email was sent", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    auth.resetPasswordForEmail.mockResolvedValue({
      data: {},
      error: { code: "captcha_failed" }
    });

    const result = await forgotPasswordAction(
      { status: "idle" },
      formData({
        captcha_token: "expired-turnstile-token",
        email: "user@example.com",
        locale: "es"
      })
    );

    expect(result).toEqual({ status: "invalid" });
  });

  it("keeps non-CAPTCHA recovery failures enumeration-safe", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    auth.resetPasswordForEmail.mockResolvedValue({
      data: {},
      error: { code: "email_not_found" }
    });

    const result = await forgotPasswordAction(
      { status: "idle" },
      formData({
        captcha_token: "verified-turnstile-token",
        email: "unknown@example.com",
        locale: "es"
      })
    );

    expect(result).toEqual({ status: "check_email" });
  });
});
