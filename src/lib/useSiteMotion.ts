import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { ensureGsapRegistered } from './gsap/register';
import { setupAnchorScroll } from './gsap/nav';
import { setupPointerMotion } from './gsap/pointer';
import { setupScrollMotion, setupScrollProgress } from './gsap/scroll';

ensureGsapRegistered();

export function useSiteMotion(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      const scope = scopeRef.current;
      if (!scope) {
        return;
      }

      document.documentElement.classList.add('js-reveal-ready');
      const removeScrollProgress = setupScrollProgress(scope);

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1181px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
          finePointer: '(pointer: fine)'
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const reduceMotion = Boolean(context.conditions?.reduceMotion);

          document.documentElement.classList.toggle('is-mobile', !isDesktop);

          const revertScrollMotion = setupScrollMotion({ scope, isDesktop, reduceMotion });

          let revertPointer: (() => void) | undefined;
          if (!reduceMotion && context.conditions?.finePointer) {
            revertPointer = setupPointerMotion(
              { scope, isDesktop, reduceMotion },
              contextSafe as <T extends (...args: never[]) => unknown>(fn: T) => T
            );
          }

          const removeAnchorScroll = setupAnchorScroll(scope, reduceMotion);

          return () => {
            revertScrollMotion?.();
            revertPointer?.();
            removeAnchorScroll();
          };
        }
      );

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
      };

      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onResize);

      scope.querySelectorAll('img').forEach((img) => {
        if (img.complete) {
          return;
        }
        img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
      });

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
        clearTimeout(resizeTimer);
        mm.revert();
        removeScrollProgress?.();
        document.documentElement.classList.remove('js-reveal-ready');
        document.documentElement.classList.remove('is-mobile');
      };
    },
    { scope: scopeRef }
  );
}
