import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthorPortrait from "@/components/AuthorPortrait";
import MsaLockup from "@/components/MsaLockup";
import { SITE_ORIGIN, PERSON_ID, ORG_ID, breadcrumbLd, authorPerson, publisherOrg } from "@/lib/schema";

const title = "About Michael Cammarata, CFP®";
const description =
  "Michael Cammarata, CFP®, Managing Partner at MSA Financial, LLC. Fiduciary coordination of wealth, estate, and tax planning for Massachusetts families with $2M+.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${SITE_ORIGIN}/about`,
    title,
    description,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    publisherOrg,
    {
      ...authorPerson,
      description,
      jobTitle: "Managing Partner",
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_ORIGIN}/about`,
      url: `${SITE_ORIGIN}/about`,
      name: title,
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    },
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "About", item: `${SITE_ORIGIN}/about` },
    ]),
  ],
};

export default function AboutPage() {
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
            <span>About</span>
          </nav>
          <h1 className="hero-anim d2">
            Michael Cammarata, <em>CFP®</em>
          </h1>
          <p className="lead hero-anim d3">
            Managing Partner at MSA Financial, LLC. Fiduciary coordination of wealth, estate, and
            tax planning for Massachusetts families, not legal document drafting.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap about-page-grid">
          <div className="article">
            <h2>The work</h2>
            <p>
              Michael helps Massachusetts households with roughly $2M+ in investable assets make
              the estate plan, the tax return, and the portfolio agree with each other. That usually
              means Massachusetts estate-tax exposure, credit-shelter / A/B readiness, trust
              funding follow-through, Roth conversion timing, and RMD planning, coordinated with
              the client&apos;s independent attorney and CPA.
            </p>
            <p>
              He is a CERTIFIED FINANCIAL PLANNER® practitioner and Managing Partner at MSA
              Financial, LLC (CRD #107768), an SEC-registered investment adviser established in
              1997. He is not an attorney and does not draft wills or trusts.
            </p>

            <h2>Credentials &amp; firm</h2>
            <ul>
              <li>CFP® professional</li>
              <li>Managing Partner, MSA Financial, LLC</li>
              <li>Investment Adviser Representative · firm CRD #107768</li>
              <li>Fiduciary standard on advisory recommendations</li>
            </ul>
            <p>
              Learn more on{" "}
              <a
                href="https://www.msaplan.com/team/michael-cammarata"
                rel="noopener noreferrer"
                target="_blank"
              >
                MSA&apos;s team page
              </a>{" "}
              or{" "}
              <a
                href="https://www.linkedin.com/in/michael-cammarata-cfp"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              . Firm disclosures:{" "}
              <a
                href="https://adviserinfo.sec.gov/firm/summary/107768"
                rel="noopener noreferrer"
                target="_blank"
              >
                SEC IAPD
              </a>
              .
            </p>

            <h2>Where we meet</h2>
            <p>
              Primary office:{" "}
              <Link href="/locations/braintree">Braintree</Link> (South Shore). Also{" "}
              <Link href="/locations/sandwich">Sandwich</Link> (Cape Cod) and{" "}
              <Link href="/locations/framingham">Framingham</Link> (MetroWest, by appointment).
            </p>

            <h2>Start with education</h2>
            <p>
              Prefer reading before a call? Begin with the{" "}
              <Link href="/guides/massachusetts-estate-tax">Massachusetts Estate Tax Guide</Link>,
              try the <Link href="/calculator">estate tax calculator</Link>, or browse{" "}
              <Link href="/guides">all guides</Link>.
            </p>

            <div className="next-step reveal-scale" style={{ marginTop: "2.5rem" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Next Step
              </p>
              <h3>Schedule the complimentary 45-minute review</h3>
              <p>
                Educational conversation for Massachusetts families with $2M+ in investable assets.
                Educational only. No obligation.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-gold" href="/#booking">
                  Schedule the 45-Minute Review <span className="arrow">→</span>
                </Link>
                <Link className="btn btn-ghost" href="/guides">
                  Browse Guides
                </Link>
              </div>
            </div>

            <p className="fine" style={{ marginTop: "2rem" }}>
              Investment advisory services offered through MSA Financial, LLC, a Registered
              Investment Adviser. Educational content only. Not legal, tax, or investment advice.
            </p>
          </div>

          <aside className="loc-aside">
            <div className="loc-aside-card">
              <AuthorPortrait />
              <h3>Michael Cammarata, CFP®</h3>
              <p className="loc-aside-label">Managing Partner · MSA Financial, LLC</p>
              <p>
                <a href="tel:+17818433500">(781) 843-3500</a>
              </p>
              <hr style={{ margin: "1.2rem 0", border: 0, borderTop: "1px solid var(--line)" }} />
              <MsaLockup />
            </div>
            <div className="loc-aside-card">
              <p className="eyebrow">Related</p>
              <ul className="loc-aside-links">
                <li>
                  <Link href="/guides/massachusetts-estate-tax">MA Estate Tax Guide</Link>
                </li>
                <li>
                  <Link href="/locations">Locations</Link>
                </li>
                <li>
                  <Link href="/disclosures">Website Disclosures</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}
