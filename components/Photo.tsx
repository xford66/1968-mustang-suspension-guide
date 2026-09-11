import styles from "./Photo.module.css";

type PhotoProps = {
  /** Image URL. When absent, a branded placeholder renders instead — never a broken img. */
  src?: string | null;
  brand: string;
  alt: string;
  className?: string;
};

/** First letters of up to two words, uppercase (e.g. "Global West" -> "GW"). */
function brandInitials(brand: string): string {
  return brand
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Photo({ src, brand, alt, className }: PhotoProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className ?? styles.img}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={[styles.placeholder, className].filter(Boolean).join(" ")}
    >
      <span className={styles.initials}>{brandInitials(brand)}</span>
    </div>
  );
}
