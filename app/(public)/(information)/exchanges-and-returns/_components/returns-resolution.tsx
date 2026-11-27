import { Barcode, CreditCard, Gift, Landmark, RefreshCcw } from "lucide-react";

const options = [
  { label: "Pix", text: "Quando o pagamento foi por Pix, a devolução pode ser vinculada à transação original.", icon: Landmark },
  { label: "Boleto", text: "Quando o pagamento foi por boleto, a restituição pode exigir dados bancários da titular, solicitados por canal oficial.", icon: Barcode },
  { label: "Cartão de crédito", text: "No arrependimento, a loja comunica imediatamente à instituição financeira para impedir a cobrança ou solicitar o estorno na fatura.", icon: CreditCard },
  { label: "Vale-compras", text: "Pode ser oferecido se estiver disponível e você escolher essa opção. O reembolso legal pode ser exigido quando cabível.", icon: Gift },
  { label: "Substituição", text: "Quando aplicável, você pode receber outro produto. Nos casos previstos em lei, a escolha da solução é sua.", icon: RefreshCcw },
];

export function ReturnsResolution() {
  return (
    <section id="reembolso" className="returns-tint" aria-labelledby="returns-refund-title">
      <div className="returns-wrap returns-section">
        <h2 id="returns-refund-title">Reembolso e <em>outras soluções.</em></h2>
        <p className="returns-lead">No arrependimento, a restituição é integral e imediata, incluindo o frete pago na compra. Os procedimentos de restituição por Pix e boleto ainda estão em definição.</p>
        <ul className="returns-options">
          {options.map(({ label, text, icon: Icon }) => (
            <li key={label}>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>{label}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
