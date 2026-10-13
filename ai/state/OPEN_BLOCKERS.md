# OPEN BLOCKERS

치명적 release blocker는 현재 없음.

## BLOCKER-FLOW-001
TYPE: FLOW
SCENE/EVENT: PC1-D01-002 → PC1-D01-003~005 / ANC-001
FOUND BY: MASTER-001 재인덱싱
문제: DAY 1이 002에서 종료되어 전체 전개가 미완성이었음.
해결: 003~005 원고/Flow/실행데이터를 반영하고 `001 → 002 → 003 → 004 → 005 → DAY END`로 연결함.
OWNER: WRITING + FLOW + DEV
STATUS: RESOLVED

## BLOCKER-DEV-001
TYPE: SAVE
SCENE/EVENT: PC1-D01-001 → 002
FOUND BY: 사용자 플레이
문제: effect parser의 State key 정규식이 숫자를 허용하지 않아 `FLAG_D01_P1_DONE=1`이 저장되지 않았음. 그 결과 002 진입조건이 false가 되어 첫 선택 이후 진행이 끊겼음.
해결:
- effect parser key를 `[A-Z0-9_]+`로 수정.
- 기존 저장에서 history를 기준으로 `FLAG_D01_P1_DONE` 등 DAY1 진행 Flag를 자동 복구하도록 저장 호환 패치 추가.
OWNER: DEV
STATUS: RESOLVED

## BLOCKER-DATA-001
TYPE: DATA
SCENE/EVENT: DAY 2 이후 다수 draft event
FOUND BY: MASTER-001 재인덱싱
문제: 초안 데이터의 condition/effect 표현 중 현 런타임 DSL이 해석하지 못하거나 의도와 다르게 평가하는 표현이 존재한다. 예: `ANC-*`, `CULT-024 결과`, `GATE-009`, `CLUE-011 또는 012`, `돈`, `체력`, `ITEM_RECORD_*`, 일부 `KNOW_* +1`, 비정형 `판정` 결과.
영향: DAY 2 이후 일부 사건의 도달조건이 무시되거나, 효과가 저장되지 않거나, 잘못 열린 사건이 생길 수 있다.
필요 조치: FLOW-002에서 표준 DSL/State Registry 확정 후 DEV-002에서 parser/data 정합화.
OWNER: FLOW + DEV
STATUS: OPEN

## BLOCKER-FLOW-002
TYPE: FLOW
SCENE/EVENT: FRIEND-004 및 PC-001 친구 루트
FOUND BY: MASTER-001 재인덱싱
문제: `FRIEND-004`가 요구하는 `KNOW_FRIEND_ODD=1` 생성 지점이 없었음.
해결: `PC1-D01-005`의 모든 선택에서 `KNOW_FRIEND_ODD=1`을 생성하도록 원고/Flow/실행데이터에 반영.
OWNER: FLOW
STATUS: RESOLVED

## BLOCKER-ROLE-001
TYPE: ROLE
SCENE/EVENT: 프로젝트 공통
FOUND BY: MASTER-001 재인덱싱
문제: 일부 콘텐츠 Source of Truth 경로가 아직 초기화되지 않았다. 현재 `story/PC1_DAY1.md`와 `flow/PC1_DAY1_FLOW.md`는 생성됨. 남은 핵심은 `docs/STORY_BIBLE.md`, `docs/GAME_SYSTEM_SPEC.md`, `docs/WRITING_MANUAL.md`, `flow/STATE_REGISTRY.md`, `flow/EVENT_SCENE_MAP.md`.
영향: DAY 2 이후 확장 시 Canon/State/DSL 기준이 분산될 수 있다.
필요 조치: FLOW-002에서 우선 State Registry / Event-Scene Map / DSL을 초기화하고 문서 골격을 연결.
OWNER: MASTER + FLOW + WRITING
STATUS: OPEN

## 등록 형식
```text
## BLOCKER-ID
TYPE: FLOW / WRITING / VISUAL / DATA / SAVE / API / BUILD / ROLE
SCENE/EVENT:
FOUND BY:
문제:
영향:
필요 조치:
OWNER:
STATUS: OPEN / RESOLVED
```
