import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Disclosures",
  description:
    "Important disclosures for the Preserve My Estate website operated in connection with Marino, Stram & Associates, LLC d/b/a MSA Financial, a Registered Investment Adviser.",
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
            Website <em>Disclosures</em>
          </h1>
          <p className="lead hero-anim d3">
            Important information about the Preserve My Estate website and MSA Financial, LLC.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <p className="article-meta">
            <span>Last updated July 2026</span>
          </p>

          <p>
            The Preserve My Estate website (preserveyourestate.com) is operated in connection with
            Marino, Stram &amp; Associates, LLC d/b/a MSA Financial (“MSA” or “MSA Financial”), a
            Registered Investment Adviser with the U.S. Securities and Exchange Commission (CRD
            #107768). Main office: Braintree, Massachusetts.
          </p>

          <h2>Educational content only</h2>
          <p>
            Content on this website, including articles, calculators, and checklists, is for
            educational and informational purposes only. Nothing on this site constitutes legal,
            tax, or investment advice, or a recommendation to buy or sell any security. Your
            situation is unique; consult qualified professionals regarding your specific
            circumstances before acting.
          </p>

          <h2>Not legal advice</h2>
          <p>
            Michael Cammarata, CFP®, is an Investment Adviser Representative of MSA Financial. He
            is not an attorney and does not provide legal advice. Estate planning documents are
            drafted by independent Massachusetts attorneys of the client&apos;s choosing. MSA may
            coordinate with those professionals but does not practice law.
          </p>

          <h2>Compensation and conflicts</h2>
          <p>
            MSA Financial is compensated primarily through advisory fees as described in Form ADV
            and Form CRS. Certain Advisory Persons, including Michael Cammarata, may also be
            licensed insurance professionals and may receive commissions if insurance products are
            implemented outside the advisory relationship. Clients are never obligated to purchase
            insurance or any product through MSA or its Advisory Persons. Full detail appears in
            Form ADV Part 2A/2B and Form CRS.
          </p>

          <h2>Registration does not imply a certain level of skill</h2>
          <p>
            Registration with the SEC as an investment adviser does not imply a certain level of
            skill or training. CERTIFIED FINANCIAL PLANNER® and CFP® are certification marks owned
            by the Certified Financial Planner Board of Standards, Inc. and are used with
            permission. Individuals who have met CFP Board criteria may use these marks.
          </p>

          <h2>Past performance and illustrations</h2>
          <p>
            Any figures, examples, tax estimates, or planning illustrations on this site are
            hypothetical or based on stated assumptions under then-current law (including 2026
            Massachusetts and federal rules where noted). Past performance is not indicative of
            future results. Individual results will vary. Calculators and scenarios are estimates
            only and are not guarantees of tax outcomes. Assets under management figures, where
            shown, reflect Form ADV reporting as of the stated date.
          </p>

          <h2>Complimentary review</h2>
          <p>
            A “complimentary review” or similar offer on this site is an educational conversation
            about your planning situation. It is not a free financial plan, legal engagement, or
            commitment to become a client, and it does not create an advisory relationship unless
            and until you enter into a written agreement with MSA Financial.
          </p>

          <h2>Form ADV and Form CRS</h2>
          <p>
            Additional information about MSA Financial, including fees, services, and conflicts of
            interest, is available in our Form ADV brochure and Form CRS:
          </p>
          <ul>
            <li>
              <a
                href="https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=1048932"
                rel="noopener noreferrer"
                target="_blank"
              >
                Form ADV Part 2A &amp; 2B (SEC IAPD)
              </a>
            </li>
            <li>
              <a
                href="https://reports.adviserinfo.sec.gov/crs/crs_107768.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                Form CRS (Customer Relationship Summary)
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
          </ul>

          <h2>Contact</h2>
          <p>
            Marino, Stram &amp; Associates, LLC d/b/a MSA Financial · 25 Braintree Hill Park, Suite
            303, Braintree, MA 02184 · <a href="tel:+17818433500">(781) 843-3500</a> · CRD #107768.
            For questions about this website, use the contact options on{" "}
            <Link href="/#booking">preserveyourestate.com</Link> or see{" "}
            <Link href="/locations">office locations</Link>.
          </p>

          <p className="fine" style={{ marginTop: "2.5rem" }}>
            Related: <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
