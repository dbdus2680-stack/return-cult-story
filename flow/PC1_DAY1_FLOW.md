# PC-001 DAY 1 FLOW — v0.2

STATUS: FLOW APPROVED
OWNER: FLOW
ANCHOR: `ANC-001`
WRITING: `story/PC1_DAY1.md` — WRITING APPROVED
RUNTIME: `shared/data/events-1.json`
RANGE: `PC1-D01-001` ~ `PC1-D01-005`

## DAY 1 확정 구조

```text
PC1-D01-001  재회
  FLAG_D01_P1_DONE
      ↓
PC1-D01-002  첫 대화 / 태도 선택
  FLAG_D01_P2_DONE
      ↓
PC1-D01-003  새 반 적응 / 평범한 기준선
  FLAG_D01_P3_DONE
      ↓
PC1-D01-004  점심 / 도윤과 일상적 친밀도
  FLAG_D01_P4_DONE
      ↓
PC1-D01-005  하교 전 첫 위화감
  KNOW_FRIEND_ODD + FLAG_D01_COMPLETE
      ↓
DAY 1 END
```

## 핵심 연출 원칙

DAY 1의 감정 순서는 다음으로 고정한다.

`낯선 새 학교 → 아는 친구가 있어 안도 → 평범한 학교생활 → 도윤은 원래 알던 모습 → 마지막에 아주 작은 어긋남`

DAY 1에서는 다음을 직접 노출하지 않는다.

- 귀향회 명칭
- 상담센터의 정체
- 실종 사건
- 게이트/이계 기술
- 명확한 음모 단서

`PC1-D01-005`에서 플레이어가 얻는 결론은 오직 **“도윤이 평소와 조금 달랐다”** 정도다.

## Scene Final

### PC1-D01-001
- 진입: `PC-001`
- 기능: 낯선 교실 + 한도윤 재회
- 모든 선택: `REL_FRIEND +1; FLAG_D01_P1_DONE=1`
- NEXT: `PC1-D01-002`

### PC1-D01-002
- 진입: `PC-001 && FLAG_D01_P1_DONE=1`
- 기능: 첫 대화, 플레이어 기본 태도 분화
- 선택 수: 4
- 모든 선택: `FLAG_D01_P2_DONE=1`
- 개별 결과: `REL_FRIEND`, `STAT_OBS`, `FLAG_D01_DIRECT/OBS/TURNBACK/SOCIAL`
- NEXT: `PC1-D01-003`

### PC1-D01-003
- 진입: `PC-001 && FLAG_D01_P2_DONE=1`
- 기능: 새 반의 일상적 기준선 형성
- 선택 수: 3
- 모든 선택: `FLAG_D01_P3_DONE=1`
- 개별 결과: 대화 참여 / 먼저 사교 / 관찰
- NEXT: `PC1-D01-004`

### PC1-D01-004
- 진입: `PC-001 && FLAG_D01_P3_DONE=1`
- 기능: 도윤과의 평범한 친밀도 강화
- 선택 수: 3
- 모든 선택: `FLAG_D01_P4_DONE=1`
- 개별 결과: `REL_FRIEND`, `STAT_TALK`, `STAT_OBS` 및 태도 Flag
- NEXT: `PC1-D01-005`

### PC1-D01-005
- 진입: `PC-001 && FLAG_D01_P4_DONE=1`
- 기능: `ANC-001`의 첫 위화감 회수
- 선택 수: 3
- 모든 선택:
  - `KNOW_FRIEND_ODD=1`
  - `FLAG_D01_COMPLETE=1`
- 개별 결과: 바로 질문 / 그냥 보냄 / 조용히 관찰
- NEXT: `-`
- EXIT: DAY 1 END

## 분기 원칙

DAY 1의 선택은 성격과 플레이 태도를 기록하지만 장기분기를 만들지 않는다.
각 Scene은 다음 Scene으로 재합류한다.

보조 Flag는 이후 대사 반응이나 짧은 변주에 우선 사용하며, 메인 진행을 막는 필수조건으로 남발하지 않는다.

## State Registry — DAY 1

### 진행 Flag
- `FLAG_D01_P1_DONE`
- `FLAG_D01_P2_DONE`
- `FLAG_D01_P3_DONE`
- `FLAG_D01_P4_DONE`
- `FLAG_D01_COMPLETE`

### 태도 Flag
- `FLAG_D01_DIRECT`
- `FLAG_D01_OBS`
- `FLAG_D01_TURNBACK`
- `FLAG_D01_SOCIAL`
- `FLAG_D01_CLASSCHAT`
- `FLAG_D01_CLASS_SOCIAL`
- `FLAG_D01_CLASS_OBS`
- `FLAG_D01_LUNCH_FRIEND`
- `FLAG_D01_LUNCH_CLASS`
- `FLAG_D01_LUNCH_OBS`
- `FLAG_D01_ASKED`
- `FLAG_D01_LET_GO`
- `FLAG_D01_PHONE_GLANCE`

### Knowledge
- `KNOW_FRIEND_ODD`: 한도윤에게 평소와 다른 작은 징후가 있음을 인식함.

이 State는 기존 `FRIEND-004`의 진입조건과 연결한다.

## 실행 규약

- Scene 완료 Flag가 다음 Scene 진입조건을 연다.
- 숫자가 포함된 State key를 effect parser가 처리하도록 DEV 수정 완료.
- 기존 버그 저장은 history를 기반으로 `FLAG_D01_P*_DONE`을 복구한다.
- 005 후속은 비워 두고 기존 `다음 날로` UI를 DAY 종료 동작으로 사용한다.

## 최종 Flow QA

- [x] 001 → 002 강제 연결
- [x] 002 → 003 강제 연결
- [x] 003 → 004 강제 연결
- [x] 004 → 005 강제 연결
- [x] 005 → DAY END
- [x] 모든 진행 Flag가 런타임 파서에서 처리 가능
- [x] DAY 1 장기분기 없음
- [x] 귀향회/게이트 직접 노출 없음
- [x] `KNOW_FRIEND_ODD=1` 생성
- [x] 기존 FRIEND 후속 루트와 연결 가능

DAY 1 Flow는 원고와 런타임 데이터 기준으로 최종 승인한다.
