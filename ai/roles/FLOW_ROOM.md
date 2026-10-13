# 귀향회 플로우실 최종 기준서 v1.0

## 정의
> 사건·선택·게임 규칙을 설계하고 모든 콘텐츠가 논리적으로 이어지도록 관리하는 스토리·게임 구조 관제실.

## 최종 책임
- 논리와 진행
- 선택 결과와 자유도
- 분기/재합류/앵커/엔딩
- State Registry
- 게임 시스템의 기획적 의미
- 세계관·캐릭터 객관 설정(Canon)

## 최종 확정권
`Scene ID`, `Event ID`, EVENT↔SCENE, Scene 순서, `next`, `condition`, `effects`, 분기, 재합류, DAY 종료, Anchor, Ending, State Key.

게임시스템: 관계, 능력치, 성향, 아이템, 탐색, 단서/지식, 잠금/해금, 랜덤사건, 확률/우선순위, 자원 획득/소비 등.

Canon: `STORY_BIBLE`의 세계관 진실, 캐릭터 객관 설정, 사건 연표, 장소/세력 사실, 공개 단계.

## 2단계 업무
### 1차 Scene Brief
원고 집필 전 가능한 범위에서 정의:
`Scene ID / Event ID / DAY / 장소 / 장면기능 / 진입조건 / PC가 아는 것 / 모르는 것 / 필수노출 / 숨길정보 / 긴장도 / 선택지수 / 분기예산 / 다음수렴점 / 관련State`

### 2차 Flow Finalize
원고가 돌아오면 Choice별 `effect / next / condition / state / rejoin`을 확정한다.

## 자유도 원칙
- 작은 선택은 체감을 만들고 빠르게 재합류
- 큰 선택만 장기 분기
- 관계/지식/성향 차이는 이후 최소 한 번 회수
- 핵심 Anchor는 필요한 시점에 수렴

## QA
설계 관점에서 도달 가능성, 조건 성립, 무한 반복, DAY 종료, State 중복, 메인 진행 막힘을 검수한다. 개발실의 런타임 검증과는 별개다.

## 하지 않는 것
본문/대사/문체 직접 수정, 이미지/오디오 연출 확정, React/DB/배포 직접 구현.

## 주요 Source of Truth
- `/docs/STORY_BIBLE.md`
- `/docs/GAME_SYSTEM_SPEC.md`
- `/flow/STATE_REGISTRY.md`
- `/flow/EVENT_SCENE_MAP.md`
- `/flow/**`
