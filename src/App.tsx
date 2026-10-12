import { useEffect, useMemo, useState } from "react";
import seedContent from "../shared/story-content";
import type { StoryContent } from "../shared/types";
import { PlayerView } from "./components/PlayerView";
import { AdminView } from "./components/AdminView";

type Mode = "player" | "admin";

export default function App() {
  const [mode, setMode] = useState<Mode>("player");
  const [content, setContent] = useState<StoryContent>(seedContent);
  const [source, setSource] = useState("내장 시드");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { content: StoryContent; source: string }) => {
        setContent(data.content);
        setSource(data.source);
      })
      .catch(() => {
        setContent(seedContent);
        setSource("내장 시드");
      });
  }, []);

  const counts = useMemo(() => ({
    characters: content.characters.length,
    events: content.events.length,
    clues: content.clues.length,
    endings: content.endings.length,
  }), [content]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">RETURN CULT / v{content.meta.version}</div>
          <h1>귀향회</h1>
        </div>
        <div className="top-actions">
          <span className="source-badge">{source}</span>
          <button className={mode === "player" ? "seg active" : "seg"} onClick={() => setMode("player")}>플레이</button>
          <button className={mode === "admin" ? "seg active" : "seg"} onClick={() => setMode("admin")}>관리</button>
        </div>
      </header>

      {mode === "player"
        ? <PlayerView content={content} />
        : <AdminView content={content} counts={counts} />}
    </div>
  );
}
