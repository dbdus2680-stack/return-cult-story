-- 서버 통합 플레이테스트 메모
CREATE TABLE IF NOT EXISTS playtest_notes (
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
);

CREATE INDEX IF NOT EXISTS idx_playtest_notes_status ON playtest_notes(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_playtest_notes_event ON playtest_notes(event_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_playtest_notes_version ON playtest_notes(content_version, created_at DESC);
