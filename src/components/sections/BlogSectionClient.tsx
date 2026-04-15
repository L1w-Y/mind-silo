"use client";

import { useState } from "react";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { Post } from "@/lib/content";
import { BlogDecorations } from "@/components/decorations";

interface BlogSectionClientProps {
  posts: Post[];
}

export function BlogSectionClient({ posts }: BlogSectionClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center bg-section-blog py-20 relative overflow-hidden">
      <BlogDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-accent-blog text-white px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">博客</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">技术文章、学习笔记、经验分享</p>
          </div>

          {/* Search */}
          <div className="relative mb-10 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-primary)', boxShadow: '4px 4px 0px 0px var(--card-border)' }}
            />
          </div>

          {/* Blog Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="group block border-3 rounded-2xl p-6 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-border)' }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--text-primary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blog transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{post.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold group-hover:text-accent-blog group-hover:gap-2 transition-all" style={{ color: 'var(--text-primary)' }}>
                    阅读全文
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--text-muted)' }} className="text-lg">没有找到相关文章</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
