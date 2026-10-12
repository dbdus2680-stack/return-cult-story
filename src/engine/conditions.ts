import type { GameState, StoryEvent } from "../../shared/types";

const aliases: Record<string, string> = {
  관찰: "STAT_OBS",
  말재주: "STAT_TALK",
  배짱: "STAT_NERVE",
  전산: "STAT_TECH",
  기술: "STAT_TECH",
  스트레스: "STAT_STRESS",
  동조도: "STAT_SYNC",
  CULT_TRUST: "REL_CULT",
};

export function dayMatches(range: string, day: number): boolean {
  const exact = Number(range);
  if (Number.isFinite(exact)) return day === exact;
  const match = range.match(/(-?\d+)\s*~\s*(-?\d+)/);
  if (!match) return true;
  const [, a, b] = match;
  return day >= Number(a) && day <= Number(b);
}

function numericValue(state: GameState, key: string): number {
  const id = aliases[key] ?? key;
  return state.stats[id] ?? state.rels[id] ?? state.worlds[id] ?? 0;
}

function booleanValue(state: GameState, key: string): boolean {
  if (key.startsWith("KNOW_")) return Boolean(state.knows[key]);
  if (key.startsWith("FLAG_") || key.startsWith("ACCESS_")) return Boolean(state.flags[key]);
  return false;
}

function characterIds(condition: string): string[] {
  const ids = condition.match(/PC-\d{3}/g) ?? [];
  for (const match of condition.matchAll(/PC-(\d{3})\s*\/\s*(\d{3})/g)) {
    ids.push(`PC-${match[1]}`, `PC-${match[2]}`);
  }
  return [...new Set(ids)];
}

function atomMatches(condition: string, state: GameState): boolean {
  const pcIds = characterIds(condition);
  if (pcIds.length && !pcIds.includes(state.characterId)) return false;

  for (const match of condition.matchAll(/((?:KNOW|FLAG|ACCESS)_[A-Z0-9_]+)\s*=\s*(true|false|1|0)/gi)) {
    const [, key, rawValue] = match;
    const expected = rawValue === "1" || rawValue.toLowerCase() === "true";
    if (booleanValue(state, key) !== expected) return false;
  }

  for (const match of condition.matchAll(/([A-Z_]+|관찰|말재주|배짱|전산|기술|스트레스|동조도)\s*(>=|<=|=|>|<)\s*(-?\d+)/g)) {
    const [, rawKey, op, rawValue] = match;
    if (rawKey.startsWith("KNOW_") || rawKey.startsWith("FLAG_") || rawKey.startsWith("ACCESS_")) continue;
    const left = numericValue(state, rawKey);
    const right = Number(rawValue);
    if (op === ">=" && !(left >= right)) return false;
    if (op === "<=" && !(left <= right)) return false;
    if (op === ">" && !(left > right)) return false;
    if (op === "<" && !(left < right)) return false;
    if (op === "=" && !(left === right)) return false;
  }

  for (const clue of condition.match(/CLUE-\d{3}/g) ?? []) {
    if (!state.clues.includes(clue)) return false;
  }
  for (const item of condition.match(/ITEM-\d{3}/g) ?? []) {
    if (!state.items.includes(item)) return false;
  }

  return true;
}

export function conditionMatches(condition: string, state: GameState): boolean {
  const normalized = condition?.trim();
  if (!normalized || normalized === "-" || normalized === "없음") return true;

  const orGroups = normalized.split(/\s*(?:또는|\|\|)\s*/).filter(Boolean);
  if (orGroups.length > 1) return orGroups.some((group) => conditionMatches(group, state));

  const andGroups = normalized.split(/\s*(?:그리고|&&|&)\s*/).filter(Boolean);
  if (andGroups.length > 1) return andGroups.every((group) => conditionMatches(group, state));

  return atomMatches(normalized, state);
}

export function eventEligible(event: StoryEvent, state: GameState): boolean {
  return !state.history.includes(event.ID)
    && dayMatches(event["세계일 범위"], state.day)
    && conditionMatches(event.발생조건, state);
}
