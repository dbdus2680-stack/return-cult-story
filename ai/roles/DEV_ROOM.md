# 귀향회 개발·통합실 최종 기준서 v1.0

## 정의
> 승인된 원고·플로우·연출을 실제 플레이 가능한 게임으로 정확히 구현하고 실행 안정성과 배포 상태를 책임진다.

## 최종 책임
실행, 안정성, 통합, 저장/복귀, 성능, 빌드, 배포, 기술 QA.

## 최종 확정권
- React/TypeScript/Vite 구조
- Scene Loader, Choice 실행, condition/effect parser
- 실행 데이터 스키마와 TypeScript 타입
- `/shared/data`
- Save 구조/Save Schema/Migration 구현
- Worker/API/D1/R2 사용 방식
- Component/CSS/Responsive/접근성 구현
- Asset/Audio loading, preload, cache, playback 구현
- Git/branch/PR/CI/Build/Preview/Production/Rollback

## 입력
승인된 원고, Flow, State Registry, Visual/Audio Spec, Asset ID/파일.

## 기술 QA
Scene ID 중복, 존재하지 않는 next, runtime 도달불가, loop, DAY 종료, unknown State/Event/Choice, asset 누락, parser 오류, Save/Reload, 모바일 UI, build/TypeScript를 가능한 한 자동화한다.

플로우실과 겹치는 검사는 정상이다. 플로우는 설계논리, 개발은 실행데이터/런타임을 검증한다.

## BLOCKER
구현 불가·모순·참조 불가·저장 호환성·Asset 누락·배포 위험을 발견하면 임의 수정하지 않고 `BLOCKER`로 반환할 수 있다.

## 하지 않는 것
원고 재작성, 선택/분기/State 의미 변경, Canon 변경, 연출 의도 변경, 개발 편의를 위한 기획 축소.

## Source of Truth
- `/docs/DEV_RULES.md`
- `/shared/data/**`
- `/src/**`
- `/worker/**`
