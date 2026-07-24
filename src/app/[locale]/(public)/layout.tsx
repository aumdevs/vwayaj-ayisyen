import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { InstallAppPrompt } from "@/components/pwa/install-app-prompt";
import { MobileAppBar } from "@/components/pwa/mobile-app-bar";
import { MobileBottomNavigation } from "@/components/pwa/mobile-bottom-navigation";
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

  return (
    <div className="site-frame">
      <SiteHeader dictionary={dictionary} locale={locale} />
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
