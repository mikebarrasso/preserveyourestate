"use client";

import { useState } from "react";

const ITEMS = [
  "My revocable trust has been drafted by a Massachusetts estate attorney and is current.", "My trust has been properly funded: real estate re-deeded, accounts retitled, beneficiaries confirmed.", "My spouse and I have discussed and documented our estate plan structure, including what happens at the first death.", "I have reviewed the Massachusetts estate tax exposure of my combined estate in the past 24 months.", "I have a Roth conversion strategy, or have consciously decided not to convert, with documented reasoning.", "My portfolio's asset location is intentional: tax-inefficient assets in tax-deferred accounts, tax-efficient in taxable.", "I have reviewed and updated beneficiary designations on all IRA, 401(k), and life insurance accounts in the past three years.", "My financial advisor, estate attorney, and CPA have spoken to each other about my plan in the past 12 months.", "I understand my exposure to the Massachusetts Millionaire Surtax (4% on income above the 2026 threshold).", "I have a written plan for how my estate will be settled, not just a verbal understanding.",
];

const C = 2 * Math.PI * 74;

function message(n: number): { title: string; body: string } {
  if (n === 0)
    return {
      title: "Start checking the boxes", body: "As you check each item, you'll see where your plan is solid, and where the coordination gaps may be hiding.", };
  if (n <= 6)
    return {
      title: `${10 - n} coordination gaps showing`, body: "Most of these gaps are invisible until the worst moment. Each one is exactly what a 45-minute review is designed to surface.", };
  if (n <= 9)
    return {
      title: "Closer than most, but not sealed", body: "You're ahead of most Massachusetts families. The remaining items are usually the expensive ones. Worth a second set of eyes.", };
  return {
    title: "Remarkably well coordinated", body: "If every box is genuinely confirmed, not just planned, you're in rare company. A review would simply confirm it in writing.", };
}

export default function ReadinessChecklist() {
  const [checked, setChecked] = useState<boolean[]>(Array(ITEMS.length).fill(false));
  const n = checked.filter(Boolean).length;
  const msg = message(n);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, k) => (k === i ? !v : v)));

  return (
    <div className="checklist-grid">
      <div className="stagger">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className={`chk ${checked[i] ? "on" : ""}`}
            role="checkbox"
            aria-checked={checked[i]}
            tabIndex={0}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <span className="box">✓</span>
            {item}
          </div>
        ))}
      </div>
      <div className="score-card reveal-scale">
        <div className="ring">
          <svg width="168" height="168" viewBox="0 0 168 168">
            <circle className="track" cx="84" cy="84" r="74" fill="none" strokeWidth="10" />
            <circle
              className={`prog ${n >= 8 ? "good" : ""}`}
              cx="84"
              cy="84"
              r="74"
              fill="none"
              strokeWidth="10"
              strokeDasharray={C}
              strokeDashoffset={C - (C * n) / 10}
            />
          </svg>
          <div className="ring-num">
            <b>{n}</b>
            <span>of 10</span>
          </div>
        </div>
        <div className="score-msg">
          <h3>{msg.title}</h3>
          <p>{msg.body}</p>
        </div>
        <a className={`btn btn-gold score-cta ${n > 0 ? "show" : ""}`} href="#booking">
          Review My Gaps: 45 Minutes
        </a>
      </div>
    </div>
  );
}
