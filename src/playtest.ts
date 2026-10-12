import type { PlaytestNoteDraft, PlaytestNoteRecord, PlaytestNoteStatus } from "../shared/types";

const KEY_STORAGE = "return-cult-story.playtest-key.v1";
const DEVICE_STORAGE = "return-cult-story.device-id.v1";

export function getPlaytestKey(): string {
  return localStorage.getItem(KEY_STORAGE) ?? "";
}

export function setPlaytestKey(value: string): void {
  if (value.trim()) localStorage.setItem(KEY_STORAGE, value.trim());
  else localStorage.removeItem(KEY_STORAGE);
}

export function getDeviceId(): string {
  let value = localStorage.getItem(DEVICE_STORAGE);
  if (!value) {
    value = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(DEVICE_STORAGE, value);
  }
  return value;
}

function authHeaders(): HeadersInit {
  const key = getPlaytestKey();
  return key ? { "X-Playtest-Key": key } : {};
}

async function readError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { error?: string };
    return payload.error ?? `서버 오류 (${response.status})`;
  } catch {
    return `서버 오류 (${response.status})`;
  }
}

export async function createPlaytestNote(note: PlaytestNoteDraft): Promise<PlaytestNoteRecord> {
  const response = await fetch("/api/playtest-notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error(await readError(response));
  const payload = await response.json() as { note: PlaytestNoteRecord };
  return payload.note;
}

export async function listPlaytestNotes(): Promise<PlaytestNoteRecord[]> {
  const response = await fetch("/api/playtest-notes", { headers: authHeaders() });
  if (!response.ok) throw new Error(await readError(response));
  const payload = await response.json() as { notes: PlaytestNoteRecord[] };
  return payload.notes;
}

export async function updatePlaytestNoteStatus(id: string, status: PlaytestNoteStatus): Promise<void> {
  const response = await fetch(`/api/playtest-notes/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export function notesToBatchText(notes: PlaytestNoteRecord[]): string {
  return notes.map((note, index) => {
    const last = note.lastChoice ? `${note.lastChoice.eventId} > ${note.lastChoice.label}` : "없음";
    const snapshot = note.eventSnapshot;
    return [
      `# ${index + 1}. ${note.eventId ?? "NO_EVENT"} / DAY ${note.worldDay}`,
      `- 메모ID: ${note.id}`,
      `- 상태: ${note.status}`,
      `- 분류/중요도: ${note.category} / ${note.priority}`,
      `- 콘텐츠버전: ${note.contentVersion}`,
      `- 캐릭터: ${note.characterId}`,
      `- RUN/SEED: ${note.runId} / ${note.seed}`,
      `- 직전선택: ${last}`,
      `- 메모: ${note.body}`,
      snapshot ? `- 당시본문: ${snapshot["요약/본문 훅"]}` : "- 당시본문: 없음",
      snapshot ? `- 당시선택지: ${[snapshot["선택 A"], snapshot["선택 B"], snapshot["선택 C"]].filter(Boolean).join(" / ")}` : "",
    ].filter(Boolean).join("\n");
  }).join("\n\n---\n\n");
}
