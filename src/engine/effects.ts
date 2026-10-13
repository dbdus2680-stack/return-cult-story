import type { GameState } from "../../shared/types";

const statAliases: Record<string, string> = {
  관찰: "STAT_OBS",
  말재주: "STAT_TALK",
  배짱: "STAT_NERVE",
  전산: "STAT_TECH",
  기술: "STAT_TECH",
  스트레스: "STAT_STRESS",
  동조도: "STAT_SYNC",
  CULT_TRUST: "REL_CULT",
  교단신뢰: "REL_CULT",
  친구: "REL_FRIEND",
};

function copyState(state: GameState): GameState {
  return {
    ...state,
    stats: { ...state.stats },
    rels: { ...state.rels },
    flags: { ...state.flags },
    knows: { ...state.knows },
    worlds: { ...state.worlds },
    items: [...state.items],
    clues: [...state.clues],
    history: [...state.history],
  };
}

export function applyEffect(effect: string, input: GameState): GameState {
  const state = copyState(input);
  if (!effect || effect === "없음" || effect === "-") return state;

  for (const item of effect.match(/ITEM-\d{3}/g) ?? []) {
    if (!state.items.includes(item)) state.items.push(item);
  }
  for (const clue of effect.match(/CLUE-\d{3}/g) ?? []) {
    if (!state.clues.includes(clue)) state.clues.push(clue);
  }

  for (const token of effect.split(/[;；]/).map((x) => x.trim())) {
    const assignment = token.match(/([A-Z0-9_]+)\s*=\s*(true|false|1|0)/i);
    if (assignment) {
      const [, key, raw] = assignment;
      const value = raw === "1" || raw.toLowerCase() === "true";
      if (key.startsWith("KNOW_")) state.knows[key] = value;
      else if (key.startsWith("FLAG_") || key.startsWith("ACCESS_")) state.flags[key] = value;
      continue;
    }

    const delta = token.match(/([A-Z0-9_]+|관찰|말재주|배짱|전산|기술|스트레스|동조도|교단신뢰|친구)\s*([+-])\s*(\d+)/);
    if (delta) {
      const [, rawKey, sign, amountText] = delta;
      const key = statAliases[rawKey] ?? rawKey;
      const amount = Number(amountText) * (sign === "+" ? 1 : -1);
      if (key.startsWith("STAT_")) state.stats[key] = (state.stats[key] ?? 0) + amount;
      else if (key.startsWith("REL_")) state.rels[key] = (state.rels[key] ?? 0) + amount;
      else state.worlds[key] = (state.worlds[key] ?? 0) + amount;
    }
  }

  return state;
}
