import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { services } from "@/app/(public)/_data/services";

export function AtelierServices() {
  return (
    <section className="about-wrap about-services" aria-labelledby="about-atelier">
      <h2 id="about-atelier">A moda na <em>prática.</em></h2>
      <ul>
        {services.map(({ id, name, description, href, cta }) => (
          <li key={id}>
            <h3>{name}</h3>
            <p className="about-copy">{description}</p>
            <Link className="about-link" href={href}>
              {cta} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
