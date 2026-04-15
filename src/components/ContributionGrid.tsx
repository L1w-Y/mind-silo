"use client";

import { ContributionDay } from "@/lib/github";

interface ContributionGridProps {
  contributions: ContributionDay[];
}

export function ContributionGrid({ contributions }: ContributionGridProps) {
  // 按周分组（和 GitHub 一样，每列是一周，从周日开始）
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  if (contributions.length > 0) {
    // 填充第一周开头的空白天
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
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);

  // 动态生成月份标签（根据实际数据）
  const monthLabels: { label: string; col: number }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    // 找到该周第一个有日期的天
    const firstValidDay = week.find((d) => d.date);
    if (firstValidDay) {
      const month = new Date(firstValidDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: monthNames[month], col: i });
        lastMonth = month;
      }
    }
  });

  const COLORS = [
    "var(--contrib-0)",
    "var(--contrib-1)",
    "var(--contrib-2)",
    "var(--contrib-3)",
    "var(--contrib-4)",
  ];

  const cellSize = 10;
  const cellGap = 3;
  const gridWidth = weeks.length * (cellSize + cellGap);
  const gridHeight = 7 * (cellSize + cellGap);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-500 dark:text-gray-400">提交记录</span>
        <span className="font-medium text-[var(--foreground)]">
          {totalContributions} contributions
        </span>
      </div>

      {/* SVG 网格 - 自适应宽度 */}
      <div className="w-full overflow-x-auto">
        <svg
          width={gridWidth}
          height={gridHeight + 16}
          viewBox={`0 0 ${gridWidth} ${gridHeight + 16}`}
          style={{ maxWidth: "100%" }}
        >
          {/* 月份标签 */}
          {monthLabels.map(({ label, col }) => (
            <text
              key={`${label}-${col}`}
              x={col * (cellSize + cellGap)}
              y={10}
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="10"
            >
              {label}
            </text>
          ))}

          {/* 贡献格子 */}
          {weeks.map((week, weekIdx) =>
            week.map((day, dayIdx) => (
              <rect
                key={`${weekIdx}-${dayIdx}`}
                x={weekIdx * (cellSize + cellGap)}
                y={dayIdx * (cellSize + cellGap) + 14}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={day.date ? COLORS[day.level] : "transparent"}
              >
                {day.date && (
                  <title>{`${day.count} contributions on ${day.date}`}</title>
                )}
              </rect>
            ))
          )}
        </svg>
      </div>

      {/* 图例 */}
      <div className="flex items-center justify-end gap-1 text-xs text-gray-400 dark:text-gray-500">
        <span>Less</span>
        {COLORS.map((color, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
