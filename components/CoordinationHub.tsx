"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  CalendarClock, FileCheck, Landmark, Percent, TrendingUp, Users,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Six services, one per coordination gap (numbered to match the cards above). */
const NODES = [
  { num: "01", name: "Trust Funding", icon: FileCheck, x: 50, y: 10 }, { num: "02", name: "A/B Trust Structure", icon: Landmark, x: 84.6, y: 30 }, { num: "03", name: "Roth & RMD Strategy", icon: CalendarClock, x: 84.6, y: 70 }, { num: "04", name: "MA Estate Tax", icon: Percent, x: 50, y: 90 }, { num: "05", name: "Gains & Surtax", icon: TrendingUp, x: 15.4, y: 70 }, { num: "06", name: "Attorney & CPA", icon: Users, x: 15.4, y: 30 },
];

const container: Variants = {
  hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: EASE } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};
const orchestra: Variants = {
  hidden: {}, show: { transition: { staggerChildren: 0.05 } },
};

export default function CoordinationHub() {
  const reduce = useReducedMotion();

  return (
    <section id="coordination" className="bg-cream">
      <div className="wrap hub-grid">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="eyebrow">
            How the Gaps Get Closed
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ margin: "1rem 0 1.1rem" }}>
            Six gaps. <em>One planning hub.</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="lead">
            Every service runs through one CFP® who also manages the portfolio. Your
            attorney and CPA stay yours; Michael helps coordinate the three plans.
          </motion.p>
          <motion.div variants={fadeUp} className="hub-actions">
            <a className="btn btn-navy" href="#booking">
              Schedule the 45-Minute Review <span className="arrow">→</span>
            </a>
            <div className="hub-status">
              <span className="pulse-dot">
                {!reduce && (
                  <motion.span
                    className="pulse-ping"
                    animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </span>
              Fiduciary · Fee-Based · One Coordinated Plan
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          role="img"
          aria-label="Service map showing trust funding, A/B trust structure, Roth and RMD strategy, Massachusetts estate tax, gains and surtax management, and attorney-CPA coordination all connected to Preserve My Estate, the planning hub"
          className="hub-canvas"
        >
          <div className="hub-halo" aria-hidden="true" />

          <motion.svg
            variants={orchestra}
            viewBox="0 0 100 100"
            className="hub-svg"
            aria-hidden="true"
          >
            <motion.circle
              variants={fadeIn}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={1}
              stroke="var(--line)"
            />
            <motion.circle
              variants={fadeIn}
              cx="50"
              cy="50"
              r="26"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={1}
              strokeDasharray="0.3 2.4"
              strokeLinecap="round"
              stroke="var(--silver-dk)"
            />
            {NODES.map((node) => (
              <motion.line
                key={node.name}
                variants={draw}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={1.25}
                strokeLinecap="round"
                stroke="var(--gold)"
                strokeOpacity={0.5}
              />
            ))}
          </motion.svg>

          <motion.div variants={pop} className="hub-center">
            <div className="hub-center-card">
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="hub-center-ring"
                  animate={{ scale: [1, 1.28, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <BrandLogo variant="monogram" tone="dark" className="hub-brand-mark" />
              <span className="hub-center-label">
                <b>Preserve My Estate</b>
                The Planning Hub
              </span>
            </div>
          </motion.div>

          {NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.name}
                variants={pop}
                className="hub-node-pos"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -5, 0] }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 4.2 + i * 0.35, repeat: Infinity, ease: "easeInOut" }
                  }
                  style={{ position: "relative" }}
                >
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="hub-node"
                  >
                    <span className="num">{node.num}</span>
                    <Icon size={26} strokeWidth={1.5} />
                  </motion.div>
                  <span className="hub-node-label">{node.name}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Compact process row: how an engagement runs, start to finish. */}
      <div className="wrap" id="how" style={{ marginTop: "clamp(3.5rem, 7vw, 5.5rem)" }}>
        <div className="process-grid">
          <div className="step">
            <div className="step-dot">1</div>
            <span className="step-tag">Discovery</span>
            <h3>Estate &amp; Tax Diagnostic</h3>
            <p>
              Where your estate plan, investment strategy, and tax position stand today, and
              where they quietly disagree.
            </p>
          </div>
          <div className="step">
            <div className="step-dot">2</div>
            <span className="step-tag">Strategy</span>
            <h3>One Written Plan</h3>
            <p>
              Your estate structure, Roth conversion targets, capital-gains plan, and portfolio
              positioning as one set of decisions.
            </p>
          </div>
          <div className="step">
            <div className="step-dot">3</div>
            <span className="step-tag">Execution</span>
            <h3>Implementation &amp; Introductions</h3>
            <p>
              Direct introductions to independent Massachusetts estate attorneys and CPAs, with
              timing and follow-through coordinated.
            </p>
          </div>
          <div className="step">
            <div className="step-dot">4</div>
            <span className="step-tag">Ongoing</span>
            <h3>Monitoring &amp; Maintenance</h3>
            <p>
              Estate plans erode and tax law changes. We aim to keep everything current with
              regular reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
