# ACTIVE TASKS

## 상태값
`TODO / READY / IN_PROGRESS / REVIEW / BLOCKED / DONE`

## 작업 ID 규칙
- `MASTER-###`
- `FLOW-###`
- `WR-###`
- `VIS-###`
- `DEV-###`
- `QA-###`

## 현재 작업

### MASTER-001 — 저장소 콘텐츠 상태 재인덱싱
- STATUS: DONE
- OWNER: 총괄관제실
- PURPOSE: Story / Flow / Visual / Dev 현황을 읽고 DAY/Scene별 승인상태를 현재상태에 반영
- OUTPUT: `ai/state/CONTENT_INDEX.md`, 최신 `CURRENT_STATE.md`
- BLOCKER: 없음
- NOTES: main 기준 34 event, PC1 DAY1 2 Scene playable, 나머지 32 draft/partial로 재분류 완료.

### MASTER-002 — AI 협력시스템 v1.0 활성화
- STATUS: DONE
- OWNER: 총괄관제실
- PURPOSE: AI 운영체계를 main에 반영하여 새 채팅의 기본 Source of Truth로 사용
- OUTPUT: 운영체계 v1.0 활성화
- BLOCKER: 없음
- NOTES: PR #3 squash merge 완료. main merge commit `262616465d70af5146d8771d2694d36d999d2cfe`.

### MASTER-003 — 새 총괄채팅 복구 시험
- STATUS: DONE
- OWNER: 총괄관제실
- PURPOSE: 새 채팅에서 GitHub만으로 역할·현재상태·다음 작업을 복구할 수 있는지 검증
- OUTPUT: SUCCESS
- DEPENDS ON: MASTER-002
- BLOCKER: 없음
- NOTES: 과거 설명 재요청 없이 MASTER role, 4 rooms, state, tasks, blockers, handover 및 MASTER-001을 복구·실행함.

### FLOW-001 — PC1 DAY 1 잔여 Scene 003~005 사전설계
- STATUS: DONE
- OWNER: FLOW
- PURPOSE: 현재 PC1-D01-002에서 끊긴 DAY 1을 003~005까지 확장하고 DAY 종료 수렴점을 확정
- INPUT: `PC1-D01-001`, `PC1-D01-002`, `ANC-001`, PC-001 Canon, FLOW 운영기준
- OUTPUT: `flow/PC1_DAY1_FLOW.md`
- DEPENDS ON: MASTER-001
- BLOCKER: 없음
- RELATED SCENE/EVENT: PC1-D01-001~005 / ANC-001
- NOTES: 003 교실 적응 → 004 점심/일상 친밀도 → 005 하교 전 첫 위화감 → DAY END. 005에서 `KNOW_FRIEND_ODD=1`, `FLAG_D01_COMPLETE=1`을 모든 선택에 설정하도록 승인.

### FLOW-002 — 콘텐츠 SoT / State Registry / DSL 표준 초기화
- STATUS: READY
- OWNER: FLOW
- PURPOSE: 역할문서가 지정한 콘텐츠 Source of Truth를 실제 저장소에 만들고 condition/effect 표준 문법을 정리
- INPUT: `shared/data/**`, `src/engine/**`, `ai/state/CONTENT_INDEX.md`
- OUTPUT: `flow/STATE_REGISTRY.md`, `flow/EVENT_SCENE_MAP.md`, 기획 DSL 표준, 필요한 STORY_BIBLE/GAME_SYSTEM_SPEC 골격
- DEPENDS ON: MASTER-001
- BLOCKER: 없음
- NOTES: DEV-001의 입력 규약이 된다.

### WR-001 — PC1 DAY 1 Scene 003~005 원고
- STATUS: READY
- OWNER: WRITING
- PURPOSE: FLOW-001 Scene Brief에 맞춰 본문/대사/선택지/Immediate Reaction 집필
- INPUT: `flow/PC1_DAY1_FLOW.md`
- OUTPUT: 003~005 원고 승인 후보
- DEPENDS ON: FLOW-001
- BLOCKER: 없음
- RELATED SCENE/EVENT: PC1-D01-003~005
- NOTES: 다음 콘텐츠 작업. 원고 완료 후 FLOW finalize로 전달.

### VIS-001 — PC1 DAY 1 Visual/Audio Spec
- STATUS: BLOCKED
- OWNER: VISUAL
- PURPOSE: DAY1 전체 Scene의 배경/구도/표정/FX/BGM/SFX 및 asset 재사용/신규 필요 여부 정의
- INPUT: WR-001 + FLOW finalize
- OUTPUT: DAY1 Visual/Audio Spec
- DEPENDS ON: WR-001, FLOW finalize
- BLOCKER: 선행 콘텐츠 미완료
- RELATED SCENE/EVENT: PC1-D01-001~005

### DEV-001 — PC1 DAY 1 전체 통합 + 조건/효과 DSL 정합화
- STATUS: READY
- OWNER: DEV
- PURPOSE: DAY1 003~005를 실행데이터에 통합하고, 표준 DSL과 런타임 파서를 정합화해 이후 초안 사건의 오작동을 줄임
- INPUT: FLOW-002, WR-001, FLOW finalize, VIS-001 또는 placeholder 승인
- OUTPUT: PC1 DAY1 full playable slice + build/test 결과
- DEPENDS ON: FLOW-002 및 DAY1 콘텐츠 승인
- BLOCKER: 선행 콘텐츠 미완료
- RELATED SCENE/EVENT: PC1-D01-001~005

## 작업 등록 포맷
```text
### TASK-ID — 제목
- STATUS:
- OWNER:
- PURPOSE:
- INPUT:
- OUTPUT:
- DEPENDS ON:
- BLOCKER:
- RELATED SCENE/EVENT:
- NOTES:
```
