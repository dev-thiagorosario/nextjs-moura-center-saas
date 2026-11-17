<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Estrutura do projeto

- Mantenha o código na raiz, em `app/`, `components/`, `lib/`, `hooks/` e `generated/`, conforme necessário. Não crie ou recrie a pasta `src/`.
- O alias `@/` aponta para a raiz. Use-o nos imports compartilhados, sem referências a `src/`.
- Configure geradores de código para escrever na raiz: shadcn usa os aliases de `components.json` e Prisma gera em `generated/prisma/`.
