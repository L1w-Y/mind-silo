import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface CollectRequest {
  type: "bookmark" | "idea" | "post" | "journal";
  content: string;
  tags?: string[];
  title?: string;
  layout?: {
    width: "full" | "half" | "third";
    order: number;
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_DIR = path.join(process.cwd(), "content");

export async function POST(request: NextRequest) {
  try {
    // Simple auth check via Bearer token
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

function handleBookmark(body: CollectRequest) {
  const filePath = path.join(DATA_DIR, "bookmarks.json");
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : [];

  const newBookmark = {
    id: `bm-${Date.now()}`,
    url: body.content,
    title: body.title || body.content,
    summary: "",
    tags: body.tags || [],
    favicon: "",
    createdAt: new Date().toISOString(),
  };

  existing.unshift(newBookmark);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true, item: newBookmark });
}

function handleIdea(body: CollectRequest) {
  const filePath = path.join(DATA_DIR, "ideas.json");
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : [];

  const newIdea = {
    id: `idea-${Date.now()}`,
    content: body.content,
    tags: body.tags || [],
    createdAt: new Date().toISOString(),
  };

  existing.unshift(newIdea);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true, item: newIdea });
}

function handlePost(body: CollectRequest) {
  const postsDir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  const slug =
    body.title
      ?.toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/(^-|-$)/g, "") || `post-${Date.now()}`;

  const date = new Date().toISOString().split("T")[0];
  const frontmatter = [
    "---",
    `title: "${body.title || "Untitled"}"`,
    `date: "${date}"`,
    `tags: [${(body.tags || []).map((t) => `"${t}"`).join(", ")}]`,
    `summary: ""`,
    "---",
    "",
    body.content,
  ].join("\n");

  fs.writeFileSync(path.join(postsDir, `${slug}.mdx`), frontmatter);

  return NextResponse.json({ success: true, slug });
}

function handleJournal(body: CollectRequest) {
  const journalDir = path.join(CONTENT_DIR, "journal");
  if (!fs.existsSync(journalDir))
    fs.mkdirSync(journalDir, { recursive: true });

  const date = new Date().toISOString().split("T")[0];
  const slug = date;
  const filePath = path.join(journalDir, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    // Append to existing entry
    const existing = fs.readFileSync(filePath, "utf-8");
    fs.writeFileSync(filePath, existing + "\n\n" + body.content);
  } else {
    const frontmatter = [
      "---",
      `title: "${body.title || date}"`,
      `date: "${date}"`,
      "---",
      "",
      body.content,
    ].join("\n");
    fs.writeFileSync(filePath, frontmatter);
  }

  // Update layout
  const layoutPath = path.join(DATA_DIR, "journal-layout.json");
  const layout = fs.existsSync(layoutPath)
    ? JSON.parse(fs.readFileSync(layoutPath, "utf-8"))
    : [];

  const existingBlock = layout.find(
    (l: any) => l.entryFile === `${slug}.mdx`
  );
  if (!existingBlock) {
    layout.push({
      id: `block-${Date.now()}`,
      entryFile: `${slug}.mdx`,
      width: body.layout?.width || "full",
      order: body.layout?.order ?? layout.length,
    });
    fs.writeFileSync(layoutPath, JSON.stringify(layout, null, 2));
  }

  return NextResponse.json({ success: true, slug });
}
