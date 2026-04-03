# Portfolio Template — 사용 가이드

한국식 취업 포트폴리오용 정적 HTML 템플릿입니다.
에디토리얼 감각의 레이아웃, 최소한의 JS, 데이터 파일만 교체하면 바로 나의 포트폴리오로 변환됩니다.

---

## 파일 구조

```
portfolio2/
  index.html              ← 메인 페이지 (구조만)
  /styles
    reset.css             ← 브라우저 초기화
    main.css              ← 전역 변수 + 레이아웃
    components.css        ← 재사용 컴포넌트
    responsive.css        ← 반응형
    print.css             ← PDF/인쇄 최적화
  /scripts
    main.js               ← 인터랙션 (최소)
  /data
    profile.js            ← 내 정보 (이름, 이력, 스킬 등)
    projects.js           ← 프로젝트 데이터
  /assets
    /placeholders         ← 교체할 이미지 위치
    /icons                ← SVG 아이콘
  reference-analysis.md  ← 레퍼런스 분석 노트
  design-system.md        ← 디자인 시스템 문서
```

---

## 1. 내 정보 바꾸는 방법

`data/profile.js` 파일을 열어 아래 항목을 수정하세요.

```js
const PROFILE = {
  name: "홍길동",               // ← 내 이름
  oneLiner: "더 크고 <em>넓게</em> 세상을 보고 싶은 <em>홍길동</em>입니다",
  // <em> 태그 안의 단어에 accent 색상이 적용됩니다

  contacts: [
    { label: "Email", value: "my@email.com", href: "mailto:my@email.com" },
    // 연락처 추가/수정
  ],

  education: [ ... ],    // 학력
  experience: [ ... ],   // 경력/활동
  awards: [ ... ],       // 수상
  skills: [ ... ]        // 스킬
}
```

> **주의**: `data/profile.js`는 현재 정적 데이터 참고용입니다.
> 실제 HTML에 적용하려면 `index.html`의 해당 텍스트를 직접 수정하세요.
> (향후 JS 렌더링 방식으로 전환 가능)

---

## 2. 프로젝트 추가하는 방법

### HTML에서 직접 추가

`index.html`에서 기존 `<section class="section-project ...">` 블록을 복사하고,
아래 내용을 교체하세요:

| 교체 항목 | 위치 |
|-----------|------|
| 프로젝트 제목 | `.project-title` |
| 소속/기간 | `.project-meta` |
| 키워드 배지 | `.keyword-badges > .badge` |
| 설명 본문 | `.project-body` |
| Thinking 인용 | `.project-thinking > p` |
| 기여도 바 | `.contrib-fill` style="--bar-width:XX%" |
| 이미지 | `<img src="...">` |

### Variant 종류

- **`project-variant-a`**: 기본 좌설명 우결과물 (이미지 그리드 or 목업)
- **`project-variant-b`**: 소셜 증거 강조 (썸네일 + SNS 카드)
- **`project-variant-c`**: 목업 강조형 (폰 목업 2~3개)

---

## 3. Accent Color 바꾸는 방법

### 전체 색 변경

`styles/main.css` 파일 상단의 `:root` 블록에서:

```css
:root {
  --accent: #D12F2F;   /* ← 원하는 색으로 변경 */
}
```

### 프로젝트별 색 변경

각 프로젝트 `<section>` 태그에 `data-accent` 속성을 지정하세요:

```html
<!-- 빨간 계열 (기본) -->
<section class="section-project" data-accent="red">

<!-- 파란 계열 -->
<section class="section-project" data-accent="blue">
```

또는 CSS로 직접 지정:

```css
#project-3 {
  --accent: #1E4FD8;
}
```

---

## 4. 이미지 교체하는 방법

### 일반 프로젝트 이미지

`assets/placeholders/` 폴더에 이미지를 넣고,
`index.html`의 `<img src="...">` 경로를 교체하세요.

```html
<!-- 변경 전 -->
<img src="./assets/placeholders/thumb-1.png" alt="썸네일 1" />

<!-- 변경 후 -->
<img src="./assets/my-project-screenshot.png" alt="프로젝트 메인 화면" />
```

### 폰 목업 이미지

폰 목업은 **배경이 투명한 PNG** 또는 실제 스크린샷을 사용하세요.

권장 비율: **9:19.5** (iPhone 비율)

```html
<div class="mockup-phone tilt-left">
  <img src="./assets/my-app-screen.png" alt="앱 화면" />
</div>
```

### 기울기 조절

```html
<div class="mockup-phone tilt-left">   <!-- 왼쪽 기울기 -->
<div class="mockup-phone center">      <!-- 직립 -->
<div class="mockup-phone tilt-right">  <!-- 오른쪽 기울기 -->
```

---

## 5. PDF 저장 방법

### Chrome / Edge 권장

1. `index.html`을 브라우저로 열기
2. **Ctrl+P** (Mac: Cmd+P) → 인쇄 창 열기
3. **대상**: PDF로 저장
4. **용지**: A4
5. **여백**: 기본 또는 없음
6. **배경 그래픽 인쇄**: **체크** (중요 — 색상 배경 출력용)
7. **저장** 클릭

> `print.css`가 자동으로 적용되어 A4에 최적화된 레이아웃으로 출력됩니다.
> 각 프로젝트 섹션 앞에 자동 페이지 나눔이 적용됩니다.

---

## 6. 레퍼런스 → 레이아웃 규칙 출처

| 레퍼런스 이미지 | 참고한 레이아웃 규칙 |
|----------------|---------------------|
| `13.png` (표지) | Cover — PORTFOLIO 대문자 타이포, red+black 혼용 |
| `2.png` (자기소개) | Intro — 2열 구도, label+내용 resume 구조 |
| `3.png`, `4.png` (divider) | Section Divider — red 배경, 대형 카피, 해시태그, 섹션 번호 |
| `5.png` (dark divider) | Section Divider dark variant — 어두운 배경 + 이미지 혼합 |
| `6.png` (기본 프로젝트) | Variant A — 좌설명 우결과물, Thinking 인용 블록 |
| `7.png` (소셜 증거) | Variant B — 썸네일 그리드 + SNS 플로팅 카드 |
| `8.png` (댓글 강조) | Variant B — 대형 비주얼 + 플로팅 댓글 카드 |
| `9.png` (목업) | Variant C — 다중 폰 목업 기울기 배치 |
| `14.png` (3목업 fan) | mockup-stack 3개 fan 배치 패턴 |
| `15.png` (신문광고) | article-card 비주얼 타입 |
| `7.png` (기여도 막대) | Contribution bar — 얇은 선형 막대, 항목명+막대 |
| `19.png` (클로징) | Closing — 표지와 동일 구조 수미상관 |

---

## 빠른 커스터마이징 체크리스트

- [ ] `index.html` → 이름, 자기소개 문장 교체
- [ ] `index.html` → Resume 섹션 내 학력/경력/수상 교체
- [ ] `index.html` → 프로젝트 제목/설명/키워드 교체
- [ ] `assets/placeholders/` → 실제 스크린샷 이미지 교체
- [ ] `styles/main.css` → `--accent` 컬러 취향에 맞게 조정
- [ ] `index.html` → closing 섹션 연락처 교체
- [ ] PDF 저장 테스트 (Chrome Ctrl+P)
