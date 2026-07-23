import { BookOpenCheck, HeartHandshake, LockKeyhole } from "lucide-react";

type TrustItem = { title: string; body: string };

export function TrustStrip({ items }: { items: readonly [TrustItem, TrustItem, TrustItem] }) {
  const icons = [BookOpenCheck, HeartHandshake, LockKeyhole] as const;
  return (
    <section className="trust-strip" aria-label="Trust">
      <div className="shell trust-strip-grid">
        {items.map((item, index) => {
          const Icon = icons[index] ?? BookOpenCheck;
          return (
            <article key={item.title}>
              <span className="trust-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
