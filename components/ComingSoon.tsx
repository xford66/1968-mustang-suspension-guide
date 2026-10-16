type Props = {
  title: string;
  note?: string;
};

export function ComingSoon({ title, note }: Props) {
  return (
    <section className="coming-soon" aria-label={`${title} coming soon`}>
      <p className="eyebrow">Coming soon</p>
      <h2>{title}</h2>
      <p>We&apos;re cataloging this section next.</p>
      {note ? <p className="note">{note}</p> : null}
    </section>
  );
}
