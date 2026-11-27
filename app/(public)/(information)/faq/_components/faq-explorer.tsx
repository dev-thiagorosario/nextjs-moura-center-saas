"use client";

import { CreditCard, Grid2X2, MessageCircle, RefreshCcw, Shirt, Truck } from "lucide-react";
import { useState } from "react";

import { faqCategories, type FaqCategoryId } from "../faq-data";
import { FaqAnswer, FaqEmpty } from "./faq-results";
import { FaqSearch } from "./faq-search";

const categoryIcons = {
  pedidos: CreditCard,
  entregas: Truck,
  produtos: Shirt,
  trocas: RefreshCcw,
  atendimento: MessageCircle,
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

const searchableCategories = faqCategories.map((category) => ({
  ...category,
  entries: category.entries.map((entry) => ({
    ...entry,
    searchText: normalize([entry.question, entry.answer, entry.keywords].join(" ")),
  })),
}));

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryId | null>(null);
  const normalizedQuery = normalize(query);
  const words = normalizedQuery.split(/\s+/).filter(Boolean);
  const isSearching = words.length > 0;
  const activeCategory = selectedCategory ?? (isSearching ? null : faqCategories[0].id);
  const currentCategory = faqCategories.find(({ id }) => id === activeCategory);
  const results = searchableCategories
    .filter(({ id }) => activeCategory === null || id === activeCategory)
    .map((category) => ({
      ...category,
      entries: category.entries.filter(({ searchText }) => words.every((word) => searchText.includes(word))),
    }))
    .filter(({ entries }) => entries.length > 0);
  const count = results.reduce((total, category) => total + category.entries.length, 0);

  function reset() {
    setQuery("");
    setSelectedCategory(null);
    document.getElementById("faq-query")?.focus();
  }

  return (
    <>
      <FaqSearch
        query={query}
        resultCount={isSearching ? count : null}
        onQueryChange={setQuery}
        onSuggestion={(term) => {
          setSelectedCategory(null);
          setQuery(term);
        }}
      />
      <section className="faq-wrap faq-directory" aria-labelledby="faq-results-title">
        <div className="faq-directory-grid">
          <div className="faq-filters" role="group" aria-labelledby="faq-filter-title">
            <p id="faq-filter-title" className="faq-kicker">Assuntos</p>
            {isSearching && (
              <button type="button" aria-pressed={activeCategory === null} aria-controls="faq-results" onClick={() => setSelectedCategory(null)}>
                <Grid2X2 size={19} strokeWidth={1.5} aria-hidden="true" /> Todas as categorias
              </button>
            )}
            {faqCategories.map(({ id, label }) => {
              const Icon = categoryIcons[id];
              return (
                <button type="button" key={id} aria-pressed={id === activeCategory} aria-controls="faq-results" onClick={() => setSelectedCategory(id)}>
                  <Icon size={19} strokeWidth={1.5} aria-hidden="true" /> {label}
                </button>
              );
            })}
          </div>
          <div id="faq-results" className="faq-results">
            <h2 id="faq-results-title" tabIndex={-1}>{currentCategory?.label ?? "Resultados da busca"}</h2>
            <p className="faq-count" role="status" aria-atomic="true">
              {count === 1 ? "1 pergunta" : `${count} perguntas`}{isSearching ? " na busca" : ""}
            </p>
            {count === 0 ? <FaqEmpty onReset={reset} /> : results.map(({ id, label, entries }) => (
              <div className="faq-result-group" key={id}>
                {activeCategory === null && <h3>{label}</h3>}
                <div className="faq-accordions">
                  {entries.map((entry) => <FaqAnswer key={entry.question} entry={entry} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
