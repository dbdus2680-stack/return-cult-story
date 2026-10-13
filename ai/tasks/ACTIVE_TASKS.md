# ACTIVE TASKS

## 상태값
`TODO / READY / IN_PROGRESS / REVIEW / BLOCKED / DONE`

## 완료

### MASTER-001 — 저장소 콘텐츠 상태 재인덱싱
- STATUS: DONE
- OWNER: MASTER
- OUTPUT: `ai/state/CONTENT_INDEX.md`

### MASTER-002 — AI 협력시스템 v1.0 활성화
- STATUS: DONE
- OWNER: MASTER

### MASTER-003 — 새 총괄채팅 복구 시험
- STATUS: DONE
- OWNER: MASTER
- OUTPUT: SUCCESS

### FLOW-001 — PC1 DAY 1 Scene 003~005 설계 및 최종확정
- STATUS: DONE
- OWNER: FLOW
- OUTPUT: `flow/PC1_DAY1_FLOW.md`
- RELATED: `PC1-D01-001~005 / ANC-001`
- NOTES: `001 → 002 → 003 → 004 → 005 → DAY END` 순서 확정. 모든 진행 Scene에 완료 Flag 적용.

### WR-001 — PC1 DAY 1 Scene 003~005 원고
- STATUS: DONE
- OWNER: WRITING
- OUTPUT: `story/PC1_DAY1.md`, `shared/data/events-1.json`
- RELATED: `PC1-D01-003~005`
- NOTES: 평범한 입학 첫날을 충분히 쌓고 005에서 한도윤의 작은 위화감으로 종료.

### DEV-001 — PC1 DAY 1 실행 통합 및 첫 선택 진행 버그 수정
- STATUS: DONE
- OWNER: DEV
- OUTPUT: `shared/data/events-1.json`, `src/engine/effects.ts`, `src/components/PlayerView.tsx`
- RELATED: `PC1-D01-001~005`
- NOTES:
  - 숫자가 포함된 `FLAG_D01_*` State key를 effect parser가 저장하지 못하던 버그 수정.
  - 기존 버그 저장파일은 history 기반으로 진행 Flag 자동 복구.
  - 001~005를 `P1_DONE → P2_DONE → P3_DONE → P4_DONE → D01_COMPLETE`로 연결.
  - 콘텐츠 버전 `0.1.1`.

## 현재 작업

### QA-001 — PC1 DAY 1 실제 플레이 검증
- STATUS: REVIEW
- OWNER: MASTER + DEV
- PURPOSE: 신규/기존 저장 양쪽으로 DAY 1이 001부터 005까지 끊김 없이 진행되는지 확인
- INPUT: content v0.1.1
- OUTPUT: TECH PLAYABLE / 사용자 UAT
- BLOCKER: 사용자 실제 브라우저 플레이 피드백
- RELATED: `PC1-D01-001~005`
- NOTES:
  - GitHub Actions build: SUCCESS.
  - DAY1 전체 선택 조합 324개 상태 전이 시뮬레이션: 324/324 PASS.
  - 기존 버그 저장(history에 001 완료, FLAG 누락) 복구 후 002 진입조건: PASS.
  - 남은 검증은 실제 배포 브라우저에서 사용자 UAT.

### FLOW-002 — 콘텐츠 SoT / State Registry / DSL 표준 초기화
- STATUS: READY
- OWNER: FLOW
- PURPOSE: DAY 2 이후 확장 전에 condition/effect 규약과 State Registry를 표준화
- INPUT: `shared/data/**`, `src/engine/**`, `ai/state/CONTENT_INDEX.md`
- OUTPUT: `flow/STATE_REGISTRY.md`, `flow/EVENT_SCENE_MAP.md`, DSL 표준
- BLOCKER: 없음

### VIS-001 — PC1 DAY 1 Visual/Audio Spec
- STATUS: READY
- OWNER: VISUAL
- PURPOSE: 완성된 DAY 1 원고 기준으로 시각/음향 연출 정의
- INPUT: `story/PC1_DAY1.md`, `flow/PC1_DAY1_FLOW.md`
- OUTPUT: DAY1 Visual/Audio Spec
- BLOCKER: 없음
- NOTES: 텍스트 플레이 검증 이후 진행 가능.

### DEV-002 — 기존 초안 DSL 정합화
- STATUS: BLOCKED
- OWNER: DEV
- PURPOSE: DAY 2 이후 draft event의 비표준 조건/효과를 표준 DSL에 맞게 정리
- DEPENDS ON: FLOW-002
- BLOCKER: FLOW-002 미완료

## 다음 우선순위

1. QA-001 — 사용자 실제 브라우저 DAY 1 플레이 확인
2. 사용자 수정 피드백 반영
3. FLOW-002 — DAY 2 이후 확장을 위한 State/DSL 표준화
4. DAY 2 제작 시작
