"use client";

export type FaqItem = { q: string; a: React.ReactNode };

/* Native details/summary keeps answers in the accessibility tree and readable
   for crawlers without zero-height collapse. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list reveal">
      {items.map((item, i) => (
        <details key={i} className="faq">
          <summary className="faq-q">
            {item.q}
            <span className="plus" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="faq-a">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
