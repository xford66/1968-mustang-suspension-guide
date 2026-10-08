"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MAX_COMPARE, buildCompareHref, useCompareSelection } from "@/lib/compare";
import { useCatalog } from "@/components/CatalogProvider";
import { findKit, findPart, type Kit, type Part } from "@/lib/catalog";
import styles from "./CompareTray.module.css";

type TrayItem = {
  kind: "kit" | "part";
  slug: string;
  brand: string;
  name: string;
  photo?: string;
};

function resolveItems(
  allKits: Kit[],
  allParts: Part[],
  kits: string[],
  parts: string[],
): TrayItem[] {
  const items: TrayItem[] = [];
  for (const slug of kits) {
    const kit = findKit(allKits, slug);
    if (!kit) continue;
    items.push({
      kind: "kit",
      slug,
      brand: kit.brand,
      name: kit.name,
      photo: kit.photo,
    });
  }
  for (const slug of parts) {
    const part = findPart(allParts, slug);
    if (!part) continue;
    items.push({
      kind: "part",
      slug,
      brand: part.brand,
      name: part.name,
      photo: part.photo,
    });
  }
  return items;
}

export function CompareTray() {
  const router = useRouter();
  const pathname = usePathname();
  const catalog = useCatalog();
  const { kits, parts, toggleKit, togglePart, kitCount, partCount } =
    useCompareSelection();

  const total = kitCount + partCount;
  if (total === 0) return null;

  const items = resolveItems(catalog.kits, catalog.parts, kits, parts);

  const clear = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      {/* In-flow spacer so the fixed bar never covers page content. */}
      <div className={styles.spacer} aria-hidden="true" />
      <div className={styles.tray} role="region" aria-label="Compare selection">
        <div className={styles.items} aria-live="polite">
          {items.map((item) => (
            <button
              key={`${item.kind}:${item.slug}`}
              type="button"
              className={styles.chip}
              title={`${item.brand} ${item.name} — remove`}
              aria-label={`Remove ${item.brand} ${item.name} from compare`}
              onClick={() =>
                item.kind === "kit"
                  ? toggleKit(item.slug)
                  : togglePart(item.slug)
              }
            >
              {item.photo ? (
                <img
                  src={item.photo}
                  alt=""
                  className={styles.thumb}
                  loading="lazy"
                />
              ) : (
                <span className={styles.thumbFallback} aria-hidden="true">
                  {item.brand.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className={styles.chipLabel}>
                <span className={styles.chipKind}>
                  {item.kind === "kit" ? "Kit" : "Part"}
                </span>
                <span className={styles.chipName}>
                  {item.brand} {item.name}
                </span>
              </span>
              <span className={styles.chipX} aria-hidden="true">
                ×
              </span>
            </button>
          ))}
        </div>
        <p className={styles.counts}>
          Kits {kitCount}/{MAX_COMPARE} · Parts {partCount}/{MAX_COMPARE}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clear}
          >
            Clear
          </button>
          <Link
            className={styles.compareBtn}
            href={buildCompareHref(kits, parts)}
          >
            Compare →
          </Link>
        </div>
      </div>
    </>
  );
}
