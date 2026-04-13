"use client";

import { ContributionDay } from "@/lib/github";

interface ContributionGridProps {
  contributions: ContributionDay[];
}

export function ContributionGrid({ contributions }: ContributionGridProps) {
  // Group into weeks (columns)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  if (contributions.length > 0) {
    const firstDay = new Date(contributions[0].date).getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
  }

  contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const validDay = week.find((d) => d.date);
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: weekIdx });
        lastMonth = month;
      }
    }
  });

  const totalWeeks = weeks.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">提交记录</span>
        <span className="text-xs text-muted-foreground">
          {totalContributions} contributions
        </span>
      </div>

      <div className="rounded-xl p-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        {/* Month labels */}
        <div
          className="grid mb-1"
          style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
        >
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="text-[10px] text-muted-foreground"
              style={{ gridColumn: m.col + 1 }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Grid — responsive cells */}
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
        >
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid gap-[2px]" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className="aspect-square rounded-[2px] w-full"
                  title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                  style={{
                    backgroundColor: day.date ? `var(--contrib-${day.level})` : "transparent",
                  }}
                />
              ))}
              {Array.from({ length: 7 - week.length }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square w-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-2">
          <span className="text-[9px] text-muted-foreground mr-0.5">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: `var(--contrib-${level})` }}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-0.5">More</span>
        </div>
      </div>
    </div>
  );
}
