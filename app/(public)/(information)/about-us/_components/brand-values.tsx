import { Gem, HeartHandshake, MessageCircle, PackageCheck, RefreshCw } from "lucide-react";

const commitments = [
  { icon: MessageCircle, title: "Atendimento humano", text: "Escuta e atenção para ajudar você em cada etapa da compra." },
  { icon: Gem, title: "Qualidade nos detalhes", text: "Atenção aos materiais, ao acabamento e à apresentação dos produtos." },
  { icon: RefreshCw, title: "Trocas e devoluções transparentes", text: "Nosso compromisso é orientar com clareza sobre as condições e o processo." },
  { icon: PackageCheck, title: "Cuidado no envio", text: "Atenção à conferência e à proteção dos itens na embalagem." },
  { icon: HeartHandshake, title: "Compra personalizada", text: "Orientação que leva em conta seu estilo, suas preferências e sua rotina." },
];

export function BrandValues() {
  return (
    <section className="about-values" aria-labelledby="about-values">
      <div className="about-wrap about-section about-values-grid">
        <div>
          <p className="about-label">Nossos compromissos</p>
          <h2 id="about-values">O que você pode <em>esperar de nós.</em></h2>
        </div>
        <ul>
          {commitments.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p className="about-copy">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
