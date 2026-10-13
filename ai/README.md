# 귀향회 AI 협력시스템

이 디렉터리는 채팅이 바뀌어도 프로젝트의 운영맥락을 복구하기 위한 장기기억 레이어다.

## 새 총괄관제 채팅의 읽기 순서
1. `ai/roles/MASTER_ORCHESTRATOR.md`
2. `ai/state/CURRENT_STATE.md`
3. `ai/tasks/ACTIVE_TASKS.md`
4. `ai/state/OPEN_BLOCKERS.md`
5. 작업에 필요한 기능실 기준서
6. 해당 작업의 실제 `/story`, `/flow`, `/visual`, `/shared/data`, `/src` 파일

## 기본 원칙
- 채팅은 임시 작업공간, GitHub는 Source of Truth다.
- 대화 전문을 저장하지 않고 확정된 결정·현재상태·미완료 작업만 저장한다.
- 원고/플로우/연출/개발의 권한을 섞지 않는다.
- 다른 실의 Source of Truth는 임의 수정하지 않고 HANDOFF한다.
- 채팅 종료 전 `CURRENT_STATE`, `ACTIVE_TASKS`, `OPEN_BLOCKERS`를 최신화한다.

## 폴더
- `ai/roles`: 영구 역할 기준
- `ai/state`: 현재 상태와 Blocker
- `ai/tasks`: 진행/대기 작업
- `ai/decisions`: 장기적으로 보존할 의사결정
- `ai/templates`: HANDOFF/CHANGESET/채팅 인수인계 템플릿
