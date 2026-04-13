import { getRepos, getContributions } from "@/lib/github";
import { getPosts, getBookmarks, getIdeas } from "@/lib/content";
import { ContributionGrid } from "@/components/ContributionGrid";
import { RepoCarousel } from "@/components/RepoCarousel";
import { Favicon } from "@/components/Favicon";

export async function HomeSection() {
  const [repos, contributions] = await Promise.all([
    getRepos(),
    getContributions(),
  ]);

  const posts = await getPosts();
  const bookmarks = await getBookmarks();
  const ideas = await getIdeas();

  return (
    <div className="hero-sky min-h-screen flex flex-col">
      {/* Cloud decorations */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />

      {/* Bento Grid */}
      <div className="relative z-10 w-full px-10 py-10">
        <div className="max-w-[1300px] mx-auto">

          {/* Top area: GitHub (left, tall) + Ideas & Bookmarks (right, stacked) */}
          <div className="grid grid-cols-12 gap-4 mb-4">

            {/* GitHub — left, spans 2 rows */}
            <div className="bento-card col-span-7 row-span-2 p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <h2 className="text-lg font-bold">GitHub</h2>
              </div>
              <ContributionGrid contributions={contributions} />
              <RepoCarousel repos={repos} />
            </div>

            {/* Ideas — right top */}
            <div className="bento-card col-span-5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">💡</span>
                <h2 className="text-base font-bold">最近想法</h2>
              </div>
              <div className="space-y-2">
                {ideas.slice(0, 3).map((idea) => (
                  <div
                    key={idea.id}
                    className="rounded-lg px-3 py-2.5 text-xs"
                    style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                  >
                    <p className="text-card-foreground leading-relaxed line-clamp-2">{idea.content}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {idea.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {new Date(idea.createdAt).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bookmarks — right bottom */}
            <div className="bento-card col-span-5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🔖</span>
                <h2 className="text-base font-bold">最近收藏</h2>
              </div>
              <div className="space-y-2">
                {bookmarks.slice(0, 3).map((bm) => (
                  <a
                    key={bm.id}
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 rounded-lg p-3 transition-colors hover:bg-muted/50"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <Favicon src={bm.favicon} />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-card-foreground group-hover:text-accent transition-colors truncate">
                        {bm.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{bm.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Latest Posts — full width */}
          <div className="bento-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📝</span>
              <h2 className="text-base font-bold">最近文章</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {posts.slice(0, 4).map((post) => (
                <div
                  key={post.slug}
                  className="rounded-lg p-3 transition-colors hover:bg-muted/50 cursor-pointer"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <h4 className="text-sm font-semibold text-card-foreground mb-0.5 truncate">{post.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{post.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
