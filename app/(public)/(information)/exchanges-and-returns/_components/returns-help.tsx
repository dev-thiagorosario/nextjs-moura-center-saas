import { ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { helpDestination } from "../../customer-service/help-navigation";

export function ReturnsHelp() {
  return (
    <section id="solicitar" className="returns-wrap returns-closing" aria-labelledby="returns-help-title">
      <div className="returns-panel">
        <div>
          <h2 id="returns-help-title">Precisa de ajuda?</h2>
          <p>Separe o número do pedido e a identificação do produto. Consulte a Central de Atendimento para ver a disponibilidade dos canais antes de enviar o item.</p>
        </div>
        <div className="returns-actions">
          <Link className="returns-button" href={helpDestination("contact")}>Falar com o atendimento <MessageCircle size={18} aria-hidden="true" /></Link>
          <Link className="returns-link" href="/account/orders"><ShoppingBag size={17} aria-hidden="true" /> Consultar meus pedidos <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
