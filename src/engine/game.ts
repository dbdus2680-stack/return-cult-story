import type { GameState, StoryCharacter, StoryEvent } from "../../shared/types";
import { eventEligible } from "./conditions";
import { nextRandom } from "./rng";

function splitInitialItems(text: string): string[] {
  return text.split(/[;,]/).map((x) => x.trim()).filter(Boolean);
}

function parseInitialRel(text: string): Record<string, number> {
  const rels: Record<string, number> = { REL_FRIEND: 0, REL_CULT: 0, REL_POLICE: 0, REL_RESEARCHER: 0 };
  for (const part of text.split(/[;,]/)) {
    const m = part.trim().match(/(.+?)\s*([+-])\s*(\d+)/);
    if (!m) continue;
    const [, label, sign, amount] = m;
    const map: Record<string, string> = {
      친구: "REL_FRIEND",
      교단: "REL_CULT",
      경찰: "REL_POLICE",
      연구팀: "REL_RESEARCHER",
    };
    const key = map[label.trim()];
    if (key) rels[key] = Number(amount) * (sign === "+" ? 1 : -1);
  }
  return rels;
}

export function createInitialState(character: StoryCharacter): GameState {
  return {
    characterId: character.ID,
    day: Number(character.시작일),
    seed: (Date.now() ^ Number(character.ID.replace(/\D/g, ""))) >>> 0,
    stats: {
      STAT_OBS: 1,
      STAT_TALK: 1,
      STAT_NERVE: 1,
      STAT_TECH: 0,
      STAT_STRESS: 2,
      STAT_SYNC: character.ID === "PC-003" ? 5 : 0,
    },
    rels: parseInitialRel(character["초기 REL"]),
    flags: {},
    knows: {},
    worlds: { WORLD_POLICE: 0, WORLD_TECH_ALERT: 0, WORLD_SEARCH: 0 },
    items: splitInitialItems(character["초기 ITEM"]),
    clues: [],
    history: [],
  };
}

export function chooseNextEvent(events: StoryEvent[], state: GameState): StoryEvent | null {
  const eligible = events.filter((event) => eventEligible(event, state));
  if (!eligible.length) return null;

  const priorityWeight = (event: StoryEvent) =>
    event.우선도 === "HIGH" ? 5 : event.우선도 === "MED" ? 2 : 1;

  const expanded = eligible.flatMap((event) => Array(priorityWeight(event)).fill(event));
  const [value] = nextRandom(state.seed);
  return expanded[Math.floor(value * expanded.length)] ?? eligible[0];
}
