// NEON SWAP POINT: when the Neon DB is ready, replace the static imports below
// with async query functions — UI components import only from this module so
// nothing else changes.

import { KITS } from "../data/kits";
import { PARTS } from "../data/parts";
import { CATEGORIES } from "../data/categories";
import { YEARS, YEAR_NOTES, yearPhoto } from "../data/years";
import { TIER_META } from "../data/kits";
import { VENDOR_PAGES, vendorPage } from "../data/vendors";
import type { Kit, Tier } from "../data/kits";
import type { Part, PartStyle } from "../data/parts";
import type { MustangYear } from "../data/years";
import type { CategoryId } from "../data/categories";
import type { ArmStyleId, SuspensionAreaId } from "../data/suspension-areas";

// Re-exports: types, metadata, and lookup helpers. UI reads everything through here.
export type { Kit, Part, Tier, PartStyle, MustangYear, CategoryId };
export { TIER_META, VENDOR_PAGES, vendorPage, YEARS, YEAR_NOTES, yearPhoto, CATEGORIES };

export function getAllKits(): Kit[] {
  return KITS;
}

export function getKitBySlug(slug: string): Kit | undefined {
  return KITS.find((kit) => kit.slug === slug);
}

export function getAllParts(): Part[] {
  return PARTS;
}

export function getPartBySlug(slug: string): Part | undefined {
  return PARTS.find((part) => part.slug === slug);
}

export function kitsForYear(year: MustangYear): Kit[] {
  return KITS.filter((kit) => kit.years.includes(year));
}

export function partsForYear(
  year: MustangYear,
  area: SuspensionAreaId,
  style: ArmStyleId = "all",
): Part[] {
  return PARTS.filter((part) => {
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

export function searchKits(query: string): Kit[] {
  const q = query.trim().toLowerCase();
  if (!q) return KITS;
  return KITS.filter((kit) => haystack(kit).includes(q));
}

export function searchParts(query: string): Part[] {
  const q = query.trim().toLowerCase();
  if (!q) return PARTS;
  return PARTS.filter((part) => haystack(part).includes(q));
}

export function relatedKits(kit: Kit, n = 4): Kit[] {
  return KITS.filter((k) => k.tier === kit.tier && k.slug !== kit.slug).slice(0, n);
}

export function relatedParts(part: Part, n = 4): Part[] {
  return PARTS.filter(
    (p) => p.area === part.area && p.style === part.style && p.slug !== part.slug,
  ).slice(0, n);
}

export function categoryCounts(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const c of CATEGORIES) counts[c.id] = 0;
  // Every kit and part in the catalog is currently suspension.
  counts["suspension"] = KITS.length + PARTS.length;
  return counts;
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
