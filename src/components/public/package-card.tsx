import { Check, Sparkles } from "lucide-react";

type PackageCardProps = {
  name: string;
  audience: string;
  result: string;
  features: readonly string[];
  availability: string;
  featured?: boolean;
  featuredLabel?: string;
};

export function PackageCard({
  name,
  audience,
  result,
  features,
  availability,
  featured = false,
  featuredLabel
}: PackageCardProps) {
  return (
    <article className={`package-card${featured ? " package-card-featured" : ""}`}>
      {featured ? (
        <span className="package-recommended">
          <Sparkles aria-hidden="true" size={15} /> {featuredLabel}
        </span>
      ) : null}
      <div>
        <h3>{name}</h3>
        <p className="package-audience">{audience}</p>
      </div>
      <p className="package-result">{result}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <Check aria-hidden="true" size={18} /> {feature}
          </li>
        ))}
      </ul>
      <p className="package-availability">{availability}</p>
    </article>
  );
}
