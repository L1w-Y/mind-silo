"use client";

import { GitHubRepo } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Python: "#3572a5",
  Rust: "#dea584",
  Shell: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
};

interface RepoCarouselProps {
  repos: GitHubRepo[];
}

export function RepoCarousel({ repos }: RepoCarouselProps) {
  const displayRepos = repos.slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {displayRepos.map((repo) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl p-3.5 transition-colors hover:bg-muted/40"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-xs font-semibold text-card-foreground group-hover:text-accent transition-colors truncate">
              {repo.name}
            </h4>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground flex-shrink-0 ml-1">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              {repo.stargazers_count}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground line-clamp-2 mb-1.5">
            {repo.description || "No description"}
          </p>
          {repo.language && (
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: LANG_COLORS[repo.language] || "#8b8b8b" }}
              />
              {repo.language}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
