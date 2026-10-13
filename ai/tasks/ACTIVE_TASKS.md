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

### DEV-001 — PC1 DAY 1 실행 통합 및 진행 버그 수정
- STATUS: DONE
- OWNER: DEV
- OUTPUT: `shared/data/events-1.json`, `src/engine/effects.ts`, `src/engine/conditions.ts`, `src/components/PlayerView.tsx`, `worker/index.ts`
- RELATED: `PC1-D01-001~005`
- NOTES:
  - 숫자가 포함된 `FLAG_D01_*` State key를 effect parser가 저장하지 못하던 문제 수정.
  - condition parser가 `FLAG_D01_P1_DONE=1`을 `DONE=1` 숫자조건으로 재해석하던 문제 수정.
  - 기존 버그 저장파일은 history 기반으로 진행 Flag 자동 복구.
  - 런타임 스토리 콘텐츠는 GitHub 번들 seed를 Source of Truth로 고정하고 D1은 플레이메모 용도로 제한.
  - 001~005를 `P1_DONE → P2_DONE → P3_DONE → P4_DONE → D01_COMPLETE`로 연결.
  - 콘텐츠 버전 `0.1.2`.

### QA-001 — PC1 DAY 1 실제 브라우저 플레이 검증
- STATUS: DONE
- OWNER: MASTER + DEV
- INPUT: content v0.1.2
- OUTPUT: TECH PLAYABLE
- RELATED: `PC1-D01-001~005`
- NOTES:
  - Playwright + Chromium 실제 클릭 E2E를 CI에 추가.
  - 실제 버튼 클릭으로 `캐릭터 선택 → 001 → 002 → 003 → 004 → 005 → 다음 날로` 전체 진행 PASS.
  - legacy save에서 `이어하기 → 002` 복구 PASS.
  - GitHub Actions run #44 Browser E2E: SUCCESS.
  - 사용자 UAT는 Cloudflare production에서 `v0.1.2` 확인 후 수행.

## 현재 작업

### DEPLOY-001 — Cloudflare production 최신본 확인
- STATUS: REVIEW
- OWNER: DEV + MASTER
- PURPOSE: main의 content v0.1.2가 workers.dev production에 반영되었는지 확인
- OUTPUT: production header `RETURN CULT / v0.1.2` 및 실제 사용자 UAT
- BLOCKER: 이 실행환경에서는 workers.dev URL 직접 조회가 불가하여 서버측 production 상태를 직접 확인하지 못함.
- NOTES: Cloudflare Git production 설정은 main → `npm run build` → `npx wrangler deploy` 기준으로 기존 구성됨. 사용자는 사이트 상단 버전으로 최신 배포 여부를 즉시 판별할 수 있음.

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
- NOTES: 텍스트 플레이 사용자 UAT 이후 진행 가능.

### DEV-002 — 기존 초안 DSL 정합화
- STATUS: BLOCKED
- OWNER: DEV
- PURPOSE: DAY 2 이후 draft event의 비표준 조건/효과를 표준 DSL에 맞게 정리
- DEPENDS ON: FLOW-002
- BLOCKER: FLOW-002 미완료

## 다음 우선순위

1. DEPLOY-001 — production에서 v0.1.2 확인 + 사용자 DAY 1 UAT
2. 사용자 수정 피드백 반영
3. FLOW-002 — DAY 2 이후 확장을 위한 State/DSL 표준화
4. DAY 2 제작 시작
