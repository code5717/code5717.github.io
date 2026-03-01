(() => {
  const root = document.documentElement;
  const EFFECTS_KEY = 'uiEffectsLevel';
  const THEME_KEY = 'uiTheme';
  const VALID_EFFECTS = new Set(['full', 'reduced', 'off']);
  const VALID_THEMES = new Set(['dark', 'light']);

  root.classList.remove('no-js');
  root.classList.add('js');

  let theme = 'dark';
  let effects = 'full';

  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme && VALID_THEMES.has(storedTheme)) {
      theme = storedTheme;
    }
  } catch {
    theme = 'dark';
  }

  try {
    const storedEffects = localStorage.getItem(EFFECTS_KEY);
    if (storedEffects && VALID_EFFECTS.has(storedEffects)) {
      effects = storedEffects;
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      // Default to lighter effects on phones unless user already chose a level.
      effects = 'reduced';
    } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      effects = 'reduced';
    }
  } catch {
    effects = 'full';
  }

  root.setAttribute('data-theme', theme);
  root.setAttribute('data-effects', effects);
})();
