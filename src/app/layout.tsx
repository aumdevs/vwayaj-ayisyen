import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Atkinson_Hyperlegible, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { NetworkStatus } from "@/components/pwa/network-status";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config/runtime";
import { normalizeLocale } from "@/lib/i18n/config";
import "./globals.css";

const bodyFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Enfòmasyon klè pou prepare desizyon ou",
    template: "%s · Sant enfòmasyon"
  },
  description:
    "Yon platfòm enfòmasyon ak preparasyon pou kominote ayisyèn nan, ak sous, dat ak limit ki vizib.",
  applicationName: "Sant enfòmasyon",
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
    title: "Enfòmasyon klè pou prepare desizyon ou",
    description: "Enfòmasyon estriktire, onèt ak aksesib pou kominote ayisyèn nan."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0e4a3e",
  colorScheme: "light"
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = normalizeLocale((await headers()).get("x-locale"));
  return (
    <html className={`${bodyFont.variable} ${headingFont.variable}`} id="page-top" lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">
          Ale dirèk nan kontni an
        </a>
        <NetworkStatus />
        {children}
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
