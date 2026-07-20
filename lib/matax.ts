/* Massachusetts estate tax estimator, M.G.L. c. 65C (2023 reform, 2026 law)
   Method: credit for state death taxes under old IRC §2011 computed on the
   adjusted taxable estate (taxable estate − $60,000), minus the $99,600 credit.
   Educational estimates only, not tax advice. Verified against illustrative
   examples approved in existing client content:
   $2.5M → $39,200 · $3M → $82,400 · $4M → $180,800 · $6M → $411,200 */

export const MA_CREDIT = 99_600;
export const MA_THRESHOLD = 2_000_000;

/* §2011 brackets: [lower bound of adjusted taxable estate, rate] */
const BRACKETS: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [40_000, 0.008], [90_000, 0.016], [140_000, 0.024], [240_000, 0.032],
  [440_000, 0.04], [640_000, 0.048], [840_000, 0.056], [1_040_000, 0.064],
  [1_540_000, 0.072], [2_040_000, 0.08], [2_540_000, 0.088], [3_040_000, 0.096],
  [3_540_000, 0.104], [4_040_000, 0.112], [5_040_000, 0.12], [6_040_000, 0.128],
  [7_040_000, 0.136], [8_040_000, 0.144], [9_040_000, 0.152], [10_040_000, 0.16],
];

export function maEstateTax(estate: number): number {
  if (estate <= MA_THRESHOLD) return 0;
  const adjusted = Math.max(0, estate - 60_000);
  let credit = 0;
  for (let i = 0; i < BRACKETS.length; i++) {
    const [lo, rate] = BRACKETS[i];
    const hi = i + 1 < BRACKETS.length ? BRACKETS[i + 1][0] : Infinity;
    if (adjusted <= lo) break;
    credit += (Math.min(adjusted, hi) - lo) * rate;
  }
  return Math.max(0, Math.round(credit - MA_CREDIT));
}

/* Illustrative married A/B-trust scenario: first $2M funds a credit shelter
   trust at the first death (bypasses the survivor's estate); MA tax estimated
   on the remainder at the second death. */
export function maEstateTaxWithAB(estate: number): number {
  return maEstateTax(Math.max(0, estate - MA_THRESHOLD));
}

export const fmtUSD = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const fmtShort = (n: number): string => {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1_000) return "$" + Math.round(n / 1_000) + "K";
  return fmtUSD(n);
};

export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 4);
