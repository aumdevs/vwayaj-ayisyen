"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import {
  forgotPasswordAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
  type AuthActionState
} from "@/app/[locale]/auth/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ExperienceCopy } from "@/lib/i18n/experience-copy";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/types/domain";

type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

type AuthFormProps = {
  dictionary: Dictionary;
  locale: Locale;
  mode: AuthMode;
  registrationEnabled: boolean;
  turnstileSiteKey: string | null;
  copy: ExperienceCopy["auth"];
};

const initialState: AuthActionState = { status: "idle" };

export function AuthForm({
  dictionary,
  locale,
  mode,
  registrationEnabled,
  turnstileSiteKey,
  copy
}: AuthFormProps) {
  const action =
    mode === "sign-in"
      ? signInAction
      : mode === "sign-up"
        ? signUpAction
        : mode === "forgot-password"
          ? forgotPasswordAction
          : resetPasswordAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
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
  const needsCaptcha = mode === "sign-in" || mode === "sign-up" || mode === "forgot-password";
  const captchaRequired = needsCaptcha;
  const captchaConfigured = !needsCaptcha || turnstileSiteKey !== null;
  const displayedStatus =
    needsCaptcha && !captchaConfigured ? ("unavailable" as const) : state.status;

  const message =
    displayedStatus === "invalid"
      ? dictionary.errors.generic
      : displayedStatus === "unavailable"
        ? dictionary.errors.feature_unavailable
        : displayedStatus === "check_email"
          ? dictionary.auth.verify
          : null;
  const rules = [
    { label: "12+", valid: password.length >= 12 },
    { label: "A–Z", valid: /[A-Z]/.test(password) },
    { label: "a–z", valid: /[a-z]/.test(password) },
    { label: "0–9", valid: /[0-9]/.test(password) },
    { label: "!@#", valid: /[^A-Za-z0-9]/.test(password) }
  ];
  const showChecklist = !isEmailOnly && (passwordFocused || password.length > 0);

  useEffect(() => {
    if (!pending && state.status !== "idle" && captchaRequired) {
      turnstileRef.current?.reset();
      const resetToken = window.setTimeout(() => setCaptchaToken(""), 0);
      return () => window.clearTimeout(resetToken);
    }
  }, [captchaRequired, pending, state.status]);

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <p className="eyebrow">
        <LockKeyhole aria-hidden="true" size={15} /> {copy.kicker}
      </p>
      <h2 id="auth-title">{title}</h2>
      <p className="auth-card-intro">{copy.body}</p>
      {message ? (
        <p
          className={`auth-message auth-message-${displayedStatus}`}
          role={displayedStatus === "invalid" ? "alert" : "status"}
        >
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
            <div className="password-control">
              <input
                autoComplete={isReset || mode === "sign-up" ? "new-password" : "current-password"}
                id="auth-password"
                maxLength={72}
                minLength={12}
                name="password"
                onBlur={() => setPasswordFocused(false)}
                onChange={(event) => setPassword(event.target.value)}
                onFocus={() => setPasswordFocused(true)}
                required
                type={passwordVisible ? "text" : "password"}
              />
              <button
                aria-label={passwordVisible ? copy.hidePassword : copy.showPassword}
                onClick={() => setPasswordVisible((visible) => !visible)}
                type="button"
              >
                {passwordVisible ? (
                  <EyeOff aria-hidden="true" size={19} />
                ) : (
                  <Eye aria-hidden="true" size={19} />
                )}
              </button>
            </div>
            {showChecklist ? (
              <div className="password-checklist" aria-label={copy.passwordHelp}>
                <small>{copy.passwordHelp}</small>
                <ul>
                  {rules.map((rule) => (
                    <li className={rule.valid ? "password-rule-valid" : ""} key={rule.label}>
                      <Check aria-hidden="true" size={13} /> {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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
              type={passwordVisible ? "text" : "password"}
            />
          </div>
        ) : null}
        {mode === "sign-up" ? (
          <label className="check-option auth-terms">
            <input name="accept_terms" required type="checkbox" value="yes" />
            <span>{copy.acceptTerms}</span>
          </label>
        ) : null}
        {needsCaptcha && turnstileSiteKey ? (
          <div className="auth-turnstile">
            <span className="auth-turnstile-label">{copy.securityCheck}</span>
            <input name="captcha_token" type="hidden" value={captchaToken} />
            <Turnstile
              onError={() => {
                setCaptchaError(true);
                setCaptchaToken("");
              }}
              onExpire={() => setCaptchaToken("")}
              onSuccess={(token) => {
                setCaptchaError(false);
                setCaptchaToken(token);
              }}
              options={{
                action:
                  mode === "sign-in"
                    ? "signin"
                    : mode === "forgot-password"
                      ? "password_recovery"
                      : "signup",
                appearance: "always",
                language: locale === "ht" ? "fr" : locale,
                responseField: false,
                size: "flexible",
                theme: "light"
              }}
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
            />
            {captchaError ? (
              <small className="auth-turnstile-error" role="alert">
                {copy.securityCheckError}
              </small>
            ) : null}
          </div>
        ) : null}
        <button
          className="button auth-submit"
          disabled={pending || !captchaConfigured || (captchaRequired && !captchaToken)}
          type="submit"
        >
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
