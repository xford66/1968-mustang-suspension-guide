"use client";

import {
  ARM_STYLES,
  SUSPENSION_AREAS,
  type ArmStyleId,
  type SuspensionAreaId,
} from "@/data/suspension-areas";

type Props = {
  area: SuspensionAreaId;
  armStyle: ArmStyleId;
  onArea: (id: SuspensionAreaId) => void;
  onArmStyle: (id: ArmStyleId) => void;
};

export function SuspensionAreaSelector({
  area,
  armStyle,
  onArea,
  onArmStyle,
}: Props) {
  const current = SUSPENSION_AREAS.find((item) => item.id === area);

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Front suspension</h2>
        <p>
          Factory-mount parts first. Mustang II is the cut-and-weld path.
          Upper control arms are live.
        </p>
      </div>
      <div className="cat-row">
        {SUSPENSION_AREAS.map((item) => {
          const active = item.id === area;
          return (
            <button
              key={item.id}
              type="button"
              className={active ? "pill active" : "pill"}
              onClick={() => {
                onArea(item.id);
                if (!item.hasArmStyles) onArmStyle("all");
              }}
            >
              {item.label}
              {!item.ready ? <span className="soon">Soon</span> : null}
            </button>
          );
        })}
      </div>
      {current?.hasArmStyles ? (
        <div className="sub-row">
          {ARM_STYLES.map((item) => {
            const active = item.id === armStyle;
            return (
              <button
                key={item.id}
                type="button"
                className={active ? "pill nested active" : "pill nested"}
                onClick={() => onArmStyle(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
