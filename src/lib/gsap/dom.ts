import gsap from 'gsap';
import type { RefObject } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ensureGsapRegistered } from './register';

ensureGsapRegistered();

type MobileMenuRefs = {
  backdropRef: RefObject<HTMLElement | null>;
  drawerRef: RefObject<HTMLElement | null>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export function useMobileMenuMotion(menuOpen: boolean, refs: MobileMenuRefs) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const backdrop = refs.backdropRef.current;
      const drawer = refs.drawerRef.current;
      const menuButton = refs.menuButtonRef.current;
      if (!backdrop || !drawer) {
        return;
      }

      const links = gsap.utils.toArray<HTMLElement>('.mobile-menu__link', drawer);

      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(drawer, { xPercent: 104, autoAlpha: 1 });
      gsap.set(links, { autoAlpha: 0, x: 24 });

      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to(backdrop, { autoAlpha: 1, duration: 0.28 }, 0)
        .fromTo(drawer, { xPercent: 104 }, { xPercent: 0, duration: 0.42 }, 0.04)
        .to(links, { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.05, ease: 'power2.out' }, 0.16)
        .eventCallback('onReverseComplete', () => {
          gsap.set(backdrop, { pointerEvents: 'none' });
          gsap.set(drawer, { pointerEvents: 'none' });
          gsap.set(links, { autoAlpha: 0, x: 24 });
        });

      if (menuButton) {
        gsap.set(menuButton, { transformOrigin: '50% 50%' });
      }

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: refs.drawerRef }
  );

  useGSAP(
    () => {
      const tl = timelineRef.current;
      const backdrop = refs.backdropRef.current;
      const drawer = refs.drawerRef.current;
      const menuButton = refs.menuButtonRef.current;
      if (!tl || !backdrop || !drawer) {
        return;
      }

      if (menuButton) {
        gsap.to(menuButton, {
          rotate: menuOpen ? 90 : 0,
          duration: 0.35,
          ease: 'power2.out'
        });
      }

      if (menuOpen) {
        backdrop.classList.add('is-open');
        drawer.classList.add('is-open');
        gsap.set(backdrop, { pointerEvents: 'auto' });
        gsap.set(drawer, { pointerEvents: 'auto' });
        tl.play(0);
        return;
      }

      backdrop.classList.remove('is-open');
      drawer.classList.remove('is-open');

      if (tl.progress() > 0) {
        tl.reverse(0);
        return;
      }

      gsap.set(backdrop, { pointerEvents: 'none', autoAlpha: 0 });
      gsap.set(drawer, { pointerEvents: 'none', xPercent: 104 });
    },
    { dependencies: [menuOpen] }
  );
}

export function useToastMotion(toast: string | null, toastRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = toastRef.current;
      if (!el || !toast) {
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );

      return () => {
        gsap.set(el, { clearProps: 'all' });
      };
    },
    {
      dependencies: [toast],
      revertOnUpdate: true
    }
  );
}
