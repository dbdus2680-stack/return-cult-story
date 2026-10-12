import { useMemo, useState } from "react";
import type { GameState, StoryContent, StoryEvent } from "../../shared/types";
import { applyEffect } from "../engine/effects";
import { createInitialState, chooseNextEvent } from "../engine/game";

interface Props { content: StoryContent; }

export function PlayerView({ content }: Props) {
  const [state, setState] = useState<GameState | null>(null);
  const [event, setEvent] = useState<StoryEvent | null>(null);

  const character = useMemo(
    () => content.characters.find((c) => c.ID === state?.characterId),
    [content.characters, state?.characterId],
  );

  function begin(characterId: string) {
    const picked = content.characters.find((c) => c.ID === characterId)!;
    const nextState = createInitialState(picked);
    setState(nextState);
    setEvent(chooseNextEvent(content.events, nextState));
  }

  function choose(_label: string, effect: string) {
    if (!state || !event) return;
    const next = applyEffect(effect, state);
    next.history.push(event.ID);
    next.seed = (next.seed + 0x6d2b79f5) >>> 0;
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

  if (!state) {
    return (
      <main className="screen">
        <section className="intro">
          <p className="kicker">한국의 어느 신도시. 학생과 청년들이 하나둘 같은 말을 하기 시작했다.</p>
          <h2>“나 곧 돌아가.”</h2>
          <p>{content.meta.description}</p>
        </section>
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
              <span>{event.ID}</span><span>{event.장소}</span><span>{event["풀/분류"]}</span>
            </div>
            <p className="story-text">{event["요약/본문 훅"]}</p>
            <div className="choices">
              {[
                [event["선택 A"], event["A 결과"]],
                [event["선택 B"], event["B 결과"]],
                [event["선택 C"], event["C 결과"]],
              ].filter(([label]) => label).map(([label, result], idx) => (
                <button key={idx} className="choice" onClick={() => choose(label, result)}>
                  <span>{label}</span>
                  <small>{result}</small>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="no-event">
            <p>지금 당장 눈에 띄는 사건은 없다.</p>
            <button onClick={drawEvent}>주변을 살핀다</button>
            <button onClick={advanceDay}>다음 날로</button>
          </div>
        )}
      </section>

      <aside className="side-card">
        <h4>이번 회차</h4>
        <dl>
          <div><dt>아이템</dt><dd>{state.items.length || 0}</dd></div>
          <div><dt>단서</dt><dd>{state.clues.length}</dd></div>
          <div><dt>경찰 개입</dt><dd>{state.worlds.WORLD_POLICE ?? 0}</dd></div>
          <div><dt>발생 사건</dt><dd>{state.history.length}</dd></div>
        </dl>
        <details>
          <summary>획득 단서</summary>
          <div className="chip-list">{state.clues.map((x) => <span key={x}>{x}</span>)}</div>
        </details>
        <details>
          <summary>아이템</summary>
          <div className="chip-list">{state.items.map((x) => <span key={x}>{x}</span>)}</div>
        </details>
        <button className="text-button" onClick={() => { setState(null); setEvent(null); }}>캐릭터 선택으로</button>
      </aside>
    </main>
  );
}
