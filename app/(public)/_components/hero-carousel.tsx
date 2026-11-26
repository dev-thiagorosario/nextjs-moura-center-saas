"use client";

import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const campaignDuration = 7500;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function HeroCarousel({ campaigns, children }: {
  campaigns: { id: string; label: string }[];
  children: ReactNode;
}) {
  const [slide, setSlide] = useState({ index: 0, direction: "next", animate: false });
  const [conditions, setConditions] = useState({ visible: false, reduced: false });
  const [autoplay, setAutoplay] = useState<boolean | null>(null);
  const [hover, setHover] = useState(false);
  const [touching, setTouching] = useState(false);
  const region = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const playbackIntent = useRef<boolean | null>(null);
  const enabled = autoplay ?? !conditions.reduced;
  const { index } = slide;

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    let inView = false;
    function update() {
      setConditions({ visible: inView && !document.hidden, reduced: media.matches });
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: .35 });
    if (region.current) observer.observe(region.current);
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || hover || touching || !conditions.visible) return;
    const timer = window.setTimeout(() => setSlide({
      index: (index + 1) % campaigns.length, direction: "next", animate: !conditions.reduced,
    }), campaignDuration);
    return () => window.clearTimeout(timer);
  }, [campaigns.length, conditions.reduced, conditions.visible, enabled, hover, index, touching]);

  function navigate(destination: number, direction: string, animate: boolean) {
    setAutoplay(false);
    setSlide({ index: (destination + campaigns.length) % campaigns.length, direction, animate });
  }

  return (
    <section
      ref={region}
      className="home-hero"
      aria-label="Campanhas Moura Center"
      aria-roledescription="carrossel"
      data-direction={slide.direction}
      data-campaign-motion={slide.animate}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHover(true); }}
      onPointerLeave={() => setHover(false)}
      onFocus={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setAutoplay(false);
      }}
      onTouchStart={(event) => {
        swiped.current = false;
        gesture.current = event.touches.length === 1
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
        setTouching(true);
      }}
      onTouchCancel={() => { gesture.current = null; setTouching(false); }}
      onTouchEnd={(event) => {
        const start = gesture.current;
        gesture.current = null;
        setTouching(false);
        if (!start) return;
        const { clientX, clientY } = event.changedTouches[0];
        const distance = clientX - start.x;
        if (Math.abs(distance) < 48 || Math.abs(distance) < Math.abs(clientY - start.y) * 1.35) return;
        swiped.current = true;
        navigate(index + (distance < 0 ? 1 : -1), distance < 0 ? "next" : "prev", true);
      }}
      onClickCapture={(event) => {
        if (swiped.current && event.detail > 0) {
          event.preventDefault();
          event.stopPropagation();
          swiped.current = false;
        }
      }}
    >
      <div className="home-hero-footer home-wrap">
        <div className="home-hero-controls" role="group" aria-label="Controles de campanhas">
          <button type="button" aria-label={enabled ? "Pausar campanhas" : "Reproduzir campanhas"}
            onPointerDown={() => { playbackIntent.current = !enabled; }}
            onPointerCancel={() => { playbackIntent.current = null; }}
            onClick={(event) => {
              setAutoplay(event.detail > 0 ? playbackIntent.current ?? !enabled : !enabled);
              playbackIntent.current = null;
            }}>
            {enabled ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" aria-label="Campanha anterior"
            onClick={(event) => navigate(index - 1, "prev", event.detail > 0)}><ChevronLeft size={19} /></button>
          <div className="home-hero-indicators">
            {campaigns.map((campaign, position) => (
              <button key={campaign.id} type="button" aria-label={campaign.label}
                aria-current={index === position ? "true" : undefined}
                onClick={(event) => {
                  if (index !== position) navigate(position, position > index ? "next" : "prev", event.detail > 0);
                }} />
            ))}
          </div>
          <button type="button" aria-label="Próxima campanha"
            onClick={(event) => navigate(index + 1, "next", event.detail > 0)}><ChevronRight size={19} /></button>
        </div>
        <a className="home-hero-index" href="#colecoes">
          Explorar coleções <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="home-hero-stage" aria-live={enabled ? "off" : "polite"}>
        {Children.map(children, (child, position) => (
          <div className="home-hero-panel" data-active={position === index}
            role="group" aria-roledescription="slide" aria-label={`${position + 1} de ${campaigns.length} — ${campaigns[position].label}`}
            inert={position !== index} aria-hidden={position !== index}>
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
