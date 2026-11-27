import { ChevronDown, Droplet, Gem, Gift, Shirt, Waves } from "lucide-react";

const categories = [
  { label: "Roupas e moda fitness", text: "Evite lavar ou usar a peça enquanto aguarda orientação. Guarde as etiquetas e a embalagem, se ainda estiverem com você.", icon: Shirt },
  { label: "Moda praia", text: "Preserve o protetor higiênico, quando houver, e mantenha a peça seca. Informe ao atendimento se a proteção já veio solta ou danificada.", icon: Waves },
  { label: "Cosméticos", text: "Mantenha frascos fechados para evitar vazamentos. Guarde a embalagem e as informações de lote e validade, se disponíveis. Se houver vazamento ou lacre violado na entrega, relate o que encontrou.", icon: Droplet },
  { label: "Acessórios", text: "Proteja peças delicadas contra atrito ou impacto e guarde os componentes e estojos que vieram com o item.", icon: Gem },
  { label: "Kits de produtos", text: "Separe os itens, acessórios e brindes vinculados ao kit, quando houver. Se o problema for em apenas um item, informe qual é e confirme o que precisa ser enviado.", icon: Gift },
];

export function ProductCare() {
  return (
    <section id="cuidados" className="returns-wrap returns-section returns-split" aria-labelledby="returns-care-title">
      <div>
        <h2 id="returns-care-title">Cuidados com <em>o produto.</em></h2>
        <p className="returns-lead">Tenha o número do pedido, a nota fiscal ou outro comprovante da compra à mão. Se puder, use uma embalagem que proteja o item no transporte.</p>
        <p className="returns-note">São orientações de conservação. A ausência da embalagem original, de etiqueta ou de lacre, por si só, não elimina seus direitos legais.</p>
      </div>
      <div className="returns-accordion">
        {categories.map(({ label, text, icon: Icon }) => (
          <details key={label} name="returns-care">
            <summary>
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              {label}
              <ChevronDown className="returns-chevron" size={18} aria-hidden="true" />
            </summary>
            <p>{text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
