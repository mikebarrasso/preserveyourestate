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
              Investment Adviser (CRD #107768). Michael Cammarata is not an attorney or CPA and
              does not provide legal or tax advice. He does not draft legal documents or prepare
              tax returns. He coordinates with clients&apos; existing estate attorneys and CPAs.
              When needed, he can help identify qualified independent professionals; clients
              choose and engage them directly.
            </p>
            <p>
              © 2026 MSA Financial, LLC · All Rights Reserved ·{" "}
              <Link href="/">PreserveMyEstate.com</Link>
              {" · "}
              <Link href="/privacy">Privacy Policy</Link>
              {" · "}
              <Link href="/disclosures">Website Disclosures</Link>
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
              <br />
              All offices: <a href="tel:+17818433500">(781) 843-3500</a>
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
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/disclosures">Website Disclosures</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            Investment advisory services are offered through MSA Financial, LLC, a Registered
            Investment Adviser. Registration with the SEC does not imply a certain level of skill
            or training. This website is for educational purposes only and does not constitute
            legal, tax, or investment advice, or a solicitation to buy or sell any security.
            Michael Cammarata is not an attorney or CPA, does not provide legal advice, draft
            legal documents, or prepare tax returns. He coordinates with clients&apos; existing
            professionals and may help identify qualified independent attorneys or CPAs when
            needed; clients choose and engage those professionals directly. Illustrative tax
            figures reflect 2026 Massachusetts and federal law and individual results will vary.
            Consult a qualified professional regarding your specific circumstances.
          </p>
          <p>
            © 2026 MSA Financial, LLC · All Rights Reserved ·{" "}
            <Link href="/privacy">Privacy Policy</Link>
            {" · "}
            <Link href="/disclosures">Website Disclosures</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
