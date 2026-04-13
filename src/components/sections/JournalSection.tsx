import { getJournalEntries, getJournalLayout } from "@/lib/content";
import { JournalSectionClient } from "./JournalSectionClient";
import { BlockData } from "@/components/Block";

export async function JournalSection() {
  const entries = await getJournalEntries();
  const layout = await getJournalLayout();

  const blocks: BlockData[] = entries.map((entry) => {
    const layoutItem = layout.find(
      (l) => l.entryFile === `${entry.slug}.mdx`
    );
    return {
      id: entry.slug,
      content: entry.content,
      title: entry.title,
      date: entry.date,
      width: layoutItem?.width || "full",
    };
  });

  return <JournalSectionClient initialBlocks={blocks} />;
}
