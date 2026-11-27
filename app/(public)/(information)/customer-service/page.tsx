import type { Metadata } from "next";

import "@/components/storefront.css";
import { Footer } from "@/app/(public)/_components/footer";
import { InstitutionalHeader } from "../_components/institutional-header";
import { HelpIntro } from "./_components/help-intro";
import { HelpShortcuts } from "./_components/help-shortcuts";
import { HelpChannels } from "./_components/help-channels";
import { HelpQuestions } from "./_components/help-questions";
import { PersonalHelp } from "./_components/personal-help";
import "./customer-service.css";

export const metadata: Metadata = {
  title: "Atendimento | Moura Center",
  description: "Encontre orientações sobre pedidos, entregas, trocas e os canais de atendimento da Moura Center.",
};

export default function CustomerServicePage() {
  return (
    <div lang="pt-BR" className="storefront moura-help flex min-h-screen flex-col">
      <a className="help-skip" href="#atendimento">Pular para o conteúdo</a>
      <InstitutionalHeader />
      <main id="atendimento" tabIndex={-1} className="flex-1">
        <HelpIntro />
        <HelpShortcuts />
        <HelpChannels />
        <HelpQuestions />
        <PersonalHelp />
      </main>
      <Footer editorial customerService />
    </div>
  );
}
