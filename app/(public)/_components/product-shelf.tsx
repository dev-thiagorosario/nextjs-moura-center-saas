"use client";

import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactElement } from "react";

const browseLabels: Record<string, string> = {
  novidades: "Ver todas as novidades",
  "mais-vendidos": "Ver todos os mais vendidos",
  kits: "Ver todos os kits",
};

export function ProductShelf({ id, title, children }: {
  id: string;
  title: string;
  children: ReactElement[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: true });
  const rail = useRef<HTMLUListElement>(null);
  const gridId = `${id}-products`;

  useEffect(() => {
    const list = rail.current;
    if (!list) return;

    function update() {
      if (!list) return;
      const start = list.scrollLeft <= 1;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
      setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
    }

    update();
    const resize = new ResizeObserver(update);
    resize.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, [expanded, children.length]);

  function move(direction: number) {
    const list = rail.current;
    if (!list) return;
    list.scrollBy({
      left: direction * list.clientWidth * .85,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className="home-section home-collection" id={id} aria-labelledby={`${id}-title`}>
      <div className="home-section-heading">
        <h3 id={`${id}-title`}>{title}</h3>
        <div className="home-shelf-controls">
          <button
            className="home-shelf-more"
            type="button"
            aria-controls={gridId}
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Voltar à faixa" : browseLabels[id] ?? "Ver todos os produtos"}
            {expanded && <span className="sr-only"> de {title}</span>}
            <ArrowDownRight size={15} aria-hidden="true" />
          </button>
          {!expanded && (
            <div className="home-shelf-direction">
              <button type="button" aria-controls={gridId} aria-label={`Produtos anteriores de ${title}`}
                aria-disabled={edges.start} onClick={() => { if (!edges.start) move(-1); }}>
                <ArrowLeft size={17} aria-hidden="true" />
              </button>
              <button type="button" aria-controls={gridId} aria-label={`Próximos produtos de ${title}`}
                aria-disabled={edges.end} onClick={() => { if (!edges.end) move(1); }}>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
      <ul ref={rail} className={expanded ? "home-product-grid" : "home-product-rail"} id={gridId}
        aria-labelledby={`${id}-title`}>
        {children.map((card) => (
          <li key={card.key} data-home-reveal>{card}</li>
        ))}
      </ul>
    </section>
  );
}
