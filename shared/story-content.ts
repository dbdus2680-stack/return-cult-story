import truths1 from "./data/truths-1.json";
import truths2 from "./data/truths-2.json";
import characters from "./data/characters.json";
import anchors from "./data/anchors.json";
import events1 from "./data/events-1.json";
import events2 from "./data/events-2.json";
import events3 from "./data/events-3.json";
import events4 from "./data/events-4.json";
import clues1 from "./data/clues-1.json";
import clues2 from "./data/clues-2.json";
import items from "./data/items.json";
import stateDefinitions from "./data/states.json";
import endings from "./data/endings.json";
import locations from "./data/locations.json";
import type { StoryContent } from "./types";

export const storyContent: StoryContent = {
  meta: {
    title: "귀향회",
    version: "0.1.0",
    source: "귀향회_스토리마스터_v0.1.xlsx",
    description: "한국 신도시의 사이비 종교를 추적하다 이계 차원기술의 진실과 마주하는 선택형 스토리 게임 초안",
  },
  truths: [...truths1, ...truths2] as StoryContent["truths"],
  characters: characters as StoryContent["characters"],
  anchors: anchors as StoryContent["anchors"],
  events: [...events1, ...events2, ...events3, ...events4] as StoryContent["events"],
  clues: [...clues1, ...clues2] as StoryContent["clues"],
  items: items as StoryContent["items"],
  stateDefinitions: stateDefinitions as StoryContent["stateDefinitions"],
  endings: endings as StoryContent["endings"],
  locations: locations as StoryContent["locations"],
};

export default storyContent;
