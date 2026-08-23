import Link from "next/link";
import { Landmark, RefreshCw } from "lucide-react";
import { localizedPath } from "@/lib/i18n/paths";

export function OfflineActions() {
  return (
    <div className="offline-actions">
      <form action="" data-offline-retry method="get">
        <button className="button" type="submit">
          <RefreshCw aria-hidden="true" size={18} /> Eseye ankò
        </button>
      </form>
      <Link className="button button-secondary" href="/ht">
        Ale nan paj dakèy
      </Link>
      <Link className="text-link" href={localizedPath("ht", "countries/usa")}>
        <Landmark aria-hidden="true" size={18} /> Gade sous ofisyèl yo
      </Link>
    </div>
  );
}
