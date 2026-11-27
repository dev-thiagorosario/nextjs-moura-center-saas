import { ArrowUpRight, CircleHelp, MessageCircle, PackageCheck, RefreshCcw, Ruler, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { helpDestination } from "../help-navigation";

const shortcuts = [
  { title: "Rastrear meu pedido", description: "Veja onde consultar o código de rastreio.", href: "#rastreio", icon: PackageCheck },
  { title: "Acompanhar minhas compras", description: "Acesse sua conta na Moura Center.", href: "/account", icon: ShoppingBag },
  { title: "Trocas e Devoluções", description: "Saiba onde buscar orientação sobre sua compra.", href: helpDestination("exchanges"), icon: RefreshCcw },
  { title: "Guia de Medidas", description: "Confira onde procurar as medidas da peça.", href: "#medidas", icon: Ruler },
  { title: "Perguntas Frequentes", description: "Veja as respostas às dúvidas mais comuns.", href: helpDestination("faq"), icon: CircleHelp },
  { title: "Fale Conosco", description: "Consulte os canais de atendimento da loja.", href: helpDestination("contact"), icon: MessageCircle },
];

export function HelpShortcuts() {
  return (
    <section id="autoatendimento" className="help-wrap help-section" aria-labelledby="shortcuts-title">
      <p className="help-label">Autoatendimento</p>
      <h2 id="shortcuts-title">Encontre o que você procura</h2>
      <ul className="help-shortcuts">
        {shortcuts.map(({ title, description, href, icon: Icon }) => {
          const Destination = href.includes("#") ? "a" : Link;
          return (
            <li key={title}>
              <Destination href={href} className="help-shortcut">
                <Icon className="help-shortcut-icon" size={23} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight className="help-arrow" size={17} strokeWidth={1.5} aria-hidden="true" />
              </Destination>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
