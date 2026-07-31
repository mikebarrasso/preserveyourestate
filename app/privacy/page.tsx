import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MSA Financial, LLC handles information submitted through the Preserve My Estate website (preserveyourestate.com).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav solid />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap">
          <nav className="crumbs hero-anim d1">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="hero-anim d2">
            Privacy <em>Policy</em>
          </h1>
          <p className="lead hero-anim d3">
            How MSA Financial, LLC handles information you share through the Preserve My Estate
            website.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <p className="article-meta">
            <span>Last updated July 2026</span>
          </p>

          <p>
            This Privacy Policy describes how Marino, Stram &amp; Associates, LLC d/b/a MSA
            Financial (“MSA,” “we,” or “us”), a Registered Investment Adviser (CRD #107768) with
            its main office in Braintree, Massachusetts, collects and uses information in
            connection with the Preserve My Estate website at preserveyourestate.com (the “Site”).
            The Site provides educational content about Massachusetts estate and tax planning
            topics.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you use the complimentary-review request form on the Site, you may be asked to
            provide:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Approximate investable assets</li>
            <li>Optional notes about topics you would like to cover</li>
          </ul>
          <p>
            We do not require an account to browse the Site. Educational guides and the estate tax
            calculator are available without submitting contact information.
          </p>

          <h2>How we use information</h2>
          <p>
            Information submitted through Site forms is intended to respond to your request and
            follow up about educational or advisory services offered through MSA Financial. We do
            not sell your personal information.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            The Site does not use third-party advertising cookies or marketing analytics pixels.
            We may use only cookies or local storage that are essential to operate the Site (for
            example, basic browser functionality). We do not currently operate a separate web
            analytics product on this Site.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell personal information. Information submitted through the Site may be
            processed by service providers that help us run email, hosting, or CRM tools, solely to
            support those functions and subject to appropriate confidentiality obligations. We may
            also disclose information if required by law or regulation applicable to a registered
            investment adviser.
          </p>

          <h2>Security and retention</h2>
          <p>
            We take reasonable measures appropriate to the nature of an educational advisory
            website. No method of transmission or storage is completely secure. Retention of
            prospect or client information follows applicable regulatory recordkeeping requirements
            and our internal policies.
          </p>

          <h2>Children</h2>
          <p>
            The Site is not directed to children under 18, and we do not knowingly collect
            personal information from children.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date at the
            top of this page reflects the latest revision. Continued use of the Site after changes
            constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this Privacy Policy or the Site may be directed to Marino, Stram
            &amp; Associates, LLC d/b/a MSA Financial, 25 Braintree Hill Park, Suite 303,
            Braintree, MA 02184 · <a href="tel:+17818433500">(781) 843-3500</a>. SEC Registered
            Investment Adviser · CRD #107768. You may also reach the firm through the contact
            options on <Link href="/#booking">preserveyourestate.com</Link>.
          </p>

          <p className="fine" style={{ marginTop: "2.5rem" }}>
            Related: <Link href="/disclosures">Website Disclosures</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
