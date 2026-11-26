import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import atelier from "../_assets/atelier.webp";

export function BrandIntro() {
  return (
    <section aria-labelledby="about-title" className="about-container pb-12 sm:pb-16 lg:pb-22">
      <nav aria-label="Localização na loja" className="pt-3 sm:pt-5">
        <ol className="flex items-center gap-2 text-sm text-(--shop-muted)">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center text-(--shop-brand) hover:underline">
              Início
            </Link>
          </li>
          <li className="flex items-center gap-2" aria-current="page">
            <ChevronRight className="size-3.5" aria-hidden="true" />
            Sobre nós
          </li>
        </ol>
      </nav>
      <div className="grid items-center gap-6 border-t border-(--shop-line) pt-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8 lg:gap-12 lg:pt-8 xl:gap-16">
        <div className="max-w-[34rem] md:py-5 about-hero-copy">
          <h1 id="about-title" className="mb-4 text-sm font-semibold text-(--shop-brand) sm:mb-5 sm:text-base">
            Sobre nós
          </h1>
          <p className="text-[clamp(2rem,9.7vw,2.375rem)] md:text-[clamp(2rem,4.45vw,4.125rem)] leading-[1.02] font-medium tracking-[-0.055em] text-balance">
            Moda feita para acompanhar você.
          </p>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-(--shop-muted) sm:mt-5 lg:text-lg">
            Na Moura Center, moda e beleza acompanham seu jeito de viver, do dia a dia ao treino,
            da praia às ocasiões especiais.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-(--shop-line) sm:aspect-[3/2] md:aspect-[5/4] xl:aspect-[8/5]">
          <Image
            src={atelier}
            alt="Manequim de costura com tecido rosado ao lado de uma mesa com moldes."
            fill
            sizes="(min-width: 1440px) 752px, (min-width: 768px) 56vw, 95vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[65%_center] about-hero-image"
          />
        </div>
      </div>
    </section>
  );
}
