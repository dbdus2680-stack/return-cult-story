-- 귀향회 v0.1 / D1 schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS story_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS truths (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  category TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  display_name TEXT,
  start_day INTEGER,
  start_location TEXT,
  unlock_condition TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS anchors (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  world_day INTEGER,
  section_name TEXT,
  title TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  day_range TEXT,
  pool_type TEXT,
  location_name TEXT,
  priority TEXT,
  condition_text TEXT,
  hook TEXT,
  status TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_day ON events(day_range);
CREATE INDEX IF NOT EXISTS idx_events_pool ON events(pool_type);
CREATE INDEX IF NOT EXISTS idx_events_location ON events(location_name);

CREATE TABLE IF NOT EXISTS clues (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  truth_id TEXT,
  stage TEXT,
  event_id TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  name TEXT,
  category TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS state_definitions (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  state_type TEXT,
  display_name TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS endings (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  name TEXT,
  ending_type TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  name TEXT,
  location_type TEXT,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS story_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT NOT NULL,
  editor TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS published_versions (
  version TEXT PRIMARY KEY,
  content_hash TEXT,
  r2_key TEXT,
  published_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS save_games (
  save_id TEXT PRIMARY KEY,
  user_id TEXT,
  device_id TEXT,
  content_version TEXT NOT NULL,
  state_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
