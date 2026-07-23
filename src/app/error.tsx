"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/config/brand";

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
    <main className="system-state-page" id="main-content">
      <section className="system-state-card" role="alert">
        <span className="system-state-brand">
          <LogoMark className="brand-mark" /> {BRAND.name}
        </span>
        <span className="system-state-icon" aria-hidden="true">
          <RefreshCw size={30} />
        </span>
        <p className="eyebrow">Erè</p>
        <h1>Nou pa t kapab fini aksyon an.</h1>
        <p>Eseye ankò. Pa pataje done prive si pwoblèm nan kontinye.</p>
        <button className="button" onClick={reset} type="button">
          Eseye ankò
        </button>
      </section>
    </main>
  );
}
