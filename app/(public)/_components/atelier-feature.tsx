import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { services } from "../_data/services";

const galleryCopy = {
  atelie: {
    label: "Criação sob medida",
    description: "Da sua referência ao último ponto, uma peça exclusiva feita para você.",
    cta: "Explorar o Ateliê",
  },
  consultoria: {
    label: "Orientação de estilo",
    description: "Descubra combinações que traduzem sua personalidade e fazem sentido na sua rotina.",
    cta: "Conhecer a Consultoria",
  },
};

export function AtelierFeature() {
  return (
    <section id="servicos" className="home-services home-wrap" aria-labelledby="home-services-title">
      <h2 id="home-services-title" className="home-services-title" data-home-reveal>
        Moda <em>do seu jeito</em>
      </h2>
      <div className="home-services-gallery">
        {services.map((service) => (
          <article key={service.id} className={`home-service home-service--${service.id}`} data-home-reveal>
            <div className="home-photo home-service-photo">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes={service.id === "atelie"
                  ? "(max-width: 699px) 94vw, (min-width: 1600px) 826px, 52vw"
                  : "(max-width: 699px) 94vw, (min-width: 1600px) 608px, 39vw"}
              />
            </div>
            <div className="home-service-copy">
              <p className="home-service-label">{galleryCopy[service.id].label}</p>
              <h3>{service.name}</h3>
              <p className="home-service-description">{galleryCopy[service.id].description}</p>
              <Link className="home-service-link" href={service.href}>
                <span className="home-service-link-label">{galleryCopy[service.id].cta}</span>
                <span className="home-service-link-icon" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
