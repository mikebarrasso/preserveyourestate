"use client";

import { useState } from "react";
import Link from "next/link";
import { maEstateTax, maEstateTaxWithAB, fmtUSD } from "@/lib/matax";
import { useAnimatedNumber } from "@/components/useAnimatedNumber";

const MIN = 1_000_000;
const MAX = 12_000_000;

type Marital = "married" | "single";
type Resident = "yes" | "no";

export default function CalcTool() {
  const [estate, setEstate] = useState(3_000_000);
  const [marital, setMarital] = useState<Marital>("married");
  const [resident, setResident] = useState<Resident>("yes");

  const before = maEstateTax(estate);
  const after = maEstateTaxWithAB(estate);
  const savings = Math.max(0, before - after);
  const shownBefore = useAnimatedNumber(before);
  const shownAfter = useAnimatedNumber(after);
  const fill = ((estate - MIN) / (MAX - MIN)) * 100;

  const banner = (() => {
    if (resident === "no")
      return (
        <>
          The Massachusetts estate tax applies to MA residents and to non-residents who own
          Massachusetts real estate or tangible property. If that may describe you (a Cape house, a Boston condo), the planning conversation still matters.
        </>
      );
    if (before === 0)
      return (
        <>
          Under the $2M threshold, no Massachusetts estate tax is due today, but growth, inheritance, or a home sale can change that quickly. The best planning happens{" "}
          <b>before</b> you cross the line.
        </>
      );
    if (marital === "married" && savings > 0)
      return (
        <>
          Coordinated planning could keep an estimated <b>{fmtUSD(savings)}</b> in your
          family&apos;s hands instead of the Commonwealth&apos;s:{" "}
          <b>a few documents and correct titling</b>, not a product.
        </>
      );
    return (
      <>
        For single filers, planning levers include gifting strategies, ILITs, charitable
        structures, and Roth/drawdown coordination. The right mix depends on your goals.
        That&apos;s what the complimentary review maps out.
      </>
    );
  })();

  return (
    <div className="calc-page-grid">
      <div className="calc-panel reveal">
        <div className="field">
          <label
            htmlFor="calc-slider"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
          >
            Approximate gross estate{" "}
            <output
              className="serif"
              style={{
                fontSize: "1.8rem", color: "var(--navy)", textTransform: "none", letterSpacing: 0, }}
            >
              ${(estate / 1_000_000).toFixed(1)}M
            </output>
          </label>
          <p className="small" style={{ marginBottom: "1rem" }}>
            Home + retirement accounts + investments + life insurance you own + everything else.
          </p>
          <input
            type="range"
            id="calc-slider"
            min={MIN}
            max={MAX}
            step={100_000}
            value={estate}
            style={{
              ["--fill" as string]: `${fill}%`, background: "linear-gradient(90deg, var(--gold) var(--fill), var(--line) var(--fill))", }}
            onChange={(e) => setEstate(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="field" style={{ marginTop: "2rem" }}>
          <label>Marital status</label>
          <div className="seg">
            <button
              type="button"
              className={marital === "married" ? "on" : ""}
              onClick={() => setMarital("married")}
            >
              Married
            </button>
            <button
              type="button"
              className={marital === "single" ? "on" : ""}
              onClick={() => setMarital("single")}
            >
              Single / Widowed
            </button>
          </div>
        </div>
        <div className="field" style={{ marginTop: "1.4rem" }}>
          <label>Massachusetts resident or MA property owner?</label>
          <div className="seg">
            <button
              type="button"
              className={resident === "yes" ? "on" : ""}
              onClick={() => setResident("yes")}
            >
              Yes
            </button>
            <button
              type="button"
              className={resident === "no" ? "on" : ""}
              onClick={() => setResident("no")}
            >
              No
            </button>
          </div>
        </div>
        <p className="fine" style={{ marginTop: "1.8rem" }}>
          Educational estimate under M.G.L. c. 65C (2026): graduated rates applied via the state
          death tax credit method, less the $99,600 credit that shelters the first $2M. Married
          &ldquo;with planning&rdquo; scenario illustrates a funded credit shelter (A/B) trust
          preserving both spouses&apos; exemptions at the second death. Results are estimates
          only and are not guaranteed. Not tax or legal advice; actual results depend on
          deductions, ownership, and elections. Verify with your CPA and estate attorney.
        </p>
      </div>

      <div>
        <div className="calc-out reveal-scale">
          <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
            Your Estimate: 2026 Law
          </p>
          <div className="out-row">
            <span className="lbl">Estimated MA estate tax, no planning</span>
            <span className="val gold">{resident === "no" ? "n/a" : fmtUSD(shownBefore)}</span>
          </div>
          {resident === "yes" && marital === "married" && (
            <div className="out-row">
              <span className="lbl">With coordinated A/B trust planning (married, illustrative)</span>
              <span className="val green">{fmtUSD(shownAfter)}</span>
            </div>
          )}
          <div className="out-row">
            <span className="lbl">Effective rate on your estate, no planning</span>
            <span className="val">
              {resident === "no" ? "-" : before > 0 ? ((before / estate) * 100).toFixed(1) + "%" : "0%"}
            </span>
          </div>
          <div className="savings-banner">{banner}</div>
          <div style={{ marginTop: "1.8rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <Link className="btn btn-gold" href="/#booking">
              Walk Through My Number: 45 Min, Free <span className="arrow">→</span>
            </Link>
            <Link className="btn btn-ghost" href="/#guide">
              Get the Full Planning Guide (PDF)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
