"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Part, PartStyle } from "@/lib/catalog";
import { installBadge } from "@/lib/catalog";
import { Photo } from "./Photo";
import type { CardCompare } from "./KitCard";
import styles from "./PartCard.module.css";

type InstallBadge = ReturnType<typeof installBadge>;

const BADGE_CLASS: Record<InstallBadge, string> = {
  "Bolt-on": styles.badgeBolt,
  "Weld-in": styles.badgeWeld,
  "Pro install": styles.badgePro,
  Moderate: styles.badgeModerate,
};

const STYLE_LABEL: Record<PartStyle, string> = {
  factory: "Factory",
  tubular: "Tubular",
};

export function PartCard({ part, compare }: { part: Part; compare: CardCompare }) {
  const router = useRouter();
  const href = `/parts/${part.slug}`;
  const badge = installBadge(part);

  const go = () => router.push(href);

  return (
    <article
      className={styles.card}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter") go();
      }}
      tabIndex={0}
      role="link"
      aria-label={`${part.brand} ${part.name}`}
    >
      <div className={styles.media}>
        <Photo
          src={part.photo}
          brand={part.brand}
          alt={`${part.brand} ${part.name}`}
          className={styles.mediaPhoto}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{part.brand}</p>
        <h3 className={styles.name}>
          <Link href={href} onClick={(e) => e.stopPropagation()}>
            {part.name}
          </Link>
        </h3>
        <p className={styles.pn}>
          <span className={styles.pnLabel}>PN</span>
          <code>{part.pn}</code>
        </p>
        <ul className={styles.years} aria-label="Fitment years">
          {part.years.map((year) => (
            <li key={year}>{year}</li>
          ))}
        </ul>
        <div className={styles.meta}>
          <strong className={styles.price}>{part.priceRange}</strong>
          <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
        </div>
        <ul className={styles.tags}>
          <li className={styles.styleTag}>{STYLE_LABEL[part.style]}</li>
          {part.tags.slice(0, 2).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <label
          className={styles.compare}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          title={compare.disabled ? "Pick up to 3" : undefined}
        >
          <input
            type="checkbox"
            checked={compare.checked}
            onChange={compare.onToggle}
            disabled={compare.disabled}
          />
          Compare
        </label>
      </div>
    </article>
  );
}
