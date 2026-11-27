import Link from "next/link";
import { categoryGroups, productCategories } from "../_data/categories";
import type { Product, ProductCollection } from "../_data/products";
import { ProductCard } from "./product-card";
import { ProductShelf } from "./product-shelf";

const shelfLabels: Record<string, string> = { novidades: "Novidades", "mais-vendidos": "Mais vendidos", kits: "Kits" };

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="home-product-grid">
      {products.map((product) => <li key={product.id}><ProductCard product={product} /></li>)}
    </ul>
  );
}

export function ProductGrid({ collections, category }: { collections: ProductCollection[]; category?: string }) {
  const selected = productCategories.find(({ slug }) => slug === category);
  const group = category && Object.hasOwn(categoryGroups, category)
    ? category as keyof typeof categoryGroups
    : undefined;
  const label = selected?.label ?? (group && categoryGroups[group]);

  if (label) {
    const groupCategories = productCategories.filter((entry) => entry.group === group);
    const products = collections.flatMap((collection) => collection.products).filter((product) =>
      product.categories.some((slug) => slug === selected?.slug || slug === group ||
        groupCategories.some((entry) => entry.slug === slug)),
    );

    return (
      <section className="home-wrap home-section home-shelf" id="vitrine" aria-labelledby="shelf-title">
        <div className="home-section-heading">
          <h2 id="shelf-title">{label}</h2>
          <Link href="/#vitrine" className="home-text-link">Ver toda a vitrine</Link>
        </div>
        {products.length ? <ProductList products={products} /> : (
          <p className="home-shelf-description">Ainda não temos produtos nesta categoria.</p>
        )}
      </section>
    );
  }

  return (
    <section className="home-wrap home-section home-shelf" id="vitrine" aria-labelledby="moura-shelf-title">
      <div className="home-shelf-title" data-home-reveal>
        <h2 id="moura-shelf-title">A vitrine <em>Moura</em></h2>
      </div>
      {collections.map(({ id, title, products }) => (
        <ProductShelf key={id} id={id} title={shelfLabels[id] ?? title}>
          {products.map((product) => <ProductCard key={product.id} product={product} heading="h4" />)}
        </ProductShelf>
      ))}
    </section>
  );
}
