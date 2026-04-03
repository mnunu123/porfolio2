# Design System — 취업 포트폴리오 템플릿

> 레퍼런스: capture/ 폴더 이미지 분석 결과 기반
> 방향: 에디토리얼 + 실무 문서 감각, 과하지 않은 감각

---

## 1. Color System

```css
/* Base */
--color-bg:        #FFFFFF;       /* 전체 배경 */
--color-bg-soft:   #F7F7F5;       /* 섹션 구분용 연한 배경 */
--color-text:      #111111;       /* 본문 텍스트 */
--color-muted:     #888888;       /* 메타/라벨 텍스트 */
--color-subtle:    #BBBBBB;       /* 캡션, 구분선 */
--color-line:      #E5E5E5;       /* 구분선, 테두리 */
--color-shadow:    rgba(0,0,0,0.07); /* 카드 그림자 */

/* Accent — 프로젝트별 교체 가능 */
--accent:          #D12F2F;       /* accent-red (기본) */
--accent-dark:     #A82020;       /* hover/강조 */
--accent-light:    rgba(209,47,47,0.08); /* 배지 배경 없음, 참고용 */

/* Divider variants */
--divider-red:     #D12F2F;
--divider-dark:    #111111;
--divider-text:    #FFFFFF;

/* Blue accent (두 번째 프로젝트용) */
--accent-blue:     #1E4FD8;
--accent-blue-dark:#1539A8;
```

### 사용 규칙
- 전체 페이지: 무채색 기반 (`--color-bg`, `--color-text`)
- accent는 한 번에 하나만 — red 또는 blue
- 기여도 막대, keyword badge stroke, 강조 단어, divider bg에만 accent 사용
- 그라디언트 금지

---

## 2. Typography System

```css
/* Font Stack */
font-family: 'Pretendard', 'Noto Sans KR', -apple-system, sans-serif;

/* Scale */
--type-hero:       clamp(2.8rem, 5vw, 4.8rem);  /* 표지 "PORTFOLIO" */
--type-divider:    clamp(2rem, 4vw, 3.6rem);     /* section divider 카피 */
--type-project:    clamp(1.6rem, 2.8vw, 2.6rem); /* 프로젝트 제목 */
--type-section:    1.1rem;                        /* 섹션 라벨 (WORK, EDUCATION) */
--type-body:       1rem;                          /* 본문 */
--type-meta:       0.85rem;                       /* 소속/기간/메타 */
--type-label:      0.75rem;                       /* Keyword 라벨, 캡션 */
--type-caption:    0.7rem;                        /* 최소 텍스트 */

/* Weight */
--weight-heavy:    700;
--weight-medium:   500;
--weight-regular:  400;
--weight-light:    300;

/* Line height */
--lh-title:  1.2;
--lh-body:   1.75;
--lh-meta:   1.5;

/* Letter spacing */
--ls-caps:   0.2em;   /* 대문자 타이틀 (PORTFOLIO, THANK YOU) */
--ls-label:  0.08em;  /* 라벨 텍스트 */
```

### 위계 규칙
1. **Hero / Cover 타이틀**: `var(--type-hero)`, weight 700, ls 0.2em, 대문자
2. **Section Divider 카피**: `var(--type-divider)`, weight 700, white
3. **프로젝트 제목**: `var(--type-project)`, weight 700, color-text, line-height 1.2
4. **소속/기간**: `var(--type-meta)`, weight 400, color-muted
5. **본문**: `var(--type-body)`, weight 400, line-height 1.75
6. **라벨 (Keyword, 섹션명)**: `var(--type-label)`, weight 500, ls 0.08em, 대문자
7. **캡션**: `var(--type-caption)`, color-subtle

---

## 3. Spacing System

```css
/* Section */
--space-section:   120px;   /* 섹션 간 여백 (desktop) */
--space-section-md: 80px;   /* tablet */
--space-section-sm: 56px;   /* mobile */

/* Grid */
--space-grid:      40px;    /* 좌우 컬럼 간격 */
--space-grid-sm:   24px;    /* mobile grid gap */

/* Card */
--card-padding:    28px 32px;
--card-padding-sm: 20px 20px;

/* Side padding */
--side-padding:    clamp(24px, 6vw, 100px);

/* Small spacing */
--space-xs:  8px;
--space-sm:  16px;
--space-md:  24px;
--space-lg:  40px;
--space-xl:  64px;
```

---

## 4. Components

### 4-1. Profile Header
- 구조: 좌측 이름+헤드라인 / 우측 이력 테이블
- 이름 헤드라인: 대형, 2줄, 특정 단어만 accent color
- 이력: label(gray uppercase small) + content(black) 2열
- 구분선: 1px solid `--color-line`
- 배경: white

### 4-2. Resume List
- `dl > dt + dd` 패턴 또는 flex row
- dt: 0.75rem, uppercase, gray, letter-spacing 0.08em, min-width 80px
- dd: 1rem, black, line-height 1.6
- 각 항목 사이: 16px gap
- 섹션 사이: 1px line + 32px padding

### 4-3. Section Quote Divider
- full-width block
- padding: 80px 100px (desktop)
- Red variant: `--divider-red` bg, white text
- Dark variant: `--divider-dark` bg, white text
- 카피: `var(--type-divider)`, weight 700
- 해시태그: 0.85rem, white, opacity 0.7, 좌하단
- 섹션 번호: 우하단, 5~8rem, weight 800, opacity 0.12, white

### 4-4. Keyword Circle Badge
```
border: 1.5px solid var(--accent);
border-radius: 999px;
padding: 6px 16px;
font-size: 0.75rem;
font-weight: 500;
color: var(--accent);
background: transparent;
letter-spacing: 0.05em;
```
- fill 없음, outline만
- 2~3단어
- 행에 flex wrap으로 나열

### 4-5. Contribution Bar
```
.contrib-item:
  display: flex;
  align-items: center;
  gap: 12px;

.contrib-label:
  font-size: 0.8rem;
  color: var(--color-muted);
  min-width: 48px;

.contrib-track:
  height: 3px;
  background: var(--color-line);
  flex: 1;
  border-radius: 2px;

.contrib-fill:
  height: 100%;
  background: var(--accent);
  width: var(--bar-width, 70%);
  border-radius: 2px;
```

### 4-6. Project Visual Card
- 이미지를 감싸는 래퍼
- padding: 0 (이미지 edge-to-edge)
- border-radius: 4px
- box-shadow: 0 18px 40px rgba(0,0,0,0.08)
- overflow: hidden

### 4-7. Social Proof Floating Card
- 흰 배경 카드 (bg white)
- border-radius: 8px
- box-shadow: 0 8px 24px rgba(0,0,0,0.10)
- padding: 12px 16px
- font-size: 0.8rem
- 내부: 플랫폼 아이콘 + 텍스트 + 수치
- position: 독립 배치 (relative parent 내 absolute or 일반 흐름)

### 4-8. Angled Phone Mockup
```
.mockup-phone:
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.14);
  overflow: hidden;

.mockup-phone.tilt-left:  transform: rotate(-8deg) translateY(20px);
.mockup-phone.tilt-right: transform: rotate(8deg) translateY(20px);
.mockup-phone.center:     transform: rotate(0deg) translateY(0);
```
- 2~3개를 겹치거나 나란히 배치

### 4-9. Archive Row
- 번호 + 제목 + 역할 + 기간 + 링크 (5열 flex)
- hover: 배경 연한 gray
- 구분선: 1px `--color-line`
- 번호: accent color, small
- 제목: medium weight
- 나머지: gray, small

### 4-10. Contact Block
- 이름 반복 (대형, 표지와 동일 스타일)
- 연락처 목록: label + value
- 배경: white
- 하단: copyright 캡션

---

## 5. Layout Rules

### Desktop (≥1024px)
- 최대 너비: 1200px, 중앙 정렬
- 프로젝트 섹션: 2열 (left 45% / right 55%)
- 좌우 padding: `--side-padding`
- 섹션 간: `--space-section`

### Tablet (768px ~ 1023px)
- 프로젝트 섹션: 2열 유지, 간격 축소
- side padding: 40px
- 섹션 간: `--space-section-md`
- 목업 크기: 80%로 축소

### Mobile (< 768px)
- 모든 섹션: 1열 스택
- 좌측 설명 먼저, 우측 비주얼 아래
- side padding: 20px
- 섹션 간: `--space-section-sm`
- 기여도 막대: full width
- keyword badge: wrap 허용

### Print / PDF
- A4 기준 (210mm x 297mm)
- 컬러 배경 있는 divider: `-webkit-print-color-adjust: exact` 적용
- page-break-before: 각 프로젝트 섹션 앞에
- 불필요한 장식 숨김 (nav, floating 요소)
- 링크: `::after { content: " (" attr(href) ")" }` 처리
- shadow: print에서 0으로 완화
- font-size: 약 10% 축소

---

## 6. Accent Color 교체 방법

각 프로젝트 섹션의 `.project-section` 에 `data-accent="blue"` 속성을 추가하면
`:root[data-accent="blue"]` 또는 `.project-section[data-accent="blue"]` 스코프로
`--accent` 변수만 교체된다.

```css
/* red (기본) */
.project-section { --accent: #D12F2F; }

/* blue */
.project-section[data-accent="blue"] { --accent: #1E4FD8; }
```
