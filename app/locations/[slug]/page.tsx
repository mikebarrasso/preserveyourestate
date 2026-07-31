import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPageView from "@/components/LocationPageView";
import {
  OFFICES,
  allLocationSlugs,
  getLocation,
} from "@/lib/locations";
import { SITE_ORIGIN, breadcrumbLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      url: `${SITE_ORIGIN}/locations/${location.slug}`,
      title: location.title,
      description: location.description,
    },
  };
}

export default async function LocationSlugPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const office = OFFICES[location.nearestOffice];
  const pageUrl = `${SITE_ORIGIN}/locations/${location.slug}`;

  const graph: Record<string, unknown>[] = [
    breadcrumbLd([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Locations", item: `${SITE_ORIGIN}/locations` },
      { name: location.name, item: pageUrl },
    ]),
    {
      "@type": "WebPage",
      name: location.title,
      url: pageUrl,
      description: location.description,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#org` },
    },
  ];

  if (location.kind === "office" && location.address) {
    graph.push({
      "@type": "FinancialService",
      "@id": `${pageUrl}#local`,
      name: `MSA Financial, LLC — ${location.name}`,
      url: pageUrl,
      parentOrganization: { "@id": `${SITE_ORIGIN}/#org` },
      telephone: location.address.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: [location.address.street, location.address.line2]
          .filter(Boolean)
          .join(", "),
        addressLocality: location.address.city,
        addressRegion: location.address.region,
        postalCode: location.address.postalCode,
        addressCountry: "US",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: location.regionLabel,
      },
    });
  } else {
    graph.push({
      "@type": "Service",
      name: `Massachusetts estate & tax planning — ${location.name}`,
      url: pageUrl,
      provider: { "@id": `${SITE_ORIGIN}/#org` },
      areaServed: {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "State",
          name: "Massachusetts",
        },
      },
      serviceType: "Wealth and estate planning coordination",
      description: location.description,
    });
  }

  // Ensure nearest office phone is discoverable on town/region pages
  graph.push({
    "@type": "ContactPoint",
    telephone: office.phone,
    contactType: "customer service",
    areaServed: "US-MA",
    availableLanguage: "English",
  });

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageView location={location} />
    </>
  );
}
