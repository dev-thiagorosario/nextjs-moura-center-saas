import { ArrowDown, ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import dressmaking from "../../about-us/_assets/dressmaking.webp";

export function HelpIntro() {
  return (
    <section className="help-wrap" aria-labelledby="help-title">
      <nav aria-label="Localização na loja">
        <ol className="help-breadcrumb">
          <li><Link href="/">Início</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Atendimento</span></li>
        </ol>
      </nav>
      <div className="help-hero">
        <div className="help-hero-copy">
          <p className="help-label">Central de Atendimento</p>
          <h1 id="help-title">Como podemos <em>te ajudar?</em></h1>
          <p className="help-copy">Da escolha da peça à chegada do pedido, conte com a gente em cada etapa da sua compra.</p>
          <div className="help-actions">
            <a className="help-button" href="#autoatendimento">Encontre sua resposta <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="help-link" href="#canais"><MessageCircle size={18} aria-hidden="true" /> Canais de atendimento</a>
          </div>
        </div>
        <div className="help-hero-photo">
          <Image src={dressmaking} alt="" fill sizes="(min-width: 1440px) 590px, (min-width: 820px) 43vw, 94vw" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
