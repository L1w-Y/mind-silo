import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const JOURNAL_DIR = path.join(process.cwd(), "content/journal");
const DATA_DIR = path.join(process.cwd(), "data");

// ==================== Types ====================

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: string;
  content: string;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  summary: string;
  tags: string[];
  favicon: string;
  createdAt: string;
}

export interface Idea {
  id: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface JournalEntry {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface JournalBlock {
  id: string;
  entryFile: string;
  width: "full" | "half" | "third";
  order: number;
}

// ==================== Posts ====================

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      tags: data.tags || [],
      summary: data.summary || "",
      readingTime: stats.text,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

// ==================== Bookmarks ====================

export function getBookmarks(): Bookmark[] {
  const filePath = path.join(DATA_DIR, "bookmarks.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const bookmarks: Bookmark[] = JSON.parse(raw);

  return bookmarks.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ==================== Ideas ====================

export function getIdeas(): Idea[] {
  const filePath = path.join(DATA_DIR, "ideas.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const ideas: Idea[] = JSON.parse(raw);

  return ideas.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ==================== Journal ====================

export function getJournalEntries(): JournalEntry[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];

  const files = fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".mdx"));

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      content,
    };
  });

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJournalLayout(): JournalBlock[] {
  const filePath = path.join(DATA_DIR, "journal-layout.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}
