"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

export type PublicNavItem = {
  label: string;
  href: Route;
};

export function PublicNavigation({ items }: { items: readonly PublicNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="desktop-nav" aria-label="Navigasyon prensipal">
      {items.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link aria-current={current ? "page" : undefined} href={item.href} key={item.href}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
