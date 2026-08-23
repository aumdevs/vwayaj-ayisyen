"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  isPublicAnalyticsEvent,
  localeFromAnalyticsPath,
  sanitizeAnalyticsPath,
  type PublicAnalyticsEvent
} from "@/lib/analytics/public-events";

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean };

function privacySignalEnabled(): boolean {
  const privacyNavigator = navigator as PrivacyNavigator;
  return privacyNavigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

function analyticsEndpoint(): string | null {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim();
  if (!raw) return null;
  try {
    const endpoint = new URL(raw, window.location.origin);
    if (!["http:", "https:"].includes(endpoint.protocol)) return null;
    return endpoint.toString();
  } catch {
    return null;
  }
}

function sendEvent(event: PublicAnalyticsEvent, rawPath: string): void {
  const endpoint = analyticsEndpoint();
  const path = sanitizeAnalyticsPath(rawPath);
  if (!endpoint || !path || privacySignalEnabled()) return;
  const locale = localeFromAnalyticsPath(path);
  if (!locale) return;

  const body = JSON.stringify({ event, path, locale });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    credentials: "omit",
    referrerPolicy: "no-referrer"
  });
}

export function PublicAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent(pathname.includes("/countries/") ? "country_view" : "page_view", pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;
      const analyticsEvent = target?.dataset.analyticsEvent;
      if (!analyticsEvent || !isPublicAnalyticsEvent(analyticsEvent)) return;
      sendEvent(analyticsEvent, window.location.pathname);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
