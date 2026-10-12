import { useMemo, useState } from "react";
import type { StoryContent } from "../../shared/types";

type Tab = "dashboard" | "timeline" | "events" | "characters" | "truths";

interface Props {
  content: StoryContent;
  counts: { characters: number; events: number; clues: number; endings: number };
}

export function AdminView({ content, counts }: Props) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");

  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return content.events;
    return content.events.filter((e) =>
      [e.ID, e["풀/분류"], e.장소, e["요약/본문 훅"], e["관련 TRUTH"], e["관련 CLUE"]]
        .some((v) => String(v ?? "").toLowerCase().includes(q)),
    );
  }, [content.events, query]);

  return (
    <main className="admin-shell">
      <nav className="admin-nav">
        {[
          ["dashboard", "대시보드"],
          ["timeline", "타임라인"],
          ["events", "사건 DB"],
          ["characters", "캐릭터"],
          ["truths", "진실/단서"],
        ].map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key as Tab)}>{label}</button>
        ))}
      </nav>

      <section className="admin-content">
        {tab === "dashboard" && (
          <>
            <div className="section-heading"><h2>스토리 관리</h2><span>현재 v{content.meta.version} · 읽기 전용 초기 이관본</span></div>
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
            <div className="admin-card warning">
              <strong>현재 관리자 편집은 잠겨 있음</strong>
              <p>Cloudflare Access와 D1이 연결되기 전에는 서버 쓰기 API를 열지 않는다. 로컬 플레이와 데이터 검토만 가능하다.</p>
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
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}
