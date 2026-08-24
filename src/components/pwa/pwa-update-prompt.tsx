"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { Locale } from "@/types/domain";

type UpdateEvent = CustomEvent<{ registration: ServiceWorkerRegistration }>;

const copy = {
  ht: {
    message: "Yon nouvo vèsyon disponib.",
    update: "Mete ajou",
    later: "Pita"
  },
  fr: {
    message: "Une nouvelle version est disponible.",
    update: "Mettre à jour",
    later: "Plus tard"
  },
  es: {
    message: "Hay una nueva versión disponible.",
    update: "Actualizar",
    later: "Más tarde"
  },
  pt: {
    message: "Uma nova versão está disponível.",
    update: "Atualizar",
    later: "Mais tarde"
  },
  en: {
    message: "A new version is available.",
    update: "Update",
    later: "Later"
  }
} satisfies Record<Locale, Record<string, string>>;

export function PwaUpdatePrompt({ locale }: { locale: Locale }) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const reloadRequested = useRef(false);
  const text = copy[locale];

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let disposed = false;
    const findWaiting = async () => {
      const current = await navigator.serviceWorker.getRegistration("/");
      if (!disposed && current?.waiting) setRegistration(current);
    };
    void findWaiting();
    const onUpdate = (event: Event) => {
      setRegistration((event as UpdateEvent).detail.registration);
    };
    const onControllerChange = () => {
      if (reloadRequested.current) window.location.reload();
    };
    window.addEventListener("vwayaj:sw-update", onUpdate);
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () => {
      disposed = true;
      window.removeEventListener("vwayaj:sw-update", onUpdate);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  if (!registration) return null;

  function update() {
    reloadRequested.current = true;
    registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
  }

  return (
    <section className="pwa-update-prompt" role="status">
      <RefreshCw aria-hidden="true" size={19} />
      <div>
        <strong>{text.message}</strong>
      </div>
      <button className="button button-small" onClick={update} type="button">
        {text.update}
      </button>
      <button
        className="button button-quiet button-small"
        onClick={() => setRegistration(null)}
        type="button"
      >
        {text.later}
      </button>
    </section>
  );
}
