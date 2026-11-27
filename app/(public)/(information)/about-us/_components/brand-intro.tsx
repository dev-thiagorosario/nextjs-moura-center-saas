import { ArrowDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import atelier from "../_assets/atelier.webp";

export function BrandIntro() {
  return (
    <section className="about-wrap about-intro" aria-labelledby="about-title">
      <nav aria-label="Localização na loja">
        <ol className="about-breadcrumb">
          <li><Link href="/">Início</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Sobre nós</span></li>
        </ol>
      </nav>
      <div className="about-hero">
        <div className="about-hero-copy">
          <p className="about-label">Sobre nós</p>
          <h1 id="about-title">À vontade <em>para ser você.</em></h1>
          <p className="about-copy">
            A roupa que dá liberdade para se mover. O detalhe que muda como você se vê.
            Na Moura Center, moda e beleza começam pelo jeito como você quer se sentir.
          </p>
          <a className="about-link" href="#nossa-historia">
            Conheça nossa história <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="about-photo about-hero-photo">
          <Image
            src={atelier}
            alt="Tecido rosa sobre um manequim, entre moldes e uma arara de roupas."
            fill
            sizes="(min-width: 1440px) 755px, (min-width: 720px) 50vw, 94vw"
            fetchPriority="high"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
