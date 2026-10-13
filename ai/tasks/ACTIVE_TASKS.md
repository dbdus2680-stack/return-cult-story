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
- STATUS: READY
- OWNER: 총괄관제실
- PURPOSE: Story / Flow / Visual / Dev 현황을 읽고 DAY/Scene별 승인상태를 `CURRENT_STATE.md`에 반영
- INPUT: repository `main` 최신 상태 + AI 운영문서
- OUTPUT: 최신 `CURRENT_STATE.md`
- DEPENDS ON: AI 협력시스템 v1.0 main 활성화
- BLOCKER: 없음
- NOTES: **새 총괄채팅이 가장 먼저 실행할 작업**. 사용자에게 과거 작업내용을 다시 묻지 말고 저장소를 직접 읽어 재구성한다.

### MASTER-002 — AI 협력시스템 v1.0 활성화
- STATUS: REVIEW
- OWNER: 총괄관제실
- PURPOSE: `ai-governance-v1`의 운영체계를 main에 반영하여 새 채팅의 기본 Source of Truth로 사용
- OUTPUT: 운영체계 v1.0 활성화
- BLOCKER: 없음
- NOTES: PR #3. 현 채팅 인수인계 완료 후 main 병합 대상.

### MASTER-003 — 새 총괄채팅 복구 시험
- STATUS: READY
- OWNER: 총괄관제실
- PURPOSE: 새 채팅에서 GitHub만으로 역할·현재상태·다음 작업을 복구할 수 있는지 검증
- INPUT: `MASTER_ORCHESTRATOR.md`, `CURRENT_STATE.md`, `ACTIVE_TASKS.md`, `OPEN_BLOCKERS.md`, 최신 handover
- OUTPUT: 복구 성공/실패 판정 및 필요한 운영문서 보완
- DEPENDS ON: MASTER-002
- BLOCKER: 없음
- NOTES: 성공 기준은 `CURRENT_STATE.md`의 '인수인계 성공 판정' 참조.

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
