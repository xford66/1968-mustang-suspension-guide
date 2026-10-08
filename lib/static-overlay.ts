import "server-only";

/**
 * TRANSITIONAL: values the Neon database does not hold yet.
 *
 * The site now loads kits and parts from Neon (see lib/data.ts), but two
 * things still come from the original static files in data/:
 *
 *   1. Photos.
 *      - `kits` has no `photo` column yet.
 *        TODO(neon): once `kits.photo` exists and is backfilled, select it in
 *        lib/data.ts and drop the kit fallback below.
 *      - `parts.photo` exists but is NULL for every row today, while 18 parts
 *        have a photo in data/parts.ts.
 *        TODO(neon): backfill `parts.photo`, then drop the part fallback.
 *      A photo from the database always wins over the static one.
 *
 *   2. Display order. Neither table has a sort column, and card order and the
 *      "related" rows depend on the curated order in the static files.
 *      TODO(neon): add a `sort` column to `kits` and `parts`, ORDER BY it in
 *      lib/data.ts, and drop staticOrder below.
 *
 * Once both TODOs are done this file, data/kits.ts KITS and data/parts.ts
 * PARTS can be deleted.
 */

import { KITS } from "../data/kits";
import { PARTS } from "../data/parts";

const KIT_PHOTOS = new Map(KITS.map((kit) => [kit.slug, kit.photo]));
const PART_PHOTOS = new Map(PARTS.map((part) => [part.slug, part.photo]));
const KIT_ORDER = new Map(KITS.map((kit, i) => [kit.slug, i]));
const PART_ORDER = new Map(PARTS.map((part, i) => [part.slug, i]));

export function fallbackKitPhoto(slug: string): string | undefined {
  return KIT_PHOTOS.get(slug);
}

export function fallbackPartPhoto(slug: string): string | undefined {
  return PART_PHOTOS.get(slug);
}

/**
 * Sort items into the curated static order. Items that only exist in the
 * database keep their SQL order (brand, name) and go after the curated ones.
 */
export function staticOrder<T extends { slug: string }>(
  items: T[],
  kind: "kit" | "part",
): T[] {
  const order = kind === "kit" ? KIT_ORDER : PART_ORDER;
  const rank = (slug: string) => order.get(slug) ?? Number.MAX_SAFE_INTEGER;
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => rank(a.item.slug) - rank(b.item.slug) || a.i - b.i)
    .map(({ item }) => item);
}
