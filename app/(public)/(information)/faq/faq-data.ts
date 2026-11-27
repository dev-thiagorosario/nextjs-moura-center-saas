type FaqLink = { label: string; href: string };

export type FaqEntry = {
  question: string;
  answer: string;
  keywords?: string;
  links?: readonly FaqLink[];
};

export type FaqCategoryId = "pedidos" | "entregas" | "produtos" | "trocas" | "atendimento";

type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  entries: readonly FaqEntry[];
};

const support = { label: "Canais de atendimento", href: "/customer-service#canais" };
const returns = { label: "Política de Trocas e Devoluções", href: "/exchanges-and-returns" };

export const faqCategories: readonly FaqCategory[] = [
  {
    id: "pedidos",
    label: "Pedidos e Pagamentos",
    entries: [
      { question: "Quais são as formas de pagamento aceitas?", answer: "Confira as opções disponíveis na finalização da compra. A lista oficial de meios aceitos, incluindo a disponibilidade de Pix, boleto e cartão, ainda precisa de confirmação." },
      { question: "Posso parcelar minhas compras?", answer: "Se houver parcelamento disponível para o seu pedido, confira o número de parcelas, os juros e o valor total antes de confirmar. As condições de parcelamento ainda precisam de confirmação." },
      { question: "Quanto tempo demora a aprovação do pagamento?", answer: "O tempo de aprovação pode variar conforme o meio de pagamento e a instituição responsável. Os prazos da loja ainda precisam de confirmação. Se o pagamento continuar pendente, consulte o atendimento.", links: [support] },
      { question: "É seguro comprar no site?", answer: "Antes de pagar, confira se está no site oficial e se o navegador mostra uma conexão HTTPS. Informe seus dados de pagamento apenas na finalização da compra e evite enviar senhas ou dados de cartão por mensagem.", keywords: "segurança fraude" },
      { question: "Posso alterar meu pedido ou endereço após finalizar a compra?", answer: "Entre em contato com o número do pedido e informe o que precisa mudar. A possibilidade de alteração depende da etapa em que o pedido está.", links: [support] },
      { question: "Como utilizo um cupom de desconto?", answer: "Se houver um campo de cupom na finalização da compra, insira o código e confira se o desconto apareceu no total. A disponibilidade de cupons depende das campanhas da loja." },
    ],
  },
  {
    id: "entregas",
    label: "Entregas, Prazos e Frete",
    entries: [
      { question: "Qual é o prazo de postagem e entrega do meu pedido?", answer: "Confira a previsão informada na compra para o seu CEP e a modalidade de envio escolhida. O prazo operacional de postagem ainda precisa de confirmação.", keywords: "envio transporte" },
      { question: "Como faço para rastrear meu pedido?", answer: "Se você recebeu uma confirmação de envio, confira se ela inclui um link ou código de rastreio. Com o código, consulte o site da transportadora indicada.", keywords: "rastreamento acompanhar" },
      { question: "Vocês oferecem frete grátis?", answer: "A disponibilidade de frete grátis ainda precisa de confirmação. Confira o valor do frete exibido para o seu CEP antes de concluir a compra.", keywords: "frete gratuito promoção" },
      { question: "O que acontece se não houver ninguém para receber o pedido?", answer: "Consulte o rastreio para verificar se houve uma tentativa de entrega. As próximas etapas dependem da transportadora. Se o rastreio não indicar o que fazer, procure o atendimento.", links: [support] },
      { question: "Meu pedido está atrasado. O que devo fazer?", answer: "Compare a previsão da compra com a última atualização do rastreio. Se o prazo informado já passou, tenha em mãos o número do pedido e procure o atendimento.", links: [support] },
      { question: "Meu pedido consta como entregue, mas não o recebi. Como proceder?", answer: "Verifique se alguém no endereço ou na portaria recebeu a encomenda. Se continuar sem localizar o pacote, informe ao atendimento o número do pedido e a atualização que aparece no rastreio.", links: [support] },
    ],
  },
  {
    id: "produtos",
    label: "Produtos, Tamanhos e Estoque",
    entries: [
      { question: "Como descubro meu tamanho ideal?", answer: "Consulte as informações da peça. Se houver uma tabela, compare suas medidas com as indicadas para aquele produto.", keywords: "guia de medidas busto cintura quadril" },
      { question: "As cores dos produtos são fiéis às fotografias?", answer: "A iluminação da foto e as configurações da tela podem alterar a aparência da cor. Confira o nome da cor selecionada e a descrição do produto." },
      { question: "Vocês realizam reposição de produtos esgotados?", answer: "A reposição varia conforme o produto. Consulte a página do item para ver as opções em estoque. As datas de reposição ainda precisam ser confirmadas caso a caso." },
      { question: "Como devo lavar e conservar minhas peças?", answer: "Siga as instruções da etiqueta de cuidado. Ela indica se a peça pode ser lavada à máquina, passada a ferro ou seca em secadora.", keywords: "lavagem conservação" },
      { question: "Como consultar a composição e a validade dos cosméticos?", answer: "Procure a lista de ingredientes na descrição, quando estiver disponível. Confira o lote e a validade na embalagem do item recebido. Se o rótulo estiver ilegível, procure o atendimento.", links: [support] },
      { question: "Como verificar a regularização e as informações dos cosméticos?", answer: "Use a consulta oficial da Anvisa. Tenha à mão o nome do produto ou o número do processo de regularização indicado na embalagem.", links: [{ label: "Consultar cosméticos na Anvisa", href: "https://www.gov.br/anvisa/pt-br/comunicacao/campanhas/estetica/consulta-de-cosmeticos/" }] },
    ],
  },
  {
    id: "trocas",
    label: "Trocas e Devoluções",
    entries: [
      { question: "Qual é o prazo para solicitar troca ou devolução?", answer: "Em compras on-line, você pode desistir em até sete dias corridos após receber o produto. Para defeitos, os prazos para reclamar são de 30 dias para produtos não duráveis e 90 para duráveis. As trocas por preferência seguem regras comerciais ainda em definição.", links: [returns] },
      { question: "A primeira troca é gratuita?", answer: "A gratuidade da primeira troca por preferência ainda precisa de confirmação. A loja cobre o envio de retorno no arrependimento dentro do prazo e quando o transporte é necessário para cumprir a garantia legal.", links: [returns] },
      { question: "Posso trocar produtos comprados em promoção?", answer: "Seus direitos de arrependimento em compras on-line e de garantia legal também valem para itens em promoção. As condições de troca por preferência ainda estão em definição.", links: [returns] },
      { question: "Como solicito uma devolução?", answer: "Tenha à mão o número do pedido e a identificação do item. Informe sua solicitação pelo canal disponibilizado e consulte as orientações antes de enviar o produto.", links: [{ label: "Orientações para solicitar uma devolução", href: "/exchanges-and-returns#solicitar" }] },
      { question: "Em quanto tempo recebo meu reembolso?", answer: "No arrependimento, a restituição é integral e imediata. No cartão, a loja comunica a instituição financeira para impedir a cobrança ou solicitar o estorno. Os procedimentos por Pix e boleto seguem em definição.", links: [{ label: "Entenda o reembolso", href: "/exchanges-and-returns#reembolso" }] },
    ],
  },
  {
    id: "atendimento",
    label: "Atendimento e Loja",
    entries: [
      { question: "Qual é o horário de atendimento?", answer: "Os horários e a previsão de resposta serão divulgados na Central de Atendimento.", links: [support] },
      { question: "Quais são os canais de atendimento disponíveis?", answer: "O WhatsApp está previsto como canal principal. O número oficial, o endereço de e-mail e o perfil de Instagram ainda serão divulgados.", links: [support] },
      { question: "Vocês possuem loja física ou ponto de retirada?", answer: "A disponibilidade de loja física ou retirada ainda precisa de confirmação.", keywords: "endereço presencial" },
      { question: "Vocês trabalham com vendas no atacado?", answer: "As condições para vendas no atacado ainda precisam de confirmação." },
      { question: "Como funcionam as parcerias com influenciadoras?", answer: "O programa de parcerias e o canal para envio de propostas ainda precisam de confirmação.", keywords: "influencer colaboração" },
      { question: "Como posso conhecer os serviços de Ateliê e Consultoria de Moda?", answer: "A página Sobre Nós apresenta o trabalho do ateliê e a proposta de consultoria. A disponibilidade dos serviços e os detalhes de contratação ainda serão divulgados.", links: [{ label: "Conheça o ateliê e a consultoria", href: "/about-us#about-atelier" }] },
    ],
  },
];
