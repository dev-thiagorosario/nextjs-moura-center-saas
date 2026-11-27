"use client";

import { Check, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export function FavoriteButton({ name }: { name: string }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <button
      className="home-favorite"
      type="button"
      aria-label={`Favoritar ${name}`}
      aria-pressed={favorite}
      onClick={() => setFavorite((current) => !current)}
    >
      <Heart size={18} strokeWidth={1.5} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}

export function BagButton({ name }: { name: string }) {
  const [added, setAdded] = useState(false);
  const Icon = added ? Check : ShoppingBag;

  return (
    <>
      <button
        className="home-add"
        type="button"
        aria-pressed={added}
        aria-label={`Adicionar ${name} à sacola de demonstração`}
        onClick={() => setAdded((current) => !current)}
      >
        <Icon size={16} aria-hidden="true" />
        {added ? "Adicionado" : "Adicionar à sacola"}
      </button>
      <span role="status" className="sr-only">
        {added ? `${name} adicionado à sacola de demonstração.` : ""}
      </span>
    </>
  );
}
