import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductCategory } from "../_data/categories";

const rose = "#9c4b62";
const dark = "#492d38";
const clay = "#bd795e";
const light = "#f3d6b8";

function Bottle({ color = rose }: { color?: string }) {
  return <>
    <path fill={dark} d="M-8-4h16v9H-8z" />
    <rect x="-11" y="4" width="22" height="37" rx="5" fill={color} />
    <rect x="-7" y="15" width="14" height="15" rx="1" fill={light} />
    <path d="M-4 20h8m-8 4h5" stroke={color} />
  </>;
}

function Jar({ color = rose }: { color?: string }) {
  return <>
    <path fill={color} d="M-16 2h32l-2 12q-1 3-5 3H-9q-4 0-5-3z" />
    <rect x="-17" y="-3" width="34" height="6" rx="2" fill={dark} />
    <path d="M-8 8H8m-5 4h-9" stroke={light} />
  </>;
}

function Top() {
  return <>
    <path fill={rose} d="m-16 0 7-1 3 10H6L9-1l7 1 4 25q-20 8-40 0z" />
    <path fill="none" stroke={light} d="M-17 22q17 7 34 0" />
  </>;
}

function Leggings() {
  return <>
    <path fill={dark} d="M-13 0h26l3 12-4 43H3L0 25l-3 30h-9l-4-43z" />
    <path fill="none" stroke="#9a6a77" d="M-14 9h28M-8 11l-1 39m17-39 1 39" />
  </>;
}

const illustrations: Record<ProductCategory["slug"], ReactNode> = {
  "kits-capilares": <>
    <g transform="translate(35 28)"><Bottle /></g>
    <g transform="translate(54 37) scale(.83)"><Bottle color={clay} /></g>
    <g transform="translate(70 59) scale(.68)"><Jar /></g>
  </>,
  reconstrucao: <>
    <g transform="translate(44 36)"><Jar color={clay} /></g>
    <g transform="translate(57 54)"><Jar /></g>
  </>,
  shampoos: <g transform="translate(50 26) scale(1.06)"><Bottle /></g>,
  "shampoo-e-condicionador": <>
    <g transform="translate(37 29)"><Bottle /></g>
    <g transform="translate(63 29)"><Bottle color={clay} /></g>
  </>,
  "material-para-trancas": <>
    <path fill={dark} d="M39 22q12 6 21 0l-1 11-5 30 3 9-8 4-6-6 3-8-6-29z" />
    <path fill="none" stroke="#c38883" strokeWidth="1.5" d="m40 31 18 10m-17-2 15 11m-13-2 12 11m-10-2 9 9m6-34L42 44m16-3L44 53m12-3L46 62m9-4-9 9" />
    <path fill={clay} d="m62 58 8-31 3 1-4 19 8 2-3 10z" />
    <path stroke={light} d="m67 50 8 2m-9 1 8 2m-9 1 8 2" />
  </>,
  maquiagens: <>
    <circle cx="40" cy="57" r="14" fill={dark} />
    <circle cx="40" cy="57" r="11" fill={clay} />
    <path fill="none" stroke={light} d="M33 57a7 7 0 0 1 7-7m0 14a7 7 0 0 0 7-7" />
    <path fill={rose} d="M58 44V33l10-7v18z" />
    <path fill={light} d="M56 42h14v10H56z" />
    <rect x="55" y="49" width="16" height="22" rx="2" fill={dark} />
  </>,
  tops: <g transform="translate(50 36) scale(1.14)"><Top /></g>,
  leggings: <g transform="translate(50 23) scale(.9)"><Leggings /></g>,
  "kits-de-academia": <>
    <g transform="translate(37 30) scale(.79)"><Top /></g>
    <g transform="translate(64 41) scale(.59)"><Leggings /></g>
  </>,
  maios: <>
    <path fill={rose} d="M36 24h8v13q6 10 12 0V24h8l4 25q-10 9-12 23H44q-2-14-12-23z" />
    <path fill="none" stroke={light} d="M35 48q15 9 30 0M44 37q6 3 12 0" />
  </>,
  biquinis: <>
    <path fill="none" stroke={dark} d="m31 41 9-17 10 16 10-16 9 17M30 60l-5-5m45 5 5-5" />
    <path fill={rose} d="m30 41 10-12 10 14 10-14 10 12q-12 9-20 2-8 7-20-2z" />
    <path fill={clay} d="M29 58q21 7 42 0L55 73H45z" />
  </>,
  "saidas-de-praia": <>
    <path fill={clay} d="m40 24 10 15 10-15 10 6 7 16-10 5-5-8-3 11 9 19q-18 6-36 0l9-19-3-11-5 8-10-5 7-16z" />
    <path fill="none" stroke={light} d="m40 25 10 14 10-14M41 54l18-5m-11 4-5 16m10-17 5 15" />
  </>,
};

export function CategoryCard({ category }: { category: ProductCategory }) {
  return (
    <Link className="home-category-link" href={`/?categoria=${category.slug}#vitrine`} prefetch={false}>
      <span className="home-category-medallion" data-group={category.group} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="78" rx="22" ry="3" fill={dark} opacity=".1" />
          <g className="home-category-art">{illustrations[category.slug]}</g>
        </svg>
      </span>
      <span className="home-category-label">{category.label}</span>
    </Link>
  );
}
