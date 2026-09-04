import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import Effects from "@/components/Effects";
import "./globals.css";
import siteConfig from "../data/site-config.json";

const GA_MEASUREMENT_ID = "G-S0DQ7Z2J61";

const display = Source_Serif_4({ 
  subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap",
});

const body = Inter({
  subsets: ["latin"], variable: "--font-body", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.brand.displayName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Effects />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
