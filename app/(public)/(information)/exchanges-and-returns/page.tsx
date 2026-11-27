import type { Metadata } from "next";

import "@/components/storefront.css";
import { Footer } from "@/app/(public)/_components/footer";
import { InstitutionalHeader } from "../_components/institutional-header";
import { ReturnsIntro } from "./_components/returns-intro";
import { ReturnsSteps } from "./_components/returns-steps";
import { ReturnsRights } from "./_components/returns-rights";
import { ProductCare } from "./_components/product-care";
import { ReturnsResolution } from "./_components/returns-resolution";
import { ReturnsShipping } from "./_components/returns-shipping";
import { ReturnsHelp } from "./_components/returns-help";
import "./returns.css";

export const metadata: Metadata = {
  title: "Trocas e Devoluções | Moura Center",
  description: "Veja os prazos, os cuidados com os produtos e como pedir uma troca ou devolução na Moura Center.",
};

export default function ExchangesAndReturnsPage() {
  return (
    <div lang="pt-BR" className="storefront moura-returns flex min-h-screen flex-col">
      <a className="returns-skip" href="#conteudo-trocas">Pular para o conteúdo</a>
      <InstitutionalHeader />
      <main id="conteudo-trocas" tabIndex={-1} className="flex-1">
        <ReturnsIntro />
        <ReturnsSteps />
        <ReturnsRights />
        <ProductCare />
        <ReturnsResolution />
        <ReturnsShipping />
        <ReturnsHelp />
      </main>
      <Footer editorial customerService />
    </div>
  );
}
