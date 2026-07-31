/** Shared JSON-LD fragments for Preserve My Estate / MSA Financial. */

export const SITE_ORIGIN = "https://preserveyourestate.com";

export const ORG_ID = `${SITE_ORIGIN}/#org`;
export const PERSON_ID = `${SITE_ORIGIN}/#michael`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const publisherOrg = {
  "@type": "Organization" as const,
  "@id": ORG_ID,
  name: "MSA Financial",
  legalName: "Marino, Stram & Associates, LLC",
  alternateName: ["Preserve My Estate", "MSA Financial, LLC"],
  url: `${SITE_ORIGIN}/`,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_ORIGIN}/og.png`,
  },
};

export const authorPerson = {
  "@type": "Person" as const,
  "@id": PERSON_ID,
  name: "Michael Cammarata",
  honorificSuffix: "CFP®",
  jobTitle: "Managing Partner",
  url: `${SITE_ORIGIN}/about`,
  image: `${SITE_ORIGIN}/michael-cammarata-512.jpg`,
  worksFor: { "@id": ORG_ID },
  sameAs: [
    "https://www.linkedin.com/in/michael-cammarata-cfp",
    "https://www.msaplan.com/team/michael-cammarata",
  ],
  knowsAbout: [
    "Massachusetts estate tax",
    "Roth conversion planning",
    "trust funding",
    "tax-efficient investing",
  ],
};

export function articleLd(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@type": "Article" as const,
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": opts.url,
    },
    image: [`${SITE_ORIGIN}/og.png`],
    author: { "@id": PERSON_ID },
    publisher: {
      "@type": "Organization" as const,
      "@id": ORG_ID,
      name: "MSA Financial",
      legalName: "Marino, Stram & Associates, LLC",
      alternateName: ["Preserve My Estate", "MSA Financial, LLC"],
      logo: {
        "@type": "ImageObject" as const,
        url: `${SITE_ORIGIN}/og.png`,
      },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

export function breadcrumbLd(
  items: { name: string; item: string }[]
): {
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
} {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}
