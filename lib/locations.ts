export type LocationKind = "office" | "region" | "town";

export type OfficeRef = "braintree" | "sandwich" | "framingham";

export type LocationPage = {
  slug: string;
  kind: LocationKind;
  name: string;
  regionLabel: string;
  nearestOffice: OfficeRef;
  title: string;
  description: string;
  heroLead: string;
  localAngle: string[];
  taxNote: string;
  servedTowns?: { name: string; slug?: string }[];
  relatedSlugs: string[];
  /** Office NAP — only for kind === "office" */
  address?: {
    street?: string;
    line2?: string;
    city: string;
    region: string;
    postalCode?: string;
    phone: string;
    appointmentOnly?: boolean;
  };
};

export const OFFICES = {
  braintree: {
    slug: "braintree",
    name: "Braintree",
    label: "South Shore headquarters",
    street: "25 Braintree Hill Park",
    line2: "Suite 303",
    city: "Braintree",
    region: "MA",
    postalCode: "02184",
    phone: "(781) 843-3500",
    phoneHref: "tel:+17818433500",
  },
  sandwich: {
    slug: "sandwich",
    name: "Sandwich",
    label: "Cape Cod & the Islands",
    street: "90 Route 6A",
    line2: "Unit 4A · Sextant Hill Office Park",
    city: "Sandwich",
    region: "MA",
    postalCode: "02563",
    phone: "(508) 833-9555",
    phoneHref: "tel:+15088339555",
  },
  framingham: {
    slug: "framingham",
    name: "Framingham",
    label: "MetroWest · by appointment",
    city: "Framingham",
    region: "MA",
    postalCode: "01701",
    phone: "(508) 879-1188",
    phoneHref: "tel:+15088791188",
    appointmentOnly: true,
  },
} as const;

export const LOCATIONS: LocationPage[] = [
  /* ─── Offices ─── */
  {
    slug: "braintree",
    kind: "office",
    name: "Braintree",
    regionLabel: "South Shore",
    nearestOffice: "braintree",
    title: "Estate & Tax Planning in Braintree, MA",
    description:
      "MSA Financial’s South Shore headquarters in Braintree. Coordinated Massachusetts estate tax, trust, and wealth planning for households over $2M.",
    heroLead:
      "Our main office sits at Braintree Hill Park, minutes from Route 3 and the South Shore communities where home equity and retirement accounts often push estates past Massachusetts’s $2M line.",
    localAngle: [
      "Braintree and neighboring South Shore towns combine long-held real estate with decades of retirement savings. That mix is exactly where the Massachusetts estate tax tends to surprise families who owe nothing federally.",
      "From this office we coordinate A/B trust design with your attorney, trust funding follow-through, Roth conversion timing, and portfolio decisions so the plan, the tax return, and the accounts agree.",
      "Clients typically drive in from Quincy, Weymouth, Hingham, Milton, Canton, Norwell, and Plymouth, or meet virtually after an in-person kickoff.",
    ],
    taxNote:
      "Under 2026 Massachusetts law, estates over $2M face graduated estate tax after a $99,600 credit. South Shore home values alone often put married couples into planning territory before they realize it.",
    address: {
      street: OFFICES.braintree.street,
      line2: OFFICES.braintree.line2,
      city: "Braintree",
      region: "MA",
      postalCode: "02184",
      phone: OFFICES.braintree.phone,
    },
    servedTowns: [
      { name: "Quincy" },
      { name: "Weymouth" },
      { name: "Hingham", slug: "hingham" },
      { name: "Milton" },
      { name: "Canton" },
      { name: "Norwell" },
      { name: "Scituate" },
      { name: "Marshfield" },
      { name: "Duxbury" },
      { name: "Plymouth", slug: "plymouth" },
      { name: "Hanover" },
      { name: "Cohasset" },
    ],
    relatedSlugs: ["south-shore", "hingham", "plymouth"],
  },
  {
    slug: "sandwich",
    kind: "office",
    name: "Sandwich",
    regionLabel: "Cape Cod",
    nearestOffice: "sandwich",
    title: "Estate & Tax Planning in Sandwich, MA",
    description:
      "MSA Financial’s Cape Cod office in Sandwich. Estate tax, trust funding, and wealth coordination for Cape and Islands families with $2M+.",
    heroLead:
      "Our Sandwich office on Route 6A serves Cape Cod and the Islands, where second homes, inherited property, and seasonal liquidity create estate-tax exposure that looks different from Boston suburbs.",
    localAngle: [
      "Cape families often hold a primary residence plus a cottage, rental, or land that has appreciated for decades. Massachusetts counts that equity toward the $2M estate-tax threshold even when cash flow feels seasonal.",
      "We help coordinate deed retitling into trusts, beneficiary designations on IRAs that fund Cape properties, and Roth conversion windows that respect both federal IRMAA and Massachusetts income surtax risk.",
      "Convenient for Barnstable, Falmouth, Mashpee, Bourne, and Upper Cape households who prefer a local meeting without driving to Boston.",
    ],
    taxNote:
      "Cape Cod real estate appreciation is a frequent reason households cross Massachusetts’s $2M estate-tax line. Proper trust funding of deeds is non-negotiable if an A/B structure is meant to work at the first death.",
    address: {
      street: OFFICES.sandwich.street,
      line2: OFFICES.sandwich.line2,
      city: "Sandwich",
      region: "MA",
      postalCode: "02563",
      phone: OFFICES.sandwich.phone,
    },
    servedTowns: [
      { name: "Barnstable", slug: "barnstable" },
      { name: "Falmouth", slug: "falmouth" },
      { name: "Mashpee" },
      { name: "Bourne" },
      { name: "Yarmouth" },
      { name: "Dennis" },
      { name: "Brewster" },
      { name: "Harwich" },
      { name: "Chatham" },
      { name: "Orleans" },
      { name: "Martha’s Vineyard" },
      { name: "Nantucket" },
    ],
    relatedSlugs: ["cape-cod", "falmouth", "barnstable"],
  },
  {
    slug: "framingham",
    kind: "office",
    name: "Framingham",
    regionLabel: "MetroWest",
    nearestOffice: "framingham",
    title: "Estate & Tax Planning in Framingham, MA",
    description:
      "MSA Financial’s MetroWest presence in Framingham (by appointment). Coordinated estate tax and wealth planning for Natick, Wellesley, Weston, and nearby towns.",
    heroLead:
      "Our Framingham presence is by appointment for MetroWest families who want fiduciary coordination close to Natick, Wellesley, Weston, and the 128/Mass Pike corridor.",
    localAngle: [
      "MetroWest households often combine high home values, concentrated equity compensation history, and sizable IRAs. That stack creates both Massachusetts estate-tax exposure and income-tax timing decisions in the same decade.",
      "Meetings here focus on the same coordinated process as Braintree: estate structure with your attorney, funding execution, Roth and RMD planning, and portfolio location, without product pressure.",
      "Because this location is appointment-only, we confirm logistics when you schedule. Many families alternate between Framingham and virtual follow-ups.",
    ],
    taxNote:
      "MetroWest estates frequently sit between the Massachusetts $2M threshold and the much higher federal exemption, which is exactly where state-only estate tax planning has the most leverage.",
    address: {
      city: "Framingham",
      region: "MA",
      postalCode: "01701",
      phone: OFFICES.framingham.phone,
      appointmentOnly: true,
    },
    servedTowns: [
      { name: "Natick" },
      { name: "Wellesley", slug: "wellesley" },
      { name: "Weston", slug: "weston" },
      { name: "Wayland" },
      { name: "Sudbury" },
      { name: "Needham" },
      { name: "Newton" },
      { name: "Concord" },
      { name: "Sherborn" },
      { name: "Hopkinton" },
      { name: "Southborough" },
      { name: "Ashland" },
    ],
    relatedSlugs: ["metrowest", "wellesley", "weston"],
  },

  /* ─── Regions ─── */
  {
    slug: "south-shore",
    kind: "region",
    name: "South Shore",
    regionLabel: "South Shore Massachusetts",
    nearestOffice: "braintree",
    title: "South Shore MA Estate Tax & Wealth Planning",
    description:
      "Massachusetts estate tax and coordinated wealth planning for South Shore families. Based in Braintree, serving Hingham, Quincy, Plymouth, and nearby towns.",
    heroLead:
      "The South Shore is MSA Financial’s home base: Braintree headquarters serving coastal and inland communities where real estate and retirement assets quietly create six-figure Massachusetts estate-tax bills.",
    localAngle: [
      "From Quincy to Plymouth, many households built wealth the unglamorous way: a house held for thirty years, steady 401(k) contributions, and maybe a family business. That balance sheet often clears $2M without feeling “wealthy.”",
      "South Shore planning conversations usually start with portability (Massachusetts has none), whether the revocable trust is actually funded, and whether Roth conversions still fit before RMDs begin.",
      "We work alongside your South Shore or Boston estate attorney and CPA so documents, tax filings, and investments stay aligned.",
    ],
    taxNote:
      "Illustrative 2026 Massachusetts estate tax before planning: about $82,400 on a $3M estate and about $180,800 on a $4M estate. Model your number with our calculator, then review structure in Braintree.",
    servedTowns: [
      { name: "Braintree", slug: "braintree" },
      { name: "Hingham", slug: "hingham" },
      { name: "Plymouth", slug: "plymouth" },
      { name: "Quincy" },
      { name: "Weymouth" },
      { name: "Milton" },
      { name: "Cohasset" },
      { name: "Norwell" },
      { name: "Scituate" },
      { name: "Marshfield" },
      { name: "Duxbury" },
      { name: "Canton" },
    ],
    relatedSlugs: ["braintree", "hingham", "plymouth"],
  },
  {
    slug: "cape-cod",
    kind: "region",
    name: "Cape Cod",
    regionLabel: "Cape Cod & the Islands",
    nearestOffice: "sandwich",
    title: "Cape Cod Estate Tax & Wealth Planning",
    description:
      "Estate tax and trust coordination for Cape Cod and Islands families. MSA Financial’s Sandwich office serves Barnstable, Falmouth, and the Upper and Lower Cape.",
    heroLead:
      "Cape Cod wealth often lives in land and houses as much as in brokerage accounts. That makes Massachusetts estate tax and trust funding especially consequential for year-round and seasonal residents alike.",
    localAngle: [
      "Inherited Capes, buildable lots, and multi-generation cottages create title and funding complexity that generic national planners miss. Deeds, LLC interests in rental property, and out-of-state heirs all need a coordinated map.",
      "We help Sandwich-area families stress-test whether an A/B trust, ILIT, or simpler structure fits, then make sure assets are titled so the documents actually work.",
      "Islands clients (Martha’s Vineyard and Nantucket) typically combine remote planning with periodic Cape meetings.",
    ],
    taxNote:
      "When Cape real estate plus retirement accounts exceed $2M, Massachusetts estate tax applies even if federal estate tax does not. Second-home liquidity planning matters as much as the trust binder on the shelf.",
    servedTowns: [
      { name: "Sandwich", slug: "sandwich" },
      { name: "Barnstable", slug: "barnstable" },
      { name: "Falmouth", slug: "falmouth" },
      { name: "Mashpee" },
      { name: "Bourne" },
      { name: "Yarmouth" },
      { name: "Dennis" },
      { name: "Chatham" },
      { name: "Orleans" },
      { name: "Brewster" },
      { name: "Harwich" },
      { name: "Nantucket" },
    ],
    relatedSlugs: ["sandwich", "falmouth", "barnstable"],
  },
  {
    slug: "metrowest",
    kind: "region",
    name: "MetroWest",
    regionLabel: "MetroWest Boston",
    nearestOffice: "framingham",
    title: "MetroWest MA Estate Tax & Wealth Planning",
    description:
      "Estate tax and fiduciary wealth planning for MetroWest Massachusetts. Appointment-based Framingham presence serving Wellesley, Weston, Natick, and nearby towns.",
    heroLead:
      "MetroWest is where high home prices, professional income, and concentrated investment accounts meet Massachusetts’s low estate-tax threshold. Our Framingham presence exists for those families.",
    localAngle: [
      "Towns like Wellesley, Weston, Needham, and Concord routinely produce estates that are “federal-safe” but Massachusetts-exposed. Portability myths are common; funding gaps are commoner.",
      "Planning here often includes equity compensation leftovers, 529 and education funding alongside estate goals, and Roth conversions timed around peak earning years versus early retirement.",
      "Schedule through Framingham (appointment-only) or start with a Braintree / virtual review if timing is tighter.",
    ],
    taxNote:
      "A married MetroWest couple with a $4M combined estate and no credit-shelter planning can face roughly $180,800 of Massachusetts estate tax at the second death (illustrative, 2026 law). Structure and funding change that math.",
    servedTowns: [
      { name: "Framingham", slug: "framingham" },
      { name: "Wellesley", slug: "wellesley" },
      { name: "Weston", slug: "weston" },
      { name: "Natick" },
      { name: "Wayland" },
      { name: "Sudbury" },
      { name: "Needham" },
      { name: "Newton" },
      { name: "Concord" },
      { name: "Lexington" },
      { name: "Sherborn" },
      { name: "Hopkinton" },
    ],
    relatedSlugs: ["framingham", "wellesley", "weston"],
  },

  /* ─── Tier-2 towns ─── */
  {
    slug: "hingham",
    kind: "town",
    name: "Hingham",
    regionLabel: "South Shore",
    nearestOffice: "braintree",
    title: "Estate Tax Planning for Hingham, MA Families",
    description:
      "Massachusetts estate tax and trust coordination for Hingham households. Served from MSA Financial’s Braintree office on the South Shore.",
    heroLead:
      "Hingham’s combination of waterfront and near-waterfront housing, long tenure, and professional households makes Massachusetts estate-tax planning a practical conversation, not a theoretical one.",
    localAngle: [
      "Many Hingham estates are “house-heavy”: a primary residence that has multiplied in value while retirement accounts grew in the background. Massachusetts taxes that total above $2M even when lifestyle still feels local and grounded.",
      "We regularly review whether joint ownership, TOD/POD designations, and an unfunded revocable trust are quietly undoing an otherwise thoughtful plan.",
      "Meetings are typically at our Braintree headquarters (about a short drive via Route 3) or by video after the first session.",
    ],
    taxNote:
      "If your Hingham home equity plus investable assets approach or exceed $2M, run the Massachusetts estate tax calculator, then schedule a review focused on portability, funding, and Roth timing.",
    relatedSlugs: ["braintree", "south-shore", "plymouth"],
  },
  {
    slug: "plymouth",
    kind: "town",
    name: "Plymouth",
    regionLabel: "South Shore",
    nearestOffice: "braintree",
    title: "Estate Tax Planning for Plymouth, MA Families",
    description:
      "Estate tax and wealth coordination for Plymouth, MA. South Shore planning from MSA Financial’s Braintree office for households over ~$2M.",
    heroLead:
      "Plymouth families often hold larger lots, longer ownership histories, and multi-generational property questions that collide with Massachusetts’s $2M estate-tax threshold.",
    localAngle: [
      "Land, conservation concerns, and inherited parcels show up more often in Plymouth planning than in denser inner suburbs. Title cleanup and trust funding are frequently the first real work.",
      "We coordinate with your attorney on how deeds and entities should sit inside the estate plan, then align investment and Roth strategy with the same map.",
      "Braintree is the usual meeting location for Plymouth clients; virtual reviews work well for follow-through.",
    ],
    taxNote:
      "A $3M Plymouth-area estate can face roughly $82,400 of Massachusetts estate tax before planning (illustrative, 2026). Married couples without a funded credit-shelter strategy may use only one $2M exemption.",
    relatedSlugs: ["braintree", "south-shore", "hingham"],
  },
  {
    slug: "falmouth",
    kind: "town",
    name: "Falmouth",
    regionLabel: "Cape Cod",
    nearestOffice: "sandwich",
    title: "Estate Tax Planning for Falmouth, MA Families",
    description:
      "Cape Cod estate tax and trust planning for Falmouth. Served from MSA Financial’s Sandwich office for year-round and seasonal residents.",
    heroLead:
      "Falmouth’s mix of year-round homes and seasonal properties creates estate balance sheets that look simple until you add Massachusetts tax, deeds, and out-of-town heirs.",
    localAngle: [
      "Seasonal rental income, coastal insurance costs, and multiple parcels complicate both cash-flow planning and estate math. We keep the investment plan and the estate structure from drifting apart.",
      "Trust funding for Falmouth real estate should be attorney-led; our role is making sure the financial accounts, beneficiaries, and liquidity plan support that legal work.",
      "Most Falmouth clients meet in Sandwich or virtually.",
    ],
    taxNote:
      "Cape property that has been in the family for decades can push a household over Massachusetts’s $2M line even when the brokerage statement looks moderate. Count every deed.",
    relatedSlugs: ["sandwich", "cape-cod", "barnstable"],
  },
  {
    slug: "barnstable",
    kind: "town",
    name: "Barnstable",
    regionLabel: "Cape Cod",
    nearestOffice: "sandwich",
    title: "Estate Tax Planning for Barnstable, MA Families",
    description:
      "Estate tax and fiduciary planning for Barnstable (Hyannis and villages). Coordinated from MSA Financial’s Sandwich Cape Cod office.",
    heroLead:
      "Barnstable is the Cape’s population center. Families here often juggle village real estate, business interests, and retirement accounts under the same Massachusetts estate-tax rules as Boston suburbs.",
    localAngle: [
      "Hyannis and the surrounding villages produce practical planning issues: operating businesses, rentals, and homes that need clear succession paths, not just a will in a drawer.",
      "We help prioritize what to fix first: exposure estimate, trust funding status, then multi-year Roth and RMD strategy.",
      "Sandwich is a short drive for in-person work; many reviews start there.",
    ],
    taxNote:
      "Massachusetts has no estate-tax portability between spouses. Barnstable couples with combined estates over $2M should understand what happens at the first death before assuming “the survivor will be fine.”",
    relatedSlugs: ["sandwich", "cape-cod", "falmouth"],
  },
  {
    slug: "wellesley",
    kind: "town",
    name: "Wellesley",
    regionLabel: "MetroWest",
    nearestOffice: "framingham",
    title: "Estate Tax Planning for Wellesley, MA Families",
    description:
      "Massachusetts estate tax planning for Wellesley households. MetroWest coordination via MSA Financial’s Framingham appointment office.",
    heroLead:
      "Wellesley’s home values and professional wealth mean many families are Massachusetts estate-tax clients long before they are federal estate-tax clients.",
    localAngle: [
      "Planning conversations in Wellesley often include concentrated stock, 529 funding, and multi-trust structures that only work if titles and beneficiaries match the documents.",
      "We act as the fiduciary coordinator among your attorney, CPA, and portfolio, not as a document draftsman.",
      "Meet by appointment in Framingham or begin with a focused virtual review.",
    ],
    taxNote:
      "If your Wellesley residence and investable assets already exceed $2M, the question is not whether Massachusetts estate tax exists, it is whether your current structure uses both spouses’ exemptions.",
    relatedSlugs: ["framingham", "metrowest", "weston"],
  },
  {
    slug: "weston",
    kind: "town",
    name: "Weston",
    regionLabel: "MetroWest",
    nearestOffice: "framingham",
    title: "Estate Tax Planning for Weston, MA Families",
    description:
      "Estate tax and wealth coordination for Weston, MA. Appointment-based MetroWest planning through MSA Financial / Preserve My Estate.",
    heroLead:
      "Weston households frequently hold estates that are large by Massachusetts standards and still below the federal exemption, the exact band where state estate-tax planning pays for itself.",
    localAngle: [
      "Large lots, long ownership, and sophisticated but siloed professional advice are a common pattern. The gap is coordination: attorney, CPA, and advisor seeing the same balance sheet.",
      "Reviews emphasize credit-shelter design readiness, funding status, and income-tax sequencing (Roth, RMDs, surtax).",
      "Framingham appointments and virtual sessions are both available.",
    ],
    taxNote:
      "Illustrative Massachusetts estate tax on $6M before planning is about $411,200 (2026 law). Weston-scale estates should not rely on federal portability assumptions for state exposure.",
    relatedSlugs: ["framingham", "metrowest", "wellesley"],
  },
];

export function getLocation(slug: string): LocationPage | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function allLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}

export function locationsByKind(kind: LocationKind): LocationPage[] {
  return LOCATIONS.filter((l) => l.kind === kind);
}

export function getRelated(slugs: string[]): LocationPage[] {
  return slugs
    .map((s) => getLocation(s))
    .filter((l): l is LocationPage => Boolean(l));
}
