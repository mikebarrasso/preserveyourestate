"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

type Item = { label: string; id?: string; href?: string };

const ITEMS: Item[] = [
  { label: "The Problem", id: "problem" },
  { label: "How We Help", id: "coordination" },
  { label: "Guides", id: "guides" },
  { label: "About", href: "/about" },
  { label: "FAQ", id: "faq" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const menuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};
const menuItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
};

export default function Nav({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);
  const [active, setActive] = useState("");

  /* Pill opacity deepens after a little scroll (unless a solid page). */
  useEffect(() => {
    if (solid) return;
    const initialFrame = requestAnimationFrame(() => setScrolled(window.scrollY > 30));
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [solid]);

  /* Scroll-spy (home only): the active tab is the last tracked section whose
     top has crossed a reference line ~38% down the viewport. Untracked
     sections in between keep the previous highlight instead of blanking. */
  useEffect(() => {
    if (!onHome) return;
    const ids = ITEMS.filter((i) => i.id).map((i) => i.id!);
    let raf = 0;

    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.38;
      let bestId = "";
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActive(ITEMS.find((i) => i.id === bestId)?.label ?? "");
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  /* Esc closes the mobile menu. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hrefFor = (it: Item) => (it.href ? it.href : onHome ? `#${it.id}` : `/#${it.id}`);
  const bookingHref = onHome ? "#booking" : "/#booking";

  return (
    <div className="nav-float">
      <motion.nav
        className={`nav-pill${scrolled ? " scrolled" : ""}`}
        initial={{ y: -14 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        aria-label="Primary"
      >
        <Link href="/" className="nav-brand" aria-label="Preserve My Estate, home">
          <BrandLogo variant="lockup" tone="dark" className="nav-brand-lockup" />
          <BrandLogo variant="monogram" tone="dark" className="nav-brand-monogram" />
        </Link>

        <div className="nav-center">
          {ITEMS.map((it) => {
            const isActive = active === it.label;
            return (
              <Link
                key={it.label}
                href={hrefFor(it)}
                className={`nav-tab${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(it.label)}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="nav-indicator"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                <span className="nav-tab-label">{it.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="nav-right">
          <Link href={bookingHref} className="btn btn-gold nav-cta">
            Schedule a Review
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-mobile-menu"
            className="nav-mobile-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.nav
              className="nav-mobile"
              initial="hidden"
              animate="visible"
              variants={menuStagger}
              aria-label="Mobile"
            >
              {ITEMS.map((it) => (
                <motion.div key={it.label} variants={menuItem}>
                  <Link
                    href={hrefFor(it)}
                    className={`nav-mobile-link${active === it.label ? " active" : ""}`}
                    onClick={() => {
                      setActive(it.label);
                      setOpen(false);
                    }}
                  >
                    {it.label}
                    {active === it.label && <span className="dot" />}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItem} className="nav-mobile-cta">
                <Link href={bookingHref} className="btn btn-gold" onClick={() => setOpen(false)}>
                  Schedule a Review <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
