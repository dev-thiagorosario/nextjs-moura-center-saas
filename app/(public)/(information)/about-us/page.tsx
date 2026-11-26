import "@/components/storefront.css";
import "./about.css";
import type { Metadata } from "next";

import { Footer } from "@/app/(public)/_components/footer";
import { Header } from "@/app/(public)/_components/header";
import { NavBar } from "@/app/(public)/_components/nav-bar";
import { AtelierServices } from "./_components/atelier-services";
import { BrandIntro } from "./_components/brand-intro";
import { BrandValues } from "./_components/brand-values";
import { FounderStory } from "./_components/founder-story";
import { ProductSelection } from "./_components/product-selection";

const title = "Sobre nós | Moura Center";
const description =
  "Conheça a Moura Center, a história de sua fundadora Izabella Moura e o cuidado por trás das peças de moda feminina da loja.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Moura Center",
    locale: "pt_BR",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <div lang="pt-BR" className="storefront moura-about flex min-h-screen flex-col">
      <a
        href="#about-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-(--shop-surface) focus:px-4 focus:py-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <NavBar />
      <main id="about-content" tabIndex={-1} className="flex-1 scroll-mt-28">
        <BrandIntro />
        <FounderStory />
        <AtelierServices />
        <BrandValues />
        <ProductSelection />
      </main>
      <Footer />
    </div>
  );
}
