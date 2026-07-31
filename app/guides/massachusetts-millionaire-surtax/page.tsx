import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Massachusetts Millionaire Surtax & Estate Planning";
const description =
  "How the Massachusetts 4% millionaire surtax (2026 threshold $1,107,750) interacts with Roth conversions, capital gains, and estate planning, related to but separate from the estate tax.";
const pageUrl = `${SITE_ORIGIN}/guides/massachusetts-millionaire-surtax`;

const FAQ = [
  {
    q: "What is the Massachusetts millionaire surtax?",
    a: "A 4% surtax on Massachusetts taxable income above an inflation-indexed threshold. For tax year 2026 the threshold is $1,107,750. It stacks on top of the standard 5% Massachusetts income tax rate on income in that band.",
  },
  {
    q: "Is the millionaire surtax the same as the Massachusetts estate tax?",
    a: "No. The surtax is an income tax on high annual taxable income. The Massachusetts estate tax is a separate transfer tax on estates above $2M under M.G.L. c. 65C. Affluent households often face both over a lifetime, but they are different regimes with different triggers.",
  },
  {
    q: "How do Roth conversions interact with the surtax?",
    a: "Converted amounts are generally included in Massachusetts taxable income in the year of conversion. A large conversion can push income over the surtax threshold (or deepen surtax exposure) even when the conversion is sound for long-term federal and estate reasons. Sequence conversions against brackets, IRMAA, and the $1,107,750 (2026) line. See our Roth conversion guide.",
  },
  {
    q: "Do capital gains count toward the surtax?",
    a: "Yes. Large capital gains, business sales, and other recognition events can push Massachusetts taxable income above the threshold in a single year. Combined federal, NIIT, Massachusetts, and surtax rates on gains above the line can approach roughly one-third of the gain in stacked terms, depending on facts. Coordinate timing with your CPA.",
  },
  {
    q: "Is this tax advice?",
    a: "No. This guide is educational only. Michael Cammarata, CFP®, is a fiduciary advisor with MSA Financial, LLC, not a CPA or attorney. Confirm thresholds, filing, and transaction timing with your tax professionals.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/massachusetts-millionaire-surtax",
  },
  openGraph: {
    url: pageUrl,
    title,
    description,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    publisherOrg,
    authorPerson,
    articleLd({
      headline: "Massachusetts Millionaire Surtax & Estate Planning",
      description,
      url: pageUrl,
      datePublished: "2026-07-01",
      dateModified: "2026-07-20",
    }),
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Guides", item: `${SITE_ORIGIN}/guides` },
      { name: "Massachusetts Millionaire Surtax", item: pageUrl },
    ]),
  ],
};

export default function MassachusettsMillionaireSurtaxGuide() {
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
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span>Millionaire Surtax</span>
          </nav>
          <h1 className="hero-anim d2">
            Massachusetts Millionaire Surtax &amp; <em>Estate Planning</em>
          </h1>
          <p className="lead hero-anim d3">
            A 4% income surtax above $1,107,750 (2026) that stacks on Massachusetts&apos;s 5% rate,
            separate from the estate tax, but tightly linked to conversion and gain timing.
          </p>
          <p className="hero-anim d4" style={{ marginTop: "1.4rem" }}>
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "var(--gold-pale)",
              }}
            >
              Income Tax · 8 min read
            </span>{" "}
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "var(--gold-pale)",
              }}
            >
              Updated July 2026
            </span>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <h2>What the surtax is (and is not)</h2>
          <p>
            Massachusetts voters approved a 4% surtax on taxable income above an inflation-indexed
            threshold, effective 2023. For <b>tax year 2026</b>, that threshold is{" "}
            <b>$1,107,750</b>. Income above the line is taxed at the ordinary Massachusetts rate
            plus the additional 4%, so the state rate on that slice stacks to roughly{" "}
            <b>9%</b> (5% + 4%), before federal tax.
          </p>
          <div className="callout reveal">
            The millionaire surtax is an <b>income</b> tax. It is <b>not</b> the Massachusetts
            estate tax. Estates above $2M still face a separate transfer tax under{" "}
            <Link href="/guides/massachusetts-estate-tax">
              Massachusetts estate tax rules
            </Link>
            . Affluent families often manage both: lifetime income sequencing and eventual estate
            structure.
          </div>

          <h2>How it shows up in real planning years</h2>
          <p>
            Many households never sit permanently above $1,107,750 of taxable income, then cross
            the line in a single year because of a business sale, concentrated stock sale, real
            estate gain, or large{" "}
            <Link href="/guides/roth-conversion">Roth conversion</Link>. The surtax is event-driven
            as often as it is lifestyle-driven.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Why it matters for the surtax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Roth conversion</b>
                  </td>
                  <td>
                    Conversion income is generally Massachusetts taxable in the conversion year
                    and can push or deepen surtax exposure.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Capital gains / business sale</b>
                  </td>
                  <td>
                    Large recognition events can spike one year&apos;s taxable income over the
                    threshold even if ordinary wages look moderate.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>RMD + other income stacking</b>
                  </td>
                  <td>
                    Required distributions, Social Security, pensions, and gains can combine near
                    the line for higher-net-worth retirees.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Interaction with Roth conversions</h2>
          <p>
            Roth conversions can be powerful for estate and retirement-income design, reducing
            future RMDs and shifting tax timing, but each dollar converted is generally current
            Massachusetts taxable income. A conversion that fits federal brackets and IRMAA can
            still be expensive if it crosses the surtax threshold without intent. Multi-year
            pacing, partial conversions, and coordination with gain years usually beat a single
            aggressive fill-up. Detail lives in the{" "}
            <Link href="/guides/roth-conversion">Roth conversion strategy guide</Link>.
          </p>

          <h2>Capital gains and stacked rates</h2>
          <p>
            Above the surtax line, a capital gain can face federal long-term capital gains tax,
            the 3.8% Net Investment Income Tax, Massachusetts tax, and the 4% surtax. In stacked
            terms, combined rates on gains in that band can approach roughly <b>one-third</b> of
            the gain, depending on filing status and other income. Timing sales across years,
            harvesting losses, and aligning with conversion calendars are income-tax tools that
            sit alongside, not instead of, estate structure.
          </p>

          <h2>Related, not the same: estate tax</h2>
          <p>
            Estate planning still centers on the $2M Massachusetts estate-tax threshold, lack of
            state portability, trust funding, and liquidity at death. The surtax is a lifetime
            income overlay that can change how and when you fund Roths, realize gains, or
            accelerate income. Read the pillar{" "}
            <Link href="/guides/massachusetts-estate-tax">Massachusetts estate tax guide</Link>{" "}
            for transfer-tax mechanics; use this page when sequencing income events around that
            plan.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="byline-card">
            <AuthorPortrait />
            <div>
              <b>Michael Cammarata, CFP®</b>
              <p>
                Managing Partner, MSA Financial, LLC (CRD #107768), an independent RIA managing
                ~$1.4B AUM as of Dec. 31, 2025. Michael coordinates wealth, estate, and tax planning for
                Massachusetts families with $2M+ in investable assets. He is a fiduciary advisor,
                not an attorney.
              </p>
            </div>
          </div>

          <div className="next-step reveal-scale">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>Map surtax years against your estate and conversion plan</h3>
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

          <p className="fine" style={{ marginTop: "2rem" }}>
            Michael Cammarata, CFP®, is an Investment Adviser Representative of MSA Financial, LLC
            (CRD #107768), a Registered Investment Adviser. He is a fiduciary advisor, not an
            attorney. This article is for educational purposes only. Not legal or tax advice.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
