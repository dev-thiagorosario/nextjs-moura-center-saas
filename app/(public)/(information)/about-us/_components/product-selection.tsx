import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { productCollections } from "@/app/(public)/_data/products";

const featuredCategories = [
  { id: "novo-fitness", label: "Moda fitness" },
  { id: "novo-praia", label: "Moda praia" },
  { id: "novo-make", label: "Cosméticos" },
];

const products = productCollections.flatMap((collection) => collection.products);
const featuredProducts = featuredCategories.flatMap(({ id, label }) => {
  const product = products.find((item) => item.id === id);
  return product ? [{ product, label }] : [];
});

export function ProductSelection() {
  return (
    <section aria-labelledby="about-products" className="about-container py-12 sm:py-16 lg:py-20">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:mb-7">
        <h2 id="about-products" className="about-section-title">Conheça um pouco do nosso universo</h2>
        <Link
          href="/#novidades-title"
          aria-label="Ver mais produtos da Moura Center"
          className="group inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-(--shop-brand) underline decoration-(--shop-brand)/40 underline-offset-4 transition-colors hover:text-(--shop-ink) hover:decoration-current"
        >
          Ver mais
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {featuredProducts.map(({ product, label }) => (
          <li key={product.id}>
            <article className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 sm:block">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-(--shop-line) sm:aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 1440px) 416px, (min-width: 640px) 31vw, 96px"
                  className="object-cover"
                />
              </div>
              <div className="sm:mt-3">
                <p className="text-sm font-medium text-(--shop-brand)">{label}</p>
                <h3 className="mt-1 text-sm leading-snug font-medium sm:text-base">{product.name}</h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
