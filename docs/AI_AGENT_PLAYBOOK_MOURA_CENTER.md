# Frontend AI Skills — Contexto, Funcionalidades e Roteamento

Este documento define o contexto operacional das **5 skills exclusivas de Frontend** instaladas no projeto. Nenhuma delas deve ser acionada para tarefas de backend, banco de dados, infraestrutura ou regras de negócio puras.

> **Nota de migração:** A skill `open-design` foi descontinuada do projeto e substituída por `google-design`. Nunca referencie, busque ou tente acionar `open-design`.

Antes de iniciar qualquer tarefa de interface, identifique a atividade e acione **apenas** a skill correspondente conforme as regras abaixo.

---

## 1. Inventário de Skills e Funcionalidades

### 1.1 `taste-skill` — Direção de Arte e Anti-"Cara de IA"
* **Propósito:** Eliminar o aspecto genérico de interfaces criadas por IA, garantindo personalidade visual, coerência entre páginas, hierarquia clara, respiro adequado e acabamento profissional.
* **Funcionalidades principais:**
  * Definir composição de páginas, ritmo visual e proporção entre seções.
  * Evitar clichês visuais de IA (gradientes genéricos, excesso de cards repetitivos, textos prolixos, enfeites sem função).
  * Garantir unidade estética entre todas as telas do projeto.
* **Quando usar:**
  * Ao criar novas páginas, landing pages ou reestruturar layouts inteiros.
  * Ao revisar páginas prontas que pareçam genéricas, desequilibradas ou visualmente desconexas.

### 1.2 `ui-ux-pro-max` — Layouts, Tipografia, Cores e Padrões de UI/UX
* **Propósito:** Fornecer base técnica estruturada para decisões de interface, usabilidade e acessibilidade.
* **Funcionalidades principais:**
  * Definição de sistemas de cores, contraste e hierarquia semântica.
  * Escolha de combinações e escalas tipográficas.
  * Estruturação de grids, layouts responsivos, componentes de formulário, tabelas, gráficos e estados de UI (`loading`, `empty`, `error`, `hover`, `focus`).
  * Prevenção de antipadrões de usabilidade e acessibilidade.
* **Quando usar:**
  * Ao definir ou ajustar paleta de cores, fontes, tamanhos de texto, espaçamentos e grids.
  * Ao construir componentes funcionais, fluxos de navegação, formulários e visualizações de dados.
  * Ao corrigir problemas de contraste, legibilidade, foco de teclado ou experiência do usuário.

### 1.3 `google-design` — Acesso ao Navegador e Inspeção Visual em Tempo Real
* **Propósito:** Permitir que a IA acesse o navegador para visualizar o projeto em execução, verificar o resultado real renderizado e validar fidelidade visual sem depender apenas de leitura de código.
* **Funcionalidades principais:**
  * Abrir e navegar pelas rotas do projeto diretamente no navegador.
  * Inspecionar o layout renderizado em tempo real (alinhamentos, quebras visuais, overflow, sobreposições e comportamento responsivo em desktop, tablet e mobile).
  * Validar estados interativos reais (modais, menus, formulários, feedbacks visuais e transições) diretamente na tela.
  * Comparar o que está renderizado no navegador com os critérios definidos pelas demais skills antes de considerar uma tarefa concluída.
* **Quando usar:**
  * Sempre após criar ou alterar telas, componentes ou estilos, para confirmar visualmente como o projeto está ficando.
  * Ao diagnosticar bugs visuais, desalinhamentos, quebras de responsividade ou diferenças entre o código esperado e o que aparece na tela.
  * Antes de entregar qualquer ajuste relevante de frontend (etapa de verificação visual).

### 1.4 `design-motion-principles` — Animações, Transições e Curvas de Easing
* **Propósito:** Projetar e auditar movimento funcional com física natural, micro-interações contidas e acessibilidade.
* **Funcionalidades principais:**
  * **Modo Create:** Implementar transições de entrada/saída, modais, drawers, toasts, accordions, hovers e curvas de easing (`cubic-bezier`, duração e ritmo adequados).
  * **Modo Audit:** Revisar animações existentes para eliminar excessos (clichês como `ease` padrão, `scale(0)`, animações lentas ou distrativas) e garantir respeito a `prefers-reduced-motion`.
* **Quando usar:**
  * Sempre que adicionar, ajustar ou refatorar qualquer animação, transição de estado, micro-interação ou curva de aceleração.

### 1.5 `awesome-claude-design` — Catálogo de Design Systems (USO RESTRITO)
* **Propósito:** Repositório de Design Systems completos e prontos para implementação estrutural.
* **Regra estrita de uso:** **BLOQUEADA POR PADRÃO.**
  * **Não** acionar automaticamente em tarefas rotineiras.
  * Utilizar **somente** quando o usuário solicitar explicitamente a consulta, adoção ou implementação de um Design System desta skill no momento apropriado do projeto.

---

## 2. Matriz de Direcionamento (Atividade → Skill)

| Atividade de Frontend | Skill Principal | Skill de Apoio | Regra / Restrição |
| :--- | :--- | :--- | :--- |
| **Criar nova página ou composição visual** | `taste-skill` | `ui-ux-pro-max` | Manter identidade coerente e fugir de templates genéricos de IA. |
| **Definir paleta de cores, tipografia e grids** | `ui-ux-pro-max` | `taste-skill` | Garantir contraste, legibilidade e escala consistente. |
| **Construir componentes, formulários e fluxos UX** | `ui-ux-pro-max` | `google-design` | Cobrir estados (`loading`, `error`, `empty`, `focus`) e validar no navegador. |
| **Criar animações, transições e curvas de easing** | `design-motion-principles` | `google-design` | Aplicar curvas adequadas, `prefers-reduced-motion` e verificar fluidez no navegador. |
| **Auditar e corrigir animações existentes** | `design-motion-principles` | `google-design` | Remover animações artificiais e validar o comportamento real em tela. |
| **Visualizar o projeto no navegador e auditar telas** | `google-design` | `taste-skill` | Inspecionar desktop/mobile, alinhamento, overflow e coerência visual real. |
| **Corrigir bugs visuais ou quebras de layout** | `google-design` | `ui-ux-pro-max` | Primeiro ver o problema no navegador, depois corrigir e revalidar. |
| **Implementar Design System pronto do catálogo** | `awesome-claude-design` | `google-design` | **Somente mediante comando explícito do usuário.** |

---

## 3. Fluxo Padrão de Execução no Frontend

Sempre que desenvolver ou alterar uma interface, siga este ciclo:

1. **Estruturar e estilizar:** Acione `taste-skill` (direção e coerência) e/ou `ui-ux-pro-max` (layout, cores, tipografia e UX) conforme a natureza da tarefa.
2. **Aplicar movimento (se houver interação/transição):** Acione `design-motion-principles` para definir curvas de easing, tempos e acessibilidade.
3. **Ver no navegador:** Acione `google-design` para abrir o projeto, inspecionar a tela renderizada e checar responsividade e estados visuais.
4. **Refinar com base na tela real:** Se a inspeção no navegador revelar desalinhamento, aspecto genérico ou falha de contraste/transição, corrija com a skill responsável e valide novamente via `google-design`.

---

## 4. Ordem de Precedência e Resolução de Conflitos

Caso duas ou mais skills façam recomendações concorrentes para o mesmo elemento, siga rigorosamente esta hierarquia:

1. **Evidência Visual Real (`google-design`):** O que está efetivamente renderizado no navegador prevalece sobre suposições baseadas apenas na leitura do código.
2. **Direção de Arte e Coerência (`taste-skill`):** Prevalece sobre composição geral, respiro, hierarquia visual e eliminação de aparência genérica de IA.
3. **Regras Técnicas de Interface (`ui-ux-pro-max`):** Prevalece sobre tipografia, cores, acessibilidade, padrões de UX e estados de componentes.
4. **Movimento (`design-motion-principles`):** Autoridade exclusiva sobre qualquer animação, transição, micro-interação ou curva de easing.
5. **Catálogo de Design Systems (`awesome-claude-design`):** Inativa por padrão; só entra na hierarquia quando ativada explicitamente pelo usuário.

---

## 5. Protocolo Obrigatório para a IA

* **Declaração inicial:** Antes de codificar uma tarefa de frontend, informe em 1 linha qual(is) skill(s) serão utilizadas e o motivo.
* **Proibição de mistura aleatória:** Não combine direções visuais conflitantes na mesma página.
* **Validação visual real:** Não declare um ajuste visual complexo como concluído sem inspecionar o resultado no navegador com `google-design` quando o servidor local estiver acessível.
* **Trava de Design System:** Nunca importe ou aplique padrões do `awesome-claude-design` por conta própria; aguarde comando direto.