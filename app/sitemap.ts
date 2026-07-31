import type { MetadataRoute } from "next";

const BASE_URL = "https://preservemyestate.com";
const LAST_UPDATED = new Date("2026-07-29");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${BASE_URL}/michael-cammarata.jpg`],
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/ab-trust`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
