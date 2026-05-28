import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { ensureGsapRegistered } from './gsap/register';

ensureGsapRegistered();

function splitScrubWords(el: HTMLElement) {
  const text = el.textContent ?? '';
  el.replaceChildren(
    ...text.split(/(\s+)/).map((tok) => {
      if (!/\S/.test(tok)) {
        return document.createTextNode(tok);
      }

      const span = document.createElement('span');
      span.className = 'scrub-word';
      span.style.display = 'inline-block';
      span.style.opacity = '0.2';
      span.textContent = tok;
      return span;
    })
  );
}

function showStaticReveals(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-visible');
  });
  scope.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
    el.classList.add('is-scrub-visible');
  });
}

export function useReveal(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) {
        return;
      }

      document.documentElement.classList.add('js-reveal-ready');

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};

          document.documentElement.classList.toggle('is-mobile', !isDesktop);

          if (reduceMotion) {
            showStaticReveals(scope);
            return;
          }

          gsap.utils.toArray<HTMLElement>('[data-stagger-text]', scope).forEach((el, index) => {
            gsap.fromTo(
              el,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: isDesktop ? 0.95 : 0.6,
                delay: 0.12 + index * (isDesktop ? 0.08 : 0.06),
                ease: 'power3.out',
                clearProps: 'transform,opacity'
              }
            );
          });

          ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('[data-reveal]', scope), {
            start: 'top 92%',
            once: true,
            onEnter: (elements) => {
              gsap.to(elements, {
                opacity: 1,
                y: 0,
                duration: isDesktop ? 0.82 : 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                onComplete: () => {
                  elements.forEach((el) => el.classList.add('is-visible'));
                }
              });
            }
          });

          if (!isDesktop) {
            scope.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
              el.classList.add('is-scrub-visible');
            });
            return;
          }

          const hero = scope.querySelector<HTMLElement>('.hero');
          const heroCopy = scope.querySelector<HTMLElement>('.hero__copy');
          const heroVisual = scope.querySelector<HTMLElement>('.hero__visual');
          const heroAmbient = gsap.utils.toArray<HTMLElement>('.hero__ambient', scope);

          if (hero && heroCopy && heroVisual) {
            gsap.to(heroCopy, {
              yPercent: -7,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8
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

          gsap.utils.toArray<HTMLElement>('[data-scale-fade]', scope).forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 0.9, opacity: 0.6 },
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

          gsap.utils.toArray<HTMLElement>('[data-scrub-text]', scope).forEach((el) => {
            splitScrubWords(el);
            const words = el.querySelectorAll<HTMLElement>('.scrub-word');
            gsap.to(words, {
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

          const expSection = scope.querySelector<HTMLElement>('[data-pin-section]');
          const expRail = scope.querySelector<HTMLElement>('[data-pin-target]');
          if (expSection && expRail) {
            ScrollTrigger.create({
              trigger: expSection,
              start: 'top 100px',
              end: 'bottom bottom',
              pin: expRail,
              pinSpacing: false
            });
          }
        }
      );

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
      };

      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onResize);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
        clearTimeout(resizeTimer);
        mm.revert();
        document.documentElement.classList.remove('js-reveal-ready');
      };
    },
    { scope: scopeRef }
  );
}
