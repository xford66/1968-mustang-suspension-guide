import "server-only";

/**
 * Server-side data access: every kit, part, category and model year the site
 * shows is loaded from the Neon Postgres database here.
 *
 * Server components call these functions directly. Client components get the
 * same data through <CatalogProvider> (mounted in app/layout.tsx) and the
 * pure helpers in lib/catalog.ts, so the database driver and connection
 * string never reach the browser.
 *
 * Connection string: DATABASE_URL_DATABASE_URL (the name the Vercel + Neon
 * integration created), falling back to DATABASE_URL. See .env.example.
 */

import { cache } from "react";
import { neon } from "@neondatabase/serverless";
import { CATEGORIES } from "../data/categories";
import { SUSPENSION_AREAS } from "../data/suspension-areas";
import type { SuspensionAreaId } from "../data/suspension-areas";
import { YEARS, yearPhoto } from "../data/years";
import { fallbackKitPhoto, fallbackPartPhoto, staticOrder } from "./static-overlay";
import type {
  Catalog,
  Category,
  CategoryId,
  Kit,
  MustangYear,
  Part,
  PartStyle,
  Tier,
  YearInfo,
} from "./catalog";

export * from "./catalog";

// ---------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------

function databaseUrl(): string {
  const url = process.env.DATABASE_URL_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "No database connection string. Set DATABASE_URL_DATABASE_URL (or DATABASE_URL) " +
        "to the Neon Postgres URL. On Vercel it comes from the Neon integration; " +
        "locally, copy .env.example to .env.local and fill it in.",
    );
  }
  return url;
}

let client: ReturnType<typeof neon> | undefined;

function db() {
  client ??= neon(databaseUrl());
  return client;
}

// ---------------------------------------------------------------------------
// Row types (exact column names in neon-mustang-database)
// ---------------------------------------------------------------------------

type KitRow = {
  slug: string;
  category_id: string;
  brand: string;
  name: string;
  tier: string;
  overview: string;
  install: string;
  details: string;
  price_range: string;
  tags: string[];
  years: number[];
};

type PartRow = {
  slug: string;
  category_id: string;
  brand: string;
  name: string;
  pn: string;
  style: string | null;
  sold_as: string;
  overview: string;
  install: string;
  details: string;
  price_range: string;
  tags: string[];
  photo: string | null;
  years: number[];
};

type CategoryRow = {
  id: string;
  name: string;
  parent_id: string | null;
  display_order: number;
};

type YearRow = {
  year: number;
  note: string | null;
  photo_url: string | null;
};

// ---------------------------------------------------------------------------
// Validation: fail loudly on values the UI types can't represent.
// ---------------------------------------------------------------------------

const TIERS: readonly Tier[] = ["bolt-on", "mustang-ii", "full-chassis"];
const PART_STYLES: readonly PartStyle[] = ["factory", "tubular"];
const SOLD_AS: readonly Part["soldAs"][] = ["each", "pair"];
const AREA_IDS = new Set<string>(SUSPENSION_AREAS.map((a) => a.id));
const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));
const YEAR_SET = new Set<number>(YEARS);

function oneOf<T extends string>(
  allowed: readonly T[],
  value: string | null,
  where: string,
): T {
  if (value !== null && (allowed as readonly string[]).includes(value)) return value as T;
  throw new Error(`Unexpected value ${JSON.stringify(value)} for ${where} in Neon data`);
}

function toYears(values: number[] | null, where: string): MustangYear[] {
  return (values ?? []).map((y) => {
    const year = Number(y);
    if (!YEAR_SET.has(year)) throw new Error(`Unexpected year ${y} for ${where} in Neon data`);
    return year as MustangYear;
  });
}

function toKit(row: KitRow): Kit {
  const where = `kits.${row.slug}`;
  return {
    slug: row.slug,
    brand: row.brand,
    name: row.name,
    tier: oneOf(TIERS, row.tier, `${where}.tier`),
    years: toYears(row.years, `${where} (kit_years)`),
    overview: row.overview,
    tags: row.tags ?? [],
    install: row.install,
    priceRange: row.price_range,
    details: row.details,
    // TODO(neon): `kits` has no photo column yet; photos come from the static
    // file until one is added. See lib/static-overlay.ts.
    photo: fallbackKitPhoto(row.slug),
  };
}

function toPart(row: PartRow): Part {
  const where = `parts.${row.slug}`;
  if (!AREA_IDS.has(row.category_id)) {
    throw new Error(`Unexpected category_id ${JSON.stringify(row.category_id)} for ${where}`);
  }
  return {
    slug: row.slug,
    brand: row.brand,
    name: row.name,
    pn: row.pn,
    area: row.category_id as SuspensionAreaId,
    style: oneOf(PART_STYLES, row.style, `${where}.style`),
    years: toYears(row.years, `${where} (part_years)`),
    soldAs: oneOf(SOLD_AS, row.sold_as, `${where}.sold_as`),
    overview: row.overview,
    tags: row.tags ?? [],
    install: row.install,
    priceRange: row.price_range,
    details: row.details,
    // TODO(neon): parts.photo is NULL for every row today; fall back to the
    // static photo until it is backfilled. See lib/static-overlay.ts.
    photo: row.photo ?? fallbackPartPhoto(row.slug),
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Load the whole catalog in one HTTP round trip (read-only transaction).
 * Wrapped in React `cache` so a page, its metadata and the root layout share
 * one database call per render. Pages revalidate hourly (ISR).
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  const sql = db();
  const [kitRows, partRows, categoryRows, yearRows] = (await sql.transaction(
    [
      sql`
        SELECT k.slug, k.category_id, k.brand, k.name, k.tier, k.overview,
               k.install, k.details, k.price_range, k.tags,
               COALESCE(
                 (SELECT array_agg(ky.year ORDER BY ky.year)
                    FROM kit_years ky WHERE ky.kit_slug = k.slug),
                 '{}'
               ) AS years
          FROM kits k
         ORDER BY k.brand, k.name, k.slug`,
      sql`
        SELECT p.slug, p.category_id, p.brand, p.name, p.pn, p.style, p.sold_as,
               p.overview, p.install, p.details, p.price_range, p.tags, p.photo,
               COALESCE(
                 (SELECT array_agg(py.year ORDER BY py.year)
                    FROM part_years py WHERE py.part_slug = p.slug),
                 '{}'
               ) AS years
          FROM parts p
         ORDER BY p.brand, p.name, p.slug`,
      sql`
        SELECT id, name, parent_id, display_order
          FROM categories
         ORDER BY display_order, id`,
      sql`
        SELECT year, note, photo_url
          FROM years
         ORDER BY year`,
    ],
    { readOnly: true },
  )) as [KitRow[], PartRow[], CategoryRow[], YearRow[]];

  const kits = staticOrder(kitRows.map(toKit), "kit");
  const parts = staticOrder(partRows.map(toPart), "part");

  if (kits.length === 0 && parts.length === 0) {
    throw new Error(
      "Neon returned no kits or parts. Check that DATABASE_URL_DATABASE_URL points at neon-mustang-database.",
    );
  }

  // Top-level categories the UI knows about, in display order.
  const categories: Category[] = categoryRows
    .filter((row) => row.parent_id === null && CATEGORY_IDS.has(row.id))
    .map((row) => ({ id: row.id as CategoryId, label: row.name }));

  // Roll nested categories (e.g. upper-control-arms -> suspension) up to their root.
  const parentOf = new Map(categoryRows.map((row) => [row.id, row.parent_id]));
  const rootOf = (id: string): string => {
    let current = id;
    for (let i = 0; i < 10; i++) {
      const parent = parentOf.get(current);
      if (!parent) return current;
      current = parent;
    }
    return current;
  };
  const categoryCounts = {} as Record<CategoryId, number>;
  for (const c of CATEGORIES) categoryCounts[c.id] = 0;
  for (const row of [...kitRows, ...partRows]) {
    const root = rootOf(row.category_id);
    if (CATEGORY_IDS.has(root)) categoryCounts[root as CategoryId] += 1;
  }

  const years: YearInfo[] = yearRows
    .filter((row) => YEAR_SET.has(Number(row.year)))
    .map((row) => {
      const year = Number(row.year) as MustangYear;
      return { year, note: row.note ?? "", photo: row.photo_url ?? yearPhoto(year) };
    });

  return { kits, parts, categories, categoryCounts, years };
});

export async function getAllKits(): Promise<Kit[]> {
  return (await getCatalog()).kits;
}

export async function getKitBySlug(slug: string): Promise<Kit | undefined> {
  return (await getCatalog()).kits.find((kit) => kit.slug === slug);
}

export async function getAllParts(): Promise<Part[]> {
  return (await getCatalog()).parts;
}

export async function getPartBySlug(slug: string): Promise<Part | undefined> {
  return (await getCatalog()).parts.find((part) => part.slug === slug);
}
