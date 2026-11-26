import { Suspense } from "react";
import type { Metadata } from "next";
import "@/components/storefront.css";
import "./home.css";
import { Header } from "./_components/header";
import { NavBar } from "./_components/nav-bar";
import { Hero } from "./_components/hero";
import { Categories } from "./_components/categories";
import { AtelierFeature } from "./_components/atelier-feature";
import { IntroAnimation } from "./_components/intro-animation";
import { HomeReveals } from "./_components/home-reveals";
import { Footer } from "./_components/footer";
import { ProductGrid } from "./_components/product-grid";
import { productCollections } from "./_data/products";

const title = "Moura Center | Moda feminina e beleza";
const description = "Moda fitness, moda praia, cosméticos e kits. Veja as novidades e as coleções da Moura Center.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, siteName: "Moura Center", locale: "pt_BR", type: "website" },
};

async function HomeShelf({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { categoria } = await searchParams;
  return <ProductGrid collections={productCollections} category={typeof categoria === "string" ? categoria : undefined} />;
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <div lang="pt-BR" className="storefront moura-home">
      <a className="home-skip" href="#home-content">Pular para o conteúdo</a>
      <Header editorial />
      <NavBar />
      <main id="home-content" tabIndex={-1}>
        <Hero />
        <Categories />
        <Suspense fallback={<ProductGrid collections={productCollections} />}>
          <HomeShelf searchParams={searchParams} />
        </Suspense>
        <AtelierFeature />
      </main>
      <Footer editorial />
      <IntroAnimation />
      <HomeReveals />
    </div>
  );
}
