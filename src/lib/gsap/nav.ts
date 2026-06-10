const HEADER_OFFSET_GAP = 16;

function getHeaderOffset() {
  const topbar = document.querySelector<HTMLElement>('.topbar');
  return (topbar?.offsetHeight ?? 80) + HEADER_OFFSET_GAP;
}

export function setupAnchorScroll(scope: HTMLElement, reduceMotion: boolean) {
  const scrollToHash = (hash: string, updateHistory: boolean) => {
    if (!hash || hash === '#') {
      return;
    }

    const section = scope.querySelector<HTMLElement>(hash);
    if (!section) {
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, sectionTop - getHeaderOffset()),
      behavior: reduceMotion || !updateHistory ? 'auto' : 'smooth'
    });

    if (updateHistory) {
      window.history.pushState(null, '', hash);
    }
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || !scope.contains(link)) {
      return;
    }

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') {
      return;
    }

    const section = scope.querySelector<HTMLElement>(hash);
    if (!section) {
      return;
    }

    event.preventDefault();

    window.requestAnimationFrame(() => scrollToHash(hash, true));
  };

  scope.addEventListener('click', handleClick);
  window.requestAnimationFrame(() => scrollToHash(window.location.hash, false));
  const hashScrollTimers = [80, 300].map((delay) =>
    window.setTimeout(() => scrollToHash(window.location.hash, false), delay)
  );

  return () => {
    scope.removeEventListener('click', handleClick);
    hashScrollTimers.forEach((timer) => window.clearTimeout(timer));
  };
}
