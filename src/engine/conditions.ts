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

export function conditionMatches(condition: string, state: GameState): boolean {
  if (!condition || condition === "-" || condition === "없음") return true;

  const pcIds = condition.match(/PC-\d{3}/g);
  if (pcIds && !pcIds.includes(state.characterId)) return false;

  for (const match of condition.matchAll(/([A-Z_]+|관찰|말재주|배짱|전산|기술|스트레스|동조도)\s*(>=|<=|=|>|<)\s*(-?\d+)/g)) {
    const [, rawKey, op, rawValue] = match;
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
  if (condition.includes("KNOW_GATE_REAL=1") && !state.knows.KNOW_GATE_REAL) return false;
  if (condition.includes("KNOW_EXPERIMENT=1") && !state.knows.KNOW_EXPERIMENT) return false;
  if (condition.includes("ACCESS_GATE_SITE=1") && !state.flags.ACCESS_GATE_SITE) return false;
  if (condition.includes("ACCESS_CONTROL_ROOM=1") && !state.flags.ACCESS_CONTROL_ROOM) return false;

  return true;
}

export function eventEligible(event: StoryEvent, state: GameState): boolean {
  return !state.history.includes(event.ID)
    && dayMatches(event["세계일 범위"], state.day)
    && conditionMatches(event.발생조건, state);
}
