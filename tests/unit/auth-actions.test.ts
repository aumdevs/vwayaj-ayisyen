import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
  resetPasswordForEmail: vi.fn(),
  signInWithPassword: vi.fn(),
  signUp: vi.fn()
}));

vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({ auth }))
}));

import { forgotPasswordAction, signInAction, signUpAction } from "@/app/[locale]/auth/actions";

const strongPassword = "Valid-password-2026!";
const registrationSigningKey = "test_registration_gate_signing_key_at_least_32_chars";

function enableRegistration() {
  vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
  vi.stubEnv("REGISTRATION_TERMS_VERSION", "terms-2026-07-v1");
  vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", registrationSigningKey);
}

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
    enableRegistration();

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
    enableRegistration();

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

  it("passes CAPTCHA, callback and a valid terms attestation to Supabase signup", async () => {
    enableRegistration();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://vwayajayisyen.com");

    const result = await signUpAction(
      { status: "idle" },
      formData({
        accept_terms: "yes",
        captcha_token: "verified-turnstile-token",
        email: "New@Example.COM",
        locale: "ht",
        password: strongPassword
      })
    );

    expect(result).toEqual({ status: "check_email" });
    expect(auth.signUp).toHaveBeenCalledTimes(1);
    const signupRequest = auth.signUp.mock.calls[0]?.[0];
    expect(signupRequest).toMatchObject({
      email: "new@example.com",
      password: strongPassword,
      options: {
        captchaToken: "verified-turnstile-token",
        emailRedirectTo: "https://vwayajayisyen.com/ht/auth/callback?next=%2Fht%2Fportal"
      }
    });

    const metadata = signupRequest.options.data;
    expect(metadata).toMatchObject({
      preferred_locale: "ht",
      terms_version: "terms-2026-07-v1"
    });
    expect(metadata.registration_nonce).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect(new Date(metadata.terms_accepted_at).toISOString()).toBe(metadata.terms_accepted_at);

    const expectedSignature = createHmac("sha256", registrationSigningKey)
      .update(
        [
          "new@example.com",
          metadata.terms_version,
          metadata.terms_accepted_at,
          metadata.registration_nonce
        ].join("\n"),
        "utf8"
      )
      .digest("hex");
    expect(metadata.registration_signature).toBe(expectedSignature);
  });

  it("fails closed when the immutable terms version or signing key is missing", async () => {
    vi.stubEnv("DISABLE_PUBLIC_REGISTRATION", "false");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    vi.stubEnv("REGISTRATION_TERMS_VERSION", "");
    vi.stubEnv("REGISTRATION_GATE_SIGNING_KEY", "");

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

    expect(result).toEqual({ status: "unavailable" });
    expect(auth.signUp).not.toHaveBeenCalled();
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
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");

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
