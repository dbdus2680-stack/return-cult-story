import seedContent from "../shared/story-content";
import type { StoryContent } from "../shared/types";

interface D1Result<T = unknown> { results?: T[]; }
interface D1PreparedStatementLike { all<T = unknown>(): Promise<D1Result<T>>; }
interface D1DatabaseLike { prepare(query: string): D1PreparedStatementLike; }
interface Env { DB?: D1DatabaseLike; }

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
      truths: loaded.truths,
      characters: loaded.characters as StoryContent["characters"],
      anchors: loaded.anchors,
      events: loaded.events as StoryContent["events"],
      clues: loaded.clues,
      items: loaded.items,
      stateDefinitions: loaded.state_definitions,
      endings: loaded.endings,
      locations: loaded.locations,
    };
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, app: "return-cult-story", database: Boolean(env.DB), version: seedContent.meta.version });
    }
    if (url.pathname === "/api/content") {
      const dbContent = env.DB ? await loadFromDb(env.DB) : null;
      return Response.json({ source: dbContent ? "Cloudflare D1" : "내장 시드", content: dbContent ?? seedContent }, {
        headers: { "Cache-Control": "public, max-age=60" },
      });
    }
    if (url.pathname === "/api/admin/status") {
      return Response.json({ writeEnabled: false, reason: "Cloudflare Access 인증과 revision API를 연결하기 전까지 서버 쓰기는 잠겨 있습니다." });
    }
    return new Response("Not found", { status: 404 });
  },
};
