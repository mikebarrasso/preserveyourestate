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
    siteName: "MSA Financial",
    title: "Tax-Efficient Wealth Management in Massachusetts | MSA Financial",
    description:
      "Wealth management that connects your investments to your estate and tax plan, with coordinated planning for Massachusetts families.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://www.preserveyourestate.com/wealth-management#service",
  name: "Tax-Efficient Wealth Management",
  description:
    "Fee-based wealth management and financial coordination for Massachusetts families, connecting investment decisions with estate and tax planning.",
  url: "https://www.preserveyourestate.com/wealth-management",
  provider: {
    "@type": "FinancialService",
    "@id": "https://www.preserveyourestate.com/#org",
    name: "MSA Financial, LLC",
    url: "https://www.preserveyourestate.com",
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

          <h2>Why tax-efficient wealth management matters</h2>
          <p>
            Taxes can affect the value available to spend, give, or transfer, but they are only one
            part of a financial decision. A withdrawal, account transfer, change in ownership, or
            estate-planning decision may have consequences beyond the account where it begins. A
            tax-aware approach keeps those questions visible before they become isolated decisions.
          </p>
          <p>
            For Massachusetts families, the connection can be especially important when retirement
            income, concentrated family assets, real estate, charitable goals, or estate-tax exposure
            are part of the picture. Tax rules can change, and the appropriate approach depends on
            individual circumstances, which is why legal and tax questions remain with your attorney
            and CPA.
          </p>

          <h2>What a tax-efficient approach looks at</h2>
          <ul className="strategy-list stagger">
            <li>
              <h3>Account-level context</h3>
              <p>
                How account types, ownership, and beneficiary designations fit the financial plan and
                the questions your other professionals need to evaluate.
              </p>
            </li>
            <li>
              <h3>Timing and cash-flow needs</h3>
              <p>
                How planned withdrawals, income needs, and major financial decisions may interact with
                the current tax year and your longer-term plan.
              </p>
            </li>
            <li>
              <h3>Estate and trust alignment</h3>
              <p>
                Whether account registrations and beneficiary information are consistent with the
                documents your estate attorney has prepared, including any trust-funding follow-up.
              </p>
            </li>
            <li>
              <h3>Ongoing coordination</h3>
              <p>
                A clearer process for sharing relevant financial information with your CPA and estate
                attorney as circumstances, family decisions, or laws change.
              </p>
            </li>
          </ul>
          <p>
            This approach is designed to help organize decisions and identify questions, not to
            guarantee a tax result or replace the advice of your CPA or attorney.
          </p>

          <h2>How the service works</h2>
          <div className="process-grid">
            <div className="step">
              <div className="step-dot">1</div>
              <span className="step-tag">Review</span>
              <h3>Gather the full picture</h3>
              <p>Bring together accounts, cash-flow needs, estate documents, and key planning questions.</p>
            </div>
            <div className="step">
              <div className="step-dot">2</div>
              <span className="step-tag">Connect</span>
              <h3>Put decisions in context</h3>
              <p>Consider investment decisions alongside retirement, estate, and tax-planning priorities.</p>
            </div>
            <div className="step">
              <div className="step-dot">3</div>
              <span className="step-tag">Coordinate</span>
              <h3>Work with your professionals</h3>
              <p>Share relevant financial information with the CPA and estate attorney you choose.</p>
            </div>
            <div className="step">
              <div className="step-dot">4</div>
              <span className="step-tag">Maintain</span>
              <h3>Revisit as life changes</h3>
              <p>Review the plan as financial, family, or legal circumstances change.</p>
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
