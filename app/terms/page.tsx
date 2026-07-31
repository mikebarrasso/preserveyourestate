import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Preserve My Estate website operated in connection with MSA Financial, LLC.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav solid />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap">
          <nav className="crumbs hero-anim d1">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Terms of Use</span>
          </nav>
          <h1 className="hero-anim d2">
            Terms of <em>Use</em>
          </h1>
          <p className="lead hero-anim d3">
            Rules for using the Preserve My Estate website at preserveyourestate.com.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <p className="article-meta">
            <span>Last updated July 2026</span>
          </p>

          <p>
            These Terms of Use govern access to and use of the Preserve My Estate website
            (preserveyourestate.com), operated in connection with Marino, Stram &amp; Associates,
            LLC d/b/a MSA Financial (“MSA”), a Registered Investment Adviser (CRD #107768). By
            using the Site, you agree to these terms. If you do not agree, do not use the Site.
          </p>

          <h2>Educational purpose</h2>
          <p>
            The Site provides educational information about Massachusetts estate and tax planning
            topics. It does not create an advisory, legal, or tax-client relationship. Investment
            advisory services are offered only through MSA Financial pursuant to a written
            agreement. See also our{" "}
            <Link href="/disclosures">Website Disclosures</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>No advice; no reliance</h2>
          <p>
            Calculators, guides, examples, and forms are for general information only. You should
            not rely on them as personalized advice. Tax and estate outcomes depend on your facts
            and current law; consult your own attorney, CPA, and adviser before acting.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You may use the Site for lawful personal or professional inquiry related to its
            educational content. You may not attempt to disrupt the Site, scrape it in a way that
            impairs service, submit false contact information, or use the Site to transmit malware
            or spam.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Site content, branding (including Preserve My Estate), and design are owned by MSA or
            its licensors and may not be copied for commercial reuse without prior written
            permission, except for fair-use quotation with attribution.
          </p>

          <h2>Third-party links</h2>
          <p>
            Links to the SEC IAPD, Form ADV/CRS, the Massachusetts legislature, or other third
            parties are provided for convenience. MSA does not control those sites and is not
            responsible for their content or privacy practices.
          </p>

          <h2>Disclaimer of warranties; limitation of liability</h2>
          <p>
            The Site is provided “as is.” To the fullest extent permitted by law, MSA disclaims
            warranties of accuracy, completeness, merchantability, and fitness for a particular
            purpose. MSA is not liable for indirect, incidental, or consequential damages arising
            from use of the Site. Nothing in these terms limits liability that cannot be limited
            under applicable law, including securities laws governing advisory relationships once
            engaged.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms of Use from time to time. The “Last updated” date reflects
            the latest revision. Continued use of the Site after changes constitutes acceptance.
          </p>

          <h2>Contact</h2>
          <p>
            Marino, Stram &amp; Associates, LLC d/b/a MSA Financial · Braintree, MA · CRD #107768.
            Questions about these terms: use the contact options on{" "}
            <Link href="/#booking">preserveyourestate.com</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
