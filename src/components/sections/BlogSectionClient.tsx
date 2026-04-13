"use client";

import { useState } from "react";
import { Post } from "@/lib/content";
import { SearchBar } from "@/components/SearchBar";
import { ReadingPanel } from "@/components/ReadingPanel";

interface BlogSectionClientProps {
  posts: Post[];
  renderedContents: Record<string, string>;
}

export function BlogSectionClient({
  posts,
  renderedContents,
}: BlogSectionClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedPost = posts.find((p) => p.slug === selectedSlug) || null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold tracking-tight mb-8">博客</h2>

      <SearchBar
        items={posts.map((p) => ({ title: p.title, slug: p.slug }))}
        onSelect={(slug) => setSelectedSlug(slug)}
      />

      {/* Article list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <button
            key={post.slug}
            onClick={() => setSelectedSlug(post.slug)}
            className="w-full text-left rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "var(--card)",
              boxShadow: "var(--shadow-card)",
              border: `1px solid ${
                selectedSlug === post.slug
                  ? "var(--accent)"
                  : "var(--border)"
              }`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-card-foreground">
                {post.title}
              </h3>
              <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                {post.readingTime}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {post.summary}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.date}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Reading Panel */}
      <ReadingPanel
        post={selectedPost}
        renderedContent={selectedSlug ? renderedContents[selectedSlug] || "" : ""}
        onClose={() => setSelectedSlug(null)}
      />
    </div>
  );
}
