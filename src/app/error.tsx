"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error details are intentionally not sent to the browser console in production.
    void error.digest;
  }, [error]);

  return (
    <main className="narrow-shell auth-shell" id="main-content">
      <section className="auth-card" role="alert">
        <p className="eyebrow">Erè</p>
        <h1>Nou pa t kapab fini aksyon an</h1>
        <p>Eseye ankò. Pa pataje done prive si pwoblèm nan kontinye.</p>
        <button className="button" onClick={reset} type="button">
          Eseye ankò
        </button>
      </section>
    </main>
  );
}
