import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Effects from "@/components/Effects";
import "./globals.css";

const display = Source_Serif_4({
  subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap",
});

const body = Inter({
  subsets: ["latin"], variable: "--font-body", display: "swap",
});

const title = "Massachusetts Estate Tax Planning | Preserve My Estate";
const description =
  "Massachusetts taxes estates over $2M. Get a free estate tax estimate and coordinated planning with Michael Cammarata, CFP® at MSA Financial.";

export const metadata: Metadata = {
  metadataBase: new URL("https://preserveyourestate.com"),
  title: {
    default: title,
    template: "%s | Preserve My Estate",
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preserveyourestate.com",
    siteName: "Preserve My Estate",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Preserve My Estate" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
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
      </body>
    </html>
  );
}
