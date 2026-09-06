import { Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { InstallAppPrompt } from "@/components/pwa/install-app-prompt";
import { GuestAccountReminder } from "@/components/pwa/guest-account-reminder";
import { MobileEntryGate } from "@/components/pwa/mobile-entry-gate";
import { MobileAppBar } from "@/components/pwa/mobile-app-bar";
import { MobileBottomNavigation } from "@/components/pwa/mobile-bottom-navigation";
import { StructuredData } from "@/components/seo/structured-data";
import { BRAND } from "@/config/brand";
import { getSiteUrl, isFirebaseAccountsReady } from "@/lib/config/runtime";
import { isLocale } from "@/lib/i18n/config";

type PublicLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");
  const accountsReady = isFirebaseAccountsReady();

  return (
    <div className="site-frame">
      <SiteHeader locale={locale} />
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
            inLanguage: "ht"
          }
        ]}
      />
      <MobileAppBar locale={locale} />
      <main className="public-app-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale={locale} />
      <MobileBottomNavigation locale={locale} />
      <InstallAppPrompt locale={locale} />
      <Suspense fallback={null}>
        <MobileEntryGate accountsReady={accountsReady} />
      </Suspense>
      <GuestAccountReminder accountsReady={accountsReady} />
      <div id="bottom-sheet-host" />
      <div aria-live="polite" className="toast-region" id="toast-region" />
    </div>
  );
}
