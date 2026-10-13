# CONTENT INDEX

LAST REINDEX: 2026-10-13
BASELINE MAIN: `f8d4830ee111245370adf548ee028c488aa0586c`

## 판정 기준

- WRITING: `NONE / DRAFT / REVIEW / APPROVED / LOCKED`
- FLOW: `NONE / DRAFT / REVIEW / APPROVED / LOCKED`
- VISUAL: `NONE / PLACEHOLDER / DRAFT / APPROVED`
- DEV: `NONE / PARTIAL / PLAYABLE / VERIFIED`

`REVIEW`는 실제 본문/구조가 저장소에 반영되었지만 기능실 승인 기록이 없는 상태다.
`PLAYABLE`은 실행 데이터와 코드 경로가 존재하고 CI build가 통과하지만 실제 플레이테스트 검증까지는 기록되지 않은 상태다.

## 요약

- 현재 event 데이터 수: **34**
- PC-001 DAY 1 실제 본문화/연결 구현: **2 Scene**
- 그 외 사건: **32개 초안 데이터**
- Scene 전용 Visual Spec / Asset: **현재 저장소에서 확인되지 않음**
- 최신 main CI: **SUCCESS**
- D1 binding 및 서버 플레이메모 코드: 존재

## Scene / Event 상태

| ID | DAY | WRITING | FLOW | VISUAL | DEV | 비고 |
|---|---:|---|---|---|---|---|
| PC1-D01-001 | 1 | REVIEW | REVIEW | NONE | PLAYABLE | 고1 신입생 입학 첫날, 한도윤 재회. 모든 선택이 `FLAG_D01_P1_DONE=1` 설정 후 002로 연결 |
| PC1-D01-002 | 1 | REVIEW | REVIEW | NONE | PLAYABLE | 4-choice 반영. 현재 `후속/재등장`이 `-`라 DAY 1 후속 Scene은 저장소에 없음 |
| SCHOOL-001 | 2~6 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CITY-001 | 2~8 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CULT-003 | 4~8 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CITY-004 | 5~12 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CULT-007 | 7 | DRAFT | DRAFT | NONE | PARTIAL | `ANC-003` 조건은 현 엔진 문법상 의미 해석되지 않음 |
| SCHOOL-006 | 7~14 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CITY-009 | 8~15 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CULT-011 | 9~14 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| POLICE-002 | 10~16 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| LAB-003 | 11~16 | DRAFT | DRAFT | NONE | PARTIAL | 일부 결과 문구가 런타임 효과 문법과 불일치 |
| FRIEND-004 | 11~15 | DRAFT | DRAFT | NONE | PARTIAL | `KNOW_FRIEND_ODD=1`을 현재 PC1 DAY1 경로에서 생성하지 않아 PC-001 기준 도달 불가 |
| CITY-014 | 12~18 | DRAFT | DRAFT | NONE | PARTIAL | `돈` 조건/효과는 현 엔진에서 처리하지 않음 |
| CULT-018 | 13~18 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| FRIEND-010 | 15 | DRAFT | DRAFT | NONE | PARTIAL | `ANC-006` 조건은 현 엔진 문법상 의미 해석되지 않음 |
| CITY-019 | 15~22 | DRAFT | DRAFT | NONE | PARTIAL | 선행 상태가 일부 런타임 표현과 불일치 |
| CULT-024 | 16~21 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| SCHOOL-014 | 16~22 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| LAB-010 | 17~23 | DRAFT | DRAFT | NONE | PARTIAL | `CLUE-011 또는 012`는 두 번째 OR 항이 무조건 참으로 평가될 수 있음 |
| OTHER-004 | 18~24 | DRAFT | DRAFT | NONE | PARTIAL | `CULT-024 결과` 조건은 현 엔진에서 해석되지 않음 |
| CITY-027 | 19~25 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| LAB-018 | 21 | DRAFT | DRAFT | NONE | PARTIAL | `ANC-008` 조건은 현 엔진 문법상 의미 해석되지 않음 |
| OTHER-008 | 21~26 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| LAB-022 | 23~27 | DRAFT | DRAFT | NONE | PARTIAL | `돈 -30000` 효과 미지원 |
| FRIEND-018 | 23~28 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| CULT-029 | 24~27 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| GATE-003 | 24~28 | DRAFT | DRAFT | NONE | PARTIAL | `체력 -1` 효과 미지원 |
| OTHER-011 | 25~28 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| OTHER-015 | 26~29 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| GATE-006 | 27 | DRAFT | DRAFT | NONE | PARTIAL | `ANC-010` 조건은 현 엔진 문법상 의미 해석되지 않음 |
| CITY-036 | 27~29 | DRAFT | DRAFT | NONE | PARTIAL | 초안 |
| GATE-009 | 29 | DRAFT | DRAFT | NONE | PARTIAL | `ANC-011` 조건은 현 엔진 문법상 의미 해석되지 않음 |
| ENDING-TRIG-01 | 30 | DRAFT | DRAFT | NONE | PARTIAL | `GATE-009` 조건 및 엔딩 결과가 런타임 전용 규칙으로 구현되지 않음 |

## DAY 1 실제 실행 상태

현재 코드 기준 PC-001은 DAY 1 시작 시 `PC1-D01-001`이 우선 선택된다.
선택 후 `FLAG_D01_P1_DONE=1`이 설정되고 `PC1-D01-002`가 same-day follow-up으로 열린다.
002 선택 후에는 후속 ID가 없어 현재 Scene이 종료된다.

따라서 **PC1 DAY 1 전체 playable slice는 아직 완성되지 않았다.**

## 구조/데이터 리스크

### 1. 조건/효과 DSL 불일치
현 런타임이 직접 해석하는 것은 제한된 State/Item/Clue 문법이다.
기존 초안 데이터에는 아래와 같이 해석되지 않거나 의도와 다르게 처리될 표현이 남아 있다.

- `ANC-003`, `ANC-006`, `ANC-008`, `ANC-010`, `ANC-011`
- `CULT-024 결과`, `GATE-009`
- `CLUE-011 또는 012`
- `돈>=10000`, `돈 -30000`, `체력 -1`
- `ITEM_RECORD_01` 계열
- 일부 `KNOW_* +1` 표현
- `말재주 판정`, `관찰 판정`, `발각 위험` 같은 비정형 결과

초안 데이터가 실행 번들에는 들어가 있으나, 전체 Flow가 설계 의도대로 실행된다고 볼 수 없다.

### 2. PC-001 후속 연결 단절
기존 `FRIEND-004`는 `KNOW_FRIEND_ODD=1`을 요구하지만 현재 DAY 1 opening은 이 State를 만들지 않는다.
PC1 DAY 1 잔여 Scene 설계에서 State 회수 여부를 확정해야 한다.

### 3. 운영 SoT 파일 부재
FLOW/WRITING 역할문서가 기준 Source of Truth로 지정한 다음 경로가 아직 저장소에 없다.

- `docs/STORY_BIBLE.md`
- `docs/GAME_SYSTEM_SPEC.md`
- `docs/WRITING_MANUAL.md`
- `flow/STATE_REGISTRY.md`
- `flow/EVENT_SCENE_MAP.md`
- `story/**`

운영체계는 활성화되었지만 콘텐츠 제작용 SoT는 아직 초기화가 필요하다.

### 4. README 사건 수 메타데이터 드리프트
README는 `사건 33개`로 적혀 있으나 현재 event JSON은 34개다.
DAY 1 opening에서 기존 1개 사건을 2개 Scene으로 교체하며 증가한 것으로 보인다.

## 다음 우선순위

1. `FLOW-001` — PC1 DAY 1 잔여 Scene 003~005 Scene Brief 및 DAY 종료 구조 확정
2. `FLOW-002` — State Registry / Event-Scene Map 초기화 및 조건·효과 표준 문법 확정
3. `WR-001` — FLOW-001 승인 후 Scene 003~005 원고 작성
4. `DEV-001` — 표준 문법에 맞춘 DSL/데이터 정합화 + PC1 DAY1 전체 playable slice 통합
5. `VIS-001` — DAY1 Visual/Audio Spec 작성
6. PLAYTEST → MASTER REVIEW
