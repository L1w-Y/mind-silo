"use client";

import { Quote, Link2, Music, MapPin } from "lucide-react";
import { JournalEntry } from "@/lib/content";
import { DailyDecorations } from "@/components/decorations";

interface JournalSectionClientProps {
  entries: JournalEntry[];
}

function JournalBlockCard({ entry }: { entry: JournalEntry }) {
  const cardStyle = {
    backgroundColor: 'var(--card-bg)',
    borderColor: 'var(--card-border)',
    boxShadow: '4px 4px 0px 0px var(--card-border)'
  };

  return (
    <div
      className="break-inside-avoid mb-4 border-3 rounded-2xl p-5 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
      style={cardStyle}
    >
      <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{entry.title}</h4>
      <p className="leading-relaxed text-sm" style={{ color: 'var(--text-primary)' }}>{entry.content}</p>
      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>{entry.date}</p>
    </div>
  );
}

export function JournalSectionClient({ entries }: JournalSectionClientProps) {
  return (
    <section id="daily" className="min-h-screen flex items-center justify-center bg-section-daily py-20 relative overflow-hidden">
      <DailyDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-accent-daily text-white px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">日常</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">生活碎片、随手记录</p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {entries.map((entry) => (
              <JournalBlockCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
