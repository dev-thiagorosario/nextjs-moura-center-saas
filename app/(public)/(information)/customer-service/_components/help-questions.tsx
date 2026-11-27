import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { publishedHelpPage } from "../help-navigation";

const questions = [
  { id: "medidas", topic: "Pedidos e produtos", title: "Como escolho o tamanho da minha peça?", answer: "Consulte as informações de tamanho na descrição da peça. Se houver uma tabela, compare as medidas indicadas com as suas antes de escolher." },
  { id: "rastreio", topic: "Entregas e frete", title: "Onde encontro as informações de rastreio?", answer: "Se você já recebeu uma confirmação de envio, confira se ela inclui um link ou código de rastreio. Com o código em mãos, consulte o site da transportadora indicada." },
  { id: "trocas", topic: "Trocas e devoluções", title: "Como posso pedir uma troca ou devolução?", answer: "Tenha em mãos o número do pedido e a identificação da peça. Consulte os canais de atendimento desta página para saber onde solicitar orientação." },
  { id: "pagamentos", topic: "Pagamentos", title: "Onde vejo as opções de pagamento?", answer: "Confira as opções exibidas na finalização da compra. Revise o valor total e as condições da opção escolhida antes de confirmar." },
  { id: "reposicao", topic: "Disponibilidade e reposição", title: "Como saber se um produto voltou ao estoque?", answer: "Consulte a página do produto para ver os tamanhos e as cores disponíveis. Se a opção que você procura estiver indisponível, a equipe de atendimento poderá orientar quando houver previsão de reposição." },
];

export function HelpQuestions() {
  const faqPage = publishedHelpPage("faq");
  return (
    <section id="perguntas" className="help-wrap help-section help-split help-faq" aria-labelledby="faq-title">
      <div>
        <p className="help-label">Perguntas Frequentes</p>
        <h2 id="faq-title">Dúvidas <em>comuns.</em></h2>
        <p className="help-copy">Respostas rápidas sobre sua compra.</p>
        {faqPage ? (
          <Link className="help-link" href={faqPage}>Veja todas as perguntas frequentes</Link>
        ) : (
          <p className="help-future">Confira mais respostas na página completa de Perguntas Frequentes, em breve.</p>
        )}
      </div>
      <div className="help-questions">
        {questions.map(({ id, topic, title, answer }) => (
          <details key={id} name="help-questions">
            <summary>
              <span className="help-question-topic">{topic}</span>
              <span className="help-question-title">{title}</span>
              <ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" />
            </summary>
            <p id={id}>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
