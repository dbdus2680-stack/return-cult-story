# PC-001 DAY 1 FLOW — v0.1

STATUS: FLOW PRE-BRIEF APPROVED
OWNER: FLOW
ANCHOR: `ANC-001`
RANGE: `PC1-D01-001` ~ `PC1-D01-005`
PURPOSE: PC-001의 입학 첫날을 하나의 완결된 playable slice로 설계하고, 한도윤과의 평범한 재회에서 하루 끝의 작은 위화감까지 자연스럽게 연결한다.

## DAY 1 구조 목표

```text
PC1-D01-001  재회
→ PC1-D01-002  첫 대화 / 태도 선택
→ PC1-D01-003  교실 적응 / 반의 평범한 기준선 형성
→ PC1-D01-004  점심·교내 생활 / 도윤과 일상적 친밀도 강화
→ PC1-D01-005  하교 직전 첫 위화감
→ DAY 1 END
```

DAY 1에서는 귀향회 명칭, 초자연 현상, 명확한 음모 단서를 직접 노출하지 않는다.
플레이어가 느껴야 하는 것은 `평범한 새 학기 → 친구와 재회해서 다행 → 아주 작은 어긋남 하나`의 순서다.

## 기존 Scene 유지

### PC1-D01-001
- 기능: 낯선 교실 진입 + 한도윤 재회
- 기존 원고/선택지 유지
- 모든 선택이 `FLAG_D01_P1_DONE=1`
- NEXT: `PC1-D01-002`

### PC1-D01-002
- 기능: 도윤과의 관계 온도 및 플레이어의 기본 태도 분화
- 기존 4-choice 유지
- 선택 결과의 개별 Flag는 이후 반응 차이에 활용 가능하나 DAY 1 장기분기를 만들지 않는다.
- NEXT: `PC1-D01-003`

---

## PC1-D01-003 — 새 반의 기준선

### Scene Brief
- DAY: 1
- 시간대: 오전 수업 시작 전후
- 장소: 해온고등학교 1학년 교실
- 장면 기능: 새 반의 일상적 분위기를 보여주고, 도윤이 플레이어에게 익숙한 기준점이라는 사실을 강화한다.
- 진입조건: `PC-001 && FLAG_D01_P1_DONE=1`
- PC가 아는 것: 도윤은 중학교 동창이며 같은 반이다.
- PC가 모르는 것: 도윤에게 이후 이상 징후가 생길 것, 귀향회 관련 사실 전부.
- 필수노출: 새 반의 어색함, 도윤의 빠른 사회 적응, 플레이어가 선택할 수 있는 교실 적응 방식.
- 숨길정보: 귀향회, 상담, 실종, 게이트, TRUTH 직접노출.
- 긴장도: 1/5
- 선택지 수: 3
- 분기예산: 소분기 3, 즉시 재합류
- 다음 수렴점: `PC1-D01-004`
- 관련 State: `FLAG_D01_CLASSCHAT`, `FLAG_D01_CLASS_SOCIAL`, `FLAG_D01_CLASS_OBS`
- TRUTH/CLUE: 없음

### Choice Intent / Effect
A. 도윤이 자연스럽게 반 친구들과 섞이는 흐름을 따른다.
- EFFECT: `FLAG_D01_CLASSCHAT=1`

B. 플레이어가 먼저 주변 친구에게 말을 건다.
- EFFECT: `STAT_TALK +1; FLAG_D01_CLASS_SOCIAL=1`

C. 먼저 교실과 시간표, 친구들 분위기를 살핀다.
- EFFECT: `STAT_OBS +1; FLAG_D01_CLASS_OBS=1`

모든 선택:
- NEXT: `PC1-D01-004`
- 장기 분기 없음

### WRITING 제약
- 본문은 '학교가 평범하다'는 감각을 충분히 확보해야 한다.
- 도윤에게 의미심장한 대사나 수상한 행동을 넣지 않는다.
- 선택은 성격/태도의 차이로 보이게 하고 정답 선택처럼 만들지 않는다.

---

## PC1-D01-004 — 점심의 익숙함

### Scene Brief
- DAY: 1
- 시간대: 점심시간
- 장소: 학교 급식실 및 인접 교내 동선
- 장면 기능: 도윤과의 일상적 친밀도를 강화하고, 플레이어에게 '이 친구는 원래 이런 애'라는 비교 기준을 만든다.
- 진입조건: `PC-001`
- PC가 아는 것: 도윤의 중학교 시절 성격과 현재의 자연스러운 모습.
- PC가 모르는 것: 이후 도윤의 변화 원인.
- 필수노출: 점심시간의 평범한 생활감, 도윤의 익숙한 말투/행동, 새 학교를 둘러볼 여지.
- 숨길정보: 귀향회 직접언급, 노골적인 불안/세뇌 징후, 사건성 단서.
- 긴장도: 1/5
- 선택지 수: 3
- 분기예산: 소분기 3, Scene 내 재합류
- 다음 수렴점: `PC1-D01-005`
- 관련 State: `FLAG_D01_LUNCH_FRIEND`, `FLAG_D01_LUNCH_CLASS`, `FLAG_D01_LUNCH_OBS`
- TRUTH/CLUE: 없음

### Choice Intent / Effect
A. 도윤과 같이 점심을 먹으며 중학교 때처럼 논다.
- EFFECT: `REL_FRIEND +1; FLAG_D01_LUNCH_FRIEND=1`

B. 새 반 친구들과도 함께 섞인다.
- EFFECT: `STAT_TALK +1; FLAG_D01_LUNCH_CLASS=1`

C. 급식 후 혼자 학교를 조금 둘러본 뒤 도윤과 다시 합류한다.
- EFFECT: `STAT_OBS +1; FLAG_D01_LUNCH_OBS=1`

모든 선택:
- NEXT: `PC1-D01-005`
- 장기 분기 없음

### WRITING 제약
- 도윤의 현재 모습은 최대한 정상적이어야 한다.
- 005의 위화감이 효과를 가지도록 004에서 독자가 도윤의 평소 리듬을 기억하게 만든다.
- 학교 배경을 소개하되 정보 덤프를 피한다.

---

## PC1-D01-005 — 하교 전의 작은 어긋남

### Scene Brief
- DAY: 1
- 시간대: 하교 직전~학교 정문
- 장소: 1학년 교실 → 학교 정문 동선
- 장면 기능: `ANC-001`의 '첫 위화감'을 실제 플레이 경험으로 마무리하고, 이후 FRIEND 루트가 사용할 최소 지식 State를 만든다.
- 진입조건: `PC-001`
- PC가 아는 것: 하루 동안 도윤은 평소와 거의 같았다.
- PC가 모르는 것: 이상행동의 원인, 귀향회 존재.
- 필수노출: 도윤이 휴대전화 알림/연락을 확인한 뒤 평소와 약간 다른 방식으로 하교 계획을 바꾸거나 대화를 끊는다. 설명은 하지 않는다.
- 숨길정보: 발신자 정체, 귀향회 명칭, 상담센터, 교단, 초자연 기술.
- 긴장도: 2/5
- 선택지 수: 3
- 분기예산: 소분기 3, DAY END에서 즉시 재합류
- 다음 수렴점: DAY 1 END
- 핵심 State: `KNOW_FRIEND_ODD=1`, `FLAG_D01_COMPLETE=1`
- 선택별 State: `FLAG_D01_ASKED`, `FLAG_D01_LET_GO`, `FLAG_D01_PHONE_GLANCE`
- 관련 TRUTH: `TRUTH-008`의 직접 설명이 아닌 전조만 허용
- 관련 CLUE: 없음

### Choice Intent / Effect
A. 도윤에게 왜 갑자기 계획이 바뀌었는지 바로 묻는다.
- EFFECT: `KNOW_FRIEND_ODD=1; FLAG_D01_COMPLETE=1; FLAG_D01_ASKED=1`

B. 첫날부터 캐묻지 않고 그냥 넘긴다.
- EFFECT: `KNOW_FRIEND_ODD=1; FLAG_D01_COMPLETE=1; FLAG_D01_LET_GO=1`

C. 묻지 않고 도윤의 휴대전화와 반응을 조용히 살핀다.
- EFFECT: `STAT_OBS +1; KNOW_FRIEND_ODD=1; FLAG_D01_COMPLETE=1; FLAG_D01_PHONE_GLANCE=1`

모든 선택:
- NEXT: `-`
- EXIT: DAY 1 END

### DAY 종료 원칙
현재 PlayerView는 follow-up이 없을 때 사건 종료 화면을 거쳐 `다음 날로` 진행할 수 있다.
따라서 v0.1에서는 별도 DAY-END Scene을 추가하지 않고 `PC1-D01-005` 종료 후 기존 DAY advance UI를 사용한다.

### WRITING 제약
- '위화감'은 작아야 한다. 도윤이 곧바로 수상한 종교 발언을 하거나 성격이 급변하면 안 된다.
- 플레이어가 확신하는 것은 `평소와 조금 다르다`뿐이다.
- 각 선택은 질문/보류/관찰의 태도 차이를 보여주되 모두 같은 핵심 지식 State에 도달한다.

---

## State 결정

### DAY 1 핵심 State
- `FLAG_D01_P1_DONE`: 001 완료
- `FLAG_D01_DIRECT`: 002 직접형 선택
- `FLAG_D01_OBS`: 002 관찰형 선택
- `FLAG_D01_TURNBACK`: 002 되묻기 선택
- `FLAG_D01_SOCIAL`: 002 사회관찰 선택
- `FLAG_D01_COMPLETE`: DAY 1 완료
- `KNOW_FRIEND_ODD`: 도윤에게 작은 이상 징후가 있음을 PC가 인식

### 보조 태도 State
- `FLAG_D01_CLASSCHAT`
- `FLAG_D01_CLASS_SOCIAL`
- `FLAG_D01_CLASS_OBS`
- `FLAG_D01_LUNCH_FRIEND`
- `FLAG_D01_LUNCH_CLASS`
- `FLAG_D01_LUNCH_OBS`
- `FLAG_D01_ASKED`
- `FLAG_D01_LET_GO`
- `FLAG_D01_PHONE_GLANCE`

보조 State는 이후 반드시 모두 회수할 필요는 없으며, 다음 Scene에서 자연스러운 짧은 반응 차이를 만들 때 우선 사용한다. 장기분기는 만들지 않는다.

## Flow QA

- [x] 001의 모든 선택이 002에 도달
- [x] 002의 모든 선택이 003으로 수렴하도록 설계
- [x] 003의 모든 선택이 004로 수렴
- [x] 004의 모든 선택이 005로 수렴
- [x] 005의 모든 선택이 `KNOW_FRIEND_ODD=1` 설정
- [x] 005의 모든 선택이 `FLAG_D01_COMPLETE=1` 설정
- [x] DAY 1에서 귀향회/게이트 직접노출 없음
- [x] DAY 1 장기분기 없음
- [x] 기존 `FRIEND-004`의 `KNOW_FRIEND_ODD=1` 요구조건과 연결 가능
- [x] 신규 효과는 현재 엔진이 해석 가능한 `STAT_*`, `REL_*`, `FLAG_*`, `KNOW_*` 문법만 사용

## 다음 HANDOFF

FLOW → WRITING

WRITING은 `PC1-D01-003~005`의 본문, 대사, 선택지 실제 문구, Immediate Reaction을 작성한다.
FLOW는 원고 반환 후 선택별 effect/next/rejoin을 최종 확정한다.
