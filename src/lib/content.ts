import db from "@/lib/db";
import readingTime from "reading-time";

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

export async function getPosts(): Promise<Post[]> {
  const result = await db.execute({
    sql: "SELECT * FROM posts ORDER BY date DESC",
    args: [],
  });

  return result.rows.map((row) => {
    const content = row.content as string;
    const stats = readingTime(content);
    return {
      slug: row.slug as string,
      title: row.title as string,
      date: row.date as string,
      tags: JSON.parse((row.tags as string) || "[]"),
      summary: (row.summary as string) || "",
      readingTime: stats.text,
      content,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

// ==================== Bookmarks ====================

export async function getBookmarks(): Promise<Bookmark[]> {
  const result = await db.execute({
    sql: "SELECT * FROM bookmarks ORDER BY created_at DESC",
    args: [],
  });

  return result.rows.map((row) => ({
    id: row.id as string,
    url: row.url as string,
    title: row.title as string,
    summary: (row.summary as string) || "",
    tags: JSON.parse((row.tags as string) || "[]"),
    favicon: (row.favicon as string) || "",
    createdAt: row.created_at as string,
  }));
}

// ==================== Ideas ====================

export async function getIdeas(): Promise<Idea[]> {
  const result = await db.execute({
    sql: "SELECT * FROM ideas ORDER BY created_at DESC",
    args: [],
  });

  return result.rows.map((row) => ({
    id: row.id as string,
    content: row.content as string,
    tags: JSON.parse((row.tags as string) || "[]"),
    createdAt: row.created_at as string,
  }));
}

// ==================== Journal ====================

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const result = await db.execute({
    sql: "SELECT * FROM journals ORDER BY date DESC",
    args: [],
  });

  return result.rows.map((row) => ({
    slug: row.slug as string,
    title: row.title as string,
    date: row.date as string,
    content: row.content as string,
  }));
}

export async function getJournalLayout(): Promise<JournalBlock[]> {
  const result = await db.execute({
    sql: "SELECT id, slug, layout_width, layout_order FROM journals ORDER BY layout_order ASC",
    args: [],
  });

  return result.rows.map((row) => ({
    id: row.id as string,
    entryFile: `${row.slug as string}.mdx`,
    width: (row.layout_width as "full" | "half" | "third") || "full",
    order: (row.layout_order as number) || 0,
  }));
}
