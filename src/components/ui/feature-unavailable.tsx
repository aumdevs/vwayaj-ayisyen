import { Clock3, ShieldCheck } from "lucide-react";

type FeatureUnavailableProps = {
  title: string;
  message: string;
  detail?: string;
};

export function FeatureUnavailable({ title, message, detail }: FeatureUnavailableProps) {
  return (
    <section className="feature-unavailable" aria-labelledby="feature-unavailable-title">
      <div className="feature-icon" aria-hidden="true">
        <Clock3 size={24} />
      </div>
      <div>
        <p className="status-label">
          <ShieldCheck aria-hidden="true" size={17} /> Revizyon obligatwa
        </p>
        <h2 id="feature-unavailable-title">{title}</h2>
        <p>{message}</p>
        {detail ? <p className="fine-print">{detail}</p> : null}
      </div>
    </section>
  );
}
