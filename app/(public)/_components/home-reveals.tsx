"use client";

import { useEffect } from "react";

export function HomeReveals() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.getElementById("home-content");
    if (!main || typeof IntersectionObserver === "undefined") return;

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target, boundingClientRect } of entries) {
        if (!isIntersecting) continue;
        if (boundingClientRect.top > 32) target.classList.add("home-revealed");
        observer.unobserve(target);
      }
    }, { threshold: 0.12 });

    function observeSections() {
      main?.querySelectorAll("[data-home-reveal]").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        observer.observe(element);
      });
    }

    // The product shelf may arrive after the initial Home has hydrated.
    const stream = new MutationObserver(observeSections);
    stream.observe(main, { childList: true, subtree: true });
    observeSections();
    return () => {
      stream.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
