# Architecture

## 목표

웹 프로토타입을 버리지 않고 그대로 모바일 앱의 본체로 사용한다.

```text
React UI
   │
Pure TypeScript Story Engine
   │
Local/Published Story Bundle
   │
Cloudflare Worker API
   ├─ D1: draft/revision/save
   └─ R2: published bundle/assets (다음 단계)
```

향후 Capacitor는 React UI 외곽에 네이티브 셸만 추가한다.

## 데이터 역할 분리

### 콘텐츠
캐릭터, 사건, 선택지, 단서, 진실, 아이템, 지역, 엔딩.

### 플레이 상태
현재 캐릭터, DAY, STAT, REL, KNOW, FLAG, WORLD, 아이템, 단서, 사건 이력, RNG seed.

### 운영 상태
Draft, revision, published version, QA 결과.

## 중요한 원칙

- 세계 시간축은 하나다.
- 캐릭터는 서로 다른 DAY에 진입한다.
- 메인 앵커는 합류 지점으로 사용한다.
- 랜덤 사건은 같은 사건을 반복 소모하지 않는다.
- 랜덤은 재현 가능한 seed 기반으로 한다.
- 미스터리의 절대 진실과 플레이어가 획득한 지식은 분리한다.
- 스토리 원본의 온라인 편집은 인증 전에는 허용하지 않는다.
