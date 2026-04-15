"use client";

import { useState } from "react";
import { Search, ExternalLink, Globe } from "lucide-react";
import { Bookmark } from "@/lib/content";
import { BookmarksDecorations } from "@/components/decorations";

interface BookmarksSectionClientProps {
  bookmarks: Bookmark[];
}

export function BookmarksSectionClient({ bookmarks }: BookmarksSectionClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("全部");

  // 收集所有 tags
  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags)));
  const categories = ["全部", ...allTags.slice(0, 5)];

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesTag = activeTag === "全部" || bookmark.tags.includes(activeTag);
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="bookmarks" className="min-h-screen flex items-center justify-center bg-section-bookmarks py-20 relative overflow-hidden">
      <BookmarksDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-accent-bookmarks text-white px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">收藏</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">收集的优质资源、工具和文章</p>
          </div>

          {/* Category Tabs & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTag(cat)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2"
                  style={{
                    backgroundColor: activeTag === cat ? 'var(--accent-bookmarks)' : 'var(--card-bg)',
                    color: activeTag === cat ? 'white' : 'var(--text-primary)',
                    borderColor: 'var(--card-border)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="搜索收藏..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Bookmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((bookmark) => (
              <a
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-3 rounded-2xl p-5 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-border)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 border-2 rounded-lg flex items-center justify-center text-lg flex-shrink-0 font-bold" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }}>
                    {bookmark.favicon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={bookmark.favicon} alt="" className="w-6 h-6 rounded" />
                    ) : (
                      bookmark.title.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold group-hover:text-accent-bookmarks transition-colors truncate" style={{ color: 'var(--text-primary)' }}>
                        {bookmark.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:text-accent-bookmarks" style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{bookmark.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {bookmark.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--accent-bookmarks)', color: 'white' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {filteredBookmarks.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--text-muted)' }} className="text-lg">没有找到相关收藏</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
