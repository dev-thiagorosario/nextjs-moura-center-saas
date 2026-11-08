"use client";

import { Heart, LogIn, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoWordmark from "../_assets/logo-wordmark-dark.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeaderActions, type HeaderAction } from "./header-actions";
import { useSession } from "next-auth/react";

export function Header() {

  const { status } = useSession();
  const items: HeaderAction[] = [
    ...(status === "authenticated"
      ? [
          { label: "Minha conta", icon: UserRound },
          { label: "Meus favoritos", icon: Heart },
        ]
      : []),
    { label: "Sacola de compras, 0 itens", icon: ShoppingBag, count: 0 },
    { label: "Login", icon: LogIn, href: "/login" },
  ];

  return (
    <header className="sticky top-0 isolate z-50 border-b border-[#b96a83]/40 bg-[#100d0f]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-x-1 gap-y-1 px-3 pt-1 pb-3 sm:px-6 lg:flex lg:h-[88px] lg:gap-8 lg:px-10 lg:py-0 xl:gap-16 xl:px-16">
        <div className="col-start-1 row-start-1 justify-self-start lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Abrir menu"
              className="flex size-11 items-center justify-center rounded-sm text-[#d5cfd2] transition-colors hover:text-[#df92ae] focus-visible:outline-2 focus-visible:outline-[#d5809e]"
            >
              <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Moura Center</SheetTitle>
                <SheetDescription>Navegue pela nossa loja.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu principal" className="px-4">
                <SheetClose
                  render={<Link href="/" />}
                  className="block rounded-md px-3 py-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-[#d5809e]"
                >
                  Página inicial
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <Link
          href="/"
          aria-label="Moura Center — página inicial"
          className="relative col-start-2 row-start-1 block h-[31px] w-[110px] shrink-0 overflow-hidden rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#d5809e] min-[360px]:h-9 min-[360px]:w-[130px] lg:h-14 lg:w-[200px]"
        >
          {/* Blend the dark background of the cropped wordmark into the header. */}
          <Image
            src={logoWordmark}
            alt="Moura Center"
            preload
            sizes="(min-width: 1024px) 285px, (min-width: 360px) 186px, 157px"
            className="absolute -top-[144%] -left-[21.25%] h-auto w-[142.5%] max-w-none contrast-150 mix-blend-screen"
          />
        </Link>
        <form
          role="search"
          action="/"
          method="get"
          className="relative col-span-3 row-start-2 flex h-9 min-w-0 items-center rounded-md border border-[#d1cdd0] bg-[#fafafa] text-[#393539] shadow-inner focus-within:ring-2 focus-within:ring-[#d5809e] lg:mx-auto lg:h-10 lg:w-full lg:max-w-[580px]"
        >
          <label htmlFor="header-search" className="sr-only">
            Busque por produtos, marcas ou categorias
          </label>
          <input
            id="header-search"
            type="search"
            name="q"
            placeholder="Busque por produtos, marcas ou categorias"
            className="h-full min-w-0 flex-1 rounded-md bg-transparent pr-10 pl-3 text-[11px] outline-none placeholder:text-[#777277] sm:text-sm lg:pr-12 lg:pl-4 [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-md transition-colors hover:text-[#b96080] focus-visible:outline-2 focus-visible:outline-[#d5809e] lg:w-11"
          >
            <Search className="size-5 lg:size-[23px]" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </form>
        <HeaderActions items={items} />
      </div>
    </header>
  );
}
