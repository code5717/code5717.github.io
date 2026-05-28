import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import type { MotionContext } from './types';

type PointerCleanup = () => void;
type ContextSafe = <T extends (...args: never[]) => unknown>(fn: T) => T;

function createVarQuickTo(
  element: HTMLElement,
  prop: string,
  unit: string,
  duration: number,
  ease: string
) {
  const setter =
    unit === 'deg'
      ? (value: number) => element.style.setProperty(prop, `${value.toFixed(2)}deg`)
      : unit === '%'
        ? (value: number) => element.style.setProperty(prop, `${value.toFixed(2)}%`)
        : gsap.quickSetter(element, prop, unit);

  const state = { value: 0 };
  const to = gsap.quickTo(state, 'value', {
    duration,
    ease,
    onUpdate: () => {
      if (unit === 'deg') {
        element.style.setProperty(prop, `${state.value.toFixed(2)}deg`);
      } else if (unit === '%') {
        element.style.setProperty(prop, `${state.value.toFixed(2)}%`);
      } else {
        (setter as (value: number) => void)(state.value);
      }
    }
  });

  return (value: number) => to(value);
}

function setupMagnetic(scope: HTMLElement, contextSafe: ContextSafe) {
  const cleanups: PointerCleanup[] = [];

  gsap.utils.toArray<HTMLElement>('[data-magnetic]', scope).forEach((element) => {
    const xTo = createVarQuickTo(element, '--magnetic-x', 'px', 0.45, 'power3.out');
    const yTo = createVarQuickTo(element, '--magnetic-y', 'px', 0.45, 'power3.out');

    const onMove = contextSafe((event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      xTo(((event.clientX - rect.left) / rect.width - 0.5) * 14);
      yTo(((event.clientY - rect.top) / rect.height - 0.5) * 12);
    });

    const onLeave = contextSafe(() => {
      xTo(0);
      yTo(0);
    });

    element.addEventListener('pointermove', onMove as EventListener);
    element.addEventListener('pointerleave', onLeave as EventListener);
    cleanups.push(() => {
      element.removeEventListener('pointermove', onMove as EventListener);
      element.removeEventListener('pointerleave', onLeave as EventListener);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function setupTilt(scope: HTMLElement, contextSafe: ContextSafe) {
  const cleanups: PointerCleanup[] = [];

  gsap.utils.toArray<HTMLElement>('[data-tilt]', scope).forEach((element) => {
    const xTo = createVarQuickTo(element, '--tilt-x', 'deg', 0.35, 'power2.out');
    const yTo = createVarQuickTo(element, '--tilt-y', 'deg', 0.35, 'power2.out');

    const onMove = contextSafe((event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      xTo((py - 0.5) * -7);
      yTo((px - 0.5) * 9);
    });

    const onLeave = contextSafe(() => {
      xTo(0);
      yTo(0);
    });

    element.addEventListener('pointermove', onMove as EventListener);
    element.addEventListener('pointerleave', onLeave as EventListener);
    cleanups.push(() => {
      element.removeEventListener('pointermove', onMove as EventListener);
      element.removeEventListener('pointerleave', onLeave as EventListener);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function setupHeroSpotlight(scope: HTMLElement, contextSafe: ContextSafe) {
  const heroVisual = scope.querySelector<HTMLElement>('[data-interactive-hero]');
  if (!heroVisual) {
    return undefined;
  }

  const portrait = heroVisual.querySelector<HTMLElement>('.portrait-frame');
  portrait?.classList.remove('portrait-frame--static');

  const pointerXTo = createVarQuickTo(heroVisual, '--pointer-x', '%', 0.5, 'power2.out');
  const pointerYTo = createVarQuickTo(heroVisual, '--pointer-y', '%', 0.5, 'power2.out');
  const tiltXTo = createVarQuickTo(heroVisual, '--tilt-x', 'deg', 0.5, 'power2.out');
  const tiltYTo = createVarQuickTo(heroVisual, '--tilt-y', 'deg', 0.5, 'power2.out');

  const onMove = contextSafe((event: PointerEvent) => {
    const rect = heroVisual.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    pointerXTo(px * 100);
    pointerYTo(py * 100);
    tiltXTo((py - 0.5) * -10);
    tiltYTo((px - 0.5) * 12);
  });

  const onLeave = contextSafe(() => {
    pointerXTo(50);
    pointerYTo(50);
    tiltXTo(0);
    tiltYTo(0);
  });

  heroVisual.addEventListener('pointermove', onMove as EventListener);
  heroVisual.addEventListener('pointerleave', onLeave as EventListener);

  let draggableInstance: Draggable[] | undefined;

  if (portrait) {
    const setDragX = gsap.quickSetter(portrait, '--drag-x', 'px');
    const setDragY = gsap.quickSetter(portrait, '--drag-y', 'px');

    draggableInstance = Draggable.create(portrait, {
      type: 'x,y',
      bounds: heroVisual,
      inertia: true,
      edgeResistance: 0.75,
      onPress: () => portrait.classList.add('is-dragging'),
      onDrag: function (this: Draggable) {
        setDragX(this.x);
        setDragY(this.y);
        gsap.set(portrait, { x: 0, y: 0 });
      },
      onThrowUpdate: function (this: Draggable) {
        setDragX(this.x);
        setDragY(this.y);
        gsap.set(portrait, { x: 0, y: 0 });
      },
      onThrowComplete: function (this: Draggable) {
        portrait.classList.remove('is-dragging');
        gsap.to(portrait, {
          '--drag-x': 0,
          '--drag-y': 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.65)',
          onComplete: () => {
            this.update();
          }
        });
      },
      onRelease: function (this: Draggable) {
        if (!this.isThrowing) {
          portrait.classList.remove('is-dragging');
          gsap.to(portrait, {
            '--drag-x': 0,
            '--drag-y': 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.65)',
            onComplete: () => {
              this.update();
            }
          });
        }
      }
    });
  }

  return () => {
    heroVisual.removeEventListener('pointermove', onMove as EventListener);
    heroVisual.removeEventListener('pointerleave', onLeave as EventListener);
    draggableInstance?.forEach((instance) => instance.kill());
  };
}

export function setupPointerMotion(ctx: MotionContext, contextSafe: ContextSafe) {
  const { scope, reduceMotion } = ctx;

  if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) {
    return undefined;
  }

  const cleanups = [
    setupMagnetic(scope, contextSafe),
    setupTilt(scope, contextSafe),
    setupHeroSpotlight(scope, contextSafe)
  ].filter(Boolean) as PointerCleanup[];

  return () => cleanups.forEach((fn) => fn());
}
