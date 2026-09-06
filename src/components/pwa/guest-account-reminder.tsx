"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { FirebaseGoogleButton } from "@/components/auth/firebase-google-button";
import { ACCOUNT_STATE_KEY } from "@/components/pwa/mobile-entry-gate";
import { useAppExperience } from "@/components/pwa/app-experience";

const FIVE_MINUTES = 5 * 60 * 1000;
const GUEST_STARTED_AT_KEY = "vwayaj-guest-started-at";

export function GuestAccountReminder({ accountsReady }: { accountsReady: boolean }) {
  const appExperience = useAppExperience();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!appExperience || !accountsReady) return;
    const accountState = window.localStorage.getItem(ACCOUNT_STATE_KEY);
    if (accountState !== "guest") return;
    const stored = Number(window.localStorage.getItem(GUEST_STARTED_AT_KEY));
    const startedAt = Number.isFinite(stored) && stored > 0 ? stored : Date.now();
    window.localStorage.setItem(GUEST_STARTED_AT_KEY, String(startedAt));
    const remaining = Math.max(0, FIVE_MINUTES - (Date.now() - startedAt));
    const timer = window.setTimeout(() => setOpen(true), remaining);
    return () => window.clearTimeout(timer);
  }, [accountsReady, appExperience]);

  if (!open) return null;

  return (
    <div className="guest-reminder-backdrop">
      <section
        aria-labelledby="guest-reminder-title"
        aria-modal="true"
        className="guest-reminder"
        role="dialog"
      >
        <span aria-hidden="true">
          <Clock3 size={28} />
        </span>
        <p className="eyebrow">Yon ti etap ankò</p>
        <h2 id="guest-reminder-title">Kenbe enfòmasyon ou yo ansanm.</h2>
        <p>Konekte ak Google nan yon sèl etap. Pa gen modpas pou kreye oswa sonje.</p>
        <div>
          <FirebaseGoogleButton enabled={accountsReady} />
          <button className="mobile-guest-link" onClick={() => setOpen(false)} type="button">
            Pa kounye a
          </button>
        </div>
      </section>
    </div>
  );
}
