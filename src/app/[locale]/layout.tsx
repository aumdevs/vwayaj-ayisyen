import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ReadAloudButton } from "@/components/ui/read-aloud-button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { SUPPORTED_LOCALES } from "@/types/domain";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      canonical: localizedPath(locale),
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((supportedLocale) => [
          supportedLocale,
          localizedPath(supportedLocale)
        ])
      )
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <div className="site-frame">
      <SiteHeader dictionary={dictionary} locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <div className="page-tools shell">
          <ReadAloudButton label={dictionary.common.listen} locale={locale} />
        </div>
        {children}
      </main>
      <SiteFooter dictionary={dictionary} locale={locale} />
    </div>
  );
}
