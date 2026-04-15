import { NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 并行查询所有标签 + 各表统计
    const [bookmarkTags, ideaTags, postTags, bookmarkCount, ideaCount, postCount, journalCount] =
      await Promise.all([
        db.execute({ sql: "SELECT tags FROM bookmarks", args: [] }),
        db.execute({ sql: "SELECT tags FROM ideas", args: [] }),
        db.execute({ sql: "SELECT tags FROM posts", args: [] }),
        db.execute({ sql: "SELECT COUNT(*) as count FROM bookmarks", args: [] }),
        db.execute({ sql: "SELECT COUNT(*) as count FROM ideas", args: [] }),
        db.execute({ sql: "SELECT COUNT(*) as count FROM posts", args: [] }),
        db.execute({ sql: "SELECT COUNT(*) as count FROM journals", args: [] }),
      ]);

    // 收集并去重所有标签
    function extractTags(rows: Array<Record<string, unknown>>): string[] {
      const tags = new Set<string>();
      rows.forEach((row) => {
        try {
          const parsed = JSON.parse((row.tags as string) || "[]");
          if (Array.isArray(parsed)) parsed.forEach((t: string) => tags.add(t));
        } catch {
          // ignore
        }
      });
      return Array.from(tags).sort();
    }

    const bTags = extractTags(bookmarkTags.rows as Array<Record<string, unknown>>);
    const iTags = extractTags(ideaTags.rows as Array<Record<string, unknown>>);
    const pTags = extractTags(postTags.rows as Array<Record<string, unknown>>);
    const allTags = Array.from(new Set([...bTags, ...iTags, ...pTags])).sort();

    return NextResponse.json({
      // 标签
      tags: {
        all: allTags,
        bookmarks: bTags,
        ideas: iTags,
        posts: pTags,
      },

      // 统计
      counts: {
        bookmarks: Number(bookmarkCount.rows[0]?.count ?? 0),
        ideas: Number(ideaCount.rows[0]?.count ?? 0),
        posts: Number(postCount.rows[0]?.count ?? 0),
        journals: Number(journalCount.rows[0]?.count ?? 0),
      },

      // 数据库表结构（供 AI 参考）
      schema: {
        bookmarks: {
          description: "收藏的链接/资源",
          fields: {
            id: "TEXT PK — 自动生成 bm-{timestamp}",
            url: "TEXT — 链接地址（对应请求的 content 字段）",
            title: "TEXT — 标题",
            summary: "TEXT — 一句话摘要",
            tags: "TEXT — JSON 数组 如 [\"React\",\"前端\"]",
            favicon: "TEXT — 网站图标 URL（可用 https://www.google.com/s2/favicons?domain=xxx&sz=64 自动获取）",
            created_at: "TEXT — ISO 8601 时间戳",
            color: "TEXT — 卡片颜色（可选，自动分配）",
            card_width: "TEXT — 卡片宽度 full/half/third（默认 half）",
          },
        },
        ideas: {
          description: "碎片想法/灵感/随想",
          fields: {
            id: "TEXT PK — 自动生成 idea-{timestamp}",
            content: "TEXT — 想法文字内容",
            tags: "TEXT — JSON 数组",
            created_at: "TEXT — ISO 8601 时间戳",
            color: "TEXT — 卡片颜色（可选）",
            card_width: "TEXT — 卡片宽度（默认 third）",
          },
        },
        posts: {
          description: "博客文章/长文",
          fields: {
            id: "TEXT PK — post-{slug}",
            slug: "TEXT UNIQUE — URL 友好标识（从标题生成）",
            title: "TEXT — 文章标题",
            content: "TEXT — 正文（Markdown 格式）",
            summary: "TEXT — 摘要（1-2 句话）",
            tags: "TEXT — JSON 数组",
            date: "TEXT — YYYY-MM-DD",
            color: "TEXT — 卡片颜色（可选）",
            card_width: "TEXT — 卡片宽度（默认 half）",
          },
        },
        journals: {
          description: "日常记录/生活碎片，同一天多条自动合并",
          fields: {
            id: "TEXT PK — journal-{date}",
            slug: "TEXT UNIQUE — 日期 YYYY-MM-DD",
            title: "TEXT — 标题（默认日期）",
            content: "TEXT — 内容",
            date: "TEXT — YYYY-MM-DD",
            layout_width: "TEXT — full/half/third",
            layout_order: "INTEGER — 排序",
            color: "TEXT — 卡片颜色（可选）",
            card_width: "TEXT — 卡片宽度（默认 full）",
          },
        },
      },

      // 写入 API 说明
      collectAPI: {
        endpoint: "POST /api/collect",
        auth: "Header: Authorization: Bearer <COLLECT_API_TOKEN>",
        body: {
          type: "bookmark | idea | post | journal（必填）",
          content: "内容（必填）— bookmark 时为 URL，其他为文字",
          title: "标题（bookmark/post 建议填）",
          summary: "摘要（可选）",
          tags: "标签数组 如 [\"React\",\"工具\"]（建议填）",
        },
      },
    });
  } catch (error) {
    console.error("Meta API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
