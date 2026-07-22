"use client";

import { useEffect, useState } from "react";

export function NetworkStatus() {
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
      Ou offline. Sèlman resous piblik ki te sove deja ka disponib.
    </div>
  );
}
