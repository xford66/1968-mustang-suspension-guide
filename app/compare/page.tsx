"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MAX_COMPARE, parseCompare } from "@/lib/compare";
import { useCatalog } from "@/components/CatalogProvider";
import { findKit, findPart, installBadge, type Kit, type Part } from "@/lib/catalog";
import styles from "./ComparePage.module.css";

type Column =
  | { kind: "kit"; item: Kit }
  | { kind: "part"; item: Part };

function useColumns(): Column[] {
  const searchParams = useSearchParams();
  const catalog = useCatalog();
  return useMemo(() => {
    const { kits, parts } = parseCompare(searchParams);
    const columns: Column[] = [];
    for (const slug of kits) {
      const kit = findKit(catalog.kits, slug);
      if (kit) columns.push({ kind: "kit", item: kit });
    }
    for (const slug of parts) {
      const part = findPart(catalog.parts, slug);
      if (part) columns.push({ kind: "part", item: part });
    }
    return columns;
  }, [searchParams, catalog]);
}

function PhotoCell({ item }: { item: Kit | Part }) {
  if (item.photo) {
    return (
      <img
        src={item.photo}
        alt={`${item.brand} ${item.name}`}
        className={styles.photo}
        loading="lazy"
      />
    );
  }
  return (
    <div className={styles.photoFallback} aria-hidden="true">
      {item.brand.slice(0, 2).toUpperCase()}
    </div>
  );
}

function CompareTable({ columns }: { columns: Column[] }) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th scope="row" className={styles.label}>
              Photo
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <PhotoCell item={column.item} />
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Brand
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.brand}>{column.item.brand}</span>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Product
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.product}>{column.item.name}</span>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Part #
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                {column.kind === "part" ? (
                  <code className={styles.pn}>{column.item.pn}</code>
                ) : (
                  <span className={styles.dash}>—</span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Price
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.price}>{column.item.priceRange}</span>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Fitment years
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <ul className={styles.chips}>
                  {column.item.years.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Install
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.body}>{column.item.install}</span>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Install difficulty
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.badge}>
                  {installBadge(column.item)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Tags
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <ul className={styles.chips}>
                  {column.item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={styles.label}>
              Notes
            </th>
            {columns.map((column) => (
              <td key={`${column.kind}:${column.item.slug}`} className={styles.cell}>
                <span className={styles.body}>{column.item.overview}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CompareContent() {
  const columns = useColumns();

  if (columns.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Nothing to compare yet</p>
        <p className={styles.emptyHint}>
          Pick up to {MAX_COMPARE} kits and {MAX_COMPARE} parts from the
          catalog, then come back here to compare them side by side.
        </p>
        <Link href="/" className={styles.homeLink}>
          ← Back to the guide
        </Link>
      </div>
    );
  }

  const kitCount = columns.filter((c) => c.kind === "kit").length;
  const partCount = columns.length - kitCount;

  return (
    <>
      <p className={styles.lede}>
        {kitCount > 0 && `${kitCount} kit${kitCount === 1 ? "" : "s"}`}
        {kitCount > 0 && partCount > 0 && " · "}
        {partCount > 0 && `${partCount} part${partCount === 1 ? "" : "s"}`}
      </p>
      <CompareTable columns={columns} />
    </>
  );
}

export default function ComparePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Compare</h1>
      <Suspense fallback={<p className={styles.lede}>Loading…</p>}>
        <CompareContent />
      </Suspense>
    </main>
  );
}
