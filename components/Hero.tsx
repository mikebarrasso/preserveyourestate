"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

/* Per-character blur reveal (Hero 9 pattern). `em` renders the gold accent. */
function BlurText({ text, delay = 0, em = false }: { text: string; delay?: number; em?: boolean }) {
  const words = text.split(" ");

  return (
    <span className={`hero-blur-line${em ? " em" : ""}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="hero-blur-word">
          {word.split("").map((char, charIndex) => {
            const totalIndex =
              words.slice(0, wordIndex).join("").length + charIndex + wordIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.4,
                  delay: delay + totalIndex * 0.03,
                  ease: "easeOut",
                }}
                className="hero-blur-char"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero-video" id="top">
      {/* Background footage lives in /public. Poster paints instantly before playback;
          navy gradient shows if the video is absent. */}
      <video
        className="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />

      <div className="hero-video-inner">
        <div className="wrap hero-grid">
          <div className="hero-col-left">
            <h1>
              <BlurText text="Coordinated" delay={0.1} />
              <br />
              <BlurText text="estate, tax, and" delay={0.45} />
              <br />
              <BlurText text="wealth planning." delay={0.95} em />
            </h1>

            <motion.a
              href="#problem"
              className="scroll-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="dot" />
              Scroll
              <ChevronDown size={16} strokeWidth={2} />
            </motion.a>
          </div>

          <motion.div
            className="hero-col-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="hero-video-sub">
              Massachusetts planning for estates over $2 million.
            </p>

            <div className="hero-ctas">
              <Link className="btn btn-gold" href="/calculator">
                Calculate My Estate Tax <span className="arrow">→</span>
              </Link>
              <a className="btn btn-ghost" href="#booking">
                Schedule a Review
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
