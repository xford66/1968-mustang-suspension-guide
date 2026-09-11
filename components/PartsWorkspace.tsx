"use client";

import { kitsForYear, type Kit } from "@/data/kits";
import { PARTS, type Part } from "@/data/parts";
import { subcategoryById, type SubcategoryId } from "@/data/subcategories";
import type { MustangYear } from "@/data/years";

type Selection =
  | { kind: "part"; slug: string }
  | { kind: "kit"; slug: string }
  | null;

type Props = {
  year: MustangYear;
  subcategory: SubcategoryId;
  selected: Selection;
  onSelect: (next: Selection) => void;
};

export function PartsWorkspace({ year, subcategory, selected, onSelect }: Props) {
  const meta = subcategoryById(subcategory);
  const parts = partsFor(year, subcategory);
  const kits = kitsFor(year, subcategory);
  const ready = !!meta?.ready;
  const isKits = kits.length > 0 && parts.length === 0;

  return (
    <section className="workspace-main single">
      <div className="grid-wrap">
        <h3>{meta?.label ?? "Parts"}</h3>
        {!ready ? (
          <p className="empty">This section is not built yet.</p>
        ) : (
          <div className="part-table">
            <div className="part-row head">
              <span>Manufacturer</span>
              <span>Part #</span>
              <span>Description</span>
              <span>Usage</span>
            </div>
            {isKits
              ? kits.map((kit) => {
                  const active = selected?.kind === "kit" && selected.slug === kit.slug;
                  return (
                    <button
                      key={kit.slug}
                      type="button"
                      className={active ? "part-row active" : "part-row"}
                      onClick={() => onSelect({ kind: "kit", slug: kit.slug })}
                    >
                      <span>{kit.brand}</span>
                      <span>{kit.slug}</span>
                      <span>{kit.overview}</span>
                      <span>{kit.install}</span>
                    </button>
                  );
                })
              : parts.map((part) => {
                  const active = selected?.kind === "part" && selected.slug === part.slug;
                  return (
                    <button
                      key={part.slug}
                      type="button"
                      className={active ? "part-row active" : "part-row"}
                      onClick={() => onSelect({ kind: "part", slug: part.slug })}
                    >
                      <span>{part.brand}</span>
                      <span>{part.pn}</span>
                      <span>{part.overview}</span>
                      <span>{part.install}</span>
                    </button>
                  );
                })}
            {ready && parts.length === 0 && kits.length === 0 ? (
              <p className="empty">Nothing listed for {year} in this group.</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function partsFor(year: MustangYear, id: SubcategoryId): Part[] {
  if (id !== "factory-uca" && id !== "tubular-uca") return [];
  const style = id === "factory-uca" ? "factory" : "tubular";
  return PARTS.filter(
    (p) =>
      p.years.includes(year) &&
      p.area === "upper-control-arms" &&
      p.style === style,
  );
}

function kitsFor(year: MustangYear, id: SubcategoryId): Kit[] {
  const yearKits = kitsForYear(year);
  if (id === "kits-bolton") return yearKits.filter((k) => k.tier === "bolt-on");
  if (id === "kits-mii") return yearKits.filter((k) => k.tier === "mustang-ii");
  if (id === "kits-full") return yearKits.filter((k) => k.tier === "full-chassis");
  return [];
}
