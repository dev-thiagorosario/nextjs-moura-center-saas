"use client";

import { useEffect } from "react";

const revealTargets = [
  ".about-story > div",
  ".about-curation-copy > :is(.about-label, h2)",
  ".about-curation-steps > li",
  ".about-reveal",
  ".about-founder-copy > *",
  ".about-services > h2",
  ".about-services li",
  ".about-values-grid > div",
  ".about-values li",
  ".about-outro > *",
].join(", ");

export function AboutMotion() {
  useEffect(() => {
    const main = document.getElementById("about-content");
    if (!main || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;

        observer.unobserve(target);
        if (!preference.matches && !target.matches(":focus-within")) {
          target.setAttribute("data-about-entered", "");
        }
      }
    }, { rootMargin: "0px 0px -8% 0px" });

    // Content already visible on entry, including an anchor destination, stays settled.
    for (const target of main.querySelectorAll(revealTargets)) {
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
