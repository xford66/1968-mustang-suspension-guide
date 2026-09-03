"use client";

import { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { SuspensionAreaSelector } from "./SuspensionAreaSelector";
import { SuspensionList } from "./SuspensionList";
import { YearSelector } from "./YearSelector";
import type { CategoryId } from "@/data/categories";
import type { ArmStyleId, SuspensionAreaId } from "@/data/suspension-areas";
import type { MustangYear } from "@/data/years";

export function HomeClient() {
  const [year, setYear] = useState<MustangYear>(1968);
  const [category, setCategory] = useState<CategoryId>("suspension");
  const [area, setArea] = useState<SuspensionAreaId>("all");
  const [armStyle, setArmStyle] = useState<ArmStyleId>("all");

  return (
    <>
      <YearSelector selected={year} onSelect={setYear} />
      <CategorySelector selected={category} onSelect={setCategory} />
      {category === "suspension" ? (
        <>
          <SuspensionAreaSelector
            area={area}
            armStyle={armStyle}
            onArea={setArea}
            onArmStyle={setArmStyle}
          />
          <SuspensionList year={year} area={area} armStyle={armStyle} />
        </>
      ) : (
        <section className="panel">
          <p className="empty">This section is not built yet.</p>
        </section>
      )}
    </>
  );
}
