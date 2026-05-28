import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { MotionContext } from './types';

function parseRevealDelay(el: HTMLElement) {
  const raw = el.style.getPropertyValue('--reveal-delay').trim();
  if (!raw) {
    return 0;
  }
  return parseFloat(raw) / 1000 || 0;
}

function showStaticReveals(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-visible');
  });
  scope.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
    el.classList.add('is-scrub-visible');
  });
  scope.querySelectorAll<HTMLElement>('[data-skill-chip]').forEach((el) => {
    el.classList.add('is-visible');
  });
  scope.querySelectorAll<HTMLElement>('[data-meta-item]').forEach((el) => {
    el.classList.add('is-visible');
  });
}

function setupHeroIntro(scope: HTMLElement, isDesktop: boolean) {
  const hero = scope.querySelector<HTMLElement>('.hero');
  if (!hero) {
    return;
  }

  const eyebrow = hero.querySelector<HTMLElement>('.eyebrow');
  const titleLines = gsap.utils.toArray<HTMLElement>('[data-stagger-text]', hero);
  const lede = hero.querySelector<HTMLElement>('.hero__lede');
  const ticker = hero.querySelector<HTMLElement>('.hero__ticker');
  const visual = hero.querySelector<HTMLElement>('.hero__visual');
  const actions = gsap.utils.toArray<HTMLElement>('.hero__actions .button', hero);

  gsap.set([eyebrow, ...titleLines, lede, ticker, visual, ...actions].filter(Boolean), {
    opacity: 0,
    y: 24
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 }, 0.05);
  }

  if (titleLines.length) {
    tl.to(
      titleLines,
      {
        opacity: 1,
        y: 0,
        duration: isDesktop ? 0.95 : 0.65,
        stagger: isDesktop ? 0.08 : 0.06,
        clearProps: 'transform,opacity'
      },
      0.12
    );
  }

  if (lede) {
    tl.to(lede, { opacity: 1, y: 0, duration: 0.7, clearProps: 'transform,opacity' }, '-=0.45');
  }

  if (ticker) {
    tl.to(ticker, { opacity: 1, y: 0, duration: 0.65, clearProps: 'transform,opacity' }, '-=0.35');
  }

  if (visual) {
    tl.fromTo(
      visual,
      { opacity: 0, scale: 0.94, y: 18 },
      { opacity: 1, scale: 1, y: 0, duration: 0.85, clearProps: 'transform,opacity' },
      '-=0.55'
    );
  }

  if (actions.length) {
    tl.to(
      actions,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        clearProps: 'transform,opacity'
      },
      '-=0.35'
    );
  }
}

function setupReveals(scope: HTMLElement, isDesktop: boolean) {
  const revealEls = gsap.utils
    .toArray<HTMLElement>('[data-reveal]', scope)
    .filter((el) => !el.hasAttribute('data-pin-target'));

  revealEls.forEach((el, index) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      refreshPriority: revealEls.length - index,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 0.82 : 0.5,
          delay: parseRevealDelay(el),
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          onComplete: () => {
            el.classList.add('is-visible');
          }
        });
      }
    });
  });

  const pinTarget = scope.querySelector<HTMLElement>('[data-pin-target] [data-reveal]');
  if (pinTarget) {
    ScrollTrigger.create({
      trigger: pinTarget,
      start: 'top 92%',
      once: true,
      refreshPriority: revealEls.length + 1,
      onEnter: () => {
        gsap.to(pinTarget, {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 0.82 : 0.5,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          onComplete: () => {
            pinTarget.classList.add('is-visible');
          }
        });
      }
    });
  }
}

function setupSkillChips(scope: HTMLElement, isDesktop: boolean) {
  const chips = gsap.utils.toArray<HTMLElement>('[data-skill-chip]', scope);
  if (!chips.length) {
    return;
  }

  gsap.set(chips, { opacity: 0, y: 14, scale: 0.96 });

  ScrollTrigger.batch(chips, {
    start: 'top 94%',
    once: true,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isDesktop ? 0.55 : 0.4,
        stagger: 0.025,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        onComplete: () => {
          elements.forEach((el) => el.classList.add('is-visible'));
        }
      });
    }
  });
}

function setupProjectCards(scope: HTMLElement, isDesktop: boolean) {
  const cards = gsap.utils.toArray<HTMLElement>('.project-card', scope);
  if (!cards.length) {
    return;
  }

  gsap.set(cards, { opacity: 0, y: isDesktop ? 28 : 16 });

  ScrollTrigger.batch(cards, {
    start: 'top 96%',
    once: true,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: isDesktop ? 0.7 : 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }
  });

  const scaleFadeEls = gsap.utils.toArray<HTMLElement>('[data-scale-fade]', scope);

  if (isDesktop) {
    scaleFadeEls.forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0.65 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 98%',
            end: 'top 52%',
            scrub: 0.8
          }
        }
      );
    });
    return;
  }

  scaleFadeEls.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      }
    );
  });
}

function setupMetaCards(scope: HTMLElement, isDesktop: boolean) {
  const cards = gsap.utils.toArray<HTMLElement>('[data-meta-card]', scope);
  const items = gsap.utils.toArray<HTMLElement>('[data-meta-item]', scope);
  const targets = [...cards, ...items];

  if (!targets.length) {
    return;
  }

  gsap.set(targets, { opacity: 0, y: isDesktop ? 20 : 12 });

  ScrollTrigger.batch(targets, {
    start: 'top 94%',
    once: true,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: isDesktop ? 0.6 : 0.42,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        onComplete: () => {
          elements.forEach((el) => el.classList.add('is-visible'));
        }
      });
    }
  });
}

function setupFooterReveal(scope: HTMLElement, isDesktop: boolean) {
  const footer = scope.querySelector<HTMLElement>('.footer[data-reveal]');
  if (!footer) {
    return;
  }

  ScrollTrigger.create({
    trigger: footer,
    start: 'top 96%',
    once: true,
    onEnter: () => {
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: isDesktop ? 0.7 : 0.45,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        onComplete: () => {
          footer.classList.add('is-visible');
        }
      });
    }
  });
}

function setupScrubHeadings(scope: HTMLElement) {
  const splits: SplitText[] = [];

  gsap.utils.toArray<HTMLElement>('[data-scrub-text]', scope).forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word' });
    splits.push(split);

    gsap.set(split.words, { opacity: 0.2, display: 'inline-block' });

    gsap.to(split.words, {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 45%',
        scrub: 0.8
      }
    });
  });

  return () => {
    splits.forEach((split) => split.revert());
  };
}

function setupHeroParallax(scope: HTMLElement) {
  const hero = scope.querySelector<HTMLElement>('.hero');
  const heroCopy = scope.querySelector<HTMLElement>('.hero__copy');
  const heroVisual = scope.querySelector<HTMLElement>('.hero__visual');
  const heroAmbient = gsap.utils.toArray<HTMLElement>('.hero__ambient', scope);

  if (!hero || !heroCopy || !heroVisual) {
    return;
  }

  gsap.to(heroCopy, {
    yPercent: -7,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      refreshPriority: 2
    }
  });

  gsap.to(heroVisual, {
    yPercent: -11,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.1
    }
  });

  heroAmbient.forEach((item, index) => {
    gsap.to(item, {
      yPercent: -14 - index * 5,
      xPercent: index === 0 ? -5 : 6,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });
}

function setupExperiencePin(scope: HTMLElement, isDesktop: boolean) {
  const expSection = scope.querySelector<HTMLElement>('[data-pin-section]');
  const expRail = scope.querySelector<HTMLElement>('[data-pin-target]');
  if (!expSection || !expRail) {
    return;
  }

  if (isDesktop) {
    ScrollTrigger.create({
      trigger: expSection,
      start: 'top 100px',
      end: 'bottom bottom',
      pin: expRail,
      pinSpacing: false,
      refreshPriority: 1
    });
  }

  const entries = gsap.utils.toArray<HTMLElement>('.timeline__entry', scope);
  entries.forEach((entry) => {
    gsap.fromTo(
      entry,
      { opacity: isDesktop ? 0.72 : 0.85, y: isDesktop ? 8 : 4 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: entry,
          start: 'top 88%',
          end: isDesktop ? 'top 58%' : 'top 72%',
          scrub: isDesktop ? 0.6 : false,
          once: !isDesktop
        }
      }
    );
  });
}

export function setupScrollProgress(scope: HTMLElement) {
  const progressBar = scope.querySelector<HTMLElement>('.topbar__progress');
  if (!progressBar) {
    return;
  }

  const main = scope.querySelector<HTMLElement>('#main');
  if (!main) {
    return;
  }

  gsap.fromTo(
    progressBar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: main,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        refreshPriority: -1
      }
    }
  );
}

export function setupScrollMotion(ctx: MotionContext) {
  const { scope, isDesktop, reduceMotion } = ctx;

  if (reduceMotion) {
    showStaticReveals(scope);
    return undefined;
  }

  setupHeroIntro(scope, isDesktop);
  setupReveals(scope, isDesktop);
  setupSkillChips(scope, isDesktop);
  setupProjectCards(scope, isDesktop);
  setupMetaCards(scope, isDesktop);
  setupFooterReveal(scope, isDesktop);
  setupScrollProgress(scope);
  setupExperiencePin(scope, isDesktop);

  if (!isDesktop) {
    scope.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
      el.classList.add('is-scrub-visible');
    });
    return undefined;
  }

  setupHeroParallax(scope);
  const revertSplits = setupScrubHeadings(scope);

  return revertSplits;
}
