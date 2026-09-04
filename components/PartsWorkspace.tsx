"use client";

import { useMemo, useState } from "react";
import { kitsForYear, type Kit } from "@/data/kits";
import { PARTS, type Part } from "@/data/parts";
import type { MustangYear } from "@/data/years";

type GroupId = "factory-uca" | "tubular-uca" | "kits-bolton" | "kits-mii" | "kits-full";

type Group = {
  id: GroupId;
  label: string;
  ready: boolean;
};

const GROUPS: Group[] = [
  { id: "factory-uca", label: "Factory Upper Control Arms", ready: true },
  { id: "tubular-uca", label: "Tubular Upper Control Arms", ready: true },
  { id: "kits-bolton", label: "Bolt-on / Factory-style Kits", ready: true },
  { id: "kits-mii", label: "Mustang II / IFS Kits", ready: true },
  { id: "kits-full", label: "Full Chassis / Pro-touring Kits", ready: true },
];

type Selection =
  | { kind: "part"; slug: string }
  | { kind: "kit"; slug: string }
  | null;

type Props = {
  year: MustangYear;
  selected: Selection;
  onSelect: (next: Selection) => void;
};

export function PartsWorkspace({ year, selected, onSelect }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({
    "factory-uca": true,
    "tubular-uca": true,
  });
  const [brandFilter, setBrandFilter] = useState<Record<string, string>>({});

  const partsByGroup = useMemo(() => {
    const yearParts = PARTS.filter((p) => p.years.includes(year) && p.area === "upper-control-arms");
    return {
      "factory-uca": yearParts.filter((p) => p.style === "factory"),
      "tubular-uca": yearParts.filter((p) => p.style === "tubular"),
    };
  }, [year]);

  const kitsByGroup = useMemo(() => {
    const yearKits = kitsForYear(year);
    return {
      "kits-bolton": yearKits.filter((k) => k.tier === "bolt-on"),
      "kits-mii": yearKits.filter((k) => k.tier === "mustang-ii"),
      "kits-full": yearKits.filter((k) => k.tier === "full-chassis"),
    };
  }, [year]);

  return (
    <section className="workspace-main">
      <div className="tree">
        {GROUPS.map((group) => {
          const expanded = !!open[group.id];
          const isParts = group.id === "factory-uca" || group.id === "tubular-uca";
          const items = isParts ? partsByGroup[group.id] : kitsByGroup[group.id];
          const brands = uniqueBrands(items);
          const activeBrand = brandFilter[group.id] ?? "all";
          return (
            <div key={group.id} className="tree-group">
              <button
                type="button"
                className="tree-parent"
                onClick={() => setOpen((s) => ({ ...s, [group.id]: !expanded }))}
              >
                <span className="caret">{expanded ? "▾" : "▸"}</span>
                {group.label}
                <span className="count">{items.length}</span>
              </button>
              {expanded ? (
                <div className="tree-kids">
                  <button
                    type="button"
                    className={activeBrand === "all" ? "tree-kid active" : "tree-kid"}
                    onClick={() => setBrandFilter((s) => ({ ...s, [group.id]: "all" }))}
                  >
                    All manufacturers
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      className={activeBrand === brand ? "tree-kid active" : "tree-kid"}
                      onClick={() => setBrandFilter((s) => ({ ...s, [group.id]: brand }))}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="tree-group muted">
          <p className="tree-parent static">Lower Control Arms <span className="soon">Soon</span></p>
          <p className="tree-parent static">Springs / Shocks / Bars <span className="soon">Soon</span></p>
        </div>
      </div>

      <div className="grid-wrap">
        {GROUPS.map((group) => {
          if (!open[group.id]) return null;
          const isParts = group.id === "factory-uca" || group.id === "tubular-uca";
          const items = isParts ? partsByGroup[group.id] : kitsByGroup[group.id];
          const brand = brandFilter[group.id] ?? "all";
          const rows = brand === "all" ? items : items.filter((i) => i.brand === brand);
          return (
            <div key={group.id} className="grid-block">
              <h3>
                {group.label}
                {brand !== "all" ? ` · ${brand}` : ""}
              </h3>
              <div className="part-table">
                <div className="part-row head">
                  <span>Manufacturer</span>
                  <span>Part #</span>
                  <span>Description</span>
                  <span>Usage</span>
                </div>
                {rows.length === 0 ? (
                  <p className="empty">Nothing listed for {year} in this group.</p>
                ) : isParts ? (
                  (rows as Part[]).map((part) => {
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
                  })
                ) : (
                  (rows as Kit[]).map((kit) => {
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
                )}
              </div>
            </div>
          );
        })}
        {!GROUPS.some((g) => open[g.id]) ? (
          <p className="empty">Expand a group on the left of this pane.</p>
        ) : null}
      </div>
    </section>
  );
}

function uniqueBrands(items: { brand: string }[]) {
  return Array.from(new Set(items.map((i) => i.brand))).sort();
}
