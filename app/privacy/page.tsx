import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MSA Financial, LLC collects, uses, and protects information submitted through PreserveMyEstate.com.",
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
            Privacy Policy
          </h1>
          <p className="lead hero-anim d3">
            Effective August 12, 2026. This policy describes how MSA Financial, LLC
            (&ldquo;MSA,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;) handles information collected
            through PreserveMyEstate.com.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <p>
            PreserveMyEstate.com is an educational website of MSA Financial, LLC, an SEC-registered
            investment adviser (CRD #107768). Firm-wide privacy practices for advisory clients are
            also described in MSA&apos;s{" "}
            <a
              href="https://www.msaplan.com/disclosures"
              rel="noopener noreferrer"
              target="_blank"
            >
              firm disclosures
            </a>{" "}
            and in Form ADV. This page covers this website.
          </p>

          <h2>Information we collect</h2>
          <p>
            If you request a complimentary review or a guide, the form may collect your first and
            last name, email address, phone number, approximate investable assets, retirement
            timeline, planning concern, preferred contact time, and any notes you choose to
            provide.
          </p>
          <p>
            We may also receive limited technical information that your browser or device sends in
            the ordinary course of visiting a website, such as IP address, browser type, and pages
            viewed. We do not use this website to collect Social Security numbers, account numbers,
            or other highly sensitive financial account data.
          </p>

          <h2>How we use information</h2>
          <p>We use information submitted through this site to:</p>
          <ul>
            <li>Respond to review requests and send requested educational materials</li>
            <li>Contact you about the services described on this site, if you asked us to</li>
            <li>Operate, secure, and improve the website</li>
            <li>Meet legal, regulatory, and recordkeeping obligations</li>
          </ul>
          <p>
            We do not sell your information, and we do not share it with unaffiliated third parties
            for their independent marketing.
          </p>

          <h2>Sharing</h2>
          <p>
            We may share information with service providers who help us operate the website or
            process inquiries (for example, email or form-processing vendors), with your existing
            professionals if you ask us to coordinate with them, and with regulators or other
            parties when required by law. Those service providers are expected to use the
            information only to perform services for us.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This website may use cookies or similar technologies that are needed for the site to
            function. We do not currently use third-party advertising cookies to track you across
            other sites for targeted ads. You can refuse or delete cookies in your browser
            settings; some site features may not work as intended if you do.
          </p>

          <h2>Links to other sites</h2>
          <p>
            This site links to unaffiliated websites, including the SEC&apos;s Investment Adviser
            Public Disclosure site and MSA&apos;s firm site at{" "}
            <a href="https://www.msaplan.com/" rel="noopener noreferrer" target="_blank">
              msaplan.com
            </a>
            . Those sites have their own privacy practices. We are not responsible for them.
          </p>

          <h2>How to reach us</h2>
          <p>
            MSA Financial, LLC
            <br />
            25 Braintree Hill Park, Suite 303
            <br />
            Braintree, MA 02184
            <br />
            <a href="tel:+17818433500">(781) 843-3500</a>
          </p>
          <p>
            If you have questions about this policy, or about information you submitted through
            this site, contact us at the number above.
          </p>

          <h2>Updates</h2>
          <p>
            We may update this policy from time to time. The effective date at the top of this page
            will change when we do. Continued use of the site after an update means you accept the
            revised policy.
          </p>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
