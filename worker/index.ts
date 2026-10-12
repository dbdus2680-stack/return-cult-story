import seedContent from "../shared/story-content";
import type { PlaytestNoteDraft, PlaytestNoteRecord, PlaytestNoteStatus, StoryContent } from "../shared/types";

interface D1Result<T = unknown> { results?: T[]; }
interface D1PreparedStatementLike {
  bind(...values: unknown[]): D1PreparedStatementLike;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
interface D1DatabaseLike { prepare(query: string): D1PreparedStatementLike; }
interface Env { DB?: D1DatabaseLike; PLAYTEST_KEY?: string; }

const NOTE_STATUSES = new Set<PlaytestNoteStatus>(["open", "applied", "wontfix"]);

async function loadFromDb(db: D1DatabaseLike): Promise<StoryContent | null> {
  try {
    const tables = ["truths", "characters", "anchors", "events", "clues", "items", "state_definitions", "endings", "locations"] as const;
    const loaded: Record<string, unknown[]> = {};
    for (const table of tables) {
      const response = await db.prepare(`SELECT data_json FROM ${table} ORDER BY sort_order, id`).all<{ data_json: string }>();
      loaded[table] = (response.results ?? []).map((row) => JSON.parse(row.data_json));
    }
    if (!loaded.events?.length) return null;
    return {
      ...seedContent,
      truths: loaded.truths as StoryContent["truths"],
      characters: loaded.characters as StoryContent["characters"],
      anchors: loaded.anchors as StoryContent["anchors"],
      events: loaded.events as StoryContent["events"],
      clues: loaded.clues as StoryContent["clues"],
      items: loaded.items as StoryContent["items"],
      stateDefinitions: loaded.state_definitions as StoryContent["stateDefinitions"],
      endings: loaded.endings as StoryContent["endings"],
      locations: loaded.locations as StoryContent["locations"],
    };
  } catch {
    return null;
  }
}

async function ensurePlaytestTable(db: D1DatabaseLike): Promise<void> {
  await db.prepare(`CREATE TABLE IF NOT EXISTS playtest_notes (
    id TEXT PRIMARY KEY,
    schema_version INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'open',
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    body TEXT NOT NULL,
    content_version TEXT NOT NULL,
    event_id TEXT,
    character_id TEXT NOT NULL,
    world_day INTEGER NOT NULL,
    seed INTEGER NOT NULL,
    run_id TEXT NOT NULL,
    device_id TEXT NOT NULL,
    last_choice_json TEXT,
    state_snapshot_json TEXT NOT NULL,
    event_snapshot_json TEXT,
    client_meta_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TEXT
  )`).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_playtest_notes_status ON playtest_notes(status, created_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_playtest_notes_event ON playtest_notes(event_id, created_at DESC)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_playtest_notes_version ON playtest_notes(content_version, created_at DESC)").run();
}

function authorized(request: Request, env: Env): boolean {
  return Boolean(env.PLAYTEST_KEY) && request.headers.get("X-Playtest-Key") === env.PLAYTEST_KEY;
}

function noteServiceUnavailable(env: Env): Response | null {
  if (!env.DB) return Response.json({ error: "D1 DB가 아직 연결되지 않았습니다." }, { status: 503 });
  if (!env.PLAYTEST_KEY) return Response.json({ error: "PLAYTEST_KEY 서버 시크릿이 아직 설정되지 않았습니다." }, { status: 503 });
  return null;
}

function rowToNote(row: Record<string, unknown>): PlaytestNoteRecord {
  return {
    id: String(row.id),
    schemaVersion: 1,
    status: String(row.status) as PlaytestNoteStatus,
    category: String(row.category) as PlaytestNoteRecord["category"],
    priority: String(row.priority) as PlaytestNoteRecord["priority"],
    body: String(row.body),
    contentVersion: String(row.content_version),
    eventId: row.event_id ? String(row.event_id) : null,
    characterId: String(row.character_id),
    worldDay: Number(row.world_day),
    seed: Number(row.seed),
    runId: String(row.run_id),
    deviceId: String(row.device_id),
    lastChoice: row.last_choice_json ? JSON.parse(String(row.last_choice_json)) : null,
    stateSnapshot: JSON.parse(String(row.state_snapshot_json)),
    eventSnapshot: row.event_snapshot_json ? JSON.parse(String(row.event_snapshot_json)) : null,
    clientMeta: JSON.parse(String(row.client_meta_json)),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    resolvedAt: row.resolved_at ? String(row.resolved_at) : null,
  };
}

async function listNotes(db: D1DatabaseLike): Promise<PlaytestNoteRecord[]> {
  await ensurePlaytestTable(db);
  const response = await db.prepare("SELECT * FROM playtest_notes ORDER BY CASE priority WHEN '중요' THEN 0 WHEN '수정 필요' THEN 1 ELSE 2 END, created_at DESC LIMIT 1000").all<Record<string, unknown>>();
  return (response.results ?? []).map(rowToNote);
}

async function createNote(db: D1DatabaseLike, draft: PlaytestNoteDraft): Promise<PlaytestNoteRecord> {
  await ensurePlaytestTable(db);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO playtest_notes (
    id, schema_version, status, category, priority, body, content_version, event_id,
    character_id, world_day, seed, run_id, device_id, last_choice_json,
    state_snapshot_json, event_snapshot_json, client_meta_json, created_at, updated_at
  ) VALUES (?, 1, 'open', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      id,
      draft.category,
      draft.priority,
      draft.body.trim(),
      draft.contentVersion,
      draft.eventId,
      draft.characterId,
      draft.worldDay,
      draft.seed,
      draft.runId,
      draft.deviceId,
      draft.lastChoice ? JSON.stringify(draft.lastChoice) : null,
      JSON.stringify(draft.stateSnapshot),
      draft.eventSnapshot ? JSON.stringify(draft.eventSnapshot) : null,
      JSON.stringify(draft.clientMeta),
      now,
      now,
    ).run();
  return {
    ...draft,
    id,
    status: "open",
    createdAt: now,
    updatedAt: now,
    resolvedAt: null,
  };
}

function validateDraft(value: unknown): value is PlaytestNoteDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<PlaytestNoteDraft>;
  return draft.schemaVersion === 1
    && typeof draft.body === "string" && draft.body.trim().length > 0 && draft.body.length <= 4000
    && typeof draft.category === "string"
    && typeof draft.priority === "string"
    && typeof draft.contentVersion === "string"
    && typeof draft.characterId === "string"
    && typeof draft.worldDay === "number"
    && typeof draft.seed === "number"
    && typeof draft.runId === "string"
    && typeof draft.deviceId === "string"
    && Boolean(draft.stateSnapshot)
    && Boolean(draft.clientMeta);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, app: "return-cult-story", database: Boolean(env.DB), playtestNotes: Boolean(env.DB && env.PLAYTEST_KEY), version: seedContent.meta.version });
    }
    if (url.pathname === "/api/content") {
      const dbContent = env.DB ? await loadFromDb(env.DB) : null;
      return Response.json({ source: dbContent ? "Cloudflare D1" : "내장 시드", content: dbContent ?? seedContent }, {
        headers: { "Cache-Control": "public, max-age=60" },
      });
    }

    if (url.pathname === "/api/playtest-notes") {
      const unavailable = noteServiceUnavailable(env);
      if (unavailable) return unavailable;
      if (!authorized(request, env)) return Response.json({ error: "테스터 코드가 올바르지 않습니다." }, { status: 401 });
      if (request.method === "GET") return Response.json({ notes: await listNotes(env.DB!) }, { headers: { "Cache-Control": "no-store" } });
      if (request.method === "POST") {
        const body = await request.json().catch(() => null);
        if (!validateDraft(body)) return Response.json({ error: "메모 데이터 형식이 올바르지 않습니다." }, { status: 400 });
        return Response.json({ note: await createNote(env.DB!, body) }, { status: 201 });
      }
      return new Response("Method not allowed", { status: 405 });
    }

    const noteMatch = url.pathname.match(/^\/api\/playtest-notes\/([^/]+)$/);
    if (noteMatch && request.method === "PATCH") {
      const unavailable = noteServiceUnavailable(env);
      if (unavailable) return unavailable;
      if (!authorized(request, env)) return Response.json({ error: "테스터 코드가 올바르지 않습니다." }, { status: 401 });
      const payload = await request.json().catch(() => null) as { status?: PlaytestNoteStatus } | null;
      if (!payload?.status || !NOTE_STATUSES.has(payload.status)) return Response.json({ error: "잘못된 상태값입니다." }, { status: 400 });
      await ensurePlaytestTable(env.DB!);
      const now = new Date().toISOString();
      const resolvedAt = payload.status === "open" ? null : now;
      await env.DB!.prepare("UPDATE playtest_notes SET status = ?, updated_at = ?, resolved_at = ? WHERE id = ?")
        .bind(payload.status, now, resolvedAt, decodeURIComponent(noteMatch[1])).run();
      return Response.json({ ok: true });
    }

    if (url.pathname === "/api/admin/status") {
      return Response.json({ writeEnabled: false, playtestNotesEnabled: Boolean(env.DB && env.PLAYTEST_KEY), reason: "스토리 원본 편집 API는 잠겨 있고, 플레이테스트 메모만 별도 인증 후 서버 저장합니다." });
    }
    return new Response("Not found", { status: 404 });
  },
};
