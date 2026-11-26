import { ArrowUpRight } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { HeroCarousel } from "./hero-carousel";

const campaigns = [
  {
    id: "fitness", label: "Coleção fitness", title: "Vista o", emphasis: "seu ritmo.",
    description: "Tops, leggings e conjuntos para os seus dias em movimento.",
    action: "Ver coleção fitness", category: "moda-fitness",
    image: "/images/hero/campanha-moura.webp", width: 1536, height: 1024,
    mobile: "/images/hero/campanha-moura-mobile.webp",
    alt: "Modelo com conjunto esportivo vinho em uma construção à beira-mar",
  },
  {
    id: "praia", label: "Coleção praia", title: "Dias de", emphasis: "sol e mar.",
    description: "Biquínis, maiôs e saídas para acompanhar seus dias ao sol.",
    action: "Ver coleção praia", category: "moda-praia",
    image: "/images/products/beach.jpg", width: 700, height: 1247,
    alt: "Modelo de biquíni estampado à beira-mar",
  },
  {
    id: "beleza", label: "Beleza", title: "Seu tempo", emphasis: "de cuidar.",
    description: "Maquiagens e cuidados capilares para os seus rituais do dia a dia.",
    action: "Explorar beleza", category: "cosmeticos",
    image: "/images/products/makeup.jpg", width: 700, height: 700,
    alt: "Pincéis, batons e maquiagem em tons rosados",
  },
];

export function Hero() {
  return (
    <HeroCarousel campaigns={campaigns.map(({ id, label }) => ({ id, label }))}>
      {campaigns.map((campaign, index) => {
        const { props } = getImageProps({
          src: campaign.image,
          width: campaign.width,
          height: campaign.height,
          alt: campaign.alt,
          sizes: index === 0 ? "100vw" : "(max-width: 699px) 100vw, 70vw",
          loading: index === 0 ? "eager" : "lazy",
          fetchPriority: index === 0 ? "high" : undefined,
        });
        const mobile = campaign.mobile && getImageProps({
          src: campaign.mobile, width: 790, height: 1024, alt: campaign.alt, sizes: "100vw",
        }).props;
        const Title = index === 0 ? "h1" : "h2";

        return (
          <div key={campaign.id} className="home-hero-scene" data-campaign={campaign.id}>
            <picture className="home-hero-photo">
              {mobile && <source media="(max-width: 699px)" srcSet={mobile.srcSet} sizes={mobile.sizes} width={790} height={1024} />}
              {/* Next.js generates responsive sources for the art-directed picture. */}
              <img {...props} alt={campaign.alt} />
            </picture>
            <div className="home-wrap home-hero-inner">
              <div className="home-hero-copy" data-enter>
                <p className="home-label">{campaign.label}</p>
                <Title>{campaign.title} <em>{campaign.emphasis}</em></Title>
                <p className="home-lead">{campaign.description}</p>
                <Link className="home-button" href={`/?categoria=${campaign.category}#vitrine`}>
                  {campaign.action} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </HeroCarousel>
  );
}
