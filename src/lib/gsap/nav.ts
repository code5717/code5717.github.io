import gsap from 'gsap';

const HEADER_OFFSET = 96;

export function setupAnchorScroll(scope: HTMLElement, reduceMotion: boolean) {
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

    gsap.to(window, {
      duration: reduceMotion ? 0 : 0.85,
      ease: 'power3.inOut',
      scrollTo: {
        y: section,
        offsetY: HEADER_OFFSET,
        autoKill: true
      }
    });
  };

  scope.addEventListener('click', handleClick);
  return () => scope.removeEventListener('click', handleClick);
}
