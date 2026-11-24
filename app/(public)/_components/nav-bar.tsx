import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/data-access/current-user";

const navigation = [
  { label: "Moda Fitness", href: "/?categoria=moda-fitness" },
  { label: "Moda Praia", href: "/?categoria=moda-praia" },
  { label: "Cosméticos", href: "/?categoria=cosmeticos" },
  { label: "Acessórios", href: "/?categoria=acessorios" },
];

const itemClassName =
  "flex h-full min-h-11 items-center justify-center px-1 py-2 text-center text-[10px] leading-snug font-medium min-[360px]:text-[11px] sm:px-3 sm:text-xs sm:tracking-wide lg:min-h-12 lg:px-6 lg:text-sm";

function NavBarContent({ showAtelier = false }: { showAtelier?: boolean }) {
  return (
    <nav
      aria-label="Navegação da loja"
      className="border-b border-[#b96a83]/30 bg-[#f8e9ef] text-[#100d0f]"
    >
      <div className="mx-auto w-full max-w-[1440px] sm:px-6 lg:px-10 xl:px-16">
        <ul className={showAtelier ? "grid grid-cols-5" : "grid grid-cols-4"}>
          {navigation.map(({ label, href }) => (
            <li
              key={href}
              className="relative min-w-0 after:absolute after:top-1/2 after:right-0 after:h-4 after:w-px after:-translate-y-1/2 after:bg-[#875563]/15 last:after:hidden"
            >
              <Link
                href={href}
                className={`${itemClassName} transition-colors hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#70364b]`}
              >
                {label}
              </Link>
            </li>
          ))}
          {showAtelier && (
            <li className="min-w-0">
              <span className={`${itemClassName} flex-col gap-0.5 text-(--shop-muted)`}>
                <span>Ateliê &amp; Consultoria</span>
                <span className="text-[10px]">Em breve</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

async function NavBarWithSession() {
  const user = await getCurrentUser();
  return <NavBarContent showAtelier={Boolean(user)} />;
}

export function NavBar() {
  return (
    <Suspense fallback={<NavBarContent />}>
      <NavBarWithSession />
    </Suspense>
  );
}
