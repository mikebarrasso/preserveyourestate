"use client";

import { useEffect, useRef, useState } from "react";
import { easeOut } from "@/lib/matax";

/* Tweens a displayed number toward `target` over `dur` ms. */
export function useAnimatedNumber(target: number, dur = 420): number {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const from = display;
    if (from === target) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setDisplay(Math.round(from + (target - from) * easeOut(p)));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, dur]);

  return display;
}
