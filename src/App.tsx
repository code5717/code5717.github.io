import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from './data/profile';
import { useToastMotion } from './lib/gsap/dom';
import { useSiteMotion } from './lib/useSiteMotion';
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
  const toastRef = useRef<HTMLDivElement>(null);

  useSiteMotion(siteRef);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [topbarScrolled, setTopbarScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number | null>(0);
  const [toast, setToast] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useToastMotion(toast, toastRef);

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

      if (event.key !== 'Tab') return;

      const drawer = document.getElementById('mobile-navigation');
      if (!drawer) return;

      const focusables = drawer.querySelectorAll<HTMLElement>(
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
        <div ref={toastRef} className="site-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
