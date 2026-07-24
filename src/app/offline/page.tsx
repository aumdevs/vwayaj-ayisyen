import Link from "next/link";
import { WifiOff } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { OfflineActions } from "@/components/pwa/offline-actions";
import { BRAND } from "@/config/brand";

export default function OfflinePage() {
  return (
    <main className="system-state-page" id="main-content">
      <section className="system-state-card">
        <Link className="system-state-brand" href="/ht">
          <LogoMark className="brand-mark" /> {BRAND.name}
        </Link>
        <span className="system-state-icon" aria-hidden="true">
          <WifiOff size={30} />
        </span>
        <p className="eyebrow">Offline</p>
        <h1>Ou pa konekte kounye a</h1>
        <p>Gen kèk paj ki ka disponib, men enfòmasyon ki bezwen mizajou mande yon koneksyon.</p>
        <p>Rekonekte anvan ou louvri yon kont, yon dosye oswa lòt enfòmasyon prive.</p>
        <OfflineActions />
      </section>
    </main>
  );
}
