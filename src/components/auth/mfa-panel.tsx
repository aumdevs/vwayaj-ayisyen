"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ShieldCheck, Smartphone } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

type Enrollment = { factorId: string; qrCode: string; secret: string };

export function MfaPanel({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const [factorId, setFactorId] = useState<string | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "working" | "error">("loading");

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    void supabase.auth.mfa.listFactors().then(({ data, error }) => {
      if (error) {
        setStatus("error");
        return;
      }
      setFactorId(data.totp[0]?.id ?? null);
      setStatus("ready");
    });
  }, []);

  async function enroll() {
    setStatus("working");
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Authenticator",
      issuer: "Vwayaj Ayisyen"
    });
    if (error) {
      setStatus("error");
      return;
    }
    const qrCode = data.totp.qr_code.startsWith("data:")
      ? data.totp.qr_code
      : `data:image/svg+xml;utf-8,${encodeURIComponent(data.totp.qr_code)}`;
    setFactorId(data.id);
    setEnrollment({ factorId: data.id, qrCode, secret: data.totp.secret });
    setStatus("ready");
  }

  async function verify(formData: FormData) {
    const code = formData.get("code");
    const activeFactorId = enrollment?.factorId ?? factorId;
    if (typeof code !== "string" || !/^\d{6}$/.test(code) || !activeFactorId) {
      setStatus("error");
      return;
    }
    setStatus("working");
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: activeFactorId,
      code
    });
    if (error) {
      setStatus("error");
      return;
    }
    window.location.assign(localizedPath(locale, "portal"));
  }

  return (
    <section className="auth-card mfa-card">
      <span className="mfa-card-icon" aria-hidden="true">
        <ShieldCheck size={28} />
      </span>
      <p className="eyebrow">{dictionary.auth.mfa}</p>
      <h2>{dictionary.security.mfa_required}</h2>
      <p className="auth-card-intro">{dictionary.security.do_not_share}</p>
      {status === "error" ? (
        <p className="auth-message" role="alert">
          {dictionary.errors.generic}
        </p>
      ) : null}
      {!factorId ? (
        <button className="button" disabled={status !== "ready"} onClick={enroll} type="button">
          {status === "loading" || status === "working"
            ? dictionary.common.loading
            : dictionary.auth.mfa}
        </button>
      ) : null}
      {enrollment ? (
        <div className="mfa-enrollment">
          <Image
            alt={dictionary.auth.mfa}
            height={240}
            src={enrollment.qrCode}
            unoptimized
            width={240}
          />
          <p className="field-help">
            <Smartphone aria-hidden="true" size={16} /> <code>{enrollment.secret}</code>
          </p>
        </div>
      ) : null}
      {factorId ? (
        <form action={verify}>
          <div className="field">
            <label htmlFor="mfa-code">TOTP</label>
            <input
              autoComplete="one-time-code"
              id="mfa-code"
              inputMode="numeric"
              maxLength={6}
              minLength={6}
              name="code"
              pattern="[0-9]{6}"
              required
            />
          </div>
          <button className="button auth-submit" disabled={status === "working"} type="submit">
            {status === "working" ? dictionary.common.loading : dictionary.common.continue}
          </button>
        </form>
      ) : null}
    </section>
  );
}
