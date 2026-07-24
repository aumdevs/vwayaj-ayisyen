"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type PublicNavLink = {
  description?: string;
  href: Route;
  label: string;
  meta?: string;
};

export type PublicNavItem = PublicNavLink;

export type PublicNavGroup = {
  label: string;
  links: readonly PublicNavLink[];
};

type PublicNavigationProps = {
  ariaLabel: string;
  groups: readonly PublicNavGroup[];
};

export function PublicNavigation({ ariaLabel, groups }: PublicNavigationProps) {
  const pathname = usePathname();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) setOpenIndex(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || openIndex === null) return;
      const closingIndex = openIndex;
      setOpenIndex(null);
      triggerRefs.current[closingIndex]?.focus();
    };
    window.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openIndex]);

  return (
    <nav aria-label={ariaLabel} className="desktop-nav" ref={navigationRef}>
      {groups.map((group, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const open = openIndex === index;
        const groupCurrent = group.links.some(
          ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
        );
        return (
          <div className="desktop-nav-group" key={group.label}>
            <button
              aria-controls={panelId}
              aria-expanded={open}
              className={groupCurrent ? "desktop-nav-current" : undefined}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              type="button"
            >
              {group.label}
              <ChevronDown aria-hidden="true" size={15} />
            </button>
            {open ? (
              <section className="desktop-mega-menu" id={panelId}>
                <header>
                  <span>{group.label}</span>
                </header>
                <div>
                  {group.links.map((item) => {
                    const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        aria-current={current ? "page" : undefined}
                        href={item.href}
                        key={`${item.href}-${item.label}`}
                        onClick={() => setOpenIndex(null)}
                      >
                        {item.meta ? <span aria-hidden="true">{item.meta}</span> : null}
                        <span>
                          <strong>{item.label}</strong>
                          {item.description ? <small>{item.description}</small> : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
