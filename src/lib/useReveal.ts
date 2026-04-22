import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  useEffect(() => {
    // 1. Simple reveal via IntersectionObserver (above-fold-safe)
    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (reveals.length) {
      if ('IntersectionObserver' in window) {
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

    // 2. GSAP-driven below-fold scroll effects
    const ctx = gsap.context(() => {
      // Image scale-fade on project thumbnails (scrubbed)
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

      // Scrubbing text reveal on section intros (word-by-word opacity)
      gsap.utils.toArray<HTMLElement>('[data-scrub-text]').forEach((el) => {
        const text = el.textContent ?? '';
        el.innerHTML = text
          .split(/(\s+)/)
          .map((tok) =>
            /\S/.test(tok)
              ? `<span class="scrub-word" style="display:inline-block;opacity:0.2;">${tok}</span>`
              : tok
          )
          .join('');
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

      // Pin-scroll-split for the experience rail
      const expSection = document.querySelector<HTMLElement>('[data-pin-section]');
      const expRail = document.querySelector<HTMLElement>('[data-pin-target]');
      if (expSection && expRail && window.matchMedia('(min-width: 1024px)').matches) {
        ScrollTrigger.create({
          trigger: expSection,
          start: 'top 100px',
          end: 'bottom bottom',
          pin: expRail,
          pinSpacing: false
        });
      }

      // Refresh after a tick so image-load reflows settle
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
