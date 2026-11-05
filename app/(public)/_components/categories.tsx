import Link from "next/link";

const products = [
  { name: "Kits capilares", slug: "kits-capilares", illustration: "hair-kit" },
  { name: "Reconstrução", slug: "reconstrucao", illustration: "repair" },
  { name: "Shampoos", slug: "shampoos", illustration: "shampoo" },
  { name: "Shampoo e condicionador", slug: "shampoo-e-condicionador", illustration: "hair-duo" },
  { name: "Tops", slug: "tops", illustration: "top" },
  { name: "Leggings", slug: "leggings", illustration: "legging" },
  { name: "Kits de academia", slug: "kits-de-academia", illustration: "fitness" },
  { name: "Maiôs", slug: "maios", illustration: "swimsuit" },
  { name: "Biquínis", slug: "biquinis", illustration: "bikini" },
  { name: "Saídas de praia", slug: "saidas-de-praia", illustration: "coverup" },
  { name: "Material para tranças", slug: "material-para-trancas", illustration: "braids" },
  { name: "Maquiagens", slug: "maquiagens", illustration: "makeup" },
];

// Ilustrações provisórias com a mesma escala e paleta para toda a vitrine.
function ProductIllustration({ kind }: { kind: string }) {
  const top = <path d="M43 30h13l5 22h22l5-22h13l9 53c-24 10-52 10-76 0z" fill="#be6b87" stroke="#9c4e69" strokeWidth="2" />;
  const leggings = <path d="M51 29h43l5 29-6 75H75l-3-62-5 62H49l-4-75z" fill="#343039" stroke="#25222a" strokeWidth="2" />;
  return (
    <svg aria-hidden="true" viewBox="0 0 144 160" className="h-[82%] w-[82%] transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-110 group-focus-visible:-rotate-3 group-focus-visible:scale-110 motion-reduce:transform-none motion-reduce:transition-none" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="72" cy="142" rx="42" ry="5" fill="#d6c5cb" opacity=".5" />
      {kind === "hair-kit" && <><rect x="27" y="48" width="26" height="85" rx="5" fill="#be6b87" /><rect x="29" y="36" width="22" height="15" rx="3" fill="#343039" /><rect x="60" y="61" width="25" height="72" rx="5" fill="#d9ae98" /><rect x="62" y="49" width="21" height="15" rx="3" fill="#343039" /><rect x="92" y="93" width="27" height="40" rx="6" fill="#ca7b98" /><rect x="90" y="86" width="31" height="11" rx="3" fill="#343039" /><path d="M33 77h14m-14 7h14m19 5h13m-13 7h13m19 16h15" stroke="#faeee5" strokeWidth="3" /></>}
      {kind === "repair" && <><rect x="31" y="59" width="59" height="37" rx="9" fill="#d9ae98" /><rect x="28" y="52" width="65" height="13" rx="4" fill="#343039" /><rect x="55" y="102" width="59" height="33" rx="9" fill="#be6b87" /><rect x="52" y="95" width="65" height="13" rx="4" fill="#343039" /><path d="M45 77h30m-24 7h18m20 33H70m5 7h19" stroke="#faeee5" strokeWidth="3" /></>}
      {kind === "shampoo" && <><rect x="48" y="47" width="48" height="88" rx="10" fill="#be6b87" stroke="#9c4e69" strokeWidth="2" /><rect x="55" y="31" width="34" height="20" rx="4" fill="#343039" /><rect x="56" y="74" width="32" height="34" rx="3" fill="#faeee5" /><path d="M63 85h18m-18 8h18M61 121h22" stroke="#b5748c" strokeWidth="2" /></>}
      {kind === "hair-duo" && <><rect x="29" y="49" width="38" height="85" rx="9" fill="#be6b87" /><rect x="33" y="34" width="30" height="19" rx="4" fill="#343039" /><rect x="77" y="49" width="38" height="85" rx="9" fill="#d9ae98" /><rect x="81" y="34" width="30" height="19" rx="4" fill="#343039" /><rect x="36" y="77" width="24" height="30" rx="3" fill="#faeee5" /><rect x="84" y="77" width="24" height="30" rx="3" fill="#faeee5" /><path d="M41 88h14m34 0h14m-62 8h14m34 0h14" stroke="#b5748c" strokeWidth="2" /></>}
      {kind === "coverup" && <><path d="M55 28l17 9 17-9 27 30-17 15-7-10 11 69H41l11-69-7 10-17-15z" fill="#e6c5b7" stroke="#c3947e" strokeWidth="2" /><path d="M55 28l17 30 17-30M72 58v70M51 84h42M48 101h48" stroke="#faeee5" strokeWidth="3" /><path d="M45 132v7m9-7v7m9-7v7m9-7v7m9-7v7m9-7v7m9-7v7" stroke="#c3947e" strokeWidth="2" /></>}
      {kind === "braids" && <><rect x="41" y="23" width="62" height="19" rx="4" fill="#be6b87" /><path d="M52 42c-19 17 19 21 0 38s19 21 0 38m20-76c-19 17 19 21 0 38s19 21 0 38m20-76c-19 17 19 21 0 38s19 21 0 38" stroke="#55404a" strokeWidth="11" /><path d="M52 44c17 15-17 21 0 36s-17 21 0 36m20-72c17 15-17 21 0 36s-17 21 0 36m20-72c17 15-17 21 0 36s-17 21 0 36" stroke="#b88071" strokeWidth="3" /><path d="M47 119l-3 16m8-16v18m5-18 3 16m7-16-3 16m8-16v18m5-18 3 16m7-16-3 16m8-16v18m5-18 3 16" stroke="#55404a" strokeWidth="2" /></>}
      {kind === "top" && <g transform="translate(0 22)">{top}<path d="M39 77c21 7 45 7 66 0" stroke="#e4a6ba" strokeWidth="2" /></g>}
      {kind === "legging" && <>{leggings}<path d="M50 44h45M81 54l6 72" stroke="#68616f" strokeWidth="2" /></>}
      {kind === "fitness" && <><g transform="translate(-15 5) scale(.8)">{top}</g><g transform="translate(45 38) scale(.72)">{leggings}</g></>}
      {kind === "swimsuit" && <><path d="M48 24h13l2 29h18l2-29h13l5 46-13 21-8 39H64l-8-39-13-21z" fill="#b74368" stroke="#983354" strokeWidth="2" /><path d="M49 71c15 8 31 8 46 0M65 54l7 10 7-10" stroke="#edb1c5" strokeWidth="2" /></>}
      {kind === "bikini" && <><path d="M42 61l16-29 13 33c-14 10-29 7-29-4zm60 0L86 32 73 65c14 10 29 7 29-4zM42 98l30 11 30-11-24 32H66z" fill="#ca7b98" stroke="#a85273" strokeWidth="2" /><path d="M57 33l-5-14m35 14 5-14M35 95l7 3m60 0 7-3M71 65h3" stroke="#a85273" strokeWidth="3" /></>}
      {kind === "makeup" && <><rect x="32" y="81" width="24" height="53" rx="3" fill="#252229" /><path d="M36 81V56c0-12 16-22 16-9v34" fill="#b74368" /><path d="M32 103h24" stroke="#d6b274" strokeWidth="5" /><rect x="70" y="57" width="37" height="77" rx="6" fill="#d9ae98" stroke="#c3947e" strokeWidth="2" /><rect x="76" y="38" width="25" height="21" rx="3" fill="#252229" /><rect x="76" y="81" width="25" height="28" rx="2" fill="#faeee5" /></>}
    </svg>
  );
}

export function Categories() {
  return (
    <section aria-labelledby="product-discovery-title" className="bg-[#fffafb] text-[#211b1e]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-16">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <h2 id="product-discovery-title" className="text-xl font-semibold tracking-tight sm:text-2xl">Encontre seu próximo favorito</h2>
            <p className="mt-1 text-xs text-[#77636c] sm:text-sm">Para se cuidar, treinar e aproveitar o sol.</p>
          </div>

        </div>
        <ul id="product-discovery-track" aria-label="Produtos para explorar" className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pt-3 pb-5 [scrollbar-color:#d4a0b2_#f6e9ee] [scrollbar-width:thin] sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <li key={product.slug} className="w-[94px] shrink-0 snap-start sm:w-[120px] lg:w-[140px]">
              <Link href={`/?categoria=${product.slug}`} className="group flex flex-col items-center gap-3 rounded-lg text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368]">
                <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-[#f1e8ec] ring-1 ring-inset ring-[#eadde2] transition-[transform,box-shadow,background-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-[#f6e3eb] group-hover:shadow-[0_8px_18px_-8px_#b7436866] group-hover:ring-2 group-hover:ring-[#c77894] group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-[#c77894] motion-reduce:transform-none motion-reduce:transition-none">
                  <ProductIllustration kind={product.illustration} />
                </span>
                <span className="text-xs leading-snug font-medium transition-colors group-hover:text-[#9d3456] sm:text-sm">{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
