"use client";

import { useEffect, useRef, useState } from "react";

/** Poster paints first; video source attaches after idle/visibility to protect LCP. */
export default function DeferredHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const enable = () => {
      if (cancelled || video.dataset.loaded === "1") return;
      video.dataset.loaded = "1";
      video.src = "/hero-video.mp4";
      video.load();
      const play = () => {
        video.play().catch(() => {});
        setReady(true);
      };
      if (video.readyState >= 2) play();
      else video.addEventListener("loadeddata", play, { once: true });
    };

    let cancelIdle: () => void;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => enable(), { timeout: 1800 });
      cancelIdle = () => window.cancelIdleCallback(id);
    } else {
      const id = globalThis.setTimeout(enable, 600);
      cancelIdle = () => globalThis.clearTimeout(id);
    }

    const onInteract = () => enable();
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });

    return () => {
      cancelled = true;
      cancelIdle();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`hero-bg-video${ready ? " is-ready" : ""}`}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster="/hero-poster.jpg"
      aria-hidden="true"
    />
  );
}
