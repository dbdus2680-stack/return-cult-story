# Cloudflare 연결 절차

현재 앱은 D1이 없어도 번들된 스토리 데이터로 완전히 실행됩니다. **첫 배포 → D1 → 관리자 쓰기** 순서로 붙입니다.

## 1. 최초 Worker 배포

Cloudflare에서 GitHub 저장소 `dbdus2680-stack/return-cult-story`를 연결합니다.

권장:
- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

또는 로컬 Wrangler 로그인 후:

```bash
npm install
npx wrangler login
npm run deploy
```

## 2. D1 생성

```bash
npx wrangler d1 create return-cult-story-db
```

출력되는 `database_id`를 `wrangler.jsonc`의 `d1_databases` 블록에 입력합니다.

## 3. DB schema 적용

```bash
npm run db:local
npm run db:remote
```

`0001_initial.sql`이 콘텐츠, revision, published version, save game 테이블을 생성합니다.

현재 콘텐츠는 번들 데이터가 Source Seed입니다. 다음 개발 단계에서 관리자 인증을 붙인 후 **Seed Import** 기능으로 D1 Draft를 생성합니다. 따라서 최초 Preview 배포에는 D1이 필요하지 않습니다.

## 4. 관리자 쓰기 기능 전 필수

스토리 수정 POST/PUT API를 열기 전에 Cloudflare Access 또는 동등한 인증 계층을 붙입니다.

1. 관리자 경로 보호
2. Access identity 검증
3. 수정 전후 JSON을 `story_revisions`에 기록
4. 편집 API 활성화
5. Publish 시 immutable version 생성
6. 이후 R2에 배포 bundle 저장

현재 Worker는 읽기 API만 공개합니다.
