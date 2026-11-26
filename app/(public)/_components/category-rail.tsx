"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function CategoryRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = rail.current;
    if (!list) return;

    function scrollWithWheel(event: WheelEvent) {
      if (!list || !event.cancelable || event.ctrlKey || event.shiftKey ||
          Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

      const max = list.scrollWidth - list.clientWidth;
      const current = list.scrollLeft;
      if (event.deltaY > 0 ? current >= max - 0.5 : current <= 0.5) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? list.clientWidth : 1;
      event.preventDefault();
      list.scrollBy({ left: event.deltaY * unit, behavior: "instant" });
    }
    function update() {
      if (!list) return;
      const start = list.scrollLeft <= 1;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
      setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
    }

    const resize = new ResizeObserver(update);
    resize.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    list.addEventListener("wheel", scrollWithWheel, { passive: false });
    update();
    return () => {
      resize.disconnect();
      list.removeEventListener("scroll", update);
      list.removeEventListener("wheel", scrollWithWheel);
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
