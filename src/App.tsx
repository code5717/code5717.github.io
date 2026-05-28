import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from './data/profile';
import { useReveal } from './lib/useReveal';
import { sectionIds, type SectionId } from './lib/nav';
import SiteHeader from './components/SiteHeader';
import HeroSection from './components/HeroSection';
import NavGrid from './components/NavGrid';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import BackgroundSection from './components/BackgroundSection';
import ConnectSection from './components/ConnectSection';
import SiteFooter from './components/SiteFooter';

export default function App() {
  const siteRef = useRef<HTMLDivElement>(null);
  useReveal(siteRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [topbarScrolled, setTopbarScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number | null>(0);
  const [toast, setToast] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');

    const heroVisual = document.querySelector<HTMLElement>('[data-interactive-hero]');
    const portrait = heroVisual?.querySelector<HTMLElement>('.portrait-frame');
    if (portrait && finePointer.matches) {
      portrait.classList.remove('portrait-frame--static');
    }

    if (reducedMotion.matches || !finePointer.matches) return;

    const magneticTargets = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    const tiltTargets = document.querySelectorAll<HTMLElement>('[data-tilt]');
    const cleanup: Array<() => void> = [];

    if (heroVisual) {
      const handleMove = (event: PointerEvent) => {
        const rect = heroVisual.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const tiltX = (py - 0.5) * -10;
        const tiltY = (px - 0.5) * 12;

        heroVisual.style.setProperty('--pointer-x', `${(px * 100).toFixed(2)}%`);
        heroVisual.style.setProperty('--pointer-y', `${(py * 100).toFixed(2)}%`);
        heroVisual.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        heroVisual.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      };

      const resetHero = () => {
        heroVisual.style.removeProperty('--pointer-x');
        heroVisual.style.removeProperty('--pointer-y');
        heroVisual.style.removeProperty('--tilt-x');
        heroVisual.style.removeProperty('--tilt-y');
      };

      heroVisual.addEventListener('pointermove', handleMove);
      heroVisual.addEventListener('pointerleave', resetHero);
      cleanup.push(() => {
        heroVisual.removeEventListener('pointermove', handleMove);
        heroVisual.removeEventListener('pointerleave', resetHero);
      });

      const portraitEl = heroVisual.querySelector<HTMLElement>('.portrait-frame');
      if (portraitEl) {
        const MAX = 32;
        const DAMP = 0.55;
        const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v * DAMP));
        let startX = 0;
        let startY = 0;
        let dragging = false;

        const onDown = (event: PointerEvent) => {
          dragging = true;
          startX = event.clientX;
          startY = event.clientY;
          portraitEl.setPointerCapture(event.pointerId);
          portraitEl.classList.add('is-dragging');
          event.preventDefault();
        };
        const onDrag = (event: PointerEvent) => {
          if (!dragging) return;
          portraitEl.style.setProperty('--drag-x', `${clamp(event.clientX - startX).toFixed(2)}px`);
          portraitEl.style.setProperty('--drag-y', `${clamp(event.clientY - startY).toFixed(2)}px`);
        };
        const onRelease = (event: PointerEvent) => {
          if (!dragging) return;
          dragging = false;
          try {
            portraitEl.releasePointerCapture(event.pointerId);
          } catch {}
          portraitEl.classList.remove('is-dragging');
          portraitEl.style.removeProperty('--drag-x');
          portraitEl.style.removeProperty('--drag-y');
        };

        portraitEl.addEventListener('pointerdown', onDown);
        portraitEl.addEventListener('pointermove', onDrag);
        portraitEl.addEventListener('pointerup', onRelease);
        portraitEl.addEventListener('pointercancel', onRelease);
        cleanup.push(() => {
          portraitEl.removeEventListener('pointerdown', onDown);
          portraitEl.removeEventListener('pointermove', onDrag);
          portraitEl.removeEventListener('pointerup', onRelease);
          portraitEl.removeEventListener('pointercancel', onRelease);
        });
      }
    }

    magneticTargets.forEach((element) => {
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
        element.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        element.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      };

      const reset = () => {
        element.style.removeProperty('--magnetic-x');
        element.style.removeProperty('--magnetic-y');
      };

      element.addEventListener('pointermove', handleMove);
      element.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', reset);
      });
    });

    tiltTargets.forEach((element) => {
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        element.style.setProperty('--tilt-x', `${((py - 0.5) * -7).toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${((px - 0.5) * 9).toFixed(2)}deg`);
      };

      const reset = () => {
        element.style.removeProperty('--tilt-x');
        element.style.removeProperty('--tilt-y');
      };

      element.addEventListener('pointermove', handleMove);
      element.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', reset);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const onScroll = () => setTopbarScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: [0, 0.15, 0.35, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    firstMenuLinkRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleEmailClick = useCallback(async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard?.writeText) return;

    event.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.contacts.email);
      setToast('Email copied to clipboard');
    } catch {
      setToast(`Email: ${profile.contacts.email}`);
    }
  }, []);

  const handleToggleExperience = useCallback((index: number) => {
    setActiveExperience((current) => (current === index ? null : index));
  }, []);

  return (
    <div ref={siteRef} className="site-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="chrome-grid" aria-hidden="true" />
      <div className="chrome-vignette" aria-hidden="true" />

      <SiteHeader
        topbarScrolled={topbarScrolled}
        menuOpen={menuOpen}
        activeSection={activeSection}
        menuButtonRef={menuButtonRef}
        firstMenuLinkRef={firstMenuLinkRef}
        drawerRef={drawerRef}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main id="main" className="page">
        <HeroSection />
        <NavGrid />
        <ExperienceSection
          activeExperience={activeExperience}
          onToggleExperience={handleToggleExperience}
        />
        <SkillsSection />
        <ProjectsSection />
        <BackgroundSection />
        <ConnectSection onEmailClick={handleEmailClick} />
      </main>

      <SiteFooter />

      {toast && (
        <div className="site-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
