import { ChevronDown, CircleHelp } from "lucide-react";
import Link from "next/link";

import type { FaqEntry } from "../faq-data";

export function FaqAnswer({ entry }: { entry: FaqEntry }) {
  return (
    <details name="faq-answers">
      <summary>{entry.question}<ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" /></summary>
      <div className="faq-answer">
        <p>{entry.answer}</p>
        {entry.links && (
          <ul>
            {entry.links.map(({ label, href }) => (
              <li key={href}>
                {href.startsWith("/") ? <Link href={href}>{label}</Link> : <a href={href}>{label}</a>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}

export function FaqEmpty({ onReset }: { onReset: () => void }) {
  return (
    <div className="faq-empty">
      <CircleHelp size={28} strokeWidth={1.5} aria-hidden="true" />
      <h3>Nenhuma pergunta encontrada</h3>
      <p>Tente um termo mais curto ou limpe a busca e o filtro de assunto.</p>
      <button className="faq-button" type="button" onClick={onReset}>Limpar busca e filtros</button>
    </div>
  );
}
