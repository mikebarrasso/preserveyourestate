import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import MsaLockup from "@/components/MsaLockup";
import siteConfig from "../data/site-config.json";

export default function Footer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return {
      "component": (
        <footer className="footer">
          <div className="wrap">
            <Link href="/" className="footer-brand-link" aria-label="Preserve Your Estate, home">
              <BrandLogo variant="lockup" tone="dark" className="footer-brand-logo compact" />
            </Link>
            <div className="footer-legal" style={{ paddingTop: 0 }}>
              <p>
                {siteConfig.compliance.disclosures[0]}
              </p>
              <p>
                © 2026 {siteConfig.brand.legalName} · All Rights Reserved ·{" "}
                <Link href="/">PreserveYourEstate.com</Link>
                {" · "}
                <Link href="/privacy">Privacy Policy</Link>
                {" · "}
                <Link href="/disclosures">Website Disclosures</Link>
              </p>
            </div>
          </div>
        </footer>
      )
    }.component;
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand-link" aria-label="Preserve Your Estate, home">
              <BrandLogo variant="lockup" tone="dark" className="footer-brand-logo" />
            </Link>
            <p>
              {siteConfig.brand.tagline}
            </p>
            <p style={{ marginTop: "0.8rem" }}>SEC Registered RIA · CRD #107768</p>
            <div className="footer-adviser-mark">
              <MsaLockup />
            </div>
          </div>
          <div>
            <h4>{siteConfig.footer.groups[0]?.heading || "Quick Links"}</h4>
            <ul>
              {(siteConfig.footer.groups[0]?.links || []).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Regulatory</h4>
            <p>
              <b style={{ color: "rgba(255,255,255,0.85)" }}>{siteConfig.brand.legalName}</b>
              <br />
              SEC Registered Investment Adviser · CRD #107768
              <br />
              {siteConfig.contact.address}
              <br />
              All offices: <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
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
            {siteConfig.compliance.disclosures[1]}
          </p>
          <p>
            © 2026 {siteConfig.brand.legalName} · All Rights Reserved ·{" "}
            <Link href="/privacy">Privacy Policy</Link>
            {" · "}
            <Link href="/disclosures">Website Disclosures</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
