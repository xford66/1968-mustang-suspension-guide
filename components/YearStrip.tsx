"use client";

import { useEffect, useRef, useState } from "react";
import { YEAR_NOTES, YEARS, yearPhoto, type MustangYear } from "@/lib/data";

type Props = {
  selected: MustangYear;
  onSelect: (year: MustangYear) => void;
};

export function YearStrip({ selected, onSelect }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function nudge(dir: 1 | -1) {
    stripRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section className="year-section" aria-label="Choose model year">
      <div className="year-head">
        <p className="eyebrow">Model year</p>
        <div className="strip-arrows" aria-hidden={false}>
          <button
            type="button"
            className="strip-arrow"
            aria-label="Scroll years left"
            onClick={() => nudge(-1)}
            disabled={atStart}
          >
            ‹
          </button>
          <button
            type="button"
            className="strip-arrow"
            aria-label="Scroll years right"
            onClick={() => nudge(1)}
            disabled={atEnd}
          >
            ›
          </button>
        </div>
      </div>
      <div className="strip-wrap">
        <div className={atStart ? "strip-fade left hidden" : "strip-fade left"} aria-hidden="true" />
        <div className={atEnd ? "strip-fade right hidden" : "strip-fade right"} aria-hidden="true" />
        <div className="year-strip" ref={stripRef} role="listbox" aria-label="Model years">
          {YEARS.map((year) => {
            const active = year === selected;
            return (
              <button
                key={year}
                type="button"
                role="option"
                aria-selected={active}
                className={active ? "year-card active" : "year-card"}
                onClick={() => onSelect(year)}
              >
                <span className="year-label">{year}</span>
                <img src={yearPhoto(year)} alt={`${year} Mustang`} className="year-photo" loading="lazy" />
              </button>
            );
          })}
        </div>
      </div>
      <p className="year-note" aria-live="polite">{YEAR_NOTES[selected]}</p>
    </section>
  );
}
