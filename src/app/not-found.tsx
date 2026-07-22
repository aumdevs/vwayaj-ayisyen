import Link from "next/link";

export default function NotFound() {
  return (
    <main className="narrow-shell auth-shell" id="main-content">
      <section className="auth-card">
        <p className="eyebrow">404</p>
        <h1>Paj la pa disponib</h1>
        <p>Nou pa jwenn paj sa a oswa li poko pare.</p>
        <Link className="button" href="/ht">
          Retounen nan akèy
        </Link>
      </section>
    </main>
  );
}
