"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AlarmClock,
  ArrowRight,
  FileWarning,
  Landmark,
  TrendingUp,
  Unplug,
  Users,
} from "lucide-react";

export type Gap = {
  num: string;
  title: string;
  tease: string;
  impact: string;
  statBig: string;
  statNote: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* Icons chosen to rhyme with each gap's matching solution node in the hub below. */
const ICONS: Record<string, typeof FileWarning> = {
  "01": FileWarning, // Unfunded Trust
  "02": Users, // No MA Portability (spouses)
  "03": AlarmClock, // RMD Timing
  "04": Landmark, // MA Estate Tax Exposure
  "05": TrendingUp, // Millionaire Surtax
  "06": Unplug, // Disconnected Professionals
};

export default function GapCard({ gap }: { gap: Gap }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Reveal the impact + stat on hover (desktop); always show on touch or reduced-motion.
  const reveal = hovered || touch || !!reduce;
  const Icon = ICONS[gap.num] ?? FileWarning;
  const words = gap.impact.split(" ");

  return (
    <div
      className="gapx"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="gapx-blob"
        aria-hidden="true"
        style={{
          opacity: reveal ? 0.65 : 0,
          transform: `translateX(-50%) scale(${reveal ? 1 : 0.72})`,
        }}
      />
      <div className="gapx-inner">
        <div className="gapx-top">
          <span className="gapx-icon">
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <span className="gapx-num">{gap.num}</span>
        </div>

        <h3 className="gapx-title">{gap.title}</h3>
        <p className="gapx-tease">{gap.tease}</p>

        <p className="gapx-impact" aria-hidden={!reveal}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="gapx-word"
              initial={false}
              animate={{
                opacity: reveal ? 1 : 0,
                y: reveal ? 0 : 4,
                filter: reveal ? "blur(0px)" : "blur(3px)",
              }}
              transition={{
                duration: 0.3,
                delay: reveal && !reduce ? i * 0.02 : 0,
                ease: EASE,
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </p>

        <div className="gapx-foot">
          <div className="gapx-stat" style={{ opacity: reveal ? 1 : 0 }}>
            <b>{gap.statBig}</b>
            <span>{gap.statNote}</span>
          </div>
          <span className="gapx-arrow" data-on={reveal}>
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
