import { ArrowUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { publishedHelpPage } from "../help-navigation";

export function PersonalHelp() {
  const contactPage = publishedHelpPage("contact");
  return (
    <section className="help-wrap help-closing" aria-labelledby="personal-help-title">
      <div className="help-closing-panel">
        <div>
          <h2 id="personal-help-title">Quer conversar com a gente?</h2>
          <p className="help-copy">Se ficou alguma dúvida sobre sua compra, estamos aqui para orientar você.</p>
        </div>
        <div className="help-closing-actions">
          <a className="help-button" href="#whatsapp">
            <MessageCircle size={18} aria-hidden="true" /> Ver canal WhatsApp <ArrowUp size={16} aria-hidden="true" />
          </a>
          {contactPage ? (
            <Link className="help-link" href={contactPage}>Fale Conosco</Link>
          ) : (
            <p>Fale Conosco · Página em breve</p>
          )}
        </div>
      </div>
    </section>
  );
}
