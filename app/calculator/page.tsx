import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalcTool from "./CalcTool";

export const metadata: Metadata = {
  title: "Massachusetts Estate Tax Calculator (2026), Free Estimate in 60 Seconds", description:
    "Free Massachusetts estate tax calculator. Enter your estate value and see your estimated MA estate tax under 2026 law (M.G.L. c. 65C), plus what coordinated trust planning could save a married couple.",
};

const JSON_LD = {
  "@context": "https://schema.org", "@type": "WebApplication", name: "Massachusetts Estate Tax Calculator", url: "https://preserveyourestate.com/calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: "MSA Financial, LLC" },
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav solid />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap">
          <nav className="crumbs hero-anim d1">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Calculator</span>
          </nav>
          <h1 className="hero-anim d2">
            The Massachusetts Estate Tax Calculator: <em>your number in 60 seconds</em>
          </h1>
          <p className="lead hero-anim d3">
            Massachusetts taxes estates over $2 million on a graduated scale up to 16%. Model your
            estate under 2026 law, and see what coordinated planning could change. No email
            required.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "4rem" }}>
        <div className="wrap">
          <CalcTool />
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">How the Tax Works</p>
            <h2>
              Why a &ldquo;$2 million exemption&rdquo; still costs{" "}
              <em>six figures at $4 million</em>
            </h2>
          </div>
          <div className="grid g3 stagger">
            <div className="coord-card">
              <h3>The credit, not a deduction</h3>
              <p>
                Massachusetts computes tax on your <b>entire</b> taxable estate using graduated
                rates, then subtracts a $99,600 credit, the amount that exactly cancels the tax on
                $2M. Everything above the line is taxed from dollar one of the excess.
              </p>
            </div>
            <div className="coord-card">
              <h3>No spousal portability</h3>
              <p>
                Unlike federal law, a surviving spouse cannot inherit the unused exemption. Without
                a funded credit shelter trust, a couple&apos;s two $2M exemptions quietly become
                one.
              </p>
            </div>
            <div className="coord-card">
              <h3>Your house counts</h3>
              <p>
                Home equity, IRAs, 401(k)s, and life insurance you own all count toward the $2M
                line. With Massachusetts real estate values, ordinary families cross it without
                noticing.
              </p>
            </div>
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem" }}>
            <Link className="text-link" href="/guides/ab-trust">
              Read the full A/B trust guide →
            </Link>
          </div>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
