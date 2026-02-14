(function() {
  'use strict';

  // Theme toggle
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      try {
        localStorage.setItem('kokoro-theme', isDark ? 'dark' : 'light');
      } catch (_) {}
    });
  }

  // Restore theme from localStorage
  const savedTheme = typeof localStorage !== 'undefined' && localStorage.getItem('kokoro-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }

  // Sidebar toggle (mobile)
  const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  const sidebar = document.querySelector('.kokoro-sidebar');
  const sidebarClose = document.querySelector('[data-sidebar-close]');
  const sidebarOverlay = document.querySelector('[data-sidebar-overlay]');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('is-open');
    if (sidebarOverlay) sidebarOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('is-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Sidebar nav collapse (desktop)
  document.querySelectorAll('[data-nav-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.sidebar-nav-item.has-children');
      if (item) item.classList.toggle('is-expanded');
    });
  });

  // TOC toggle (mobile)
  const tocToggle = document.querySelector('[data-toc-toggle]');
  const toc = document.querySelector('.kokoro-toc');
  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => toc.classList.toggle('is-collapsed'));
  }

  // Copy code button
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const wrap = btn.closest('.chroma-wrap');
      const pre = wrap ? wrap.querySelector('pre code, pre') : null;
      if (!pre) return;
      const text = pre.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (_) {}
    });
  });
})();
