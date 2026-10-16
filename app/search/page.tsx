"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { useCatalog } from "@/components/CatalogProvider";
import { searchKits, searchParts } from "@/lib/catalog";
import styles from "./SearchPage.module.css";

function Results() {
  const searchParams = useSearchParams();
  const catalog = useCatalog();
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) {
    return (
      <p className={styles.hint}>
        Type a brand, product name, or part number above to search kits and
        parts.
      </p>
    );
  }

  const kits = searchKits(catalog.kits, q);
  const parts = searchParts(catalog.parts, q);
  const total = kits.length + parts.length;

  if (total === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No matches for &ldquo;{q}&rdquo;</p>
        <p className={styles.emptyHint}>
          Try a brand like QA1 or a part number like C7DZ-3082-RI.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.results}>
      <p className={styles.counts}>
        {total} result{total === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
      </p>

      {kits.length > 0 && (
        <section aria-label="Kit results">
          <h2 className={styles.sectionTitle}>Kits ({kits.length})</h2>
          <ul className={styles.list}>
            {kits.map((kit) => (
              <li key={kit.slug}>
                <Link href={`/kits/${kit.slug}`} className={styles.row}>
                  <span className={styles.eyebrow}>{kit.brand}</span>
                  <span className={styles.name}>{kit.name}</span>
                  <span className={styles.price}>{kit.priceRange}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {parts.length > 0 && (
        <section aria-label="Part results">
          <h2 className={styles.sectionTitle}>Parts ({parts.length})</h2>
          <ul className={styles.list}>
            {parts.map((part) => (
              <li key={part.slug}>
                <Link href={`/parts/${part.slug}`} className={styles.row}>
                  <span className={styles.eyebrow}>{part.brand}</span>
                  <span className={styles.name}>
                    {part.name}
                    <span className={styles.pn}>{part.pn}</span>
                  </span>
                  <span className={styles.price}>{part.priceRange}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className={styles.page}>
      <SearchBar autoFocus />
      <Suspense fallback={<p className={styles.hint}>Searching…</p>}>
        <Results />
      </Suspense>
    </main>
  );
}
