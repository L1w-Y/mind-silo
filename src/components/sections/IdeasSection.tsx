import { getIdeas } from "@/lib/content";
import { IdeaCard } from "@/components/IdeaCard";

export function IdeasSection() {
  const ideas = getIdeas();

  // Group by date
  const grouped = ideas.reduce<Record<string, typeof ideas>>((acc, idea) => {
    const date = new Date(idea.createdAt).toLocaleDateString("zh-CN");
    if (!acc[date]) acc[date] = [];
    acc[date].push(idea);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold tracking-tight mb-8">想法</h2>

      <div className="space-y-8">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                {date}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-5">
              {items.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {ideas.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          暂无想法记录
        </p>
      )}
    </div>
  );
}
