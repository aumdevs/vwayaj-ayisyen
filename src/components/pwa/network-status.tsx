"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/types/domain";

const copy = {
  ht: "Ou offline. Sèlman resous piblik ki te sove deja ka disponib.",
  fr: "Vous êtes hors ligne. Seules les ressources publiques déjà enregistrées peuvent être disponibles.",
  es: "Estás sin conexión. Sólo pueden estar disponibles los recursos públicos ya guardados.",
  pt: "Você está offline. Somente recursos públicos já salvos podem estar disponíveis.",
  en: "You are offline. Only previously saved public resources may be available."
} satisfies Record<Locale, string>;

export function NetworkStatus({ locale }: { locale: Locale }) {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="offline-banner" role="status">
      {copy[locale]}
    </div>
  );
}
