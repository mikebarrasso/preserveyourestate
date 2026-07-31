import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OFFICES, locationsByKind } from "@/lib/locations";
import { SITE_ORIGIN, breadcrumbLd } from "@/lib/schema";

const title = "Massachusetts Office Locations";
const description =
  "MSA Financial offices in Braintree, Sandwich, and Framingham, plus South Shore, Cape Cod, and MetroWest estate-tax planning pages.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/locations" },
  openGraph: {
    url: `${SITE_ORIGIN}/locations`,
    title,
    description,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: title,
      url: `${SITE_ORIGIN}/locations`,
      description,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      publisher: { "@id": `${SITE_ORIGIN}/#org` },
    },
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Locations", item: `${SITE_ORIGIN}/locations` },
    ]),
  ],
};

export default function LocationsIndexPage() {
  const offices = locationsByKind("office");
  const regions = locationsByKind("region");
  const towns = locationsByKind("town");

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
            <span>Locations</span>
          </nav>
          <h1 className="hero-anim d2">
            Three offices. <em>One planning team.</em>
          </h1>
          <p className="lead hero-anim d3">
            Braintree headquarters, a Cape Cod office in Sandwich, and an appointment-based
            MetroWest presence in Framingham, serving Massachusetts families coordinating estate
            tax, trusts, and wealth decisions.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Offices</p>
            <h2>
              Where to meet <em>MSA Financial</em>
            </h2>
          </div>
          <div className="grid g3 stagger">
            {offices.map((o) => {
              const nap = OFFICES[o.nearestOffice];
              return (
                <Link key={o.slug} className="guide-card" href={`/locations/${o.slug}`}>
                  <span className="guide-tag">{nap.label}</span>
                  <h3>{o.name}</h3>
                  <p>
                    {"street" in nap && nap.street
                      ? `${nap.street}${nap.line2 ? `, ${nap.line2}` : ""} · ${nap.phone}`
                      : `By appointment · ${nap.phone}`}
                  </p>
                  <span className="guide-meta">
                    <span>{o.regionLabel}</span>
                    <span className="text-link">Office details →</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="section-head reveal" style={{ marginTop: "4rem" }}>
            <p className="eyebrow">Regions</p>
            <h2>
              South Shore, Cape Cod, and <em>MetroWest</em>
            </h2>
            <p className="lead">
              Regional pages explain how Massachusetts estate tax shows up in each market, then
              connect you to the nearest office and local communities we serve.
            </p>
          </div>
          <div className="grid g3 stagger">
            {regions.map((r) => (
              <Link key={r.slug} className="guide-card" href={`/locations/${r.slug}`}>
                <span className="guide-tag">Region</span>
                <h3>{r.name}</h3>
                <p>{r.description}</p>
                <span className="guide-meta">
                  <span>Nearest: {OFFICES[r.nearestOffice].name}</span>
                  <span className="text-link">Explore →</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="section-head reveal" style={{ marginTop: "4rem" }}>
            <p className="eyebrow">Communities</p>
            <h2>
              Focused pages for high-fit <em>towns</em>
            </h2>
            <p className="lead">
              Not every Massachusetts town needs its own page. These communities have a clear
              wealth and estate-tax profile relative to our offices.
            </p>
          </div>
          <div className="grid g3 stagger">
            {towns.map((t) => (
              <Link key={t.slug} className="guide-card" href={`/locations/${t.slug}`}>
                <span className="guide-tag">{t.regionLabel}</span>
                <h3>{t.name}</h3>
                <p>{t.heroLead}</p>
                <span className="guide-meta">
                  <span>Via {OFFICES[t.nearestOffice].name}</span>
                  <span className="text-link">Read →</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="next-step reveal-scale" style={{ marginTop: "3.5rem" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Next Step
            </p>
            <h3>Not sure which office fits?</h3>
            <p>
              Start with the complimentary review. We&apos;ll match you to Braintree, Sandwich, or
              Framingham based on where you live and how you prefer to meet.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-gold" href="/#booking">
                Schedule the 45-Minute Review <span className="arrow">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/calculator">
                Estimate Your Estate Tax
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer compact />
    </>
  );
}
