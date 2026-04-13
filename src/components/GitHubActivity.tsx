import { GitHubRepo, ContributionDay } from "@/lib/github";
import { ContributionGrid } from "@/components/ContributionGrid";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Python: "#3572a5",
  Rust: "#dea584",
  Shell: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export function GitHubActivity({
  repos,
  contributions,
}: {
  repos: GitHubRepo[];
  contributions: ContributionDay[];
}) {
  return (
    <div className="space-y-8">
      {/* Contribution Grid */}
      <ContributionGrid contributions={contributions} />

      {/* Repos */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
          GitHub 仓库
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--card)",
                boxShadow: "var(--shadow-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-card-foreground group-hover:text-accent transition-colors">
                  {repo.name}
                </h4>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {repo.description || "No description"}
              </p>
              {repo.language && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        LANG_COLORS[repo.language] || "#8b8b8b",
                    }}
                  />
                  {repo.language}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
