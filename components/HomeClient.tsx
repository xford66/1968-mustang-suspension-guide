"use client";

import { useMemo, useState } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { PartDetailPane } from "./PartDetailPane";
import { PartsWorkspace } from "./PartsWorkspace";
import { YearSelector } from "./YearSelector";
import type { CategoryId } from "@/data/categories";
import { kitBySlug } from "@/data/kits";
import { partBySlug } from "@/data/parts";
import { defaultSubFor, type SubcategoryId } from "@/data/subcategories";
import type { MustangYear } from "@/data/years";

type Selection =
  | { kind: "part"; slug: string }
  | { kind: "kit"; slug: string }
  | null;

export function HomeClient() {
  const [year, setYear] = useState<MustangYear>(1968);
  const [category, setCategory] = useState<CategoryId>("suspension");
  const [subcategory, setSubcategory] = useState<SubcategoryId>("factory-uca");
  const [selected, setSelected] = useState<Selection>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const part = useMemo(
    () => (selected?.kind === "part" ? partBySlug(selected.slug) : undefined),
    [selected],
  );
  const kit = useMemo(
    () => (selected?.kind === "kit" ? kitBySlug(selected.slug) : undefined),
    [selected],
  );

  function pickCategory(id: CategoryId) {
    setCategory(id);
    const next = defaultSubFor(id);
    if (next) setSubcategory(next.id);
    setSelected(null);
  }

  function pickSub(id: SubcategoryId) {
    setSubcategory(id);
    setSelected(null);
    setMenuOpen(false);
  }

  return (
    <div className={menuOpen ? "app-shell menu-open" : "app-shell"}>
      {menuOpen ? (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <CategorySidebar
        category={category}
        subcategory={subcategory}
        onCategory={pickCategory}
        onSubcategory={pickSub}
        open={menuOpen}
      />
      <div className="main-col">
        <header className="top-bar">
          <div className="mobile-head">
            <button
              type="button"
              className="menu-btn"
              aria-label="Open categories"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
            <p className="mobile-title">Parts Guide</p>
          </div>
          <YearSelector selected={year} onSelect={setYear} />
        </header>
        <div className="workspace">
          <PartsWorkspace
            year={year}
            subcategory={subcategory}
            selected={selected}
            onSelect={setSelected}
          />
          <PartDetailPane part={part} kit={kit} />
        </div>
      </div>
    </div>
  );
}
