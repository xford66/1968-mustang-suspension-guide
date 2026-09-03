import Link from "next/link";
import { notFound } from "next/navigation";
import { PARTS, partBySlug, styleLabel } from "@/data/parts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PARTS.map((part) => ({ slug: part.slug }));
}

export default async function PartPage({ params }: Props) {
  const { slug } = await params;
  const part = partBySlug(slug);
  if (!part) notFound();

  return (
    <main className="page narrow">
      <Link href="/" className="back">
        ← All parts
      </Link>
      <p className="eyebrow">{part.brand}</p>
      <h1>{part.name}</h1>
      <p className="lede">
        {styleLabel(part.style)} · {part.pn}
      </p>
      <ul className="tags">
        <li>{styleLabel(part.style)}</li>
        <li>{part.soldAs === "pair" ? "Sold as a pair" : "Sold each"}</li>
        {part.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <section className="detail">
        <p>{part.details}</p>
        <dl>
          <div>
            <dt>Fits</dt>
            <dd>{part.years.join(", ")}</dd>
          </div>
          <div>
            <dt>Part number</dt>
            <dd>{part.pn}</dd>
          </div>
          <div>
            <dt>Install</dt>
            <dd>{part.install}</dd>
          </div>
          <div>
            <dt>Typical price</dt>
            <dd>{part.priceRange}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
