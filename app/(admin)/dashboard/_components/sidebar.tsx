"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ShoppingBag, Tag, Users, Layers, Settings, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoWordmark from "../../(public)/_assets/logo-wordmark-dark.png";

const items = [
  { href: "/dashboard", label: "Visão geral", icon: House },
  { href: "/dashboard/oders", label: "Pedidos", icon: ShoppingBag },
  { href: "/dashboard/products", label: "Produtos", icon: Tag },
  { href: "/dashboard/clients", label: "Clientes", icon: Users },
  { href: "/dashboard/storage", label: "Estoque", icon: Layers },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

const surface = "bg-[#100d0f] bg-[radial-gradient(ellipse_at_bottom_right,rgba(143,77,100,0.16),transparent_65%)] text-[#d5cfd2]";

function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link href="/dashboard" aria-label="Moura Center — visão geral" className="flex h-28 shrink-0 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-[#df92ae]">
      {collapsed ? <span className="text-2xl font-light italic text-[#df92ae]">M</span> : (
        <span className="relative block h-12 w-44 overflow-hidden">
          <Image src={logoWordmark} alt="Moura Center" sizes="251px" className="absolute -top-[144%] -left-[21.25%] h-auto w-[142.5%] max-w-none contrast-150 mix-blend-screen" />
        </span>
      )}
    </Link>
  );
}

function Navigation({ pathname, collapsed = false, onNavigate }: { pathname: string; collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav aria-label="Administração" className="flex flex-col gap-2 px-3">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
        return (
          <Link key={href} href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} aria-label={collapsed ? label : undefined} title={collapsed ? label : undefined}
            className={`flex min-h-11 items-center rounded-md text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df92ae] ${collapsed ? "justify-center px-2" : "gap-3 px-4"} ${active ? "bg-gradient-to-r from-[#b34f73] to-[#c36387] text-white shadow-[0_3px_16px_#b34f7326]" : "hover:bg-white/5 hover:text-[#f1c0d1]"}`}>
            <Icon aria-hidden="true" strokeWidth={1.6} className={`size-5 shrink-0 ${active ? "text-[#ffe0eb]" : "text-[#c28d9f]"}`} />
            {!collapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[#faf8f9] text-[#292327]">
      <aside aria-label="Menu lateral" className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 transition-[width] duration-300 motion-reduce:transition-none md:flex ${surface} ${isCollapsed ? "w-20" : "w-64"}`}>
        <Brand collapsed={isCollapsed} />
        <div className="px-3 pb-4">
          <button type="button" onClick={() => setIsCollapsed(value => !value)} aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"} aria-expanded={!isCollapsed}
            className={`flex min-h-11 w-full items-center rounded-md text-sm hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#df92ae] ${isCollapsed ? "justify-center" : "gap-3 px-4"}`}>
            {isCollapsed ? <PanelLeftOpen aria-hidden="true" className="size-5" /> : <><PanelLeftClose aria-hidden="true" className="size-5" /><span>Recolher menu</span></>}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pb-6">
          <Navigation pathname={pathname} collapsed={isCollapsed} />
        </div>
      </aside>

      <div className={`min-w-0 transition-[margin] duration-300 motion-reduce:transition-none ${isCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <header className={`sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-white/10 px-4 md:hidden ${surface}`}>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger aria-label="Abrir menu de administração" className="flex size-11 items-center justify-center rounded-md hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#df92ae]">
              <Menu aria-hidden="true" className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" showCloseButton={false} className={`gap-0 border-white/10 data-[side=left]:w-[min(18rem,85vw)] ${surface}`}>
              <SheetTitle className="sr-only">Menu de administração</SheetTitle>
              <SheetDescription className="sr-only">Navegue entre as páginas do painel Moura Center.</SheetDescription>
              <SheetClose aria-label="Fechar menu" className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-md hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#df92ae]">
                <X aria-hidden="true" className="size-5" />
              </SheetClose>
              <div onClick={() => setIsMobileOpen(false)}><Brand /></div>
              <div className="min-h-0 flex-1 overflow-y-auto pb-6">
                <Navigation pathname={pathname} onNavigate={() => setIsMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium">{items.find(item => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)))?.label ?? "Administração"}</span>
        </header>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
