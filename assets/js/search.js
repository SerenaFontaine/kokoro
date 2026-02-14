(function() {
  'use strict';

  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const triggers = document.querySelectorAll('[data-search-trigger]');
  const closeButtons = document.querySelectorAll('[data-search-close]');

  if (!modal || !input || !resultsContainer) return;

  let searchIndex = [];
  let selectedIndex = -1;
  const indexUrl = modal.getAttribute('data-search-index') || '/index.json';

  // Load search index
  fetch(indexUrl)
    .then(r => r.json())
    .then(data => {
      searchIndex = Array.isArray(data) ? data : [];
    })
    .catch(() => {});

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    input.value = '';
    input.focus();
    selectedIndex = -1;
    renderResults([]);
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    return searchIndex
      .map(page => {
        const title = (page.title || '').toLowerCase();
        const content = (page.content || '').toLowerCase();
        const section = (page.section || '').toLowerCase();

        let score = 0;
        if (title.includes(q)) score += 100;
        if (title.startsWith(q)) score += 50;
        if (section.includes(q)) score += 20;
        if (content.includes(q)) score += 10;

        const idx = content.indexOf(q);
        const snippet = idx >= 0
          ? '...' + content.slice(Math.max(0, idx - 30), idx + q.length + 80) + '...'
          : content.slice(0, 120) + '...';

        return { ...page, score, snippet };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  function renderResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = input.value.trim().length >= 2
        ? '<div class="search-empty">No results found</div>'
        : '<div class="search-empty">Type to search...</div>';
      return;
    }

    resultsContainer.innerHTML = results.map((p, i) => `
      <a href="${p.uri}" class="search-result-item" role="option" data-index="${i}" aria-selected="${i === selectedIndex}">
        <div class="search-result-title">${escapeHtml(p.title)}</div>
        <div class="search-result-path">${escapeHtml(p.section)}</div>
        <div class="search-result-snippet">${escapeHtml(p.snippet)}</div>
      </a>
    `).join('');
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s || '';
    return div.innerHTML;
  }

  function updateSelection(dir) {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (items.length === 0) return;
    selectedIndex = Math.max(-1, Math.min(items.length - 1, selectedIndex + dir));
    items.forEach((el, i) => el.setAttribute('aria-selected', i === selectedIndex));
  }

  function selectCurrent() {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (selectedIndex >= 0 && items[selectedIndex]) {
      window.location.href = items[selectedIndex].href;
    }
  }

  input.addEventListener('input', () => {
    const results = search(input.value);
    selectedIndex = -1;
    renderResults(results);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      updateSelection(1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      updateSelection(-1);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      selectCurrent();
      e.preventDefault();
    }
  });

  triggers.forEach(el => el.addEventListener('click', openModal));
  closeButtons.forEach(el => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
  });
})();
