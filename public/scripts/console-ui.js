(() => {
  const VIEW_IDS = ['sys', 'ops', 'proj', 'tech', 'data'];
  const root = document.documentElement;
  const toast = document.getElementById('toast');
  const mainViewport = document.querySelector('.main-viewport');
  const panels = Array.from(document.querySelectorAll('.view-panel'));
  const viewButtons = Array.from(document.querySelectorAll('.sidebar-item, .mobile-tab'));
  const themeToggle = document.getElementById('themeToggle');
  const effectsToggle = document.getElementById('effectsToggle');
  const emailButton = document.getElementById('copyEmailButton');
  const yearEl = document.getElementById('copyrightYear');
  const THEME_KEY = 'uiTheme';
  const EFFECTS_KEY = 'uiEffectsLevel';
  const THEME_VALUES = ['dark', 'light'];
  const EFFECT_VALUES = ['full', 'reduced', 'off'];
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    if (toastTimer) window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  };

  const validViews = new Set(VIEW_IDS);
  let activeView = viewButtons.find((btn) => btn.classList.contains('active'))?.dataset.view ?? VIEW_IDS[0];
  if (!validViews.has(activeView)) activeView = VIEW_IDS[0];

  const setView = (viewId, options = {}) => {
    if (!validViews.has(viewId)) return;
    const { scrollToTop = true } = options;
    const changed = activeView !== viewId;
    activeView = viewId;

    panels.forEach((panel) => {
      const isTarget = panel.id === `view-${viewId}`;
      panel.classList.toggle('active', isTarget);
      panel.hidden = !isTarget;
    });

    viewButtons.forEach((btn) => {
      const isTarget = btn.dataset.view === viewId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', String(isTarget));
    });

    if (changed && scrollToTop && mainViewport) {
      mainViewport.scrollTop = 0;
    }
  };

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const viewId = btn.dataset.view;
      if (viewId) setView(viewId);
    });
  });
  setView(activeView, { scrollToTop: false });

  const setupExpandableRows = ({ rowSelector, detailSelector, rowDataKey, detailDataKey }) => {
    const rows = Array.from(document.querySelectorAll(rowSelector));
    const details = Array.from(document.querySelectorAll(detailSelector));
    if (!rows.length || !details.length) return { collapseAll: () => {} };

    const applyState = (expandedIndex) => {
      rows.forEach((row) => {
        const rowIndex = row.dataset[rowDataKey];
        const isActive = expandedIndex !== null && rowIndex === expandedIndex;
        row.classList.toggle('active', isActive);
        row.setAttribute('aria-expanded', String(isActive));
      });

      details.forEach((detail) => {
        const detailIndex = detail.dataset[detailDataKey];
        const isActive = expandedIndex !== null && detailIndex === expandedIndex;
        detail.classList.toggle('active', isActive);
        detail.hidden = !isActive;
      });
    };

    const initialExpandedIndex =
      rows.find((row) => row.classList.contains('active'))?.dataset[rowDataKey] ?? rows[0].dataset[rowDataKey] ?? null;

    applyState(initialExpandedIndex);

    rows.forEach((row) => {
      row.addEventListener('click', () => {
        const rowIndex = row.dataset[rowDataKey] ?? null;
        const isActive = row.classList.contains('active');
        applyState(isActive ? null : rowIndex);
      });
    });

    return {
      collapseAll: () => applyState(null)
    };
  };

  const opsRows = setupExpandableRows({
    rowSelector: '.ops-row',
    detailSelector: '.ops-detail-wrap',
    rowDataKey: 'opsIndex',
    detailDataKey: 'opsDetail'
  });

  const projRows = setupExpandableRows({
    rowSelector: '.proj-row',
    detailSelector: '.proj-detail-wrap',
    rowDataKey: 'projIndex',
    detailDataKey: 'projDetail'
  });

  const isInteractiveTarget = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, button, a, [contenteditable], [role="textbox"]'));
  };

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isInteractiveTarget(event.target)) return;

    const currentIndex = VIEW_IDS.indexOf(activeView);

    if (event.key === 'j' || event.key === 'J') {
      event.preventDefault();
      setView(VIEW_IDS[(currentIndex + 1) % VIEW_IDS.length]);
    } else if (event.key === 'k' || event.key === 'K') {
      event.preventDefault();
      setView(VIEW_IDS[(currentIndex - 1 + VIEW_IDS.length) % VIEW_IDS.length]);
    } else if (event.key >= '1' && event.key <= '5') {
      event.preventDefault();
      setView(VIEW_IDS[Number.parseInt(event.key, 10) - 1]);
    } else if (event.key === 'Escape') {
      opsRows.collapseAll();
      projRows.collapseAll();
    }
  });

  const copyEmail = async (email) => {
    if (!email) return false;
    if (!navigator.clipboard || !window.isSecureContext) return false;
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      return false;
    }
  };

  emailButton?.addEventListener('click', async () => {
    const email = emailButton.dataset.email;
    const copied = await copyEmail(email);

    if (copied) {
      showToast('Email copied to clipboard');
      const original = emailButton.textContent;
      emailButton.textContent = '[Copied!]';
      emailButton.classList.add('btn-copied');
      window.setTimeout(() => {
        emailButton.textContent = original;
        emailButton.classList.remove('btn-copied');
      }, 1500);
      return;
    }

    if (email) {
      showToast(`Copy unavailable. Email: ${email}`);
    } else {
      showToast('Could not copy email');
    }
  });

  const getTheme = () => (THEME_VALUES.includes(root.dataset.theme) ? root.dataset.theme : 'dark');
  const getEffects = () => (EFFECT_VALUES.includes(root.dataset.effects) ? root.dataset.effects : 'full');

  const updateThemeToggle = () => {
    if (!themeToggle) return;
    const theme = getTheme();
    const isLight = theme === 'light';
    themeToggle.textContent = `[theme:${theme}]`;
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  };

  const setTheme = (theme) => {
    if (!THEME_VALUES.includes(theme)) return;
    root.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage failures in private/locked contexts.
    }
    updateThemeToggle();
  };

  themeToggle?.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
  updateThemeToggle();

  const updateEffectsToggle = () => {
    if (!effectsToggle) return;
    const effects = getEffects();
    effectsToggle.textContent = `[fx:${effects}]`;
    effectsToggle.setAttribute('aria-label', `Cycle visual effects level (current: ${effects})`);
  };

  const setEffects = (effects) => {
    if (!EFFECT_VALUES.includes(effects)) return;
    root.dataset.effects = effects;
    try {
      localStorage.setItem(EFFECTS_KEY, effects);
    } catch {
      // Ignore storage failures in private/locked contexts.
    }
    updateEffectsToggle();
  };

  effectsToggle?.addEventListener('click', () => {
    const currentIndex = EFFECT_VALUES.indexOf(getEffects());
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % EFFECT_VALUES.length;
    setEffects(EFFECT_VALUES[nextIndex]);
  });
  updateEffectsToggle();

  if (yearEl) {
    yearEl.textContent = `\u00A9 ${new Date().getFullYear()}`;
  }
})();
