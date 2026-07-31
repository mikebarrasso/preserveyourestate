import type { MetadataRoute } from "next";
import { allLocationSlugs } from "@/lib/locations";

const GUIDE_SLUGS = [
  "massachusetts-estate-tax",
  "federal-vs-massachusetts-estate-tax",
  "massachusetts-estate-tax-portability",
  "ab-trust",
  "trust-funding",
  "roth-conversion",
  "massachusetts-millionaire-surtax",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: "https://preserveyourestate.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://preserveyourestate.com/calculator", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://preserveyourestate.com/about", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://preserveyourestate.com/guides", lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: "https://preserveyourestate.com/locations", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://preserveyourestate.com/privacy", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://preserveyourestate.com/disclosures", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://preserveyourestate.com/terms", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guides: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `https://preserveyourestate.com/guides/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: slug === "massachusetts-estate-tax" ? 0.9 : 0.85,
  }));

  const officePriority = new Set([
    "braintree", "sandwich", "framingham", "south-shore", "cape-cod", "metrowest",
  ]);

  const locations: MetadataRoute.Sitemap = allLocationSlugs().map((slug) => ({
    url: `https://preserveyourestate.com/locations/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: officePriority.has(slug) ? 0.75 : 0.65,
  }));

  return [...core, ...guides, ...locations];
}
