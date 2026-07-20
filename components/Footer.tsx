import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import MsaLockup from "@/components/MsaLockup";

export default function Footer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="footer">
        <div className="wrap">
          <Link href="/" className="footer-brand-link" aria-label="Preserve My Estate, home">
            <BrandLogo variant="lockup" tone="dark" className="footer-brand-logo compact" />
          </Link>
          <div className="footer-legal" style={{ paddingTop: 0 }}>
            <p>
              Investment advisory services are offered through MSA Financial, LLC, a Registered
              Investment Adviser (CRD #107768). Educational content only, not legal, tax, or
              investment advice.
            </p>
            <p>
              © 2026 MSA Financial, LLC · All Rights Reserved ·{" "}
              <Link href="/">PreserveYourEstate.com</Link>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand-link" aria-label="Preserve My Estate, home">
              <BrandLogo variant="lockup" tone="dark" className="footer-brand-logo" />
            </Link>
            <p>
              Independent, fee-based wealth, estate, and tax planning for Massachusetts
              pre-retirees with $2M+ in investable assets.
            </p>
            <p style={{ marginTop: "0.8rem" }}>SEC Registered RIA · CRD #107768</p>
            <div className="footer-adviser-mark">
              <MsaLockup />
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/#problem">The Problem</Link></li>
              <li><Link href="/calculator">Estate Tax Calculator</Link></li>
              <li><Link href="/#coordination">How We Help</Link></li>
              <li><Link href="/guides/ab-trust">Deep-Dive Guides</Link></li>
              <li><Link href="/#about">About Michael</Link></li>
              <li><Link href="/#guide">Free Planning Guide</Link></li>
              <li><Link href="/#booking">Schedule a Review</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Regulatory</h4>
            <p>
              <b style={{ color: "rgba(255,255,255,0.85)" }}>MSA Financial, LLC</b>
              <br />
              SEC Registered Investment Adviser · CRD #107768
              <br />
              Braintree, MA (Main) · Sandwich · Framingham
            </p>
            <ul style={{ marginTop: "1.2rem" }}>
              <li>
                <a
                  href="https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=1008692"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Form ADV Part 2A &amp; 2B →
                </a>
              </li>
              <li>
                <a
                  href="https://reports.adviserinfo.sec.gov/crs/crs_107768.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Form CRS →
                </a>
              </li>
              <li>
                <a
                  href="https://adviserinfo.sec.gov/firm/summary/107768"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SEC IAPD →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            Investment advisory services are offered through MSA Financial, LLC, a Registered
            Investment Adviser. Registration with the SEC does not imply a certain level of skill
            or training. This website is for educational purposes only and does not constitute
            legal, tax, or investment advice, or a solicitation to buy or sell any security.
            Michael Cammarata is not an attorney and does not provide legal advice; estate
            planning documents are drafted by independent Massachusetts attorneys of the
            client&apos;s choosing. Illustrative tax figures reflect 2026 Massachusetts and federal
            law and individual results will vary, consult a qualified professional regarding your
            specific circumstances.
          </p>
          <p>
            © 2026 MSA Financial, LLC · All Rights Reserved · <a href="#">Privacy Policy</a> ·{" "}
            <a href="#">Website Disclosures</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
