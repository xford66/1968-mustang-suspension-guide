"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { useCompareSelection } from "@/lib/compare";
import { useCatalog } from "@/components/CatalogProvider";
import type { CategoryId } from "@/lib/catalog";

type Props = {
  /** Active category. Defaults to "suspension". */
  category?: CategoryId;
  /**
   * When provided (home page), drawer category taps call this instead of
   * navigating. When omitted (detail pages), drawer items link to `/?cat=<id>`.
   */
  onCategory?: (id: CategoryId) => void;
};

export function SiteHeader({ category = "suspension", onCategory }: Props) {
  const { kitCount, partCount } = useCompareSelection();
  const count = kitCount + partCount;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen, close]);

  const { categories, categoryCounts: counts } = useCatalog();

  function pick(id: CategoryId) {
    if (onCategory) onCategory(id);
    close();
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button
            type="button"
            className="menu-btn"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </button>
          <Link href="/" className="wordmark">
            Mustang Parts Guide
            <span className="wordmark-tag">1964–1970</span>
          </Link>
          <div className="header-search">
            <SearchBar />
          </div>
          <div className="header-actions">
            <Link href="/compare" className="compare-link" aria-label={`Compare selected parts${count > 0 ? `, ${count} selected` : ""}`}>
              Compare
              {count > 0 ? <span className="count-badge">{count}</span> : null}
            </Link>
          </div>
        </div>
      </header>

      {drawerOpen ? (
        <button
          type="button"
          className="drawer-backdrop"
          aria-label="Close navigation menu"
          onClick={close}
        />
      ) : null}

      <aside
        className={drawerOpen ? "drawer open" : "drawer"}
        aria-label="Site navigation"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className="drawer-head">
          <span className="wordmark">
            Mustang Parts Guide
            <span className="wordmark-tag">1964–1970</span>
          </span>
          <button
            type="button"
            className="drawer-close"
            aria-label="Close navigation menu"
            onClick={close}
            tabIndex={drawerOpen ? 0 : -1}
          >
            ✕
          </button>
        </div>
        <div className="drawer-search">
          <SearchBar autoFocus={false} />
        </div>
        <nav className="drawer-nav" aria-label="Categories">
          <p className="drawer-nav-label">Categories</p>
          {categories.map((cat) => {
            const active = cat.id === category;
            const cls = active ? "drawer-item active" : "drawer-item";
            const badge = (
              <span className="count-badge">{counts[cat.id] ?? 0}</span>
            );
            return onCategory ? (
              <button
                key={cat.id}
                type="button"
                className={cls}
                onClick={() => pick(cat.id)}
                aria-current={active ? "page" : undefined}
                tabIndex={drawerOpen ? 0 : -1}
              >
                {cat.label}
                {badge}
              </button>
            ) : (
              <Link
                key={cat.id}
                href={`/?cat=${cat.id}`}
                className={cls}
                onClick={close}
                aria-current={active ? "page" : undefined}
                tabIndex={drawerOpen ? 0 : -1}
              >
                {cat.label}
                {badge}
              </Link>
            );
          })}
        </nav>
        <div className="drawer-foot">
          <Link
            href="/compare"
            className="compare-link"
            onClick={close}
            tabIndex={drawerOpen ? 0 : -1}
          >
            Compare
            {count > 0 ? <span className="count-badge">{count}</span> : null}
          </Link>
        </div>
      </aside>
    </>
  );
}
