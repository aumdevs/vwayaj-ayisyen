import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { NetworkStatus } from "@/components/pwa/network-status";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config/runtime";
import { normalizeLocale } from "@/lib/i18n/config";
import { BRAND } from "@/config/brand";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const editorialFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.name}`
  },
  description:
    "Yon platfòm enfòmasyon ak preparasyon pou kominote ayisyèn nan, ak sous, dat ak limit ki vizib.",
  applicationName: BRAND.name,
  category: "education",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  robots: isIndexingAllowed()
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true, nosnippet: false },
  openGraph: {
    type: "website",
    locale: "ht_HT",
    title: BRAND.name,
    description: "Enfòmasyon estriktire, onèt ak aksesib pou kominote ayisyèn nan."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1324",
  colorScheme: "light"
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = normalizeLocale((await headers()).get("x-locale"));
  return (
    <html className={`${bodyFont.variable} ${editorialFont.variable}`} id="page-top" lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">
          Ale dirèk nan kontni an
        </a>
        <NetworkStatus />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
