export interface StoryMeta {
  title: string;
  version: string;
  source: string;
  description: string;
}

export interface StoryCharacter {
  ID: string;
  표시명: string;
  "초기 선택": string;
  해금조건: string;
  "나이/상태": number | string;
  시작일: number;
  "시작 위치": string;
  "초기 관점": string;
  "초기 KNOW": string;
  "초기 REL": string;
  "초기 ITEM": string;
  강점: string;
  약점: string;
  "전용 사건": string;
  "1부 역할": string;
  "2부 연결": string;
}

export interface StoryEvent {
  ID: string;
  "세계일 범위": string;
  "풀/분류": string;
  장소: string;
  우선도: string;
  발생조건: string;
  "요약/본문 훅": string;
  "선택 A": string;
  "A 조건"?: string;
  "A 반응"?: string;
  "A 결과": string;
  "선택 B": string;
  "B 조건"?: string;
  "B 반응"?: string;
  "B 결과": string;
  "선택 C": string;
  "C 조건"?: string;
  "C 반응"?: string;
  "C 결과": string;
  "선택 D"?: string;
  "D 조건"?: string;
  "D 반응"?: string;
  "D 결과"?: string;
  "관련 TRUTH": string;
  "관련 CLUE": string;
  "후속/재등장": string;
  상태: string;
}

export interface StoryContent {
  meta: StoryMeta;
  truths: Record<string, unknown>[];
  characters: StoryCharacter[];
  anchors: Record<string, unknown>[];
  events: StoryEvent[];
  clues: Record<string, unknown>[];
  items: Record<string, unknown>[];
  stateDefinitions: Record<string, unknown>[];
  endings: Record<string, unknown>[];
  locations: Record<string, unknown>[];
}

export interface GameState {
  characterId: string;
  day: number;
  seed: number;
  runId?: string;
  stats: Record<string, number>;
  rels: Record<string, number>;
  flags: Record<string, boolean>;
  knows: Record<string, boolean>;
  worlds: Record<string, number>;
  items: string[];
  clues: string[];
  history: string[];
}

export interface PlaytestLastChoice {
  eventId: string;
  label: string;
  effect: string;
}

export interface LocalSave {
  version: 1;
  contentVersion: string;
  savedAt: string;
  state: GameState;
  eventId: string | null;
  lastChoice?: PlaytestLastChoice | null;
}

export type PlaytestNoteCategory = "문장" | "선택지" | "스토리" | "조건/분기" | "밸런스" | "버그" | "아이디어";
export type PlaytestNotePriority = "나중에" | "수정 필요" | "중요";
export type PlaytestNoteStatus = "open" | "applied" | "wontfix";

export interface PlaytestNoteDraft {
  schemaVersion: 1;
  body: string;
  category: PlaytestNoteCategory;
  priority: PlaytestNotePriority;
  contentVersion: string;
  eventId: string | null;
  characterId: string;
  worldDay: number;
  seed: number;
  runId: string;
  deviceId: string;
  lastChoice: PlaytestLastChoice | null;
  stateSnapshot: GameState;
  eventSnapshot: StoryEvent | null;
  clientMeta: {
    path: string;
    userAgent: string;
    viewport: string;
  };
}

export interface PlaytestNoteRecord extends PlaytestNoteDraft {
  id: string;
  status: PlaytestNoteStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}
