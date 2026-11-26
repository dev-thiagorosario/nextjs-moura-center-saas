import { productCategories } from "../_data/categories";
import { CategoryCard } from "./category-card";
import { CategoryRail } from "./category-rail";

export function Categories() {
  return (
    <section className="home-categories" id="colecoes" aria-labelledby="collections-title">
      <div className="home-wrap home-section">
        <div className="home-section-heading" data-home-reveal>
          <h2 id="collections-title">Encontre seu próximo <em>favorito.</em></h2>
          <p>Para cuidar de si, vestir para o treino e aproveitar o sol.</p>
        </div>
        <CategoryRail>
          {productCategories.map((category) => (
            <li key={category.slug}><CategoryCard category={category} /></li>
          ))}
        </CategoryRail>
      </div>
    </section>
  );
}
