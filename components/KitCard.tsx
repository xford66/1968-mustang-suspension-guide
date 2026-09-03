import Link from "next/link";
import type { Kit } from "@/data/kits";

export function KitCard({ kit }: { kit: Kit }) {
  return (
    <article className="kit-card">
      <div className="kit-photo" aria-hidden="true">
        <span>{kit.brand.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="kit-body">
        <p className="kit-brand">{kit.brand}</p>
        <h3>{kit.name}</h3>
        <p className="kit-overview">{kit.overview}</p>
        <ul className="tags">
          {kit.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="kit-foot">
          <span className="price">{kit.priceRange}</span>
          <Link href={`/kits/${kit.slug}`}>View details</Link>
        </div>
      </div>
    </article>
  );
}
