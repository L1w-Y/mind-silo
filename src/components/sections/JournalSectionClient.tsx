"use client";

import { BlockEditor } from "@/components/BlockEditor";
import { BlockData } from "@/components/Block";

interface JournalSectionClientProps {
  initialBlocks: BlockData[];
}

export function JournalSectionClient({
  initialBlocks,
}: JournalSectionClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold tracking-tight mb-8">日常</h2>
      <BlockEditor initialBlocks={initialBlocks} />
    </div>
  );
}
