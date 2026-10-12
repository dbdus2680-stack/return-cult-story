# 귀향회 / Return Cult Story

한국 신도시에서 급성장하는 사이비 종교를 추적하다가, 교단 뒤의 이계 차원기술을 발견하게 되는 **모바일 우선 선택형 스토리 스릴러**의 웹앱 프로토타입입니다.

## 현재 포함된 것

- React + TypeScript + Vite 기반 모바일 우선 플레이 화면
- 플레이어 캐릭터 5명 / 서로 다른 시작일
- 귀향회 스토리 마스터 v0.1 데이터 이관
- 사건 33개, 메인 앵커 12개, 단서/아이템/엔딩 DB
- 간단한 Seeded RNG 기반 사건 선택
- 상태값/아이템/단서 반영 엔진의 첫 버전
- 관리자용 대시보드 / 타임라인 / 사건 DB / 캐릭터 / 진실 보기
- Cloudflare Worker API
- D1 schema + 초기 seed migration
- D1 미연결 시 내장 JSON으로 동작

> 관리자 서버 **쓰기 API는 의도적으로 잠겨 있습니다.** Cloudflare Access 인증이 붙기 전에는 공개 배포에서 스토리 원본이 수정되지 않도록 합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

빌드 검증:

```bash
npm run build
npm run preview
```

## Cloudflare 연결

현재 `wrangler.jsonc`는 D1 없이 바로 실행됩니다.

1. Cloudflare 로그인
2. D1 DB `return-cult-story-db` 생성
3. `wrangler.jsonc`의 `d1_databases` 블록 주석 해제
4. 발급된 `database_id` 입력
5. migration 적용

```bash
npx wrangler d1 migrations apply DB --local
npx wrangler d1 migrations apply DB --remote
```

배포:

```bash
npm run deploy
```

자세한 절차는 [`docs/CLOUDFLARE_SETUP.md`](docs/CLOUDFLARE_SETUP.md)를 참고하세요.

## 구조

```text
shared/
  story-content.json    # Excel 마스터에서 이관한 게임 콘텐츠
  types.ts

src/
  components/
    PlayerView.tsx      # 실제 모바일 플레이
    AdminView.tsx       # 관리자 조회 UI
  engine/
    conditions.ts
    effects.ts
    game.ts
    rng.ts

worker/
  index.ts              # /api/content, /api/health

migrations/
  0001_initial.sql
  0002_seed_v0_1.sql
```

## 다음 우선순위

1. 조건/효과 문자열을 구조화된 Rule JSON으로 마이그레이션
2. DAY 1~7 실제 본문 확대 및 선택 결과 작성
3. Cloudflare Access 관리자 인증
4. D1 revision write API
5. Story Flow 편집 UI
6. Publish → immutable JSON bundle → R2
7. 자동 QA / seed replay
8. Capacitor Android/iOS 패키징
