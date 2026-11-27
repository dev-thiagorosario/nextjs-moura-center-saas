import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import { helpDestination } from "../../customer-service/help-navigation";

const shortcuts = [
  { label: "Perguntas frequentes", href: helpDestination("faq") },
  { label: "Atendimento", href: "/customer-service" },
  { label: "Trocas e devoluções", href: helpDestination("exchanges") },
];

export function ContactIntro() {
  return (
    <section className="contact-intro" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <nav aria-label="Localização na loja">
          <ol className="contact-breadcrumb">
            <li><Link href="/">Início</Link></li>
            <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Fale Conosco</span></li>
          </ol>
        </nav>
        <div className="contact-intro-grid">
          <div className="contact-intro-title" data-enter>
            <h1 id="contact-title">Fale <em>conosco.</em></h1>
            <p>Uma dúvida sobre sua compra ou uma ideia para compartilhar? Conte pra gente o que você precisa.</p>
            <a className="contact-intro-action" href="#mensagem">Escrever uma mensagem <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
          <nav className="contact-shortcuts" aria-label="Atalhos de atendimento" data-enter>
            <p>Encontre uma resposta</p>
            <ul>
              {shortcuts.map(({ label, href }) => (
                <li key={href}><Link href={href}>{label}<ArrowUpRight size={16} aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
