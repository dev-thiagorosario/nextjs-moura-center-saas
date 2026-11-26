import Image from "next/image";

import founder from "../_assets/ceo.png";

export function FounderStory() {
  return (
    <section aria-labelledby="about-founder" className="bg-[#f8e9ef]/55">
      <div className="about-container grid items-center gap-6 py-10 sm:py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 lg:gap-16 lg:py-20 xl:gap-24">
        <div className="overflow-hidden rounded-xl about-reveal-image">
          <Image
            src={founder}
            alt="Izabella Moura diante de desenhos e amostras de tecido."
            sizes="(min-width: 1440px) 553px, (min-width: 768px) 43vw, 95vw"
            className="h-auto w-full"
          />
        </div>
        <div className="max-w-[55ch]">
          <h2 id="about-founder" className="about-section-title">Conheça Izabella Moura</h2>
          <p className="mt-2 font-medium text-(--shop-brand)">Fundadora &amp; CEO da Moura Center</p>
          <div className="mt-5 space-y-4 sm:mt-6 about-body-copy">
            <p>
              Empresária formada em Design de Moda, Izabella leva à Moura Center um olhar atento
              ao jeito de vestir de cada mulher.
            </p>
            <p>
              Como consultora de moda, estilista e costureira, ela reúne no ateliê a escuta,
              o olhar para o caimento e o trabalho manual que dão forma às peças exclusivas e personalizadas que cria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
