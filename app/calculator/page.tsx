import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { fmtShort, fmtUSD, maEstateTax } from "@/lib/matax";
import CalcTool from "./CalcTool";

const title = "Massachusetts Estate Tax Calculator (2026)";
const description =
  "Estimate your Massachusetts estate tax under 2026 law in 60 seconds. See your exposure and what planning could save. Free—no email required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    url: "https://preserveyourestate.com/calculator",
    title,
    description,
  },
};

const REFERENCE_ESTATES = [2_500_000, 3_000_000, 4_000_000, 6_000_000, 8_000_000] as const;

const CALC_FAQ = [
  {
    q: "Is this calculator free?",
    a: "Yes. No email is required. It provides educational Massachusetts estate tax estimates under 2026 law.",
  },
  {
    q: "What exemption does Massachusetts use in 2026?",
    a: "Massachusetts effectively shelters the first $2 million through a $99,600 credit. Estates above that face graduated rates up to 16%.",
  },
  {
    q: "Does the calculator include federal estate tax?",
    a: "No. It focuses on Massachusetts estate tax. Many families owe Massachusetts tax while remaining under the much higher federal exemption.",
  },
  {
    q: "Can planning reduce the number I see?",
    a: "Often, especially for married couples using funded credit-shelter / A/B structures. The calculator’s planning scenario is illustrative only, not advice.",
  },
  {
    q: "Who built this calculator?",
    a: "Preserve My Estate / MSA Financial, LLC. Educational estimates by Michael Cammarata, CFP®. Not legal or tax advice.",
  },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Massachusetts Estate Tax Calculator",
      url: "https://preserveyourestate.com/calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Educational Massachusetts estate tax estimator under 2026 law (M.G.L. c. 65C).",
      provider: { "@id": "https://preserveyourestate.com/#org" },
      dateModified: "2026-07-20",
    },
    {
      "@type": "Organization",
      "@id": "https://preserveyourestate.com/#org",
      name: "MSA Financial, LLC",
      alternateName: "Preserve My Estate",
      url: "https://preserveyourestate.com/",
    },
    {
      "@type": "FAQPage",
      mainEntity: CALC_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://preserveyourestate.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Estate Tax Calculator",
          item: "https://preserveyourestate.com/calculator",
        },
      ],
    },
  ],
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
          <nav className="crumbs hero-anim d1" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Estate Tax Calculator</span>
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

          <div className="reveal" style={{ marginTop: "2.5rem", maxWidth: "560px" }}>
            <p style={{ marginBottom: "0.5rem", color: "var(--muted-ink)", lineHeight: 1.6 }}>
              Illustrative Massachusetts estate tax at common estate sizes under 2026 law, before
              planning:
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Taxable estate</th>
                    <th scope="col">Est. MA estate tax</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_ESTATES.map((estate) => (
                    <tr key={estate}>
                      <td>{fmtShort(estate)}</td>
                      <td>
                        <b>{fmtUSD(maEstateTax(estate))}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine">
              Educational estimates only (
              <a
                href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter65C"
                rel="noopener noreferrer"
                target="_blank"
              >
                M.G.L. c. 65C
              </a>
              ). Not tax advice. Use the calculator above for your own figure.
            </p>
          </div>

          <div className="reveal" style={{ marginTop: "2.5rem", maxWidth: "720px" }}>
            <p style={{ marginBottom: "0.5rem", color: "var(--muted-ink)", lineHeight: 1.6 }}>
              Federal vs Massachusetts estate tax at a glance (2026):
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Rule</th>
                    <th scope="col">Federal</th>
                    <th scope="col">Massachusetts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Exemption (approx.)</td>
                    <td>$15,000,000 unified (2026; indexed later)</td>
                    <td>$2M credit-sheltered threshold</td>
                  </tr>
                  <tr>
                    <td>Spousal portability</td>
                    <td>Yes (DSUE with timely election)</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Top rate</td>
                    <td>40%</td>
                    <td>Up to 16% (graduated)</td>
                  </tr>
                  <tr>
                    <td>Who often pays</td>
                    <td>Very large estates</td>
                    <td>Many $2M–$15M households with no federal tax</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="byline-card reveal" style={{ marginTop: "2.5rem" }}>
            <AuthorPortrait />
            <div>
              <b>Michael Cammarata, CFP®</b>
              <p>
                Managing Partner, MSA Financial, LLC (CRD #107768). Educational calculator for
                Massachusetts families coordinating wealth, estate, and tax planning. Updated July
                2026. <Link href="/about">About Michael →</Link>
              </p>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: "2.5rem", maxWidth: "720px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Calculator FAQ</h3>
            <dl className="calc-faq">
              {CALC_FAQ.map((f) => (
                <div key={f.q} style={{ marginBottom: "1.1rem" }}>
                  <dt style={{ fontWeight: 600, color: "var(--navy)", marginBottom: "0.25rem" }}>
                    {f.q}
                  </dt>
                  <dd style={{ margin: 0, color: "var(--muted-ink)" }}>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1.2rem" }}>
            <Link className="text-link" href="/guides/massachusetts-estate-tax">
              Massachusetts Estate Tax Guide →
            </Link>
            <Link className="text-link" href="/guides/federal-vs-massachusetts-estate-tax">
              Federal vs MA →
            </Link>
            <Link className="text-link" href="/guides/ab-trust">
              A/B Trust Guide →
            </Link>
          </div>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
