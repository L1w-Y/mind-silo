// Run: npx tsx src/scripts/init-db.ts
import { createClient } from "@libsql/client";
import * as fs from "fs";
import * as path from "path";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://blog-l1w-y.aws-ap-northeast-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

async function main() {
  console.log("Creating tables...");

  await db.batch([
    {
      sql: `CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT DEFAULT '',
        tags TEXT DEFAULT '[]',
        favicon TEXT DEFAULT '',
        created_at TEXT NOT NULL
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS ideas (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        tags TEXT DEFAULT '[]',
        created_at TEXT NOT NULL
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS journals (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL,
        layout_width TEXT DEFAULT 'full',
        layout_order INTEGER DEFAULT 0
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        summary TEXT DEFAULT '',
        tags TEXT DEFAULT '[]',
        date TEXT NOT NULL
      )`,
      args: [],
    },
  ]);

  console.log("Tables created!");

  // Migrate bookmarks
  const bookmarksPath = path.join(process.cwd(), "data", "bookmarks.json");
  if (fs.existsSync(bookmarksPath)) {
    const bookmarks = JSON.parse(fs.readFileSync(bookmarksPath, "utf-8"));
    for (const bm of bookmarks) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO bookmarks (id, url, title, summary, tags, favicon, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [bm.id, bm.url, bm.title, bm.summary, JSON.stringify(bm.tags), bm.favicon, bm.createdAt],
      });
    }
    console.log(`Migrated ${bookmarks.length} bookmarks`);
  }

  // Migrate ideas
  const ideasPath = path.join(process.cwd(), "data", "ideas.json");
  if (fs.existsSync(ideasPath)) {
    const ideas = JSON.parse(fs.readFileSync(ideasPath, "utf-8"));
    for (const idea of ideas) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO ideas (id, content, tags, created_at) VALUES (?, ?, ?, ?)`,
        args: [idea.id, idea.content, JSON.stringify(idea.tags), idea.createdAt],
      });
    }
    console.log(`Migrated ${ideas.length} ideas`);
  }

  // Migrate posts
  const postsDir = path.join(process.cwd(), "content", "posts");
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const slug = file.replace(".mdx", "");
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) continue;

      const meta: Record<string, string> = {};
      frontmatterMatch[1].split("\n").forEach((line) => {
        const [key, ...rest] = line.split(": ");
        if (key && rest.length) meta[key.trim()] = rest.join(": ").replace(/^"|"$/g, "");
      });

      const content = frontmatterMatch[2].trim();
      const tags = meta.tags ? meta.tags.replace(/^\[|\]$/g, "").split(",").map((t) => t.trim().replace(/^"|"$/g, "")) : [];

      await db.execute({
        sql: `INSERT OR IGNORE INTO posts (id, slug, title, content, summary, tags, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [`post-${slug}`, slug, meta.title || slug, content, meta.summary || "", JSON.stringify(tags), meta.date || ""],
      });
    }
    console.log(`Migrated ${files.length} posts`);
  }

  // Migrate journals
  const journalDir = path.join(process.cwd(), "content", "journal");
  if (fs.existsSync(journalDir)) {
    const files = fs.readdirSync(journalDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(journalDir, file), "utf-8");
      const slug = file.replace(".mdx", "");
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) continue;

      const meta: Record<string, string> = {};
      frontmatterMatch[1].split("\n").forEach((line) => {
        const [key, ...rest] = line.split(": ");
        if (key && rest.length) meta[key.trim()] = rest.join(": ").replace(/^"|"$/g, "");
      });

      const content = frontmatterMatch[2].trim();

      await db.execute({
        sql: `INSERT OR IGNORE INTO journals (id, slug, title, content, date) VALUES (?, ?, ?, ?, ?)`,
        args: [`journal-${slug}`, slug, meta.title || slug, content, meta.date || slug],
      });
    }
    console.log(`Migrated ${files.length} journals`);
  }

  console.log("Migration complete!");
}

main().catch(console.error);
