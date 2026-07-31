import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Roth Conversion Strategy for Massachusetts Estates";
const description =
  "How Roth conversions fit estate and tax planning for Massachusetts affluent households: income-tax tradeoffs, IRMAA, brackets, RMDs, and coordination with A/B trust planning.";
const pageUrl = `${SITE_ORIGIN}/guides/roth-conversion`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/roth-conversion",
  },
  openGraph: {
    url: pageUrl,
    title,
    description,
  },
};

const FAQ = [
  {
    q: "What is a Roth conversion?",
    a: "A Roth conversion moves money from a traditional IRA (or similar pre-tax retirement account) into a Roth IRA. You generally pay ordinary income tax on the converted amount in the year of conversion. Qualified Roth withdrawals later can be income-tax-free, and Roth IRAs are not subject to lifetime RMDs for the original owner under current federal rules.",
  },
  {
    q: "Why do Roth conversions matter for estate planning?",
    a: "Conversions can reduce future taxable RMDs, manage the size of pre-tax accounts heirs will inherit, and shift the income-tax burden from later years (or from heirs) into years you choose. They interact with overall estate liquidity, charitable plans, and trust design, so they should not be decided in isolation from the estate plan.",
  },
  {
    q: "How does Massachusetts tax Roth conversions?",
    a: "Converted amounts are generally included in Massachusetts taxable income in the year of conversion, in addition to federal tax. Large conversions can also interact with the Massachusetts 4% surtax on income above the inflation-indexed threshold ($1,107,750 for tax year 2026). Coordinate with your CPA before executing sizeable conversions.",
  },
  {
    q: "What is IRMAA and why does it matter?",
    a: "IRMAA is the Income-Related Monthly Adjustment Amount: higher Medicare Part B and Part D premiums for higher-income beneficiaries. Medicare uses a lookback (typically two years) to modified adjusted gross income. A large conversion can raise premiums in a later year even if the conversion itself felt temporary.",
  },
  {
    q: "Is this personalized tax advice?",
    a: "No. This guide is educational only. Optimal conversion amounts depend on your filing status, deductions, other income, Massachusetts surtax exposure, Medicare status, trust design, and charitable plans. Work with your CPA and fiduciary advisor before converting.",
  },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    publisherOrg,
    authorPerson,
    articleLd({
      headline: "Roth Conversion Strategy for Massachusetts Estates",
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
      { name: "Roth Conversion Strategy", item: pageUrl },
    ]),
  ],
};

export default function RothConversionGuide() {
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
            <span>Roth Conversion Strategy</span>
          </nav>
          <h1 className="hero-anim d2">
            Roth Conversion Strategy for <em>Massachusetts Estates</em>
          </h1>
          <p className="lead hero-anim d3">
            For affluent Massachusetts households, Roth conversions are rarely just a retirement-income
            tactic. They sit at the intersection of lifetime income tax, Medicare costs, and what
            heirs inherit inside, or outside, your estate plan.
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
              Retirement Income · 11 min read
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
          <h2>Roth conversions in an estate and tax context</h2>
          <p>
            A Roth conversion is the decision to pay income tax now on dollars sitting in a
            traditional IRA (or similar pre-tax account) so that future growth and qualified
            withdrawals can be income-tax-free under current federal rules. For Massachusetts
            households with substantial pre-tax balances, the question is not only &ldquo;will my
            bracket be higher later?&rdquo; It is also how conversions interact with required
            minimum distributions (RMDs), Social Security taxation, the Massachusetts income tax and
            4% surtax, Medicare IRMAA tiers, and the estate plan that will eventually receive what
            remains.
          </p>
          <p>
            Preserve My Estate readers often already sit near or above the Massachusetts estate-tax
            conversation. Under 2026 law, Massachusetts taxes estates above $2M after a $99,600
            credit, with graduated rates climbing toward 16%. Roth conversions do not remove assets
            from your estate by themselves, a Roth IRA is still an asset you own, but they can change
            the <em>character</em> of what you and your heirs hold: less future forced taxable income
            from RMDs, and potentially cleaner income-tax outcomes for beneficiaries who inherit
            Roth accounts.
          </p>
          <div className="callout reveal">
            This guide is educational, not personalized advice. Conversion amounts that look
            &ldquo;optimal&rdquo; in a blog example can be wrong for your filing status, deductions,
            Medicare timeline, or trust design. Confirm numbers with your CPA before you convert.
          </div>

          <h2>The core tradeoff: pay income tax now vs. later (or vs. heirs)</h2>
          <p>
            When you convert, you accelerate recognition of ordinary income. You need a source to
            pay the tax, ideally from non-IRA cash so you do not shrink the conversion by
            withholding from the IRA itself. In return, you may:
          </p>
          <ul className="strategy-list">
            <li>
              <h3>Reduce future RMDs</h3>
              <p>
                Smaller traditional balances can mean smaller mandatory distributions starting at
                RMD age, which can lower stacking of IRA income on top of Social Security, pensions,
                and investment income.
              </p>
            </li>
            <li>
              <h3>Shift tax from heirs</h3>
              <p>
                Beneficiaries who inherit traditional IRAs generally face taxable distributions
                under SECURE Act timelines. Inherited Roth accounts, when rules are met, can be more
                income-tax efficient for heirs, though estate inclusion and trust drafting still
                matter.
              </p>
            </li>
            <li>
              <h3>Use lower-income years deliberately</h3>
              <p>
                The window between retirement and RMDs is often the most flexible decade for
                partial conversions, if other income is temporarily lower.
              </p>
            </li>
          </ul>
          <p>
            The tradeoff fails when you pay tax at a higher combined rate than the rate that would
            have applied later, or when conversion income triggers collateral costs (IRMAA, surtax,
            lost deductions, or NIIT interactions) that erase the benefit. Partial, multi-year
            conversions are usually more controllable than a single large conversion.
          </p>

          <h2>IRMAA, Medicare, and tax brackets</h2>
          <p>
            Federal brackets are only one ceiling. For households on Medicare (or approaching it),
            IRMAA surcharges on Part B and Part D premiums are tiered by income with a lookback,
            commonly two years. A conversion in 2026 can affect Medicare premiums in a later year.
            Crossing a tier by a small amount can cost more than the last dollars of conversion
            saved in income tax, so planning often targets just below known IRMAA cliffs when those
            cliffs are relevant.
          </p>
          <p>
            Massachusetts adds its own layer. Converted amounts generally increase Massachusetts
            taxable income. Large conversions can also push income over the Millionaire Surtax
            threshold, a 4% surtax on income above $1,107,750 for tax year 2026 (inflation-indexed).
            Stacked with federal ordinary rates and, in some cases, other federal taxes on investment
            income elsewhere in the return, the true marginal cost of a conversion dollar can be
            much higher than the federal bracket alone suggests.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Constraint</th>
                  <th>Why it caps conversion size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Federal bracket tops</b>
                  </td>
                  <td>Avoid filling a higher ordinary-income bracket unnecessarily</td>
                </tr>
                <tr>
                  <td>
                    <b>IRMAA tiers</b>
                  </td>
                  <td>Lookback MAGI can raise Medicare premiums for two years out</td>
                </tr>
                <tr>
                  <td>
                    <b>MA income tax + 4% surtax</b>
                  </td>
                  <td>Conversions raise MA taxable income; surtax threshold applies</td>
                </tr>
                <tr>
                  <td>
                    <b>Cash to pay the tax</b>
                  </td>
                  <td>Paying tax from the IRA reduces net converted wealth</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fine">
            Thresholds and premium tiers change. Verify current-year figures with your CPA and
            Medicare resources before acting.
          </p>

          <h2>Coordinate with the estate plan, A/B trusts, and RMDs</h2>
          <p>
            Roth strategy and estate structure should be designed together. A few coordination points
            that matter for Massachusetts affluent households:
          </p>
          <h3>A/B trust and beneficiary design</h3>
          <p>
            Credit shelter / QTIP planning addresses Massachusetts&apos; lack of estate-tax
            portability and the $2M exemption dynamic between spouses. Retirement accounts are usually
            coordinated through beneficiary designations rather than lifetime retitling into a
            revocable trust. Whether a spouse, children, or a trust is named affects both estate-tax
            funding mechanics and post-death income tax. Converting traditional balances to Roth does
            not replace the need for a funded, correctly designated plan; it changes the tax character
            of accounts that still need to point to the right beneficiaries.
          </p>
          <h3>RMD timing</h3>
          <p>
            Once RMDs begin, every distribution is a floor under your taxable income. Conversions
            before RMD age (and careful planning around QCDs, charitable strategies, or work
            income) are often more flexible than trying to convert large amounts while RMDs are
            already filling lower brackets. After RMDs start, conversions are still possible but the
            available &ldquo;room&rdquo; in a bracket may shrink.
          </p>
          <h3>Estate liquidity and tax payment</h3>
          <p>
            Paying conversion tax from taxable accounts preserves more inside the Roth. That same
            taxable account may also be earmarked for gifting, donor-advised fund funding, or
            estate-tax liquidity. Spending down the wrong pocket can create a funding or cash-flow
            problem elsewhere in the plan.
          </p>
          <h3>Surviving spouse and remarriage scenarios</h3>
          <p>
            Spousal rollovers, survivor income needs, and second-marriage QTIP goals can change
            whether aggressive conversions during the first spouse&apos;s lifetime still make sense.
            Revisit conversion pace after major life or document changes.
          </p>

          <h2>A practical sequencing mindset (not a formula)</h2>
          <p>
            Families working with MSA Financial typically treat conversions as an annual calibration,
            not a one-time event:
          </p>
          <ol className="deliv">
            <li>
              <h3>Project the year&apos;s other income first.</h3>
              <p>
                Pensions, part-time work, capital gains, and Social Security set the floor before any
                conversion dollars are added.
              </p>
            </li>
            <li>
              <h3>Set ceilings: bracket, IRMAA, MA surtax.</h3>
              <p>
                Choose the binding constraint for that year; the tightest ceiling usually wins.
              </p>
            </li>
            <li>
              <h3>Confirm tax-payment cash and estimated payments.</h3>
              <p>
                Large conversions can create underpayment penalties if estimates are ignored.
              </p>
            </li>
            <li>
              <h3>Align beneficiaries and trust funding in the same review.</h3>
              <p>
                Do not optimize a Roth while an unfunded trust or stale beneficiary form sits
                unresolved.{" "}
                <Link href="/guides/trust-funding">See the trust funding checklist</Link>.
              </p>
            </li>
          </ol>

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
                not an attorney or CPA.
              </p>
            </div>
          </div>

          <div className="next-step reveal-scale">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>See where your Roth conversion window stands</h3>
            <p>
              A complimentary 45-minute review for Massachusetts families with $2M+ in investable
              assets. Educational conversation covering brackets, IRMAA, surtax exposure, and how
              conversions fit your estate structure, not a product pitch.
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
            attorney, and does not prepare tax returns. This article is for educational purposes
            only. It is not personalized investment, legal, or tax advice and is not a
            recommendation to execute any Roth conversion. Consult your CPA and qualified advisors
            regarding your specific circumstances.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
