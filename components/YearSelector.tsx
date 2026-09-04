"use client";

import { YEAR_NOTES, YEARS, yearPhoto, type MustangYear } from "@/data/years";

type Props = {
  selected: MustangYear;
  onSelect: (year: MustangYear) => void;
};

export function YearSelector({ selected, onSelect }: Props) {
  return (
    <div className="year-bar">
      <p className="year-note">{YEAR_NOTES[selected]}</p>
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
              <img
                src={yearPhoto(year)}
                alt={`${year} Mustang`}
                className="year-photo"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
