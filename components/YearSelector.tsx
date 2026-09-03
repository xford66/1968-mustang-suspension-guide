"use client";

import { YEAR_NOTES, YEARS, type MustangYear } from "@/data/years";
import { MustangIcon } from "./MustangIcon";

type Props = {
  selected: MustangYear;
  onSelect: (year: MustangYear) => void;
};

export function YearSelector({ selected, onSelect }: Props) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Choose the year</h2>
        <p>{YEAR_NOTES[selected]}</p>
      </div>
      <div className="year-row">
        {YEARS.map((year) => {
          const active = year === selected;
          return (
            <button
              key={year}
              type="button"
              className={active ? "year-card active" : "year-card"}
              onClick={() => onSelect(year)}
              aria-pressed={active}
            >
              <span className="year-label">{year}</span>
              <MustangIcon year={year} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
