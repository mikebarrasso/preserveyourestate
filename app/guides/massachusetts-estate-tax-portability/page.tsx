import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Massachusetts Estate Tax Portability (2026)";
const description =
  "Why Massachusetts has no estate tax portability, how that differs from federal DSUE, and what A/B and credit shelter planning means for married couples in 2026.";
const pageUrl = `${SITE_ORIGIN}/guides/massachusetts-estate-tax-portability`;

const FAQ = [
  {
    q: "Does Massachusetts allow estate tax portability?",
    a: "No. Massachusetts does not let a surviving spouse inherit unused Massachusetts estate tax exemption the way federal law allows DSUE (deceased spousal unused exclusion) for the federal estate tax.",
  },
  {
    q: "What is federal DSUE?",
    a: "DSUE is the deceased spousal unused exclusion under federal estate tax rules. When a valid portability election is made, a surviving spouse may add the unused federal exclusion from the first death to their own. That federal mechanism does not create Massachusetts portability.",
  },
  {
    q: "How do married couples still use both $2M Massachusetts exemptions?",
    a: "Typically through credit shelter / A/B (or similar) trust planning that captures up to $2M at the first death in a trust that bypasses the survivor's taxable estate, while using the marital deduction for the balance. Documents must be drafted by an attorney and funded correctly.",
  },
  {
    q: "If we leave everything to each other, are we fine in Massachusetts?",
    a: "Outright to the spouse can defer Massachusetts tax until the second death via the marital deduction, but it often wastes the first spouse's $2M exemption for state purposes. A $4M combined estate can face roughly $180,800 of estimated Massachusetts estate tax at the second death with only one exemption left.",
  },
  {
    q: "Is this legal advice?",
    a: "No. This guide is educational. Michael Cammarata, CFP®, coordinates planning as a fiduciary advisor with MSA Financial, LLC; he does not draft trusts or provide legal advice. Use a Massachusetts estate planning attorney for documents.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/massachusetts-estate-tax-portability",
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
      headline: "Massachusetts Estate Tax Portability (2026)",
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
      { name: "Massachusetts Estate Tax Portability", item: pageUrl },
    ]),
  ],
};

export default function MassachusettsEstateTaxPortabilityGuide() {
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
            <span>Estate Tax Portability</span>
          </nav>
          <h1 className="hero-anim d2">
            Massachusetts Estate Tax <em>Portability</em> (2026)
          </h1>
          <p className="lead hero-anim d3">
            Federal estate tax allows DSUE portability. Massachusetts does not. For married
            couples above roughly $2M, that single difference drives much of the state&apos;s
            trust planning.
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
              Estate Structure · 9 min read
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
          <h2>Portability in plain English</h2>
          <p>
            &ldquo;Portability&rdquo; means a surviving spouse can use exemption that the first
            spouse did not use. Under federal estate tax rules, that unused amount is often called
            DSUE, the deceased spousal unused exclusion, when a timely portability election is
            made on a federal estate tax return. Couples who are nowhere near the federal exemption
            sometimes still file to lock in DSUE for future federal planning.
          </p>
          <div className="callout reveal">
            <b>Massachusetts has no equivalent.</b> Unused Massachusetts exemption at the first
            death does not transfer to the survivor. Under 2026 law, each spouse effectively has a{" "}
            <b>$2M</b> Massachusetts estate-tax threshold / credit framework (with a{" "}
            <b>$99,600</b> credit in the computation), and rates climb toward <b>16%</b>, but the
            first spouse&apos;s unused capacity disappears if it is not captured through planning.
            See the{" "}
            <Link href="/guides/massachusetts-estate-tax">
              Massachusetts estate tax guide
            </Link>
            .
          </div>

          <h2>Why MA differs from federal DSUE</h2>
          <p>
            Federal portability is a statutory election tied to the federal unified credit system.
            Massachusetts estate tax under{" "}
            <a
              href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter65C"
              target="_blank"
              rel="noopener noreferrer"
            >
              M.G.L. c. 65C
            </a>{" "}
            is a separate regime. Filing a federal Form 706 for DSUE does not create Massachusetts
            portability. Couples who hear &ldquo;we&apos;re portable&rdquo; from a national article
            or a federal-only checklist can still have a large Massachusetts problem at the second
            death.
          </p>
          <p>
            That mismatch is especially important in the planning band between $2M and the federal
            exemption: state tax can be real while federal estate tax is still theoretical. Preserve
            My Estate readers in that band should treat Massachusetts as its own design problem.
          </p>

          <h2>A/B and credit shelter implications</h2>
          <p>
            Classic Massachusetts married planning uses a credit shelter trust (bypass / family /
            Trust B) funded with up to roughly $2M at the first death, plus a QTIP or other marital
            trust (Trust A) for the balance that qualifies for the marital deduction. The credit
            shelter trust is designed so its assets, and often their growth, are not included in
            the survivor&apos;s Massachusetts taxable estate. The survivor still has their own $2M
            framework at the second death.
          </p>
          <p>
            Without that structure, an &ldquo;I love you&rdquo; will that leaves everything
            outright to the spouse can waste the first exemption for Massachusetts purposes. A
            combined $4M estate may then face an estimated <b>~$180,800</b> Massachusetts estate tax
            at the second death under our educational estimator, versus a much smaller (or
            eliminated) state bill when both exemptions are used effectively. Worked structure
            detail lives in{" "}
            <Link href="/guides/ab-trust">A/B trust planning in Massachusetts</Link>.
          </p>
          <div className="callout">
            Documents alone are not enough. A credit shelter design that is never funded, deeds and
            accounts never retitled, fails at the worst moment. Coordination between attorney,
            CPA, and fiduciary advisor matters as much as the binder on the shelf.
          </div>

          <h2>Common myths</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Myth</th>
                  <th>Reality in Massachusetts (2026)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>&ldquo;Federal portability covers us here.&rdquo;</b>
                  </td>
                  <td>
                    DSUE is federal. Massachusetts does not import unused state exemption via that
                    election.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>&ldquo;We&apos;re under the federal exemption, so estate tax is irrelevant.&rdquo;</b>
                  </td>
                  <td>
                    Massachusetts can still tax estates above $2M after the $99,600 credit, with
                    rates toward 16%. Example: $3M → about $82,400; $6M → about $411,200
                    (illustrative).
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>&ldquo;Leaving everything to my spouse avoids tax forever.&rdquo;</b>
                  </td>
                  <td>
                    The marital deduction can defer tax to the second death; it does not create
                    portability of the first $2M exemption.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>&ldquo;Our revocable trust automatically uses both exemptions.&rdquo;</b>
                  </td>
                  <td>
                    Only if the document and funding create a true credit-shelter (or similar)
                    disposition at the first death, not merely a joint revocable trust with
                    outright survivor control of everything.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>What to do next</h2>
          <p>
            If you are married and your combined net worth, including home equity, approaches or
            exceeds $2M, ask whether your current documents capture both Massachusetts exemptions
            or only defer a larger tax. Then verify funding. Michael Cammarata, CFP®, at MSA
            Financial can help coordinate the financial side of that review; an estate planning
            attorney must draft or amend legal documents.
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
            <h3>Check whether both Massachusetts exemptions are actually in play</h3>
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
