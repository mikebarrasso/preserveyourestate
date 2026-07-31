import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import { SITE_ORIGIN, articleLd, authorPerson, breadcrumbLd, publisherOrg } from "@/lib/schema";

const title = "Trust Funding Checklist for Massachusetts Estates";
const description =
  "What trust funding means, why unfunded trusts fail, and an asset checklist for deeds, accounts, retirement, and insurance. Preserve My Estate / MSA Financial.";
const pageUrl = `${SITE_ORIGIN}/guides/trust-funding`;

const FAQ_ITEMS = [
  {
    q: "Is signing a trust enough to protect my estate?",
    a: "No. A signed trust only creates the legal container. Assets must be retitled or designated correctly for the trust to control them at death. An unfunded trust often has little or no effect on probate or Massachusetts estate tax planning.",
  },
  {
    q: "Do retirement accounts get retitled into my revocable trust?",
    a: "Usually not during your lifetime. IRAs and many employer plans stay in your name, with beneficiary designations directing where they go. Funding strategy for retirement accounts is typically about designations and coordination with the rest of the estate plan, not changing ownership into the trust.",
  },
  {
    q: "Who retitles my Massachusetts real estate into the trust?",
    a: "Deed work should be handled by a Massachusetts estate planning attorney. Michael Cammarata, CFP®, coordinates the financial side of funding and reviews whether accounts and designations line up with the plan, but he does not draft deeds or provide legal advice.",
  },
  {
    q: "How does trust funding relate to the Massachusetts $2M estate tax?",
    a: "Massachusetts taxes estates above the $2M exemption, and married couples often rely on A/B or similar structures to use both exemptions. Those structures only work if the right assets are in the right trusts and titles at the first death. Funding is the execution step that makes the design real.",
  },
  {
    q: "How often should we review funding after the trust is signed?",
    a: "Review after any major life or balance-sheet change, new home, refinance, large account, business sale, inheritance, or divorce, and at least annually as part of a coordinated wealth and estate review.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/trust-funding",
  },
  openGraph: {
    url: pageUrl,
    title,
    description,
  },
};

const HOWTO_STEPS = [
  {
    name: "Retitle deeds and real estate",
    text: "Work with a Massachusetts attorney to deed homes and other real estate into the trust (or another specified structure), then re-check title after any refinance.",
  },
  {
    name: "Align brokerage and taxable accounts",
    text: "Retitle non-retirement brokerage accounts into the trust where appropriate, and resolve conflicting TOD registrations.",
  },
  {
    name: "Coordinate bank and cash accounts",
    text: "Keep daily-use accounts accessible while aligning POD designations and larger cash reserves with the trust design.",
  },
  {
    name: "Update retirement beneficiary designations",
    text: "Do not assume IRAs are retitled into the revocable trust; coordinate beneficiaries with A/B and income-tax planning.",
  },
  {
    name: "Confirm life insurance owner and beneficiary",
    text: "Review every policy for ownership and beneficiary forms, including any ILIT structure.",
  },
  {
    name: "Assign business interests correctly",
    text: "Update LLC/partnership/stock assignments and operating agreements so funding does not violate company documents.",
  },
  {
    name: "Inventory personal and miscellaneous assets",
    text: "Capture vehicles, collections, digital assets, and household property on schedules or via the pour-over will backup.",
  },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    publisherOrg,
    authorPerson,
    articleLd({
      headline: "Trust Funding Checklist for Massachusetts Estates",
      description,
      url: pageUrl,
      datePublished: "2026-07-01",
      dateModified: "2026-07-20",
    }),
    {
      "@type": "HowTo",
      name: "How to fund a Massachusetts estate plan trust",
      description:
        "Ordered checklist for retitling deeds, accounts, beneficiaries, insurance, and business interests so a trust actually controls the estate.",
      totalTime: "P14D",
      step: HOWTO_STEPS.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.name,
        text: step.text,
        url: `${pageUrl}#step-${i + 1}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Guides", item: `${SITE_ORIGIN}/guides` },
      { name: "Trust Funding", item: pageUrl },
    ]),
  ],
};

export default function TrustFundingGuide() {
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
            <span>Trust Funding Checklist</span>
          </nav>
          <h1 className="hero-anim d2">
            Trust Funding Checklist for <em>Massachusetts Estates</em>
          </h1>
          <p className="lead hero-anim d3">
            Signing the trust is step one. Funding, retitling deeds, accounts, and designations so
            the trust actually owns or controls the assets, is what makes the plan work.
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
              Estate Execution · 10 min read
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
          <h2>What trust funding means</h2>
          <p>
            Trust funding is the process of aligning legal ownership and beneficiary designations
            with the trust you signed. For a revocable living trust, that usually means retitling
            assets into the name of the trust while you are alive, or naming the trust as beneficiary
            where ownership should stay in your name. For irrevocable or A/B structures drafted for
            Massachusetts estate tax planning, funding also means making sure the right assets are
            available to fill Credit Shelter and marital trusts at the first death.
          </p>
          <p>
            Think of the signed document as a shell. Funding is what puts assets inside that shell,
            or points them there when something happens. Preserve My Estate readers often come to
            this topic after an attorney has drafted documents, when the open question is whether
            the balance sheet still matches the paperwork.
          </p>
          <div className="callout reveal">
            A trust that is drafted, signed, and never funded is one of the most common failures in
            estate planning. <b>The document alone does not retitle your house, brokerage, or bank
            accounts.</b>
          </div>

          <h2>Why unfunded trusts fail</h2>
          <p>
            If assets remain titled solely in an individual name, they may still go through probate,
            pass under old beneficiary forms, or land entirely with a surviving spouse in a way that
            wastes a Massachusetts exemption. Married couples who rely on A/B planning to use both
            $2M Massachusetts exemptions need funding and titling that support that design. An
            elegant trust that owns nothing cannot shelter growth, avoid probate, or coordinate with
            the rest of the estate.
          </p>
          <p>
            Unfunded trusts also create false confidence. Families believe they are “done” because
            the signing meeting is over, then discover at the first death that the house is still in
            joint names only, the brokerage never moved, and retirement designations contradict the
            trust. Cleaning that up under time pressure is harder, more expensive, and sometimes
            impossible to fix the way the original plan intended.
          </p>

          <h2>Asset checklist</h2>
          <p>
            Use this as a working inventory with your attorney and advisor, not as a substitute for
            legal counsel. Every household is different, but most Massachusetts estates with $2M+
            touch the categories below.
          </p>

          <h3 id="step-1">Deeds and real estate</h3>
          <p>
            Primary homes, vacation property, and investment real estate usually need a new deed
            into the trust, or another structure your attorney specifies. Confirm how mortgages,
            refinances, and co-ownership (tenancy by the entirety, joint tenants, tenants in common)
            interact with the retitle. After any refinance, re-check whether the lender put title
            back in individual names.
          </p>

          <h3 id="step-2">Brokerage and taxable investment accounts</h3>
          <p>
            Non-retirement brokerage accounts are often retitled from individual or joint ownership
            into the revocable trust. Transfer-on-death (TOD) registrations can conflict with trust
            planning if they send assets around the trust. Align account registration, TOD
            instructions, and the trust schedule of assets.
          </p>

          <h3 id="step-3">Bank and cash accounts</h3>
          <p>
            Checking, savings, and money-market accounts used for living expenses may stay accessible
            in individual or joint names for daily use, with a clear plan for larger cash reserves.
            Payable-on-death (POD) designations should match the overall design. Idle cash sitting
            only in an individual name can still create probate or funding gaps at death.
          </p>

          <h3 id="step-4">Retirement accounts: beneficiary designation vs ownership</h3>
          <p>
            IRAs, 401(k)s, 403(b)s, and similar plans generally are not retitled into a revocable
            trust during life. Ownership stays with the account holder. Control at death comes from
            beneficiary designations. Naming a spouse, children, a trust, or a mix of those has
            income-tax and estate-tax consequences. Coordinate designations with the rest of the
            plan so retirement assets do not accidentally undo A/B funding or leave the wrong person
            as primary beneficiary.
          </p>

          <h3 id="step-5">Life insurance</h3>
          <p>
            Confirm owner and beneficiary on every policy. Some families keep insurance outside the
            estate with an irrevocable life insurance trust (ILIT); others name a spouse or trust
            directly. The right answer depends on estate size, liquidity needs, and Massachusetts
            exposure. An outdated beneficiary form can send a large death benefit to the wrong place
            even when the trust documents are current.
          </p>

          <h3 id="step-6">Business interests</h3>
          <p>
            LLCs, S corporations, partnerships, and closely held stock often require assignment of
            membership interests, updated operating agreements, or stock powers into the trust or
            another entity. Buy-sell agreements and voting rights should be reviewed so trust funding
            does not violate company documents or trigger unwanted consequences.
          </p>

          <h3 id="step-7">Personal property and miscellaneous assets</h3>
          <p>
            Vehicles, boats, valuable collections, digital assets, and household property are easy
            to overlook. Some items transfer by affidavit or title agency rules; others belong on a
            trust schedule or in a pour-over will backup. The goal is a complete inventory so nothing
            material is left to chance.
          </p>

          <h2>Massachusetts notes</h2>
          <p>
            Massachusetts imposes an estate tax with a $2M exemption threshold for many planning
            conversations on this site. Because the state does not offer federal-style portability
            between spouses in the same way couples often assume, married households frequently use
            trust structures to preserve both exemptions. Those structures only deliver if deeds and
            accounts are positioned correctly when the first spouse dies.
          </p>
          <p>
            Deed retitling into a trust must be coordinated with a Massachusetts estate planning
            attorney. Michael Cammarata, CFP®, is not an attorney, does not draft legal documents,
            and does not provide legal advice. Through Preserve My Estate and MSA Financial, LLC,
            his role is fiduciary coordination: mapping the balance sheet to the estate design,
            flagging funding gaps, and reviewing the plan as values and family circumstances change.
          </p>
          <div className="callout">
            If your estate is near or above Massachusetts&apos; $2M threshold, treat funding as part
            of tax planning, not a clerical afterthought. <b>Title and beneficiary details decide
            whether the trust design can actually use both spouses&apos; exemptions.</b>
          </div>

          <h2>Common mistakes</h2>
          <ul>
            <li>
              Signing the trust and assuming the attorney or financial institution will finish
              funding without a clear checklist and follow-through.
            </li>
            <li>
              Retitling the house, then refinancing and ending up back in individual names.
            </li>
            <li>
              Leaving brokerage TOD or bank POD designations that bypass the trust.
            </li>
            <li>
              Treating retirement accounts like brokerage accounts and attempting unnecessary
              ownership changes instead of updating beneficiaries carefully.
            </li>
            <li>
              Forgetting life insurance, business interests, or a newly opened account after the
              initial funding project.
            </li>
            <li>
              Never reconciling the trust&apos;s schedule of assets with today&apos;s statements.
            </li>
          </ul>

          <h2>Frequently asked questions</h2>
          {FAQ_ITEMS.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

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
            (CRD #107768), a Registered Investment Adviser. Preserve My Estate is an educational
            resource associated with MSA Financial. This article is for educational purposes only.
            Not legal or tax advice. Deed work and trust drafting require a qualified Massachusetts
            attorney. Estate tax rules and thresholds can change; confirm current law with your
            counsel and tax professional before acting.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
