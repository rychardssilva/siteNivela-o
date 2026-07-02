# Guia do Blog no Decap CMS

Este projeto usa o Decap CMS para criar categorias, posts e imagens direto no GitHub. Depois que o fluxo corrigido estiver na `main`, o CMS e o frontend passam a olhar para os mesmos caminhos:

- Posts: `site-nivela/content/posts`
- Categorias: `site-nivela/content/categories`
- Imagens: `site-nivela/public/uploads`

## Rodando localmente

Entre na pasta da aplicacao:

```bash
cd site-nivela
npm install
npm run dev
```

URLs locais:

- Site: `http://localhost:3000`
- Blog: `http://localhost:3000/blog`
- Painel do CMS: `http://localhost:3000/admin`

Para o login do CMS funcionar localmente, crie `site-nivela/.env.local` baseado em `.env.example`:

```bash
GITHUB_CLIENT_ID=seu_client_id
GITHUB_CLIENT_SECRET=seu_client_secret
GITHUB_REPO_PRIVATE=1
```

## Criando uma categoria

1. Abra `http://localhost:3000/admin`.
2. Entre com a conta do GitHub.
3. No menu lateral, clique em `Categorias`.
4. Clique em nova categoria.
5. Preencha:
   - Nome: nome visivel no site.
   - Slug: identificador sem espacos, por exemplo `area-e-limites`.
   - Descricao: texto opcional.
6. Salve e publique a categoria.

Se a categoria nao aparecer imediatamente no campo de categoria do post, recarregue o painel do CMS. O campo de categoria busca as categorias ja salvas no GitHub.

## Criando um post

1. No painel, clique em `Posts`.
2. Clique em `+ Post`.
3. Preencha:
   - Titulo: titulo do artigo.
   - Slug: parte da URL, por exemplo `area-real-area-escritura`.
   - Data: data de publicacao.
   - Categoria: escolha uma categoria ja criada.
   - Descricao: resumo que aparece nos cards e no SEO.
   - Imagem de capa: opcional, enviada para `site-nivela/public/uploads`.
   - Rascunho: deixe desligado para aparecer no frontend.
   - Conteudo: texto principal do artigo.
4. Salve e publique.

Depois de publicado, o post deve aparecer em:

```txt
http://localhost:3000/blog
http://localhost:3000/blog/seu-slug
```

## Como o post aparece no frontend local

Quando voce cria ou altera um post pelo CMS, o Decap faz commit no GitHub. Ele nao altera automaticamente a pasta da sua maquina.

Para ver localmente um post criado ou alterado no CMS:

```bash
git pull
cd site-nivela
npm run dev
```

Se o servidor ja estava aberto, as vezes basta atualizar a pagina. Se nao aparecer, pare o servidor e rode `npm run dev` de novo.

## Fluxo esperado depois da correcao

```txt
/admin
-> Decap CMS
-> commit automatico na main do GitHub
-> arquivos salvos em site-nivela/content e site-nivela/public/uploads
-> frontend le os mesmos arquivos
-> artigo aparece no blog
```

Voce nao precisa fazer push manual para cada post criado no CMS. O `git pull` so e necessario na maquina de quem quer baixar localmente o conteudo que o CMS ja publicou no GitHub.
