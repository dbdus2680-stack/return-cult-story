import { useEffect, useMemo, useState } from "react";
import type {
  GameState,
  LocalSave,
  PlaytestLastChoice,
  PlaytestNoteCategory,
  PlaytestNotePriority,
  StoryContent,
  StoryEvent,
} from "../../shared/types";
import { conditionMatches } from "../engine/conditions";
import { applyEffect } from "../engine/effects";
import { createInitialState, chooseNextEvent } from "../engine/game";
import { createPlaytestNote, getDeviceId, getPlaytestKey, setPlaytestKey } from "../playtest";

interface Props { content: StoryContent; }

const SAVE_KEY = "return-cult-story.save.v1";
const CATEGORIES: PlaytestNoteCategory[] = ["문장", "선택지", "스토리", "조건/분기", "밸런스", "버그", "아이디어"];
const PRIORITIES: PlaytestNotePriority[] = ["나중에", "수정 필요", "중요"];

type Choice = {
  label: string;
  condition?: string;
  effect: string;
};

function newRunId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `run-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readSave(): LocalSave | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalSave;
    return parsed?.version === 1 && parsed.state ? parsed : null;
  } catch {
    return null;
  }
}

export function PlayerView({ content }: Props) {
  const [state, setState] = useState<GameState | null>(null);
  const [event, setEvent] = useState<StoryEvent | null>(null);
  const [saved, setSaved] = useState<LocalSave | null>(() => readSave());
  const [lastChoice, setLastChoice] = useState<PlaytestLastChoice | null>(null);
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoBody, setMemoBody] = useState("");
  const [memoCategory, setMemoCategory] = useState<PlaytestNoteCategory>("문장");
  const [memoPriority, setMemoPriority] = useState<PlaytestNotePriority>("수정 필요");
  const [testerKey, setTesterKey] = useState(() => getPlaytestKey());
  const [memoStatus, setMemoStatus] = useState("");
  const [memoSending, setMemoSending] = useState(false);

  const character = useMemo(
    () => content.characters.find((c) => c.ID === state?.characterId),
    [content.characters, state?.characterId],
  );

  const savedCharacter = useMemo(
    () => content.characters.find((c) => c.ID === saved?.state.characterId),
    [content.characters, saved?.state.characterId],
  );

  const itemLabels = useMemo(() => new Map(
    content.items.map((item) => [String(item.ID), String(item["아이템명"] ?? item.ID)]),
  ), [content.items]);

  const clueLabels = useMemo(() => new Map(
    content.clues.map((clue) => [String(clue["CLUE ID"]), String(clue["단서 내용"] ?? clue["CLUE ID"])]),
  ), [content.clues]);

  useEffect(() => {
    if (!state) return;
    const nextSave: LocalSave = {
      version: 1,
      contentVersion: content.meta.version,
      savedAt: new Date().toISOString(),
      state,
      eventId: event?.ID ?? null,
      lastChoice,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(nextSave));
    setSaved(nextSave);
  }, [content.meta.version, event, lastChoice, state]);

  function begin(characterId: string) {
    const picked = content.characters.find((c) => c.ID === characterId)!;
    const nextState = { ...createInitialState(picked), runId: newRunId() };
    const nextEvent = chooseNextEvent(content.events, nextState);
    setLastChoice(null);
    setState(nextState);
    setEvent(nextEvent);
  }

  function resume() {
    if (!saved) return;
    const resumedState = saved.state.runId ? saved.state : { ...saved.state, runId: newRunId() };
    const currentEvent = saved.eventId
      ? content.events.find((candidate) => candidate.ID === saved.eventId) ?? null
      : null;
    setLastChoice(saved.lastChoice ?? null);
    setState(resumedState);
    setEvent(currentEvent ?? chooseNextEvent(content.events, resumedState));
  }

  function choose(choice: Choice) {
    if (!state || !event || (choice.condition && !conditionMatches(choice.condition, state))) return;
    const next = applyEffect(choice.effect, state);
    next.history.push(event.ID);
    next.seed = (next.seed + 0x6d2b79f5) >>> 0;
    setLastChoice({ eventId: event.ID, label: choice.label, effect: choice.effect });
    setState(next);
    setEvent(null);
  }

  function advanceDay() {
    if (!state) return;
    const next = { ...state, day: state.day + 1 };
    setState(next);
    setEvent(chooseNextEvent(content.events, next));
  }

  function drawEvent() {
    if (!state) return;
    setEvent(chooseNextEvent(content.events, state));
  }

  function quitToCharacterSelect() {
    setState(null);
    setEvent(null);
    setLastChoice(null);
    setSaved(readSave());
  }

  function eraseSave() {
    localStorage.removeItem(SAVE_KEY);
    setSaved(null);
    setState(null);
    setEvent(null);
    setLastChoice(null);
  }

  async function submitMemo() {
    if (!state || !memoBody.trim()) return;
    if (!testerKey.trim()) {
      setMemoStatus("테스터 코드를 입력해 주세요.");
      return;
    }
    setPlaytestKey(testerKey);
    setMemoSending(true);
    setMemoStatus("서버에 저장 중…");
    try {
      await createPlaytestNote({
        schemaVersion: 1,
        body: memoBody.trim(),
        category: memoCategory,
        priority: memoPriority,
        contentVersion: content.meta.version,
        eventId: event?.ID ?? null,
        characterId: state.characterId,
        worldDay: state.day,
        seed: state.seed,
        runId: state.runId ?? "legacy-run",
        deviceId: getDeviceId(),
        lastChoice,
        stateSnapshot: state,
        eventSnapshot: event,
        clientMeta: {
          path: location.pathname,
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        },
      });
      setMemoStatus("서버 저장 완료");
      setMemoBody("");
      window.setTimeout(() => {
        setMemoOpen(false);
        setMemoStatus("");
      }, 450);
    } catch (error) {
      setMemoStatus(error instanceof Error ? error.message : "메모 저장에 실패했습니다.");
    } finally {
      setMemoSending(false);
    }
  }

  if (!state) {
    return (
      <main className="screen">
        <section className="intro">
          <p className="kicker">한국의 어느 신도시. 학생과 청년들이 하나둘 같은 말을 하기 시작했다.</p>
          <h2>“나 곧 돌아가.”</h2>
          <p>{content.meta.description}</p>
        </section>

        {saved && savedCharacter && (
          <section className="continue-card">
            <div>
              <div className="card-id">자동저장 · DAY {saved.state.day}</div>
              <strong>{savedCharacter.표시명}</strong>
              <p>발생 사건 {saved.state.history.length} · 단서 {saved.state.clues.length}</p>
            </div>
            <div className="continue-actions">
              <button className="primary-action" onClick={resume}>이어하기</button>
              <button className="quiet-action" onClick={eraseSave}>저장 삭제</button>
            </div>
          </section>
        )}

        <section>
          <div className="section-heading">
            <h3>관측자 선택</h3>
            <span>시작 시점과 알고 있는 세계가 달라진다.</span>
          </div>
          <div className="character-grid">
            {content.characters.map((c) => (
              <button
                key={c.ID}
                className={`character-card ${c["초기 선택"] === "숨김" ? "locked" : ""}`}
                onClick={() => c["초기 선택"] !== "숨김" && begin(c.ID)}
                disabled={c["초기 선택"] === "숨김"}
              >
                <div className="card-id">{c.ID} · DAY {c.시작일}</div>
                <strong>{c.표시명}</strong>
                <p>{c["초기 관점"]}</p>
                <small>{c["시작 위치"]}</small>
                <span className="unlock">{c["초기 선택"] === "숨김" ? `잠김 · ${c.해금조건}` : c.해금조건}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const choices: Choice[] = event ? [
    { label: event["선택 A"], condition: event["A 조건"], effect: event["A 결과"] },
    { label: event["선택 B"], condition: event["B 조건"], effect: event["B 결과"] },
    { label: event["선택 C"], condition: event["C 조건"], effect: event["C 결과"] },
  ].filter((choice) => Boolean(choice.label)) : [];

  return (
    <main className="screen player-layout">
      <section className="hud">
        <div>
          <div className="card-id">{character?.표시명}</div>
          <strong>DAY {state.day}</strong>
        </div>
        <div className="hud-stats">
          <span>관찰 {state.stats.STAT_OBS}</span>
          <span>배짱 {state.stats.STAT_NERVE}</span>
          <span>동조 {state.stats.STAT_SYNC}</span>
          <span>스트레스 {state.stats.STAT_STRESS}</span>
        </div>
      </section>

      <section className="story-panel">
        {event ? (
          <>
            <div className="event-meta">
              <span>DAY {state.day}</span><span>{event.장소}</span><span>{event.ID}</span>
            </div>
            <p className="story-text">{event["요약/본문 훅"]}</p>
            <div className="choices">
              {choices.map((choice, idx) => {
                const available = !choice.condition || conditionMatches(choice.condition, state);
                return (
                  <button
                    key={idx}
                    className={`choice ${available ? "" : "choice-locked"}`}
                    onClick={() => available && choose(choice)}
                    disabled={!available}
                  >
                    <span>{choice.label}</span>
                    {!available && <small>조건: {choice.condition}</small>}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="no-event">
            <p>선택의 여파는 당장은 보이지 않는다.</p>
            <button onClick={drawEvent}>조금 더 둘러본다</button>
            <button className="primary-action" onClick={advanceDay}>다음 날로</button>
          </div>
        )}
      </section>

      <aside className="side-card">
        <h4>이번 회차</h4>
        <dl>
          <div><dt>아이템</dt><dd>{state.items.length}</dd></div>
          <div><dt>단서</dt><dd>{state.clues.length}</dd></div>
          <div><dt>경찰 개입</dt><dd>{state.worlds.WORLD_POLICE ?? 0}</dd></div>
          <div><dt>발생 사건</dt><dd>{state.history.length}</dd></div>
        </dl>
        <details>
          <summary>획득 단서</summary>
          <div className="inventory-list">
            {state.clues.length ? state.clues.map((x) => <span key={x}>{clueLabels.get(x) ?? x}</span>) : <em>아직 없음</em>}
          </div>
        </details>
        <details>
          <summary>아이템</summary>
          <div className="inventory-list">
            {state.items.map((x) => <span key={x}>{itemLabels.get(x) ?? x}</span>)}
          </div>
        </details>
        <button className="text-button" onClick={quitToCharacterSelect}>캐릭터 선택으로</button>
      </aside>

      <button className="memo-fab" aria-label="플레이테스트 메모" onClick={() => setMemoOpen(true)}>✎</button>

      {memoOpen && (
        <div className="memo-backdrop" onClick={() => !memoSending && setMemoOpen(false)}>
          <section className="memo-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="memo-head">
              <div><div className="card-id">{event?.ID ?? "BETWEEN_EVENTS"} · DAY {state.day}</div><strong>수정 메모</strong></div>
              <button className="memo-close" onClick={() => !memoSending && setMemoOpen(false)}>×</button>
            </div>
            <textarea autoFocus value={memoBody} onChange={(e) => setMemoBody(e.target.value)} placeholder="걸으면서 바로 적기. 예: 이 선택지 너무 뻔함 / 앞 단서 반응 필요" />
            <div className="memo-grid">
              <label>분류<select value={memoCategory} onChange={(e) => setMemoCategory(e.target.value as PlaytestNoteCategory)}>{CATEGORIES.map((x) => <option key={x}>{x}</option>)}</select></label>
              <label>중요도<select value={memoPriority} onChange={(e) => setMemoPriority(e.target.value as PlaytestNotePriority)}>{PRIORITIES.map((x) => <option key={x}>{x}</option>)}</select></label>
            </div>
            <label className="memo-key">테스터 코드<input type="password" value={testerKey} onChange={(e) => setTesterKey(e.target.value)} placeholder="기기별 1회 입력" /></label>
            <p className="memo-context">v{content.meta.version} · {state.characterId} · seed {state.seed} · 상태/본문/직전선택 자동 첨부</p>
            {memoStatus && <div className="memo-status">{memoStatus}</div>}
            <button className="primary-action memo-submit" disabled={memoSending || !memoBody.trim()} onClick={submitMemo}>{memoSending ? "서버 저장 중…" : "서버에 메모 저장"}</button>
          </section>
        </div>
      )}
    </main>
  );
}
