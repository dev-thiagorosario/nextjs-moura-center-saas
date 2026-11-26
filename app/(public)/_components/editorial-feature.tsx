import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EditorialFeature() {
  return (
    <section className="home-feature home-wrap" aria-labelledby="feature-title">
      <div className="home-photo home-feature-photo" data-home-reveal>
        <Image
          src="/images/products/serum.jpg"
          alt="Embalagem de loção corporal sobre tecido claro"
          fill
          sizes="(max-width: 699px) 94vw, (min-width: 1600px) 725px, 50vw"
        />
      </div>
      <div className="home-feature-copy">
        <div data-home-reveal>
          <p className="home-label">Beleza &amp; autocuidado</p>
          <h2 id="feature-title">Beleza <em>em detalhe.</em></h2>
          <p className="home-lead">Do cuidado facial à maquiagem, encontre os essenciais da sua rotina.</p>
          <Link className="home-button" href="/?categoria=cosmeticos">
            Ver cosméticos <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
