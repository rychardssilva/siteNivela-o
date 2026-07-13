# Relatório de atualizações — Nivela

**Comparação realizada em:** 13/07/2026  
**Referência anterior:** `versão-antiga/siteNivela/site-nivela`  
**Referência atual:** `siteNivela/site-nivela`

## Resumo executivo

A versão atual recebeu melhorias focadas em três frentes: SEO técnico, experiência responsiva e funcionamento/acessibilidade do contato. A estrutura e o visual principal do site foram preservados.

O domínio configurado e os metadados Twitter **não foram alterados** nesta etapa.

## Atualizações de SEO

- Foram criados metadados específicos para Home, Sobre, Serviços, Avaliação Técnica, Blog e Contato: título, descrição, URL canônica e Open Graph.
- O layout global passou a concentrar metadados institucionais, regras de indexação e configuração de compartilhamento Open Graph.
- Foram adicionados `robots.txt` e `sitemap.xml` gerados pelo Next.js.
  - O sitemap inclui as páginas institucionais e os artigos publicados.
  - O robots bloqueia áreas administrativas, APIs e páginas internas.
- As páginas internas `/diagnostico` e `/teste_auth` receberam `noindex, nofollow`, evitando indexação acidental.
- Foi incluído dado estruturado Schema.org do tipo `ProfessionalService`, com nome da empresa, telefone, área atendida e especialidades técnicas. Isso facilita a interpretação do negócio por mecanismos de busca.
- As páginas Sobre e Serviços passaram a gerar metadados a partir do conteúdo cadastrado no CMS, com textos de reserva quando o conteúdo não existir.

## Responsividade e acessibilidade

- O cabeçalho agora se reorganiza em telas intermediárias e pequenas.
- Em celular, a navegação principal mudou de uma faixa horizontal com rolagem para um menu expansível, com estado acessível (`aria-expanded`) e fechamento após a escolha de um link.
- Rodapé passou a reorganizar as colunas em tablet e celular.
- Blog recebeu tratamento para categorias, capas e textos longos em telas pequenas, reduzindo risco de quebra horizontal.
- Foram adicionadas proteções globais contra estouro horizontal de mídia e conteúdo.
- Botões e campos de formulário passaram a respeitar altura mínima de toque de 44 px; o foco por teclado ficou visível.

## Página de contato e envio de e-mail

- A página foi organizada em componente de servidor e componente cliente, permitindo metadados de SEO sem perder a interação do formulário.
- Links para `/contato?assunto=avaliacao-tecnica` agora deixam o assunto inicial como **Dúvida técnica**.
- Foram incluídos atributos de preenchimento automático e anúncio acessível de mensagens de sucesso/erro.
- A rota de envio agora reconhece `EMAIL_DESTINATION`, que é a variável documentada no `.env.example`, preservando compatibilidade com `EMAIL_RECEIVER`.
- O HTML do e-mail passou a escapar os dados enviados pelo visitante, reduzindo risco de injeção de marcação na mensagem recebida.
- A versão em texto do e-mail deixou de usar tags HTML.

## Arquivos funcionais alterados

| Área | Arquivos | Resultado |
| --- | --- | --- |
| SEO global | `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `components/StructuredData.tsx` | Metadados, páginas canônicas, rastreamento e dados estruturados. |
| SEO por página | `app/sobre/page.tsx`, `app/servicos/page.tsx`, `app/avaliacao-tecnica/page.tsx`, `app/blog/page.tsx`, `app/contato/page.tsx` | Descrições e Open Graph específicos. |
| Páginas internas | `app/diagnostico/page.tsx`, `app/teste_auth/page.tsx` | Exclusão de buscadores. |
| Contato | `app/contato/ContatoClient.tsx`, `app/api/contato/route.ts`, `styles/contact.css` | Formulário, acessibilidade e entrega de e-mail. |
| Navegação | `components/Navbar.tsx`, `styles/header.css` | Menu expansível no celular e adaptação para tablet. |
| Estilos gerais | `app/globals.css`, `styles/footer.css`, `styles/blog.css` | Melhorias de toque, foco, mídia e layout responsivo. |

## Arquivos adicionados sem impacto direto no site

- `next-env.d.ts`: arquivo de tipos gerado pelo Next.js.
- `dev-server.out.log` e `dev-server.err.log`: registros locais do servidor de desenvolvimento.

Esses arquivos não representam funcionalidade nova para o usuário final.

## Validação realizada

- `npm run lint`: concluído sem erros.
- `npm run build`: concluído sem erros; páginas estáticas e dinâmicas foram geradas com sucesso.

## Observação sobre autoria e datas

A pasta antiga permite identificar com precisão o resultado final de cada alteração, mas não registra o horário/autoria de cada linha. As mudanças realizadas nesta conversa foram: Schema.org, `robots`, `sitemap`, exclusão das páginas internas da indexação, menu mobile expansível e os ajustes finais do formulário/API de contato. As demais diferenças já estavam presentes na versão atual antes desta etapa de refinamento.
