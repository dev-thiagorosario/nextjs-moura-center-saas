import type { Metadata } from "next";

import { Footer } from "@/app/(public)/_components/footer";
import "@/components/storefront.css";

import { InstitutionalHeader } from "../_components/institutional-header";
import { ContactChannels } from "./_components/contact-channels";
import { ContactForm } from "./_components/contact-form";
import { ContactIntro } from "./_components/contact-intro";
import "./contact.css";

export const metadata: Metadata = {
  title: "Fale Conosco | Moura Center",
  description: "Encontre orientações e canais para conversar com a Moura Center, de Salvador, Bahia.",
};

export default function ContactPage() {
  return (
    <div lang="pt-BR" className="storefront moura-contact flex min-h-screen flex-col">
      <a className="contact-skip" href="#contato">Pular para o conteúdo</a>
      <InstitutionalHeader />
      <main id="contato" tabIndex={-1} className="flex-1">
        <ContactIntro />
        <div className="contact-wrap contact-layout">
          <ContactForm />
          <ContactChannels />
        </div>
      </main>
      <Footer editorial customerService />
    </div>
  );
}
