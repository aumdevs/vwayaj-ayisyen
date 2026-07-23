"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let disposed = false;

    const register = async () => {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none"
      });
      if (disposed) return;

      const announceWaiting = () => {
        if (!registration.waiting) return;
        window.dispatchEvent(
          new CustomEvent("vwayaj:sw-update", {
            detail: { registration }
          })
        );
      };

      announceWaiting();
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) announceWaiting();
        });
      });
    };

    void register();
    return () => {
      disposed = true;
    };
  }, []);

  return null;
}
