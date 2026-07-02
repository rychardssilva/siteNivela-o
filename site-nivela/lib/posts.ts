import fs from "node:fs";
import path from "node:path";

import { markdownToHtml, parseMarkdown } from "./markdown";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const categoriesDirectory = path.join(process.cwd(), "content", "categories");

export type Post = {
  title: string;
  slug: string;
  date: string;
  category: string;
  categoryLabel: string;
  description: string;
  coverImage?: string;
  draft: boolean;
  body: string;
  html: string;
  readTime: string;
};

type Category = {
  slug: string;
  name: string;
};

function readMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      source: fs.readFileSync(path.join(directory, file), "utf8"),
    }));
}

function getCategories() {
  return readMarkdownFiles(categoriesDirectory).reduce<Record<string, Category>>(
    (acc, item) => {
      const parsed = parseMarkdown(item.source);
      const slug = String(
        parsed.data.slug ?? item.file.replace(/\.md$/, ""),
      );

      acc[slug] = {
        slug,
        name: String(parsed.data.name ?? slug),
      };

      return acc;
    },
    {},
  );
}

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min de leitura`;
}

function toPost(file: string, source: string, categories: Record<string, Category>): Post {
  const parsed = parseMarkdown(source);
  const fallbackSlug = file.replace(/\.md$/, "");
  const category = String(parsed.data.category ?? "");
  const body = parsed.body;

  return {
    title: String(parsed.data.title ?? fallbackSlug),
    slug: String(parsed.data.slug ?? fallbackSlug),
    date: String(parsed.data.date ?? ""),
    category,
    categoryLabel: categories[category]?.name ?? category,
    description: String(parsed.data.description ?? ""),
    coverImage:
      typeof parsed.data.coverImage === "string" ? parsed.data.coverImage : undefined,
    draft: parsed.data.draft === true,
    body,
    html: markdownToHtml(body),
    readTime: estimateReadTime(body),
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  const categories = getCategories();

  return readMarkdownFiles(postsDirectory)
    .map((item) => toPost(item.file, item.source, categories))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: true }).find((post) => post.slug === slug) ?? null;
}

export function getPostCategories() {
  const labels = getAllPosts().map((post) => post.categoryLabel).filter(Boolean);

  return ["Todos", ...Array.from(new Set(labels))];
}
