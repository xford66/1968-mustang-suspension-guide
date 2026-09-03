import Link from "next/link";
import { notFound } from "next/navigation";
import { KITS, TIER_META, kitBySlug } from "@/data/kits";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export default async function KitPage({ params }: Props) {
  const { slug } = await params;
  const kit = kitBySlug(slug);
  if (!kit) notFound();

  return (
    <main className="page narrow">
      <Link href="/" className="back">
        ← All kits
      </Link>
      <p className="eyebrow">{kit.brand}</p>
      <h1>{kit.name}</h1>
      <p className="lede">{TIER_META[kit.tier].title}</p>
      <ul className="tags">
        {kit.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <section className="detail">
        <p>{kit.details}</p>
        <dl>
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
      </section>
    </main>
  );
}
