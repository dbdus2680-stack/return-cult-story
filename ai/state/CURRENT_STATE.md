# CURRENT STATE

LAST UPDATE: 2026-10-13

## 운영체계
- 총괄관제 단일채널 운영: **활성화 완료**
- GitHub 장기기억 구조: v1.0
- 기능실: FLOW / WRITING / VISUAL / DEV
- GitHub를 프로젝트 운영상 Source of Truth로 사용
- 채팅은 교체 가능한 작업공간으로 취급
- 새 총괄채팅 GitHub 복구시험: **SUCCESS**

## 현재 인수인계
- HANDOVER: `ai/handoffs/HANDOVER-2026-10-13-001.md`
- 복구 결과: 과거 설명 재요청 없이 역할/상태/작업/Blocker/다음 행동 복구 성공
- `MASTER-003` 완료

## 저장소 기준점
- AI 협력시스템 v1.0 main 반영 commit: `262616465d70af5146d8771d2694d36d999d2cfe`
- 재인덱싱 직전 main: `f8d4830ee111245370adf548ee028c488aa0586c`
- 콘텐츠 재인덱싱 상세: `ai/state/CONTENT_INDEX.md`
- PC1 DAY1 Flow Brief: `flow/PC1_DAY1_FLOW.md`

## 현재 마일스톤
`PC-001 DAY 1 playable slice 완성`

## 확정된 운영 결정
1. 총괄관제실을 사용자 단일 접점으로 사용한다.
2. 기능실은 별도 상시 채팅이 아니라 논리적 조직으로 유지한다.
3. 신규 Scene 제작 표준 순서:
   `FLOW 사전설계 → WRITING → FLOW 확정 → VISUAL → DEV → PLAYTEST → MASTER REVIEW`
4. 플로우실은 구조뿐 아니라 게임시스템과 Canon/STORY_BIBLE의 최종 소유자다.
5. 연출·이미지실은 Visual + Audio Direction을 담당한다.
6. 플로우 QA는 설계검증, 개발 QA는 실행검증이다.
7. 채팅 교체 전 CURRENT_STATE / ACTIVE_TASKS / OPEN_BLOCKERS / 중요 Decision을 최신화한다.
8. 대화 전문은 GitHub에 저장하지 않고 확정된 결과·상태·결정만 기록한다.

## 재인덱싱 결과

### 콘텐츠
- event JSON 기준 사건/Scene 데이터: **34개**
- PC-001 DAY 1 본문화/실행 연결 완료: `PC1-D01-001`, `PC1-D01-002`
- 위 2개는 기능실 승인 기록이 없어 WRITING/FLOW는 `REVIEW`, DEV는 `PLAYABLE`
- 나머지 32개는 원본 상태가 대부분 `초안`: WRITING/FLOW `DRAFT`, DEV `PARTIAL`
- Scene 전용 Visual Spec/Asset은 아직 확인되지 않아 VISUAL `NONE`

### PC-001 DAY 1 Flow
- PC-001 Canon: 고1 신입생, DAY 1, 해온고 1학년 교실
- `PC1-D01-001` → `PC1-D01-002` 기존 구현 유지
- FLOW-001에서 다음 구조 승인:
  - `PC1-D01-003`: 새 반 적응 / 평범한 기준선
  - `PC1-D01-004`: 점심·교내 생활 / 도윤과 일상적 친밀도 강화
  - `PC1-D01-005`: 하교 전 작은 위화감 / DAY 종료
- 003~005는 장기분기 없이 재합류
- 005의 모든 선택이 `KNOW_FRIEND_ODD=1`, `FLAG_D01_COMPLETE=1` 생성
- DAY 1에서 귀향회/게이트를 직접 노출하지 않음
- 실제 원고/실행데이터는 아직 미반영

### DEV
- React/TypeScript/Vite 플레이어/관리자 앱 존재
- 상태/조건/효과/RNG 엔진 존재
- local save/resume 존재
- 4-choice 및 same-day follow-up 지원 존재
- Cloudflare Worker + D1 binding 존재
- 서버 플레이테스트 메모 workflow 존재
- 재인덱싱 직전 최신 main CI: **SUCCESS**

### 데이터 정합성
기존 초안 중 일부 condition/effect 표현이 현 엔진 DSL과 맞지 않는다.
대표 예: `ANC-*`, `CULT-024 결과`, `GATE-009`, `CLUE-011 또는 012`, `돈`, `체력`, `ITEM_RECORD_*`, 일부 `KNOW_* +1`, 비정형 `판정` 문구.
상세는 `CONTENT_INDEX.md` 참조.

### 운영 SoT
AI 역할문서는 활성화됐지만 FLOW/WRITING 역할문서가 지정한 콘텐츠 SoT 경로 중 일부는 아직 생성되지 않았다.
`STORY_BIBLE`, `GAME_SYSTEM_SPEC`, `WRITING_MANUAL`, `STATE_REGISTRY`, `EVENT_SCENE_MAP`, `story/**` 초기화가 필요하다.

## 현재 Blocker
치명적 release blocker는 없음.
공개 작업 Blocker는 `ai/state/OPEN_BLOCKERS.md` 참조.
- DAY1 실행 완성: WRITING/FLOW finalize/DEV 통합 필요
- 초안 DSL 정합화 필요
- 콘텐츠 SoT 골격 초기화 필요
- FRIEND-004의 `KNOW_FRIEND_ODD` 설계 단절은 FLOW-001에서 구조상 해결됨

## 완료된 총괄/Flow Task
- `MASTER-001` — 저장소 콘텐츠 상태 재인덱싱 완료
- `MASTER-002` — AI 협력시스템 v1.0 main 활성화 완료
- `MASTER-003` — 새 총괄채팅 GitHub 복구 시험 완료
- `FLOW-001` — PC1 DAY1 Scene 003~005 사전설계 완료

## 현재 최우선 Active Task
`WR-001 — PC1 DAY 1 Scene 003~005 원고`

입력은 `flow/PC1_DAY1_FLOW.md`이며, 본문/대사/실제 선택지 문구/Immediate Reaction을 작성한 뒤 FLOW finalize로 넘긴다.

## 병행 가능 Task
`FLOW-002 — 콘텐츠 SoT / State Registry / DSL 표준 초기화`

WR-001과 논리적으로 병행 가능하지만, 현재 사용자 체감 진척을 위해 DAY1 원고 완성을 우선한다.

## 다음 제작 순서
1. WR-001: 003~005 원고
2. FLOW finalize
3. FLOW-002: State Registry / Event-Scene Map / DSL 표준
4. VIS-001: Visual/Audio Spec
5. DEV-001: DAY1 전체 통합 및 DSL 정합화
6. PLAYTEST
7. MASTER REVIEW

## 주의
이 파일은 대화 요약이 아니라 **현재 작업 가능한 상태**만 기록한다.
과거 시행착오나 폐기된 토론은 넣지 않는다.
