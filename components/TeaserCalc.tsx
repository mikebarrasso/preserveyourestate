"use client";

import { useState } from "react";
import { maEstateTax, fmtUSD, fmtShort } from "@/lib/matax";
import { useAnimatedNumber } from "@/components/useAnimatedNumber";

const MIN = 1_000_000;
const MAX = 8_000_000;

export default function TeaserCalc() {
  const [estate, setEstate] = useState(3_000_000);
  const tax = maEstateTax(estate);
  const shown = useAnimatedNumber(tax);
  const fill = ((estate - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="calc-widget reveal-scale">
      <label htmlFor="teaser-slider">
        Approximate estate value <output id="teaser-estate">{fmtShort(estate)}</output>
      </label>
      <input
        type="range"
        id="teaser-slider"
        min={MIN}
        max={MAX}
        step={100_000}
        value={estate}
        style={{ ["--fill" as string]: `${fill}%` }}
        onChange={(e) => setEstate(parseInt(e.target.value, 10))}
      />
      <div className="calc-result">
        <span className="calc-result-label">Estimated MA estate tax, before planning</span>
        <span className={`calc-result-num ${tax === 0 ? "zero" : ""}`}>{fmtUSD(shown)}</span>
      </div>
      <p className="fine">
        Educational estimate under M.G.L. c. 65C (2026). Results are estimates only and are not
        guaranteed. Not tax advice. The full calculator models married-couple planning.
      </p>
    </div>
  );
}
