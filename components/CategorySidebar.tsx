"use client";

import { CATEGORIES, type CategoryId } from "@/data/categories";
import {
  subsForCategory,
  type SubcategoryId,
} from "@/data/subcategories";

const ICONS: Record<CategoryId, string> = {
  engine: "EN",
  interior: "IN",
  suspension: "SU",
  steering: "ST",
  brakes: "BR",
  "wheels-tires": "WT",
  transmission: "TR",
  "rear-end": "RE",
  body: "BD",
  electrical: "EL",
};

type Props = {
  category: CategoryId;
  subcategory: SubcategoryId;
  onCategory: (id: CategoryId) => void;
  onSubcategory: (id: SubcategoryId) => void;
  open?: boolean;
};

export function CategorySidebar({
  category,
  subcategory,
  onCategory,
  onSubcategory,
  open = false,
}: Props) {
  return (
    <aside className={open ? "sidebar open" : "sidebar"}>
      <div className="brand-lockup">
        <p className="brand-mark">PG</p>
        <div className="brand-text">
          <p className="eyebrow">First-gen Mustang</p>
          <h1>Parts Guide</h1>
        </div>
      </div>
      <p className="sidebar-label">Categories</p>
      <nav className="sidebar-nav">
        {CATEGORIES.map((cat) => {
          const isOpen = cat.id === category;
          const kids = subsForCategory(cat.id);
          const anyReady = kids.some((s) => s.ready);
          return (
            <div key={cat.id} className="cat-block">
              <button
                type="button"
                className={isOpen ? "side-item active" : "side-item"}
                onClick={() => onCategory(cat.id)}
                title={cat.label}
              >
                <span className={anyReady ? "cat-icon ready" : "cat-icon"}>
                  {ICONS[cat.id]}
                </span>
                <span className="side-label">{cat.label}</span>
                <span className="caret">{isOpen ? "\u25be" : "\u25b8"}</span>
              </button>
              {isOpen ? (
                <div className="tree-kids">
                  {kids.map((sub) => {
                    const active = sub.id === subcategory;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        className={active ? "tree-kid active" : "tree-kid"}
                        onClick={() => onSubcategory(sub.id)}
                      >
                        <span className="side-label">{sub.label}</span>
                        {!sub.ready ? <span className="soon">Soon</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
