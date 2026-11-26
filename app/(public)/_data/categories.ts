export const productCategories = [
  { slug: "kits-capilares", label: "Kits capilares", group: "cosmeticos" },
  { slug: "reconstrucao", label: "Kits de reconstrução", group: "cosmeticos" },
  { slug: "shampoos", label: "Shampoos", group: "cosmeticos" },
  { slug: "shampoo-e-condicionador", label: "Shampoo e condicionador", group: "cosmeticos" },
  { slug: "material-para-trancas", label: "Material para tranças", group: "cosmeticos" },
  { slug: "maquiagens", label: "Maquiagens", group: "cosmeticos" },
  { slug: "tops", label: "Tops", group: "moda-fitness" },
  { slug: "leggings", label: "Leggings", group: "moda-fitness" },
  { slug: "kits-de-academia", label: "Kits de academia", group: "moda-fitness" },
  { slug: "maios", label: "Maiôs", group: "moda-praia" },
  { slug: "biquinis", label: "Biquínis", group: "moda-praia" },
  { slug: "saidas-de-praia", label: "Saídas de praia", group: "moda-praia" },
] as const;

export type ProductCategory = (typeof productCategories)[number];

export const categoryGroups = {
  cosmeticos: "Cosméticos",
  "moda-fitness": "Moda fitness",
  "moda-praia": "Moda praia",
  acessorios: "Acessórios",
} as const;
