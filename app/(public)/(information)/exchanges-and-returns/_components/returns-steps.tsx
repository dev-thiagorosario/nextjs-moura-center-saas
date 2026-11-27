import { ClipboardList, MessageSquare, PackageCheck, Truck } from "lucide-react";

const steps = [
  { title: "Solicitação", text: "Informe o número do pedido, o item e o tipo de solicitação. Guarde o registro do contato.", icon: MessageSquare },
  { title: "Orientação de postagem", text: "Confirme as instruções de devolução com o atendimento antes de enviar o produto.", icon: ClipboardList },
  { title: "Envio", text: "Proteja o produto na embalagem, siga as instruções recebidas e guarde o comprovante de postagem.", icon: Truck },
  { title: "Análise e resolução", text: "Acompanhe pelo canal de contato e confirme a solução aplicável ao seu caso.", icon: PackageCheck },
];

export function ReturnsSteps() {
  return (
    <section id="como-funciona" className="returns-wrap returns-section" aria-labelledby="returns-steps-title">
      <h2 id="returns-steps-title">Como funciona</h2>
      <ol className="returns-steps">
        {steps.map(({ title, text, icon: Icon }, index) => (
          <li key={title}>
            <div className="returns-step-marker" aria-hidden="true">{index + 1}</div>
            <Icon className="returns-step-icon" size={24} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
