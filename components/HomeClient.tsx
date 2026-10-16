"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { CategoryTabs } from "./CategoryTabs";
import { YearStrip } from "./YearStrip";
import { ComingSoon } from "./ComingSoon";
import { SiteFooter } from "./SiteFooter";
import { KitCard, type CardCompare } from "@/components/KitCard";
import { PartCard } from "@/components/PartCard";
import { useCompareSelection } from "@/lib/compare";
import { useCatalog } from "@/components/CatalogProvider";
import {
  kitsForYear,
  partsForYear,
  type Category,
  type CategoryId,
  type Kit,
  type MustangYear,
  type Part,
  type Tier,
} from "@/lib/catalog";

type Group =
  | { kind: "parts"; title: string; style: "factory" | "tubular" }
  | { kind: "kits"; title: string; tier: Tier };

const GROUPS: Group[] = [
  { kind: "parts", title: "Factory upper control arms", style: "factory" },
  { kind: "parts", title: "Tubular upper control arms", style: "tubular" },
  { kind: "kits", title: "Bolt-on kits", tier: "bolt-on" },
  { kind: "kits", title: "Mustang II kits", tier: "mustang-ii" },
  { kind: "kits", title: "Full chassis", tier: "full-chassis" },
];

function comingSoonNote(category: CategoryId, label: string): string {
  if (category === "steering" || category === "brakes") {
    return "Steering and brakes catalogs are next on the build list.";
  }
  return `The ${label} catalog is next on the build list.`;
}

/** Static header shell rendered while the compare-aware header hydrates. */
function HeaderFallback() {
  return (
    <header className="site-header" aria-hidden="true">
      <div className="header-inner">
        <span className="wordmark">
          Mustang Parts Guide
          <span className="wordmark-tag">1964–1970</span>
        </span>
      </div>
    </header>
  );
}

function initialCategory(
  searchParams: URLSearchParams,
  categories: Category[],
): CategoryId {
  const raw = searchParams.get("cat");
  return categories.some((c) => c.id === raw) ? (raw as CategoryId) : "suspension";
}

export function HomeClient() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeClientInner />
    </Suspense>
  );
}

/** Plain shell shown while search params resolve. */
function HomeFallback() {
  return (
    <div className="page-shell">
      <HeaderFallback />
      <main className="content">
        <p className="empty">Loading catalog…</p>
      </main>
      <SiteFooter />
    </div>
  );
}

function HomeClientInner() {
  const searchParams = useSearchParams();
  const { categories } = useCatalog();
  const [year, setYear] = useState<MustangYear>(1968);
  const [category, setCategory] = useState<CategoryId>(() =>
    initialCategory(searchParams, categories),
  );

  const catLabel =
    categories.find((c) => c.id === category)?.label ?? category;

  return (
    <div className="page-shell">
      <h1 className="visually-hidden">1964–1970 Mustang Parts Guide</h1>
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader category={category} onCategory={setCategory} />
      </Suspense>
      <CategoryTabs active={category} onSelect={setCategory} />
      <YearStrip selected={year} onSelect={setYear} />

      <main className="content">
        {category !== "suspension" ? (
          <ComingSoon
            title={catLabel}
            note={comingSoonNote(category, catLabel)}
          />
        ) : (
          <Suspense fallback={<p className="empty">Loading catalog…</p>}>
            <SuspensionCatalog year={year} />
          </Suspense>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function SuspensionCatalog({ year }: { year: MustangYear }) {
  const compare = useCompareSelection();
  const { kits, parts } = useCatalog();

  const kitCompare = (kit: Kit): CardCompare => {
    const checked = compare.kits.includes(kit.slug);
    return {
      checked,
      onToggle: () => compare.toggleKit(kit.slug),
      disabled: !checked && !compare.canAddKit,
    };
  };

  const partCompare = (part: Part): CardCompare => {
    const checked = compare.parts.includes(part.slug);
    return {
      checked,
      onToggle: () => compare.togglePart(part.slug),
      disabled: !checked && !compare.canAddPart,
    };
  };

  return (
    <div className="catalog">
      {GROUPS.map((group) => {
        const items =
          group.kind === "parts"
            ? partsForYear(parts, year, "upper-control-arms", group.style)
            : kitsForYear(kits, year).filter((k) => k.tier === group.tier);

        return (
          <section key={group.title} aria-label={group.title}>
            <div className="group-head">
              <h2>{group.title}</h2>
              <span className="group-count">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            {items.length === 0 ? (
              <p className="empty">Nothing listed for {year} in this group.</p>
            ) : (
              <div className="card-grid">
                {group.kind === "parts"
                  ? (items as Part[]).map((part) => (
                      <PartCard
                        key={part.slug}
                        part={part}
                        compare={partCompare(part)}
                      />
                    ))
                  : (items as Kit[]).map((kit) => (
                      <KitCard
                        key={kit.slug}
                        kit={kit}
                        compare={kitCompare(kit)}
                      />
                    ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
