import dressmaking from "../(information)/about-us/_assets/dressmaking.webp";
import styling from "../(information)/about-us/_assets/atelier.webp";

export const services = [
  {
    id: "atelie",
    name: "Ateliê",
    lead: "Conheça nosso",
    highlight: "Ateliê",
    description: "Da sua ideia à peça pronta. Criamos roupas exclusivas, personalizadas e sob medida.",
    details: "A criação começa com suas ideias e referências. Avaliamos a viabilidade da peça e preparamos um orçamento personalizado para a confecção.",
    image: dressmaking,
    alt: "Tesoura e fita métrica sobre tecidos em tons de vinho e rosa",
    href: "/atelie",
    cta: "Explorar o Ateliê",
  },
  {
    id: "consultoria",
    name: "Consultoria de Moda",
    lead: "Descubra nossa",
    highlight: "Consultoria de Moda",
    description: "Encontre combinações que valorizam seu estilo e expressam quem você é.",
    details: "A orientação parte das suas preferências e da sua rotina para ajudar você a escolher e combinar peças com autenticidade e confiança.",
    image: styling,
    alt: "Manequim com tecido rosa diante de uma arara de roupas",
    href: "/consultoria-de-moda",
    cta: "Explorar a Consultoria",
  },
] as const;
