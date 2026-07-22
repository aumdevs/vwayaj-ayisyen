"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  forgotPasswordAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
  type AuthActionState
} from "@/app/[locale]/auth/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

type AuthFormProps = {
  dictionary: Dictionary;
  locale: Locale;
  mode: AuthMode;
  registrationEnabled: boolean;
};

const initialState: AuthActionState = { status: "idle" };

export function AuthForm({ dictionary, locale, mode, registrationEnabled }: AuthFormProps) {
  const action =
    mode === "sign-in"
      ? signInAction
      : mode === "sign-up"
        ? signUpAction
        : mode === "forgot-password"
          ? forgotPasswordAction
          : resetPasswordAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const isEmailOnly = mode === "forgot-password";
  const isReset = mode === "reset-password";
  const title =
    mode === "sign-in"
      ? dictionary.auth.sign_in
      : mode === "sign-up"
        ? dictionary.auth.sign_up
        : mode === "forgot-password"
          ? dictionary.auth.forgot
          : dictionary.security.password_change_required;

  const message =
    state.status === "invalid"
      ? dictionary.errors.generic
      : state.status === "unavailable"
        ? dictionary.errors.feature_unavailable
        : state.status === "check_email"
          ? dictionary.auth.verify
          : null;

  return (
    <section className="auth-card">
      <p className="eyebrow">{dictionary.security.do_not_share}</p>
      <h1>{title}</h1>
      {message ? (
        <p className="auth-message" role="status">
          {message}
        </p>
      ) : null}
      <form action={formAction}>
        <input name="locale" type="hidden" value={locale} />
        {!isReset ? (
          <div className="field">
            <label htmlFor="auth-email">{dictionary.auth.email}</label>
            <input
              autoComplete="email"
              id="auth-email"
              inputMode="email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </div>
        ) : null}
        {!isEmailOnly ? (
          <div className="field">
            <label htmlFor="auth-password">{dictionary.auth.password}</label>
            <input
              autoComplete={isReset || mode === "sign-up" ? "new-password" : "current-password"}
              id="auth-password"
              maxLength={72}
              minLength={12}
              name="password"
              required
              type="password"
            />
            <span className="field-help">12–72 · A–Z · a–z · 0–9 · !@#</span>
          </div>
        ) : null}
        {isReset ? (
          <div className="field">
            <label htmlFor="auth-password-confirmation">{dictionary.auth.password}</label>
            <input
              autoComplete="new-password"
              id="auth-password-confirmation"
              maxLength={72}
              minLength={12}
              name="password_confirmation"
              required
              type="password"
            />
          </div>
        ) : null}
        {mode === "sign-up" ? (
          <label className="check-option space-bottom-sm">
            <input name="accept_terms" required type="checkbox" value="yes" />
            <span>{dictionary.common.continue}</span>
          </label>
        ) : null}
        <button className="button" disabled={pending} type="submit">
          {pending ? dictionary.common.loading : title}
        </button>
      </form>
      <nav className="auth-links" aria-label="Auth">
        {mode !== "sign-in" ? (
          <Link href={localizedPath(locale, "auth/sign-in")}>{dictionary.auth.sign_in}</Link>
        ) : null}
        {mode !== "sign-up" && registrationEnabled ? (
          <Link href={localizedPath(locale, "auth/sign-up")}>{dictionary.auth.sign_up}</Link>
        ) : null}
        {mode !== "forgot-password" ? (
          <Link href={localizedPath(locale, "auth/forgot-password")}>{dictionary.auth.forgot}</Link>
        ) : null}
      </nav>
    </section>
  );
}
