import { getPosts } from "@/lib/content";
import { BlogSectionClient } from "./BlogSectionClient";
import { codeToHtml } from "shiki";

async function renderMarkdown(content: string): Promise<string> {
  const lines = content.split("\n");
  const result: string[] = [];
  let i = 0;
  let inCodeBlock = false;
  let codeContent = "";
  let codeLang = "";

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```") && !inCodeBlock) {
      inCodeBlock = true;
      codeLang = line.slice(3).trim() || "text";
      codeContent = "";
      i++;
      continue;
    }

    if (line.startsWith("```") && inCodeBlock) {
      inCodeBlock = false;
      try {
        const highlighted = await codeToHtml(codeContent.trimEnd(), {
          lang: codeLang,
          themes: { light: "github-light", dark: "github-dark" },
        });
        result.push(
          `<div class="code-block rounded-xl overflow-hidden my-4">${highlighted}</div>`
        );
      } catch {
        result.push(
          `<pre class="rounded-xl overflow-auto p-4 my-4 bg-[var(--muted)]"><code>${escapeHtml(codeContent)}</code></pre>`
        );
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4);
      const id = toId(text);
      result.push(`<h3 id="${id}" class="text-lg font-semibold mt-8 mb-3">${renderInline(text)}</h3>`);
    } else if (line.startsWith("## ")) {
      const text = line.slice(3);
      const id = toId(text);
      result.push(`<h2 id="${id}" class="text-xl font-bold mt-10 mb-4">${renderInline(text)}</h2>`);
    } else if (line.startsWith("# ")) {
      const text = line.slice(2);
      result.push(`<h1 class="text-2xl font-bold mt-10 mb-4">${renderInline(text)}</h1>`);
    } else if (line.match(/^[-*]\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      result.push(
        `<ul class="list-disc pl-6 my-4 space-y-1">${items
          .map((item) => `<li class="text-base leading-relaxed">${renderInline(item)}</li>`)
          .join("")}</ul>`
      );
      continue;
    } else if (line.startsWith("> ")) {
      const text = line.slice(2);
      result.push(
        `<blockquote class="border-l-3 border-[var(--accent)] pl-4 my-4 text-[var(--muted-foreground)] italic">${renderInline(text)}</blockquote>`
      );
    } else if (line.trim()) {
      result.push(`<p class="text-base leading-relaxed my-3">${renderInline(line)}</p>`);
    }

    i++;
  }

  return result.join("\n");
}

function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-[var(--muted)] text-sm font-mono">$1</code>')
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline">$1</a>'
    );
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function BlogSection() {
  const posts = await getPosts();
  return <BlogSectionClient posts={posts} />;
}
