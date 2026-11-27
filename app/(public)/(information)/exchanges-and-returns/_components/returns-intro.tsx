import { ArrowDown, ArrowUpRight, CalendarDays, ChevronRight, CreditCard, MessageSquare, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import atelier from "../../about-us/_assets/atelier.webp";

const highlights = [
  { label: "Até 7 dias corridos", description: "Após receber a compra on-line", href: "#prazos", icon: CalendarDays },
  { label: "Condições de troca", description: "Entenda o que vale em cada caso", href: "#troca-por-preferencia", icon: RefreshCcw },
  { label: "Como solicitar", description: "Organize os dados do seu pedido", href: "#como-funciona", icon: MessageSquare },
  { label: "Reembolso e estorno", description: "Veja as formas de restituição", href: "#reembolso", icon: CreditCard },
];

export function ReturnsIntro() {
  return (
    <section className="returns-wrap" aria-labelledby="returns-title">
      <nav aria-label="Localização na loja">
        <ol className="returns-breadcrumb">
          <li><Link href="/">Início</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><Link href="/customer-service">Atendimento</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Trocas e Devoluções</span></li>
        </ol>
      </nav>
      <div className="returns-hero">
        <div className="returns-hero-copy">
          <h1 id="returns-title">Trocas e <em>Devoluções</em></h1>
          <p>Se algo na sua compra precisa mudar, veja o que fazer, quais são seus direitos e como buscar ajuda.</p>
          <a className="returns-button" href="#solicitar">Solicitar troca ou devolução <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className="returns-photo">
          <Image src={atelier} alt="" fill sizes="(min-width: 1440px) 590px, (min-width: 800px) 43vw, 95vw" fetchPriority="high" />
        </div>
      </div>
      <ul className="returns-highlights">
        {highlights.map(({ label, description, href, icon: Icon }) => (
          <li key={href}>
            <a href={href}>
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              <span><strong>{label}</strong><small>{description}</small></span>
              <ArrowUpRight className="returns-arrow" size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
