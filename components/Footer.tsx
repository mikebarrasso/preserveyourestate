import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import MsaLockup from "@/components/MsaLockup";

function BuiltBy() {
  return (
    <a
      className="built-by"
      href="https://wealthreach.ai"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Built by WealthReach, opens wealthreach.ai"
    >
      <span>Built by</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/wealthreach-logo.png" alt="WealthReach" height={16} />
    </a>
  );
}

export default function Footer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="footer">
        <div className="wrap">
          <Link href="/" className="footer-brand-link" aria-label="Preserve My Estate, home">
            <BrandLogo variant="lockup" tone="dark" className="footer-brand-logo compact" />
          </Link>
          <nav className="footer-compact-links" aria-label="Quick links">
            <Link href="/">Home</Link>
            <span aria-hidden="true">·</span>
            <Link href="/calculator">Calculator</Link>
            <span aria-hidden="true">·</span>
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">·</span>
            <Link href="/locations">Locations</Link>
            <span aria-hidden="true">·</span>
            <Link href="/#booking">Booking</Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/disclosures">Disclosures</Link>
          </nav>
          <div className="footer-legal" style={{ paddingTop: "1.25rem" }}>
            <p>
              Investment advisory services are offered through Marino, Stram &amp; Associates, LLC
              d/b/a MSA Financial, a Registered Investment Adviser (CRD #107768). Educational
              content only, not legal, tax, or investment advice.
            </p>
            <div className="footer-baseline">
              <p>
                © 2026 Marino, Stram &amp; Associates, LLC d/b/a MSA Financial · All Rights
                Reserved · Preserve My Estate · <Link href="/">preserveyourestate.com</Link>
              </p>
              <BuiltBy />
            </div>
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
              <li><Link href="/guides">Deep-Dive Guides</Link></li>
              <li><Link href="/locations">Locations</Link></li>
              <li><Link href="/about">About Michael</Link></li>
              <li><Link href="/guides">Estate Planning Guides</Link></li>
              <li><Link href="/#booking">Schedule a Review</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Regulatory</h4>
            <p>
              <b style={{ color: "rgba(255,255,255,0.85)" }}>MSA Financial</b>
              <br />
              Marino, Stram &amp; Associates, LLC
              <br />
              SEC Registered Investment Adviser · CRD #107768
            </p>
            <p style={{ marginTop: "0.9rem", fontSize: "0.88rem", lineHeight: 1.55 }}>
              <Link href="/locations/braintree">Braintree</Link> · 25 Braintree Hill Park, Suite
              303 · <a href="tel:+17818433500">(781) 843-3500</a>
              <br />
              <Link href="/locations/sandwich">Sandwich</Link> · 90 Route 6A, Unit 4A ·{" "}
              <a href="tel:+15088339555">(508) 833-9555</a>
              <br />
              <Link href="/locations/framingham">Framingham</Link> · By appointment ·{" "}
              <a href="tel:+15088791188">(508) 879-1188</a>
            </p>
            <ul style={{ marginTop: "1.2rem" }}>
              <li>
                <a
                  href="https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=1048932"
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
            Investment advisory services are offered through Marino, Stram &amp; Associates, LLC
            d/b/a MSA Financial, a Registered Investment Adviser. Registration with the SEC does
            not imply a certain level of skill or training. This website is for educational
            purposes only and does not constitute legal, tax, or investment advice, or a
            solicitation to buy or sell any security. Michael Cammarata is not an attorney and does
            not provide legal advice; estate planning documents are drafted by independent
            Massachusetts attorneys of the client&apos;s choosing. Certain Advisory Persons may
            receive insurance commissions if products are implemented outside the advisory
            relationship; see Form ADV and Form CRS. Illustrative tax figures reflect 2026
            Massachusetts and federal law and individual results will vary; consult a qualified
            professional regarding your specific circumstances. AUM figures, where shown, are as
            of the Form ADV reporting date stated on the page.
          </p>
          <div className="footer-baseline">
            <p>
              © 2026 Marino, Stram &amp; Associates, LLC d/b/a MSA Financial · All Rights Reserved
              · Preserve My Estate · <Link href="/">preserveyourestate.com</Link> ·{" "}
              <Link href="/privacy">Privacy Policy</Link> ·{" "}
              <Link href="/disclosures">Website Disclosures</Link> ·{" "}
              <Link href="/terms">Terms of Use</Link>
            </p>
            <BuiltBy />
          </div>
        </div>
      </div>
    </footer>
  );
}
