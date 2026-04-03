// PDF 변환 스크립트 — 16:9 단일 / 16:9 멀티페이지 두 버전 생성
const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 9876;
const W = 1280;
const H = 720;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(ROOT, urlPath === '/' ? '/index1.html' : urlPath);
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

// ── 공통: 페이지 로드 + 기본 픽스 ────────────────────────
async function loadPage(browser, extraCSS) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });

  // reveal 애니메이션 해제
  await page.addStyleTag({ content: `
    .reveal { opacity: 1 !important; transform: none !important; }
    * { animation: none !important; transition: none !important; }
  ` });

  // 기여도 바 width 강제 적용
  await page.evaluate(() => {
    document.querySelectorAll('.contrib-fill').forEach(el => {
      const w = el.style.getPropertyValue('--bar-width') || '70%';
      el.style.width = w;
    });
  });

  if (extraCSS) await page.addStyleTag({ content: extraCSS });

  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 1200));
  return page;
}

// ── 1. 단일 페이지 (1280×720 1장) ────────────────────────
async function exportSingle(browser) {
  const page = await loadPage(browser, `
    body { zoom: 0.56; }
  `);

  const outPath = path.resolve(ROOT, 'portfolio-16x9-single.pdf');
  await page.pdf({
    path: outPath,
    width: `${W}px`,
    height: `${H}px`,
    printBackground: true,
    pageRanges: '1',
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await page.close();
  console.log('✓ 단일 페이지:', outPath);
}

// ── 2. 멀티페이지 (섹션별 1장씩) ────────────────────────
async function exportMulti(browser) {
  const css = `
    @page { size: ${W}px ${H}px; margin: 0; }
    html, body { width: ${W}px; }

    /* 각 섹션 = 1슬라이드 */
    section {
      page-break-before: always;
      page-break-after: always;
      page-break-inside: avoid;
      height: ${H}px !important;
      min-height: ${H}px !important;
      max-height: ${H}px !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    /* 섹션 안 패딩 압축 */
    .section-cover { min-height: ${H}px !important; padding: 40px 60px !important; }
    .section-intro  { padding: 40px 0 !important; }
    .section-divider { padding: 40px 60px !important; }
    .section-project { padding: 48px 0 !important; }
    .section-archive { padding: 40px 0 !important; }
    .section-closing { padding: 40px 0 !important; }

    /* 폰트 축소로 내용 맞춤 */
    body { font-size: 11px !important; }
    .intro-headline  { font-size: 1.4rem !important; }
    .project-title   { font-size: 1.5rem !important; }
    .divider-copy    { font-size: 1.8rem !important; }
    .cover-label     { font-size: 3rem !important; }
    .closing-label   { font-size: 3rem !important; }
  `;

  const page = await loadPage(browser, css);

  const outPath = path.resolve(ROOT, 'portfolio-16x9-multi.pdf');
  await page.pdf({
    path: outPath,
    width: `${W}px`,
    height: `${H}px`,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await page.close();
  console.log('✓ 멀티페이지:', outPath);
}

// ── Main ─────────────────────────────────────────────────
(async () => {
  await new Promise(r => server.listen(PORT, r));
  console.log(`서버 시작: http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  await exportSingle(browser);
  await exportMulti(browser);

  await browser.close();
  server.close();
  console.log('\n두 파일 모두 생성 완료!');
})();
