export type Product = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
};

export type ProductCollection = {
  id: string;
  title: string;
  description: string;
  products: Product[];
};

// Dados e fotos ilustrativos para apresentação. Substituir pelo catálogo da API.
export const productCollections: ProductCollection[] = [
  {
    id: "novidades",
    title: "Nossas novidades",
    description: "Acabaram de chegar e já são nossos favoritos.",
    products: [
      { id: "novo-fitness", name: "Conjunto Fitness Energy — Top e Legging", image: "/images/products/fitness.jpg", imageAlt: "Mulher com top esportivo vermelho e legging durante treino", price: 149.9, rating: 4.9, reviews: 24, badge: "Novidade" },
      { id: "novo-hidratante", name: "Hidratante Facial Daily Care", image: "/images/products/serum.jpg", imageAlt: "Hidratante facial em bisnaga sobre tecido claro", price: 59.9, rating: 4.8, reviews: 18, badge: "Novidade" },
      { id: "novo-praia", name: "Biquíni Estampado Summer", image: "/images/products/beach.jpg", imageAlt: "Mulher usando biquíni estampado à beira-mar", price: 89.9, rating: 4.9, reviews: 32, badge: "Novidade" },
      { id: "novo-make", name: "Essenciais de Maquiagem Rosé", image: "/images/products/makeup.jpg", imageAlt: "Seleção de maquiagem e pincéis em tons rosados", price: 79.9, rating: 4.7, reviews: 21, badge: "Novidade" },
      { id: "novo-look", name: "Conjunto Urban — Jaqueta e Calça", image: "/images/products/look.jpg", imageAlt: "Look esportivo amarelo com jaqueta e calça", price: 199.9, rating: 4.8, reviews: 26 },
      { id: "novo-capilar", name: "Tratamento Capilar Nutrição Intensa", image: "/images/products/skincare.jpg", imageAlt: "Máscara de tratamento capilar com sua embalagem", price: 69.9, rating: 4.8, reviews: 37 },
      { id: "novo-oleo", name: "Óleo Essencial Glow", image: "/images/products/beauty-kit.jpg", imageAlt: "Produtos de beleza sobre embalagens em tons suaves", price: 49.9, rating: 4.8, reviews: 48 },
      { id: "novo-make-natural", name: "Seleção de Maquiagem Natural", image: "/images/products/makeup.jpg", imageAlt: "Seleção de maquiagem e pincéis em tons rosados", price: 99.9, rating: 4.8, reviews: 59 },
    ],
  },
  {
    id: "mais-vendidos",
    title: "Mais vendidos",
    description: "Os queridinhos de quem já compra com a gente.",
    products: [
      { id: "best-look", name: "Conjunto Casual Sport — Jaqueta e Calça", image: "/images/products/look.jpg", imageAlt: "Look esportivo amarelo com jaqueta e calça", price: 189.9, originalPrice: 219.9, rating: 4.9, reviews: 128, badge: "Favorito" },
      { id: "best-praia", name: "Biquíni Cortininha Tropical", image: "/images/products/beach.jpg", imageAlt: "Biquíni estampado em um cenário de praia", price: 89.9, originalPrice: 109.9, rating: 4.8, reviews: 87 },
      { id: "best-capilar", name: "Máscara Capilar de Hidratação", image: "/images/products/skincare.jpg", imageAlt: "Máscara de tratamento capilar com sua embalagem", price: 59.9, rating: 4.9, reviews: 64 },
      { id: "best-beleza", name: "Óleo de Cuidado Essencial", image: "/images/products/beauty-kit.jpg", imageAlt: "Frasco de óleo de cuidado sobre caixas em tons pastel", price: 39.9, rating: 4.8, reviews: 91 },
      { id: "best-treino", name: "Conjunto Fitness Power", image: "/images/products/fitness.jpg", imageAlt: "Inspiração de conjunto com top e calça para treino", price: 149.9, rating: 4.8, reviews: 26 },
      { id: "best-hidratante", name: "Hidratante Facial Toque Suave", image: "/images/products/serum.jpg", imageAlt: "Hidratante facial em bisnaga sobre tecido claro", price: 64.9, rating: 4.8, reviews: 37 },
      { id: "best-make", name: "Seleção Make Rosé", image: "/images/products/makeup.jpg", imageAlt: "Seleção de maquiagem e pincéis em tons rosados", price: 89.9, rating: 4.8, reviews: 48 },
      { id: "best-casual", name: "Conjunto Casual Urban", image: "/images/products/look.jpg", imageAlt: "Look esportivo amarelo com jaqueta e calça", price: 179.9, rating: 4.8, reviews: 59 },
    ],
  },
  {
    id: "kits",
    title: "Nossos kits",
    description: "Combinações que deixam sua rotina ainda mais completa.",
    products: [
      { id: "kit-praia", name: "Kit Praia — Biquíni e Saída de Praia", image: "/images/products/beach.jpg", imageAlt: "Inspiração de moda praia para o kit de verão", price: 159.9, originalPrice: 189.9, rating: 4.9, reviews: 42, badge: "Kit especial" },
      { id: "kit-cosmeticos", name: "Kit Cosméticos — Sua Rotina de Beleza", image: "/images/products/beauty-kit.jpg", imageAlt: "Produtos de beleza sobre embalagens em tons suaves", price: 129.9, originalPrice: 159.9, rating: 4.8, reviews: 56, badge: "Kit especial" },
      { id: "kit-fitness", name: "Kit Fitness — Calça e Top", image: "/images/products/fitness.jpg", imageAlt: "Inspiração de conjunto com top e calça para treino", price: 139.9, originalPrice: 179.9, rating: 4.9, reviews: 73, badge: "Kit especial" },
      { id: "kit-maquiagem", name: "Kit Make — Os Essenciais do Dia a Dia", image: "/images/products/makeup.jpg", imageAlt: "Pincéis, batons e maquiagem para um kit de beleza", price: 119.9, originalPrice: 149.9, rating: 4.8, reviews: 38, badge: "Kit especial" },
      { id: "kit-capilar", name: "Kit Capilar — Hidratação e Cuidado", image: "/images/products/skincare.jpg", imageAlt: "Máscara de tratamento capilar com sua embalagem", price: 119.9, rating: 4.8, reviews: 26 },
      { id: "kit-skincare", name: "Kit Skincare — Rotina Facial", image: "/images/products/serum.jpg", imageAlt: "Hidratante facial em bisnaga sobre tecido claro", price: 149.9, rating: 4.8, reviews: 37 },
      { id: "kit-casual", name: "Kit Casual — Jaqueta e Calça", image: "/images/products/look.jpg", imageAlt: "Look esportivo amarelo com jaqueta e calça", price: 199.9, rating: 4.8, reviews: 48 },
      { id: "kit-autocuidado", name: "Kit Autocuidado — Momento Seu", image: "/images/products/beauty-kit.jpg", imageAlt: "Produtos de beleza sobre embalagens em tons suaves", price: 139.9, rating: 4.8, reviews: 59 },
    ],
  },
];
