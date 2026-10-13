# CHAT HANDOVER TEMPLATE

채팅이 길어져 종료할 때 사용한다.

## 종료 전 GitHub에 반영할 것
1. `CURRENT_STATE.md`
2. `ACTIVE_TASKS.md`
3. `OPEN_BLOCKERS.md`
4. 필요한 `ai/decisions/ADR-*.md`
5. 실제 확정된 Story/Flow/Visual/Code 변경

## 새 채팅에 전달할 최소 문구
```text
귀향회 총괄관제실을 이어서 시작한다.
GitHub를 Source of Truth로 사용한다.
먼저 ai/roles/MASTER_ORCHESTRATOR.md → ai/state/CURRENT_STATE.md → ai/tasks/ACTIVE_TASKS.md → ai/state/OPEN_BLOCKERS.md 순서로 읽고, 관련 원본 파일을 확인해 현재 작업을 이어가라.
```

## 금지
- 이전 채팅 전문을 GitHub에 복사
- 미확정 아이디어를 확정사항처럼 기록
- 현재상태와 역사기록을 한 파일에 뒤섞기
