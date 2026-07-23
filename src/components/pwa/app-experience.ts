"use client";

import { useEffect, useState } from "react";

export const APP_EXPERIENCE_MEDIA_QUERY = [
  "(max-width: 767px)",
  "(max-width: 1366px) and (pointer: coarse) and (hover: none)",
  "(display-mode: standalone)",
  "(display-mode: fullscreen)"
].join(", ");

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

export function isStandaloneExperience(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true
  );
}

export function useAppExperience(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(APP_EXPERIENCE_MEDIA_QUERY);
    const sync = () => setActive(media.matches || isStandaloneExperience());
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return active;
}

export function useKeyboardOpen(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const sync = () => setOpen(window.innerHeight - viewport.height > 150);
    sync();
    viewport.addEventListener("resize", sync);
    return () => viewport.removeEventListener("resize", sync);
  }, []);

  return open;
}
