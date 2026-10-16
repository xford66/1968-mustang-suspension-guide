"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Kit } from "@/lib/catalog";
import { installBadge } from "@/lib/catalog";
import { Photo } from "./Photo";
import styles from "./KitCard.module.css";

export type CardCompare = {
  checked: boolean;
  onToggle: () => void;
  disabled: boolean;
};

type InstallBadge = ReturnType<typeof installBadge>;

const BADGE_CLASS: Record<InstallBadge, string> = {
  "Bolt-on": styles.badgeBolt,
  "Weld-in": styles.badgeWeld,
  "Pro install": styles.badgePro,
  Moderate: styles.badgeModerate,
};

export function KitCard({ kit, compare }: { kit: Kit; compare: CardCompare }) {
  const router = useRouter();
  const href = `/kits/${kit.slug}`;
  const badge = installBadge(kit);

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
      aria-label={`${kit.brand} ${kit.name}`}
    >
      <div className={styles.media}>
        <Photo
          src={kit.photo}
          brand={kit.brand}
          alt={`${kit.brand} ${kit.name}`}
          className={styles.mediaPhoto}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{kit.brand}</p>
        <h3 className={styles.name}>
          <Link href={href} onClick={(e) => e.stopPropagation()}>
            {kit.name}
          </Link>
        </h3>
        <ul className={styles.years} aria-label="Fitment years">
          {kit.years.map((year) => (
            <li key={year}>{year}</li>
          ))}
        </ul>
        <div className={styles.meta}>
          <strong className={styles.price}>{kit.priceRange}</strong>
          <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
        </div>
        <ul className={styles.tags}>
          {kit.tags.slice(0, 3).map((tag) => (
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
