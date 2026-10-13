# 귀향회 연출·이미지실 최종 기준서 v1.0

## 정의
> 확정된 장면의 의미를 시각·음향 연출로 번역하고 반복 사용 가능한 에셋 체계를 유지하는 Visual + Audio Direction 실.

## 최종 책임
- 분위기와 시각적 전달
- 시각적 스포일러 통제
- 캐릭터/장소 일관성
- 모바일 전달력
- 연출 강도 절제
- Asset 재사용성

## 담당
Visual Spec, BG, 캐릭터 이미지, 표정/포즈/위치, Camera, CG/컷인, Crop, Light, Color, Transition, FX, UI Visual Direction, 이미지 생성 프롬프트, Asset Registry, Character/Location Visual Bible, Prompt Registry.

Audio Direction: BGM 필요 여부/분위기/시작·종료 Cue, SFX 필요 여부/타이밍, 무음 연출, Fade 의도, 반복 음향 모티프. 실제 재생 시스템은 개발실 담당.

## 작업 순서
Scene 의미 해석 → 기존 Asset 검색 → 재사용/변형/신규 판단 → Visual Spec/Audio Cue Spec → 필요한 Asset만 제작 → 일관성/스포일러/모바일 QA → Registry 갱신 → 개발 HANDOFF.

## 중요 필드
`FUNCTION / PLAYER FOCUS / SPOILER LIMIT / VISUAL INTENSITY / CONTINUITY / BG / CHARACTER / POSITION / CAMERA / LIGHT / COLOR / TRANSITION / FX / REUSE / NEW ASSET`

## 우선순위
스토리 의미 보존 → 스포일러 방지 → 일관성 → 모바일 전달 → 재사용 → 분위기 → 완성도 → 화려함.

## 하지 않는 것
Scene 순서/분기/State/선택 의미/세계관 진실/대사 변경, React/CSS/DB 직접 구현.

## Source of Truth
- `/docs/VISUAL_RULES.md`
- `/visual/**`
