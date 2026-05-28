import { Flip } from 'gsap/Flip';
import gsap from 'gsap';

export function captureTimelineFlip(scope: HTMLElement) {
  const timeline = scope.querySelector<HTMLElement>('.timeline');
  if (!timeline) {
    return null;
  }
  return Flip.getState(timeline.querySelectorAll('.timeline__entry'), {
    props: 'height,opacity,transform'
  });
}

type FlipState = ReturnType<typeof Flip.getState>;

function animateDetailsContent(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>('.timeline__details--open .timeline__details-inner').forEach((inner) => {
    gsap.fromTo(
      inner,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', overwrite: true }
    );
  });

  scope.querySelectorAll<HTMLElement>('.timeline__details:not(.timeline__details--open) .timeline__details-inner').forEach((inner) => {
    gsap.to(inner, { opacity: 0, y: -8, duration: 0.18, ease: 'power2.in', overwrite: true });
  });
}

export function playTimelineFlip(state: FlipState | null, scope: HTMLElement, onComplete?: () => void) {
  if (!state) {
    animateDetailsContent(scope);
    onComplete?.();
    return;
  }

  Flip.from(state, {
    duration: 0.45,
    ease: 'power2.inOut',
    nested: true,
    onComplete: () => {
      animateDetailsContent(scope);
      onComplete?.();
    }
  });
}

export function animateExperienceToggle(scope: HTMLElement, updateDom: () => void) {
  const state = captureTimelineFlip(scope);
  updateDom();
  requestAnimationFrame(() => {
    playTimelineFlip(state, scope);
  });
}
