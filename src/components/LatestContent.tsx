import { Post, Bookmark, Idea } from "@/lib/content";
import { Favicon } from "@/components/Favicon";

export function LatestContent({
  posts,
  bookmarks,
  ideas,
}: {
  posts: Post[];
  bookmarks: Bookmark[];
  ideas: Idea[];
}) {
  return (
    <div className="space-y-8">
      {/* Latest Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
          最新文章
        </h3>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.slug}
              className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "var(--card)",
                boxShadow: "var(--shadow-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4 className="font-semibold text-card-foreground mb-1">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {post.summary}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Bookmarks */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
          最新收藏
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {bookmarks.slice(0, 4).map((bm) => (
            <a
              key={bm.id}
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--card)",
                boxShadow: "var(--shadow-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Favicon src={bm.favicon} />
                <h4 className="text-sm font-medium text-card-foreground group-hover:text-accent transition-colors truncate">
                  {bm.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {bm.summary}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Latest Ideas */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
          最新想法
        </h3>
        <div className="space-y-2">
          {ideas.slice(0, 3).map((idea) => (
            <div
              key={idea.id}
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-card-foreground">{idea.content}</p>
              <div className="flex items-center gap-2 mt-2">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(idea.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
