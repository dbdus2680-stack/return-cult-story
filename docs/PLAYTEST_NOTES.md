# 서버 플레이테스트 메모

플레이 중 우측 하단 `✎` 버튼으로 즉시 메모를 남긴다.

## 원칙

- 메모 원본은 Cloudflare D1 하나만 사용한다.
- 메모 저장 성공은 서버의 201 응답을 받은 시점이다.
- 각 메모에 콘텐츠 버전, EVENT ID, 캐릭터, DAY, Seed, Run ID, Device ID를 저장한다.
- 당시 GameState, 사건 본문/선택지 스냅샷, 직전 선택을 함께 보관한다.
- 스토리 본문이 이후 수정되어도 작성 당시 화면을 재현할 수 있다.
- 기기에는 메모 본문을 저장하지 않는다. 테스터 코드와 익명 Device ID만 localStorage에 보관한다.

## Cloudflare에서 필요한 1회 설정

1. D1 데이터베이스 생성: `return-cult-story-db`
2. Worker에 D1 binding 이름 `DB`로 연결
3. Worker Secret `PLAYTEST_KEY` 생성
4. 각 테스트 기기에서 메모창에 같은 테스터 코드를 한 번 입력

`playtest_notes` 테이블은 메모 API 첫 접근 시 `CREATE TABLE IF NOT EXISTS`로 자동 준비된다. 동일 스키마는 `migrations/0002_playtest_notes.sql`에도 기록되어 있다.

## 관리자 사용

`관리 → 플레이메모`

- 서버의 전체 기기 메모 조회
- 미반영 메모만 필터링
- 반영 완료 / 보류 / 다시 열기
- `반영용 텍스트 복사`로 현재 표시 중인 메모를 한 번에 복사

복사된 텍스트에는 버전과 재현 정보가 포함되므로 ChatGPT 또는 개발 작업에 그대로 전달할 수 있다.
