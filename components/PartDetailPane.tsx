"use client";

import type { Kit } from "@/data/kits";
import type { Part } from "@/data/parts";
import { styleLabel } from "@/data/parts";
import { vendorPage } from "@/data/vendors";

type Props = {
  part?: Part;
  kit?: Kit;
};

export function PartDetailPane({ part, kit }: Props) {
  if (!part && !kit) {
    return (
      <aside className="detail-pane">
        <p className="sidebar-label">Detail</p>
        <p className="empty">Select a row to see the part.</p>
      </aside>
    );
  }

  if (kit) {
    const url = vendorPage(kit.brand);
    return (
      <aside className="detail-pane">
        <p className="sidebar-label">Detail</p>
        <div className="detail-photo">{initials(kit.brand)}</div>
        <p className="kit-brand">{kit.brand}</p>
        <h2>{kit.name}</h2>
        <p className="lede">{kit.overview}</p>
        <dl className="detail-dl">
          <div>
            <dt>Fits</dt>
            <dd>{kit.years.join(", ")}</dd>
          </div>
          <div>
            <dt>Install</dt>
            <dd>{kit.install}</dd>
          </div>
          <div>
            <dt>Typical price</dt>
            <dd>{kit.priceRange}</dd>
          </div>
        </dl>
        <p className="detail-copy">{kit.details}</p>
        <div className="detail-actions">
          <a href={`/kits/${kit.slug}`}>Full page</a>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer">
              Maker site
            </a>
          ) : null}
        </div>
      </aside>
    );
  }

  if (!part) return null;

  const url = vendorPage(part.brand);
  return (
    <aside className="detail-pane">
      <p className="sidebar-label">Detail</p>
      <div className="detail-photo">
        {part.photo ? (
          <img src={part.photo} alt="" className="kit-photo-img" />
        ) : (
          initials(part.brand)
        )}
      </div>
      <p className="kit-brand">{part.brand}</p>
      <h2>{part.name}</h2>
      <p className="lede">
        {styleLabel(part.style)} · {part.pn}
      </p>
      <dl className="detail-dl">
        <div>
          <dt>Part number</dt>
          <dd>{part.pn}</dd>
        </div>
        <div>
          <dt>Sold</dt>
          <dd>{part.soldAs === "pair" ? "Pair" : "Each"}</dd>
        </div>
        <div>
          <dt>Fits</dt>
          <dd>{part.years.join(", ")}</dd>
        </div>
        <div>
          <dt>Usage</dt>
          <dd>{part.install}</dd>
        </div>
        <div>
          <dt>Typical price</dt>
          <dd>{part.priceRange}</dd>
        </div>
      </dl>
      <p className="detail-copy">{part.details}</p>
      <ul className="tags">
        {part.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="detail-actions">
        <a href={`/parts/${part.slug}`}>Full page</a>
        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            Maker site
          </a>
        ) : null}
      </div>
    </aside>
  );
}

function initials(brand: string) {
  return brand
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
