import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MsaLockup from "@/components/MsaLockup";
import GapCard, { type Gap } from "@/components/GapCard";
import CoordinationHub from "@/components/CoordinationHub";
import TeaserCalc from "@/components/TeaserCalc";
import ReadinessChecklist from "@/components/ReadinessChecklist";
import FitSection from "@/components/FitSection";
import Faq, { type FaqItem } from "@/components/Faq";
import { BookingForm } from "@/components/LeadForms";

const MAIN_OFFICE_PHONE = "(781) 843-3500";
const MAIN_OFFICE_PHONE_HREF = "tel:+17818433500";

const OFFICES = [
  {
    city: "Braintree",
    label: "South Shore headquarters",
    address: "25 Braintree Hill Park, Suite 303, Braintree, MA 02184",
  },
  {
    city: "Sandwich",
    label: "Cape Cod & the Islands",
    address: "90 Route 6A, Unit 4A, Sandwich, MA 02563",
  },
  {
    city: "Framingham",
    label: "MetroWest — by appointment",
    address: "Framingham, MA 01701",
  },
] as const;

const GAPS: Gap[] = [
  {
    num: "01", title: "The Unfunded Trust", tease: "Trusts that exist on paper but were never funded don't protect anything.", impact:
      "Revocable trusts require assets to be retitled into the trust's name, but many families sign the documents and never finish the funding. The result: probate anyway, and the tax planning inside the trust never activates.", statBig: "#1", statNote:
      "Trust funding gaps are among the most frequently identified issues in Massachusetts estate plan reviews.", }, {
    num: "02", title: "No Massachusetts Portability", tease: "A surviving spouse cannot inherit your Massachusetts exemption.", impact:
      "The federal exemption has been portable between spouses since 2010. Massachusetts has no portability: whatever exemption the first spouse doesn't use through planning is gone forever.", statBig: "$0", statNote: "Massachusetts portability benefit, unlike the $15M+ federal unified exemption.", }, {
    num: "03", title: "The RMD Timing Problem", tease: "Required Minimum Distributions can force income into the highest brackets at the worst time.", impact:
      "At 73, the IRS mandates IRA distributions whether you need the income or not, stacking on Social Security, pensions, and the Massachusetts surtax math.", statBig: "~$56,604", statNote: "Estimated first RMD on a $1.5M IRA at age 73 (IRS Uniform Lifetime Table).", }, {
    num: "04", title: "Massachusetts Estate Tax Exposure", tease: "The 2023 reform changed the structure, but not the exposure.", impact:
      "The 2023 reform replaced the estate-tax \"cliff\" with a graduated structure and a $99,600 credit sheltering the first $2M. Above that, rates climb toward 16%, and with local home values, ordinary families cross the line without noticing.", statBig: "$82,400", statNote: "Estimated MA estate tax on a $3M estate before planning (illustrative).", }, {
    num: "05", title: "The Millionaire Surtax", tease: "A 4% surtax applies above the 2026 threshold of $1,107,750, stacked on top of existing rates.", impact:
      "Massachusetts voters approved a 4% income surtax effective 2023. A single large capital gain, Roth conversion, or property sale can push an otherwise ordinary year over the 2026 threshold.", statBig: "~33%", statNote: "Combined capital-gains rate above the surtax threshold (federal + NIIT + MA + 4%).", }, {
    num: "06", title: "Disconnected Professionals", tease: "Your attorney, CPA, and advisor each do their part, in isolation.", impact:
      "The attorney drafts the trust. The CPA files the return. The advisor manages the portfolio. Each does their job well, and no one is responsible for making the three agree. The gaps between them are where plans fail.", statBig: "3", statNote: "Separate professionals who rarely coordinate, and one CFP® whose job is connecting them.", },
];

const FAQ_TEXT: { q: string; a: string }[] = [
  {
    q: "Does Massachusetts have an estate tax in 2026?", a: "Yes. Massachusetts taxes estates valued over $2 million, one of the lowest thresholds in the country. Rates are graduated up to 16%, applied after a $99,600 credit that shelters the first $2 million. Families who owe nothing federally may still owe six figures to Massachusetts. (M.G.L. c. 65C, 2026.)", }, {
    q: "Can a married couple avoid the Massachusetts estate tax?", a: "Often, largely yes, with planning. Massachusetts has no portability, so a surviving spouse cannot inherit the deceased spouse's $2 million exemption. A credit shelter (A/B) trust preserves both exemptions, shielding roughly $4 million for a couple, but only if the trust is properly drafted and funded.", }, {
    q: "Does life insurance count toward the Massachusetts estate tax?", a: "Generally yes, if you own the policy, death benefits are included in your taxable estate even though they pass income-tax-free to beneficiaries. An Irrevocable Life Insurance Trust (ILIT), properly structured and funded, can remove the proceeds from the estate.", }, {
    q: "Is Michael an estate planning attorney?", a: "No. Michael Cammarata is a CERTIFIED FINANCIAL PLANNER® and Managing Partner at MSA Financial, LLC. He does not draft legal documents or provide legal advice. His role is coordination: aligning your portfolio, tax strategy, and estate structure, working alongside independent Massachusetts estate attorneys and CPAs.", }, {
    q: "What is the Massachusetts Millionaire Surtax?", a: "A 4% surtax on annual income above an inflation-indexed threshold ($1,107,750 for tax year 2026), approved by voters effective 2023. It stacks on top of the standard 5% rate and can be triggered by a single event: a business sale, a large capital gain, or an aggressive Roth conversion.", }, {
    q: "Do I need $2 million to work with Michael?", a: "The practice is built for Massachusetts households with $2 million or more in investable assets. That's where estate-tax coordination pays for itself many times over. If you're close to that line, it's still worth a conversation: the years before you cross it are often the best planning window.", },
];

const FAQ_ITEMS: FaqItem[] = [
  FAQ_TEXT[0], {
    q: "How much is the estate tax on a $3 million Massachusetts estate?", a: (
      <>
        Approximately $82,400 before planning, under 2026 law (illustrative). The tax is computed
        on a graduated scale after the $99,600 credit. Coordinated trust planning can reduce this
        substantially. <Link href="/calculator">Model your own estate here</Link>.
      </>
    ), }, ...FAQ_TEXT.slice(1),
];

const JSON_LD = {
  "@context": "https://schema.org", "@graph": [
    {
      "@type": ["FinancialService", "Organization"], "@id": "https://preservemyestate.com/#org", name: "MSA Financial, LLC", url: "https://preservemyestate.com/", telephone: "+1-781-843-3500", foundingDate: "1997", description:
        "Independent SEC-registered investment adviser (CRD #107768) providing coordinated wealth, estate, and tax planning across Massachusetts.", address: OFFICES.map((office) => ({
        "@type": "PostalAddress", addressLocality: office.city, addressRegion: "MA", streetAddress: office.address,
      })), areaServed: { "@type": "State", name: "Massachusetts" }, sameAs: ["https://www.msaplan.com/", "https://adviserinfo.sec.gov/firm/summary/107768"], }, {
      "@type": "Person", "@id": "https://preservemyestate.com/#michael", name: "Michael Cammarata", honorificSuffix: "CFP®", jobTitle: "Managing Partner and Owner", image: "https://preservemyestate.com/michael-cammarata.jpg", worksFor: { "@id": "https://preservemyestate.com/#org" }, knowsAbout: [
        "Massachusetts estate tax", "Roth conversion planning", "trust funding", "tax-efficient investing", ], }, { "@type": "WebSite", url: "https://preservemyestate.com/", name: "Preserve My Estate" }, {
      "@type": "FAQPage", mainEntity: FAQ_TEXT.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a }, })), }, ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav />

      {/* ═══════════ ACT 1 · MAKE IT PERSONAL ═══════════ */}

      {/* ---- Hero ---- */}
      <Hero />

      {/* ---- Proof row: credibility before the first ask ---- */}
      <div className="proof-row" aria-label="Firm credentials">
        <span>Since 1997</span>
        <span>~$1.5B Assets Under Management</span>
        <span>SEC-Registered RIA</span>
        <span>CFP® Fiduciary</span>
        <span>7 Advisors</span>
      </div>

      {/* ---- The Problem: Six Gaps ---- */}
      <section id="problem">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Six Coordination Gaps</p>
            <h2>
              The six places where Massachusetts estate plans <em>silently fail</em>
            </h2>
            <p className="lead">
              The gaps most commonly found in existing Massachusetts plans. They&apos;re
              investment problems as much as legal ones.
            </p>
          </div>
          <div className="grid g3 stagger">
            {GAPS.map((gap) => (
              <GapCard key={gap.num} gap={gap} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Calculator: make the problem personal ---- */}
      <section className="calc-teaser" id="calc">
        <div className="wrap calc-teaser-grid">
          <div className="reveal">
            <p className="eyebrow">The Number That Changes the Conversation</p>
            <h2>
              What would Massachusetts take? <em>Get the number in 60&nbsp;seconds.</em>
            </h2>
            <p className="lead" style={{ marginTop: "1.1rem" }}>
              Set your estate&apos;s approximate value (home, retirement accounts, investments,
              life insurance) and see your estimated Massachusetts estate tax under 2026 law.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn-gold" href="/calculator">
                See the Full Breakdown <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <TeaserCalc />
        </div>
      </section>

      {/* ═══════════ ACT 2 · THE ANSWER ═══════════ */}

      {/* ---- Coordination Hub (the solution) ---- */}
      <CoordinationHub />

      {/* ---- Tax-Efficient Wealth ---- */}
      <section id="tax" className="bg-cream">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Tax-Efficient Wealth Management</p>
            <h2>
              Investment management with the estate and tax picture{" "}
              <em>built in, not bolted on</em>
            </h2>
            <p className="lead">
              Investment performance matters. After-tax, after-estate-tax performance matters
              more.
            </p>
          </div>
          <div className="tax-grid">
            <div>
              <ul className="strategy-list stagger">
                <li>
                  <h3>Asset Location Strategy</h3>
                  <p>
                    Tax-inefficient assets in tax-deferred accounts; tax-efficient assets in
                    taxable accounts: a 2–8 percentage point difference in effective tax rate,
                    compounding every year.
                  </p>
                </li>
                <li>
                  <h3>Roth Conversion Calibration</h3>
                  <p>
                    The optimal conversion amount each year: above your current bracket floor,
                    below the next bracket, IRMAA tier, and surtax threshold.
                  </p>
                </li>
                <li>
                  <h3>Capital Gains Management</h3>
                  <p>
                    Multi-year gain recognition, tax-loss harvesting, specific-lot
                    identification, and step-up-in-basis awareness so gains land in the right
                    tax years.
                  </p>
                </li>
                <li>
                  <h3>Appreciated Asset Strategy</h3>
                  <p>
                    Donor-advised funds, charitable remainder trusts, and ILIT funding with
                    appreciated securities reduce income and estate tax in one motion.
                  </p>
                </li>
              </ul>
              <div className="rate-tiles reveal">
                <div className="rate-tile">
                  <b data-count="29" data-suffix="%">0%</b>
                  <span>
                    Combined federal + MA + NIIT rate on capital gains for high-income earners
                  </span>
                </div>
                <div className="rate-tile">
                  <b data-count="42" data-suffix="%">0%</b>
                  <span>
                    Combined marginal rate on RMD income (37% federal + 5% MA), higher above the
                    surtax line
                  </span>
                </div>
              </div>
              <p className="fine" style={{ marginTop: "1.2rem" }}>
                Individual situations vary. These figures are educational, reflect 2026
                Massachusetts and federal law, and do not constitute tax advice. Consult your CPA
                regarding your specific circumstances.
              </p>
            </div>
            <div className="chart-card reveal-scale">
              <h3>The compounding edge of asset location</h3>
              <p>
                Placing the right assets in the right account type reduces your effective tax rate
                by an estimated 2–8 percentage points a year: small and quiet, but compounding
                every year you hold.
              </p>
              <div
                style={{
                  marginTop: "1.8rem", paddingTop: "1.6rem", borderTop: "1px solid var(--line)", }}
              >
                <b
                  className="serif"
                  style={{
                    display: "block", fontSize: "clamp(2.2rem, 4vw, 2.9rem)", fontWeight: 600, color: "var(--gold)", lineHeight: 1.05, }}
                >
                  $200K–$500K+
                </b>
                <span
                  style={{
                    display: "block", marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--muted-ink)", lineHeight: 1.55, }}
                >
                  Estimated lifetime value of coordinated asset location on a $2M+ portfolio, over a
                  20-year horizon (illustrative).
                </span>
              </div>
              <p className="fine" style={{ marginTop: "1.4rem" }}>
                <Link href="/calculator">See your estate tax number →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ACT 3 · WHY TRUST HIM ═══════════ */}

      {/* ---- About Michael ---- */}
      <section id="about">
        <div className="wrap about-grid">
          <div className="about-copy reveal">
            <p className="eyebrow">About Michael</p>
            <h2 style={{ margin: "1rem 0 1.4rem" }}>
              See the entire financial picture.{" "}
              <em>Keep every part working together.</em>
            </h2>
            <p>
              Michael Cammarata is a CERTIFIED FINANCIAL PLANNER® practitioner and an owner and
              Managing Partner of MSA Financial, LLC. For more than two decades, he has helped
              families, business owners, and executives make informed decisions about their
              wealth—particularly when investment management, retirement, taxes, and estate
              planning intersect.
            </p>
            <p>
              For many clients, the relationship begins with a specific concern: Massachusetts
              estate-tax exposure, an outdated or unfunded trust, a business transition, a
              concentrated investment position, or uncertainty about generating dependable
              retirement income. Michael&apos;s role is to look beyond the immediate question and
              determine how each decision affects the client&apos;s complete financial picture.
            </p>
            <p>
              Preserve My Estate reflects an important part of Michael&apos;s practice, but not
              its full scope. His work includes comprehensive financial planning, investment
              management, retirement-income planning, Roth-conversion and RMD strategies,
              capital-gains management, charitable planning, trust-funding and beneficiary
              reviews, business-owner succession planning, and executive compensation strategies.
            </p>
            <p>
              Michael believes affluent families rarely suffer from a lack of professional
              advice. The more common problem is that their financial advisor, estate attorney,
              and CPA are working independently—with no one responsible for connecting their
              recommendations or ensuring that the plan is implemented.
            </p>
            <p>
              Michael serves as that central point of coordination. He works alongside each
              client&apos;s existing professionals—or helps identify qualified independent
              professionals when needed—to align the estate documents, tax strategy, investment
              portfolio, and retirement plan around the same objectives. He does not draft legal
              documents or prepare tax returns.
            </p>
            <p>
              As both a financial advisor and an owner of his own business, Michael understands
              that financial decisions affect more than an account balance. They influence a
              family&apos;s lifestyle, employees, business partners, future opportunities, and the
              legacy an owner ultimately wants to leave.
            </p>
            <p>
              Michael&apos;s clients receive the personal attention of a boutique advisory
              relationship backed by the strength and resources of MSA Financial—the independent
              advisory firm he owns and leads alongside his partners. Established in 1997, MSA
              Financial is an SEC-registered investment adviser managing approximately $1.5
              billion in client assets.
            </p>
            <p>
              Michael&apos;s objective is straightforward: help clients see the entire financial
              picture, make thoughtful decisions, and keep every part of their financial lives
              working together over time.
            </p>
            <div className="about-badges">
              <span className="badge">CFP®</span>
              <span className="badge">Managing Partner and Owner</span>
              <span className="badge">Fiduciary</span>
              <span className="badge">Fee-Based</span>
              <span className="badge">RIA · MSA Financial, LLC</span>
            </div>
            <a className="btn btn-navy" href="#booking">
              Schedule a 45-Minute Review <span className="arrow">→</span>
            </a>
          </div>
          <div className="about-side reveal-scale">
            <div className="portrait-card">
              <Image
                className="portrait-photo"
                src="/michael-cammarata.jpg"
                alt="Michael Cammarata, CFP®"
                width={190}
                height={190}
                sizes="190px"
              />
              <h3>Michael Cammarata, CFP®</h3>
              <p className="role">Managing Partner and Owner · MSA Financial, LLC</p>
              <p className="advisor-note">
                Michael coordinates closely with clients&apos; CPAs and estate attorneys. When a
                client needs a professional, he can help identify qualified independent advisors;
                clients choose and engage those professionals directly.
              </p>
              <hr />
              <MsaLockup />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Learn: Guides + Insights (merged) ---- */}
      <section id="guides" className="bg-cream">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Learn</p>
            <h2>
              Deep-dive guides and current thinking on{" "}
              <em>Massachusetts estate &amp; tax planning</em>
            </h2>
            <p className="lead">Expert-level guides. No jargon. No pitch.</p>
          </div>
          <div className="grid g3 stagger">
            <Link className="guide-card" href="/guides/ab-trust">
              <span className="guide-tag">Estate Structure</span>
              <h3>The Marital Deduction Trust &amp; A/B Trust Planning</h3>
              <p>
                How Credit Shelter Trusts and QTIP structures preserve both spouses&apos;
                exemptions, with a worked example for an $8M estate.
              </p>
              <span className="guide-meta">
                <span>12 min read</span>
                <span className="text-link">Read Guide →</span>
              </span>
            </Link>
            <a className="guide-card" href="#booking-guide">
              <span className="guide-tag">Estate Execution</span>
              <h3>Trust Funding &amp; Asset Titling: The Step Most Families Skip</h3>
              <p>
                A trust that isn&apos;t properly funded is a trust that doesn&apos;t work. The
                asset-by-asset process for making yours real.
              </p>
              <span className="guide-meta">
                <span>Free PDF guide</span>
                <span className="text-link">Get the Guide →</span>
              </span>
            </a>
            <a className="guide-card" href="#booking-guide">
              <span className="guide-tag">Retirement Income</span>
              <h3>The Roth Conversion Window: Your Last Decade of Tax Flexibility</h3>
              <p>
                The years between retirement and RMDs are a narrow, irreversible opportunity to
                reduce lifetime taxes. How to use them.
              </p>
              <span className="guide-meta">
                <span>Free PDF guide</span>
                <span className="text-link">Get the Guide →</span>
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* ---- Locations ---- */}
      <section id="locations">
        <div className="wrap loc-grid">
          <div className="reveal">
            <p className="eyebrow">Serving Massachusetts</p>
            <h2 style={{ margin: "1rem 0 1.2rem" }}>
              Three locations. <em>One cohesive planning team.</em>
            </h2>
            <p className="lead" style={{ marginBottom: "1rem" }}>
              Offices in Braintree (South Shore headquarters), Sandwich (Cape Cod &amp; the
              Islands), and Framingham (MetroWest), serving families across Massachusetts.
            </p>
            <ul className="loc-list">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <b>
                    <span className="pin" aria-hidden="true">◆</span>
                    {office.city}
                  </b>
                  <span>{office.address}</span>
                  <span>
                    <a href={MAIN_OFFICE_PHONE_HREF}>{MAIN_OFFICE_PHONE}</a>
                    {" · "}
                    Main-office receptionist
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="map-card reveal-scale">
            <video
              className="loc-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/locations-poster.jpg"
              aria-label="Massachusetts coastal landscape"
            >
              <source src="/locations-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ═══════════ ACT 4 · QUALIFY & CONVERT ═══════════ */}

      {/* ---- Fit ---- */}
      <FitSection />

      {/* ---- Readiness Checklist ---- */}
      <section id="readiness">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Your Planning Readiness</p>
            <h2>
              How coordinated is your <em>current estate plan?</em>
            </h2>
            <p className="lead">
              Check each item that&apos;s confirmed and in place. Your score updates as you go.
            </p>
          </div>
          <ReadinessChecklist />
        </div>
      </section>

      {/* ---- The Close: Complimentary Review + Booking (Second-Opinion hook folded in) ---- */}
      <section id="booking" className="bg-cream">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: "820px" }}>
            <p className="eyebrow">The Complimentary Review</p>
            <h2>
              Already have an advisor, an attorney, a CPA? Good.{" "}
              <em>The question is whether they&apos;re talking to each other.</em>
            </h2>
            <p className="lead">
              A focused 45 minutes, no cost and no obligation. Here&apos;s exactly what
              you&apos;ll walk away with.
            </p>
          </div>

          <div className="form-section-grid" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
            <div className="reveal">
              <ol className="deliv">
                <li>
                  <h3>Your estate tax exposure, in dollars.</h3>
                  <p>
                    What your estate would owe under Massachusetts law today, and what it could
                    owe with coordinated planning in place.
                  </p>
                </li>
                <li>
                  <h3>Whether your trust is actually working.</h3>
                  <p>
                    Whether your assets (deeds, accounts, beneficiaries) are actually titled into
                    the trust, not just whether the documents are current.
                  </p>
                </li>
                <li>
                  <h3>Where your Roth conversion window stands.</h3>
                  <p>
                    Whether the opportunity is still open and how it interacts with IRMAA
                    surcharges and the Massachusetts surtax.
                  </p>
                </li>
                <li>
                  <h3>Any gaps, named in writing. Or confirmation there are none.</h3>
                  <p>
                    Either way, from a fiduciary with no product to sell, whether or not we ever
                    speak again.
                  </p>
                </li>
              </ol>
              <p className="fine" style={{ marginTop: "1.6rem", maxWidth: "440px" }}>
                Michael Cammarata, CFP®, is an Investment Adviser Representative of MSA
                Financial, LLC (CRD #107768), a Registered Investment Adviser. This is a
                complimentary educational conversation, not investment advice or a solicitation
                to buy or sell any security.
              </p>
            </div>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ---- FAQ: objection handling ---- */}
      <section id="faq">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Common Questions</p>
            <h2>
              Massachusetts estate &amp; tax planning, <em>answered plainly</em>
            </h2>
          </div>
          <Faq items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ---- Guide banner: low-commitment path into the single form ---- */}
      <section className="bg-navy guide-banner" id="guide">
        <div className="wrap reveal" style={{ textAlign: "center", maxWidth: "720px" }}>
          <p className="eyebrow">Not Ready to Talk? Start Here</p>
          <h2 style={{ margin: "1rem 0" }}>
            The 2026 Massachusetts Pre-Retiree&apos;s Guide to <em>Estate &amp; Tax Planning</em>
          </h2>
          <p className="lead" style={{ color: "var(--silver)", margin: "0 0 1.8rem" }}>
            Twelve pages covering the six decisions Massachusetts families most often get wrong,
            explained plainly. Free, by email.
          </p>
          <a className="btn btn-gold" href="#booking-guide">
            Get the Free Guide <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <Footer />

      <div className="sticky-cta">
        <Link className="btn btn-gold" href="/calculator">
          Calculate Your MA Estate Tax →
        </Link>
      </div>
    </>
  );
}
