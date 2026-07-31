import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Federal vs Massachusetts Estate Tax";
const description =
  "Compare federal vs Massachusetts estate tax in 2026: $15M federal exemption vs $2M MA, portability yes vs no, 40% vs up to 16%, and who pays. Preserve My Estate / MSA Financial.";
const pageUrl = `${SITE_ORIGIN}/guides/federal-vs-massachusetts-estate-tax`;

const FAQ = [
  {
    q: "What is the federal estate tax exemption in 2026?",
    a: "The federal basic exclusion amount is $15,000,000 per person for decedents dying in 2026 (unified estate and gift tax; indexed in later years). Estates below that threshold generally owe no federal estate tax, though other taxes and filing rules can still apply. Confirm the figure for the year of death with your tax counsel.",
  },
  {
    q: "What is the Massachusetts estate tax threshold?",
    a: "Under 2026 Massachusetts law, estates at or below $2M generally owe no Massachusetts estate tax. Above $2M, tax is computed under M.G.L. c. 65C with a $99,600 credit and graduated rates climbing toward 16%. See our Massachusetts estate tax guide for details.",
  },
  {
    q: "Does federal portability help with Massachusetts estate tax?",
    a: "No. Federal DSUE (deceased spousal unused exclusion) portability does not transfer unused Massachusetts exemption. Massachusetts has no state portability. Married couples often need A/B or credit-shelter planning to use both $2M Massachusetts exemptions.",
  },
  {
    q: "Who pays federal vs Massachusetts estate tax?",
    a: "In both systems, the estate (via the executor or personal representative) is generally responsible for filing and paying tax when due. Heirs feel the economic impact through reduced inheritances or liquidity pressure if assets are illiquid. Massachusetts and federal returns are separate regimes with different thresholds and forms.",
  },
  {
    q: "Is this legal or tax advice?",
    a: "No. This guide is educational only. Michael Cammarata, CFP®, is a fiduciary advisor with MSA Financial, LLC, not an attorney or CPA. Confirm filing, valuation, and planning decisions with a Massachusetts estate planning attorney and your tax professionals.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/federal-vs-massachusetts-estate-tax",
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
      headline: "Federal vs Massachusetts Estate Tax",
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
      { name: "Federal vs Massachusetts Estate Tax", item: pageUrl },
    ]),
  ],
};

export default function FederalVsMassachusettsEstateTaxGuide() {
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
            <span>Federal vs Massachusetts</span>
          </nav>
          <h1 className="hero-anim d2">
            Federal vs <em>Massachusetts</em> Estate Tax
          </h1>
          <p className="lead hero-anim d3">
            Two separate tax systems. Many Massachusetts households never owe federal estate tax
            and still face a meaningful state bill above $2M.
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
              Estate Tax · 8 min read
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
          <h2>Side-by-side comparison (2026)</h2>
          <p>
            Federal estate tax and Massachusetts estate tax use different exemptions, rates, and
            spousal rules. National headlines about a multi-million-dollar federal exemption do not
            erase Massachusetts exposure under{" "}
            <a
              href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter65C"
              target="_blank"
              rel="noopener noreferrer"
            >
              M.G.L. c. 65C
            </a>
            .
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Federal estate tax</th>
                  <th>Massachusetts estate tax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Exemption / threshold</b>
                  </td>
                  <td>$15,000,000 per person for 2026 deaths (unified; indexed later)</td>
                  <td>$2M (with $99,600 credit in the computation)</td>
                </tr>
                <tr>
                  <td>
                    <b>Portability between spouses</b>
                  </td>
                  <td>Yes (DSUE, with a timely election)</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>
                    <b>Top marginal rate</b>
                  </td>
                  <td>40%</td>
                  <td>Up to 16%</td>
                </tr>
                <tr>
                  <td>
                    <b>Who pays</b>
                  </td>
                  <td>The estate (federal Form 706 when required)</td>
                  <td>The estate (separate Massachusetts filing when required)</td>
                </tr>
                <tr>
                  <td>
                    <b>Typical Preserve My Estate reader</b>
                  </td>
                  <td>Often under federal tax</td>
                  <td>Often over MA tax above $2M</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fine">
            Educational summary only. Exact federal exemption amounts change with inflation and
            statute. Confirm current figures with your CPA or estate counsel for the year of death.
          </p>

          <h2>The planning band: $2M to the federal exemption</h2>
          <div className="callout reveal">
            Households between roughly <b>$2M</b> and the <b>$15,000,000</b> federal exclusion
            (2026) are the classic Massachusetts planning band: federal estate tax may be
            theoretical while Massachusetts estate tax is real. Home equity, retirement accounts,
            and business interests all count toward the state threshold.
          </div>
          <p>
            In that band, the design problem is usually state-first: capture both Massachusetts
            exemptions for married couples, fund trusts correctly, and keep liquidity for a
            possible state bill, without over-engineering around a federal tax that may never
            apply. Worked Massachusetts mechanics live in the{" "}
            <Link href="/guides/massachusetts-estate-tax">Massachusetts estate tax guide</Link>.
            Structure detail for married couples is in{" "}
            <Link href="/guides/ab-trust">A/B trust planning</Link>.
          </p>

          <h2>Why &ldquo;under the federal exemption&rdquo; is not enough</h2>
          <p>
            A couple with a $4M combined estate can owe roughly <b>$180,800</b> of estimated
            Massachusetts estate tax at the second death with no credit-shelter planning, while
            still sitting far below the federal exemption. Portability of unused federal
            exclusion does not repair that Massachusetts gap. Run numbers on the{" "}
            <Link href="/calculator">estate tax calculator</Link>, then review documents and
            funding with counsel and a fiduciary advisor.
          </p>

          <h2>What to do next</h2>
          <p>
            If your net worth, including home equity, approaches or exceeds $2M, treat Massachusetts
            as its own checklist: threshold math, portability (or lack of it), A/B design, and
            funding. Michael Cammarata, CFP®, at MSA Financial can help coordinate the financial
            side of that review; an estate planning attorney must draft or amend legal documents.
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
            <h3>See where your estate sits between the two systems</h3>
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
