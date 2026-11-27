import { Star } from "lucide-react";
import Image from "next/image";
import type { Product } from "../_data/products";
import { BagButton, FavoriteButton } from "./product-actions";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const percent = new Intl.NumberFormat("pt-BR", { style: "percent" });

export function ProductCard({ product, heading: Heading = "h3" }: { product: Product; heading?: "h3" | "h4" }) {
  const { originalPrice, price } = product;
  const savings = originalPrice && originalPrice > price ? (originalPrice - price) / originalPrice : 0;

  return (
    <article className="home-product">
      <div className="home-photo home-product-photo">
        <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1600px) 232px, (min-width: 1100px) 15vw, (min-width: 620px) 30vw, 46vw" />
        <FavoriteButton name={product.name} />
        <div className="home-product-labels">
          {product.badge && <span className="home-badge">{product.badge}</span>}
          {savings >= 0.01 && (
            <span className="home-badge home-product-saving">
              <span aria-hidden="true">−</span>{percent.format(savings)}<span className="sr-only"> de desconto</span>
            </span>
          )}
        </div>
      </div>
      <div className="home-product-copy">
        <Heading>{product.name}</Heading>
        <div className="home-rating">
          <Star size={12} fill="currentColor" aria-hidden="true" />
          <span className="sr-only">Avaliação de </span>
          {product.rating.toLocaleString("pt-BR")}
          <span className="sr-only"> de 5, com </span>
          <span>({product.reviews})</span>
          <span className="sr-only"> avaliações</span>
        </div>
        <div className="home-product-offer">
          <div className="home-product-prices">
            <strong>{currency.format(price)}</strong>
            {originalPrice !== undefined && savings > 0 && (
              <del><span className="sr-only">Preço anterior </span>{currency.format(originalPrice)}</del>
            )}
          </div>
          <p className="home-installments">ou 3x de {currency.format(price / 3)}</p>
        </div>
        <BagButton name={product.name} />
      </div>
    </article>
  );
}
