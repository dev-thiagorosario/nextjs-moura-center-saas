"use client";

import { useEffect } from "react";

let introduced = false;

function playIntro() {
  if (introduced) return;
  introduced = true;

  try {
    if (sessionStorage.getItem("moura-home-intro")) return;
    sessionStorage.setItem("moura-home-intro", "seen");
  } catch {
    // The module flag still prevents replay if storage is unavailable.
  }

  if (!window.location.hash && window.scrollY === 0) {
    document.querySelector(".moura-home")?.classList.add("home-intro");
  }
}

export function HomeReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    playIntro();
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("home-revealed");
        observer.unobserve(target);
      }
    }, { threshold: 0.12 });

    document.querySelectorAll("#home-content [data-home-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
