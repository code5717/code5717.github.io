import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MIN = 1024;
let revealInitialized = false;

function isDesktop() {
  return window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`).matches;
}

export function useReveal() {
  useEffect(() => {
    if (revealInitialized) {
      return;
    }
    revealInitialized = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = isDesktop();

    if (!desktop) {
      document.documentElement.classList.add('is-mobile');
    }

    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (reveals.length) {
      if (reducedMotion.matches) {
        reveals.forEach((el) => el.classList.add('is-visible'));
      } else if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
        );
        reveals.forEach((el) => io.observe(el));
      } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
      }
    }

    if (reducedMotion.matches) {
      document.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
        el.classList.add('is-scrub-visible');
      });
      return;
    }

    const staggerDuration = desktop ? 0.95 : 0.6;
    const staggerDelay = desktop ? 0.08 : 0.06;

    gsap.utils.toArray<HTMLElement>('[data-stagger-text]').forEach((el, index) => {
      gsap.fromTo(
        el,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: staggerDuration,
          delay: 0.12 + index * staggerDelay,
          ease: 'power3.out'
        }
      );
    });

    if (desktop) {
      const hero = document.querySelector<HTMLElement>('.hero');
      const heroCopy = document.querySelector<HTMLElement>('.hero__copy');
      const heroVisual = document.querySelector<HTMLElement>('.hero__visual');
      const heroAmbient = gsap.utils.toArray<HTMLElement>('.hero__ambient');

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

      gsap.utils.toArray<HTMLElement>('[data-scale-fade]').forEach((el) => {
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

      gsap.utils.toArray<HTMLElement>('[data-scrub-text]').forEach((el) => {
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

      const expSection = document.querySelector<HTMLElement>('[data-pin-section]');
      const expRail = document.querySelector<HTMLElement>('[data-pin-target]');
      if (expSection && expRail) {
        ScrollTrigger.create({
          trigger: expSection,
          start: 'top 100px',
          end: 'bottom bottom',
          pin: expRail,
          pinSpacing: false
        });
      }
    } else {
      document.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
        el.classList.add('is-scrub-visible');
      });
    }

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
    };
  }, []);
}
