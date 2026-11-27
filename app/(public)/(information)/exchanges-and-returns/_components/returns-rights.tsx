export function ReturnsRights() {
  return (
    <section id="prazos" className="returns-tint" aria-labelledby="returns-rights-title">
      <div className="returns-wrap returns-section">
        <h2 id="returns-rights-title">Qual é o seu <em>caso?</em></h2>
        <div className="returns-rights">
          <article>
            <p className="returns-kicker">Direito previsto no CDC</p>
            <h3>Arrependimento ou desistência</h3>
            <p className="returns-term">7 dias corridos</p>
            <p>Em compras on-line, você pode desistir em até sete dias corridos após receber o produto, sem precisar justificar. Comunique a desistência dentro do prazo. Você pode usar o mesmo meio da compra ou outro canal disponibilizado pela loja.</p>
          </article>
          <article id="troca-por-preferencia">
            <p className="returns-kicker">Política comercial em definição</p>
            <h3>Troca por tamanho, cor ou preferência</h3>
            <p>A Moura Center ainda está definindo as condições, os prazos e a disponibilidade dessa modalidade. Em compras on-line, seu direito de desistir dentro do prazo legal continua valendo.</p>
          </article>
          <article>
            <p className="returns-kicker">Garantia legal</p>
            <h3>Produto com defeito ou avaria</h3>
            <dl className="returns-term-pair">
              <div><dt>30 dias</dt><dd>Produtos não duráveis</dd></div>
              <div><dt>90 dias</dt><dd>Produtos duráveis</dd></div>
            </dl>
            <p>Esses são os prazos para reclamar de defeitos aparentes, contados da entrega. Para defeito oculto, a contagem começa quando ele fica evidente.</p>
            <p>Em regra, o fornecedor tem até 30 dias para solucionar o defeito. Se o problema persistir, você pode escolher substituição, restituição do valor pago ou abatimento proporcional. A lei prevê escolha imediata em situações como produto essencial ou reparo que comprometa a qualidade ou reduza o valor.</p>
          </article>
        </div>
        <p className="returns-sources">
          <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">Código de Defesa do Consumidor, arts. 18, 26 e 49</a>
          <a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm">Decreto do Comércio Eletrônico, art. 5º</a>
        </p>
      </div>
    </section>
  );
}
