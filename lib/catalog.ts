/**
 * Client-safe catalog types and pure helpers.
 *
 * Nothing in this module touches the database, so both server components and
 * client components can import it. The data itself is loaded on the server by
 * `lib/data.ts` and handed to client components through `CatalogProvider`.
 */

import type { Kit, Tier } from "../data/kits";
import type { Part, PartStyle } from "../data/parts";
import type { MustangYear } from "../data/years";
import type { Category, CategoryId } from "../data/categories";
import type { ArmStyleId, SuspensionAreaId } from "../data/suspension-areas";

export type { Kit, Part, Tier, PartStyle, MustangYear, Category, CategoryId };
export { VENDOR_PAGES, vendorPage } from "../data/vendors";

/** Display metadata for each kit tier (UI copy, not catalog data). */
export const TIER_META: Record<Tier, { title: string; blurb: string }> = {
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

export type YearInfo = {
  year: MustangYear;
  note: string;
  photo: string;
};

/** Everything the client-side UI needs, loaded once per render on the server. */
export type Catalog = {
  kits: Kit[];
  parts: Part[];
  /** Top-level categories in display order. */
  categories: Category[];
  /** Kit + part count per top-level category (nested categories roll up). */
  categoryCounts: Record<CategoryId, number>;
  years: YearInfo[];
};

export function findKit(kits: Kit[], slug: string): Kit | undefined {
  return kits.find((kit) => kit.slug === slug);
}

export function findPart(parts: Part[], slug: string): Part | undefined {
  return parts.find((part) => part.slug === slug);
}

export function kitsForYear(kits: Kit[], year: MustangYear): Kit[] {
  return kits.filter((kit) => kit.years.includes(year));
}

export function partsForYear(
  parts: Part[],
  year: MustangYear,
  area: SuspensionAreaId,
  style: ArmStyleId = "all",
): Part[] {
  return parts.filter((part) => {
    if (area !== "all" && part.area !== area) return false;
    if (!part.years.includes(year)) return false;
    if (style !== "all" && part.style !== style) return false;
    return true;
  });
}

function haystack(item: Kit | Part): string {
  const pn = "pn" in item ? item.pn : "";
  return [item.brand, item.name, pn, item.overview, item.tags.join(" ")]
    .join(" ")
    .toLowerCase();
}

export function searchKits(kits: Kit[], query: string): Kit[] {
  const q = query.trim().toLowerCase();
  if (!q) return kits;
  return kits.filter((kit) => haystack(kit).includes(q));
}

export function searchParts(parts: Part[], query: string): Part[] {
  const q = query.trim().toLowerCase();
  if (!q) return parts;
  return parts.filter((part) => haystack(part).includes(q));
}

export function relatedKits(kits: Kit[], kit: Kit, n = 4): Kit[] {
  return kits.filter((k) => k.tier === kit.tier && k.slug !== kit.slug).slice(0, n);
}

export function relatedParts(parts: Part[], part: Part, n = 4): Part[] {
  return parts
    .filter((p) => p.area === part.area && p.style === part.style && p.slug !== part.slug)
    .slice(0, n);
}

export type InstallBadge = "Bolt-on" | "Weld-in" | "Pro install" | "Moderate";

export function installBadge(item: Kit | Part): InstallBadge {
  if ("tier" in item) {
    switch (item.tier) {
      case "bolt-on":
        return "Bolt-on";
      case "mustang-ii":
        return "Weld-in";
      case "full-chassis":
        return "Pro install";
    }
  }
  return /bolt/i.test(item.install) ? "Bolt-on" : "Moderate";
}
