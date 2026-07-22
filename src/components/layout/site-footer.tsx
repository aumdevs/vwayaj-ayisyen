import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";
import type { Locale } from "@/types/domain";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const productCopy = getProductCopy(locale);
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">
            <LogoMark className="brand-mark" />
            <strong>{productCopy.productName}</strong>
          </div>
          <p>{dictionary.packages.not_guarantee}</p>
        </div>
        <nav aria-label="Lyen enfòmasyon">
          <Link href={localizedPath(locale, "about")}>{dictionary.nav.help}</Link>
          <Link href={localizedPath(locale, "faq")}>FAQ</Link>
          <Link href={localizedPath(locale, "contact")}>{dictionary.common.contact}</Link>
          <Link href={localizedPath(locale, "legal/editorial")}>Politik editoryal</Link>
        </nav>
        <nav aria-label="Lyen legal">
          <Link href={localizedPath(locale, "legal/privacy")}>Konfidansyalite</Link>
          <Link href={localizedPath(locale, "legal/terms")}>Kondisyon</Link>
          <Link href={localizedPath(locale, "legal/cookies")}>Cookies</Link>
          <Link href={localizedPath(locale, "legal/ai")}>Asistan IA</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getUTCFullYear()} Vwayaj Ayisyen.</span>
        <a href="#page-top">Retounen anlè</a>
      </div>
    </footer>
  );
}
