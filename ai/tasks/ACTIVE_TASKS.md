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
- PURPOSE: Story/Flow/Dev 현황을 읽고 DAY/Scene별 승인상태를 `CURRENT_STATE.md`에 반영
- INPUT: repository main 최신 상태
- OUTPUT: 최신 CURRENT_STATE
- BLOCKER: 없음

### MASTER-002 — AI 협력시스템 v1.0 검토/병합
- STATUS: REVIEW
- OWNER: 총괄관제실
- PURPOSE: `ai-governance-v1` 브랜치의 운영체계 검토 후 main 반영
- OUTPUT: 운영체계 v1.0 활성화

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
