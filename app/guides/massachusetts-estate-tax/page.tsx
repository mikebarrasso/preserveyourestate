import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { fmtUSD, maEstateTax } from "@/lib/matax";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Massachusetts Estate Tax Guide (2026)";
const description =
  "How the Massachusetts estate tax works in 2026: $2M threshold, $99,600 credit, graduated rates toward 16%, no portability, and who pays. Preserve My Estate / MSA Financial.";
const pageUrl = `${SITE_ORIGIN}/guides/massachusetts-estate-tax`;

const SAMPLE_ESTATES = [
  2_500_000, 3_000_000, 4_000_000, 6_000_000, 8_000_000,
] as const;

const FAQ = [
  {
    q: "What is the Massachusetts estate tax threshold in 2026?",
    a: "Under 2026 Massachusetts law, estates valued at $2 million or less generally owe no Massachusetts estate tax. Above $2M, tax is computed under M.G.L. c. 65C using a credit-based method that includes a $99,600 credit, with graduated rates climbing toward 16%.",
  },
  {
    q: "Does Massachusetts have estate tax portability between spouses?",
    a: "No. Unused Massachusetts exemption cannot be transferred to a surviving spouse the way federal DSUE (deceased spousal unused exclusion) can. Married couples often use A/B or credit-shelter planning to capture both $2M exemptions. See our portability and A/B trust guides.",
  },
  {
    q: "Does home equity count toward the Massachusetts estate tax?",
    a: "Yes. Your primary residence and other real estate are generally included in the taxable estate at fair market value (subject to debts and applicable deductions). Home equity alone can push a Massachusetts household over the $2M threshold even when investable assets look moderate.",
  },
  {
    q: "Who pays the Massachusetts estate tax?",
    a: "The estate (through the executor or personal representative) is responsible for filing and paying Massachusetts estate tax when due. Heirs may feel the economic impact through reduced inheritances or liquidity pressure if assets are illiquid (for example, real estate or private business interests).",
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
    canonical: "/guides/massachusetts-estate-tax",
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
      headline: "Massachusetts Estate Tax Guide (2026)",
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
      { name: "Massachusetts Estate Tax Guide", item: pageUrl },
    ]),
  ],
};

export default function MassachusettsEstateTaxGuide() {
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
            <span>Massachusetts Estate Tax</span>
          </nav>
          <h1 className="hero-anim d2">
            Massachusetts Estate Tax Guide <em>(2026)</em>
          </h1>
          <p className="lead hero-anim d3">
            A practical overview of how Massachusetts taxes estates above $2M: the $99,600 credit,
            graduated rates toward 16%, no spousal portability, and why home equity and investable
            assets both matter for Preserve My Estate readers.
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
              Estate Tax · 14 min read
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
          <h2>What the Massachusetts estate tax is</h2>
          <p>
            The Massachusetts estate tax is a state-level tax on the transfer of a decedent&apos;s
            property at death. It is separate from the federal estate tax and from Massachusetts
            income tax. For many affluent households in Greater Boston and across the Commonwealth,
            the state estate tax is the binding constraint long before federal estate tax becomes
            relevant, because the Massachusetts exemption sits far below the federal exclusion.
          </p>
          <div className="callout reveal">
            <b>Definition:</b> The Massachusetts estate tax (under{" "}
            <a
              href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter65C"
              target="_blank"
              rel="noopener noreferrer"
            >
              M.G.L. c. 65C
            </a>
            ) generally applies when a decedent&apos;s Massachusetts taxable estate exceeds{" "}
            <b>$2 million</b> in 2026. Tax is computed using a credit-based method that includes a{" "}
            <b>$99,600</b> credit, with graduated rates climbing toward <b>16%</b>. Massachusetts
            does <b>not</b> offer spousal portability of unused exemption.
          </div>
          <p>
            Preserve My Estate / MSA Financial publishes this guide for educational orientation,
            not as a substitute for a Massachusetts estate planning attorney or a filed Form M-706
            analysis. Figures below use the same estimator behind our{" "}
            <Link href="/calculator">estate tax calculator</Link> (
            <code>maEstateTax</code> in our planning tools).
          </p>

          <h2>2026 threshold, credit, and rates</h2>
          <p>
            After Massachusetts reformed its estate tax framework (effective for deaths on or after
            January 1, 2023), the practical picture for 2026 looks like this:
          </p>
          <ul className="strategy-list">
            <li>
              <h3>$2 million filing / exemption threshold</h3>
              <p>
                Estates at or below $2M generally owe no Massachusetts estate tax. Crossing $2M
                opens liability; it is not a &ldquo;cliff&rdquo; that taxes the entire estate from
                dollar one in the old sense, but the credit-based computation still produces
                meaningful tax shortly above the threshold.
              </p>
            </li>
            <li>
              <h3>$99,600 credit</h3>
              <p>
                The computation embeds a $99,600 credit that zeros out tax at and below the $2M
                level under the statutory method. Above $2M, estimated tax rises with estate size.
              </p>
            </li>
            <li>
              <h3>Graduated rates toward 16%</h3>
              <p>
                Marginal rates in the underlying credit schedule climb in steps and approach 16%
                at the top of the historical state death-tax credit brackets. Your effective rate
                on the estate as a whole is lower than the top marginal rate, but the dollar tax
                can still be large.
              </p>
            </li>
          </ul>
          <p>
            Statute text and administrative guidance control filing. Start with{" "}
            <a
              href="https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter65C"
              target="_blank"
              rel="noopener noreferrer"
            >
              M.G.L. c. 65C
            </a>{" "}
            and current Massachusetts Department of Revenue instructions when you need official
            rules.
          </p>

          <h2>Sample Massachusetts estate tax estimates</h2>
          <p>
            Illustrative tax on a Massachusetts taxable estate at common planning checkpoints,
            using our educational estimator (rounded dollars):
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Taxable estate</th>
                  <th>Estimated MA estate tax</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_ESTATES.map((estate) => (
                  <tr key={estate}>
                    <td>
                      <b>{fmtUSD(estate)}</b>
                    </td>
                    <td>{fmtUSD(maEstateTax(estate))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine">
            Examples aligned with our published checkpoints: $2.5M → $39,200; $3M → $82,400; $4M →
            $180,800; $6M → $411,200. An $8M estate estimates to {fmtUSD(maEstateTax(8_000_000))}.
            Illustrative only, not a DOR computation or legal opinion.
          </p>

          <h2>Who pays, and when liquidity matters</h2>
          <p>
            The estate, acting through the personal representative, is generally responsible for
            reporting and paying Massachusetts estate tax. Practically, heirs experience the tax as
            a claim against assets that might otherwise pass to them. Estates heavy in real estate,
            closely held business interests, or concentrated stock can face a liquidity problem:
            tax is due in cash even when wealth is not.
          </p>
          <p>
            Planning conversations at MSA Financial often focus on three questions: (1) Is the
            estate near or above $2M today, including home equity? (2) Will growth push a surviving
            spouse further above the threshold before the second death? (3) Where will cash come
            from if tax is due, insurance, taxable accounts, or a forced sale?
          </p>

          <h2>No portability: the married-couple problem in one paragraph</h2>
          <p>
            Federally, a surviving spouse can often inherit unused exclusion via DSUE
            (&ldquo;portability&rdquo;). Massachusetts does not offer an equivalent transfer of unused
            state exemption. If the first spouse leaves everything outright to the survivor without
            a credit-shelter or similar structure, the first $2M exemption can be wasted from a
            Massachusetts perspective, and the survivor&apos;s estate may face tax on the combined
            pile above one $2M exemption. That is why{" "}
            <Link href="/guides/massachusetts-estate-tax-portability">
              Massachusetts estate tax portability
            </Link>{" "}
            and{" "}
            <Link href="/guides/ab-trust">A/B trust planning</Link> are central topics for married
            couples in this state.
          </p>
          <div className="callout">
            A married couple with a $4M combined estate and no trust planning faces an estimated
            Massachusetts estate tax of approximately <b>$180,800</b> at the second death under our
            estimator, one $2M exemption applied to the combined estate, not two.
          </div>

          <h2>Home equity counts</h2>
          <p>
            Massachusetts residents sometimes assume &ldquo;estate tax&rdquo; only applies to
            brokerage accounts. That is incorrect. The taxable estate generally includes real
            estate, business interests, retirement accounts, life insurance proceeds payable to the
            estate (and sometimes other structures depending on ownership and incidents of
            ownership), and other property, net of allowed debts and deductions. A paid-down
            suburban home plus retirement accounts can clear $2M even when someone does not think of
            themselves as &ldquo;wealthy.&rdquo;
          </p>
          <p>
            Title matters. Joint ownership, trusts, and beneficiary designations change who receives
            property and how it is reported. Funding a trust after it is signed, retitling deeds and
            accounts, is execution work, not paperwork theater. See the{" "}
            <Link href="/guides/trust-funding">trust funding checklist</Link>.
          </p>

          <h2>How Massachusetts interacts with federal estate tax</h2>
          <p>
            The federal estate tax exclusion is dramatically higher than Massachusetts&apos; $2M
            threshold for most families in 2026. Many households sit in a planning band: large
            enough to care about Massachusetts estate tax, yet still below the federal exemption.
            State planning (credit shelter / QTIP design, gifting, liquidity) can matter even when
            no federal Form 706 tax is expected. For a side-by-side view, read{" "}
            <Link href="/guides/federal-vs-massachusetts-estate-tax">
              Federal vs Massachusetts estate tax
            </Link>
            .
          </p>

          <h2>Related income-tax pressure: the millionaire surtax</h2>
          <p>
            The Massachusetts 4% &ldquo;millionaire&rdquo; surtax is an <em>income</em> tax on
            taxable income above an inflation-indexed threshold ($1,107,750 for tax year 2026). It
            is not the estate tax. It still shows up in estate-adjacent planning because Roth
            conversions, large capital gains, and business sales can spike income in years when
            families are also reshaping their balance sheet. See{" "}
            <Link href="/guides/massachusetts-millionaire-surtax">
              Massachusetts millionaire surtax &amp; estate planning
            </Link>{" "}
            and{" "}
            <Link href="/guides/roth-conversion">Roth conversion strategy</Link>.
          </p>

          <h2>What a CFP® coordinates (and does not draft)</h2>
          <p>
            Michael Cammarata, CFP®, coordinates wealth, estate, and tax planning for Massachusetts
            families with roughly $2M+ in investable assets through MSA Financial, LLC. He does not
            draft wills or trusts, does not provide legal advice, and does not prepare estate tax
            returns. Document drafting belongs with a Massachusetts estate planning attorney; return
            preparation belongs with your CPA or tax counsel. The advisory role is to keep
            structure, funding, investments, and cash-flow decisions consistent as values and law
            change.
          </p>

          <h2>Where to go next</h2>
          <p>
            Use the{" "}
            <Link href="/calculator">Massachusetts estate tax calculator</Link> for a quick
            ballpark, then dig into the sibling guides that match your situation:
          </p>
          <ul>
            <li>
              <Link href="/guides/ab-trust">A/B trust planning in Massachusetts</Link>
            </li>
            <li>
              <Link href="/guides/trust-funding">Trust funding checklist</Link>
            </li>
            <li>
              <Link href="/guides/roth-conversion">Roth conversion strategy</Link>
            </li>
            <li>
              <Link href="/guides/massachusetts-estate-tax-portability">
                Massachusetts estate tax portability
              </Link>
            </li>
            <li>
              <Link href="/guides/federal-vs-massachusetts-estate-tax">
                Federal vs Massachusetts estate tax
              </Link>
            </li>
            <li>
              <Link href="/guides/massachusetts-millionaire-surtax">
                Massachusetts millionaire surtax &amp; estate planning
              </Link>
            </li>
          </ul>

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
            <h3>See how Massachusetts estate tax applies to your balance sheet</h3>
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
            attorney, and does not prepare tax returns. This article is for educational purposes
            only. It is not legal or tax advice. Massachusetts estate tax rules are set by statute
            and DOR guidance; confirm your situation with qualified counsel.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
