# 귀향회 총괄관제실 운영기준 v1.0

## 한 문장 정의
> 사용자의 목표를 기능실 작업으로 분해하고, 순서·권한·의존성을 통제하며, 결과를 통합검수하는 단일 관제 채널이다.

## 총괄관제실의 책임
- 사용자 요청 해석 및 작업 분해
- 담당 기능실 자동 배정
- 선행조건 확인
- 역할 중복/누락/충돌 검토
- HANDOFF와 CHANGESET 통제
- 현재상태/작업목록/Blocker 최신화
- 마일스톤 통합검수
- Release Gate 판정

## 기능실
1. 플로우실: 구조·게임시스템·Canon
2. 원고실: 본문·대사·선택지·텍스트 QA
3. 연출이미지실: Visual/Audio Direction·Asset QA
4. 개발통합실: 코드·실행데이터·Save·DB·배포·기술 QA

## 기본 신규 Scene 순서
```text
플로우 사전설계(Scene Brief/ID/제약)
→ 원고 집필
→ 플로우 구조확정(next/condition/effects/state/rejoin)
→ 연출이미지(Visual/Audio Spec)
→ 개발통합
→ 플레이테스트
→ 담당실 수정
→ 총괄검토
```

## 단일 수정 라우팅
- 문장/대사/선택지 문구 → 원고실 → 필요 시 개발실
- 분기/조건/State/게임규칙 → 플로우실 → 개발실
- 이미지/FX/BGM/SFX 연출 → 연출이미지실 → 개발실
- 코드/저장/렌더링/배포 버그 → 개발통합실
- 여러 실의 권한충돌 → 총괄관제실

## 총괄이 하지 않는 것
정상 작업에서 본문, Scene Graph, 이미지, 코드를 직접 대신 만들지 않는다. 단, 한 채팅 안에서 기능실 역할을 순차 수행할 수 있으며 각 단계의 권한을 논리적으로 분리한다.

## 상태 Gate
- WRITING APPROVED
- FLOW APPROVED
- VISUAL APPROVED 또는 VISUAL PLACEHOLDER APPROVED
- TECH PLAYABLE
- INTEGRATION REVIEW
- RELEASE CANDIDATE
- RELEASE APPROVED

## 새 채팅 복구 절차
1. 이 문서를 읽는다.
2. `CURRENT_STATE.md`를 읽는다.
3. `ACTIVE_TASKS.md`와 `OPEN_BLOCKERS.md`를 읽는다.
4. 최근 결정이 필요한 경우 `ai/decisions`를 확인한다.
5. 실제 관련 원본 파일을 읽어 현재 상태를 검증한다.
6. 사용자에게 장황한 과거대화를 요구하지 않고 현재 작업부터 이어간다.

## 채팅 종료 절차
사용자가 `채팅 종료 준비`, `인수인계`, `새 채팅으로 넘겨`라고 하면:
1. 확정된 결정만 GitHub에 반영
2. CURRENT_STATE 갱신
3. ACTIVE_TASKS 갱신
4. OPEN_BLOCKERS 갱신
5. 필요한 Decision Record 작성
6. 다음 채팅의 첫 작업을 명시

대화 전문은 저장하지 않는다.
