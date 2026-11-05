"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from "lucide-react";
import { productCollections, type Product, type ProductCollection } from "../_data/products";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#ecdfe4] bg-white shadow-[0_2px_12px_-8px_#67394b30] transition-shadow hover:shadow-[0_8px_24px_-12px_#67394b50]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f1e8ec] sm:aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1440px) 205px, (min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 max-w-[calc(100%-4rem)] rounded-full bg-[#fffafb]/95 px-2 py-1 text-[9px] font-semibold tracking-wide text-[#963752] sm:px-3 sm:text-[10px]">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={`${favorite ? "Remover" : "Adicionar"} ${product.name} ${favorite ? "dos" : "aos"} favoritos`}
          aria-pressed={favorite}
          onClick={() => setFavorite(!favorite)}
          className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-full text-[#98415e] outline-offset-2 transition-colors hover:text-[#b74368] focus-visible:outline-2 focus-visible:outline-[#b74368]"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/95 shadow-sm">
            <Heart className={`size-[18px] ${favorite ? "fill-current" : ""}`} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="min-h-10 text-xs leading-5 font-medium text-[#30242a] sm:text-sm">{product.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1" aria-label={`Avaliação ${product.rating.toLocaleString("pt-BR")} de 5, com ${product.reviews} avaliações`}>
          <span className="flex gap-0.5 text-[#e6a23b]" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-3 fill-current sm:size-3.5" strokeWidth={0} />)}
          </span>
          <span className="text-[10px] text-[#806c75]" aria-hidden="true">{product.rating.toLocaleString("pt-BR")} ({product.reviews})</span>
        </div>
        <div className="mt-auto pt-3">
          <div className="min-h-4 text-[10px] text-[#927d86] sm:text-xs">
            {product.originalPrice && <del>{currency.format(product.originalPrice)}</del>}
          </div>
          <p className="text-base font-bold tracking-tight text-[#30242a] sm:text-lg">{currency.format(product.price)}</p>
          <p className="mt-0.5 text-[10px] text-[#806c75] sm:text-xs">ou 3x de {currency.format(product.price / 3)}</p>
          <button
            type="button"
            onClick={() => setAdded(!added)}
            aria-pressed={added}
            aria-label={`${added ? "Remover" : "Adicionar"} ${product.name} ${added ? "da" : "à"} sacola de demonstração`}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#b74368] px-2 py-2 text-xs font-medium text-white transition-colors hover:bg-[#963752] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] sm:text-sm"
          >
            {added ? <Check className="size-4 shrink-0" aria-hidden="true" /> : <ShoppingBag className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />}
            {added ? "Adicionado" : "Adicionar"}
          </button>
          <span role="status" className="sr-only">{added ? `${product.name} adicionado à sacola de demonstração.` : ""}</span>
        </div>
      </div>
    </article>
  );
}

type ProductGridProps = {
  collections?: ProductCollection[];
};

function ProductRow({ collection }: { collection: ProductCollection }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const trackId = `${collection.id}-products`;
  const mobileRows = [
    collection.products.filter((_, index) => index % 2 === 0),
    collection.products.filter((_, index) => index % 2 !== 0),
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateControls() {
      if (!track) return;
      setCanScrollLeft(track.scrollLeft > 1);
      setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    }

    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    track.addEventListener("scroll", updateControls, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateControls);
    };
  }, [collection.products]);

  function scroll(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (track.clientWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section aria-labelledby={`${collection.id}-title`} className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-16">
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <h2 id={`${collection.id}-title`} className="shrink-0 text-xl font-semibold tracking-tight sm:text-2xl">{collection.title}</h2>
          <span aria-hidden="true" className="h-px flex-1 bg-[#d9c4cd]" />
          <button
            type="button"
            aria-disabled="true"
            aria-label={`Ver mais produtos de ${collection.title} (em breve)`}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm text-xs font-medium text-[#a15470] transition-colors hover:text-[#79364e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] sm:text-sm"
          >
            Ver mais
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#806c75] sm:text-sm">{collection.description}</p>
      </div>
      <div className="relative">
        <div className="space-y-3 sm:hidden">
          {mobileRows.map((products, rowIndex) => (
            <ul
              key={rowIndex}
              tabIndex={0}
              aria-label={`${collection.title}, fileira ${rowIndex + 1}`}
              className="grid snap-x snap-mandatory auto-cols-[calc((100%-0.75rem)/2)] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain rounded-xl py-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] [&::-webkit-scrollbar]:hidden"
            >
              {products.map((product) => (
                <li key={product.id} className="min-w-0 snap-start"><ProductCard product={product} /></li>
              ))}
            </ul>
          ))}
        </div>
        <ul
          ref={trackRef}
          id={trackId}
          tabIndex={0}
          aria-label={`Produtos de ${collection.title}`}
          className="hidden snap-x snap-mandatory grid-flow-col gap-3 overflow-x-auto overscroll-x-contain rounded-xl py-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] sm:grid sm:auto-cols-[calc((100%-2rem)/3)] sm:gap-4 lg:auto-cols-[calc((100%-3rem)/4)] xl:auto-cols-[calc((100%-5rem)/6)] [&::-webkit-scrollbar]:hidden"
        >
          {collection.products.map((product) => (
            <li key={product.id} className="min-w-0 snap-start"><ProductCard product={product} /></li>
          ))}
        </ul>
        {[
          { direction: -1, label: "anteriores", enabled: canScrollLeft, Icon: ChevronLeft },
          { direction: 1, label: "seguintes", enabled: canScrollRight, Icon: ChevronRight },
        ].map(({ direction, label, enabled, Icon }) => (
          <button
            key={direction}
            type="button"
            aria-label={`Ver produtos ${label} de ${collection.title}`}
            aria-controls={trackId}
            disabled={!enabled}
            onClick={() => scroll(direction)}
            className={`absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e2bdcb] bg-white text-[#b74368] shadow-md transition-colors hover:bg-[#f9e9ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] disabled:cursor-default disabled:text-[#c8b6be] disabled:shadow-none sm:flex ${direction === -1 ? "-left-5" : "-right-5"}`}
          >
            <Icon className="size-5" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProductGrid({ collections = productCollections }: ProductGridProps) {
  return (
    <div className="bg-[#fffafb] pb-8 text-[#211b1e] sm:pb-12">
      {collections.map((collection) => (
        <ProductRow key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
