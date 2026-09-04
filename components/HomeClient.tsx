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
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-lockup">
          <p className="eyebrow">First-gen Mustang</p>
          <h1>Parts Guide</h1>
        </div>
        <YearSelector selected={year} onSelect={setYear} />
      </header>
      <div className="workspace">
        <CategorySidebar
          category={category}
          subcategory={subcategory}
          onCategory={pickCategory}
          onSubcategory={pickSub}
        />
        <PartsWorkspace
          year={year}
          subcategory={subcategory}
          selected={selected}
          onSelect={setSelected}
        />
        <PartDetailPane part={part} kit={kit} />
      </div>
    </div>
  );
}
