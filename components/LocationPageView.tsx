import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  OFFICES,
  getRelated,
  type LocationPage,
} from "@/lib/locations";

const KIND_LABEL: Record<LocationPage["kind"], string> = {
  office: "Office",
  region: "Region",
  town: "Community",
};

export default function LocationPageView({ location }: { location: LocationPage }) {
  const office = OFFICES[location.nearestOffice];
  const related = getRelated(location.relatedSlugs);

  return (
    <>
      <Nav solid />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="wrap">
          <nav className="crumbs hero-anim d1">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/locations">Locations</Link>
            <span>/</span>
            <span>{location.name}</span>
          </nav>
          <p className="eyebrow hero-anim d1" style={{ marginTop: "1.2rem" }}>
            {KIND_LABEL[location.kind]} · {location.regionLabel}
          </p>
          <h1 className="hero-anim d2">
            {location.kind === "office" ? (
              <>
                MSA Financial in <em>{location.name}</em>
              </>
            ) : location.kind === "region" ? (
              <>
                Estate &amp; tax planning on the <em>{location.name}</em>
              </>
            ) : (
              <>
                Estate tax planning for <em>{location.name}, MA</em>
              </>
            )}
          </h1>
          <p className="lead hero-anim d3">{location.heroLead}</p>
        </div>
      </section>

      <section>
        <div className="wrap loc-page-grid">
          <div className="article">
            <h2>Why this matters here</h2>
            {location.localAngle.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}

            <div className="callout reveal">
              <b>Massachusetts estate tax context:</b> {location.taxNote}
            </div>

            {location.servedTowns && location.servedTowns.length > 0 && (
              <>
                <h2>Communities we commonly serve</h2>
                <p>
                  Families in these towns often work with our {office.name} team for coordinated
                  planning:
                </p>
                <ul className="loc-town-list">
                  {location.servedTowns.map((t) => (
                    <li key={t.name}>
                      {t.slug ? <Link href={`/locations/${t.slug}`}>{t.name}</Link> : t.name}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2>What we coordinate</h2>
            <ul>
              <li>Massachusetts estate-tax exposure and credit-shelter / A/B readiness</li>
              <li>Trust funding and beneficiary alignment (with your attorney drafting documents)</li>
              <li>Roth conversion and RMD timing against IRMAA and the MA surtax</li>
              <li>Portfolio decisions that match the estate and tax plan</li>
            </ul>

            <div className="next-step reveal-scale" style={{ marginTop: "2.5rem" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Next Step
              </p>
              <h3>Schedule a complimentary 45-minute review</h3>
              <p>
                For Massachusetts households with roughly $2M+ in investable assets. Educational
                conversation with Michael Cammarata, CFP® / MSA Financial. Educational only. No
                obligation.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-gold" href="/#booking">
                  Schedule the 45-Minute Review <span className="arrow">→</span>
                </Link>
                <Link className="btn btn-ghost" href="/calculator">
                  Try the Estate Tax Calculator
                </Link>
              </div>
            </div>

            <p className="fine" style={{ marginTop: "2rem" }}>
              Investment advisory services offered through MSA Financial, LLC (CRD #107768), a
              Registered Investment Adviser. Educational content only, not legal, tax, or investment
              advice. Michael Cammarata is not an attorney.
            </p>
          </div>

          <aside className="loc-aside">
            <div className="loc-aside-card">
              <p className="eyebrow">Nearest Office</p>
              <h3>{office.name}</h3>
              <p className="loc-aside-label">{office.label}</p>
              {"street" in office && office.street && (
                <p>
                  {office.street}
                  {"line2" in office && office.line2 ? (
                    <>
                      <br />
                      {office.line2}
                    </>
                  ) : null}
                  <br />
                  {office.city}, {office.region}
                  {"postalCode" in office && office.postalCode ? ` ${office.postalCode}` : ""}
                </p>
              )}
              {"appointmentOnly" in office && office.appointmentOnly && !("street" in office && office.street) && (
                <p>
                  {office.city}, {office.region}
                  {"postalCode" in office && office.postalCode ? ` ${office.postalCode}` : ""}
                  <br />
                  <em>By appointment only</em>
                </p>
              )}
              <p style={{ marginTop: "0.8rem" }}>
                <a href={office.phoneHref}>{office.phone}</a>
              </p>
              {location.kind !== "office" && (
                <Link className="text-link" href={`/locations/${office.slug}`} style={{ marginTop: "0.6rem", display: "inline-block" }}>
                  Office details →
                </Link>
              )}
              {location.kind === "office" && location.address?.appointmentOnly && (
                <p className="fine" style={{ marginTop: "0.8rem" }}>
                  Confirm meeting logistics when you schedule.
                </p>
              )}
            </div>

            <div className="loc-aside-card">
              <p className="eyebrow">Deep Dives</p>
              <ul className="loc-aside-links">
                <li>
                  <Link href="/guides/massachusetts-estate-tax">MA Estate Tax Guide</Link>
                </li>
                <li>
                  <Link href="/guides/ab-trust">A/B Trust Planning</Link>
                </li>
                <li>
                  <Link href="/guides/trust-funding">Trust Funding Checklist</Link>
                </li>
                <li>
                  <Link href="/guides/roth-conversion">Roth Conversion Strategy</Link>
                </li>
                <li>
                  <Link href="/calculator">Estate Tax Calculator</Link>
                </li>
                <li>
                  <Link href="/about">About Michael</Link>
                </li>
              </ul>
            </div>

            {related.length > 0 && (
              <div className="loc-aside-card">
                <p className="eyebrow">Nearby</p>
                <ul className="loc-aside-links">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/locations/${r.slug}`}>{r.name}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/locations">All locations</Link>
                  </li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
