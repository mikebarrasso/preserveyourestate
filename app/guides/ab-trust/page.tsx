import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "A/B Trust Planning in Massachusetts (2026)";
const description =
  "How A/B trusts help married Massachusetts couples use both $2M exemptions. See an $8M worked example. Read the guide by Michael Cammarata, CFP®.";
const pageUrl = `${SITE_ORIGIN}/guides/ab-trust`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/ab-trust",
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
      headline: "The Marital Deduction Trust & A/B Trust Planning in Massachusetts",
      description:
        "How Credit Shelter Trusts and QTIP structures allow married Massachusetts couples to use both spouses' exemptions.",
      url: pageUrl,
      datePublished: "2026-07-01",
      dateModified: "2026-07-20",
    }),
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Guides", item: `${SITE_ORIGIN}/guides` },
      { name: "A/B Trust Planning", item: pageUrl },
    ]),
  ],
};

export default function AbTrustGuide() {
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
            <span>A/B Trust Planning</span>
          </nav>
          <h1 className="hero-anim d2">
            The Marital Deduction Trust &amp; <em>A/B Trust Planning</em>
          </h1>
          <p className="lead hero-anim d3">
            How Credit Shelter Trusts and QTIP structures allow married Massachusetts couples to
            use both spouses&apos; exemptions, with a full illustrative example for an $8M
            combined estate.
          </p>
          <p className="hero-anim d4" style={{ marginTop: "1.4rem" }}>
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "var(--gold-pale)", }}
            >
              Estate Structure · 12 min read
            </span>{" "}
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "var(--gold-pale)", }}
            >
              Updated July 2026
            </span>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <h2>The problem this solves</h2>
          <p>
            Massachusetts does not allow portability between spouses. When the first spouse dies, their unused Massachusetts estate tax exemption disappears, it cannot be transferred
            to the surviving spouse. Without planning, a married couple with a $4M combined estate
            uses only one $2M exemption. The surviving spouse&apos;s estate is taxed on everything
            above $2M at the second death.
          </p>
          <div className="callout reveal">
            A married couple with a $4M combined estate and no trust planning faces an estimated
            Massachusetts estate tax bill of approximately <b>$180,800</b> at the second death.
            With an A/B trust structure, that bill can be reduced substantially, or eliminated
            entirely.
          </div>

          <h2>How the A/B trust works</h2>
          <p>
            The Credit Shelter Trust, also called the bypass trust, family trust, or Trust B, captures up to $2M at the first spouse&apos;s death and holds it in a separate trust
            that bypasses the surviving spouse&apos;s estate at the second death. The remaining
            estate passes to the QTIP Trust (Trust A), qualifying for the Massachusetts marital
            deduction and deferring tax until the second death.
          </p>

          <h3>Trust A: the QTIP Trust (Marital Trust)</h3>
          <p>
            The QTIP Trust (Qualified Terminable Interest Property) receives the balance of the
            estate above the credit shelter amount. All income must be distributed to the surviving
            spouse annually. The personal representative elects QTIP treatment for Massachusetts on{" "}
            <b>Form M-706</b> (irrevocable; independent of any federal QTIP election on Form 706),
            qualifying the trust for the Massachusetts marital deduction. At the second death, the
            QTIP assets are included in the surviving spouse&apos;s estate, but the $2M credit
            framework applies, and the credit shelter trust has already bypassed the estate.
          </p>

          <h3>Trust B: the Credit Shelter Trust (Bypass Trust)</h3>
          <p>
            Up to $2M flows into the Credit Shelter Trust at the first death. The surviving spouse
            may receive income from this trust and may have limited access to principal for health, education, maintenance, and support (the HEMS standard). At the second death, the
            entire credit shelter trust, including any growth, bypasses the surviving
            spouse&apos;s estate and passes directly to heirs.
          </p>

          <h2>Illustrative example: an $8M Massachusetts estate</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Result at second death</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>No trust planning</b>: everything to surviving spouse outright
                  </td>
                  <td>
                    Full $8M in the surviving spouse&apos;s estate under one $2M credit framework.
                    Estimated Massachusetts estate tax: <b>~$673,600</b>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>A/B trust plan</b>: $2M to credit shelter trust, $6M to QTIP
                  </td>
                  <td>
                    Credit shelter trust bypasses the estate. QTIP uses the surviving spouse&apos;s
                    $2M credit framework. Estimated tax on the ~$6M QTIP estate:{" "}
                    <b>~$411,200</b> (illustrative savings of ~$262,400 vs no planning).
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Credit shelter trust after 10 years</b> at 6% growth
                  </td>
                  <td>
                    Trust may grow to ~$3.6M, all bypassing the survivor&apos;s estate. If that
                    ~$1.6M of growth stayed in the taxable estate instead, estimated extra tax is
                    on the order of <b>~$200,000+</b> at these estate sizes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fine">
            Illustrative only. Actual results depend on asset values, growth rates, and individual
            circumstances. Consult a qualified estate planning attorney and CFP® for analysis
            specific to your situation.
          </p>

          <h2>The QTIP election (Massachusetts and federal)</h2>
          <p>
            For Massachusetts estate tax, the QTIP election is made on <b>Form M-706</b> and is
            irrevocable once filed. It is separate from any federal QTIP election under IRC
            §2056(b)(7) on Form 706. All trust income must be distributed to the surviving spouse
            at least annually. The surviving spouse may not have a general power of appointment
            over the QTIP assets; that is what allows the first spouse to control the ultimate
            disposition to children or other beneficiaries.
          </p>

          <h2>What a CFP® does, and doesn&apos;t do</h2>
          <p>
            The A/B trust is a legal document drafted by a Massachusetts estate planning attorney.
            Michael Cammarata, CFP®, does not draft legal documents, does not provide legal advice, and does not prepare tax returns. His role is coordination: ensuring the trust is
            properly funded after drafting, the portfolio is positioned consistently with the
            estate structure, and the strategy is reviewed annually as asset values and
            Massachusetts law change.
          </p>
          <div className="callout">
            The most common failure in Massachusetts A/B trust planning is not a bad document, it
            is a trust that was drafted, signed, and filed away without the assets ever being
            retitled into it. <b>A trust that isn&apos;t funded is a trust that doesn&apos;t work.</b>
          </div>

          <div className="byline-card">
            <AuthorPortrait />
            <div>
              <b>Michael Cammarata, CFP®</b>
              <p>
                Managing Partner, MSA Financial, LLC (CRD #107768), an independent RIA managing
                ~$1.4B AUM as of Dec. 31, 2025. Michael coordinates wealth, estate, and tax planning for
                Massachusetts families with $2M+ in investable assets.
              </p>
            </div>
          </div>

          <div className="next-step reveal-scale">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>See how your Massachusetts estate is currently structured</h3>
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
            (CRD #107768), a Registered Investment Adviser. This article is for educational
            purposes only. Not legal or tax advice.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
