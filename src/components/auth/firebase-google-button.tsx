"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { getFirebaseBrowserAuth } from "@/lib/firebase/client";

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.98-.9 6.63-2.35l-3.24-2.55c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.63A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.39 13.93A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.93V7.44H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.56l3.35-2.63Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.94c1.47 0 2.78.5 3.82 1.49l2.88-2.88A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.44l3.35 2.63C7.18 7.7 9.39 5.94 12 5.94Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function FirebaseGoogleButton({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");

  async function connectWithGoogle() {
    if (!enabled || status === "pending") return;
    setStatus("pending");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const credential = await signInWithPopup(getFirebaseBrowserAuth(), provider);
      const idToken = await credential.user.getIdToken(true);
      const response = await fetch("/api/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      if (!response.ok) throw new Error("session-failed");
      window.localStorage.setItem("vwayaj-account-state", "member");
      window.location.assign("/ht/profile");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="firebase-google-access">
      <button
        className="firebase-google-button"
        disabled={!enabled || status === "pending"}
        onClick={connectWithGoogle}
        type="button"
      >
        <GoogleMark />
        {status === "pending" ? "Tanpri tann..." : "Kontinye ak Google"}
      </button>
      {!enabled ? <small>Sèvis koneksyon an pa disponib pou kounye a.</small> : null}
      {status === "error" ? (
        <small role="alert">Nou pa t kapab konekte ak Google. Eseye ankò.</small>
      ) : null}
    </div>
  );
}
