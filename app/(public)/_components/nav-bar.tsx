import Link from "next/link";

const categories = [
  { label: "Moda Fitness", slug: "moda-fitness" },
  { label: "Moda Praia", slug: "moda-praia" },
  { label: "Cosméticos", slug: "cosmeticos" },
  { label: "Acessórios", slug: "acessorios" },
];

export function NavBar() {
  return (
    <nav
      aria-label="Categorias de produtos"
      className="border-b border-[#b96a83]/30 bg-linear-to-b from-[#f5c5d1] to-[#eaa1b6] text-[#100d0f]"
    >
      <div className="mx-auto w-full max-w-[1440px] sm:px-6 lg:px-10 xl:px-16">
        <ul className="grid grid-cols-4">
          {categories.map(({ label, slug }) => (
            <li
              key={slug}
              className="relative min-w-0 after:absolute after:top-1/2 after:right-0 after:h-4 after:w-px after:-translate-y-1/2 after:bg-[#875563]/50 last:after:hidden"
            >
              <Link
                href={`/?categoria=${slug}`}
                className="flex h-full min-h-11 items-center justify-center px-1 py-2 text-center text-[10px] leading-snug font-medium uppercase transition-colors hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#70364b] min-[360px]:text-[11px] sm:px-3 sm:text-xs sm:tracking-wide lg:min-h-12 lg:px-6 lg:text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
