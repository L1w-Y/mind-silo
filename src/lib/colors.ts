// Card color palette — 8 soft colors inspired by Notion/Craft
export const CARD_COLORS = {
  red:    { border: "#e8846b", bg: "#fdf2ef", darkBg: "#2a1a15" },
  orange: { border: "#d9903e", bg: "#fdf5ed", darkBg: "#2a2015" },
  yellow: { border: "#c4a83b", bg: "#fbf8ef", darkBg: "#252012" },
  green:  { border: "#5ba67c", bg: "#eef6f1", darkBg: "#12201a" },
  teal:   { border: "#4da8a0", bg: "#eef7f6", darkBg: "#122020" },
  blue:   { border: "#5b8fc9", bg: "#eff4fb", darkBg: "#121a25" },
  purple: { border: "#9b7ec8", bg: "#f4f0fa", darkBg: "#1a1525" },
  pink:   { border: "#d47da0", bg: "#fbf0f4", darkBg: "#251520" },
} as const;

export type CardColorName = keyof typeof CARD_COLORS;

const COLOR_NAMES = Object.keys(CARD_COLORS) as CardColorName[];

// Hash a string to a consistent color
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get card color by:
 * 1. Manual color override (if set)
 * 2. First tag auto-mapping
 * 3. Default blue
 */
export function getCardColor(manualColor?: string | null, tags?: string[]): {
  name: CardColorName;
  border: string;
  bg: string;
  darkBg: string;
} {
  // Manual override
  if (manualColor && manualColor in CARD_COLORS) {
    const c = CARD_COLORS[manualColor as CardColorName];
    return { name: manualColor as CardColorName, ...c };
  }

  // Auto from first tag
  if (tags && tags.length > 0) {
    const idx = hashString(tags[0]) % COLOR_NAMES.length;
    const name = COLOR_NAMES[idx];
    return { name, ...CARD_COLORS[name] };
  }

  // Default
  return { name: "blue", ...CARD_COLORS.blue };
}

/**
 * Card width class mapping
 */
export function getCardWidthClass(width?: string): string {
  switch (width) {
    case "full": return "col-span-12";
    case "half": return "col-span-6";
    case "third": return "col-span-4";
    default: return "col-span-6";
  }
}
