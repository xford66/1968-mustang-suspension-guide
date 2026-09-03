import type { MustangYear } from "./years";

export type Tier = "bolt-on" | "mustang-ii" | "full-chassis";

export type Kit = {
  slug: string;
  brand: string;
  name: string;
  tier: Tier;
  years: MustangYear[];
  overview: string;
  tags: string[];
  install: string;
  priceRange: string;
  details: string;
};

export const TIER_META: Record<
  Tier,
  { title: string; blurb: string }
> = {
  "bolt-on": {
    title: "Bolt-on / factory style",
    blurb:
      "Uses stock mounting points. Tubular arms, coilovers, sway bars. Weekend-garage friendly.",
  },
  "mustang-ii": {
    title: "Mustang II / IFS swap",
    blurb:
      "Replaces the front clip with a Mustang II-style independent front suspension. Cutting and welding required.",
  },
  "full-chassis": {
    title: "Full chassis / pro-touring",
    blurb:
      "New subframe or complete chassis under the body. Biggest geometry and ride-quality jump.",
  },
};

export const KITS: Kit[] = [
  {
    slug: "global-west-coilover",
    brand: "Global West",
    name: "Negative Roll coilover kit",
    tier: "bolt-on",
    years: [1967, 1968, 1969, 1970],
    overview:
      "Tubular control arms, adjustable strut rods, and QA1 coilovers that keep the stock shock towers.",
    tags: ["Bolt-in", "Adjustable", "More travel"],
    install: "Mostly bolt-in. Some kits need a drill template at the tower.",
    priceRange: "$3,000–$4,500 front",
    details:
      "Global West focuses on geometry first. The Negative Roll layout improves camber gain versus stock stamped arms. Good first serious upgrade if you want to keep the original engine-bay look.",
  },
  {
    slug: "qa1-level-2",
    brand: "QA1",
    name: "Level 2 handling kit",
    tier: "bolt-on",
    years: [1967, 1968, 1969, 1970],
    overview:
      "Full front-to-rear package: coilovers, tubular arms, sway bars, and a triangulated 4-link with a 9-inch housing option.",
    tags: ["Complete kit", "4-link rear", "Street / track"],
    install: "Bolt-in front. Rear 4-link is more involved.",
    priceRange: "$3,300–$6,000+",
    details:
      "QA1 sells staged kits. Level 1 is a milder street setup. Level 2 adds double-adjustable shocks and a stronger rear package aimed at higher horsepower.",
  },
  {
    slug: "ridetech-streetgrip",
    brand: "Ridetech",
    name: "StreetGrip",
    tier: "bolt-on",
    years: [1967, 1968, 1969, 1970],
    overview:
      "Keeps the leaf-spring rear but swaps in composite springs, HQ shocks, dual-rate front coils, and a Shelby-style drop.",
    tags: ["Street ride", "Composite springs", "Bolt-in"],
    install: "Bolt-in. Closest to a factory-style refresh.",
    priceRange: "$2,000–$3,500",
    details:
      "Best pick if you want a lowered stance and better ride without cutting the car. Composite leaves cut unsprung weight versus stock multi-leaf packs.",
  },
  {
    slug: "tcp-coilover",
    brand: "Total Control Products",
    name: "Coil-spring / VariShock conversion",
    tier: "bolt-on",
    years: [1965, 1966, 1967, 1968, 1969, 1970],
    overview:
      "Factory-location coilover or coil-spring conversion with offset upper-arm options for better camber gain.",
    tags: ["Bolt-in", "Air-spring option", "Geometry upgrade"],
    install: "Uses factory pickup points. Optional tower adapters.",
    priceRange: "$2,500–$5,000",
    details:
      "TCP also makes g-Link rear 4-bar conversions and air-spring versions if you want ride-height on demand later.",
  },
  {
    slug: "heidts-mustang-ii",
    brand: "Heidts",
    name: "Mustang II IFS",
    tier: "mustang-ii",
    years: [1965, 1966, 1967, 1968, 1969, 1970],
    overview:
      "Weld-in front cradle with tubular arms, rack-and-pinion, and coilover or spring options.",
    tags: ["Weld-in", "Rack and pinion", "Clears big engines"],
    install: "Cut frame horns and weld in the new crossmember. Shop job for most people.",
    priceRange: "$2,200–$5,000+",
    details:
      "The entry-level Heidts path. Removes the stock shock towers from the engine bay, which helps engine swaps. Superide II and Pro-G are the step-up kits.",
  },
  {
    slug: "scotts-hotrods-ifs",
    brand: "Scott's Hot Rods",
    name: "IFS package",
    tier: "mustang-ii",
    years: [1967, 1968],
    overview:
      "One-piece boxed crossmember, tubular arms, rack-and-pinion, and coilover options with several ride heights.",
    tags: ["Custom IFS", "Weld-in", "Adjustable height"],
    install: "Fabrication job. Frame notches and reinforcement plates included.",
    priceRange: "$4,800–$6,000+",
    details:
      "More of a clean-sheet IFS than a budget Mustang II clone. Good when you already plan to open the front of the car.",
  },
  {
    slug: "heidts-prog-irs",
    brand: "Heidts",
    name: "Pro-G IFS + IRS",
    tier: "full-chassis",
    years: [1965, 1966, 1967, 1968, 1969, 1970],
    overview:
      "Independent front and independent rear with a 9-inch center section, coilovers, and inboard or outboard brakes.",
    tags: ["IRS", "Pro-touring", "Weld-in"],
    install: "Serious fabrication. Front clip plus rear cradle.",
    priceRange: "$10,000–$20,000+",
    details:
      "Closest classic-Mustang analog to a modern independent-rear car. Ride and handling jump is large. Cost and shop time jump with it.",
  },
  {
    slug: "detroit-speed-aluma-frame",
    brand: "Detroit Speed",
    name: "Aluma-Frame + QuadraLink",
    tier: "full-chassis",
    years: [1965, 1966, 1967, 1968, 1969, 1970],
    overview:
      "Cast aluminum front cradle with long travel and a QuadraLink rear. Built for wide tires and track-capable street cars.",
    tags: ["Aluminum cradle", "6 in travel", "Wide-tire"],
    install: "Professional install. Not a Saturday bolt-on.",
    priceRange: "$15,000–$25,000+",
    details:
      "The high end of the catalog. Geometry and stiffness are the point. Pair with mini-tubs if you want serious rear rubber.",
  },
];

export function kitsForYear(year: MustangYear) {
  return KITS.filter((kit) => kit.years.includes(year));
}

export function kitBySlug(slug: string) {
  return KITS.find((kit) => kit.slug === slug);
}
