import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface CollectRequest {
  type: "bookmark" | "idea" | "post" | "journal";
  content: string;
  tags?: string[];
  title?: string;
  summary?: string;
  layout?: {
    width: "full" | "half" | "third";
    order: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = process.env.COLLECT_API_TOKEN;
    if (token && authHeader !== `Bearer ${token}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CollectRequest = await request.json();

    if (!body.type || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields: type, content" },
        { status: 400 }
      );
    }

    switch (body.type) {
      case "bookmark":
        return handleBookmark(body);
      case "idea":
        return handleIdea(body);
      case "post":
        return handlePost(body);
      case "journal":
        return handleJournal(body);
      default:
        return NextResponse.json(
          { error: `Unknown type: ${body.type}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Collect API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleBookmark(body: CollectRequest) {
  const id = `bm-${Date.now()}`;
  const createdAt = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO bookmarks (id, url, title, summary, tags, favicon, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [id, body.content, body.title || body.content, body.summary || "", JSON.stringify(body.tags || []), "", createdAt],
  });

  return NextResponse.json({ success: true, item: { id, url: body.content, title: body.title, createdAt } });
}

async function handleIdea(body: CollectRequest) {
  const id = `idea-${Date.now()}`;
  const createdAt = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO ideas (id, content, tags, created_at) VALUES (?, ?, ?, ?)`,
    args: [id, body.content, JSON.stringify(body.tags || []), createdAt],
  });

  return NextResponse.json({ success: true, item: { id, content: body.content, createdAt } });
}

async function handlePost(body: CollectRequest) {
  const slug =
    body.title
      ?.toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/(^-|-$)/g, "") || `post-${Date.now()}`;

  const date = new Date().toISOString().split("T")[0];
  const id = `post-${slug}`;

  await db.execute({
    sql: `INSERT OR REPLACE INTO posts (id, slug, title, content, summary, tags, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [id, slug, body.title || "Untitled", body.content, body.summary || "", JSON.stringify(body.tags || []), date],
  });

  return NextResponse.json({ success: true, slug });
}

async function handleJournal(body: CollectRequest) {
  const date = new Date().toISOString().split("T")[0];
  const slug = date;
  const id = `journal-${slug}`;

  // Check if entry exists
  const existing = await db.execute({
    sql: `SELECT content FROM journals WHERE slug = ?`,
    args: [slug],
  });

  if (existing.rows.length > 0) {
    // Append
    const oldContent = existing.rows[0].content as string;
    await db.execute({
      sql: `UPDATE journals SET content = ? WHERE slug = ?`,
      args: [oldContent + "\n\n" + body.content, slug],
    });
  } else {
    await db.execute({
      sql: `INSERT INTO journals (id, slug, title, content, date, layout_width, layout_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [id, slug, body.title || date, body.content, date, body.layout?.width || "full", body.layout?.order ?? 0],
    });
  }

  return NextResponse.json({ success: true, slug });
}
