"use client";

import { useRef, useState } from "react";

export type FaqItem = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="faq-list reveal">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className={`faq ${open ? "open" : ""}`}>
            <button
              className="faq-q"
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              {item.q}
              <span className="plus">+</span>
            </button>
            <div
              className="faq-a"
              ref={(el) => {
                refs.current[i] = el;
              }}
              style={{ maxHeight: open ? refs.current[i]?.scrollHeight ?? 600 : 0 }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
