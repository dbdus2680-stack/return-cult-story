# OPEN BLOCKERS

치명적 release blocker는 현재 없음.
다만 첫 완전한 playable slice와 이후 콘텐츠 확장을 위해 아래 문제를 해결해야 한다.

## BLOCKER-FLOW-001
TYPE: FLOW
SCENE/EVENT: PC1-D01-002 → PC1-D01-003~005 / ANC-001
FOUND BY: MASTER-001 재인덱싱
문제: 현재 실행데이터는 PC1-D01-002에서 종료된다. FLOW 사전설계는 `flow/PC1_DAY1_FLOW.md`로 완료됐으나 실제 원고/실행데이터 003~005는 아직 없다.
영향: PC-001 DAY 1 전체 playable slice 미완성.
필요 조치: WR-001 집필 → FLOW finalize → DEV-001 통합.
OWNER: WRITING + FLOW + DEV
STATUS: OPEN

## BLOCKER-DATA-001
TYPE: DATA
SCENE/EVENT: 다수 draft event
FOUND BY: MASTER-001 재인덱싱
문제: 초안 데이터의 condition/effect 표현 중 현 런타임 DSL이 해석하지 못하거나 의도와 다르게 평가하는 표현이 존재한다. 예: `ANC-*`, `CULT-024 결과`, `GATE-009`, `CLUE-011 또는 012`, `돈`, `체력`, `ITEM_RECORD_*`, 일부 `KNOW_* +1`, 비정형 `판정` 결과.
영향: DAY 2 이후 일부 사건의 도달조건이 무시되거나, 효과가 저장되지 않거나, 잘못 열린 사건이 생길 수 있다.
필요 조치: FLOW-002에서 표준 DSL/State Registry 확정 후 DEV-001에서 parser/data 정합화.
OWNER: FLOW + DEV
STATUS: OPEN

## BLOCKER-FLOW-002
TYPE: FLOW
SCENE/EVENT: FRIEND-004 및 PC-001 친구 루트
FOUND BY: MASTER-001 재인덱싱
문제: `FRIEND-004`는 `KNOW_FRIEND_ODD=1`을 요구하지만 기존 PC1 DAY 1 opening은 해당 State를 생성하지 않았다.
영향: 기존 데이터만으로는 PC-001에서 FRIEND-004가 도달 불가였다.
필요 조치: FLOW-001에서 `PC1-D01-005`의 모든 선택이 `KNOW_FRIEND_ODD=1`을 생성하도록 확정함. WR/DEV 반영 필요.
OWNER: FLOW
STATUS: RESOLVED

## BLOCKER-ROLE-001
TYPE: ROLE
SCENE/EVENT: 프로젝트 공통
FOUND BY: MASTER-001 재인덱싱
문제: 역할문서가 Source of Truth로 지정한 `docs/STORY_BIBLE.md`, `docs/GAME_SYSTEM_SPEC.md`, `docs/WRITING_MANUAL.md`, `flow/STATE_REGISTRY.md`, `flow/EVENT_SCENE_MAP.md`, `story/**`가 아직 저장소에 없다.
영향: 기능실 권한은 정의됐지만 콘텐츠 Canon/State/Scene의 장기 기준점이 raw JSON과 대화 산출물에 분산될 위험이 있다.
필요 조치: FLOW-002 중심으로 콘텐츠 SoT 골격 초기화. WRITING_MANUAL/story 구조는 WRITING 단계에서 연결.
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

Blocker는 다른 실의 정의를 임의로 수정하기 위한 권한이 아니다. 해결 주체가 확정한 뒤 원 담당이 반영한다.
