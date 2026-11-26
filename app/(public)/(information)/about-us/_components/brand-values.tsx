import { Gem, MessagesSquare, Shirt } from "lucide-react";


const values = [
  {
    icon: Shirt,
    title: "Moda e personalidade",
    description: "Peças versáteis para combinar à sua maneira e usar em diferentes ocasiões.",
  },
  {
    icon: MessagesSquare,
    title: "Atendimento personalizado",
    description: "Escuta e atenção para entender o que você procura e orientar suas escolhas na loja.",
  },
  {
    icon: Gem,
    title: "Qualidade nos detalhes",
    description: "Da escolha dos materiais ao acabamento, o cuidado aparece em cada peça.",
  },
];

export function BrandValues() {
  return (
    <section aria-labelledby="about-values" className="border-y border-(--shop-line) bg-[#f8e9ef]/55">
      <div className="about-container py-10 sm:py-14 lg:grid lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-16 lg:py-18">
        <div>
          <h2 id="about-values" className="about-section-title">A essência da Moura Center</h2>
          <p className="mt-3 max-w-[25ch] text-lg leading-snug text-(--shop-brand) sm:text-xl">
            Sua essência, seu estilo, sua melhor versão.
          </p>
        </div>
        <ul className="mt-6 divide-y divide-(--shop-line) border-y border-(--shop-line) lg:mt-0">
          {values.map(({ icon: Icon, title, description }) => (
            <li key={title} className="grid grid-cols-[auto_1fr] gap-4 py-4 sm:py-5">
              <Icon className="mt-0.5 size-6 text-(--shop-brand)" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-lg font-medium tracking-tight">{title}</h3>
                <p className="about-body-copy">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
