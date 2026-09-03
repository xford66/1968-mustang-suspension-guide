import { kitsForYear, TIER_META, type Tier } from "@/data/kits";
import { partsForYear, styleLabel, type PartStyle } from "@/data/parts";
import type { ArmStyleId, SuspensionAreaId } from "@/data/suspension-areas";
import { SUSPENSION_AREAS } from "@/data/suspension-areas";
import type { MustangYear } from "@/data/years";
import { KitCard } from "./KitCard";
import { PartCard } from "./PartCard";

const TIER_ORDER: Tier[] = ["bolt-on", "mustang-ii", "full-chassis"];
const STYLE_ORDER: PartStyle[] = ["factory", "tubular"];

const STYLE_BLURB: Record<PartStyle, string> = {
  factory:
    "Stamped or boxed reproductions. Stock geometry, stock look, rubber bushings. Sold each unless noted.",
  tubular:
    "Aftermarket arms that still bolt to the factory shock towers. Extra caster, heims, or coil-over-only designs.",
};

type Props = {
  year: MustangYear;
  area: SuspensionAreaId;
  armStyle: ArmStyleId;
};

export function SuspensionList({ year, area, armStyle }: Props) {
  const meta = SUSPENSION_AREAS.find((item) => item.id === area);

  if (area === "all") {
    const kits = kitsForYear(year);
    return (
      <section className="panel">
        <div className="panel-head">
          <h2>{year} suspension options</h2>
          <p>
            Kit-level view. Open Upper Control Arms for individual factory and
            tubular parts.
          </p>
        </div>
        {TIER_ORDER.map((tier) => {
          const group = kits.filter((kit) => kit.tier === tier);
          if (group.length === 0) return null;
          return (
            <div key={tier} className="tier">
              <div className="tier-head">
                <h3>{TIER_META[tier].title}</h3>
                <p>{TIER_META[tier].blurb}</p>
              </div>
              <div className="kit-grid">
                {group.map((kit) => (
                  <KitCard key={kit.slug} kit={kit} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  if (area === "mustang-ii") {
    const kits = kitsForYear(year).filter((kit) => kit.tier === "mustang-ii");
    return (
      <section className="panel">
        <div className="panel-head">
          <h2>{year} Mustang II systems</h2>
          <p>
            Cut-and-weld front clips. These are not factory-tower parts.
          </p>
        </div>
        {kits.length === 0 ? (
          <p className="empty">No Mustang II kits listed for {year} yet.</p>
        ) : (
          <div className="kit-grid">
            {kits.map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        )}
      </section>
    );
  }

  if (area === "upper-control-arms") {
    const parts = partsForYear(year, "upper-control-arms", armStyle);
    const styles =
      armStyle === "all" ? STYLE_ORDER : STYLE_ORDER.filter((s) => s === armStyle);

    return (
      <section className="panel">
        <div className="panel-head">
          <h2>{year} upper control arms</h2>
          <p>
            Individual arms only. Factory-tower mount. Not kits, not Mustang II,
            not full chassis.
          </p>
        </div>
        {parts.length === 0 ? (
          <p className="empty">No upper control arms listed for this filter.</p>
        ) : (
          styles.map((style) => {
            const group = parts.filter((part) => part.style === style);
            if (group.length === 0) return null;
            return (
              <div key={style} className="tier">
                <div className="tier-head">
                  <h3>{styleLabel(style)}</h3>
                  <p>{STYLE_BLURB[style]}</p>
                </div>
                <div className="kit-grid">
                  {group.map((part) => (
                    <PartCard key={part.slug} part={part} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>
          {year} {meta?.label ?? "parts"}
        </h2>
        <p>This slice is next. Upper control arms are live today.</p>
      </div>
      <p className="empty">Coming soon.</p>
    </section>
  );
}
