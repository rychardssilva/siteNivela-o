import Link from "next/link";
import Image from "next/image";

import { getAllPosts, getPostCategories } from "@/lib/posts";

const fallbackColors = ["#0f3c57", "#1a4a2e", "#2f4f4f", "#3d2b00"];

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getPostCategories();

  return (
    <main>
      <section className="sobre-hero">
        <span className="section-label">Conhecimento técnico</span>
        <h1>Entenda o seu imóvel antes de tomar decisões</h1>
        <p>
          Artigos escritos por engenheiro civil para proprietários, construtoras
          e advogados que precisam de clareza técnica sem juridiquês.
        </p>
      </section>

      <section className="section blog-page-section">
        <div className="blog-cats" aria-label="Categorias do blog">
          {categories.map((category, index) => (
            <button
              className={index === 0 ? "cat-btn active" : "cat-btn"}
              key={category}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className="blog-full-grid">
            {posts.map((post, index) => (
              <article className="blog-full-card" key={post.slug}>
                <div
                  className="blog-full-img"
                  style={{
                    backgroundColor: fallbackColors[index % fallbackColors.length],
                  }}
                >
                  {post.coverImage ? (
                    <Image
                      alt={post.title}
                      className="blog-cover-image"
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      src={post.coverImage}
                    />
                  ) : (
                    <span className="blog-full-icon" aria-hidden="true">
                      {getInitials(post.categoryLabel || post.title)}
                    </span>
                  )}
                  {post.categoryLabel ? (
                    <span className="tag">{post.categoryLabel}</span>
                  ) : null}
                </div>

                <div className="blog-full-body">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <Link className="read-more" href={`/blog/${post.slug}`}>
                    Ler artigo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">Nenhum artigo publicado ainda.</p>
        )}
      </section>
    </main>
  );
}
