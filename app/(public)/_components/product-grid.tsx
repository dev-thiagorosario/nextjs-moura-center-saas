import { ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categoryGroups, productCategories } from "../_data/categories";
import type { Product, ProductCollection } from "../_data/products";
import { BagButton, FavoriteButton } from "./product-actions";
import { ShelfTabs } from "./shelf-tabs";

const shelfLabels: Record<string, string> = { novidades: "Novidades", kits: "Kits" };

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="home-product">
      <div className="home-photo home-product-photo">
        <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1600px) 350px, (min-width: 1024px) 23vw, 45vw" />
        {product.badge && <span className="home-badge">{product.badge}</span>}
        <FavoriteButton name={product.name} />
      </div>
      <div className="home-product-copy">
        <h3>{product.name}</h3>
        <div className="home-rating">
          <Star size={13} fill="currentColor" aria-hidden="true" />
          <span className="sr-only">Avaliação de </span>
          {product.rating.toLocaleString("pt-BR")}
          <span className="sr-only"> de 5, com </span>
          <span>({product.reviews})</span>
          <span className="sr-only"> avaliações</span>
        </div>
        <div className="home-product-prices">
          <strong>{currency.format(product.price)}</strong>
          {product.originalPrice && <del>{currency.format(product.originalPrice)}</del>}
        </div>
        <p className="home-installments">ou 3x de {currency.format(product.price / 3)}</p>
        <BagButton name={product.name} />
      </div>
    </article>
  );
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="home-product-grid">
      {products.map((product) => <li key={product.id}><ProductCard product={product} /></li>)}
    </ul>
  );
}

function Products({ collection }: { collection: ProductCollection }) {
  const firstProducts = collection.products.slice(0, 4);
  const remainingProducts = collection.products.slice(4);

  return (
    <>
      <p className="home-shelf-description">{collection.description}</p>
      <ProductList products={firstProducts} />
      {remainingProducts.length > 0 && (
        <details className="home-more">
          <summary className="home-text-link">
            <span className="home-more-open">Ver mais produtos</span>
            <span className="home-more-close">Ver menos produtos</span>
            <span className="sr-only"> da seção {collection.title}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <ProductList products={remainingProducts} />
        </details>
      )}
    </>
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
    <section className="home-wrap home-section home-shelf" id="vitrine" aria-labelledby="shelf-title">
      <div className="home-section-heading" data-home-reveal>
        <h2 id="shelf-title">A vitrine Moura</h2>
      </div>
      <ShelfTabs shelves={collections.map((collection) => ({
        id: collection.id,
        label: shelfLabels[collection.id] ?? collection.title,
        content: <Products collection={collection} />,
      }))} />
    </section>
  );
}
