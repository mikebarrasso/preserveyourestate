import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Disclosures",
  description:
    "Important disclosures for PreserveMyEstate.com, an educational website of MSA Financial, LLC, an SEC-registered investment adviser.",
  alternates: { canonical: "/disclosures" },
};

export default function DisclosuresPage() {
  return (
    <>
      <Nav solid />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap">
          <nav className="crumbs hero-anim d1">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Website Disclosures</span>
          </nav>
          <h1 className="hero-anim d2">
            Website Disclosures
          </h1>
          <p className="lead hero-anim d3">
            Educational information only. Please read these disclosures before relying on anything
            on this site.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <h2>Who we are</h2>
          <p>
            Investment advisory services are offered through MSA Financial, LLC, a Registered
            Investment Adviser (CRD #107768). Registration with the SEC does not imply a certain
            level of skill or training. Michael Cammarata is an Investment Adviser Representative
            of MSA Financial, LLC, and a CERTIFIED FINANCIAL PLANNER® practitioner.
          </p>
          <p>
            Additional information about the firm, including Form ADV Part 2A and 2B and Form CRS,
            is available at no charge:
          </p>
          <ul>
            <li>
              <a
                href="https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=1008692"
                rel="noopener noreferrer"
                target="_blank"
              >
                Form ADV Part 2A &amp; 2B
              </a>
            </li>
            <li>
              <a
                href="https://reports.adviserinfo.sec.gov/crs/crs_107768.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                Form CRS
              </a>
            </li>
            <li>
              <a
                href="https://adviserinfo.sec.gov/firm/summary/107768"
                rel="noopener noreferrer"
                target="_blank"
              >
                SEC IAPD firm summary
              </a>
            </li>
            <li>
              <a href="https://www.msaplan.com/disclosures" rel="noopener noreferrer" target="_blank">
                MSA Financial firm disclosures
              </a>
            </li>
          </ul>

          <h2>Educational content, not advice</h2>
          <p>
            This website is for educational purposes only. Nothing on this site is legal, tax, or
            investment advice, or a solicitation to buy or sell any security. Content is general in
            nature and does not consider your objectives, financial situation, or needs. Consult a
            qualified professional regarding your specific circumstances before making any decision.
          </p>
          <p>
            Michael Cammarata is not an attorney or CPA. He does not provide legal advice, draft
            legal documents, or prepare tax returns. He coordinates with clients&apos; existing
            estate attorneys and CPAs. When needed, he can help identify qualified independent
            professionals; clients choose and engage those professionals directly.
          </p>

          <h2>Tax estimates and calculators</h2>
          <p>
            Illustrative tax figures on this site reflect 2026 Massachusetts and federal law,
            including estimates under M.G.L. c. 65C. Results are estimates only and are not
            guaranteed. Actual results depend on facts such as asset ownership, deductions,
            elections, filing status, and future law. Individual situations vary.
          </p>

          <h2>Assets under management</h2>
          <p>
            References to assets under management are approximate figures for MSA Financial, LLC
            as of August 12, 2026, and will change over time.
          </p>

          <h2>Third-party research</h2>
          <p>
            References to asset-location value are drawn from Vanguard research (Kinniry et al.,{" "}
            <em>Putting a value on your value: Quantifying Vanguard Advisor&apos;s Alpha</em>),
            which estimates a potential annual after-tax benefit of 0–75 basis points. The ~$200K
            figure on this site is simple arithmetic (50 bps × a $2 million portfolio × 20 years)
            using a midpoint inside that range. It is not compounded, not MSA performance, and not
            a prediction of client results. Actual value varies with tax rates, asset mix, and
            account types, and may be zero.
          </p>

          <h2>No guarantees</h2>
          <p>
            Past performance does not guarantee future results. Coordinated planning, trust
            funding, tax-aware investing, and related strategies may not achieve their intended
            goals. Any discussion of tax, estate, or investment outcomes is hypothetical or
            educational unless it is clearly identified as an actual client result.
          </p>

          <h2>CFP® certification</h2>
          <p>
            CFP® and CERTIFIED FINANCIAL PLANNER® are certification marks owned by Certified
            Financial Planner Board of Standards, Inc. These marks are awarded to individuals who
            successfully complete CFP Board&apos;s initial and ongoing certification requirements.
          </p>

          <h2>Privacy</h2>
          <p>
            See our <Link href="/privacy">Privacy Policy</Link> for how this website handles
            information you submit.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
