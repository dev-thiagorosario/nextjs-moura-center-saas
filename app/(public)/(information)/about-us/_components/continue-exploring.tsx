import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContinueExploring() {
  return (
    <section className="about-wrap about-section about-outro" aria-labelledby="about-explore">
      <h2 id="about-explore">O que combina <em>com você hoje?</em></h2>
      <p className="about-copy">Descubra o que acabou de chegar ou explore os mais vendidos da nossa vitrine.</p>
      <div className="about-actions">
        <Link className="about-link about-primary" href="/#novidades">
          Ver novidades <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link className="about-link" href="/#mais-vendidos">
          Ver mais vendidos <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
