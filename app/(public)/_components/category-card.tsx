import { ArrowRight } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type CategoryCardProps = {
  cardTitle: string;
  cardDescription: string;
  cardLink: LinkProps["href"];
  cardImage: ImageProps["src"];
  cardIcon: ReactNode;
  imageAlt: string;
};

export function CategoryCard({
  cardTitle,
  cardDescription,
  cardLink,
  cardImage,
  cardIcon,
  imageAlt,
}: CategoryCardProps) {
  return (
    <Link
      href={cardLink}
      className="group relative flex min-h-[84px] min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-linear-to-br from-[#fae9ed] to-[#f2dce1] px-2 py-3 text-[#171315] transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b74368] md:min-h-[170px] md:items-start md:justify-start md:rounded-xl md:p-5 lg:min-h-[200px] lg:p-6"
    >
      <div className="absolute inset-0 hidden md:block">
        <Image src={cardImage} alt={imageAlt} fill sizes="(min-width: 1440px) 420px, (min-width: 768px) 33vw, 1px" className="object-cover object-right transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#fae9ed] via-[#fae9ed]/90 to-transparent" />
      </div>
      <span aria-hidden="true" className="text-[#bd6681] md:hidden [&_svg]:h-7 [&_svg]:w-8 [&_svg]:stroke-[1.5]">
        {cardIcon}
      </span>
      <div className="relative md:max-w-[58%]">
        <h2 className="max-w-[74px] text-center text-xs leading-tight font-medium md:max-w-none md:text-left md:text-xl md:font-semibold lg:text-2xl">{cardTitle}</h2>
        <p className="mt-1.5 hidden text-sm leading-tight md:block">{cardDescription}</p>
        <span aria-hidden="true" className="mt-4 hidden size-7 items-center justify-center rounded-full bg-[#b74368] text-white transition-colors group-hover:bg-[#9d3456] md:flex lg:mt-5">
          <ArrowRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
