import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tax-Efficient Wealth Management in Massachusetts | MSA Financial",
  description:
    "Wealth management that connects your investments to your estate and tax plan, with coordinated planning for Massachusetts families.",
  alternates: { canonical: "/wealth-management" },
  openGraph: {
    type: "website",
    url: "/wealth-management",
    siteName: "Preserve Your Estate",
    title: "Tax-Efficient Wealth Management in Massachusetts | MSA Financial",
    description:
      "Wealth management that connects your investments to your estate and tax plan, with coordinated planning for Massachusetts families.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://preservemyestate.com/wealth-management#service",
  name: "Tax-Efficient Wealth Management",
  description:
    "Fee-based wealth management and financial coordination for Massachusetts families, connecting investment decisions with estate and tax planning.",
  url: "https://preservemyestate.com/wealth-management",
  provider: {
    "@type": "FinancialService",
    "@id": "https://preservemyestate.com/#org",
    name: "MSA Financial, LLC",
    url: "https://preservemyestate.com",
  },
  areaServed: { "@type": "State", name: "Massachusetts" },
  serviceType: "Tax-Efficient Wealth Management",
};

export default function WealthManagementPage() {
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
            <span>Wealth Management</span>
          </nav>
          <h1 className="hero-anim d2">
            Tax-efficient <em>wealth management</em> for Massachusetts families
          </h1>
          <p className="lead hero-anim d3">
            Investment decisions can affect your estate plan and tax picture. MSA Financial provides
            fee-based wealth management as a fiduciary, with a coordinated view of the people and
            decisions already involved in your plan.
          </p>
          <div className="hero-ctas hero-anim d4">
            <Link className="btn btn-gold" href="/#booking">
              Book a Consultation <span className="arrow">→</span>
            </Link>
            <Link className="btn btn-ghost" href="/calculator">
              Use the Estate Tax Calculator
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <h2>Wealth management that connects the moving parts</h2>
          <p>
            Wealth management involves more than selecting or monitoring investments. For many
            Massachusetts families, account ownership, beneficiary designations, trust funding,
            retirement income needs, and tax considerations all need to be considered alongside the
            investment plan. Those decisions may involve trade-offs and depend on your personal,
            legal, and tax circumstances.
          </p>
          <p>
            Michael Cammarata, CFP®, serves as a financial coordinator. He helps organize financial
            information, keeps the investment plan in view, and coordinates with your CPA and estate
            attorney so the professionals you choose can work from a clearer, more complete picture.
          </p>

          <h2>How the service works</h2>
          <div className="grid g3 stagger">
            <div className="coord-card">
              <h3>Start with the full picture</h3>
              <p>
                We review financial accounts, cash-flow needs, account registrations, beneficiary
                designations, insurance, real estate, and other information relevant to your financial
                plan.
              </p>
            </div>
            <div className="coord-card">
              <h3>Connect investment and planning decisions</h3>
              <p>
                Investment management is considered alongside your retirement, estate, and tax
                planning questions. Tax treatment can change and should be evaluated with your CPA.
              </p>
            </div>
            <div className="coord-card">
              <h3>Coordinate with your professionals</h3>
              <p>
                Your attorney provides legal advice and prepares legal documents. Your CPA provides
                tax advice and prepares tax returns. MSA Financial coordinates the financial planning
                information relevant to those discussions.
              </p>
            </div>
          </div>

          <h2>Who this service is designed for</h2>
          <p>
            This service is designed for Massachusetts households seeking a coordinated approach to
            wealth management, particularly when an estate plan, multiple account types, family
            decisions, business interests, or changing retirement needs create planning questions.
            A consultation can help determine whether the scope of service fits your circumstances.
          </p>
          <div className="callout reveal">
            <p>
              <b>Estate planning and investments need shared context.</b> If your estate may exceed
              Massachusetts&apos; estate tax threshold, begin with an educational estimate using the{" "}
              <Link href="/calculator">Massachusetts estate tax calculator</Link>. It is a planning
              tool, not legal or tax advice.
            </p>
          </div>

          <h2>Beyond an investment-only relationship</h2>
          <p>
            An investment-only relationship may focus narrowly on accounts. MSA Financial&apos;s approach
            is designed to keep financial decisions connected to the documents, tax questions, and
            professional relationships that can shape a broader plan. This does not replace legal or
            tax advice, and it does not determine which legal structure or tax treatment is right for
            you.
          </p>
          <p>
            For married families considering how trusts may fit into their planning conversations,
            read the educational <Link href="/guides/ab-trust">A/B trust planning guide</Link>. Any
            trust structure should be evaluated and drafted by a qualified estate planning attorney.
          </p>

          <div className="next-step reveal-scale">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>Discuss the financial decisions that need coordination</h3>
            <p>
              Book a consultation to discuss your current financial plan, investment accounts, and
              the questions you may want to bring to your CPA and estate attorney.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-gold" href="/#booking">
                Book a Consultation <span className="arrow">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/calculator">
                Estimate Your Massachusetts Estate Tax
              </Link>
            </div>
          </div>

          <p className="fine guide-disclosure" style={{ marginTop: "2rem" }}>
            Investment advisory services are offered through MSA Financial, LLC, a Registered
            Investment Adviser (CRD #107768). MSA Financial is an SEC-registered investment adviser.
            Registration with the SEC does not imply a certain level of skill or training. Michael
            Cammarata is not an attorney or CPA and does not provide legal or tax advice. He does not
            draft legal documents or prepare tax returns. He coordinates with clients&apos; existing estate
            attorneys and CPAs.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
