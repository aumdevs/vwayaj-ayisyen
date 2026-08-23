import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { InstallAppPrompt } from "@/components/pwa/install-app-prompt";
import { MobileAppBar } from "@/components/pwa/mobile-app-bar";
import { MobileBottomNavigation } from "@/components/pwa/mobile-bottom-navigation";
import { StructuredData } from "@/components/seo/structured-data";
import { PublicAnalytics } from "@/components/analytics/public-analytics";
import { BRAND } from "@/config/brand";
import { getSiteUrl } from "@/lib/config/runtime";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

type PublicLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");

  return (
    <div className="site-frame">
      <SiteHeader dictionary={dictionary} locale={locale} />
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: BRAND.organizationName,
            url: siteUrl,
            email: BRAND.contact.email,
            logo: `${siteUrl}/icons/icon-512.png`
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: BRAND.name,
            url: siteUrl,
            inLanguage: ["ht", "fr", "es", "pt", "en"]
          }
        ]}
      />
      <PublicAnalytics />
      <MobileAppBar locale={locale} />
      <main className="public-app-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter dictionary={dictionary} locale={locale} />
      <MobileBottomNavigation locale={locale} />
      <InstallAppPrompt locale={locale} />
      <div id="bottom-sheet-host" />
      <div aria-live="polite" className="toast-region" id="toast-region" />
    </div>
  );
}
