import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { publishedHelpPage } from "../../customer-service/help-navigation";

export function FaqSupport() {
  const contactPage = publishedHelpPage("contact");

  return (
    <section className="faq-wrap faq-closing" aria-labelledby="faq-support-title">
      <div className="faq-support">
        <div>
          <h2 id="faq-support-title">Não encontrou o que procurava?</h2>
          <p>Veja onde buscar ajuda para a sua compra ou tirar uma dúvida sobre a loja.</p>
        </div>
        <div className="faq-support-actions">
          <Link className="faq-button" href="/customer-service#canais">Canais de atendimento <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link className="faq-link" href="/customer-service#whatsapp"><MessageCircle size={17} aria-hidden="true" /> Ver canal WhatsApp</Link>
          {contactPage ? <Link className="faq-link" href={contactPage}>Fale Conosco</Link> : <p>Fale Conosco · Página em breve</p>}
        </div>
      </div>
    </section>
  );
}
