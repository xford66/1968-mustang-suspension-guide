"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Compare selection state lives in the URL so it is shareable:
 *   /compare?kit=<slug>&kit=<slug>&part=<slug>
 *
 * Pure helpers (parseCompare / toggleInList / buildCompareHref) have no
 * React dependency and can be unit-tested or used from server code.
 * useCompareSelection is the client hook card components bind to.
 */

export const MAX_COMPARE = 3;

function dedupe(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const slug of list) {
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(slug);
  }
  return out;
}

/** Read the compare selection from URL search params. Dedupes and caps at MAX_COMPARE. */
export function parseCompare(searchParams: URLSearchParams): {
  kits: string[];
  parts: string[];
} {
  const kits = dedupe(searchParams.getAll("kit")).slice(0, MAX_COMPARE);
  const parts = dedupe(searchParams.getAll("part")).slice(0, MAX_COMPARE);
  return { kits, parts };
}

/** Toggle a slug in a selection list: remove if present, add if absent and room remains. */
export function toggleInList(list: string[], slug: string): string[] {
  if (list.includes(slug)) return list.filter((s) => s !== slug);
  if (list.length >= MAX_COMPARE) return list;
  return [...list, slug];
}

/** Build the shareable /compare URL for a selection. */
export function buildCompareHref(kits: string[], parts: string[]): string {
  const params = new URLSearchParams();
  for (const slug of kits) params.append("kit", slug);
  for (const slug of parts) params.append("part", slug);
  const query = params.toString();
  return query ? `/compare?${query}` : "/compare";
}

export type CompareSelection = {
  kits: string[];
  parts: string[];
  toggleKit: (slug: string) => void;
  togglePart: (slug: string) => void;
  kitCount: number;
  partCount: number;
  canAddKit: boolean;
  canAddPart: boolean;
};

/**
 * Client hook binding compare selection to the URL. Toggling rewrites the
 * current page's search params with router.replace (shallow, no scroll), so
 * selection survives navigation and is shareable.
 */
export function useCompareSelection(): CompareSelection {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { kits, parts } = useMemo(
    () => parseCompare(searchParams),
    [searchParams],
  );

  const replaceWith = useCallback(
    (nextKits: string[], nextParts: string[]) => {
      router.replace(buildCompareHref(nextKits, nextParts), { scroll: false });
    },
    [router],
  );

  const toggleKit = useCallback(
    (slug: string) => {
      replaceWith(toggleInList(kits, slug), parts);
    },
    [kits, parts, replaceWith],
  );

  const togglePart = useCallback(
    (slug: string) => {
      replaceWith(kits, toggleInList(parts, slug));
    },
    [kits, parts, replaceWith],
  );

  return {
    kits,
    parts,
    toggleKit,
    togglePart,
    kitCount: kits.length,
    partCount: parts.length,
    canAddKit: kits.length < MAX_COMPARE,
    canAddPart: parts.length < MAX_COMPARE,
  };
}
