// main.js — 포트폴리오 인터랙션 (최소한의 JS만 사용)

(function () {
  'use strict';

  // ──────────────────────────────────────
  // 1. 이미지 로드 실패 시 placeholder 대체
  // ──────────────────────────────────────
  function initImageFallbacks() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(function (img) {
      img.addEventListener('error', function () {
        const parent = img.closest('.mockup-phone');
        if (parent) {
          // 모바일 목업 placeholder
          img.style.display = 'none';
          if (!parent.querySelector('.placeholder-phone')) {
            const ph = document.createElement('div');
            ph.className = 'placeholder-phone';
            ph.innerHTML = '<span>이미지 교체</span>';
            parent.appendChild(ph);
          }
        } else {
          // 일반 이미지 placeholder
          img.style.display = 'none';
          const wrap = img.parentElement;
          if (wrap && !wrap.querySelector('.placeholder-box')) {
            const ph = document.createElement('div');
            ph.className = 'placeholder-box';
            ph.innerHTML = '<span>이미지 교체</span>';
            wrap.appendChild(ph);
          }
        }
      });
    });
  }

  // ──────────────────────────────────────
  // 2. Scroll reveal — 섹션 진입 시 fade-in
  // ──────────────────────────────────────
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.section-project, .section-archive, .section-closing, .section-intro'
    );

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // ──────────────────────────────────────
  // 3. 기여도 막대 애니메이션 (진입 시)
  // ──────────────────────────────────────
  function initContribBars() {
    if (!('IntersectionObserver' in window)) return;

    const bars = document.querySelectorAll('.contrib-fill');
    bars.forEach(function (bar) {
      const targetWidth = bar.style.getPropertyValue('--bar-width') || '70%';
      bar.style.setProperty('--bar-width', '0%');

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // 약간의 딜레이 후 애니메이션
            setTimeout(function () {
              bar.style.transition = 'width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              bar.style.setProperty('--bar-width', targetWidth);
              bar.style.width = targetWidth;
            }, 150);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(bar);
    });
  }

  // ──────────────────────────────────────
  // 4. 현재 연도를 copyright에 삽입
  // ──────────────────────────────────────
  function initCopyright() {
    const copyEl = document.querySelector('.closing-copy');
    if (copyEl) {
      copyEl.textContent = copyEl.textContent.replace(
        /©\s*\d{4}/,
        '© ' + new Date().getFullYear()
      );
    }
  }

  // ──────────────────────────────────────
  // 5. accent 색 클래스 적용 (data-accent 속성 기반)
  // ──────────────────────────────────────
  function initAccentOverrides() {
    const sections = document.querySelectorAll('[data-accent]');
    sections.forEach(function (section) {
      const accent = section.getAttribute('data-accent');
      if (accent === 'blue') {
        section.style.setProperty('--accent', '#1E4FD8');
        section.style.setProperty('--accent-dark', '#1539A8');
      }
      // red는 CSS 기본값이므로 별도 처리 불필요
    });
  }

  // ──────────────────────────────────────
  // Init
  // ──────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initImageFallbacks();
    initScrollReveal();
    initContribBars();
    initCopyright();
    initAccentOverrides();
  });

})();
