import "@/components/storefront.css";
import "./about.css";
import type { Metadata } from "next";

import { Footer } from "@/app/(public)/_components/footer";
import { InstitutionalHeader } from "@/app/(public)/(information)/_components/institutional-header";
import { AboutMotion } from "./_components/about-motion";
import { AtelierServices } from "./_components/atelier-services";
import { BrandIntro } from "./_components/brand-intro";
import { BrandStory } from "./_components/brand-story";
import { ContinueExploring } from "./_components/continue-exploring";
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
        className="about-skip"
      >
        Pular para o conteúdo
      </a>
      <InstitutionalHeader />
      <main id="about-content" tabIndex={-1} className="about-main flex-1">
        <BrandIntro />
        <BrandStory />
        <ProductSelection />
        <FounderStory />
        <AtelierServices />
        <BrandValues />
        <ContinueExploring />
        <AboutMotion />
      </main>
      <Footer editorial />
    </div>
  );
}
