import { ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";

const suggestions = ["Pix", "Rastreio", "Tamanho", "Troca"];

type FaqSearchProps = {
  query: string;
  resultCount: number | null;
  onQueryChange: (value: string) => void;
  onSuggestion: (value: string) => void;
};

export function FaqSearch({ query, resultCount, onQueryChange, onSuggestion }: FaqSearchProps) {
  return (
    <section className="faq-wrap" aria-labelledby="faq-title">
      <nav aria-label="Localização na loja">
        <ol className="faq-breadcrumb">
          <li><Link href="/">Início</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><Link href="/customer-service">Atendimento</Link></li>
          <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Perguntas Frequentes</span></li>
        </ol>
      </nav>
      <div className="faq-hero">
        <div>
          <p className="faq-kicker">Perguntas Frequentes</p>
          <h1 id="faq-title">Qual é a <em>sua dúvida?</em></h1>
          <p className="faq-intro">Encontre respostas sobre sua compra, da escolha da peça à entrega.</p>
        </div>
        <div className="faq-search-content">
          <div role="search" aria-label="Perguntas frequentes">
            <label htmlFor="faq-query">Buscar nas perguntas e respostas</label>
            <div className="faq-search-field">
              <Search size={22} strokeWidth={1.5} aria-hidden="true" />
              <input
                id="faq-query"
                type="search"
                value={query}
                autoComplete="off"
                placeholder="Ex.: prazo de entrega"
                aria-controls="faq-results"
                onChange={(event) => onQueryChange(event.currentTarget.value)}
              />
              {query && (
                <button
                  type="button"
                  aria-label="Limpar busca"
                  onClick={() => {
                    onQueryChange("");
                    document.getElementById("faq-query")?.focus();
                  }}
                >
                  <X size={19} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          {resultCount !== null && (
            <a className="faq-link faq-result-jump" href="#faq-results-title">
              {resultCount === 1 ? "Ver 1 resultado" : resultCount > 1 ? `Ver ${resultCount} resultados` : "Ver opções de busca"}
            </a>
          )}
          <div className="faq-suggestions" aria-label="Sugestões de pesquisa" role="group">
            {suggestions.map((term) => (
              <button type="button" key={term} onClick={() => onSuggestion(term)}>{term}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
