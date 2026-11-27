import Image from "next/image";

import dressmaking from "../_assets/dressmaking.webp";

const steps = [
  {
    title: "Antes de chegar à loja",
    text: "Na escolha de produtos e fornecedores, nosso foco está na qualidade. Observamos os materiais, o toque e os acabamentos, com atenção a como cada item será usado no dia a dia.",
  },
  {
    title: "Antes de chegar a você",
    text: "O cuidado continua na preparação do pedido. Conferir os itens e protegê-los na embalagem faz parte da experiência que queremos entregar desde o momento em que você abre o pacote.",
  },
];

export function ProductSelection() {
  return (
    <section className="about-curation" aria-labelledby="about-curation">
      <div className="about-wrap about-section about-curation-grid">
        <div className="about-photo about-curation-photo about-reveal">
          <Image
            src={dressmaking}
            alt="Tesoura, fita métrica e moldes de costura entre tecidos rosa e vinho."
            fill
            sizes="(min-width: 1440px) 700px, (min-width: 800px) 50vw, 94vw"
          />
        </div>
        <div className="about-curation-copy">
          <p className="about-label">Curadoria e bastidores</p>
          <h2 id="about-curation">O cuidado começa <em>na escolha.</em></h2>
          <ul className="about-curation-steps">
            {steps.map(({ title, text }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p className="about-copy">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
