"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function CategoryRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = rail.current;
    if (!list) return;
    function update() {
      if (!list) return;
      const start = list.scrollLeft <= 1;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
      setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
    }

    const resize = new ResizeObserver(update);
    resize.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      resize.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number, animated: boolean) {
    const list = rail.current;
    if (!list) return;
    const smooth = animated && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * list.clientWidth * .83, behavior: smooth ? "smooth" : "instant" });
  }

  return (
    <div className="home-category-rail" data-home-reveal>
      <div className="home-category-controls" role="group" aria-label="Navegação de categorias">
        <button type="button" aria-label="Categorias anteriores" aria-controls="category-list"
          aria-disabled={edges.start} onClick={(event) => { if (!edges.start) move(-1, event.detail > 0); }}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" aria-label="Próximas categorias" aria-controls="category-list"
          aria-disabled={edges.end} onClick={(event) => { if (!edges.end) move(1, event.detail > 0); }}>
          <ChevronRight size={20} />
        </button>
      </div>
      <ul ref={rail} id="category-list" className="home-category-list">{children}</ul>
    </div>
  );
}
