"use client";

import { useMemo, useState } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { PartDetailPane } from "./PartDetailPane";
import { PartsWorkspace } from "./PartsWorkspace";
import { YearSelector } from "./YearSelector";
import type { CategoryId } from "@/data/categories";
import { kitBySlug } from "@/data/kits";
import { partBySlug } from "@/data/parts";
import type { MustangYear } from "@/data/years";

type Selection =
  | { kind: "part"; slug: string }
  | { kind: "kit"; slug: string }
  | null;

export function HomeClient() {
  const [year, setYear] = useState<MustangYear>(1968);
  const [category, setCategory] = useState<CategoryId>("suspension");
  const [selected, setSelected] = useState<Selection>(null);

  const part = useMemo(
    () => (selected?.kind === "part" ? partBySlug(selected.slug) : undefined),
    [selected],
  );
  const kit = useMemo(
    () => (selected?.kind === "kit" ? kitBySlug(selected.slug) : undefined),
    [selected],
  );

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
        <CategorySidebar selected={category} onSelect={setCategory} />
        {category === "suspension" ? (
          <PartsWorkspace year={year} selected={selected} onSelect={setSelected} />
        ) : (
          <section className="workspace-main empty-main">
            <p className="empty">This category is not built yet.</p>
          </section>
        )}
        <PartDetailPane part={part} kit={kit} />
      </div>
    </div>
  );
}
