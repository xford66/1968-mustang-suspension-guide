"use client";

import { CATEGORIES, type CategoryId } from "@/data/categories";
import { subsForCategory } from "@/data/subcategories";

type Props = {
  selected: CategoryId;
  onSelect: (id: CategoryId) => void;
};

export function CategorySelector({ selected, onSelect }: Props) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Area of the car</h2>
        <p>Suspension is live. The rest are placeholders for later sections.</p>
      </div>
      <div className="cat-row">
        {CATEGORIES.map((cat) => {
          const active = cat.id === selected;
          const ready = subsForCategory(cat.id).some((s) => s.ready);
          return (
            <button
              key={cat.id}
              type="button"
              className={active ? "pill active" : "pill"}
              onClick={() => onSelect(cat.id)}
              disabled={!ready && cat.id !== selected}
            >
              {cat.label}
              {!ready ? <span className="soon">Soon</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
