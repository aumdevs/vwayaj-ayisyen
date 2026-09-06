type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={["logo-symbol", className].filter(Boolean).join(" ")}
      src="/images/brand/symbol-transparent.png"
      width={640}
      height={451}
      unoptimized
    />
  );
}

export function BrandLogo({
  className,
  transparent = false,
  priority = false
}: {
  className?: string;
  transparent?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      alt="Vwayaj Ayisyen"
      className={["brand-logo", className].filter(Boolean).join(" ")}
      src={transparent ? "/images/brand/logo-transparent.png" : "/images/brand/logo-white.png"}
      width={1024}
      height={758}
      priority={priority}
      unoptimized
    />
  );
}
import Image from "next/image";
