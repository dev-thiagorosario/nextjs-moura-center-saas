"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const banners = [
  {
    category: "Moda fitness",
    title: "Sua força,",
    highlight: "seu estilo",
    description: "Moda fitness que acompanha o seu ritmo, com conforto, performance e elegância.",
    action: "Conheça a coleção",
    href: "/?categoria=moda-fitness",
    image: "/images/hero/fitness.webp",
    alt: "Roupas fitness rosa e preto, tênis e halter em cenário de mármore escuro.",
  },
  {
    category: "Moda praia",
    title: "Seu verão,",
    highlight: "seu brilho",
    description: "Descubra os destaques da moda praia e encontre seu novo favorito para os dias de sol.",
    action: "Explore a moda praia",
    href: "/?categoria=moda-praia",
    image: "/images/hero/praia.webp",
    alt: "Bolsa de palha, toalha rosa, óculos de sol e chapéu em uma composição de verão.",
  },
  {
    category: "Cosméticos",
    title: "Seu cuidado,",
    highlight: "sua beleza",
    description: "Um momento só seu. Descubra os favoritos de beleza para transformar sua rotina de cuidados.",
    action: "Descubra os favoritos",
    href: "/?categoria=cosmeticos",
    image: "/images/hero/beleza.webp",
    alt: "Perfume e cosméticos em tons de rosa sobre uma bancada com tecido acetinado.",
  },
];

const controlClass = "flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-[#f5c5d1]";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const autoplay = !paused && !hovered && !focused && !reducedMotion;

  function navigate(direction: number) {
    setActiveIndex((current) => (current + direction + banners.length) % banners.length);
  }

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveIndex((current) => (current + 1) % banners.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoplay, activeIndex]);

  return (
    <section
      aria-label="Destaques e campanhas Moura Center"
      aria-roledescription="carrossel"
      className="relative isolate overflow-hidden bg-[#100d0f] text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = touchStart.current.x - event.changedTouches[0].clientX;
        const dy = touchStart.current.y - event.changedTouches[0].clientY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) navigate(dx > 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div aria-live={autoplay ? "off" : "polite"} aria-atomic="true">
        {banners.map((banner, index) => (
          <article
            key={banner.category}
            id={`hero-slide-${index}`}
            aria-label={`${index + 1} de ${banners.length}: ${banner.category}`}
            aria-roledescription="slide"
            aria-hidden={activeIndex !== index}
            inert={activeIndex !== index}
            className={`${index === 0 ? "relative" : "absolute inset-0"} min-h-[330px] transition-opacity duration-300 motion-reduce:transition-none sm:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] ${activeIndex === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
          >
            <Image src={banner.image} alt={banner.alt} fill sizes="100vw" preload={index === 0} className="object-cover object-[62%_center] sm:object-center" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#100d0f]/90 via-[#100d0f]/30 to-transparent sm:from-[#100d0f]/35 sm:via-transparent" />
            <div className="relative mx-auto flex min-h-[330px] max-w-[1440px] items-center px-6 pt-6 pb-20 sm:min-h-[420px] sm:px-12 lg:min-h-[480px] lg:px-24 lg:pt-10 lg:pb-24 xl:min-h-[520px] xl:px-32">
              <div className="w-[68%] max-w-[530px] sm:w-[55%]">
                <p className="mb-3 text-[9px] font-medium tracking-[0.18em] text-[#f0b5c9] uppercase sm:text-xs">Promoções · {banner.category}</p>
                <h2 className="text-[clamp(2rem,7.5vw,3rem)] leading-[1.02] font-light tracking-tight sm:text-6xl lg:text-7xl xl:text-[80px]">
                  {banner.title}
                  <span className="mt-1 block text-[#e38eaa] italic sm:ml-8">{banner.highlight}</span>
                </h2>
                <p className="mt-4 max-w-[230px] text-[13px] leading-snug text-[#eee8eb] sm:mt-5 sm:max-w-[350px] sm:text-lg lg:text-xl">{banner.description}</p>
                <Link href={banner.href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#b74368] px-3 py-3 text-[10px] font-medium uppercase shadow-lg shadow-black/10 transition-colors hover:bg-[#9d3456] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5c5d1] min-[390px]:px-4 min-[390px]:text-xs sm:mt-7 sm:gap-4 sm:px-7 sm:py-4 sm:text-base lg:text-lg">
                  {banner.action}
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 sm:size-6" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:bottom-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="pointer-events-auto flex items-center gap-1" role="group" aria-label="Escolher banner">
          {banners.map((banner, index) => (
            <button key={banner.category} type="button" aria-label={`Ver banner ${index + 1}: ${banner.category}`} aria-controls={`hero-slide-${index}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => setActiveIndex(index)} className="flex size-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#f5c5d1]">
              <span className={`block size-2.5 rounded-full transition-colors ${activeIndex === index ? "bg-[#e38eaa]" : "bg-white/65 hover:bg-white"}`} />
            </button>
          ))}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button type="button" aria-label="Banner anterior" onClick={() => navigate(-1)} className={controlClass}><ArrowLeft aria-hidden="true" className="size-4" /></button>
          {!reducedMotion && <button type="button" aria-label={paused ? "Retomar troca automática" : "Pausar troca automática"} onClick={() => setPaused((current) => !current)} className={controlClass}>{paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}</button>}
          <button type="button" aria-label="Próximo banner" onClick={() => navigate(1)} className={controlClass}><ArrowRight aria-hidden="true" className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}
