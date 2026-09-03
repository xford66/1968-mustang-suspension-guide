import { kitsForYear, TIER_META, type Tier } from "@/data/kits";
import type { MustangYear } from "@/data/years";
import { KitCard } from "./KitCard";

const TIER_ORDER: Tier[] = ["bolt-on", "mustang-ii", "full-chassis"];

export function SuspensionList({ year }: { year: MustangYear }) {
  const kits = kitsForYear(year);

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{year} suspension options</h2>
        <p>
          Grouped by how much of the original car you keep. Click a kit for
          install notes and a longer write-up.
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
