"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Shelf = {
  id: string;
  label: string;
  content: ReactNode;
};

export function ShelfTabs({ shelves }: { shelves: Shelf[] }) {
  const [active, setActive] = useState(shelves[0].id);
  const [focusable, setFocusable] = useState(active);
  const [animate, setAnimate] = useState(false);
  const tabList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function followShelfLink() {
      const id = window.location.hash.slice(1);
      if (!shelves.some((shelf) => shelf.id === id)) return;

      setActive(id);
      setFocusable(id);
      setAnimate(false);
      requestAnimationFrame(() => tabList.current?.closest("section")?.scrollIntoView({ block: "start" }));
    }

    followShelfLink();
    window.addEventListener("hashchange", followShelfLink);
    return () => window.removeEventListener("hashchange", followShelfLink);
  }, [shelves]);

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = shelves.length - 1;
    const next = {
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowRight: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;

    event.preventDefault();
    setFocusable(shelves[next].id);
    tabList.current?.querySelectorAll("button")[next]?.focus();
  }

  return (
    <>
      <div className="home-shelf-tabs" role="tablist" aria-label="Vitrines de produtos" ref={tabList}>
        {shelves.map(({ id, label }, index) => (
          <button
            key={id}
            id={`${id}-tab`}
            role="tab"
            type="button"
            aria-selected={active === id}
            aria-controls={id}
            tabIndex={focusable === id ? 0 : -1}
            onFocus={() => setFocusable(id)}
            onKeyDown={(event) => moveFocus(event, index)}
            onClick={(event) => {
              if (active === id) return;
              setAnimate(event.detail > 0);
              setActive(id);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {shelves.map(({ id, content }) => (
        <div
          key={id}
          id={id}
          role="tabpanel"
          aria-labelledby={`${id}-tab`}
          hidden={active !== id}
          className={animate && active === id ? "home-shelf-enter" : undefined}
        >
          {content}
        </div>
      ))}
    </>
  );
}
