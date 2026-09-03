import Link from "next/link";
import type { Part } from "@/data/parts";
import { styleLabel } from "@/data/parts";

export function PartCard({ part }: { part: Part }) {
  return (
    <article className="kit-card">
      <div className="kit-photo" aria-hidden="true">
        {part.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={part.photo} alt="" className="kit-photo-img" />
        ) : (
          <span>{part.brand.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="kit-body">
        <p className="kit-brand">{part.brand}</p>
        <h3>{part.name}</h3>
        <p className="kit-overview">{part.overview}</p>
        <ul className="tags">
          <li>{styleLabel(part.style)}</li>
          <li>{part.pn}</li>
          {part.tags.slice(0, 2).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="kit-foot">
          <span className="price">{part.priceRange}</span>
          <Link href={`/parts/${part.slug}`}>View details</Link>
        </div>
      </div>
    </article>
  );
}
