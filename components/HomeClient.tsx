"use client";

import { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { SuspensionList } from "./SuspensionList";
import { YearSelector } from "./YearSelector";
import type { CategoryId } from "@/data/categories";
import type { MustangYear } from "@/data/years";

export function HomeClient() {
  const [year, setYear] = useState<MustangYear>(1968);
  const [category, setCategory] = useState<CategoryId>("suspension");

  return (
    <>
      <YearSelector selected={year} onSelect={setYear} />
      <CategorySelector selected={category} onSelect={setCategory} />
      {category === "suspension" ? (
        <SuspensionList year={year} />
      ) : (
        <section className="panel">
          <p className="empty">This section is not built yet.</p>
        </section>
      )}
    </>
  );
}
