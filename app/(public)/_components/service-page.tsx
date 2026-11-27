import Image from "next/image";
import Link from "next/link";

import "@/components/storefront.css";
import type { services } from "../_data/services";
import { Footer } from "./footer";
import { InstitutionalHeader } from "@/app/(public)/(information)/_components/institutional-header";

export function ServicePage({ service }: { service: (typeof services)[number] }) {
  return (
    <div lang="pt-BR" className="storefront flex min-h-screen flex-col">
      <InstitutionalHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <Link href="/#servicos" className="inline-flex min-h-11 items-center underline underline-offset-4">
          Voltar aos serviços
        </Link>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-serif text-5xl tracking-tight text-(--shop-brand) sm:text-6xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-[44ch] text-lg">{service.description}</p>
            <p className="mt-4 max-w-[52ch] text-(--shop-muted)">{service.details}</p>
          </div>
          <Image src={service.image} alt={service.alt} sizes="(min-width: 1280px) 576px, (min-width: 768px) 45vw, 94vw" className="h-auto w-full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
