import Link from "next/link";
import { RefreshCw } from "lucide-react";

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
    </div>
  );
}
