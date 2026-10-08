import Link from "next/link";
import type { Kit, Part } from "@/lib/data";
import { Photo } from "./Photo";
import styles from "./RelatedRow.module.css";

type RelatedRowProps = {
  title: string;
  items: (Kit | Part)[];
  kind: "kit" | "part";
};

export function RelatedRow({ title, items, kind }: RelatedRowProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.wrap} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.row}>
        {items.map((item) => {
          const href = kind === "kit" ? `/kits/${item.slug}` : `/parts/${item.slug}`;
          const photo = "photo" in item ? item.photo : undefined;
          return (
            <Link key={item.slug} href={href} className={styles.mini}>
              <span className={styles.thumb}>
                <Photo
                  src={photo}
                  brand={item.brand}
                  alt=""
                  className={styles.thumbPhoto}
                />
              </span>
              <span className={styles.brand}>{item.brand}</span>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>{item.priceRange}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
