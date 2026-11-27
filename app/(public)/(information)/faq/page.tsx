import type { Metadata } from "next";

import "@/components/storefront.css";
import { Footer } from "@/app/(public)/_components/footer";
import { InstitutionalHeader } from "../_components/institutional-header";
import { FaqExplorer } from "./_components/faq-explorer";
import { FaqSupport } from "./_components/faq-support";
import "./faq.css";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Moura Center",
  description: "Encontre respostas sobre pedidos, pagamentos, entregas, tamanhos e trocas na Moura Center.",
};

export default function FaqPage() {
  return (
    <div lang="pt-BR" className="storefront moura-faq flex min-h-screen flex-col">
      <a className="faq-skip" href="#conteudo-faq">Pular para o conteúdo</a>
      <InstitutionalHeader />
      <main id="conteudo-faq" tabIndex={-1} className="flex-1">
        <FaqExplorer />
        <FaqSupport />
      </main>
      <Footer editorial customerService />
    </div>
  );
}
