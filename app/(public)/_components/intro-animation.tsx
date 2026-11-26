"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import wordmark from "../_assets/logo-wordmark-dark.png";

const storageKey = "moura-home-intro";
let visited = false;

export function IntroAnimation() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = layer.current;
    const home = overlay?.parentElement;
    if (!overlay || !home) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    function stop() {
      cancelAnimationFrame(frame);
      home?.classList.remove("home-intro");
      window.clearTimeout(timer);
    }

    // Defer the session claim so React's development effect replay can cancel it.
    const frame = requestAnimationFrame(() => {
      if (visited) return;
      visited = true;
      try {
        if (sessionStorage.getItem(storageKey)) return;
        sessionStorage.setItem(storageKey, "seen");
      } catch {
        // The module flag still covers client-side navigation.
      }

      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (motion.matches || document.hidden || window.location.hash || window.location.search ||
          window.scrollY || document.activeElement !== document.body ||
          new URL(navigation?.name ?? location.href).pathname !== location.pathname) return;

      home.classList.add("home-intro");
      timer = window.setTimeout(stop, 2300);
    });

    const interrupts = ["keydown", "pointerdown", "scroll", "visibilitychange"] as const;
    interrupts.forEach((event) => window.addEventListener(event, stop, { passive: true, capture: true }));
    motion.addEventListener("change", stop);
    return () => {
      stop();
      interrupts.forEach((event) => window.removeEventListener(event, stop, true));
      motion.removeEventListener("change", stop);
    };
  }, []);

  return (
    <div ref={layer} className="home-intro-layer" aria-hidden="true">
      <div className="home-intro-frame">
        <div className="home-intro-mark">
          <Image src={wordmark} alt="" sizes="(max-width: 576px) 90vw, 525px" />
        </div>
      </div>
    </div>
  );
}
