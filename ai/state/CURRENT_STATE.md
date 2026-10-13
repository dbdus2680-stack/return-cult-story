# CURRENT STATE

LAST UPDATE: 2026-10-13

## 운영체계
- 총괄관제 단일채널: 활성화 완료
- 기능실: FLOW / WRITING / VISUAL / DEV
- GitHub: 프로젝트 Source of Truth
- 새 총괄채팅 GitHub 복구시험: SUCCESS

## 현재 마일스톤
`PC-001 DAY 1 playable slice 검증`

## 저장소 기준
- DAY1 Flow: `flow/PC1_DAY1_FLOW.md` — FLOW APPROVED
- DAY1 원고: `story/PC1_DAY1.md` — WRITING APPROVED
- Runtime: `shared/data/events-1.json`
- 콘텐츠 버전: `0.1.1`

## PC-001 DAY 1 현재 상태

### 전개
```text
PC1-D01-001  한도윤 재회
→ PC1-D01-002  첫 대화 / 태도 선택
→ PC1-D01-003  새 반 적응
→ PC1-D01-004  점심 / 평범한 친밀도
→ PC1-D01-005  하교 전 첫 위화감
→ DAY 1 END
```

### 진행 State
- 001 완료: `FLAG_D01_P1_DONE`
- 002 완료: `FLAG_D01_P2_DONE`
- 003 완료: `FLAG_D01_P3_DONE`
- 004 완료: `FLAG_D01_P4_DONE`
- DAY1 완료: `FLAG_D01_COMPLETE`
- 친구 이상 인식: `KNOW_FRIEND_ODD`

### 원고 방향
- DAY1 대부분은 평범한 입학 첫날
- 한도윤은 004까지 중학교 때 알던 모습 그대로
- 005에서 휴대전화 확인 후 갑자기 하교 계획을 바꾸는 정도의 작은 위화감만 노출
- 귀향회 / 상담센터 / 실종 / 게이트 직접노출 없음

## 수정된 핵심 버그

### 첫 선택 이후 다음 대화로 넘어가지 않던 문제
원인: `src/engine/effects.ts`의 assignment key 정규식이 숫자를 허용하지 않아 `FLAG_D01_P1_DONE=1`이 저장되지 않았음.

수정:
- State key parser를 `[A-Z0-9_]+`로 확장
- `FLAG_D01_*` 등 숫자가 포함된 key 정상 저장
- 기존 버그 저장파일도 history를 읽어 DAY1 진행 Flag를 자동 복구하도록 `PlayerView`에 호환 패치 추가

따라서 새 게임뿐 아니라 기존 저장의 `이어하기`도 복구 대상으로 처리한다.

## 콘텐츠 현황
- 기존 재인덱싱 시 event 수: 34
- DAY1 신규 Scene 003~005 추가 후 event 수: 37
- DAY1 001~005: WRITING APPROVED / FLOW APPROVED / DEV 구현 완료
- Visual/Audio 전용 연출은 아직 미작업이며 현재 텍스트 UI로 플레이 가능
- DAY2 이후 기존 사건들은 대부분 draft/partial 상태

## 현재 Blocker
치명적 Blocker 없음.

해결 완료:
- DAY1 002 이후 전개 단절
- 숫자 포함 FLAG 저장 실패
- 기존 버그 저장 호환
- `KNOW_FRIEND_ODD` 생성 지점 부재

열린 문제:
- DAY2 이후 기존 draft의 비표준 condition/effect DSL
- State Registry / Event-Scene Map 등 콘텐츠 SoT 골격 미완성

세부: `ai/state/OPEN_BLOCKERS.md`

## 완료 Task
- MASTER-001 — 재인덱싱
- MASTER-002 — AI 협력시스템 활성화
- MASTER-003 — 새 채팅 복구시험
- FLOW-001 — DAY1 구조/Flow 확정
- WR-001 — DAY1 003~005 원고
- DEV-001 — DAY1 실행 통합 및 첫 선택 진행 버그 수정

## 현재 최우선 Task
`QA-001 — PC1 DAY 1 실제 플레이 검증`

확인해야 할 경로:
1. 새 게임에서 001 → 002 → 003 → 004 → 005가 끊김 없이 연결되는지
2. 과거 001 선택 후 막힌 기존 저장에서 `이어하기` 시 002로 복구되는지
3. 005 종료 후 `다음 날로`가 노출되는지
4. DAY2 진입 시 기존 draft 데이터에서 즉시 비정상 진행이 발생하지 않는지

## 다음 개발 방향
DAY1 플레이 결과를 먼저 수정/확정한다.
그 다음 `FLOW-002`에서 State Registry / DSL 표준을 잡고 DAY2 제작을 시작한다.
