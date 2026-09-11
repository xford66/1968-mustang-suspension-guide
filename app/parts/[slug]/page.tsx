import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllParts,
  getPartBySlug,
  installBadge,
  relatedParts,
  vendorPage,
} from "@/lib/data";
import type { PartStyle } from "@/lib/data";
import { DetailHeader } from "@/components/DetailHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { RelatedRow } from "@/components/RelatedRow";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

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

export function generateStaticParams() {
  return getAllParts().map((part) => ({ slug: part.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const part = getPartBySlug(slug);
  if (!part) return { title: "Part not found" };
  return {
    title: `${part.name} — ${part.brand} | Mustang Suspension Guide`,
    description: part.overview,
  };
}

export default async function PartDetailPage({ params }: Props) {
  const { slug } = await params;
  const part = getPartBySlug(slug);
  if (!part) notFound();

  const badge = installBadge(part);
  const makerUrl = vendorPage(part.brand);

  return (
    <>
      <DetailHeader />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Suspension", href: "/?cat=suspension" },
          { label: part.name },
        ]}
      />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroPhoto}>
            <Photo
              src={part.photo}
              brand={part.brand}
              alt={`${part.brand} ${part.name}`}
            />
          </div>
          <div className={styles.head}>
            <p className={styles.eyebrow}>{part.brand}</p>
            <h1 className={styles.title}>
              {part.name}{" "}
              <code className={styles.pn}>{part.pn}</code>
            </h1>
            <p className={styles.price}>{part.priceRange}</p>
            <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
            <ul className={styles.tags}>
              <li className={styles.styleTag}>{STYLE_LABEL[part.style]}</li>
              {part.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className={styles.section} aria-label="Specifications">
          <h2 className={styles.sectionTitle}>Specifications</h2>
          <dl className={styles.specs}>
            <div className={styles.specRow}>
              <dt>Price</dt>
              <dd>
                <strong>{part.priceRange}</strong>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Fitment years</dt>
              <dd>
                <ul className={styles.chips}>
                  {part.years.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Install</dt>
              <dd>{part.install}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Install difficulty</dt>
              <dd>
                <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Sold as</dt>
              <dd>{part.soldAs}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Part #</dt>
              <dd>
                <code className={styles.pn}>{part.pn}</code>
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.prose}>{part.overview}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Practical notes</h2>
          <p className={styles.prose}>{part.details}</p>
        </section>

        {makerUrl ? (
          <a
            className={styles.makerBtn}
            href={makerUrl}
            target="_blank"
            rel="noreferrer"
          >
            Maker site ↗
          </a>
        ) : null}

        <RelatedRow title="Related parts" items={relatedParts(part)} kind="part" />
      </main>
      <SiteFooter />
    </>
  );
}
