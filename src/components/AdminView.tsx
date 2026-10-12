import { useEffect, useMemo, useState } from "react";
import type { PlaytestNoteRecord, PlaytestNoteStatus, StoryContent } from "../../shared/types";
import { getPlaytestKey, listPlaytestNotes, notesToBatchText, setPlaytestKey, updatePlaytestNoteStatus } from "../playtest";

type Tab = "dashboard" | "timeline" | "events" | "characters" | "truths" | "notes";

interface Props {
  content: StoryContent;
  counts: { characters: number; events: number; clues: number; endings: number };
}

export function AdminView({ content, counts }: Props) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<PlaytestNoteRecord[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState("");
  const [testerKey, setTesterKeyValue] = useState(() => getPlaytestKey());
  const [noteFilter, setNoteFilter] = useState<"open" | "all">("open");
  const [copyStatus, setCopyStatus] = useState("");

  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return content.events;
    return content.events.filter((e) =>
      [e.ID, e["풀/분류"], e.장소, e["요약/본문 훅"], e["관련 TRUTH"], e["관련 CLUE"]]
        .some((v) => String(v ?? "").toLowerCase().includes(q)),
    );
  }, [content.events, query]);

  const visibleNotes = useMemo(
    () => noteFilter === "open" ? notes.filter((note) => note.status === "open") : notes,
    [noteFilter, notes],
  );

  async function refreshNotes() {
    if (testerKey.trim()) setPlaytestKey(testerKey);
    setNotesLoading(true);
    setNotesError("");
    try {
      setNotes(await listPlaytestNotes());
    } catch (error) {
      setNotesError(error instanceof Error ? error.message : "메모를 불러오지 못했습니다.");
    } finally {
      setNotesLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "notes" && testerKey.trim() && notes.length === 0) void refreshNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function changeNoteStatus(id: string, status: PlaytestNoteStatus) {
    try {
      await updatePlaytestNoteStatus(id, status);
      setNotes((current) => current.map((note) => note.id === id
        ? { ...note, status, resolvedAt: status === "open" ? null : new Date().toISOString() }
        : note));
    } catch (error) {
      setNotesError(error instanceof Error ? error.message : "상태 변경 실패");
    }
  }

  async function copyNotes() {
    const target = visibleNotes;
    if (!target.length) return;
    await navigator.clipboard.writeText(notesToBatchText(target));
    setCopyStatus(`${target.length}개 메모 복사 완료`);
    window.setTimeout(() => setCopyStatus(""), 1400);
  }

  return (
    <main className="admin-shell">
      <nav className="admin-nav">
        {[
          ["dashboard", "대시보드"],
          ["timeline", "타임라인"],
          ["events", "사건 DB"],
          ["characters", "캐릭터"],
          ["truths", "진실/단서"],
          ["notes", `플레이메모${notes.filter((n) => n.status === "open").length ? ` ${notes.filter((n) => n.status === "open").length}` : ""}`],
        ].map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key as Tab)}>{label}</button>
        ))}
      </nav>

      <section className="admin-content">
        {tab === "dashboard" && (
          <>
            <div className="section-heading"><h2>스토리 관리</h2><span>현재 v{content.meta.version} · 읽기 전용 스토리 원본</span></div>
            <div className="metric-grid">
              <Metric label="플레이 캐릭터" value={counts.characters} />
              <Metric label="사건 카드" value={counts.events} />
              <Metric label="단서" value={counts.clues} />
              <Metric label="엔딩" value={counts.endings} />
            </div>
            <div className="admin-card">
              <h3>설계 원칙</h3>
              <p>메인 앵커는 고정하고, 캐릭터의 시작일·관계·지식·아이템이 같은 사건의 의미를 바꾸도록 관리한다.</p>
              <div className="pipeline">CHARACTER → DAY → EVENT POOL → CONDITION → CHOICE → STATE → NEXT EVENT</div>
            </div>
            <div className="admin-card">
              <strong>플레이테스트 메모는 별도 서버 원본</strong>
              <p>모바일에서 작성한 메모는 D1에 저장하고, 콘텐츠 버전·당시 사건·GameState·Seed·직전 선택을 함께 보관한다. 스토리 원본 편집 API는 계속 잠가 둔다.</p>
            </div>
          </>
        )}

        {tab === "timeline" && (
          <div className="timeline">
            {content.anchors.map((a) => (
              <article key={String(a["ANCHOR ID"])} className="timeline-row">
                <div className="day-marker">DAY {String(a["세계일"])}</div>
                <div>
                  <div className="card-id">{String(a["ANCHOR ID"])} · {String(a["구간"])}</div>
                  <h3>{String(a["앵커 사건"])}</h3>
                  <p>{String(a["PC-001 관점"])}</p>
                  <small>{String(a["핵심 진실"])}</small>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "events" && (
          <>
            <div className="section-heading">
              <h2>사건 DB</h2>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ID, 장소, 본문, 단서 검색" />
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>DAY</th><th>분류</th><th>장소</th><th>훅</th><th>조건</th><th>단서</th></tr></thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.ID}>
                      <td><code>{e.ID}</code></td>
                      <td>{e["세계일 범위"]}</td>
                      <td>{e["풀/분류"]}</td>
                      <td>{e.장소}</td>
                      <td className="wide">{e["요약/본문 훅"]}</td>
                      <td>{e.발생조건}</td>
                      <td>{e["관련 CLUE"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "characters" && (
          <div className="character-admin-grid">
            {content.characters.map((c) => (
              <article className="admin-card" key={c.ID}>
                <div className="card-id">{c.ID} · START DAY {c.시작일}</div>
                <h3>{c.표시명}</h3>
                <p>{c["초기 관점"]}</p>
                <dl className="mini-dl">
                  <div><dt>위치</dt><dd>{c["시작 위치"]}</dd></div>
                  <div><dt>지식</dt><dd>{c["초기 KNOW"]}</dd></div>
                  <div><dt>아이템</dt><dd>{c["초기 ITEM"]}</dd></div>
                  <div><dt>해금</dt><dd>{c.해금조건}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        )}

        {tab === "truths" && (
          <div className="truth-grid">
            {content.truths.map((t) => (
              <article className="admin-card" key={String(t.ID)}>
                <div className="card-id">{String(t.ID)} · {String(t["분류"])}</div>
                <h3>{String(t["절대진실(작가용)"])}</h3>
                <p><b>표면:</b> {String(t["초기 오해/표면설명"])}</p>
                <small>1부 {String(t["1부 공개수준"])} / 2부 {String(t["2부 공개수준"])}</small>
              </article>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <>
            <div className="section-heading note-heading">
              <div><h2>플레이테스트 메모</h2><span>모든 기기의 서버 메모를 한 번에 검토·복사</span></div>
              <div className="note-tools">
                <input type="password" value={testerKey} onChange={(e) => setTesterKeyValue(e.target.value)} placeholder="테스터 코드" />
                <button onClick={refreshNotes} disabled={notesLoading}>{notesLoading ? "불러오는 중" : "새로고침"}</button>
                <button onClick={copyNotes} disabled={!visibleNotes.length}>반영용 텍스트 복사</button>
              </div>
            </div>
            <div className="note-filter">
              <button className={noteFilter === "open" ? "active" : ""} onClick={() => setNoteFilter("open")}>미반영 {notes.filter((n) => n.status === "open").length}</button>
              <button className={noteFilter === "all" ? "active" : ""} onClick={() => setNoteFilter("all")}>전체 {notes.length}</button>
              {copyStatus && <span>{copyStatus}</span>}
            </div>
            {notesError && <div className="admin-card warning">{notesError}</div>}
            <div className="note-list">
              {visibleNotes.map((note) => (
                <article className={`note-card priority-${note.priority.replace(/\s/g, "-")}`} key={note.id}>
                  <div className="note-card-head">
                    <div>
                      <div className="card-id">{note.eventId ?? "BETWEEN_EVENTS"} · DAY {note.worldDay} · v{note.contentVersion}</div>
                      <strong>{note.category} · {note.priority}</strong>
                    </div>
                    <span className={`note-status status-${note.status}`}>{note.status}</span>
                  </div>
                  <p className="note-body">{note.body}</p>
                  <div className="note-context">{note.characterId} · seed {note.seed} · device {note.deviceId.slice(0, 8)} · {new Date(note.createdAt).toLocaleString()}</div>
                  {note.eventSnapshot && <details><summary>당시 화면</summary><p>{note.eventSnapshot["요약/본문 훅"]}</p></details>}
                  <details><summary>재현 정보</summary><pre>{JSON.stringify({ lastChoice: note.lastChoice, state: note.stateSnapshot }, null, 2)}</pre></details>
                  <div className="note-actions">
                    {note.status !== "applied" && <button onClick={() => changeNoteStatus(note.id, "applied")}>반영 완료</button>}
                    {note.status !== "wontfix" && <button onClick={() => changeNoteStatus(note.id, "wontfix")}>보류/미반영</button>}
                    {note.status !== "open" && <button onClick={() => changeNoteStatus(note.id, "open")}>다시 열기</button>}
                  </div>
                </article>
              ))}
              {!notesLoading && !visibleNotes.length && <div className="admin-card"><p>표시할 메모가 없습니다.</p></div>}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}
