import Image from "next/image";

import founder from "../_assets/ceo.png";

export function FounderStory() {
  return (
    <section className="about-wrap about-section about-founder" aria-labelledby="about-founder">
      <figure>
        <div className="about-photo about-founder-photo about-reveal">
          <Image
            src={founder}
            alt="Izabella Moura em uma mesa com croquis e amostras de tecido."
            fill
            sizes="(min-width: 1440px) 550px, (min-width: 800px) 43vw, 94vw"
          />
        </div>
        <figcaption>Izabella Moura · Fundadora e CEO</figcaption>
      </figure>
      <div className="about-founder-copy">
        <p className="about-label">Quem está por trás da marca</p>
        <h2 id="about-founder">Izabella <em>Moura.</em></h2>
        <div className="about-copy">
          <p>
            Formada em Design de Moda, Izabella une o olhar de
            estilista à prática da costura. Entre croquis, moldes e provas, ela trabalha
            da criação ao acabamento e observa como cada escolha muda o caimento de uma peça.
          </p>
          <p>
            Como fundadora e CEO, ela leva essa experiência à curadoria da loja.
            A mesma atenção que dedica a um tecido ou a um ajuste ajuda a orientar,
            na consultoria e no ateliê, escolhas que respeitam o corpo, a rotina e
            as preferências de cada cliente.
          </p>
        </div>
      </div>
    </section>
  );
}
