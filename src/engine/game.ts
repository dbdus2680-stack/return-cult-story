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

function parseInitialKnow(character: StoryCharacter): Record<string, boolean> {
  const text = character["초기 KNOW"];
  const knows: Record<string, boolean> = {};
  if (/귀향회/.test(text)) knows.KNOW_CULT = true;
  if (/대귀환/.test(text)) knows.KNOW_GREAT_RETURN = true;
  if (/차원|게이트/.test(text) && !/게이트=모름/.test(text)) knows.KNOW_GATE_REAL = true;
  if (/기술 대부분 앎/.test(text)) {
    knows.KNOW_TECH_ORIGIN = true;
    knows.KNOW_EXPERIMENT = true;
  }
  return knows;
}

export function createInitialState(character: StoryCharacter, seed?: number): GameState {
  return {
    characterId: character.ID,
    day: Number(character.시작일),
    seed: seed ?? ((Date.now() ^ Number(character.ID.replace(/\D/g, ""))) >>> 0),
    stats: {
      STAT_OBS: character.ID === "PC-001" ? 2 : 1,
      STAT_TALK: character.ID === "PC-002" ? 2 : 1,
      STAT_NERVE: character.ID === "PC-004" ? 2 : 1,
      STAT_TECH: character.ID === "PC-005" ? 4 : 0,
      STAT_STRESS: 2,
      STAT_SYNC: character.ID === "PC-003" ? 5 : 0,
    },
    rels: parseInitialRel(character["초기 REL"]),
    flags: {},
    knows: parseInitialKnow(character),
    worlds: { WORLD_POLICE: 0, WORLD_TECH_ALERT: 0, WORLD_SEARCH: 0, CULT_ACCESS: 0 },
    items: splitInitialItems(character["초기 ITEM"]),
    clues: [],
    history: [],
  };
}

function isExactDay(range: string, day: number): boolean {
  const exact = Number(range);
  return Number.isFinite(exact) && exact === day;
}

function isAnchorLike(event: StoryEvent): boolean {
  const category = event["풀/분류"];
  return category.includes("메인") || category.includes("앵커");
}

export function chooseNextEvent(events: StoryEvent[], state: GameState): StoryEvent | null {
  const eligible = events.filter((event) => eventEligible(event, state));
  if (!eligible.length) return null;

  // 같은 날짜의 핵심 사건은 랜덤 사건보다 먼저 보여 준다.
  // 분기는 넓게 열어 두되 세계의 시간축은 놓치지 않게 하는 장치다.
  const anchors = eligible
    .filter((event) => isExactDay(event["세계일 범위"], state.day) && isAnchorLike(event))
    .sort((a, b) => a.ID.localeCompare(b.ID));
  if (anchors.length) return anchors[0];

  const priorityWeight = (event: StoryEvent) =>
    event.우선도 === "HIGH" ? 5 : event.우선도 === "MED" ? 2 : 1;

  const expanded = eligible.flatMap((event) => Array(priorityWeight(event)).fill(event));
  const [value] = nextRandom(state.seed);
  return expanded[Math.floor(value * expanded.length)] ?? eligible[0];
}
