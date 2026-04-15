"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Idea } from "@/lib/content";
import { ThoughtsDecorations } from "@/components/decorations";

interface IdeasSectionClientProps {
  ideas: Idea[];
}

export function IdeasSectionClient({ ideas }: IdeasSectionClientProps) {
  return (
    <section id="thoughts" className="min-h-screen flex items-center justify-center bg-section-thoughts py-20 relative overflow-hidden">
      <ThoughtsDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-accent-thoughts text-black px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">想法</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">随时记录的灵感和思考</p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="break-inside-avoid mb-4 border-3 rounded-2xl p-5 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-border)' }}
              >
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>{idea.content}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {idea.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--text-primary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="text-xs">{new Date(idea.createdAt).toLocaleDateString("zh-CN")}</span>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button className="flex items-center gap-1 hover:text-accent-bookmarks transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-accent-daily transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
