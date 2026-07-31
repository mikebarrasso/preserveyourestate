import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav solid />
      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <p className="eyebrow hero-anim d1">404</p>
          <h1 className="hero-anim d2">
            That page isn&apos;t here. <em>These are.</em>
          </h1>
          <p className="lead hero-anim d3">
            The link may be outdated. Try one of the destinations below, or head home.
          </p>
          <div className="hero-ctas hero-anim d4" style={{ marginTop: "1.8rem" }}>
            <Link className="btn btn-gold" href="/">
              Home
            </Link>
            <Link className="btn btn-ghost" href="/calculator">
              Estate Tax Calculator
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="grid g3 stagger">
            <Link className="guide-card" href="/guides/massachusetts-estate-tax">
              <span className="guide-tag">Start here</span>
              <h3>Massachusetts Estate Tax Guide</h3>
              <p>Threshold, credit, rates, and who actually pays in 2026.</p>
              <span className="guide-meta">
                <span>Pillar guide</span>
                <span className="text-link">Read →</span>
              </span>
            </Link>
            <Link className="guide-card" href="/guides">
              <span className="guide-tag">Learn</span>
              <h3>All guides</h3>
              <p>A/B trusts, funding, Roth conversions, portability, and more.</p>
              <span className="guide-meta">
                <span>Library</span>
                <span className="text-link">Browse →</span>
              </span>
            </Link>
            <Link className="guide-card" href="/locations">
              <span className="guide-tag">Visit</span>
              <h3>Offices &amp; regions</h3>
              <p>Braintree, Sandwich, Framingham, and the communities we serve.</p>
              <span className="guide-meta">
                <span>Locations</span>
                <span className="text-link">Explore →</span>
              </span>
            </Link>
          </div>
          <p style={{ marginTop: "2.5rem" }}>
            <Link className="text-link" href="/#booking">
              Schedule the 45-Minute Review →
            </Link>
          </p>
        </div>
      </section>
      <Footer compact />
    </>
  );
}
