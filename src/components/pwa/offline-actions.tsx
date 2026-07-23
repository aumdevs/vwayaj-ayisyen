"use client";

import Link from "next/link";
import { BookOpenText, RefreshCw } from "lucide-react";
import { localizedPath } from "@/lib/i18n/paths";

export function OfflineActions() {
  return (
    <div className="offline-actions">
      <button className="button" onClick={() => window.location.reload()} type="button">
        <RefreshCw aria-hidden="true" size={18} /> Eseye ankò
      </button>
      <Link className="button button-secondary" href="/ht">
        Ale nan paj dakèy
      </Link>
      <Link className="text-link" href={localizedPath("ht", "guides")}>
        <BookOpenText aria-hidden="true" size={18} /> Gade kontni ki disponib offline
      </Link>
    </div>
  );
}
