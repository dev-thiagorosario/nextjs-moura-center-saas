# Moura Center

Next.js com Prisma ORM 7 e PostgreSQL local via Docker Compose.
Next.js e Prisma executam na máquina; PostgreSQL executa no container.

## Desenvolvimento local

Pré-requisitos: Node.js compatível com o projeto, npm, Docker Engine em execução
 e Docker Compose v2 com suporte a `--wait`.

```bash
npm ci
cp .env.example .env
npm run db:up
npm run db:generate
npm run dev
```

Se `.env` já existir, adicione as variáveis do exemplo sem sobrescrever outras
configurações. Abra http://localhost:3000.

O comando `db:up` aguarda o healthcheck. O banco fica acessível apenas localmente,
em `localhost:5432`. Os dados persistem no volume `postgres_data`, inclusive após
`npm run db:down`.

As credenciais do exemplo são exclusivas para desenvolvimento local. Mantenha
`DATABASE_URL` consistente com `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
e `POSTGRES_PORT`. Se a porta 5432 estiver ocupada, altere a porta nas duas
configurações. Codifique caracteres especiais da senha na URL.
As variáveis `POSTGRES_*` inicializam credenciais apenas quando o volume está
vazio; alterá-las não modifica um banco existente.

Use `.env` na raiz como configuração comum ao Compose, Prisma e Next.js. Evite
redefinir `DATABASE_URL` em `.env.local`, pois o CLI Prisma carrega `.env`.
Não versione `.env`.

## Prisma

Os scripts selecionam explicitamente `prisma7.config.ts`. Importe o cliente
compartilhado apenas em código de servidor:

```ts
import { prisma } from "@/lib/prisma";

const result = await prisma.$queryRaw`SELECT 1 AS connected`;
```

O schema inicial ainda não contém modelos. Após adicionar modelos em
`prisma/schema.prisma`, crie a primeira migração e gere novamente o cliente:

```bash
npm run db:migrate -- --name init
npm run db:generate
```

## Comandos úteis

| Comando | Ação |
| --- | --- |
| `npm run db:up` | Inicia o banco e aguarda ficar pronto |
| `npm run db:down` | Remove containers mantendo os dados |
| `npm run db:logs` | Acompanha os logs |
| `npm run db:validate` | Valida o schema |
| `npm run db:generate` | Gera o Prisma Client |
| `npm run db:migrate` | Cria e aplica migrações de desenvolvimento |
| `npm run db:studio` | Abre o Prisma Studio |

Terminal SQL:

```bash
docker compose exec postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Para apagar **todos os dados locais** e reinicializar no próximo `db:up`:

```bash
docker compose down --volumes
```

Referências: [Prisma com Docker](https://www.prisma.io/docs/guides/deployment/docker)
e [imagem PostgreSQL](https://hub.docker.com/_/postgres).
