import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getAllKits,
  getKitBySlug,
  installBadge,
  relatedKits,
  vendorPage,
  TIER_META,
} from "@/lib/data";
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

export function generateStaticParams() {
  return getAllKits().map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) return { title: "Suspension kit not found" };
  return {
    title: `${kit.name} — ${kit.brand} | Mustang Suspension Guide`,
    description: kit.overview,
  };
}

export default async function KitDetailPage({ params }: Props) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);
  if (!kit) notFound();

  const badge = installBadge(kit);
  const makerUrl = vendorPage(kit.brand);

  return (
    <>
      <Suspense>
        <DetailHeader />
      </Suspense>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Suspension", href: "/?cat=suspension" },
          { label: kit.name },
        ]}
      />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroPhoto}>
            <Photo
              src={kit.photo}
              brand={kit.brand}
              alt={`${kit.brand} ${kit.name}`}
            />
          </div>
          <div className={styles.head}>
            <p className={styles.eyebrow}>{kit.brand}</p>
            <h1 className={styles.title}>{kit.name}</h1>
            <p className={styles.price}>{kit.priceRange}</p>
            <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
            <ul className={styles.tags}>
              {kit.tags.map((tag) => (
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
                <strong>{kit.priceRange}</strong>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Fitment years</dt>
              <dd>
                <ul className={styles.chips}>
                  {kit.years.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Install</dt>
              <dd>{kit.install}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Install difficulty</dt>
              <dd>
                <span className={`${styles.badge} ${BADGE_CLASS[badge]}`}>{badge}</span>
              </dd>
            </div>
            <div className={styles.specRow}>
              <dt>Category tier</dt>
              <dd>{TIER_META[kit.tier].title}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.prose}>{kit.overview}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Practical notes</h2>
          <p className={styles.prose}>{kit.details}</p>
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

        <RelatedRow title="Related kits" items={relatedKits(kit)} kind="kit" />
      </main>
      <SiteFooter />
    </>
  );
}
