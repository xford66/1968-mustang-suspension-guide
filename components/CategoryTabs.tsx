"use client";

import { CATEGORIES, categoryCounts, type CategoryId } from "@/lib/data";

type Props = {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
};

export function CategoryTabs({ active, onSelect }: Props) {
  const counts = categoryCounts();

  return (
    <nav className="cat-tabs" aria-label="Part categories">
      <div className="cat-tabs-inner">
        <div className="cat-tabs-scroll" role="tablist" aria-label="Categories">
          {CATEGORIES.map((cat) => {
            const selected = cat.id === active;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={selected ? "cat-tab active" : "cat-tab"}
                onClick={() => onSelect(cat.id)}
              >
                {cat.label}
                <span className="count-badge" aria-label={`${counts[cat.id] ?? 0} items`}>
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
