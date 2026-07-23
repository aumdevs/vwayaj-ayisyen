"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Route } from "next";
import type { PublicNavItem } from "@/components/layout/public-navigation";

type MobileNavigationDrawerProps = {
  items: readonly PublicNavItem[];
  menuLabel: string;
  closeLabel: string;
  signInLabel: string;
  signInHref: Route;
  advisorLabel: string;
  advisorHref: Route;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigationDrawer({
  items,
  menuLabel,
  closeLabel,
  signInLabel,
  signInHref,
  advisorLabel,
  advisorHref
}: MobileNavigationDrawerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const closeButton = panel?.querySelector<HTMLButtonElement>("[data-drawer-close]");
    closeButton?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={menuLabel}
        className="icon-button mobile-menu-trigger"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <Menu aria-hidden="true" size={23} />
      </button>
      {open ? (
        <div className="mobile-drawer-backdrop" role="presentation">
          <div
            aria-label={menuLabel}
            aria-modal="true"
            className="mobile-drawer"
            ref={panelRef}
            role="dialog"
          >
            <div className="mobile-drawer-head">
              <span className="eyebrow">Vwayaj Ayisyen</span>
              <button
                aria-label={closeLabel}
                className="icon-button"
                data-drawer-close
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                type="button"
              >
                <X aria-hidden="true" size={24} />
              </button>
            </div>
            <nav className="mobile-drawer-nav" aria-label={menuLabel}>
              {items.map((item, index) => (
                <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                  <span className="mobile-nav-index">0{index + 1}</span>
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" size={20} />
                </Link>
              ))}
            </nav>
            <div className="mobile-drawer-actions">
              <Link className="button" href={advisorHref} onClick={() => setOpen(false)}>
                {advisorLabel}
              </Link>
              <Link
                className="button button-secondary"
                href={signInHref}
                onClick={() => setOpen(false)}
              >
                {signInLabel}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
