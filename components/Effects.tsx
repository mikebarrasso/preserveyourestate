"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Global scroll-driven behaviors: reveal animations, stagger indices,
   animated counters, hero parallax, sticky mobile CTA. Runs after hydration;
   re-runs on route change so new pages get their observers. */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Scroll reveal ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-scale, .stagger, .process-grid, .chart")
      .forEach((el) => io.observe(el));

    document.querySelectorAll(".stagger").forEach((group) => {
      Array.from(group.children).forEach((child, i) =>
        (child as HTMLElement).style.setProperty("--i", String(i))
      );
    });

    /* ---------- Animated counters ---------- */
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
    const fmt = (v: number, decimals: number) =>
      v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const animateNum = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const noComma = el.dataset.nocomma === "true";
      const dur = 1600;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const v = target * easeOut(p);
        el.textContent = prefix + (noComma ? v.toFixed(decimals) : fmt(v, decimals)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      if (reduced) {
        el.textContent = prefix + (noComma ? target.toFixed(decimals) : fmt(target, decimals)) + suffix;
      } else requestAnimationFrame(tick);
    };
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateNum(e.target as HTMLElement);
            counterIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counterIO.observe(el));

    /* ---------- Hero parallax ---------- */
    const back = document.querySelector<HTMLElement>(".skyline-back");
    const front = document.querySelector<HTMLElement>(".skyline-front");
    const glow = document.querySelector<HTMLElement>(".hero .hero-glow");
    const onParallax = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        if (back) back.style.transform = `translateY(${y * 0.16}px)`;
        if (front) front.style.transform = `translateY(${y * 0.07}px)`;
        if (glow) glow.style.transform = `translateY(${y * 0.22}px)`;
      }
    };
    if (!reduced && (back || front)) {
      window.addEventListener("scroll", onParallax, { passive: true });
    }

    /* ---------- Sticky mobile CTA ---------- */
    const sticky = document.querySelector<HTMLElement>(".sticky-cta");
    const onSticky = () =>
      sticky?.classList.toggle("show", window.scrollY > window.innerHeight * 0.9);
    if (sticky) window.addEventListener("scroll", onSticky, { passive: true });

    return () => {
      io.disconnect();
      counterIO.disconnect();
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("scroll", onSticky);
    };
  }, [pathname]);

  return null;
}
