# 귀향회 / Return Cult Story

한국 신도시에서 급성장하는 사이비 종교를 추적하다가, 교단 뒤의 이계 차원기술을 발견하게 되는 **모바일 우선 선택형 스토리 스릴러** 웹앱 프로토타입입니다.

## 현재 포함된 것

- React + TypeScript + Vite 기반 모바일 우선 플레이 화면
- 플레이어 캐릭터 5명 / 서로 다른 시작일
- 귀향회 스토리 마스터 v0.1 데이터 이관
- 사건 33개, 메인 앵커 12개, 단서·아이템·엔딩 DB
- Seeded RNG 기반 사건 선택
- 상태값·관계·지식·아이템·단서 엔진 v0.1
- 관리자용 대시보드 / 타임라인 / 사건 DB / 캐릭터 / 진실 보기
- Cloudflare Worker 읽기 API
- D1 schema
- D1 미연결 시 번들된 Story Seed로 즉시 동작

> 관리자 서버 **쓰기 API는 의도적으로 잠겨 있습니다.** Cloudflare Access 인증이 붙기 전에는 공개 배포에서 스토리 원본이 수정되지 않습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

빌드 검증:

```bash
npm run build
```

## Cloudflare 연결

현재 `wrangler.jsonc`는 D1 없이 바로 실행됩니다. 우선 Worker를 배포해 웹 버전을 확인한 뒤 D1을 붙이는 흐름을 권장합니다.

D1 연결 시:
1. `return-cult-story-db` 생성
2. `wrangler.jsonc`의 `d1_databases` 블록 주석 해제
3. 발급된 `database_id` 입력
4. `migrations/0001_initial.sql` 적용
5. 관리자 인증/편집 API를 붙인 뒤 현재 번들 데이터를 D1 Draft로 Import

자세한 절차는 [`docs/CLOUDFLARE_SETUP.md`](docs/CLOUDFLARE_SETUP.md)를 참고하세요.

## 구조

```text
shared/data/          # Excel 마스터에서 분리 이관한 콘텐츠
shared/story-content.ts
src/components/       # Player / Admin
src/engine/           # Condition / Effect / RNG / Event selector
worker/               # Cloudflare Worker API
migrations/           # D1 schema
```

## 다음 우선순위

1. GitHub CI 빌드 통과
2. Cloudflare Worker 최초 Preview 배포
3. DAY 1~7 본문·선택 결과 확장
4. Cloudflare Access 관리자 인증
5. D1 revision write API + Seed Import
6. Story Flow 편집 UI
7. Publish → immutable JSON bundle → R2
8. 자동 QA / seed replay
9. Capacitor Android/iOS 패키징
