import Image from "next/image";

import dressmaking from "../_assets/dressmaking.webp";

export function AtelierServices() {
  return (
    <section aria-labelledby="about-atelier" className="about-container py-12 sm:py-16 lg:py-22">
      <div className="grid gap-3 sm:grid-cols-2 sm:items-end sm:gap-8">
        <h2 id="about-atelier" className="about-section-title">Ateliê &amp; Consultoria</h2>
        <p className="max-w-[45ch] about-body-copy">
          Além das coleções da loja, orientamos escolhas de estilo e criamos peças
          personalizadas no ateliê.
        </p>
      </div>
      <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl bg-(--shop-line) sm:mt-8 sm:aspect-[5/2] about-reveal-image">
        <Image
          src={dressmaking}
          alt="Tecidos, moldes de papel, tesoura e fita métrica sobre uma mesa de costura."
          fill
          sizes="(min-width: 1440px) 1312px, 95vw"
          className="object-cover"
        />
      </div>
      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-8">
        <div className="border-t border-(--shop-line) pt-4 sm:pt-5">
          <h3 className="text-xl font-medium tracking-tight sm:text-2xl">Consultoria de moda</h3>
          <p className="mt-2 max-w-[52ch] about-body-copy">
            A consultoria parte da sua rotina e das suas preferências para ajudar você a descobrir
            seu estilo e escolher peças que expressem sua personalidade e façam sentido no seu dia a dia.
          </p>
        </div>
        <div className="border-t border-(--shop-line) pt-4 sm:pt-5">
          <h3 className="text-xl font-medium tracking-tight sm:text-2xl">Confecção e criação de peças</h3>
          <p className="mt-2 max-w-[52ch] about-body-copy">
            Izabella participa de cada etapa, da concepção ao acabamento. Ela combina técnica e
            criatividade para transformar a ideia em uma peça exclusiva, do molde à última costura.
          </p>
        </div>
      </div>
    </section>
  );
}
