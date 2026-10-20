export interface XpItem {
  id: string;
  xp: number;
}

/** Sum of XP for the items whose ids are in `solved`. */
export function earnedXp(
  items: readonly XpItem[],
  solved: ReadonlySet<string>,
): number {
  return items.reduce(
    (sum, item) => (solved.has(item.id) ? sum + item.xp : sum),
    0,
  );
}

/** Maximum XP available across `items`. */
export function totalXp(items: readonly XpItem[]): number {
  return items.reduce((sum, item) => sum + item.xp, 0);
}

/**
 * Parses a stored list of solved ids, keeping only ids that still exist.
 * Invalid or stale data yields an empty set instead of throwing.
 */
export function parseSolved(
  raw: string | null,
  items: readonly XpItem[],
): Set<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    const known = new Set(items.map((item) => item.id));
    return new Set(
      parsed.filter(
        (id): id is string => typeof id === "string" && known.has(id),
      ),
    );
  } catch {
    return new Set();
  }
}
