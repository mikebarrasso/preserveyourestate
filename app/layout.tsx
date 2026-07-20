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

export const metadata: Metadata = {
  metadataBase: new URL("https://preserveyourestate.com"),
  title: {
    default:
      "Estate & Tax-Focused Wealth Management in Massachusetts | Michael Cammarata, CFP®, MSA Financial",
    template: "%s | Preserve My Estate",
  },
  description:
    "Massachusetts taxes estates over $2M. Michael Cammarata, CFP® coordinates wealth, estate, and tax planning for MA families, backed by MSA Financial, an independent RIA since 1997. Free MA estate tax calculator.",
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
