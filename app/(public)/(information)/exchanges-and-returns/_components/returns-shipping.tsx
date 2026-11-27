const shipping = [
  { label: "Arrependimento", text: "A loja cobre o custo da devolução quando você exerce o direito de arrependimento dentro do prazo." },
  { label: "Defeito ou avaria", text: "Quando o envio for necessário para cumprir a garantia legal, o custo do transporte é do fornecedor." },
  { label: "Troca por preferência", text: "A responsabilidade pelo frete depende das condições comerciais, ainda em definição." },
  { label: "Trocas adicionais por preferência", text: "Os custos e as condições de novas trocas comerciais ainda serão definidos. Seus direitos legais continuam valendo." },
];

export function ReturnsShipping() {
  return (
    <section id="frete" className="returns-wrap returns-section returns-split" aria-labelledby="returns-shipping-title">
      <div>
        <h2 id="returns-shipping-title">Quem paga <em>o frete?</em></h2>
        <p className="returns-lead">O motivo da solicitação determina quem arca com o transporte.</p>
        <p className="returns-sources"><a href="https://goias.gov.br/procon/wp-content/uploads/sites/19/2024/12/Cartilha-Fornecedores-e-Consumidores-CDL-Goiania-e-Procon-GO.pdf">Orientações do Procon sobre devoluções</a></p>
      </div>
      <dl className="returns-freight">
        {shipping.map(({ label, text }) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
      </dl>
    </section>
  );
}
