import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const title = "Estate Planning Guides";
const description =
  "Seven educational guides on Massachusetts estate tax, federal vs MA comparison, portability, A/B trusts, trust funding, Roth conversions, and the millionaire surtax for households over ~$2M.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    url: "https://preserveyourestate.com/guides",
    title,
    description,
  },
};

const GUIDES = [
  {
    href: "/guides/massachusetts-estate-tax",
    tag: "Pillar",
    title: "Massachusetts Estate Tax Guide",
    blurb:
      "How the 2026 Massachusetts estate tax works: $2M threshold, $99,600 credit, rates toward 16%, no portability, and who pays.",
    meta: "14 min read",
  },
  {
    href: "/guides/federal-vs-massachusetts-estate-tax",
    tag: "Comparison",
    title: "Federal vs Massachusetts Estate Tax",
    blurb:
      "Side-by-side: $15M federal exemption (2026) vs $2M MA, portability yes vs no, 40% vs up to 16%, and the $2M–federal planning band.",
    meta: "8 min read",
  },
  {
    href: "/guides/massachusetts-estate-tax-portability",
    tag: "Estate Structure",
    title: "Massachusetts Estate Tax Portability",
    blurb:
      "Why Massachusetts has no estate tax portability, how that differs from federal DSUE, and what it means for married couples.",
    meta: "9 min read",
  },
  {
    href: "/guides/ab-trust",
    tag: "Estate Structure",
    title: "A/B Trust Planning",
    blurb:
      "How Credit Shelter Trusts and QTIP structures help married Massachusetts couples use both $2M exemptions, with a worked $8M example.",
    meta: "12 min read",
  },
  {
    href: "/guides/trust-funding",
    tag: "Estate Execution",
    title: "Trust Funding Checklist",
    blurb:
      "What trust funding means, why unfunded trusts fail, and an asset-by-asset checklist for deeds, accounts, beneficiaries, and business interests.",
    meta: "10 min read",
  },
  {
    href: "/guides/roth-conversion",
    tag: "Retirement Income",
    title: "Roth Conversion Strategy",
    blurb:
      "How Roth conversions fit estate and tax planning for Massachusetts affluent households, including IRMAA, brackets, and coordination with A/B trusts.",
    meta: "11 min read",
  },
  {
    href: "/guides/massachusetts-millionaire-surtax",
    tag: "Income Tax",
    title: "Massachusetts Millionaire Surtax",
    blurb:
      "The 4% surtax above $1,107,750 (2026), how it stacks on the 5% MA rate, and interactions with Roth conversions and capital gains.",
    meta: "8 min read",
  },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Estate Planning Guides",
      url: "https://preserveyourestate.com/guides",
      description,
      isPartOf: {
        "@type": "WebSite",
        name: "Preserve My Estate",
        url: "https://preserveyourestate.com/",
      },
      publisher: {
        "@type": "Organization",
        name: "MSA Financial, LLC",
        alternateName: "Preserve My Estate",
      },
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
          name: "Guides",
          item: "https://preserveyourestate.com/guides",
        },
      ],
    },
  ],
};

export default function GuidesIndex() {
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
            <span>Guides</span>
          </nav>
          <h1 className="hero-anim d2">
            Estate Planning <em>Guides</em>
          </h1>
          <p className="lead hero-anim d3">
            Practical, Massachusetts-specific education for households with roughly $2M or more in
            assets, written for Preserve My Estate readers and coordinated with MSA Financial&apos;s
            fiduciary planning process.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Massachusetts Focus</p>
            <h2>
              Start with the gap that usually matters most for <em>your</em> estate
            </h2>
            <p className="lead">
              Under 2026 Massachusetts law, estates above $2M face graduated estate tax after a
              $99,600 credit, with rates climbing toward 16%. These guides cover structure, funding,
              income-tax timing, and the millionaire surtax, not legal document drafting.
            </p>
          </div>

          <div className="grid g3 stagger">
            {GUIDES.map((g) => (
              <Link key={g.href} className="guide-card" href={g.href}>
                <span className="guide-tag">{g.tag}</span>
                <h3>{g.title}</h3>
                <p>{g.blurb}</p>
                <span className="guide-meta">
                  <span>{g.meta}</span>
                  <span className="text-link">Read Guide →</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="next-step reveal-scale" style={{ marginTop: "3.5rem" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>Prefer a conversation over another article?</h3>
            <p>
              A complimentary 45-minute review for Massachusetts families with $2M+ in investable
              assets. Educational only. No obligation.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-gold" href="/calculator">
                See My Estate Tax Number <span className="arrow">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/#booking">
                Schedule the 45-Minute Review
              </Link>
            </div>
          </div>

          <p className="fine" style={{ marginTop: "2rem", textAlign: "center" }}>
            Michael Cammarata, CFP®, is an Investment Adviser Representative of MSA Financial, LLC
            (CRD #107768), a Registered Investment Adviser. He is a fiduciary advisor, not an
            attorney. Guides are educational only and are not legal or tax advice.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
