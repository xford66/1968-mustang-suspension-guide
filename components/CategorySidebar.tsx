"use client";

import { CATEGORIES, type CategoryId } from "@/data/categories";

type Props = {
  selected: CategoryId;
  onSelect: (id: CategoryId) => void;
};

export function CategorySidebar({ selected, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">Categories</p>
      <nav className="sidebar-nav">
        {CATEGORIES.map((cat) => {
          const active = cat.id === selected;
          return (
            <button
              key={cat.id}
              type="button"
              className={active ? "side-item active" : "side-item"}
              onClick={() => onSelect(cat.id)}
            >
              <span className={cat.ready ? "dot ready" : "dot"} />
              <span className="side-label">{cat.label}</span>
              {!cat.ready ? <span className="soon">Soon</span> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
