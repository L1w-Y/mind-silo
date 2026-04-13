"use client";

import { useState, useMemo } from "react";
import { Bookmark } from "@/lib/content";
import { TagFilter } from "@/components/TagFilter";
import { BookmarkCard } from "@/components/BookmarkCard";

interface BookmarksSectionClientProps {
  bookmarks: Bookmark[];
}

export function BookmarksSectionClient({
  bookmarks,
}: BookmarksSectionClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    bookmarks.forEach((bm) => bm.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [bookmarks]);

  const filtered = useMemo(() => {
    let result = bookmarks;
    if (selectedTag) {
      result = result.filter((bm) => bm.tags.includes(selectedTag));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (bm) =>
          bm.title.toLowerCase().includes(q) ||
          bm.summary.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookmarks, selectedTag, query]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold tracking-tight mb-8">收藏</h2>

      {/* Search */}
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4"
        style={{
          background: "var(--muted)",
          border: "1px solid var(--border)",
        }}
      >
        <svg
          className="w-4 h-4 text-muted-foreground flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="搜索收藏..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Tags */}
      <TagFilter tags={allTags} selected={selectedTag} onSelect={setSelectedTag} />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((bm) => (
          <BookmarkCard key={bm.id} bookmark={bm} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          暂无匹配的收藏
        </p>
      )}
    </div>
  );
}
