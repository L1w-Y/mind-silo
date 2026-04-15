"use client";

import { Star, Lightbulb, Bookmark, FileText } from "lucide-react";
import { GitHubRepo, ContributionDay } from "@/lib/github";
import { Post, Bookmark as BookmarkType, Idea } from "@/lib/content";
import { ContributionGrid } from "@/components/ContributionGrid";
import { HomeDecorations } from "@/components/decorations";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Go: "#00add8",
  Python: "#3572a5", Rust: "#dea584", Shell: "#89e051",
  "C++": "#f34b7d", C: "#555555", CSS: "#563d7c", HTML: "#e34c26",
  Java: "#b07219",
};

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-2 rounded-xl p-3 hover:shadow-sm transition-all"
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-start justify-between mb-0.5">
        <h4 className="font-bold text-xs truncate" style={{ color: 'var(--text-primary)' }}>{repo.name}</h4>
        <span className="flex items-center gap-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
      </div>
      <p className="text-xs leading-relaxed mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {repo.description || "No description"}
      </p>
      {repo.language && (
        <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || "#8b8b8b" }} />
          {repo.language}
        </span>
      )}
    </a>
  );
}

function ThoughtItem({ idea }: { idea: Idea }) {
  return (
    <div className="py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <p className="leading-relaxed text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{idea.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {idea.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-bookmarks)', color: 'white', opacity: 0.9 }}>
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {new Date(idea.createdAt).toLocaleDateString("zh-CN")}
        </span>
      </div>
    </div>
  );
}

function BookmarkIcon({ bookmark }: { bookmark: BookmarkType }) {
  const colors = ["#000000", "#10a37f", "#38bdf8", "#f24e1e", "#007acc", "#24292f", "#ff6b6b", "#7c3aed"];
  const colorIdx = bookmark.title.length % colors.length;

  return (
    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="group" title={bookmark.title}>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-transform group-hover:scale-105"
        style={{ backgroundColor: colors[colorIdx] }}
      >
        {bookmark.favicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bookmark.favicon} alt="" className="w-6 h-6 rounded" />
        ) : (
          bookmark.title.charAt(0).toUpperCase()
        )}
      </div>
    </a>
  );
}

function ArticleCardSmall({ post }: { post: Post }) {
  return (
    <div className="py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <h4 className="font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>{post.title}</h4>
      <p className="text-xs line-clamp-1 mb-1" style={{ color: 'var(--text-secondary)' }}>{post.summary}</p>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
    </div>
  );
}

interface HomeSectionClientProps {
  repos: GitHubRepo[];
  contributions: ContributionDay[];
  posts: Post[];
  bookmarks: BookmarkType[];
  ideas: Idea[];
}

export function HomeSectionClient({ repos, contributions, posts, bookmarks, ideas }: HomeSectionClientProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-section-home py-20 relative overflow-hidden">
      <HomeDecorations />
      <div className="container mx-auto px-4 pl-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* GitHub (2 cols) */}
            <div className="lg:col-span-2 border-3 rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <GithubIcon className="w-6 h-6" />
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>GitHub</h3>
              </div>
              <ContributionGrid contributions={contributions} />
              <div className="grid grid-cols-3 gap-3 mt-6">
                {repos.slice(0, 6).map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>

            {/* Ideas (1 col) */}
            <div className="border-3 rounded-2xl p-5" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5" style={{ color: 'var(--accent-thoughts)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>最近想法</h3>
              </div>
              <div>
                {ideas.slice(0, 3).map((idea) => (
                  <ThoughtItem key={idea.id} idea={idea} />
                ))}
              </div>
            </div>

            {/* Posts (2 cols) */}
            <div className="lg:col-span-2 border-3 rounded-2xl p-5 flex flex-col max-h-[280px]" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-shadow)' }}>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5" style={{ color: 'var(--accent-blog)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>最近文章</h3>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                {posts.slice(0, 5).map((post) => (
                  <ArticleCardSmall key={post.slug} post={post} />
                ))}
              </div>
            </div>

            {/* Bookmarks (1 col) */}
            <div className="border-3 rounded-2xl p-5" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: '4px 4px 0px 0px var(--card-shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="w-5 h-5" style={{ color: 'var(--accent-blog)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>最近收藏</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {bookmarks.slice(0, 8).map((bm) => (
                  <BookmarkIcon key={bm.id} bookmark={bm} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
