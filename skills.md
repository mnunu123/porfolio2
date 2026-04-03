---
name: extract-template-html
description: URL 사이트의 색상·폰트만 추출해 template-base.html 스킨 토큰을 교체한다.
argument-hint: [url]
disable-model-invocation: true
---

# Extract Template HTML Skill

입력 URL: $ARGUMENTS

---

## 개념

```
template-base.html      ← 레이아웃/구조 고정 (건드리지 않음)
     ↓ URL 스킨 적용
template-{domain}.html  ← 토큰만 바꾼 새 파일
```

**바꾸는 것:** `:root {}` 안의 색상·폰트 토큰
**건드리지 않는 것:** HTML 구조, 레이아웃, 컴포넌트, spacing

---

## 규칙

1. 원본 문구·이미지·아이콘 직접 사용 금지
2. DOM 통째 복붙 금지
3. 색상 / 폰트 / radius / shadow 만 가져온다
4. 모든 텍스트는 `[PLACEHOLDER]` 유지
5. 결과 파일은 `template-{domain}.html` 1개

---

## 작업 순서

### 1단계 — 사이트 캡쳐

```js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto('URL_HERE', { waitUntil: 'load', timeout: 30000 });
  } catch(e) { console.log('goto err:', e.message.split('\n')[0]); }

  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'capture/ref-hero.png' });
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'capture/ref-s2.png' });

  // CSS 토큰 추출
  const css = await page.evaluate(() => {
    const rules = [];
    [...document.styleSheets].forEach(s => {
      try { [...s.cssRules].forEach(r => rules.push(r.cssText)); } catch(e){}
    });
    return rules.filter(r =>
      r.includes('color') || r.includes('font') ||
      r.includes('background') || r.includes('radius')
    ).slice(0, 100).join('\n');
  });
  require('fs').writeFileSync('docs/ref-css.txt', css);
  await browser.close();
  console.log('done');
})();
```

**Playwright 없으면:** `npm i -D playwright && npx playwright install chromium`
**SPA/차단 시:** 사용자에게 직접 스크린샷 요청

---

### 2단계 — 토큰 추출

스크린샷 + `docs/ref-css.txt` 를 분석해서 아래 값을 뽑는다:

| 토큰 | 확인 방법 |
|------|----------|
| `--color-bg` | 페이지 주 배경색 |
| `--color-bg-soft` | 카드/섹션 보조 배경 |
| `--color-text` | 본문 텍스트 색 |
| `--color-muted` | 보조 텍스트 색 |
| `--color-subtle` | 가장 흐린 텍스트 |
| `--color-line` | 구분선 색 |
| `--accent` | 포인트 색 (버튼, 링크, 강조) |
| `--accent-dark` | 포인트 hover 색 |
| `--divider-red` | 관심 섹션 배경 |
| `--divider-dark` | 경험 섹션 배경 |
| `--font-base` | 폰트 스택 |

---

### 3단계 — 파일 생성

`template-base.html` 을 복사한 뒤 **상단 스킨 블록만** 교체한다.

```html
<!-- ★ URL 스킨 토큰 -->
<style>
:root {
  --color-bg:       [추출한 값];
  --color-bg-soft:  [추출한 값];
  --color-text:     [추출한 값];
  --color-muted:    [추출한 값];
  --color-subtle:   [추출한 값];
  --color-line:     [추출한 값];
  --accent:         [추출한 값];
  --accent-dark:    [추출한 값];
  --divider-red:    [추출한 값];   /* 관심 섹션 배경 */
  --divider-dark:   [추출한 값];   /* 경험 섹션 배경 */
  --font-base:      [추출한 값];
}
</style>
```

파일명: `template-{도메인}.html`
예: `template-toss.html`, `template-apple.html`, `template-kakao.html`

---

## template-base.html 구조 요약

```
01. COVER          — 풀스크린 커버 (section-cover)
02. INTRO/RESUME   — 좌: 헤드라인+연락처 / 우: 이력서 (section-intro)
03. DIVIDER #관심  — 100vh 풀스크린 (section-divider--red)   ← 브랜드 액센트 색
04. PROJECT 01     — Variant A: 좌설명 + 우 폰 목업 3개 (tilt-left/center/tilt-right)
05. PROJECT 02     — Variant B: 좌설명 + 우 썸네일그리드 + proof-cards
06. DIVIDER #경험  — 100vh 풀스크린 (section-divider--dark)  ← 브랜드 액센트 색 (관심과 동일)
07. PROJECT 03     — Variant C: 좌설명 + 우 사진 2장
08. DIVIDER #습관  — 100vh 풀스크린 (section-divider--black) ← 항상 #0d0d0d 검정 (스킨 무관)
09. HABIT 01/02/03 — 습관 3개 (section-habit, 좌라벨+우본문 그리드)
10. ARCHIVE        — 테이블 형식 기타 작업물
11. CLOSING        — 연락처 + 마무리 문장
```

**Divider 색상 규칙:**
- `#관심` (`--divider-red`) = `#경험` (`--divider-dark`) = **브랜드 액센트 색** (스킨마다 다름)
- `#습관` (`section-divider--black`) = **항상 `#0d0d0d`** — `:root` 토큰 무시, 하드코딩

**Divider 섹션 스펙:**
- `min-height: 100vh` + `display: flex; align-items: center` — 항상 화면 가득
- `padding: 0 var(--side-padding)` (상하 패딩 없음)
- `.divider-inner { width: 100%; }` — 내부 너비 100%

**Habit 섹션 스펙:**
- `min-height: 70vh` + `display: flex; align-items: center`
- `.habit-inner` : `grid-template-columns: 200px 1fr; gap: 5rem`
- 좌: 넘버(`habit-num`) + 키워드(`habit-title-side`) / 우: 헤드라인 + 불릿 3개 + 사례 리스트

---

## 스킨 비교표

| 토큰 | 기본값 (레드) | 토스 스킨 | 당근 스킨 | 네이버 스킨 | 카카오 스킨 |
|------|-------------|----------|----------|-----------|-----------|
| `--color-bg` | `#FFFFFF` | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--color-bg-soft` | `#F7F7F5` | `#f2f4f6` | `#f7f8fa` | `#f2f4f5` | `#f5f5f5` |
| `--color-text` | `#111111` | `#191f28` | `#212124` | `#1a1d24` | `#111111` |
| `--color-muted` | `#888888` | `#8b95a1` | `#868b94` | `#717680` | `#666666` |
| `--color-subtle` | `#BBBBBB` | `#b0b8c1` | `#adb1ba` | `#a4a7ae` | `#999999` |
| `--color-line` | `#E5E5E5` | `rgba(0,0,33,0.07)` | `#eaebee` | `#e9eaeb` | `#e8e8e8` |
| `--accent` | `#D12F2F` | `#3182f6` | `#ff6f0f` | `#03c75a` | `#ffe812` |
| `--accent-dark` | `#A82020` | `#1b64da` | `#fa6616` | `#02a84a` | `#f0d800` |
| `--divider-red` | `#D12F2F` | `#3182f6` | `#ff6f0f` | `#03c75a` | `#ffe812` |
| `--divider-dark` | `#D12F2F` | `#3182f6` | `#ff6f0f` | `#03c75a` | `#ffe812` |
| `--font-base` | Pretendard | Pretendard | Karrot Sans → Pretendard | NanumHuman → Pretendard | KakaoBig → Pretendard |

> **카카오 주의:** `#ffe812` 옐로우 divider는 흰 텍스트 대비가 낮으므로 스킨 블록에 divider 텍스트 색상을 `#000`으로 오버라이드 추가.

> **규칙:** `--divider-red` = `--divider-dark` = `--accent` 와 같은 브랜드 색으로 통일.
> `#습관` 배경은 `.section-divider--black { background: #0d0d0d }` 하드코딩 — 토큰 미사용.

---

## 참고 파일

| 파일 | 설명 |
|------|------|
| `template-base.html` | 베이스 레이아웃 (레드 액센트 기본값, 단일 파일) |
| `template-toss.html` | 토스 스킨 (base 재복사 + toss.im 색상 토큰) |
| `template-daangn.html` | 당근마켓 스킨 (base 재복사 + about.daangn.com 색상 토큰) |
| `template-naver.html` | 네이버 스킨 (base 재복사 + navercorp.com 색상 토큰) |
| `template-kakao.html` | 카카오 스킨 (base 재복사 + kakaocorp.com 색상 토큰, 옐로우 divider 텍스트 오버라이드 포함) |
| `archive/index1.html` | HTML 구조 원형 (외부 CSS 참조 버전, 참고용) |
| `index.html` | 실제 포트폴리오 (템플릿과 별개, 건드리지 말 것) |

> **새 스킨 추가 시:** `cp template-base.html template-{domain}.html` 후 첫 번째 `<style>` 블록만 교체.

---

## 완료 체크리스트

- [ ] `capture/ref-hero.png` 스크린샷 저장됨
- [ ] `template-base.html` 복사 후 상단 `:root {}` 블록만 교체
- [ ] HTML 구조 그대로 (divider `min-height:100vh` 유지)
- [ ] 브라우저에서 바로 열림 (외부 의존 없음)
- [ ] placeholder 텍스트 유지됨
- [ ] `template-{domain}.html` 파일명 규칙 준수
