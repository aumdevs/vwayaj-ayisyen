import Link from "next/link";
import { Compass } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/config/brand";

export default function NotFound() {
  return (
    <main className="system-state-page" id="main-content">
      <section className="system-state-card">
        <Link className="system-state-brand" href="/ht">
          <LogoMark className="brand-mark" /> {BRAND.name}
        </Link>
        <span className="system-state-icon" aria-hidden="true">
          <Compass size={30} />
        </span>
        <p className="eyebrow">404</p>
        <h1>Paj sa a pa disponib.</h1>
        <p>Nou pa jwenn adrès la. Retounen sou sit la pou kontinye eksplore peyi ak gid yo.</p>
        <Link className="button" href="/ht">
          Retounen nan akèy
        </Link>
      </section>
    </main>
  );
}
